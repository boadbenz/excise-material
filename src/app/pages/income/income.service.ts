import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Revenue } from './Revenue';
import { appConfig } from '../../app.config';


@Injectable()
export class IncomeService {

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json'
      })
  };

  getByKeyword(Textsearch: string) {
    const params = Textsearch;
    const url = `${appConfig.api8084}/RevenuegetByKeyword`;
    return this.http.post<Revenue[]>(url, params, this.httpOptions);
  }

  getByCon(RevenueCode: string) {
    const params = { RevenueCode };
    const url = `${appConfig.api8084}/RevenuegetByCon`;
    return this.http.post<Revenue>(url, params, this.httpOptions);
  }

  getByConAdv(form: any) {
    const params = JSON.stringify(form);
    const url = `${appConfig.api8084}/RevenuegetByConAdv`;
    return this.http.post<Revenue[]>(url, params, this.httpOptions);
  }

  InsAll(revenue: Revenue) {
    const params = revenue;
    const url = `${appConfig.api8084}/RevenueinsAll`;
    return this.http.post<any>(url, params, this.httpOptions);
  }

  updByCon(revenue: Revenue) {
    const params = revenue;
    const url = `${appConfig.api8084}/RevenueupdByCon`;
    return this.http.post<any>(url, params, this.httpOptions);
  }

  updDelete(RevenueCode: string) {
    const params = { RevenueCode };
    const url = `${appConfig.api8084}/RevenueupdDelete`;
    return this.http.post<any>(url, params, this.httpOptions);
  }

  detailUpdDelete(RevenueDetailID: string) {
    const params = RevenueDetailID;
    const url = `${appConfig.api8084}/RevenueDetailupdDelete`;
    return this.http.post<any>(url, params, this.httpOptions);
  }

  staffUpdDelete(StaffID: string) {
    const params = StaffID;
    const url = `${appConfig.api8084}/RevenueStaffupdDelete`;
    return this.http.post<any>(url, params, this.httpOptions);
  }

  getStaffByKeyword(Textsearch: string) {
    const params = Textsearch;
    const url = `${appConfig.api8084}/StaffgetByKeyword`;
    return this.http.post<any>(url, params, this.httpOptions);
  }

  DocumentgetByCon(DocumentID: String){
    const params = DocumentID;
    const url = `${appConfig.api8084}/DocumentgetByCon`;
    return this.http.post<any>(url, params, this.httpOptions);
  }
}
