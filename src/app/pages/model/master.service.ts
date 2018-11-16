import { Injectable, HostListener } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { appConfig } from '../../app.config';
import { Lawsuit } from './lawsuit-model';
import { GuiltBase } from './guiltBase-model';

@Injectable()
export class MasterService {

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json'
      })
  };
  
  async getStation(): Promise<any> {
    const params = {};
    const url = `${appConfig.api7789}/MasOfficeMaingetAll`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      //await alert(error);
    }
  }

  async getStaff(): Promise<any> {
    const params = {};
    const url = `${appConfig.api7789}/MasStaffMaingetAll`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      //await alert(error);
    }
  }

  async getProduct(): Promise<any> {
    const params = {};
    const url = `${appConfig.api7789}/MasProductMaingetAll`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      //await alert(error);
    }
  }
  
}
