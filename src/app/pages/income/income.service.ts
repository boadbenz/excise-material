import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Revenue, RevenueDetail } from './revenue';
import { appConfig } from '../../app.config';
import { Observable } from "rxjs/Observable";

@Injectable()
export class IncomeService {

  constructor(
    private http: HttpClient
  ) { }

  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json'
      })
  };

  getByKeyword(Textsearch: string) {
    const params = Textsearch;
    const url = `${appConfig.api8777}/RevenuegetByKeyword`;
    return this.http.post<Revenue[]>(url, params, this.httpOptions);
  }

  async getByCon(RevenueID: string): Promise<any> {
    const params = { RevenueID };
    const url = `${appConfig.api8777}/RevenuegetByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async getByConAdv(form: any): Promise<any> {
    const params = JSON.stringify(form);
    const url = `${appConfig.api8777}/RevenuegetByConAdv`;

    debugger
    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res as any;
    } catch (error) {
      // await alert(error);
      return [];
    }
  }

  async getStatus(RevenueDetailID: string): Promise<any> {
    const params = { RevenueDetailID };
    const url = `${appConfig.api8777}/RevenueDetailgetByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      await alert(error);
    }
  }

  async getDepartment(): Promise<any> {
    const params = {};
    const url = `${appConfig.api8777}/MasOfficeMaingetAll`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      await alert(error);
    }
  }

  async StaffgetByKeyword(): Promise<any> {
    const params = {};
    const url = `${appConfig.api8777}/MasStaffMaingetAll`;
    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      await alert(error);
    }
  }

  async TransactionRunninggetByCon(RunningTable, RunningOfficeCode): Promise<any> {
    let pValue = {
      "RunningTable": RunningTable,
      "RunningOfficeCode": RunningOfficeCode
    }

    const params = JSON.stringify(pValue);
    const url = `${appConfig.api8777}/TransactionRunninggetByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async TransactionRunninginsAll(RunningOfficeCode, RunningTable, RunningPrefix): Promise<any> {
    let pValue = {
      "RunningOfficeCode": RunningOfficeCode,
      "RunningTable": RunningTable,
      "RunningPrefix": RunningPrefix
    }

    const params = JSON.stringify(pValue);
    const url = `${appConfig.api8777}/TransactionRunninginsAll`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async TransactionRunningupdByCon(RunningID): Promise<any> {
    const params = { RunningID };
    const url = `${appConfig.api8777}/TransactionRunningupdByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async RevenueComparegetByCon(RevenueDate, OfficeCode): Promise<any> {
    let pValue = {
      "RevenueDate": RevenueDate,
      "OfficeCode": OfficeCode
    }

    const params = JSON.stringify(pValue);
    const url = `${appConfig.api8777}/RevenueComparegetByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async RevenueComparegetByCompareReceiptID(CompareReceiptID): Promise<any> {
    const params = { CompareReceiptID };
    const url = `${appConfig.api8777}/RevenueComparegetByCompareReceiptID`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }


  async RevenueinsAll(oRevenue: Revenue): Promise<any> {
    const params = JSON.stringify(oRevenue);
    const url = `${appConfig.api8777}/RevenueinsAll`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async RevenueUdp(oRevenue: Revenue): Promise<any> {
    const params = JSON.stringify(oRevenue);
    const url = `${appConfig.api8777}/RevenueupdByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async RevenueDetailinsAll(oRevenueDetail: RevenueDetail): Promise<any> {
    const params = JSON.stringify(oRevenueDetail);
    const url = `${appConfig.api8777}/RevenueDetailinsAll`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async RevenueDetailupdDelete(RevenueDetailID: String): Promise<any> {
    const params = { RevenueDetailID };
    const url = `${appConfig.api8777}/RevenueDetailupdDelete`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async RevenueCompareDetailReceiptupdByCon(CompareReceiptID: string): Promise<any> {
    const params = { CompareReceiptID };
    const url = `${appConfig.api8777}/RevenueCompareDetailReceiptupdByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async RevenueCompareDetailReceiptupdDelete(CompareReceiptID: string): Promise<any> {
    const params = { CompareReceiptID };
    const url = `${appConfig.api8777}/RevenueCompareDetailReceiptupdDelete`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async RevenueupdDelete(RevenueID: string): Promise<any> {
    const params = { RevenueID };
    const url = `${appConfig.api8777}/RevenueupdDelete`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  RevenueReportgetByCon(RevenueID: string) {
    const params = { RevenueID };
    const url = `${appConfig.apiReport}/RevenuegetByCon.aspx`;
    return this.http.post(url, params, { ...this.httpOptions, responseType: 'blob' })
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSuccess(res);
      }, (error: any) => {
        this.onError(error);
      });
  }

  private onSuccess(res: Response): void {
    console.log('Request successful');
  }

  private onError(res: Response): void {
    console.log('Error, status code: ' + res.status);
  }

  private onCatch(error: any, caught: Observable<any>): Observable<any> {
    return Observable.throw(error);
  }
}
