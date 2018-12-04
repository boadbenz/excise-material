import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { ThaiDatePipe } from '../reward/pipes/thaiDate.pipe';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
  errMsg: string;

  returnUrl: string;

  constructor(private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute) {
    // reset signin status
    this.authService.signout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  ngOnInit() {
  }

  async onSubmit(form: any) {
    var User = form.userName
    var Pass = form.password;
    // console.log("User : ", User, "Pass : ", Pass);
    if (!User) {
      this.errMsg = "กรุณาระบุชื่อเข้าระบบ";
    } else if (!Pass) {
      this.errMsg = "กรุณาระบุรหัสผ่าน";
    }
    if (User && Pass) {
      if (this.authService.signin(form)) {
        this.router.navigate([this.returnUrl]);
      };

        // await this.authService.userAuth(User,Pass).then(async res => {

        //   console.log("res : ",res);
          // if (res) {
              
          // }else this.errMsg = "";
      // });
    }
  }
  ClearErrMsg() {
    this.errMsg = '';
  }



  // onSubmit(form: any) {
  //   if (this.authService.signin(form)) {
  //     this.router.navigate([this.returnUrl]);
  //   };

  // }

}
