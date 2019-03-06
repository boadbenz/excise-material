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

  // getByKeyword(Textsearch: any) {
  //   const params = JSON.stringify(Textsearch);
  //   // const url = `${appConfig.api8778}/EvidenceOutgetByKeyword`;
  //   const url = `${appConfig.api8778}/EvidenceOutListgetByKeyword`;

  //   return this.http.post<EvidenceOut[]>(url, params, this.httpOptions);
  // }
  async getByKeyword(Textsearch: any): Promise<any> {
    const params = JSON.stringify(Textsearch);
    const url = `${appConfig.api8778}/EvidenceOutListgetByKeyword`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res as any;
    } catch (error) {
      return [];
    }
  }

  async getByConAdv(form: any): Promise<any> {
    const params = JSON.stringify(form);
    // const url = `${appConfig.api8778}/EvidenceOutgetByConAdv`;
    const url = `${appConfig.api8778}/EvidenceOutListgetByConAdv`;

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
    const url = `${appConfig.api8778}/EvidenceOutgetByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async EvidenceOutinsAll(oEvidence: EvidenceOut): Promise<any> {
    const params = JSON.stringify(oEvidence);
    const url = `${appConfig.api8778}/EvidenceOutinsAll`;

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
    const url = `${appConfig.api8778}/EvidenceOutupdByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async EvidenceOutupdDelete(EvidenceOutID: string): Promise<any> {
    const params = { EvidenceOutID };
    const url = `${appConfig.api8778}/EvidenceOutupdDelete`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async EvidenceOutStockBalanceupdByCon(oStock: any): Promise<any> {
    const params = JSON.stringify(oStock);
    const url = `${appConfig.api8778}/EvidenceOutStockBalanceupdByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async EvidenceOutInTypegetByCon(EvidenceInID: string): Promise<any> {
    const params = { EvidenceInID };
    const url = `${appConfig.api8778}/EvidenceOutInTypegetByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }
}
