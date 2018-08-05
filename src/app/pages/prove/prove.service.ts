import { Injectable, HostListener } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { appConfig } from '../../app.config';
import { Prove } from './prove';

@Injectable()
export class ProveService {

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json'
      })
  };


  getByKeyword(Textsearch: string) {
    const params = Textsearch;
    const url = `${appConfig.api8882}/ProvegetByKeyword`;
    return this.http.post<Prove[]>(url, params, this.httpOptions);
}

  // async getByKeyword(Textsearch: string): Promise<any> {
  //   debugger
  //   const params = { Textsearch };
  //   const url = `${appConfig.api8882}/ProvegetByKeyword`;

  //   try {
  //     const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
  //     return res as any;
  //   } catch (error) {
  //     await alert(error);
  //   }
  // }

  async getByConAdv(form: any): Promise<any> {
    const params = JSON.stringify(form);
    const url = `${appConfig.api8882}/ProvegetByConAdv`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res as any;
    } catch (error) {
      await alert(error);
    }
  }
}
