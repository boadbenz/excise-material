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

  userAuth1(): Observable<any> {
    let options = new RequestOptions({ headers: this.getHeaders() });
    // var xhttp = new XMLHttpRequest();
    return this.httpClient.get('http://webtest.excise.go.th/edssows/ldap/userAndPrivilegeInformation?userID=tester&systemID=Test010', this.httpOptions)
      .map((res: Response) => res)
      .catch(this.handleErrorObservable);
  }

  private httpOptions = {
    headers: new HttpHeaders(
      {
        // 'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin':'*',    
        "Access-Control-Allow-Origin": '*',
        "Access-Control-Allow-Methods": 'GET,POST,PATCH,DELETE,PUT,OPTIONS',
        "Access-Control-Allow-Headers": 'Origin, Content-Type, X-Auth-Token, content-type',
      })
  };

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
