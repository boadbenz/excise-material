import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appConfig } from 'app/app.config';
import { HttpService } from 'app/core/http.service';

@Injectable()
export class InvestgateDetailService {

  constructor(
    private http: HttpService,
    private httpClient: HttpClient
  ) { }

  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json'
      })
  };

  async InvestigateDetailgetByCon(InvestigateDetailID: string) {
    const params = { InvestigateDetailID };
    const url = `${appConfig.api8888}/InvestigateDetailgetByCon`;
    return await this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
  }

  async InvestigateDetailinsAll(inves: any) {
    const params = inves;
    const url = `${appConfig.api8888}/InvestigateDetailinsAll`;
    return await this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
  }

  async InvestigateDetailupdByCon(inves: any) {
    const params = inves;
    const url = `${appConfig.api8888}/InvestigateDetailupdByCon`;
    return await this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
  }

   InvestigateDetailupdDelete(InvestigateDetailID: string) {
    const params = { InvestigateDetailID };
    const url = `${appConfig.api8888}/InvestigateDetailupdDelete`;
    return this.http.post(url, params).map(x => x.json());
  }


  ////////////////// Staff \\\\\\\\\\\\\\\\\\
  async InvestigateDetailStaffinsAll(staff: any) {
    const params = staff;
    const url = `${appConfig.api8888}/InvestigateDetailStaffinsAll`;
    return await this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
  }

  async InvestigateDetailStaffupdByCon(staff: any) {
    const params = staff;
    const url = `${appConfig.api8888}/InvestigateDetailStaffupdByCon`;
    return await this.httpClient.post<any>(url, params, this.httpOptions).toPromise();

  }

  async InvestigateDetailStaffupdDelete(StaffID: string) {
    const params = { StaffID };
    const url = `${appConfig.api8888}/InvestigateDetailStaffupdDelete`;
    return await this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
  }


  ////////////////// Product \\\\\\\\\\\\\\\\\\
  async InvestigateDetailProductinsAll(product: any) {
    const params = product;
    const url = `${appConfig.api8888}/InvestigateDetailProductinsAll`;
    return await this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
  }

  async InvestigateDetailProductupdByCon(product: any) {
    const params = product;
    const url = `${appConfig.api8888}/InvestigateDetailProductupdByCon`;
    return await this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
  }

  async InvestigateDetailProductupdDelete(ProductID: string) {
    const params = { ProductID };
    const url = `${appConfig.api8888}/InvestigateDetailProductupdDelete`;
    return await this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
  }

  ////////////////// Local \\\\\\\\\\\\\\\\\\
  async InvestigateDetailLocalinsAll(local: any) {
    const params = local;
    const url = `${appConfig.api8888}/InvestigateDetailLocalinsAll`;
    return await this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
  }

  async InvestigateDetailLocalupdByCon(local: any) {
    const params = local;
    const url = `${appConfig.api8888}/InvestigateDetailLocalupdByCon`;
    return await this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
  }

  async InvestigateDetailLocalupdDelete(LocalID: string) {
    const params = { LocalID };
    const url = `${appConfig.api8888}/InvestigateDetailLocalupdDelete`;
    return await this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
  }


  ////////////////// Suspect \\\\\\\\\\\\\\\\\\
  async InvestigateDetailSuspectinsAll(suspect: any) {
    const params = suspect;
    const url = `${appConfig.api8888}/InvestigateDetailSuspectinsAll`;
    return await this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
  }

  async InvestigateDetailSuspectupdByCon(suspect: any) {
    const params = suspect;
    const url = `${appConfig.api8888}/InvestigateDetailSuspectupdByCon`;
    return await this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
  }

  async InvestigateDetailSuspectupdDelete(SuspectID: string) {
    const params = { SuspectID };
    const url = `${appConfig.api8888}/InvestigateDetailSuspectinsAll`;
    return await this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
  }
}
