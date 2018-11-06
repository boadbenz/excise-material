import { Component, OnInit } from '@angular/core';
import { Section1GetByIndictmentIDConfig } from './section1-GetByIndictmentID.config';
import { RequestArrestLawsuitService } from 'app/pages/reward/services/RequestArrestLawsuit.service';
import {
  IRequestArrestLawsuitGetByIndictmentId,
  IRequestArrestLawsuit
} from 'app/pages/reward/interfaces/RequestArrestLawsuit.interface';
import { ColumnsInterface } from 'app/pages/reward/shared/interfaces/columns-interface';

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
        const response: IRequestArrestLawsuit = res[0];
        const staffName = `${response.TitleName}${response.FirstName} ${response.LastName}`;
        const location = `${response.SubDistrict} / ${response.District} / ${
          response.Province
        }`;
        response['staffName'] = staffName;
        response['location'] = location;

        Object.keys(response).forEach(key => {
          const index = this.columnsDefault.findIndex(f => f.field === key);
          if (index !== -1) {
            this.columnsDefault[index].default = response[key];
          }
          const index2 = this.columnsDefault.findIndex(f => f.field2 === key);
          if (index2 !== -1) {
            this.columnsDefault[index2].default2 = response[key];
          }
        });

        this.columns$.next(this.columnsDefault);
      });
  }
}
