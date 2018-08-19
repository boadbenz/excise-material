import { Injectable, HostListener } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { appConfig } from '../../app.config';
import { Prove } from './prove';
import { ProveDocument } from './proveDoc';
import { ProveProduct } from './proveProduct';

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
    const url = `${appConfig.api8882}/ProvegetByKeyword`;
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
    const url = `${appConfig.api8882}/ProvegetByConAdv`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res as any;
    } catch (error) {
      await alert(error);
    }
  }

  async getProveProductUnit(Textsearch: string): Promise<any> {
    const params = { Textsearch };
    const url = `${appConfig.api8882}/ProveMasProductUnitgetByKeyword`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res as any;
    } catch (error) {
      await alert(error);
    }
  }

  async insAll(oProve: Prove): Promise<any> {
    const params = JSON.stringify(oProve);
    const url = `${appConfig.api8882}/ProveinsAll`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      await alert(error);
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
      await alert(error);
    }
  }

  async ProveProductupdByCon(oProduct: ProveProduct): Promise<any> {
    const params = JSON.stringify(oProduct);
    const url = `${appConfig.api8882}/ProveProductupdByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      await alert(error);
    }
  }

  async ProveProductupdDelete(oProduct: ProveProduct): Promise<any> {
    const params = JSON.stringify(oProduct);
    const url = `${appConfig.api8882}/ProveProductupdDelete`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      await alert(error);
    }
  }

  async ProveupdDelete(ProveID: string): Promise<any> {
    const params = { ProveID };
    const url = `${appConfig.api8882}/ProveupdDelete`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      await alert(error);
    }
  }

  async ProveupdByCon(oProve: Prove): Promise<any> {
    const params = JSON.stringify(oProve);
    const url = `${appConfig.api8882}/ProveupdByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      await alert(error);
    }
  }
  

  async ProvegetByCon(ProveID: string): Promise<any> {
    const params = { ProveID };
    const url = `${appConfig.api8882}/ProvegetByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      await alert(error);
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
      await alert(error);
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
      await alert(error);
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
      await alert(error);
    }
  }

  async DocumentgetByCon(ReferenceCode: string): Promise<any> {
    const params = { ReferenceCode };
    const url = `${appConfig.api8882}/DocumentgetByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      await alert(error);
    }
  }
  
}
