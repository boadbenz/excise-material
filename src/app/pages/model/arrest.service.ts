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

  async getByArrestCon(ArrestCode: string): Promise<Arrest> {
    const params = { ArrestCode };
    const url = `${appConfig.api7788}/ArrestgetByCon`;

    try {
        const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
        console.log(res);
        
        // return res.ResponseData as Arrest;
        return res
    } catch (error) {
        await alert(error);
    }
}
}
