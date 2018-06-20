import { Injectable } from '@angular/core';

@Injectable()
export class Xcs6004030000Service {

  detailAllegation: any;
  detailCondemn: any;

  constructor() {}

  getData(item) {
    this.detailAllegation = item.allegation;
    this.detailCondemn = item.condemn;
  }

}
