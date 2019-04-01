import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Evidence_In, EvidenceInItem, EvidenceStockBalance } from './evidenceIn';
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

  // getByKeyword(Textsearch: string) {
  //   const params = Textsearch;
  //   const url = `${appConfig.api8776}/EvidenceInListgetByKeyword`;
  //   return this.http.post<Evidence_In[]>(url, params, this.httpOptions);
  // }
  
  async getByKeyword(Textsearch: any): Promise<any> {
    const params = JSON.stringify(Textsearch);
    const url = `${appConfig.api8776}/EvidenceInListgetByKeyword`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res as any;
    } catch (error) {
      return [];
    }
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

  async getByCon(EvidenceInID:string, ProveID: string): Promise<any> {
    const params = { EvidenceInID, ProveID };
    const url = `${appConfig.api8776}/EvidenceIngetByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async getProveProductUnit(Textsearch: string): Promise<any> {
    const params = {};
    const url = `${appConfig.api8777}/MasDutyUnitMaingetAll`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res as any;
    } catch (error) {
      // await alert(error);
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

  async EvidenceInupdByCon(oEvidence: Evidence_In): Promise<any> {
    const params = JSON.stringify(oEvidence);
    const url = `${appConfig.api8776}/EvidenceInupdByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async EvidenceInupdDelete(EvidenceInID: string): Promise<any> {
    const params = { EvidenceInID };
    const url = `${appConfig.api8776}/EvidenceInupdDelete`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async MasProductMaingetAll(): Promise<any> {
    const params = {};
    const url = `${appConfig.api8777}/MasProductMaingetAll`;
    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      await alert(error);
    }
  }

  async EvidenceInIteminsAll(oItem: any): Promise<any> {
    const params = JSON.stringify(oItem);
    const url = `${appConfig.api8776}/EvidenceInIteminsAll`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async EvidenceInItemupdByCon(oItem: any): Promise<any> {
    const params = JSON.stringify(oItem);
    const url = `${appConfig.api8776}/EvidenceInItemupdByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async EvidenceInItemupdDelete(oItem: any): Promise<any> {
    const params = JSON.stringify(oItem);
    const url = `${appConfig.api8776}/EvidenceInItemupdDelete`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }


  async TransactionRunningItemgetByCon(RunningPrefix, RunningGroupCode, RunningWarehouseID): Promise<any> {
    let pValue = {
      "RunningPrefix": RunningPrefix,
      "RunningGroupCode": RunningGroupCode,
      "RunningWarehouseID": RunningWarehouseID
    }

    const params = JSON.stringify(pValue);
    const url = `${appConfig.api8776}/TransactionRunningItemgetByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async TransactionRunningIteminsAll(RunningYear, RunningMonth, RunningPrefix, RunningGroupCode, RunningWarehouseID, RunningNo): Promise<any> {
    let pValue = {
      "RunningYear": RunningYear,
      "RunningMonth": RunningMonth,
      "RunningPrefix": RunningPrefix,
      "RunningGroupCode": RunningGroupCode,
      "RunningWarehouseID": RunningWarehouseID,
      "RunningNo": RunningNo
    }

    const params = JSON.stringify(pValue);
    const url = `${appConfig.api8776}/TransactionRunningIteminsAll`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async TransactionRunningItemupdByCon(RunningID): Promise<any> {
    const params = { RunningID };
    const url = `${appConfig.api8776}/TransactionRunningItemupdByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async getEvidenceInOutgetByWarehouseID(WarehouseID: string): Promise<any> {
    const params = { WarehouseID };
    const url = `${appConfig.api8776}/EvidenceInOutgetByWarehouseID`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) { }
  }

  async EvidenceInOutItemupdIsReturn(EvidenceOutItem: any): Promise<any> {
    const params =  JSON.stringify(EvidenceOutItem);
    const url = `${appConfig.api8776}/EvidenceInOutItemupdIsReturn`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) { }
  }

  async EvidenceInStockBalanceupdByCon(EvidenceStockBalance: any): Promise<any> {
    const params = { EvidenceStockBalance };
    const url = `${appConfig.api8776}/EvidenceInStockBalanceupdByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) { }
  }

  async Report_11_001(EvidenceInID: any): Promise<any> {
    const params = { EvidenceInID };
    const url = `${appConfig.apiReport}/ILG60_00_11_001.aspx`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) { }
  }
}
