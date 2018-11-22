import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MasStaffService } from '../../services/master/MasStaff.service';
import { BribeConfig } from './bribe.config';
import { MasOfficeService } from '../../services/master/MasOffice.service';
import { RequestCommandService } from '../../services/RequestCommand.service';
import {
  IRequestCommandgetByArrestCode,
  IRequestCommand
} from '../../interfaces/RequestCommand';
import { BribeService } from './bribe.service';
import { NavigationService } from 'app/shared/header-navigation/navigation.service';
import { RewardService } from '../../reward.service';
import { TransactionRunningService } from '../../services/TransactionRunning.service';
import {
  ITransactionRunning,
  ITransactionRunninginsAll
} from '../../interfaces/TransactionRunning';
import { RequestBribeRewardService } from '../../services/RequestBribeReward.service';
import { RequestBribeService } from '../../services/RequestBribe.service';
import {
  IRequestBribeinsAll,
  IRequestBribe,
  IRequestBribegetByCon,
  IRequestBribeupdDeleteResponse
} from '../../interfaces/RequestBribe.interface';
import { MasDocumentMainService } from '../../services/master/MasDocumentMain.service';
import { MasDocumentModel } from 'app/models/mas-document.model';
import { MasStaffModel } from 'app/models';
import { MasOfficeModel } from 'app/models/mas-office.model';
import { RequestPaymentFineDetailService } from '../../services/RequestPaymentFineDetail.service';
import { FormGroup } from '@angular/forms';
import { IFormChange } from '../../interfaces/FormChange';
import { RequestBribeDetailService } from '../../services/RequestBribeDetail.service';
import { PrintDialogComponent } from '../../shared/print-dialog/print-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SidebarService } from 'app/shared/sidebar/sidebar.component';

@Component({
  selector: 'app-bribe',
  templateUrl: './bribe.component.html',
  styleUrls: ['./bribe.component.scss'],
  providers: [BribeService]
})
export class BribeComponent extends BribeConfig implements OnInit, OnDestroy {

  constructor(
    private activatedRoute: ActivatedRoute,
    private masStaffService: MasStaffService,
    private masOfficeService: MasOfficeService,
    private masDocumentMainService: MasDocumentMainService,
    private requestCommandService: RequestCommandService,
    private bribeService: BribeService,
    private navService: NavigationService,
    private rewardService: RewardService,
    private transactionRunningService: TransactionRunningService,
    private requestBribeService: RequestBribeService,
    private requestPaymentFineDetailService: RequestPaymentFineDetailService,
    private requestBribeDetailService: RequestBribeDetailService,
    private router: Router,
    private sidebarService: SidebarService,
    public dialog: MatDialog
  ) {
    super();
    this.activatedRoute.params.subscribe(param => {
      this.mode$.next(param['mode']);
      this.ArrestCode$.next(param['ArrestCode']);
      this.RequestBribeID$.next(param['RequestBribeID']);
      this.RequestBribeRewardID$.next(param['RequestBribeRewardID']);
    });
    this.navService.onSave.takeUntil(this.destroy$).subscribe(save => {
      if (save === true) {
        this.navService.onSave.next(false);
        this.buttonSave();
      }
    });
    this.navService.onCancel.takeUntil(this.destroy$).subscribe(cancel => {
      if (cancel === true) {
        this.navService.onCancel.next(false);
        this.buttonCancel();
      }
    });
    this.navService.onPrint.takeUntil(this.destroy$).subscribe(save => {
      if (save === true) {
        this.navService.onPrint.next(false);
        this.buttonPrint();
      }
    });
    this.navService.onEdit.takeUntil(this.destroy$).subscribe(cancel => {
      if (cancel === true) {
        this.navService.onEdit.next(false);
        this.buttonEdit();
      }
    });
    this.navService.onDelete.takeUntil(this.destroy$).subscribe(save => {
      if (save === true) {
        this.navService.onDelete.next(false);
        this.buttonDelete();
      }
    });
    this.navService.onPrevPage.takeUntil(this.destroy$).subscribe(save => {
      if (save === true) {
        this.navService.onPrevPage.next(false);
        this.buttonPrevPage();
      }
    });
  }

