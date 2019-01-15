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
}
