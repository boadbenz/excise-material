import { Component, OnInit } from '@angular/core';
import { CONFIG } from './CONFIG';
import { RequestBribeRewardService } from 'app/pages/reward/services/RequestBribeReward.service';
import { RequestBribeService } from 'app/pages/reward/services/RequestBribe.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ILG60-08-02-00-00-E11',
  templateUrl: './ILG60-08-02-00-00-E11.component.html',
  styleUrls: ['./ILG60-08-02-00-00-E11.component.scss']
})
export class ILG6008020000E11Component extends CONFIG implements OnInit {
  constructor(
      ) {
    super();
  }

  ngOnInit() {
  }

}
