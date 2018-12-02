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
import { convertDateForSave, getDateMyDatepicker } from 'app/config/dateFormat';
import {
  RequestBribeinsAllModel,
  RequestBribeStaffModel
} from '../../models/RequestBribeinsAll.model';
import { Location } from '@angular/common';
import { DropdownInterface } from '../../shared/interfaces/dropdown-interface';
import { Observable } from 'rxjs/Observable';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap
} from 'rxjs/operators';
import { IRequestPaymentFineDetail } from '../../interfaces/RequestPaymentFineDetail';
import { replaceFakePath } from 'app/config/dataString';
import { RequestBribeupdByConModel } from '../../models/RequestBribeupdByCon.Model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
@Component({
  selector: 'app-bribe',
  templateUrl: './bribe.component.html',
  styleUrls: ['./bribe.component.scss'],
  providers: [BribeService]
})
export class BribeComponent extends BribeConfig implements OnInit, OnDestroy {
  public BribeFormGroup: FormGroup;
  public StaffFormGroup: FormGroup;
  public TotalPart: number;
  public PartMoney: number;
  public isEdit = false;
  public RequestCommand_NoticeCode_list: DropdownInterface[];
  public MasStaffMaingetAllList: any[];
  public MasOfficeMainAllList: any[];
  public StaffMainName: any[];
  public PositionName: string;
  public OfficeName: string;
  public aggregate = {
    PaymentFine: 0,
    BribeMoney: 0,
    NetBribeMoney: 0
  };
  get RequestBribeDetail() {
    return this.BribeFormGroup.get('RequestBribeDetail') as FormArray;
  }
  get RequestBribeStaff() {
    return this.BribeFormGroup.get('RequestBribeStaff') as FormArray;
  }
  get Document(): FormArray {
    return this.BribeFormGroup.get('Document') as FormArray;
  }
  searchStation = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length < 1
          ? []
          : this.MasOfficeMainAllList.filter(
              v => v.OfficeName.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
              .slice(0, 10)
              .map(m => m.OfficeName)
      )
    );
  searchStationOfPOA = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length < 1
          ? []
          : this.MasOfficeMainAllList.filter(
              v => v.OfficeName.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
              .slice(0, 10)
              .map(m => m.OfficeName)
      )
    );
  searchStaffMainName = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length < 1
          ? []
          : this.MasStaffMaingetAllList.filter(
              v => v.FullName.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
              .slice(0, 10)
              .map(m => m.FullName)
      )
    );
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
    public dialog: MatDialog,
    private _location: Location
  ) {
    super();
    this.activatedRoute.params.subscribe(param => {
      this.mode$.next(param['mode']);
      this.ArrestCode$.next(param['ArrestCode']);
      this.RequestBribeID$.next(param['RequestBribeID']);
      this.RequestBribeRewardID$.next(param['RequestBribeRewardID']);
    });
    this.navService.setInnerTextNextPageButton('กลับ');
    this.navService.onSave.takeUntil(this.destroy$).subscribe(save => {
      if (save === true) {
        this.navService.onSave.next(false);
        this.buttonSave();
      }
    });
    this.navService.onCancel.takeUntil(this.destroy$).subscribe(cancel => {
      if (cancel === true) {
        this.navService.onCancel.next(false);
        swal({
          title: '',
          text: 'ยืนยันการทำรายการหรือไม่',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirm!'
        }).then(result => {
          if (result.value) {
            this.buttonCancel();
          }
        });
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
        swal({
          title: '',
          text: 'ยืนยันการทำรายการหรือไม่',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirm!'
        }).then(result => {
          if (result.value) {
            this.buttonDelete();
          }
        });
      }
    });
    this.navService.onNextPage.takeUntil(this.destroy$).subscribe(save => {
      if (save === true) {
        this.navService.onNextPage.next(false);
        this.buttonPrevPage();
      }
    });
    this.RequestBribeDetail.valueChanges.subscribe(value => {
      this.aggregate = {
        BribeMoney: 0,
        NetBribeMoney: 0,
        PaymentFine: 0
      };
      const formValAll: any[] = this.RequestBribeDetail.value;
      if (formValAll.length > 0) {
        const formValChecked: any[] = formValAll.filter(f => f.check === true);
        if (formValChecked.length > 0) {
          this.aggregate = {
            PaymentFine:
              formValChecked
                .map(m => Number(m.PaymentFine))
                .reduce((a, b) => (a += b)) || 0,
            BribeMoney:
              formValChecked
                .map(m => Number(m.BribeMoney))
                .reduce((a, b) => (a += b)) || 0,
            NetBribeMoney:
              formValChecked
                .map(m => Number(m.NetBribeMoney))
                .reduce((a, b) => (a += b)) || 0
          };
        }
      }
      this.ref.detectChanges();
    });
    this.BribeFormGroup.get('StationOfPOA')
      .valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(values => {
        if (!(this.mode === 'R' && this.isEdit === false)) {
          const mapStation = this.MasOfficeMainAllList.filter(
            f => f.OfficeName === values
          ).shift();
          if (mapStation) {
            this.StaffFormGroup.get('OfficeCode').patchValue(
              mapStation.OfficeCode
            );
            this.StaffFormGroup.get('OfficeName').patchValue(
              mapStation.OfficeName
            );
            this.StaffFormGroup.get('OfficeShortName').patchValue(
              mapStation.OfficeShortName
            );
          }
        }

        this.ref.detectChanges();
      });
    this.BribeFormGroup.get('StaffName')
      .valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(values => {
        if (!(this.mode === 'R' && this.isEdit === false)) {
          const mapStaff = this.MasStaffMaingetAllList.filter(
            f => f.FullName === values
          ).shift();
          if (mapStaff) {
            const newMap = this.StaffFormGroup.value;
            for (const key in this.StaffFormGroup.value) {
              if (this.StaffFormGroup.value.hasOwnProperty(key)) {
                const element = this.StaffFormGroup.value[key];
                newMap[key] = mapStaff[key] || '';
                this.StaffFormGroup.get(key).patchValue(newMap[key]);
              }
            }
            // console.log('mapStaff', mapStaff);

            this.BribeFormGroup.get('PositionName').patchValue(
              mapStaff.OperationPosName
            );
            this.StaffFormGroup.get('PositionName').patchValue(
              mapStaff.OperationPosName
            );
            this.StaffFormGroup.get('PositionName').patchValue(
              mapStaff.OperationPosName
            );
            this.BribeFormGroup.get('OfficeName').patchValue(
              mapStaff.OfficeName
            );
          } else {
            this.BribeFormGroup.get('PositionName').patchValue('');
            this.BribeFormGroup.get('OfficeName').patchValue('');
          }
        }
        this.ref.detectChanges();
      });
  }
  ngOnInit() {
    this.sidebarService.setVersion('0.0.1.9');

    // ILG60-08-03-00-00-E01 (Page Load)
    this.pageLoad();
    this.navService.onNextPage.takeUntil(this.destroy$).subscribe(res => {
      this.rewardService.bribeState$.next({
        mode: 'B',
        RequestBribeRewardID: this.RequestBribeRewardID
      });
    });
  }
  private async pageLoad() {
    // 1 START
    switch (this.mode$.getValue()) {
      case 'C':
        // 1.1
        this.MasStaffMaingetAllList = (await this.masStaffService
          .MasStaffMaingetAll()
          .toPromise()).map(m => ({
            ...m,
            FullName: m.TitleName + m.FirstName + ' ' + m.LastName
          })); // 1.1.1
        this.MasOfficeMainAllList = await this.masOfficeService
          .MasOfficeMaingetAll()
          .toPromise(); // 1.1.2

        // 1.1.3
        const RequestCommand: IRequestCommand[] = await this.requestCommandService
          .RequestCommandgetByArrestCode({
            ArrestCode: this.ArrestCode$.getValue()
          })
          .toPromise();
        // 1.1.4
        this.RequestCommand$.next(RequestCommand);

        // 1.1.5
        this.controlEnableAll();

        // 1.1.6
        this.navService.setSaveButton(true); // 1.1.6(1)
        this.navService.setCancelButton(true); // 1.1.6(2)
        this.navService.setPrintButton(false);
        this.navService.setEditButton(false);
        this.navService.setDeleteButton(false);
        this.navService.setSearchBar(false);
         this.navService.setNewButton(false);
     this.navService.setEditField(false);
     this.navService.setNextPageButton(false);
     this.navService.setPrevPageButton(false);

        break;
      case 'R':
        // 1.2
        // 1.2.1
        const RequestBribe: IRequestBribe[] = await this.requestBribeService
          .RequestBribegetByCon({
            RequestBribeID: this.RequestBribeID$.getValue()
          })
          .toPromise();
        this.RequestBribeRewardID$.next(RequestBribe[0].RequestBribeRewardID);
        // 1.2.3
        this.RequestBribe$.next(RequestBribe);
        // 1.2.2
        const MasDocument: MasDocumentModel[] = await this.masDocumentMainService
          .MasDocumentMaingetAll({
            DocumentType: 8,
            ReferenceCode: this.RequestBribeID$.getValue()
          })
          .toPromise();
        this.MasDocument$.next(MasDocument); // 1.2.3

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
        this.navService.setNextPageButton(true); // 1.2.5(4)
        this.navService.setSearchBar(false);
        this.navService.setNewButton(false);
        this.navService.setEditField(false);
        this.navService.setNextPageButton(false);
        this.navService.setPrevPageButton(false);
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
    if (this.BribeFormGroup.valid) {
      const checkLengthDetail =
        this.RequestBribeDetail.value.filter(f => f.check === true).length || 0;
      if (!(checkLengthDetail > 0)) {
        swal(
          'ต้องมีรายการในส่วนรายละเอียดคำร้องขอรับเงินสินบนอย่างน้อย 1 รายการที่ CheckBox.Check =  True',
          'warning'
        );
      } else {
        // 2
        switch (this.mode) {
          case 'C':
            // 2.1
            // 2.1.1
            const ITransactionRunning: ITransactionRunning[] = await this.transactionRunningService
              .TransactionRunninggetByCon({
                RunningTable: 'ops_requestbribe',
                RunningOfficeCode: this.OfficeCode
              })
              .toPromise();

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
                RunningPrefix: 'BR' // 2.1.2(2.1.3)
              })
              .toPromise();

            // 2.1.2(2.2)
            const RunningOfficeCode = this.leftPad(this.OfficeCode, 6);
            const yy_thaibuddha = (new Date().getFullYear() + 543)
              .toString()
              .substr(2, 1);
            const RequestBribeCode = `BR${RunningOfficeCode}${yy_thaibuddha}00001`;
            this.RequestBribeCode$.next(RequestBribeCode);
          }

          // 2.1.3
          this.ILG60_08_03_00_00_E08_FORM_DATA[
            'RequestBribeRewardID'
          ] = this.RequestBribeRewardID$.getValue().toString();
          this.ILG60_08_03_00_00_E08_FORM_DATA[
            'RequestBribeCode'
          ] = this.RequestBribeCode$.getValue().toString();
          this.ILG60_08_03_00_00_E08_FORM_DATA[
            'RequestDate'
          ] = this.ConvDateTimeToDate(
            convertDateForSave(
              getDateMyDatepicker(
                this.ILG60_08_03_00_00_E08_FORM_DATA['RequestDate']
              )
            )
          );
          const requestBribe = await this.requestBribeService
            .RequestBribeinsAll(this.ILG60_08_03_00_00_E08_FORM_DATA)
            .toPromise();

          this.RequestBribeID$.next(requestBribe.RequestBribeID);
          // 2.1.4
          this.ILG60_08_03_00_00_E08_FORM_DATA.RequestBribeDetail.forEach(
            async PaymentFineDetailID => {
              await this.requestPaymentFineDetailService
                .RequestPaymentFineDetailupdByCon({
                  PaymentFineDetailID: PaymentFineDetailID.PaymentFineDetailID
                })
                .toPromise();
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
            .toPromise();

          // 2.2.2(1)
          this.ILG60_08_03_00_00_E08_FORM_DATA.delDetailIDs.forEach(
            async PaymentFineDetailID => {
              this.requestBribeDetailService
                .RequestBribeDetailupdDelete({
                  RequestBribeDetailID: PaymentFineDetailID
                })
                .toPromise();
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
        // tslint:disable-next-line:curly
        if (!this.RequestBribeID$.getValue()) {
          swal('บันทึกไม่สำเร็จ', 'error');
        } else {
          swal('บันทึกสำเร็จ', 'success');
          this.isEdit = false;
          this.router.navigate([
            '/reward/bribe/R',
            this.RequestBribeID$.getValue()
          ]);
        }
      }
      // tslint:disable-next-line:curly
      if (!this.RequestBribeID$.getValue()) {
        alert('บันทึกไม่สำเร็จ');
      } else {
        alert('บันทึกสำเร็จ');
        this.router.navigate([
          '/reward/bribe/R',
          this.RequestBribeID$.getValue()
        ]);
      }
    } else {
      swal('บันทึกไม่สำเร็จ', 'error');
    }
  }

  private buttonCancel() {
    // if (confirm('ยืนยันการทำรายการหรือไม่')) {
    switch (this.mode) {
      case 'C':
        break;
      case 'R':
        this.pageLoad();
        break;
    }
    // } else {
    // }
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
  private async buttonDelete() {
    // ILG60-08-03-00-00-E06 (ปุ่ม “ลบ”)
    // 1 START
    // if (confirm('ยืนยันการทำรายการหรือไม่')) {
    // 1.1
    // 1.1.1
    const RequestBribeupdDeleteResponse: IRequestBribeupdDeleteResponse = await this.requestBribeService
      .RequestBribeupdDelete({
        RequestBribeID: this.RequestBribeID$.getValue()
      })
      .toPromise();
    // 1.1.2
    if (RequestBribeupdDeleteResponse.IsSuccess) {
      // 1.1.2(1)
      // 1.1.2(1.1)
      swal('ลบข้อมูลสำเร็จ', 'success');
      // 1.1.2(1.2) 'WAIT'
    } else {
      // 1.1.2(2)
      // 1.1.2(2.1)
      swal('ลบข้อมูลไม่สำเร็จ', 'error');
    }
    // } else {
    //   // 1.2.1
    // }
    // 2 END
  }
  private buttonPrevPage() {
    // : ILG60-08-03-00-00-E07 (ปุ่ม “กลับ >>”)
    // 1 START
    this._location.back();
    // this.router.navigate([
    //   '/reward/manage/B',
    //   this.RequestBribeRewardID$.getValue()
    // ]);
    // 2 END
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
    } else {
      swal('ไม่พบข้อมูลที่สามารถขอรับเงินสินบน', 'error');
    }
  }
  private setShowButton() {
    this.navService.setSearchBar(false);
    this.navService.setPrintButton(false);
    this.navService.setDeleteButton(false);
    this.navService.setCancelButton(false);
    this.navService.setEditButton(false);
    this.navService.setSaveButton(false);
    this.navService.setNextPageButton(true);
  }

  public changeForm(form: IFormChange) {
    const { FormName, FormData } = form;

    switch (FormName) {
      case 'ILG60-08-03-00-00-E08':
        this.ILG60_08_03_00_00_E08_FORM_VALID = FormData.valid;
        const dataE08 = FormData.value;
        console.log(
          'ILG60-08-03-00-00-E08',
          this.ILG60_08_03_00_00_E08_FORM_DATA
        );
        const newDataE08 = RequestBribeinsAllModel;
        Object.keys(RequestBribeinsAllModel).forEach(f => {
          newDataE08[f] = dataE08[f] || '';
        });
        this.ILG60_08_03_00_00_E08_FORM_DATA = this.ConvObjectValue(newDataE08);
        break;
      case 'ILG60-08-03-00-00-E12':
        this.ILG60_08_03_00_00_E12_FORM_VALID = FormData.valid;
        const dataE12 = FormData.value;
        const newDataE12 = RequestBribeStaffModel;
        Object.keys(RequestBribeStaffModel).forEach(f => {
          newDataE12[f] = dataE12[f] || '';
        });
        this.ILG60_08_03_00_00_E12_FORM_DATA = this.ConvObjectValue(newDataE12);
        this.ILG60_08_03_00_00_E08_FORM_DATA['RequestBribeStaff'] = [
          this.ConvObjectValue(this.ILG60_08_03_00_00_E12_FORM_DATA)
        ];
        this.ILG60_08_03_00_00_E08_FORM_DATA['StationOfPOA'] = `${dataE12[
          'StationOfPOA'
        ] || ''}`;
        this.ILG60_08_03_00_00_E08_FORM_DATA[
          'POADate'
        ] = `${this.ConvDateTimeToDate(
          convertDateForSave(getDateMyDatepicker(dataE12['POADate']))
        ) || ''}`;
        this.ILG60_08_03_00_00_E08_FORM_DATA['POATime'] = `${dataE12[
          'POATime'
        ] || ''}`;

        break;
    }
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
