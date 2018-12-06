import { Injectable } from '@angular/core';
import { appConfig } from "app/app.config";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HttpService } from "app/core/http.service";

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient,
              private HttpService: HttpService) { }

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

  async userAuth(userIn, passIn) {
    const params = { userIn: userIn,
                     passIn: passIn };
    const url = `${appConfig.api8088}/userAuthen`;
    return await this.httpClient.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
  }
}
