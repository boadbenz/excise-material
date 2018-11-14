import { Component, OnInit } from '@angular/core';
import { CONFIG } from './CONFIG';
import { ColumnsInterface } from 'app/pages/reward/shared/interfaces/columns-interface';
import { IRewardBinding } from '../reward.config';
import { IRequestReward } from 'app/pages/reward/interfaces/RequestReward';
import { IRequestCompare } from 'app/pages/reward/interfaces/RequestCompare';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ILG60-08-04-00-00-E08',
  templateUrl: './ILG60-08-04-00-00-E08.component.html',
  styleUrls: ['./ILG60-08-04-00-00-E08.component.scss']
})
// tslint:disable-next-line:class-name
export class ILG6008040000E08Component extends CONFIG implements OnInit {
  constructor() {
    super();
    this.inputData$.subscribe((res: IRewardBinding) => {
      if (res != null) {
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

            break;
          case 'RequestComparegetByIndictmentID':
            const dataRequestCompare: IRequestCompare[] = res.data;
            newMapName = `เลขคดีเปรียบเทียบที่ / ${
              dataRequestCompare[0].CompareCode
            }`;
            break;
          case 'ReqeustLawsuitJudgementgetByIndictmentID':
            const dataReqeustLawsuitJudgement: any[] = res.data;
            newMapName = `คำพิพากษาฎีกาที่ / ${
              dataReqeustLawsuitJudgement[0]['JudgementNo']
            }`;
            break;
        }
        const index = this.columnsForm.findIndex(
          f => f.field === 'ReferenceNo'
        );
        this.columnsForm[index].default = newMapName;
        this.columnsForm$.next(this.columnsForm);
      }
    });
  }

  ngOnInit() {}
}
