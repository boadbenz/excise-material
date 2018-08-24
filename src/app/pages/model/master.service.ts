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
    const url = `${appConfig.api8881}/CompareMasOfficegetByKeyword`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      await alert(error);
    }
  }

  async getStaff(): Promise<any> {
    const params = {};
    const url = `${appConfig.api8881}/CompareMasStaffgetByKeyword`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      await alert(error);
    }
  }
  
}
