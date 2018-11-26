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
  public tableData: any[] = [];
  constructor() {
    super();
    this.inputData$.subscribe((reqRewards: IRequestReward[]) => {
      if (reqRewards !== null) {
        const reqReward: IRequestReward = reqRewards[0];
        console.log('reqReward', reqRewards);

        this.tableData = reqRewards.filter(f => f.RequestRewardDetail.length > 0).map(m => {
          const objNew = {
            RequestRewardCode: m.RequestRewardCode,
            RequestDate: m.RequestDate,
            detail: m.RequestRewardDetail.map(x => ({
              LawbreakerFullName: `${x.LawbreakerTitleName ||
                ''} ${x.LawbreakerFirstName || ''} ${x.LawbreakerMiddleName ||
                ''} ${x.LawbreakerLastName || ''} ${x.LawbreakerOtherName ||
                ''}`,
              FineTypeName: `${
                x.FineType === 1 ? 'ส่งฟ้องศาล' : 'เปรียบเทียบคดี'
              }`,
              PaymentDueDate: `${
                m.FineType === 1 ? x.PaymentDueDate : x.PaymentActualDate
              }
          }`
            }))
          };
          return  objNew;
        });

        console.log('reqReward', this.tableData);
      }
    });
  }

  ngOnInit() {
    this.fetchData();
  }
  private fetchData() {}
}
