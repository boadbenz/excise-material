import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Compare } from './fine-model';
import { appConfig } from '../../app.config';


@Injectable()
export class FineService {

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json'
      })
  };


    getByKeyword(Textsearch: string) {
        const params = Textsearch;
        const url = `${appConfig.api8881}/ComparegetByKeyword`;
        return this.http.post<Compare[]>(url, params, this.httpOptions);
    }

    getByConAdv(form: any) {
      debugger
        const params = JSON.stringify(form);
        const url = `${appConfig.api8881}/ComparegetByConAdv`;
        return this.http.post<Compare[]>(url, params, this.httpOptions);
    }

}
