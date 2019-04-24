import { Component, OnInit, Input } from '@angular/core';
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
  public sumRewardTotal;
  public dataBinding = [];
  @Input('ILG60_08_02_00_00E14_BUTTON_DISABLED') ILG60_08_02_00_00E14_BUTTON_DISABLED: boolean;
  constructor() {
    super();
    this.inputData$.subscribe((data: any[]) => {
      if (data !== null) {
        this.sumRewardTotal = data
          .map(m => Number(m.RewardTotal))
          .reduce((a, b) => (a += b));

        const mapData = data.map((m, rowIndex) => {
          return m.RequestRewardDetail.map((x, index) => ({
            rowIndex: index === 0 ? rowIndex + 1 : '',
            view: index === 0 ? true : false,
            RequestRewardID: m.RequestRewardID,
            RequestRewardCode: index === 0 ? m.RequestRewardCode : '',
            RequestDate: index === 0 ? m.RequestDate : '',
            LawbreakerFullName: `${x.LawbreakerTitleName ||
              ' '}${x.LawbreakerFirstName || ' '}${x.LawbreakerMiddleName ||
              ' '}${x.LawbreakerLastName || ' '}${x.LawbreakerOtherName ||
              ' '}`,
            FineTypeName: x.FineType === 0 ? 'เปรียบเทียบคดี' : 'ส่งฟ้องศาล',
            PaymentDueDate:
              x.FineType === 0 ? x.PaymentActualDate : x.PaymentDueDate,
            PaymentPeriodNo: x.PaymentPeriodNo
          }));
        });
        this.dataBinding = [].concat(...mapData);
        // this.tableData = reqRewards.filter(f => f.RequestRewardDetail.length > 0).map(m => {
        //   const objNew = {
        //     RequestRewardCode: m.RequestRewardCode,
        //     RequestDate: m.RequestDate,
        //     detail: m.RequestRewardDetail.map(x => ({
        //       LawbreakerFullName: `${x.LawbreakerTitleName ||
        //         ''} ${x.LawbreakerFirstName || ''} ${x.LawbreakerMiddleName ||
        //         ''} ${x.LawbreakerLastName || ''} ${x.LawbreakerOtherName ||
        //         ''}`,
        //       FineTypeName: `${
        //         x.FineType === 1 ? 'ส่งฟ้องศาล' : 'เปรียบเทียบคดี'
        //       }`,
        //       PaymentDueDate: `${
        //         m.FineType === 1 ? x.PaymentDueDate : x.PaymentActualDate
        //       }
        //   }`
        //     }))
        //   };
        //   return  objNew;
        // });

        console.log('reqReward', this.tableData);
      }
    });
  }

  ngOnInit() {
    this.fetchData();
  }
  private fetchData() {}
}
