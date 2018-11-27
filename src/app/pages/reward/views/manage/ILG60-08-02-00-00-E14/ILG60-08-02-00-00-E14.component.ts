import { Component, OnInit } from '@angular/core';
import { CONFIG } from './CONFIG';
import { IRequestReward } from 'app/pages/reward/interfaces/RequestReward';
import { IRequestRewardDetail } from 'app/pages/reward/interfaces/RequestRewardDetail';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ILG60-08-02-00-00-E14',
  templateUrl: './ILG60-08-02-00-00-E14.component.html',
  styleUrls: ['./ILG60-08-02-00-00-E14.component.scss']
})
export class ILG6008020000E14Component extends CONFIG implements OnInit {
  public tableData: IRequestRewardDetail[] = [];
  constructor() {
    super();
    this.inputData$.subscribe((reqRewards: IRequestReward[]) => {
      if (reqRewards !== null) {
        const reqReward: IRequestReward = reqRewards[0];
        // console.log('reqReward', reqReward);

        this.tableData = reqReward.RequestRewardDetail.map(m => ({
          ...m,
          RequestRewardCode: reqReward.RequestRewardCode,
          RequestDate: reqReward.RequestDate,
          // tslint:disable-next-line:max-line-length
          LawbreakerFullName: `${m.LawbreakerTitleName ||
            ''} ${m.LawbreakerFirstName || ''} ${m.LawbreakerMiddleName ||
            ''} ${m.LawbreakerLastName || ''} ${m.LawbreakerOtherName || ''}`,
          FineTypeName: `${m.FineType === 1 ? 'ส่งฟ้องศาล' : 'เปรียบเทียบคดี'}`,
          PaymentDueDate: `${
            m.FineType === 1 ? m.PaymentDueDate : m.PaymentActualDate
          }`
        }));
      }
    });
  }

  ngOnInit() {
    this.fetchData();
  }
  private fetchData() {}
}
