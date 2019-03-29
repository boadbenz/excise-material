import { Injectable } from '@angular/core';
import { appConfig } from "app/app.config";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpService } from "app/core/http.service";
import { Observable } from 'rxjs';
import { Http, Response, RequestOptions, Headers, Jsonp, ResponseContentType } from '@angular/http'
import { stringify } from '@angular/compiler/src/util';
import { promise } from 'protractor';

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient,
    private httpService: HttpService,
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

  userAndPrivilegeInfo(User): Observable<any>{
    // console.log('User : ',User)
    let options = new RequestOptions({ headers: this.getHeaders() });
    const url = `${appConfig.exciseService}/edssows/ldap/userAndPrivilegeInformation?userID=${User}&systemID=Test010`
    return this.http.get(url)
      .map((res: Response) => res.json())
      .catch(this.handleErrorObservable);
  }
  
  eofficeInfo(params): Observable<any> {
    let options = new RequestOptions({ headers: this.getHeaders() });
    const url = `http://uat.eoffice.excise.go.th:7003/EOfficeWS/HrstPersonInformation `
    return this.http.post(url, params, options)
      .map((res: Response) => res.json())
      .catch(this.handleErrorObservable);
  }

  //---------------------------------TEST---------------------------------------

  // private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  // getTest() {
  //   this.httpClient.get(`${appConfig.exciseService}/edssows/ldap/userAndPrivilegeInformation?userID=rod&systemID=Test010`).subscribe((res:any) => {
  //     console.log('getTest :', res);
  //   });
  // }

  // userAndPrivilegeInfo(User): Observable<any> {
  //   const params = '';
  //   const url = `${appConfig.exciseService}/edssows/ldap/userAndPrivilegeInformation?userID=${User}&systemID=Test010"`;
  //   return this.httpClient.get<any>(url, this.httpOptions);
  // }
  // testGet(){
  //   const url = `http://webtest.excise.go.th/edssows/ldap/userAndPrivilegeInformation?userID=rod&systemID=Test010`;
  //   return this.responseGetMethod(url);
  // }
  //  async testGet() {
  //   const getUrl = `http://webtest.excise.go.th/edssows/ldap/userAndPrivilegeInformation?userID=rod&systemID=Test010`

  //   return await this.httpClient.get<Response>(getUrl).toPromise() ;
  // }

  // private getHeaderstest() {
  //   let headers = new Headers();
  //   headers.append('Content-Type','application/json; ');
  //   headers.append('Access-Control-Allow-Origin','https://developer.mozilla.org')
  //   headers.append( "cache-control", "no-cache")
  //   // headers.append('Accept', '	text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8');
  //   // headers.append('Access-Control-Allow-Origin', '*');
  //   return headers;
  // }
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