  ngOnInit() {
    this.sidebarService.setVersion('0.0.1.2');
    // ILG60-08-03-00-00-E01 (Page Load)
    this.pageLoad();
    this.navService.onPrevPage.takeUntil(this.destroy$).subscribe(res => {
      this.rewardService.bribeState$.next({
        mode: 'B',
        RequestBribeRewardID: this.RequestBribeRewardID
      });
    });
  }
  private pageLoad() {
    // 1 START
    switch (this.mode$.getValue()) {
      case 'C':
        // 1.1
        this.MasStaffMaingetAll(); // 1.1.1
        this.MasOfficeMaingetAll(); // 1.1.2

        this.RequestCommandgetByArrestCode({
          ArrestCode: this.ArrestCode$.getValue()
        }); // 1.1.3

        // 1.1.5
        this.controlEnableAll();

        // 1.1.6
        this.navService.setSaveButton(true); // 1.1.6(1)
        this.navService.setCancelButton(true); // 1.1.6(2)
        this.navService.setPrintButton(false);
        this.navService.setEditButton(false);
        this.navService.setDeleteButton(false);
        this.navService.setSearchBar(false);

        break;
      case 'R':
        // 1.2
        this.RequestBribegetByCon({
          RequestBribeID: this.RequestBribeID$.getValue()
        });

        this.MasDocumentMaingetAll();

        // 1.2.4
        // ส่วนคำร้องขอรับเงินสินบน
        // Icon
        this.ILG60_08_03_00_00_E08_DISABLED$.next(false); // ปุ่ม ย่อขยาย Collapse Panel
        // Drop Down List
        this.ILG60_08_03_00_00_E09_DISABLED$.next(true); // เลขที่ใบแจ้งความนำจับ
        // Input Box
        this.ILG60_08_03_00_00_E10_DISABLED$.next(true); // เขียนที่

        // ส่วนรายละเอียดคำร้องขอรับเงินสินบน
        // Check Box
        this.ILG60_08_03_00_00_E11_DISABLED$.next(true); // [Check Box] เลือกรายการคำร้องขอรับเงินสินบน

        // ส่วนหนังสือมอบอำนาจ
        // Icon
        this.ILG60_08_03_00_00_E12_DISABLED$.next(false); // ปุ่ม ย่อขยาย Collapse Panel
        // Input Box
        this.ILG60_08_03_00_00_E13_DISABLED$.next(true); // เขียนที่
        this.ILG60_08_03_00_00_E14_DISABLED$.next(true); // ผู้รับมอบอำนาจ

        // ส่วนเอกสารแนบ
        // Icon
        this.ILG60_08_03_00_00_E16_DISABLED$.next(false); // ปุ่ม ย่อขยาย Collapse Panel
        // Button
        this.ILG60_08_03_00_00_E17_DISABLED$.next(true); // ปุ่ม เพิ่มเอกสารแนบ
        // Icon
        this.ILG60_08_03_00_00_E18_DISABLED$.next(true); // Icon ค้นหาที่อยู่เอกสารแนบ […]
        this.ILG60_08_03_00_00_E19_DISABLED$.next(true); // [ลบ]

        // 1.2.5
        this.navService.setSaveButton(false);
        this.navService.setCancelButton(false);
        this.navService.setPrintButton(true); // 1.2.5(1)
        this.navService.setEditButton(true); // 1.2.5(2)
        this.navService.setDeleteButton(true); // 1.2.5(3)
        this.navService.setPrevPageButton(true); // 1.2.5(4)
        this.navService.setSearchBar(false);
        break;
    }
    // 2 END
  }

