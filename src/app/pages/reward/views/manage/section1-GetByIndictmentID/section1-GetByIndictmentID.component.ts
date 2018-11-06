import { Component, OnInit } from '@angular/core';
import { Section1GetByIndictmentIDConfig } from './section1-GetByIndictmentID.config';
import { RequestArrestLawsuitService } from 'app/pages/reward/services/RequestArrestLawsuit.service';
import { IRequestArrestLawsuitGetByIndictmentId } from 'app/pages/reward/interfaces/RequestArrestLawsuit.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-section1-GetByIndictmentID',
  templateUrl: './section1-GetByIndictmentID.component.html',
  styleUrls: ['./section1-GetByIndictmentID.component.scss']
})
export class Section1GetByIndictmentIDComponent
  extends Section1GetByIndictmentIDConfig
  implements OnInit {
  constructor(
    private requestArrestLawsuitService: RequestArrestLawsuitService
  ) {
    super();
  }

  ngOnInit() {
    this.fetchData({ IndictmentID: Number(this.IndictmentID) });
  }
  fetchData(param: IRequestArrestLawsuitGetByIndictmentId) {
    this.requestArrestLawsuitService
      .RequestArrestLawsuitgetByIndictmentID(param)
      .subscribe(res => {
        console.log('res', res);
      });
  }
}
