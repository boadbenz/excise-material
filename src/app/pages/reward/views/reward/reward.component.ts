import { Component, OnInit } from '@angular/core';
import { RewardConfig } from './reward.config';
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

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent extends RewardConfig implements OnInit {
  public MasTitleMain: MasTitleModel[];
  public MasStaffMain: MasStaffModel[];
  public MasOfficeMain: MasOfficeModel[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private masTitleService: MasTitleService,
    private masStaffService: MasStaffService,
    private masOfficeService: MasOfficeService,
    private requestCompareService: RequestCompareService,
    private requstLawsuitJudgementService: RequstLawsuitJudgementService,
    private nonRequestRewardStaffService: NonRequestRewardStaffService,
    private requestBribeReward: RequestBribeRewardService,
    private navService: NavigationService
  ) {
    super();
    this.activatedRoute.params.subscribe(param => {
      this.mode$.next(param['mode']);
      this.IndictmentID$.next(param['IndictmentID']);
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
          .subscribe((Compare: IRequestCompare[]) => {
            this.requestCompare$.next(Compare); // 1.1.6
          }); // 1.1.4

        this.requstLawsuitJudgementService
          .RequestLawsuitJudgementgetByIndictmentID({
            IndictmentID: Number(this.IndictmentID$.getValue())
          })
          .subscribe((LawsuitJudgement: IRequestLawsuitJudgement[]) => {
            this.requstLawsuitJudgement$.next(LawsuitJudgement); // 1.1.6
          }); // 1.1.5

        // 1.1.7
        this.nonRequestRewardStaffService
          .NonRequestRewardStaffgetByIndictmentID({
            IndictmentID: this.IndictmentID$.getValue()
          })
          .subscribe((nonRequestRewardStaff: INonRequestRewardStaff[]) => {
            this.ILG60_08_04_00_00_E12_DATA$.next(nonRequestRewardStaff); // 1.1.8
          });

        // 1.1.9
        this.requestBribeReward
          .RequestBribeRewardgetByIndictmentID({
            IndictmentID: this.IndictmentID$.getValue()
          })
          .subscribe((nonRequestRewardStaff: INonRequestRewardStaff[]) => {
            this.ILG60_08_04_00_00_E08_DATA$.next(nonRequestRewardStaff); // 1.1.10
            this.ILG60_08_04_00_00_E12_DATA$.next(nonRequestRewardStaff); // 1.1.10
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
        break;
    }
    // 2 END
  }
}
