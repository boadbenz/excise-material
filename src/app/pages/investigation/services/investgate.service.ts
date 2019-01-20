import { Injectable } from '@angular/core';
import { HttpService } from 'app/core/http.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appConfig } from 'app/app.config';
import { Observable } from 'rxjs';
import { LoaderService } from 'app/core/loader/loader.service';

@Injectable()
export class InvestgateService {

  constructor(
    private http: HttpService,
    private httpClient: HttpClient,
    private loaderService: LoaderService
  ) { }

  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json'
      })
  };

  version = '0.0.0.16'
  private onEnd(): void {
    this.hideLoader();
  }

  private showLoader(): void {
    this.loaderService.show();
  }

  private hideLoader(): void {
    this.loaderService.hide();
  }

  private onSuccess(res: Response): void {
    console.log('Request successful');
  }

  private onError(res: Response): void {
    console.log('Error, status code: ' + res.status);
  }

  private onCatch(error: any, caught: Observable<any>): Observable<any> {
    return Observable.throw(error);
  }
  
  InvestigateDetailgetByCon(InvestigateDetailID: string) {
    const params = { InvestigateDetailID };
    const url = `${appConfig.apiReport}/InvestigateDetailgetByCon.aspx`;
    this.showLoader();
    return this.httpClient.post(url, params, { ...this.httpOptions, responseType: 'blob' })
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSuccess(res);
      }, (error: any) => {
        this.onError(error);
      })
      .map(x => x)
      .finally(() => this.onEnd());
  }

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

  InvestigateupdDelete(InvestigateCode: string) {
    const params = { InvestigateCode };
    const url = `${appConfig.api8888}/InvestigateupdDelete`;
    return this.http.post(url, params).map(x => x.json());
  }

  async InvestigateLawsuitResultCountgetByLawbreakerID(LawbreakerID: string) {
    const params = { LawbreakerID };
    const url = `${appConfig.api8888}/InvestigateLawsuitResultCountgetByLawbreakerID`;
    return await this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
  }


}
