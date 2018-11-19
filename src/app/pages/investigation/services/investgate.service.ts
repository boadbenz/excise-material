import { Injectable } from '@angular/core';
import { HttpService } from 'app/core/http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appConfig } from 'app/app.config';

@Injectable()
export class InvestgateService {

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

  InvestigateListgetByKeyword(TextSearch: string, StaffCode: string) {
    const params = { TextSearch, StaffCode };
    const url = `${appConfig.api8888}/InvestigateListgetByKeyword`;
    return this.http.post(url, params).map(x => x.json());
  }

  InvestigateListgetByConAdv(form: any) {
    const params = form;
    const url = `${appConfig.api8888}/InvestigateListgetByConAdv`;
    return this.http.post(url, params).map(x => x.json());
  }

  InvestigategetByCon(InvestigateCode: string) {
    const params = { InvestigateCode };
    const url = `${appConfig.api8888}/InvestigategetByCon`;
    return this.http.post(url, params).map(x => x.json());
  }

  async InvestigateinsAll(invest: any) {
    const params = invest;
    const url = `${appConfig.api8888}/InvestigateinsAll`;
    return await this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
  }

  InvestigateupdAll(invest: any) {
    const params = invest;
    const url = `${appConfig.api8888}/InvestigateupdAll`;
    return this.http.post(url, params).map(x => x.json());
  }

  async InvestigateupdDelete(InvestigateCode: string) {
    const params = { InvestigateCode };
    const url = `${appConfig.api8888}/InvestigateupdDelete`;
    return await this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
  }

  async InvestigateLawsuitResultCountgetByLawbreakerID(LawbreakerID: string) {
    const params = { LawbreakerID };
    const url = `${appConfig.api8888}/InvestigateLawsuitResultCountgetByLawbreakerID`;
    return await this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
  }
}
