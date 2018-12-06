import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { ThaiDatePipe } from '../reward/pipes/thaiDate.pipe';
import { from } from 'rxjs/observable/from';
import { LayoutComponent } from '../../shared/layout/layout.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LayoutComponent]
})
export class LoginComponent implements OnInit {

  returnUrl: string;

  errMsg: string;
  fullName: string = "";
  operationPosName: string = "";
  constructor(private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private layoutComponent: LayoutComponent,
    private route: ActivatedRoute) {
    // reset signin status
    this.authService.signout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  async onSubmit(form: any) {
    var User = form.userName
    var Pass = form.password;
    if (!User) {
      this.errMsg = "กรุณาระบุชื่อเข้าระบบ";
    } else if (!Pass) {
      this.errMsg = "กรุณาระบุรหัสผ่าน";
    }
    if (User && Pass) {
      if (this.authService.signin(from)) {
        const params = {
          UserName: User,
          Password: Pass
        };
        await this.authService.userAuth(params).subscribe(async res => {
          if (res.StaffCode != null) {
            this.fullName = res.TitleName + " " + res.FirstName + " " + res.LastName;
            this.operationPosName = res.OperationPosName;
            localStorage.setItem('fullName', this.fullName);
            localStorage.setItem('operationPosName', this.operationPosName);
            this.router.navigate([this.returnUrl]);
          } else this.errMsg = res.Msg;
        });
      }
    }
  }
  
  ClearErrMsg() {
    this.errMsg = '';
  }

  ngOnInit() { }

  // onSubmit(form: any) {
  //   if (this.authService.signin(form)) {
  //     this.router.navigate([this.returnUrl]);
  //   };

  // }

}
