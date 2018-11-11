import { Injectable, HostListener } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { appConfig } from '../../app.config';
import { Arrest } from './arrest';

@Injectable()
export class ArrestService {

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json'
      })
  };

  async getByArrestCon(ArrestCode: string): Promise<any> {
    const params = { ArrestCode };
    const url = `${appConfig.api7788}/ArrestgetByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res as any;
    } catch (error) {
      return [];
    }
  }

  //2018-11-11: Wish | ILG60-06-02-E01 > 1.1.2.2
  async getByCompareArrestCon(ArrestCode: string): Promise<any> {
    const params = { ArrestCode };
    const url = `${appConfig.api7788}/CompareArrestgetByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res as any;
    } catch (error) {
      return [];
    }
  }
}
