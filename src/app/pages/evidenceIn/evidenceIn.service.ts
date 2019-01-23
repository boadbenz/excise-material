import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Evidence_In } from './evidenceIn';
import { appConfig } from '../../app.config';
import { Observable } from "rxjs/Observable";

@Injectable()
export class EvidenceService {

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
    const url = `${appConfig.api8776}/EvidenceInListgetByKeyword`;
    return this.http.post<Evidence_In[]>(url, params, this.httpOptions);
  }

  async getByConAdv(form: any): Promise<any> {
    const params = JSON.stringify(form);
    const url = `${appConfig.api8776}/EvidenceInListgetByConAdv`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res as any;
    } catch (error) {
      return [];
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

  async EvidenceInArrestgetByProveID(ProveID: string): Promise<any> {
    const params = { ProveID };
    const url = `${appConfig.api8776}/EvidenceInArrestgetByProveID`;
    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      await alert(error);
    }
  }

  async getByCon(EvidenceInID: string): Promise<any> {
    const params = { EvidenceInID };
    const url = `${appConfig.api8776}/EvidenceIngetByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async getProveProductUnit(Textsearch: string): Promise<any> {
    const params = {  };
    const url = `${appConfig.api8777}/MasDutyUnitMaingetAll`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res as any;
    } catch (error) {
      // await alert(error);
      return [];
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

  async EvidenceIninsAll(oEvidence: Evidence_In): Promise<any> {
    const params = JSON.stringify(oEvidence);
    const url = `${appConfig.api8776}/EvidenceIninsAll`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }
}
