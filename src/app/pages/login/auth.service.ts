import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

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

}
