import { Component, OnInit } from '@angular/core';
import { CONFIG } from './CONFIG';
import {
  IRequestArrestLawsuit
} from 'app/pages/reward/interfaces/RequestArrestLawsuit.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ILG60-08-02-00-00-E08',
  templateUrl: './ILG60-08-02-00-00-E08.component.html',
  styleUrls: ['./ILG60-08-02-00-00-E08.component.scss']
})
export class ILG6008020000E08Component extends CONFIG implements OnInit {
  constructor(
  ) {
    super();
    this.inputData$.subscribe(res => {
      if (res != null) {
        // console.log('requestArrestLawsuitService', res);

        const response: IRequestArrestLawsuit = res[0];
        const staffName = `${response.TitleName}${response.FirstName} ${
          response.LastName
        }`;
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
      }
    });
  }

  ngOnInit() {
    this.fetchData();
  }
  fetchData() {}
}
