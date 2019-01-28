import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Revenue, RevenueDetail } from './evidenceOut';
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

  getByKeyword(Textsearch: string) {
    const params = Textsearch;
    const url = `${appConfig.api8775}/EvidenceOutgetByKeyword`;
    return this.http.post<Evidence_In[]>(url, params, this.httpOptions);
  }
}
