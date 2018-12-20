import { Injectable } from '@angular/core';
import { appConfig } from "app/app.config";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpService } from "app/core/http.service";
import { Observable } from 'rxjs';
import { Http, Response, RequestOptions, Headers, Jsonp, ResponseContentType } from '@angular/http'

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

  getPin() {
    let options = new RequestOptions({ headers: this.getHeadersSSO() });
    return this.http.request('http://webtest.excise.go.th/edssows/ldap/userAndPrivilegeInformation?userID=tester&systemID=Test010',options);
  }
  private getHeadersSSO() {
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Method', '*');
    // headers.append('Content-Type', 'application/json');
    headers.append('Content-Type', 'application/json; charset=utf-8');

    // headers.set("content-security-policy", "content-security-policy")
    // headers.set("x-content-type-options", "x-content-type-options")
    // headers.set("x-powered-by", "x-powered-by")
    // headers.set("allow", "allow")
    // headers.set("access-control-allow-methods", "access-control-allow-methods")
    // headers.set("content-type", "content-type")
    // headers.set("access-control-allow-origin", "access-control-allow-origin")
    // headers.set("date", "date")
    // headers.set("connection", "connection")
    // headers.set("access-control-allow-headers", "access-control-allow-headers")
    // headers.set("content-length", "content-length")
    return headers;
  }

  // private httpOption = {
  //   Headers: new HttpHeaders({
  //     'origin': 'http://127.0.0.1:4200',
  //     'access-control-request-method': 'GET',
  //     'access-control-request-headers': ''
  //   })

  // }

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
