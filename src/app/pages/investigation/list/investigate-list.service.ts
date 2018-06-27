import { Injectable } from '@angular/core';
import { InvestigationList } from '../investigate-list';

@Injectable()
export class InvestigationListService {

  constructor() { }

  getbyKeyword() {
    return Array<InvestigationList>();
  }

  getbyConAdv(
    investigationCode: string,
    investigationNo: string,
    dateStartFrom: Date,
    dateStartTo: Date,
    staffCode: string
  ) {
    const params = {};
    return Array<InvestigationList>();
  }

}
