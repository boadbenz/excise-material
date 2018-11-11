import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasStaffService } from '../../services/master/MasStaff.service';
import { BribeConfig } from './bribe.config';
import { MasOfficeService } from '../../services/master/MasOffice.service';
import { RequestCommandService } from '../../services/RequestCommand.service';
import { IRequestCommandgetByArrestCode } from '../../interfaces/RequestCommand';
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
  IRequestBribe
} from '../../interfaces/RequestBribe.interface';

@Component({
  selector: 'app-bribe',
  templateUrl: './bribe.component.html',
  styleUrls: ['./bribe.component.scss'],
  providers: [BribeService]
})
export class BribeComponent extends BribeConfig implements OnInit {
  public mode: 'C' | 'R';
  constructor(
    private activatedRoute: ActivatedRoute,
    private masStaffService: MasStaffService,
    private masOfficeService: MasOfficeService,
    private requestCommandService: RequestCommandService,
    private bribeService: BribeService,
    private navService: NavigationService,
    private rewardService: RewardService,
    private transactionRunningService: TransactionRunningService,
    private requestBribeService: RequestBribeService
  ) {
    super();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      switch (param['mode']) {
        case 'C':
          this.MasStaffMaingetAll();
          this.MasOfficeMaingetAll();
          break;
        case 'R':

          break;
      }
      this.bribeService.mode$.next(param['mode']);
      this.bribeService.ArrestCode$.next(param['ArrestCode']);

      this.bribeService.RequestCommand$.next([{
        ddf: 'ssss'
      }]);
    });
    this.bribeService.ArrestCode$.subscribe(ArrestCode => {
      this.RequestCommandgetByArrestCode({ ArrestCode: ArrestCode });
    });
    this.setShowButton();
    this.navService.onPrevPage.subscribe(res => {
      this.rewardService.bribeState$.next({
        mode: 'B',
        RequestBribeRewardID: this.RequestBribeRewardID
      });
    });
  }
  public RequestCommandgetByArrestCode(param: IRequestCommandgetByArrestCode) {
    this.requestCommandService
      .RequestCommandgetByArrestCode(param)
      .subscribe(res => {
        this.bribeService.RequestCommand$.next(res);
      });
  }
  public MasStaffMaingetAll() {
    this.masStaffService.MasStaffMaingetAll().subscribe(res => {
      this.bribeService.MasStaffMaingetAll$.next(res);
    });
  }
  public MasOfficeMaingetAll() {
    this.masOfficeService.MasOfficeMaingetAll().subscribe(res => {
      this.bribeService.MasOfficeMaingetAll$.next(res);
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
  private modeCase(mode) {
    switch (mode) {
      case 'C':
        this.TransactionRunninggetByCon();

        break;
    }
  }
  private TransactionRunninggetByCon() {
    this.transactionRunningService
      .TransactionRunninggetByCon({
        RunningTable: 'ops_requestbribe',
        RunningOfficeCode: this.OfficeCode
      })
      .subscribe((res: ITransactionRunning[]) => {
        if (res.length > 0) {
          res.forEach(e => {
            this.TransactionRunningupdByCon(e.RunningID);
          });
        } else {
          this.TransactionRunninginsAll({
            RunningTable: 'ops_requestbribe',
            RunningPrefix: 'BR'
          });
        }
      });
  }
  private TransactionRunningupdByCon(RunningID: number) {
    this.transactionRunningService
      .TransactionRunningupdByCon({ RunningID: RunningID })
      .subscribe((res: ITransactionRunning[]) => {
        res.forEach(e => {
          const RequestBribeCode = `${e.RunningPrefix}${e.RunningOfficeCode}${
            e.RunningYear
          }${e.RunningNo}`;
          this.bribeService.RequestBribeCode$.next(RequestBribeCode);
        });
      });
  }
  private TransactionRunninginsAll(param: ITransactionRunninginsAll) {
    this.transactionRunningService
      .TransactionRunninginsAll(param)
      .subscribe((res: ITransactionRunning[]) => {
        const RequestBribeCode = `BR${this.OfficeCode}${(
          new Date().getFullYear() + 543
        )
          .toString()
          .substring(2, 4)}00001`;
      });
  }
  private RequestBribeinsAll(param: IRequestBribeinsAll) {
    this.requestBribeService
      .RequestBribeinsAll(param)
      .subscribe((res: IRequestBribe[]) => {});
  }
}
