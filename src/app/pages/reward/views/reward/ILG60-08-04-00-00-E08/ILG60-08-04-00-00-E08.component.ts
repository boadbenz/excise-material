import { Component, OnInit } from '@angular/core';
import { CONFIG } from './CONFIG';
import { ColumnsInterface } from 'app/pages/reward/shared/interfaces/columns-interface';
import { IRewardBinding } from '../reward.config';
import { IRequestReward } from 'app/pages/reward/interfaces/RequestReward';
import { IRequestCompare } from 'app/pages/reward/interfaces/RequestCompare';
import { DropdownInterface } from 'app/pages/reward/shared/interfaces/dropdown-interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ILG60-08-04-00-00-E08',
  templateUrl: './ILG60-08-04-00-00-E08.component.html',
  styleUrls: ['./ILG60-08-04-00-00-E08.component.scss']
})
// tslint:disable-next-line:class-name
export class ILG6008040000E08Component extends CONFIG implements OnInit {
  public checkAll = false;
  public checkList: boolean[];
  constructor() {
    super();
    this.inputData$.subscribe((res: IRewardBinding) => {
      if (typeof res !== 'undefined' && res && res !== null) {
        console.log('res', res);

        let newMapName;

        switch (res.methodName) {
          case 'RequestRewardgetByCon':
            const dataRequestReward: IRequestReward[] = res.data;

            switch (dataRequestReward[0].FineType) {
              case 0:
                newMapName = `เลขคดีเปรียบเทียบที่ / ${
                  dataRequestReward[0].ReferenceNo
                }`;
                break;
              case 1:
                newMapName = `คำพิพากษาฎีกาที่ / ${
                  dataRequestReward[0].ReferenceNo
                }`;
                break;
            }
            console.log('dataRequestReward', dataRequestReward);
            break;
          case 'RequestComparegetByIndictmentID':
            const dataRequestCompare: IRequestCompare[] = res.data;
            if (dataRequestCompare.length > 0) {
              newMapName = `เลขคดีเปรียบเทียบที่ / ${
                dataRequestCompare[0].CompareCode
              }`;
              const ReferenceNo = this.columnsForm.findIndex(
                f => f.field === 'ReferenceNo'
              );
              this.columnsForm[ReferenceNo].default = newMapName;

              this.columnsForm$.next(this.columnsForm);
              const mapData = dataRequestCompare[0].RequestPaymentFine.map(
                m => ({
                  ...m,
                  // tslint:disable-next-line:max-line-length
                  LawbreakerName: `${m.LawbreakerTitleName ||
                    ' '}${m.LawbreakerFirstName ||
                    ' '}${m.LawbreakerMiddleName ||
                    ' '}${m.LawbreakerLastName || ' '}${m.LawbreakerOtherName ||
                    ' '}`,
                  PaymentDueDate: `${m.PaymentActualDate}`,
                  BribeMoney: `${m.PaymentFine * 0.2 || 0}`,
                  RewardMoney: `${m.PaymentFine * 0.2 || 0}`
                })
              );
              this.checkList = mapData.map(m => true);
              this.aggregate.BribeMoney.sum = Number(
                mapData.map(m => m.BribeMoney).reduce((a, b) => (a += b))
              );
              this.aggregate.PaymentFine.sum = Number(
                mapData.map(m => m.PaymentFine).reduce((a, b) => (a += b))
              );
              this.aggregate.RewardMoney.sum = Number(
                mapData.map(m => m.RewardMoney).reduce((a, b) => (a += b))
              );
              this.checkAll = this.checkChecked(this.checkList);
              this.inputDataTable$.next(mapData);
            }

            break;
          case 'ReqeustLawsuitJudgementgetByIndictmentID':
            const dataReqeustLawsuitJudgement: any[] = res.data;
            newMapName = `คำพิพากษาฎีกาที่ / ${
              dataReqeustLawsuitJudgement[0]['JudgementNo']
            }`;
            break;
        }
      }
    });
  }

  ngOnInit() {}

  public checkChecked(arrBool: boolean[]): boolean {
    const d = arrBool.map(m => (m ? 1 : -1));
    let num = 1;
    d.forEach(e => {
      num = num * e
    });
    return num === 1 ? true : false;
  }
}
