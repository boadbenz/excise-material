import { Injectable, HostListener } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { appConfig } from '../../app.config';
import { Prove } from './prove';
import { ProveDocument } from './proveDoc';
import { ProveProduct } from './proveProduct';
import { ProveScience, ProveDeliverProduct } from './proveScience';
import { Observable } from "rxjs/Observable";

@Injectable()
export class ProveService {

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json'
      })
  };


  getByKeyword(Textsearch: string) {
    const params = Textsearch;
    const url = `${appConfig.api8882}/ProveListgetByKeyword`;
    return this.http.post<Prove[]>(url, params, this.httpOptions);
  }

  // async getByKeyword(Textsearch: string): Promise<any> {
  //   debugger
  //   const params = { Textsearch };
  //   const url = `${appConfig.api8882}/ProvegetByKeyword`;

  //   try {
  //     const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
  //     return res as any;
  //   } catch (error) {
  //     await alert(error);
  //   }
  // }

  async getByConAdv(form: any): Promise<any> {
    debugger
    const params = JSON.stringify(form);
    const url = `${appConfig.api8882}/ProveListgetByConAdv`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res as any;
    } catch (error) {
      // await alert(error);
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

  async insAll(oProve: Prove): Promise<any> {
    const params = JSON.stringify(oProve);
    const url = `${appConfig.api8882}/ProveinsAll`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res as any;
    } catch (error) {
      return [];
    }
  }

  async ProveProductinsAll(oProduct: ProveProduct): Promise<any> {
    debugger
    const params = JSON.stringify(oProduct);
    const url = `${appConfig.api8882}/ProveProductinsAll`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async ProveScienceinsAll(oProductScience: ProveScience): Promise<any> {
    debugger
    const params = JSON.stringify(oProductScience);
    const url = `${appConfig.api8882}/ProveScienceinsAll`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async ProveScienceupdByCon(oProductScience: ProveScience): Promise<any> {
    debugger
    const params = JSON.stringify(oProductScience);
    const url = `${appConfig.api8882}/ProveScienceupdByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async ProveScienceupdDelete(ProveScienceID: string): Promise<any> {
    debugger
    const params = { ProveScienceID };
    const url = `${appConfig.api8882}/ProveScienceupdDelete`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async ProveDeliverProductinsAll(oProveDeliver: ProveDeliverProduct): Promise<any> {
    debugger
    const params = JSON.stringify(oProveDeliver);
    const url = `${appConfig.api8882}/ProveDeliverProductinsAll`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async ProveDeliverProductupdByCon(oProveDeliver: ProveDeliverProduct): Promise<any> {
    debugger
    const params = JSON.stringify(oProveDeliver);
    const url = `${appConfig.api8882}/ProveDeliverProductupdByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async ProveProductupdByCon(oProduct: ProveProduct): Promise<any> {
    const params = JSON.stringify(oProduct);
    const url = `${appConfig.api8882}/ProveProductupdByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async ProveProductupdDelete(oProduct: ProveProduct): Promise<any> {
    const params = JSON.stringify(oProduct);
    const url = `${appConfig.api8882}/ProveProductupdDelete`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async ProveupdDelete(ProveID: string): Promise<any> {
    const params = { ProveID };
    const url = `${appConfig.api8882}/ProveupdDelete`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async ProveupdByCon(oProve: Prove): Promise<any> {
    const params = JSON.stringify(oProve);
    const url = `${appConfig.api8882}/ProveupdByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }
  

  async ProvegetByCon(ProveID: string): Promise<any> {
    const params = { ProveID };
    const url = `${appConfig.api8882}/ProvegetByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async MasDocumentMaininsAll(oProveDocument: ProveDocument): Promise<any> {
    const params = JSON.stringify(oProveDocument);
    const url = `${appConfig.api8777}/MasDocumentMaininsAll`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async MasDocumentMainupdByCon(oProveDocument: ProveDocument): Promise<any> {
    const params = JSON.stringify(oProveDocument);
    const url = `${appConfig.api8777}/MasDocumentMainupdByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async MasDocumentMainupdDelete(DocumentID: string): Promise<any> {
    const params = {DocumentID};
    const url = `${appConfig.api8777}/MasDocumentMainupdDelete`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async DocumentinsAll(oPD: ProveDocument): Promise<any> {
    debugger
    const params = JSON.stringify(oPD);
    const url = `${appConfig.api8882}/DocumentinsAll`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async DocumentupdByCon(oPD: ProveDocument): Promise<any> {
    debugger
    const params = JSON.stringify(oPD);
    const url = `${appConfig.api8882}/DocumentupdByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async DocumentupdDelete(oPD: ProveDocument): Promise<any> {
    debugger
    const params = JSON.stringify(oPD);
    const url = `${appConfig.api8882}/DocumentupdDelete`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async MasDocumentMaingetAll(ReferenceCode: string): Promise<any> {
    let pValue = {
      "ReferenceCode" : ReferenceCode,
      "DocumentType" : 5
    }

    const params = JSON.stringify(pValue);
    const url = `${appConfig.api8777}/MasDocumentMaingetAll`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  async ProveArrestgetByCon(IndictmentID: string): Promise<any> {
    const params = { IndictmentID };
    const url = `${appConfig.api8882}/ProveArrestgetByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      await alert(error);
    }
  }

  async ProveProductgetByCon(ProductID: string): Promise<any> {
    const params = { ProductID };
    const url = `${appConfig.api8882}/ProveProductgetByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      await alert(error);
    }
  }
  
  async ArrestIndictmentProductgetByIndictmentID(IndictmentID: string): Promise<any> {
    const params = { IndictmentID };
    const url = `${appConfig.api7788}/ArrestIndictmentProductgetByIndictmentID`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      await alert(error);
    }
  }

  async LawsuitArrestgetByCon(IndictmentID: string): Promise<any> {
    const params = { IndictmentID };
    const url = `${appConfig.api8777}/LawsuitArrestgetByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      await alert(error);
    }
  }

  ProveReport2getByCon(ArrestCode:string, ProveID: string, IndictmentID: string) {
    let pValue = {
      "ArrestCode" : ArrestCode,
      "ProveID" : ProveID,
      "IndictmentID": IndictmentID
    }

    debugger
    const params = JSON.stringify(pValue);
    const url = `${appConfig.apiReport}/ILL_P038.aspx`;
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
