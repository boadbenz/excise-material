import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { ThaiDatePipe } from '../reward/pipes/thaiDate.pipe';
import { from } from 'rxjs/observable/from';
import { LayoutComponent } from '../../shared/layout/layout.component';
import { async } from 'q';

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
  OfficeShortName: string = "";
  constructor(private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute) {
    // reset signin status
    this.authService.signout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

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
          systemId: "WSS",
          UserName: User,
          Password: Pass,
          ipAddress: "10.11.1.10",
          requestData: {
            UserId: "lic02"
          }
        };
        await this.authService.ssoService(params).subscribe(async res => {

          if (res.ResponseMessage == "SUCCESS") {
            // console.log("res++++ : ", res);
            // await this.authService.userAndPrivilegeInfo().subscribe(async res =>{
            //   console.log("getpin : ",res);
            // });
            const params = {
              SystemID: "sso",
              Username: "pccsso",
              Password: "sso2561",
              RequestData: {
                PersonNID: "1340800041891"
              }
            }
            await this.authService.eofficeInfo(params).subscribe(async res => {
              console.log("res++++ : ", res);

            });


          } else this.errMsg = res.ResponseMessage; console.log("res.ErrMsg ++++ : ", res.ResponseMessage);
        });

        // const params = {
        //   UserName: User,
        //   Password: Pass
        // };
        // await this.authService.userAuth(params).subscribe(async res => {
        //   // console.log("res++++ : ",res);
        //   if (res.StaffCode != null) {
        //     this.fullName = res.TitleName + " " + res.FirstName + " " + res.LastName;
        //     this.operationPosName = res.OperationPosName;
        //     this.OfficeShortName = res.OfficeShortName;
        //     localStorage.setItem('fullName', this.fullName);
        //     localStorage.setItem('operationPosName', this.operationPosName);
        //     localStorage.setItem('officeShortName', this.OfficeShortName);
        //     this.router.navigate([this.returnUrl]);
        //   } else this.errMsg = res.Msg;
        // });

      }
    }
  }

  ClearErrMsg() {
    this.errMsg = '';
  }

  ngOnInit() { }

}
