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

  async LawsuitegetByCon(LawsuitID: string): Promise<Lawsuit> {
    const params = { LawsuitID };
    const url = `${appConfig.api8083}/LawsuitgetByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res.ResponseData as Lawsuit;
    } catch (error) {
      await alert(error);
    }
  }

  async getGuiltBaseByCon(GuiltBaseID: string): Promise<GuiltBase> {
    const params = { GuiltBaseID };
    const url = `${appConfig.api8881}/CompareMasLawgetByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res as GuiltBase;
    } catch (error) {
      await alert(error);
    }
  }
}
