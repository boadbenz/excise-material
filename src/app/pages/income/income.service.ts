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
    debugger
    const params = Textsearch;
    const url = `${appConfig.api8084}/RevenuegetByKeyword`;
    return this.http.post<Revenue[]>(url, params, this.httpOptions);
  }

  async getByCon(RevenueCode: string): Promise<any> {
    const params = { RevenueCode };
    const url = `${appConfig.api8084}/RevenuegetByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async getByConAdv(form: any): Promise<any> {
    debugger
    const params = JSON.stringify(form);
    const url = `${appConfig.api8084}/RevenuegetByConAdv`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res as any;
    } catch (error) {
      // await alert(error);
      return [];
    }
  }

  async getStatus(RevenueDetailID: string): Promise<any> {
    debugger
    const params = { RevenueDetailID };
    const url = `${appConfig.api8084}/RevenueDetailgetByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      await alert(error);
    }
  }

  async getDepartment(): Promise<any> {
    const params = { };
    const url = `${appConfig.api8084}/RevenueDepartmentgetAll`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      await alert(error);
    }
  }

  async StaffgetByKeyword(): Promise<any> {
    const params = { };
    const url = `${appConfig.api8084}/RevenueStaffgetAll`;
    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      await alert(error);
    }
  }

  async RevenueComparegetByCon(): Promise<any> {
    const params = { };
    const url = `${appConfig.api8084}/RevenueCompareDetailRecieptgetAll`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }


  async RevenueinsAll(oRevenue: Revenue): Promise<any> {
    debugger
    const params = JSON.stringify(oRevenue);
    const url = `${appConfig.api8084}/RevenueinsAll`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async RevenueUdp(oRevenue: Revenue): Promise<any> {
    debugger
    const params = JSON.stringify(oRevenue);
    const url = `${appConfig.api8084}/RevenueupdByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }
}
