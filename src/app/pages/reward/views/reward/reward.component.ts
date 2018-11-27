import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { RewardConfig, IRewardBinding } from './reward.config';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestCompareService } from '../../services/RequestCompare.service';
import { RequstLawsuitJudgementService } from '../../services/RequstLawsuitJudgement.service';
import { IRequestCompare } from '../../interfaces/RequestCompare';
import { IRequestLawsuitJudgement } from '../../interfaces/RequestLawsuitJudgement';
import { NonRequestRewardStaffService } from '../../services/NonRequestRewardStaff.service';
import { INonRequestRewardStaff } from '../../interfaces/NonRequestRewardStaff';
import { RequestBribeRewardService } from '../../services/RequestBribeReward.service';
import { NavigationService } from 'app/shared/header-navigation/navigation.service';
import { RequestRewardService } from '../../services/RequestReward.service';
import {
  IRequestReward,
  IRequestRewardinsAllRespone
} from '../../interfaces/RequestReward';
import { MasDocumentMainService } from '../../services/master/MasDocumentMain.service';
import { MasDocumentModel } from 'app/models/mas-document.model';
import { TransactionRunningService } from '../../services/TransactionRunning.service';
import { ITransactionRunning } from '../../interfaces/TransactionRunning';
import { RequestPaymentFineService } from '../../services/RequestPaymentFine.service';
import { IRequestBribeReward } from '../../interfaces/RequestBribeReward.interface';
import { IFormChange } from '../../interfaces/FormChange';
import { getDateMyDatepicker, convertDateForSave } from 'app/config/dateFormat';
import { SidebarService } from 'app/shared/sidebar/sidebar.component';
import { MatDialog } from '@angular/material';
import { PrintDialogComponent } from '../../shared/print-dialog/print-dialog.component';
import { RequestRewardDetailService } from '../../services/RequestRewardDetail.service';
import { RequestRewardStaffService } from '../../services/RequestRewardStaff.service';
import { RequestRewardStaffModel } from '../../models/RequestRewardStaff.Model';
import { RequestRewardinsAllModel } from '../../models/RequestRewardinsAll.Model';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent extends RewardConfig implements OnInit, OnDestroy {
  public ILG60_08_04_00_00_E12_DATA: IRewardBinding[] = [];
  public aggregate = {};
  constructor(
    private activatedRoute: ActivatedRoute,
    private requestCompareService: RequestCompareService,
    private requstLawsuitJudgementService: RequstLawsuitJudgementService,
    private nonRequestRewardStaffService: NonRequestRewardStaffService,
    private requestBribeReward: RequestBribeRewardService,
    private navService: NavigationService,
    private requestRewardService: RequestRewardService,
    private masDocumentMainService: MasDocumentMainService,
    private transactionRunningService: TransactionRunningService,
    private sidebarService: SidebarService,
    public dialog: MatDialog,
    private _location: Location,
    private requestPaymentFineService: RequestPaymentFineService,
    private requestRewardDetailService: RequestRewardDetailService,
    private requestRewardStaffService: RequestRewardStaffService,
    private router: Router
  ) {
    super();
    this.activatedRoute.params.subscribe(param => {
      this.mode$.next(param['mode']);
      this.IndictmentID$.next(param['IndictmentID']);
      this.RequestRewardID$.next(param['RequestRewardID']);
      this.RequestBribeRewardID$.next(param['RequestBribeRewardID']);
    });

    this.navService.onCancel.takeUntil(this.destroy$).subscribe(command => {
      if (command === true) {
        this.navService.onCancel.next(false);
        this.buttonCancel();
      }
    });
    this.navService.onSave.takeUntil(this.destroy$).subscribe(command => {
      if (command === true) {
        this.navService.onSave.next(false);
        this.buttonSave();
      }
    });
    this.navService.onEdit.takeUntil(this.destroy$).subscribe(command => {
      if (command === true) {
        this.navService.onEdit.next(false);
        this.buttonEdit();
      }
    });

    this.navService.onDelete.takeUntil(this.destroy$).subscribe(command => {
      if (command === true) {
        this.navService.onDelete.next(false);
        this.buttonDelete();
      }
    });
    this.navService.onPrint.takeUntil(this.destroy$).subscribe(command => {
      if (command === true) {
        this.navService.onPrint.next(false);
        this.buttonPrint();
      }
    });
  }

  ngOnInit() {
    this.sidebarService.setVersion('0.0.1.6');
    this.pageLoad();
  }
  private async pageLoad() {
    // 1 START
    switch (this.mode$.getValue()) {
      case 'C':
        // 1.1
        // this.masTitleService
        //   .MasTitleMaingetAll()
        //   .subscribe((title: MasTitleModel[]) => {
        //     this.MasTitleMain = title;
        //   }); // 1.1.1
        // this.masStaffService
        //   .MasStaffMaingetAll()
        //   .subscribe((staff: MasStaffModel[]) => {
        //     this.MasStaffMain = staff;
        //   }); // 1.1.2

        // this.masOfficeService
        //   .MasOfficeMaingetAll()
        //   .subscribe((Office: MasOfficeModel[]) => {
        //     this.MasOfficeMain = Office;
        //   }); // 1.1.3

        const RequestCompare: IRequestCompare[] = await this.requestCompareService
          .RequestComparegetByIndictmentID({
            IndictmentID: this.IndictmentID$.getValue()
          })
          .toPromise();
        this.ILG60_08_04_00_00_E08_DATA$.next({
          methodName: 'RequestComparegetByIndictmentID',
          data: RequestCompare
        });
        // 1.1.6
        // 1.1.4

        const LawsuitJudgement: IRequestLawsuitJudgement[] = await this.requstLawsuitJudgementService
          .RequstLawsuitJudgementgetByIndictmentID({
            IndictmentID: Number(this.IndictmentID$.getValue())
          })
          .toPromise();
        this.requstLawsuitJudgement$.next(LawsuitJudgement);
        this.ILG60_08_04_00_00_E08_DATA$.next({
          methodName: 'RequstLawsuitJudgementgetByIndictmentID',
          data: LawsuitJudgement
        });
        // 1.1.5

        // 1.1.7
        const nonRequestRewardStaff: INonRequestRewardStaff[] = await this.nonRequestRewardStaffService
          .NonRequestRewardStaffgetByIndictmentID({
            IndictmentID: this.IndictmentID$.getValue()
          })
          .toPromise();

        this.Input_nonRequestRewardStaff$.next(nonRequestRewardStaff);
        // this.ILG60_08_04_00_00_E12_DATA$.next({
        //   methodName: 'nonRequestRewardStaff',
        //   data: nonRequestRewardStaff
        // });

        // this.ILG60_08_04_00_00_E12_DATA$.next(nonRequestRewardStaff); // 1.1.8

        // 1.1.9
        const RequestBribeReward = await this.requestBribeReward
          .RequestBribeRewardgetByIndictmentID({
            IndictmentID: this.IndictmentID$.getValue()
          })
          .toPromise();
        this.ILG60_08_04_00_00_E08_DATA$.next({
          methodName: 'RequestBribeRewardgetByIndictmentID',
          data: RequestBribeReward
        }); // 1.1.10

        this.Input_RequestBribeRewardgetByIndictmentID$.next(
          RequestBribeReward
        );
        // this.ILG60_08_04_00_00_E12_DATA$.next({
        //   methodName: 'RequestBribeRewardgetByIndictmentID',
        //   data: RequestBribeReward
        // });

        // this.ILG60_08_04_00_00_E12_DATA$.next(RequestBribeReward); // 1.1.10

        // 1.1.11 'WAIT'

        // 1.1.12
        this.navService.setSaveButton(true); // 1.1.12(1)
        this.navService.setCancelButton(true); // 1.1.12(2)
        this.navService.setPrintButton(false);
        this.navService.setEditButton(false);
        this.navService.setDeleteButton(false);
        this.navService.setPrevPageButton(false);
        this.navService.setSearchBar(false);
        this.navService.setNextPageButton(false);
        break;
      case 'R':
        // 1.2

        // 1.2.1
        const RequestReward: IRequestReward[] = await this.requestRewardService
          .RequestRewardgetByCon({
            RequestRewardID: this.RequestRewardID$.getValue()
          })
          .toPromise();
        this.ILG60_08_04_00_00_E08_DATA$.next({
          methodName: 'RequestRewardgetByCon',
          data: RequestReward
        });
        console.log('RequestReward', RequestReward);

        this.Input_RequestRewardgetByCon$.next(RequestReward);
        // this.ILG60_08_04_00_00_E12_DATA$.next({
        //   methodName: 'RequestRewardgetByCon',
        //   data: RequestReward
        // });

        // 1.2.2
        const masDocumentMain: MasDocumentModel[] = await this.masDocumentMainService
          .MasDocumentMaingetAll({
            DocumentType: 9,
            ReferenceCode: this.RequestRewardID$.getValue()
          })
          .toPromise();
        this.MasDocument$.next(masDocumentMain);

        break;
    }
    // 2 END
  }

  public async buttonSave() {
    // 1.3.2.	รหัสเหตุการณ์ : ILG60-08-04-00-00-E02 (ปุ่ม “บันทึก”)

    // 1 START
    // 1.1 'WAIT'
    // 1.2 'WAIT'
    // 1.3 'WAIT'
    // 1.4 'WAIT'
    // 1.5 'WAIT'
    if (this.ILG60_08_04_00_00_E08_FORM_VALID) {
      // 2
      try {
        switch (this.mode$.getValue()) {
          case 'C':
            // 2.1

            const TransactionRunning: ITransactionRunning[] = await this.transactionRunningService
              .TransactionRunninggetByCon({
                RunningTable: 'ops_requestreward',
                RunningOfficeCode: this.OfficeCode
              })
              .toPromise();
            // 2.1.2
            if (TransactionRunning.length > 0) {
              const tRunning: ITransactionRunning = TransactionRunning[0];
              // 2.1.2(1)
              // 2.1.2(1.1)
              await this.transactionRunningService
                .TransactionRunningupdByCon({
                  RunningID: tRunning.RunningID
                })
                .toPromise()
                .then();

              // 2.1.2(1.2)
              const RunningPrefix = `${this.leftPad(
                tRunning.RunningPrefix,
                2
              )}`; // 2.1.2(1.2(1))
              const RunningOfficeCode = `${this.leftPad(
                tRunning.RunningOfficeCode,
                6
              )}`; // 2.1.2(1.2(2))
              const RunningYear = `${this.leftPad(tRunning.RunningYear, 2)}`; // 2.1.2(1.2(3))
              const RunningNo = `${this.leftPad(
                (Number(tRunning.RunningNo) + 1).toString(),
                5
              )}`; // 2.1.2(1.2(4))
              this.RequestBribeCode =
                RunningPrefix + RunningOfficeCode + RunningYear + RunningNo;
            } else {
              // 2.1.2(2)

              // 2.1.2(2.1)
              await this.transactionRunningService
                .TransactionRunninginsAll({
                  RunningOfficeCode: this.OfficeCode,
                  RunningTable: 'ops_requestreward',
                  RunningPrefix: 'RW'
                })
                .toPromise()
                .then();

              // 2.1.2(2.2)
              this.RequestRewardCode = `RW${this.leftPad(
                this.OfficeCode,
                0
              )}${this.leftPad(this.yy_thaibuddha, 2)}00001`;
            }

            // 2.1.3
            this.ILG60_08_04_00_00_E08_FORM_DATA.RequestBribeRewardID = this.RequestBribeRewardID$.getValue();
            this.ILG60_08_04_00_00_E08_FORM_DATA.RequestRewardCode = this.RequestRewardCode;
            this.ILG60_08_04_00_00_E08_FORM_DATA.RequestRewardStaff = this.ILG60_08_04_00_00_E12_FORM_DATA;
            this.ILG60_08_04_00_00_E08_FORM_DATA.RequestDate = this.ConvDateTimeToDate(
              convertDateForSave(
                getDateMyDatepicker(
                  this.ILG60_08_04_00_00_E08_FORM_DATA.RequestDate
                )
              )
            );
            const RequestRewardinsAllRespone: IRequestRewardinsAllRespone = await this.requestRewardService
              .RequestRewardinsAll(this.ILG60_08_04_00_00_E08_FORM_DATA)
              .toPromise();
            console.log(
              'ILG60_08_04_00_00_E08_FORM_DATA',
              this.ILG60_08_04_00_00_E08_FORM_DATA
            );

            if (RequestRewardinsAllRespone.RequestRewardID) {
              this.RequestRewardID$.next(
                RequestRewardinsAllRespone.RequestRewardID
              );
              // 2.1.5
              // 2.1.5(1)
              if (
                this.ILG60_08_04_00_00_E19_FORM_DATA &&
                this.ILG60_08_04_00_00_E19_FORM_DATA.length > 0
              ) {
                this.ILG60_08_04_00_00_E19_FORM_DATA.forEach(async element => {
                  const resMasDocumentMain = await this.masDocumentMainService
                    .MasDocumentMaininsAll({
                      DocumentType: `9`,
                      ReferenceCode: `${
                        RequestRewardinsAllRespone.RequestRewardID
                      }`,
                      DocumentID: '',
                      DataSource: `${element.DataSource}`,
                      FilePath: `${element.FilePath}`,
                      DocumentName: '',
                      IsActive: `1`
                    })
                    .toPromise();
                  if (resMasDocumentMain['DocumentID']) {
                    // 2.1.5(2) 'WAIT'
                  }
                });
              }
            }

            // 2.1.4
            this.RequestPaymentFineupdByCon.forEach(async PaymentFineID => {
              await this.requestPaymentFineService
                .RequestPaymentFineupdByCon({
                  PaymentFineID: PaymentFineID
                })
                .toPromise();
            });

            // 2.1.6 => 3

            break;
          case 'R':
            // 2.2

            // 2.2.1
            await this.requestRewardService
              .RequestRewardupdByCon(this.RequestRewardUpd$.getValue())
              .toPromise();

            // 2.2.2
            await this.RequestRewardDetailupdDelete.forEach(
              RequestRewardDetailID => {
                this.requestRewardDetailService
                  .RequestRewardDetailupdDelete({
                    RequestRewardDetailID: RequestRewardDetailID
                  })
                  .toPromise();
              }
            );

            // 2.2.3
            await this.RequestRewardStaffupdDelete.forEach(StaffID => {
              this.requestRewardStaffService
                .RequestRewardStaffupdDelete({
                  StaffID: StaffID
                })
                .toPromise();
            });

            // 2.2.4
            await this.RequestRewardStaffupdByCon.forEach(
              RequestRewardStaff => {
                this.requestRewardStaffService
                  .RequestRewardStaffupdByCon(RequestRewardStaff)
                  .toPromise();
              }
            );

            // 2.2.5 'WAIT'
            // 2.2.6 'WAIT'
            // 2.2.7 'WAIT'
            // 2.2.8 'WAIT'
            break;
        }
        alert('บันทึกสำเร็จ');
        this.router.navigate([
          '/reward/reward/R',
          this.RequestRewardID$.getValue()
        ]);
      } catch (error) {
        alert('บันทึกไม่สำเร็จ' + error);
      }
    } else {
      alert('กรุณากรอกให้ครบถ้วน');
    }
  }
  public async buttonPrint() {
    // ILG60-08-02-00-00-E05
    // 1 START

    // 1.3.1
    let RequestReward: IRequestReward[];
    await this.requestRewardService
      .RequestRewardgetByCon({
        RequestRewardID: this.RequestRewardID$.getValue()
      })
      .toPromise()
      .then((res: IRequestReward[]) => {
        RequestReward = res;
      });

    // 1.3.2
    let MasDocument: MasDocumentModel[];
    await this.masDocumentMainService
      .MasDocumentMaininsAll({
        ReferenceCode: this.RequestRewardID$.getValue(),
        DocumentType: 9
      })
      .toPromise()
      .then((res: MasDocumentModel[]) => {
        MasDocument = res;
      });

    const printDoc: any[] = RequestReward.map(m => ({
      DocName: `${m.RequestRewardCode}: คำร้องขอรับเงินรางวัล`,
      DocType: 'แบบฟอร์ม'
    }));

    printDoc.concat(
      MasDocument.map(m => ({
        DocName: `${m.DocumentName}`,
        DocType: 'เอกสารแนบภายใน'
      }))
    );

    const dialogRef = this.dialog.open(PrintDialogComponent, {
      width: '1200px',
      height: 'auto',
      data: {
        printDoc: printDoc
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
    // 2 END
  }

  private buttonCancel() {
    // 1 START
    if (confirm('ยืนยันการทำรายการหรือไม่')) {
      // 1.1
      switch (this.mode$.getValue()) {
        case 'C':
          this._location.back();
          break;
        case 'R':
          this.pageLoad();
          break;
      }
    }
    // 2 END
  }
  private buttonDelete() {}
  private buttonEdit() {}
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  public changeForm(form: IFormChange) {
    const { FormName, FormData } = form;

    switch (FormName) {
      case 'ILG60-08-04-00-00-E08':
        this.ILG60_08_04_00_00_E08_FORM_VALID = FormData.valid;
        const FormData08 = FormData.value;
        const m08 = RequestRewardinsAllModel;
        Object.keys(m08).forEach(x => {
          m08[x] = FormData08[x] || '';
        });
        this.ILG60_08_04_00_00_E08_FORM_DATA = this.ConvObjectValue(m08);

        break;
      case 'ILG60-08-04-00-00-E12':
        this.ILG60_08_04_00_00_E12_FORM_VALID = FormData.valid;

        const mergeArrayFormData: any = [
          // ...(FormData.controls['RequestBribeRewardForm'].value || []),
          // ...(FormData.controls['RequestRewardForm'].value || []),
          // ...(FormData.controls['nonRequestRewardStaffForm'].value || []),
          ...(FormData.controls['sharedBribeRewardForm'].value || [])
        ];
        const newMapData: any[] = [];
        mergeArrayFormData.forEach(element => {
          const m12 = RequestRewardStaffModel;
          Object.keys(m12).forEach(x => {
            m12[x] = element[x] || '';
          });
          newMapData.push(this.ConvObjectValue(m12));
        });

        // console.log('mergeArrayFormData', newMapData);

        this.ILG60_08_04_00_00_E12_FORM_DATA = newMapData;
        break;
      case 'ILG60-08-04-00-00-E19':
        this.ILG60_08_04_00_00_E19_FORM_VALID = FormData.valid;
        const Documents = FormData.value.Documents;
        this.ILG60_08_04_00_00_E19_FORM_DATA = Documents;
        break;
    }
  }
  public emitAggregate(aggregate) {
    this.aggregate = aggregate;
  }
}