  private async buttonSave() {
    // 1 START
    // 1.1
    // 1.2
    // 1.3
    // 1.4
    // 1.5
    if (this.ILG60_08_03_00_00_E08_FORM_VALID) {
      // 2
      switch (this.mode$.getValue()) {
        case 'C':
          // 2.1
          // 2.1.1
          await this.transactionRunningService
            .TransactionRunninggetByCon({
              RunningTable: 'ops_requestbribe',
              RunningOfficeCode: this.OfficeCode
            })
            .subscribe(async (res: ITransactionRunning[]) => {
              // 2.1.2
              if (res.length > 0) {
                // 2.1.2(1)
                const TransactionRunning: ITransactionRunning = res[0];

                // 2.1.2(1.1)
                await this.transactionRunningService
                  .TransactionRunningupdByCon({
                    RunningID: TransactionRunning.RunningID
                  })
                  .subscribe();

                // 2.1.2(1.2)
                const RunningPrefix: string = this.leftPad(
                  TransactionRunning.RunningPrefix,
                  2
                ); // 2.1.2(1.2(1))
                const RunningOfficeCode: string = this.leftPad(
                  TransactionRunning.RunningOfficeCode,
                  6
                ); // 2.1.2(1.2(2))
                const RunningYear: string = this.leftPad(
                  TransactionRunning.RunningYear,
                  2
                ); // 2.1.2(1.2(3))
                const RunningNo: string = this.leftPad(
                  (Number(TransactionRunning.RunningNo) + 1).toString(),
                  5
                ); // 2.1.2(1.2(4))
                const RequestBribeCode = `${RunningPrefix}${RunningOfficeCode}${RunningYear}${RunningNo}`;
                this.RequestBribeCode$.next(RequestBribeCode);
              } else {
                // 2.1.2(2)
                // 2.1.2(2.1)
                await this.transactionRunningService
                  .TransactionRunninginsAll({
                    RunningOfficeCode: this.OfficeCode, // 2.1.2(2.1.1)
                    RunningTable: 'ops_requestbribe', // 2.1.2(2.1.2)
                    RunningPrefix: 'BR', // 2.1.2(2.1.3)
                  })
                  .subscribe();

                // 2.1.2(2.2)
                const RunningOfficeCode = this.leftPad(this.OfficeCode, 6);
                const yy_thaibuddha = (new Date().getFullYear() + 543)
                  .toString()
                  .substr(2, 1);
                const RequestBribeCode = `BR${RunningOfficeCode}${yy_thaibuddha}00001`;
                this.RequestBribeCode$.next(RequestBribeCode);
              }
            });

          // 2.1.3

          await this.requestBribeService
            .RequestBribeinsAll({
              RequestBribeRewardID: this.RequestBribeRewardID$.getValue(), // 2.1.3(1)
              RequestBribeCode: this.RequestBribeCode$.getValue(), // 2.1.3(2)
              CommandDetailID: this.ILG60_08_03_00_00_E08_FORM_DATA
                .CommandDetailID, // 2.1.3(4)
              Station: this.ILG60_08_03_00_00_E08_FORM_DATA.Station,
              RequestDate: this.ILG60_08_03_00_00_E08_FORM_DATA.RequestDate,
              RequestTime: this.ILG60_08_03_00_00_E08_FORM_DATA.RequestTime,
              BribeRemainder: 0,
              BribeTotal: 0,
              FirstName: '',
              Informeracknowledge: '',
              IsActive: 1,
              LastName: '',
              NoticeCode: '',
              POADate: '',
              POANo: '',
              POATime: '',
              PartMoney: 0,
              RequestBribeDetail: [],
              RequestBribeID: null,
              RequestBribeStaff: null,
              StationCode: '',
              StationCodeOfPOA: '',
              StationOfPOA: '',
              TitleName: '',
              TotalPart: 0
            })
            .subscribe();

          // 2.1.4
          this.ILG60_08_03_00_00_E08_FORM_DATA.insDetailIDs.forEach(
            async PaymentFineDetailID => {
              await this.requestPaymentFineDetailService
                .RequestPaymentFineDetailupdByCon({
                  PaymentFineDetailID: PaymentFineDetailID
                })
                .subscribe();
            }
          );

          break;
        case 'R':
          // 2.2
          // 2.2.1(1)
          this.requestBribeService
            .RequestBribeupdByCon({
              RequestBribeID: this.RequestBribeID$.getValue(),
              Station: this.ILG60_08_03_00_00_E08_FORM_DATA.Station,
              RequestDate: this.ILG60_08_03_00_00_E08_FORM_DATA.RequestDate,
              RequestTime: this.ILG60_08_03_00_00_E08_FORM_DATA.RequestTime
            })
            .subscribe();

          // 2.2.2(1)
          this.ILG60_08_03_00_00_E08_FORM_DATA.delDetailIDs.forEach(
            async PaymentFineDetailID => {
              this.requestBribeDetailService
                .RequestBribeDetailupdDelete({
                  RequestBribeDetailID: PaymentFineDetailID
                })
                .subscribe();
            }
          );

          // 2.2.3(1)
          // this.masDocumentMainService.MasDocumentMaininsAll({
          //   DocumentType: 8,
          //   ReferenceCode: this.RequestBribeID$.getValue()
          // }).subscribe((Mas) => {

          //   // 2.2.3(2)
          //   this.masDocumentMainService.MasDocumentMainupdDelete({
          //     DocumentID: Mas.DocumentID
          //   }).subscribe()
          // })

          break;
      }
      alert('บันทึกสำเร็จ');
      this.router.navigate([
        '/reward/bribe/R',
        this.RequestBribeID$.getValue()
      ]);
    } else {
      alert('บันทึกไม่สำเร็จ');
    }
  }

