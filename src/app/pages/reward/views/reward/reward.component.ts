import { Component, OnInit } from '@angular/core';
import { RewardConfig, IRewardBinding } from './reward.config';
import { ActivatedRoute } from '@angular/router';
import { MasTitleService } from '../../services/master/MasTitle.service';
import { MasTitleModel, MasStaffModel } from 'app/models';
import { MasOfficeModel } from 'app/models/mas-office.model';
import { MasStaffService } from '../../services/master/MasStaff.service';
import { MasOfficeService } from '../../services/master/MasOffice.service';
import { RequestCommandService } from '../../services/RequestCommand.service';
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
import { IResponseCommon } from '../../interfaces/ResponseCommon.interface';
import { IRequestBribeReward } from '../../interfaces/RequestBribeReward.interface';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent extends RewardConfig implements OnInit {
  public MasTitleMain: MasTitleModel[];
  public MasStaffMain: MasStaffModel[];
  public MasOfficeMain: MasOfficeModel[];
  public ILG60_08_04_00_00_E12_DATA: IRewardBinding[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private masTitleService: MasTitleService,
    private masStaffService: MasStaffService,
    private masOfficeService: MasOfficeService,
    private requestCompareService: RequestCompareService,
    private requstLawsuitJudgementService: RequstLawsuitJudgementService,
    private nonRequestRewardStaffService: NonRequestRewardStaffService,
    private requestBribeReward: RequestBribeRewardService,
    private navService: NavigationService,
    private requestRewardService: RequestRewardService,
    private masDocumentMainService: MasDocumentMainService,
    private transactionRunningService: TransactionRunningService,
    private requestPaymentFineService: RequestPaymentFineService
  ) {
    super();
    this.activatedRoute.params.subscribe(param => {
      this.mode$.next(param['mode']);
      this.IndictmentID$.next(param['IndictmentID']);
      this.RequestRewardID$.next(param['RequestRewardID']);
      this.RequestBribeRewardID$.next(param['RequestBribeRewardID']);
    });
  }

  ngOnInit() {
    this.pageLoad();
  }
  private pageLoad() {
    // 1 START
    switch (this.mode$.getValue()) {
      case 'C':
        // 1.1
        this.masTitleService
          .MasTitleMaingetAll()
          .subscribe((title: MasTitleModel[]) => {
            this.MasTitleMain = title;
          }); // 1.1.1
        this.masStaffService
          .MasStaffMaingetAll()
          .subscribe((staff: MasStaffModel[]) => {
            this.MasStaffMain = staff;
          }); // 1.1.2

        this.masOfficeService
          .MasOfficeMaingetAll()
          .subscribe((Office: MasOfficeModel[]) => {
            this.MasOfficeMain = Office;
          }); // 1.1.3

        this.requestCompareService
          .RequestComparegetByIndictmentID({
            IndictmentID: this.IndictmentID$.getValue()
          })
          .subscribe((RequestCompare: IRequestCompare[]) => {
            if (RequestCompare.length > 0) {
              this.ILG60_08_04_00_00_E08_DATA$.next({
                methodName: 'RequestComparegetByIndictmentID',
                data: RequestCompare
              });
            }
            // 1.1.6
          }); // 1.1.4

        this.requstLawsuitJudgementService
          .RequstLawsuitJudgementgetByIndictmentID({
            IndictmentID: Number(this.IndictmentID$.getValue())
          })
          .subscribe((LawsuitJudgement: IRequestLawsuitJudgement[]) => {
            if (LawsuitJudgement.length > 0) {
              this.requstLawsuitJudgement$.next(LawsuitJudgement); // 1.1.6
              this.ILG60_08_04_00_00_E08_DATA$.next({
                methodName: 'RequstLawsuitJudgementgetByIndictmentID',
                data: LawsuitJudgement
              });
            }
          }); // 1.1.5

        // 1.1.7
        this.nonRequestRewardStaffService
          .NonRequestRewardStaffgetByIndictmentID({
            IndictmentID: this.IndictmentID$.getValue()
          })
          .subscribe((nonRequestRewardStaff: INonRequestRewardStaff[]) => {
            this.ILG60_08_04_00_00_E12_DATA$.next({
              methodName: 'nonRequestRewardStaff',
              data: nonRequestRewardStaff
            });
            // this.ILG60_08_04_00_00_E12_DATA$.next(nonRequestRewardStaff); // 1.1.8
          });

        // 1.1.9
        this.requestBribeReward
          .RequestBribeRewardgetByIndictmentID({
            IndictmentID: this.IndictmentID$.getValue()
          })
          .subscribe((RequestBribeReward: IRequestBribeReward[]) => {
            this.ILG60_08_04_00_00_E08_DATA$.next({
              methodName: 'RequestBribeReward',
              data: RequestBribeReward
            }); // 1.1.10

            this.ILG60_08_04_00_00_E12_DATA$.next({
              methodName: 'RequestBribeReward',
              data: RequestBribeReward
            });

            // this.ILG60_08_04_00_00_E12_DATA$.next(RequestBribeReward); // 1.1.10
          });

        // 1.1.11 'WAIT'

        // 1.1.12
        this.navService.setSaveButton(true); // 1.1.12(1)
        this.navService.setCancelButton(true); // 1.1.12(2)
        this.navService.setPrintButton(false);
        this.navService.setEditButton(false);
        this.navService.setDeleteButton(false);
        this.navService.setPrevPageButton(false);
        this.navService.setSearchBar(false);
        break;
      case 'R':
        // 1.2

        // 1.2.1
        this.requestRewardService
          .RequestRewardgetByCon({
            RequestRewardID: this.RequestRewardID$.getValue()
          })
          .subscribe((RequestReward: IRequestReward[]) => {
            if (RequestReward.length > 0) {
              this.ILG60_08_04_00_00_E08_DATA$.next({
                methodName: 'RequestRewardgetByCon',
                data: RequestReward
              });
            }
          });

        // 1.2.2
        this.masDocumentMainService
          .MasDocumentMaingetAll({
            DocumentType: 9,
            ReferenceCode: this.RequestRewardID$.getValue()
          })
          .subscribe((masDocumentMain: MasDocumentModel[]) => {
            this.MasDocument$.next(masDocumentMain);
          });

        break;
    }
    // 2 END
  }

  public saveButton(inputField) {
    // 1.3.2.	รหัสเหตุการณ์ : ILG60-08-04-00-00-E02 (ปุ่ม “บันทึก”)

    // 1 START
    // 1.1 'WAIT'
    // 1.2 'WAIT'
    // 1.3 'WAIT'
    // 1.4 'WAIT'
    // 1.5 'WAIT'

    // 2
    switch (this.mode$.getValue()) {
      case 'C':
        // 2.1

        this.transactionRunningService
          .TransactionRunninggetByCon({
            RunningTable: 'ops_requestreward',
            RunningOfficeCode: this.OfficeCode
          })
          .subscribe((TransactionRunning: ITransactionRunning[]) => {
            // 2.1.2
            if (TransactionRunning.length > 0) {
              const tRunning: ITransactionRunning = TransactionRunning[0];
              // 2.1.2(1)
              // 2.1.2(1.1)
              this.transactionRunningService.TransactionRunningupdByCon({
                RunningID: tRunning.RunningID
              });

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
              this.transactionRunningService.TransactionRunninginsAll({
                RunningOfficeCode: this.OfficeCode,
                RunningTable: 'ops_requestreward',
                RunningPrefix: 'RW'
              });

              // 2.1.2(2.2)
              this.RequestRewardCode = `RW${this.leftPad(
                this.OfficeCode,
                0
              )}${this.leftPad(this.yy_thaibuddha, 2)}00001`;
            }

            // 2.1.3
            this.requestRewardService
              .RequestRewardinsAll({
                RequestBribeRewardID: this.RequestBribeRewardID$.getValue(),
                RequestRewardCode: this.RequestRewardCode
              })
              .subscribe((res: IRequestRewardinsAllRespone) => {
                if (res.RequestRewardID) {
                  // 2.1.5
                  // 2.1.5(1)
                  this.masDocumentMainService
                    .MasDocumentMaininsAll({
                      DocumentType: 9,
                      ReferenceCode: res.RequestRewardID
                    })
                    .subscribe(resMasDocumentMain => {
                      if (resMasDocumentMain['DocumentID']) {
                        // 2.1.5(2) 'WAIT'
                      }
                    });
                }
              });

            // 2.1.4 'WAIT'
            // this.requestPaymentFineService.RequestPaymentFineupdByCon({
            //   PaymentFineID:
            // })

            // 2.1.6 => 3
          });

        break;
      case 'R':
        // 2.2 'WAIT'

        break;
    }
  }
}
