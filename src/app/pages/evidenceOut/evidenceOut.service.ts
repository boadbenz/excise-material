import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { EvidenceOut } from './evidenceOut';
import { appConfig } from '../../app.config';
import { Observable } from "rxjs/Observable";

@Injectable()
export class EvidenceOutService {

  constructor(
    private http: HttpClient
  ) { }

  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json'
      })
  };

  getByKeyword(Textsearch: any) {
    const params = JSON.stringify(Textsearch);
    const url = `${appConfig.api8775}/EvidenceOutgetByKeyword`;
    return this.http.post<EvidenceOut[]>(url, params, this.httpOptions);
  }

  async getByConAdv(form: any): Promise<any> {
    const params = JSON.stringify(form);
    const url = `${appConfig.api8775}/EvidenceOutgetByConAdv`;

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

  async getByCon( EvidenceOutID: string): Promise<any> {
    const params = {  EvidenceOutID };
    const url = `${appConfig.api8775}/EvidenceOutgetByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async EvidenceOutinsAll(oEvidence: EvidenceOut): Promise<any> {
    const params = JSON.stringify(oEvidence);
    const url = `${appConfig.api8775}/EvidenceOutinsAll`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async getProduct(WarehouseID: string, EvidenceInType: string): Promise<any> {
    let pValue = {
      "WarehouseID": WarehouseID,
      "EvidenceInType": EvidenceInType
    }

    const params = JSON.stringify(pValue);
    const url = `${appConfig.api8778}/EvidenceOutIngetByKeyword`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) { }
  }

  async EvidenceOutIteminsAll(oItem: any): Promise<any> {
    const params = JSON.stringify(oItem);
    const url = `${appConfig.api8778}/EvidenceOutIteminsAll`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async EvidenceOutItemupdByCon(oItem: any): Promise<any> {
    const params = JSON.stringify(oItem);
    const url = `${appConfig.api8778}/EvidenceOutItemupdByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async EvidenceOutItemupdDelete(oItem: any): Promise<any> {
    const params = JSON.stringify(oItem);
    const url = `${appConfig.api8778}/EvidenceOutItemupdDelete`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async EvidenceOutupdByCon(oEvidence: EvidenceOut): Promise<any> {
    const params = JSON.stringify(oEvidence);
    const url = `${appConfig.api8775}/EvidenceOutupdByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }
}
