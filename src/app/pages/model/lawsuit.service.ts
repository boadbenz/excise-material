import { Injectable, HostListener } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { appConfig } from '../../app.config';
import { Lawsuit } from './lawsuit-model';
import { GuiltBase } from './guiltBase-model';

@Injectable()
export class LawsuitService {

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json'
      })
  };

  async LawsuitegetByCon(LawsuitID: string): Promise<any> {
    const params = { LawsuitID };
    const url = `${appConfig.api8777}/LawsuitgetByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      await alert(error);
    }
  }

  async LawsuitegetByCon2(LawsuitID: string): Promise<Lawsuit> {
    console.log(LawsuitID);
    const params = { LawsuitID };
    const url = `${appConfig.api8777}/LawsuitgetByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res as any;
    } catch (error) {
      await alert(error);
    }
  }

  async getGuiltBaseByCon(GuiltBaseID: string): Promise<GuiltBase> {
    const params = { GuiltBaseID };
    const url = `${appConfig.api7777}/CompareMasLawgetByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res as GuiltBase;
    } catch (error) {
      await alert(error);
    }
  }

  async CompareMasLawgetByCon(GuiltBaseID) {
    const params = { GuiltBaseID: GuiltBaseID };
    const url = `${appConfig.api7777}/CompareMasLawgetByCon`;
    const res = await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
    // if (res.IsSuccess) {
    //   return res.ResponseData
    // }
    return res
  }
}
