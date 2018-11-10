import { Component, OnInit } from '@angular/core';
import { CONFIG } from './CONFIG';
import { IRequestBribeRewardgetByIndictmentID, IRequestBribeReward } from 'app/pages/reward/interfaces/RequestBribeReward.interface';
import { RequestBribeRewardService } from 'app/pages/reward/services/RequestBribeReward.service';
import { RequestRewardService } from 'app/pages/reward/services/RequestReward.service';
import { IRequestBribe } from 'app/pages/reward/interfaces/RequestBribe.interface';
import { IRequestReward } from 'app/pages/reward/interfaces/RequestReward';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ILG60-08-02-00-00-E14',
  templateUrl: './ILG60-08-02-00-00-E14.component.html',
  styleUrls: ['./ILG60-08-02-00-00-E14.component.scss']
})
export class ILG6008020000E14Component extends CONFIG implements OnInit {
  constructor(
    private requestBribeRewardService: RequestBribeRewardService,
    private requestRewardService: RequestRewardService
  ) {
    super();
  }

  ngOnInit() {
    this.fetchData({ IndictmentID: this.IndictmentID });
  }
  private fetchData(param: IRequestBribeRewardgetByIndictmentID) {
    this.requestBribeRewardService
      .RequestBribeRewardgetByIndictmentID(param)
      .subscribe((response: IRequestBribeReward[]) => {
        console.log('requestBribeRewardService', response);
        if (response.length > 0) {
          this.HaveNoticeCase(response);
        } else {
        }
        // this.columns$.next(this.columnsDefault);
      });
  }
  private HaveNoticeCase(Data: IRequestBribeReward[]) {
    console.log('Data', Data);

    Data.forEach(e => {
      switch (e.HaveNotice) {
        case 0:
          break;
        case 1:
          this.requestRewardService
            .RequestRewardgetByRequestBribeRewardID({
              RequestBribeRewardID: e.RequestBribeRewardID
            })
            .subscribe(
              (
                ResponseRequestRewardgetByRequestBribeRewardID: IRequestReward[]
              ) => {
                console.log(
                  'ResponseRequestRewardgetByRequestBribeRewardID',
                  ResponseRequestRewardgetByRequestBribeRewardID
                );
                let newData: any[];
                ResponseRequestRewardgetByRequestBribeRewardID.forEach(
                  element => {
                    newData = element.RequestRewardDetail.map(m => ({
                      ...element,
                      ...m,
                      LawbreakerFullName: `${m.LawbreakerTitleName ||
                        ''}${m.LawbreakerFirstName ||
                        ''} ${m.LawbreakerMiddleName ||
                        ''} ${m.LawbreakerLastName ||
                        ''} ${m.LawbreakerOtherName || ''}`,
                        FineTypeName: m.FineType === 1 ? 'ส่งฟ้องศาล' : 'เปรียบเทียบคดี'
                    }));
                  }
                );

                this.gridData$.next(newData);
              }
            );

          break;
      }
    });
  }
}
