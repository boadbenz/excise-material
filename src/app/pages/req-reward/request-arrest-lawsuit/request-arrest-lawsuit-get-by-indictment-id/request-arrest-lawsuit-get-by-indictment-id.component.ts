import { Component, OnInit } from '@angular/core';
import { RequestArrestLawsuitGetByIndictmentIdConfig } from './request-arrest-lawsuit-get-by-indictment-id.config';
import { RequestArrestLawsuitService } from '../../services/RequestArrestLawsuit.service';
import { IRequestArrestLawsuitGetByIndictmentId } from '../request-arrest-lawsuit.interface';

@Component({
  selector: 'app-request-arrest-lawsuit-get-by-indictment-id',
  templateUrl: './request-arrest-lawsuit-get-by-indictment-id.component.html',
  styleUrls: ['./request-arrest-lawsuit-get-by-indictment-id.component.scss']
})
export class RequestArrestLawsuitGetByIndictmentIDComponent
  extends RequestArrestLawsuitGetByIndictmentIdConfig
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
