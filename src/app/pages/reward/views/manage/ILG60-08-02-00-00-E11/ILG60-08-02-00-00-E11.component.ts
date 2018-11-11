import { Component, OnInit } from '@angular/core';
import { CONFIG } from './CONFIG';
import {
  IRequestBribeRewardgetByIndictmentID,
  IRequestBribeReward
} from 'app/pages/reward/interfaces/RequestBribeReward.interface';
import { RequestBribeRewardService } from 'app/pages/reward/services/RequestBribeReward.service';
import { RequestBribeService } from 'app/pages/reward/services/RequestBribe.service';
import { IRequestBribe } from 'app/pages/reward/interfaces/RequestBribe.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ILG60-08-02-00-00-E11',
  templateUrl: './ILG60-08-02-00-00-E11.component.html',
  styleUrls: ['./ILG60-08-02-00-00-E11.component.scss']
})
export class ILG6008020000E11Component extends CONFIG implements OnInit {
  constructor(
    private requestBribeRewardService: RequestBribeRewardService,
    private requestBribeService: RequestBribeService
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
        console.log('response', response);
        if (response.length > 0) {
          this.HaveNoticeCase(response);
        } else {

        }
        this.RequestBribeRewardID  = response[0].RequestBribeRewardID;
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
          this.requestBribeService
            .RequestBribegetByRequestBribeRewardID({
              RequestBribeRewardID: e.RequestBribeRewardID
            })
            .subscribe(
              (
                ResponseRequestBribegetByRequestBribeRewardID: IRequestBribe[]
              ) => {
                console.log(
                  'ResponseRequestBribegetByRequestBribeRewardID',
                  ResponseRequestBribegetByRequestBribeRewardID
                );
                let newData: any[];
                ResponseRequestBribegetByRequestBribeRewardID.forEach(
                  element => {
                    newData = element.RequestBribeDetail.map(m => ({
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
