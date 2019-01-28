import { Injectable } from '@angular/core';
import { appConfig } from "app/app.config";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpService } from "app/core/http.service";
import { Observable } from 'rxjs';
import { Http, Response, RequestOptions, Headers, Jsonp, ResponseContentType } from '@angular/http'
import { stringify } from '@angular/compiler/src/util';

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient,
    private HttpService: HttpService,
    private http: Http) { }


  signin(form: any) {

    // return res.map(user => {s
    //   if (user && user.access_token) {
    localStorage.setItem('currentUser', JSON.stringify(form));
    //   }
    return form;
    // });
  }

  signout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  userAuth(params): Observable<any> {
    let options = new RequestOptions({ headers: this.getHeaders() });
    const url = `${appConfig.api8086}/UACVerifyLogIn`
    return this.http.post(url, params, options)
      .map((res: Response) => res.json())
      .catch(this.handleErrorObservable);
  }

  ssoService(params): Observable<any> {
    let options = new RequestOptions({ headers: this.getHeaders() });
    const url = `http://webtest.excise.go.th/EDRestServicesUAT/sso/ExciseUserInfomation`
    return this.http.post(url, params, options)
      .map((res: Response) => res.json())
      .catch(this.handleErrorObservable);
  }

  userAndPrivilegeInfo() {
    let options = new RequestOptions({ headers: this.getHeadersSSO() });
    const url = 'http://webtest.excise.go.th/edssows/ldap/userAndPrivilegeInformation?userID=tester&systemID=Test010'
    return this.http.get(url, options)
      .map((res: Response) => res.json())
      .catch(this.handleErrorObservable);
  }

  eofficeInfo(params): Observable<any> {
    let options = new RequestOptions({ headers: this.getHeadersSSO() });
    const url = `http://uat.eoffice.excise.go.th:7003/EOfficeWS/HrstPersonInformation`
    return this.http.post(url, params, options)
      .map((res: Response) => res.json())
      .catch(this.handleErrorObservable);
  }

  private getHeadersSSO() {
    let headers = new Headers();
    // headers.append('Access-Control-Allow-Origin', '*');
    // headers.append('Access-Control-Allow-Method', '*');
    headers.append('Content-Type', 'application/json ; charset=utf-8');
    
    // headers.append('responseType', 'application/json ');
    // headers.append('Accept', 'application/json; charset=utf-8');
    // headers.set('Access-Control-Allow-Credentials', 'true');
    // headers.append('Access-Control-Allow-Origin', 'true');

    return headers;
  }

  private getHeaders() {
    let headers = new Headers();  
    headers.append('Content-Type', 'application/json; charset=utf-8');
    return headers;
  }

  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }
}
