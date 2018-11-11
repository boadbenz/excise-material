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
    const url = `${appConfig.api8881}/CompareMasOfficegetAll`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      //await alert(error);
    }
  }

  async getStaff(): Promise<any> {
    const params = {};
    const url = `${appConfig.api8881}/CompareMasStaffgetAll`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      //await alert(error);
    }
  }
  // 2018-11-11: Wish | ILG60-06-02-E01 > 1.1.2 > 1.1.2

  async getDepartmentStation(): Promise<any> {
    const params = {};
    const url = `${appConfig.api8881}/MasDepartmentMaingetAll`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      //await alert(error);
    }
  }
  // 2018-11-11: Wish | | ILG60-06-02-E01 > 1.1.2 > 1.2.2
  async getMainStaff(): Promise<any> {
    const params = {};
    const url = `${appConfig.api8881}/MasStaffMaingetAll`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      //await alert(error);
    }
  }
}
