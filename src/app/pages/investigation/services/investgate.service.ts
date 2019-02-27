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

  version = '0.0.0.23'
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


  async PermissionCheck(params: any): Promise<any> {
    const paramss = JSON.stringify(params);
    const url = `${appConfig.api8778}/UserAccountPermissionCheckPermission`;
    try {
      const res = await this.httpClient.post<any>(url, paramss, this.httpOptions).toPromise();
      return res;
    } catch (error) {
      return [];
    }
  }

  InvestigateDetailgetByCon(InvestigateDetailID: string) {
    const params = { InvestigateDetailID };
    const url = `${appConfig.apiReport}/ILG60_00_01_001.aspx`;
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
    const url = `${appConfig.api8777}/InvestigateListgetByKeyword`;
    return this.http.post(url, params).map(x => x.json());
  }

  InvestigateListgetByConAdv(form: any) {
    const params = form;
    const url = `${appConfig.api8777}/InvestigateListgetByConAdv`;
    return this.http.post(url, params).map(x => x.json());
  }

  InvestigategetByCon(InvestigateCode: string) {
    const params = { InvestigateCode };
    const url = `${appConfig.api8777}/InvestigategetByCon`;
    return this.http.post(url, params).map(x => x.json());
  }

  async InvestigateinsAll(invest: any) {
    const params = invest;
    const url = `${appConfig.api8777}/InvestigateinsAll`;
    return await this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
  }

  InvestigateupdAll(invest: any) {
    const params = invest;
    const url = `${appConfig.api8777}/InvestigateupdAll`;
    return this.http.post(url, params).map(x => x.json());
  }

  InvestigateupdDelete(InvestigateCode: string) {
    const params = { InvestigateCode };
    const url = `${appConfig.api8777}/InvestigateupdDelete`;
    return this.http.post(url, params).map(x => x.json());
  }

  async InvestigateLawsuitResultCountgetByLawbreakerID(LawbreakerID: string) {
    const params = { LawbreakerID };
    const url = `${appConfig.api8777}/InvestigateLawsuitResultCountgetByLawbreakerID`;
    return await this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
  }


}