  private buttonCancel() {
    if (confirm('ยืนยันการทำรายการหรือไม่')) {
      switch (this.mode$.getValue()) {
        case 'C':
          break;
        case 'R':
          this.pageLoad();
          break;
      }
    } else {
    }
  }

  private buttonPrint() {
    // ILG60-08-03-00-00-E03 (ปุ่ม “ยกเลิก”)
    // 1 START
    const dialogRef = this.dialog.open(PrintDialogComponent, {
      width: '1200px',
      height: 'auto',
      data: {
        RequestBribeID: this.RequestBribeID$.getValue()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    // 2 END
  }
  private buttonEdit() {
    // ILG60-08-03-00-00-E05 (ปุ่ม “แก้ไข”)
    // 1 START
  }
  private buttonDelete() {
    // ILG60-08-03-00-00-E06 (ปุ่ม “ลบ”)
    // 1 START
    if (confirm('ยืนยันการทำรายการหรือไม่')) {
      // 1.1
      // 1.1.1
      this.requestBribeService
        .RequestBribeupdDelete({
          RequestBribeID: this.RequestBribeID$.getValue()
        })
        .subscribe((resDel: IRequestBribeupdDeleteResponse) => {
          // 1.1.2
          if (resDel.IsSuccess) {
            // 1.1.2(1)
            // 1.1.2(1.1)
            alert('ลบข้อมูลสำเร็จ');
            // 1.1.2(1.2) 'WAIT'
          } else {
            // 1.1.2(2)
            // 1.1.2(2.1)
            alert('ลบข้อมูลไม่สำเร็จ');
          }
        });
    } else {
      // 1.2.1
    }
    // 2 END
  }
  private buttonPrevPage() {
    // : ILG60-08-03-00-00-E07 (ปุ่ม “กลับ >>”)
    // 1 START
    this.router.navigate([
      '/reward/manage/B',
      this.RequestBribeRewardID$.getValue()
    ]);
    // 2 END
  }
  private RequestBribegetByCon(param: IRequestBribegetByCon) {
    // 1.2.1
    this.requestBribeService
      .RequestBribegetByCon(param)
      .subscribe((res: IRequestBribe[]) => {
        // 1.2.3
        this.RequestBribe$.next(res);
      });
  }
  private MasDocumentMaingetAll() {
    // 1.2.2
    this.masDocumentMainService
      .MasDocumentMaingetAll({
        DocumentType: 8,
        ReferenceCode: this.RequestBribeID$.getValue()
      })
      .subscribe((res: MasDocumentModel[]) => {
        // 1.2.3
        this.MasDocument$.next(res);
      });
  }

  private controlEnableAll() {
    // ส่วนคำร้องขอรับเงินสินบน
    // Icon
    this.ILG60_08_03_00_00_E08_DISABLED$.next(false); // ปุ่ม ย่อขยาย Collapse Panel
    // Drop Down List
    this.ILG60_08_03_00_00_E09_DISABLED$.next(false); // เลขที่ใบแจ้งความนำจับ
    // Input Box
    this.ILG60_08_03_00_00_E10_DISABLED$.next(false); // เขียนที่

    // ส่วนรายละเอียดคำร้องขอรับเงินสินบน
    // Check Box
    this.ILG60_08_03_00_00_E11_DISABLED$.next(false); // [Check Box] เลือกรายการคำร้องขอรับเงินสินบน

    // ส่วนหนังสือมอบอำนาจ
    // Icon
    this.ILG60_08_03_00_00_E12_DISABLED$.next(false); // ปุ่ม ย่อขยาย Collapse Panel
    // Input Box
    this.ILG60_08_03_00_00_E13_DISABLED$.next(false); // เขียนที่
    this.ILG60_08_03_00_00_E14_DISABLED$.next(false); // ผู้รับมอบอำนาจ

    // ส่วนเอกสารแนบ
    // Icon
    this.ILG60_08_03_00_00_E16_DISABLED$.next(false); // ปุ่ม ย่อขยาย Collapse Panel
    // Button
    this.ILG60_08_03_00_00_E17_DISABLED$.next(false); // ปุ่ม เพิ่มเอกสารแนบ
    // Icon
    this.ILG60_08_03_00_00_E18_DISABLED$.next(false); // Icon ค้นหาที่อยู่เอกสารแนบ […]
    this.ILG60_08_03_00_00_E19_DISABLED$.next(false); // [ลบ]
  }
  private RequestCommandgetByArrestCode(param: IRequestCommandgetByArrestCode) {
    this.requestCommandService
      .RequestCommandgetByArrestCode(param)
      .subscribe((res: IRequestCommand[]) => {
        // 1.1.4
        this.RequestCommand$.next(res);
      });
  }
  private MasStaffMaingetAll() {
    this.masStaffService
      .MasStaffMaingetAll()
      .subscribe((res: MasStaffModel[]) => {
        this.MasStaffMain$.next(res);
      });
  }
  private MasOfficeMaingetAll() {
    this.masOfficeService
      .MasOfficeMaingetAll()
      .subscribe((res: MasOfficeModel[]) => {
        this.MasOfficeMain$.next(res);
      });
  }
  private setShowButton() {
    this.navService.setSearchBar(false);
    this.navService.setPrintButton(false);
    this.navService.setDeleteButton(false);
    this.navService.setCancelButton(false);
    this.navService.setEditButton(false);
    this.navService.setSaveButton(false);
    this.navService.setPrevPageButton(true);
  }

  public changeForm(form: IFormChange) {
    const { FormName, FormData } = form;

    switch (FormName) {
      case 'ILG60-08-03-00-00-E08':
        this.ILG60_08_03_00_00_E08_FORM_VALID = FormData.valid;
        this.ILG60_08_03_00_00_E08_FORM_DATA = FormData.value;
        break;
      case 'ILG60-08-03-00-00-E12':
        this.ILG60_08_03_00_00_E12_FORM_VALID = FormData.valid;
        this.ILG60_08_03_00_00_E12_FORM_DATA = FormData.valid;
        break;
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
