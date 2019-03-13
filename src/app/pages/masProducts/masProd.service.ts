import { Injectable, HostListener } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { appConfig } from '../../app.config';

@Injectable()
export class MasProdService {

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json'
      })
  };

  DutyGroupgetAll(Textsearch: string) {
    const params = Textsearch;
    const url = `${appConfig.api7777}/DutyGroupgetAll`;
    return this.http.post<any>(url, params, this.httpOptions);
  }

  MasProductgetByCon(ProductID: string) {
    const params = ProductID;
    const url = `${appConfig.api7777}/MasProductgetByCon`;
    return this.http.post<any>(url, params, this.httpOptions);
  }

  BrandSecondgetAll() {
    const params = '';
    const url = `${appConfig.api7777}/BrandSecondgetAll`;
    return this.http.post<any>(url, params, this.httpOptions);
  }

  BrandMaingetAll() {
    const params = '';
    const url = `${appConfig.api7777}/BrandMaingetAll`;
    return this.http.post<any>(url, params, this.httpOptions);
  }

  DutyUnitgetAll() {
    const params = '';
    const url = `${appConfig.api7777}/DutyUnitgetAll`;
    return this.http.post<any>(url, params, this.httpOptions);
  }

  SizePackagegetAll() {
    const params = '';
    const url = `${appConfig.api7777}/SizePackagegetAll`;
    return this.http.post<any>(url, params, this.httpOptions);
  }

}

