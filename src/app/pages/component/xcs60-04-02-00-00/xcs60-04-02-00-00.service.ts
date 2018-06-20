import { Injectable } from "@angular/core";

@Injectable()
export class Xcs6004020000Service {
  detailData: any;
  constructor() {}

  getData(item) {
    this.detailData = item;
  }
}
