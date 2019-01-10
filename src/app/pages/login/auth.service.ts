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

  /****************************(Used with in the Excise Only)***************************** */
  ssoService(params): Observable<any> {
    let options = new RequestOptions({ headers: this.getHeaders() });
    const url = `${appConfig.exciseService}/EDRestServicesUAT/sso/ExciseUserInfomation`
    return this.http.post(url, params, options)
      .map((res: Response) => res.json())
      .catch(this.handleErrorObservable);
  }

  userAndPrivilegeInfo(User) {
    const url = `${appConfig.exciseService}/edssows/ldap/userAndPrivilegeInformation?userID=${User}&systemID=Test010"`
    return this.http.get(url)
      .map((res: Response) => res.json())
      .catch(this.handleErrorObservable);
  }

  eofficeInfo(params): Observable<any> {
    let options = new RequestOptions({ headers: this.getHeaders() });
    const url = `http://uat.eoffice.excise.go.th:7003/EOfficeWS/HrstPersonInformation `
    return this.HttpService.post(url, params, options)
      .map((res: Response) => res.json())
      .catch(this.handleErrorObservable);
  }
  /****************************(End Used with in the Excise Only)***************************** */


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