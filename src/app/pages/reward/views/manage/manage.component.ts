import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManageConfig } from './manage.config';
import { NavigationService } from 'app/shared/header-navigation/navigation.service';
import { RequestRewardService } from '../../services/RequestReward.service';
import { RequestArrestLawsuitService } from '../../services/RequestArrestLawsuit.service';
import {
  IRequestArrestLawsuitGetByIndictmentId,
  IRequestArrestLawsuit
} from '../../interfaces/RequestArrestLawsuit.interface';
import { IRequestRewardgetByRequestBribeRewardID } from '../../interfaces/RequestReward';
import {
  IRequestBribeRewardgetByIndictmentID,
  IRequestBribeReward,
  IRequestBribeRewardinsAll
} from '../../interfaces/RequestBribeReward.interface';
import { RequestBribeRewardService } from '../../services/RequestBribeReward.service';
import {
  IRequestNoticegetByArrestCode,
  IRequestNotice
} from '../../interfaces/RequestNotice';
import { RequestNoticeService } from '../../services/RequestNotice.service';
import { RequestCommandService } from '../../services/RequestCommand.service';
import { IRequestCommandinsAll, IRequestCommandgetByArrestCode } from '../../interfaces/RequestCommand';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent extends ManageConfig implements OnInit {
  constructor(
    private navService: NavigationService,
    private activatedRoute: ActivatedRoute,
    private requestRewardService: RequestRewardService,
    private requestArrestLawsuitService: RequestArrestLawsuitService,
    private requestBribeRewardService: RequestBribeRewardService,
    private requestNoticeService: RequestNoticeService,
    private requestCommandService: RequestCommandService
  ) {
    super();
    this.activatedRoute.params.subscribe(param => {
      this.IndictmentID = param['IndictmentID'];
      this.ArrestCode = param['ArrestCode'];
    });
  }

  ngOnInit() {
    this.setShowButton();
    this.RequestArrestLawsuitgetByIndictmentID({
      IndictmentID: this.IndictmentID
    });
    this.RequestBribeRewardgetByIndictmentID({
      IndictmentID: this.IndictmentID
    });
  }
  private setShowButton() {
    this.navService.setSearchBar(false);
    this.navService.setPrintButton(false);
    this.navService.setDeleteButton(false);
    this.navService.setCancelButton(false);
    this.navService.setEditButton(false);
    this.navService.setSaveButton(false);
  }
  private RequestArrestLawsuitgetByIndictmentID(
    param: IRequestArrestLawsuitGetByIndictmentId
  ) {
    this.requestArrestLawsuitService
      .RequestArrestLawsuitgetByIndictmentID(param)
      .subscribe((res: IRequestArrestLawsuit[]) => {
        this.RequestArrestLawsuitgetByIndictmentID$.next(res);
      });
  }

  private RequestBribeRewardgetByIndictmentID(
    param: IRequestBribeRewardgetByIndictmentID
  ) {
    this.requestBribeRewardService
      .RequestBribeRewardgetByIndictmentID(param)
      .subscribe((res: IRequestBribeReward[]) => {
        console.log('IRequestBribeReward', res);
        if (res.length > 0) {
        } else {
          this.RequestNoticegetByArrestCode({
            ArrestCode: this.ArrestCode
          });
        }
        this.RequestBribeRewardgetByIndictmentID$.next(res);
      });
  }
  private RequestNoticegetByArrestCode(param: IRequestNoticegetByArrestCode) {
    this.requestNoticeService
      .RequestNoticegetByArrestCode(param)
      .subscribe((res: IRequestNotice[]) => {
        if (res.length > 0) {
          this.RequestCommandinsAll({
            TotalPart: res.length || 0,
            ArrestCode: this.ArrestCode,
            RequestCommandDetail: res.map(m => ({
              ...m,
              PartMoney: 1
            }))
          });

          this.RequestBribeRewardinsAll({
            IndictmentID: this.IndictmentID,
            HaveNotice: 1
          });

          this.RequestCommandgetByArrestCode({
            ArrestCode: this.ArrestCode
          })
        }
        this.RequestNoticegetByArrestCode$.next(res);
      });
  }
  private RequestRewardgetByRequestBribeRewardID(
    param: IRequestRewardgetByRequestBribeRewardID
  ) {
    this.requestRewardService
      .RequestRewardgetByRequestBribeRewardID(param)
      .subscribe(res => {
        this.RequestRewardgetByRequestBribeRewardID$.next(res);
      });
  }
  private RequestCommandinsAll(param: IRequestCommandinsAll) {
    this.requestCommandService.RequestCommandinsAll(param).subscribe(res => {
      this.RequestCommandinsAll$.next(res);
    });
  }

  private RequestBribeRewardinsAll(param: IRequestBribeRewardinsAll) {
    this.requestBribeRewardService
      .RequestBribeRewardinsAll(param)
      .subscribe(res => {
        this.RequestBribeRewardinsAll$.next(res);
      });
  }
  private RequestCommandgetByArrestCode(param: IRequestCommandgetByArrestCode) {
    this.requestCommandService
      .RequestCommandgetByArrestCode(param)
      .subscribe(res => {
        this.RequestCommandgetByArrestCode$.next(res);
      });
  }
}
