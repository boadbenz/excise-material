import { Injectable } from '@angular/core';
import { appConfig } from "app/app.config";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpService } from "app/core/http.service";
import { Observable } from 'rxjs';
import { Http, Response, RequestOptions, Headers, Jsonp ,ResponseContentType} from '@angular/http'

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient,
              private HttpService: HttpService,
              private http: Http) { }

  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json'
      })
  };

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

  userAuth1(params): Observable<any> {
    let options = new RequestOptions({ headers: this.getHeaders() });
    // const url = `${appConfig.api8086}/UACVerifyLogIn`
    const url = "http://webtest.excise.go.th/edssows/ldap/userPrivilege?userID=tester&systemID=Test010"
    return this.http.get(url, options)
      .map((res: Response) => res.json())
      .catch(this.handleErrorObservable);
  }
  userAuth2(): Observable<any> {
    let options = new RequestOptions({ responseType: ResponseContentType.Blob });
    return this.http.get( "http://webtest.excise.go.th/edssows/ldap/userPrivilege?userID=tester&systemID=Test010", options)
      .map((res: Response) => res)
      .catch(this.handleErrorObservable);
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
