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
  fullName: string;
  operationPosName: string;

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
      const params = {
        UserName: User,
        Password: Pass
      };
      await this.authService.userAuth(params).subscribe(async res => {
        if (res.StaffCode != null) {
          this.fullName = res.TitleName + res.FirstName + " " + res.LastName;
          this.operationPosName = res.OperationPosName;
          console.log("fullName : ", this.fullName)
          console.log("operationPosName : ", this.operationPosName)

          if (this.authService.signin(form)) {
            this.router.navigate([this.returnUrl]);
          };
        } else this.errMsg = "ไม่สามารถเข้าสู่ระบบได้ กรุณาตรวจสอบ";
      });
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
