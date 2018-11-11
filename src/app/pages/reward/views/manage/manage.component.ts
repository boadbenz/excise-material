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
import {
  IRequestCommandinsAll,
  IRequestCommandgetByArrestCode,
  IRequestCommand
} from '../../interfaces/RequestCommand';
import { RequestBribeService } from '../../services/RequestBribe.service';
import { IRequestBribegetByRequestBribeRewardID } from '../../interfaces/RequestBribe.interface';

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
    private requestCommandService: RequestCommandService,
    private requestBribeService: RequestBribeService
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
          const RequestBribeReward: IRequestBribeReward = res[0];
          this.RequestBribeRewardID$.next(
            RequestBribeReward.RequestBribeRewardID
          );
          this.HaveNoticeSwitch(RequestBribeReward.HaveNotice);
        } else {
          this.RequestNoticegetByArrestCode({
            ArrestCode: this.ArrestCode
          });
        }
        this.RequestBribeRewardgetByIndictmentID$.next(res);
      });
  }
  private HaveNoticeSwitch(HaveNotice: number) {
    switch (HaveNotice) {
      case 0:
        this.RequestRewardgetByRequestBribeRewardID({
          RequestBribeRewardID: this.RequestBribeRewardID$.getValue()
        });
        break;

      case 1:
        this.RequestBribegetByRequestBribeRewardID({
          RequestBribeRewardID: this.RequestBribeRewardID$.getValue()
        });

        this.RequestRewardgetByRequestBribeRewardID({
          RequestBribeRewardID: this.RequestBribeRewardID$.getValue()
        });


        this.RequestCommandgetByArrestCode({
          ArrestCode: this.ArrestCode
        }); 
        break;
    }
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
          });
        } else {
          this.RequestBribeRewardinsAll({
            IndictmentID: this.IndictmentID,
            HaveNotice: 0
          });
        }
        this.RequestNoticegetByArrestCode$.next(res);
      });
  }
  private RequestRewardgetByRequestBribeRewardID(
    param: IRequestRewardgetByRequestBribeRewardID
  ) {
    this.requestRewardService
      .RequestRewardgetByRequestBribeRewardID(param)
      .subscribe((res: IRequestRewardgetByRequestBribeRewardID[]) => {
        if (res.length > 0) {
          this.ILG60_08_02_00_00E09_DATA$.next(res);
        }

        this.ILG60_08_02_00_00E08$.next(true);
        this.ILG60_08_02_00_00E09$.next(false);
        this.ILG60_08_02_00_00E11$.next(false);
        this.ILG60_08_02_00_00E14$.next(true);

        this.navService.setSearchBar(false);
        this.navService.setPrintButton(true);
        this.navService.setDeleteButton(true);
        this.navService.setCancelButton(false);
        this.navService.setEditButton(true);
        this.navService.setSaveButton(false);
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
      .subscribe((res: IRequestCommand[]) => {
        const RequestCommand: IRequestCommand = res[0];
        if(RequestCommand.RequestCommandDetail.length === 1) {

          this.ILG60_08_02_00_00E08$.next(true);
          this.ILG60_08_02_00_00E09$.next(false);
          this.ILG60_08_02_00_00E11$.next(false);
          this.ILG60_08_02_00_00E14$.next(true);

          this.navService.setSearchBar(false);
          this.navService.setPrintButton(true);
          this.navService.setDeleteButton(true);
          this.navService.setCancelButton(false);
          this.navService.setEditButton(true);
          this.navService.setSaveButton(false);
        } else if(RequestCommand.RequestCommandDetail.length > 1) {
          this.ILG60_08_02_00_00E09_DATA$.next(res);

          this.ILG60_08_02_00_00E08$.next(true);
          this.ILG60_08_02_00_00E09$.next(true);
          this.ILG60_08_02_00_00E11$.next(true);
          this.ILG60_08_02_00_00E14$.next(true);

          this.navService.setSearchBar(false);
          this.navService.setPrintButton(true);
          this.navService.setDeleteButton(true);
          this.navService.setCancelButton(false);
          this.navService.setEditButton(true);
          this.navService.setSaveButton(false);
        }
        
      });
  }

  private RequestBribegetByRequestBribeRewardID(
    param: IRequestBribegetByRequestBribeRewardID
  ) {
    this.requestBribeService
      .RequestBribegetByRequestBribeRewardID(param)
      .subscribe(res => {
        this.RequestBribegetByRequestBribeRewardID$.next(res);
      });
  }
}
