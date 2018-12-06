import { Component, OnInit } from '@angular/core';
import { CONFIG } from './CONFIG';
import { RequestBribeRewardService } from 'app/pages/reward/services/RequestBribeReward.service';
import {
  IRequestBribeRewardgetByIndictmentID,
  IRequestBribeReward
} from 'app/pages/reward/interfaces/RequestBribeReward.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ILG60-08-02-00-00-E09',
  templateUrl: './ILG60-08-02-00-00-E09.component.html',
  styleUrls: ['./ILG60-08-02-00-00-E09.component.scss']
})
export class ILG6008020000E09Component extends CONFIG implements OnInit {
  constructor(private requestBribeRewardService: RequestBribeRewardService) {
    super();
  }

  ngOnInit() {
    this.fetchData({ IndictmentID: Number(this.IndictmentID) });
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
        // this.columns$.next(this.columnsDefault);
      });
  }
  private HaveNoticeCase(Data: IRequestBribeReward[]) {
    console.log('Data', Data);

    Data.forEach(e => {
      switch (e.HaveNotice) {
        case 0:
          this.RequestRewardgetByRequestBribeRewardID();
          break;
        case 1:
          break;
      }
    });
  }
  private RequestRewardgetByRequestBribeRewardID() {}
}
