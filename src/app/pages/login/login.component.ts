import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { ThaiDatePipe } from '../reward/pipes/thaiDate.pipe';
import { from } from 'rxjs/observable/from';
import { LayoutComponent } from '../../shared/layout/layout.component';
import { async } from 'q';
import { isNull } from 'util';

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
    let User = form.userName;
    let Pass = form.password;
    if (!User) {
      this.errMsg = "กรุณาระบุชื่อเข้าระบบ";
    } else if (!Pass) {
      this.errMsg = "กรุณาระบุรหัสผ่าน";
    }
    if (User && Pass) {
      if (this.authService.signin(from)) {

        //***********************************Used with in the Excise Only (Don't Delete)********************************** */

        // const params = { UserName: User, Password: Pass };
        // await this.authService.LDPAGAuthen(params).subscribe(async res => {
        //   console.log('LDAP Res : ', res.Body.ResponseObj.userThaiId);
        //   if (res.Body.ResponseObj.userThaiId) {
        //     const paramsPinID = { "SystemID": "sso", "UserName": "pccsso", "Password": "sso2561", "RequestData":
        //         { "PersonNID": res.Body.ResponseObj.userThaiId }};
        //     await this.authService.eofficeInfo(paramsPinID).subscribe(async res => {
        //       console.log("res eofficeInfo  : ", res);
        //       if (res.Status == "OK") {
        //         const LinePositionLevel = res.PersonInformation.LinePositionLevel == null ? "" : res.PersonInformation.LinePositionLevel;
        //         this.fullName = res.PersonInformation.PersonTHTitle +
        //           res.PersonInformation.PersonTHName + " " + res.PersonInformation.PersonTHSurName;
        //         localStorage.setItem('fullName', this.fullName);
        //         localStorage.setItem('operationPosName', res.PersonInformation.LinePotistion + LinePositionLevel);
        //         localStorage.setItem('officeShortName', res.PersonInformation.WorkOffName);
        //         localStorage.setItem('staffCode', res.PersonInformation.PersonID);
        //         localStorage.setItem('officeCode', res.PersonInformation.WorkOffCode);
        //         localStorage.setItem('UserAccountID', '186');//fig for Permission complete
        //         let url = decodeURIComponent(this.returnUrl);
        //         this.router.navigateByUrl(url);
        //       } else this.errMsg = "Please Check User or Password"
        //     });
        //   } else this.errMsg = "User or Password invalid"
        // });

        //****************************(End Used with in the Excise Only)***************************** */


        /*****************************Used outside the Excise (Don't Delete*)****************************** */
        const params = {
          UserName: User,
          Password: Pass
        };
        await this.authService.userAuth(params).subscribe(async res => {
          if (res.StaffCode != null) {
            this.fullName = res.TitleName + " " + res.FirstName + " " + res.LastName;
            this.operationPosName = res.OperationPosName;
            this.OfficeShortName = res.OfficeShortName;
            localStorage.setItem('fullName', this.fullName);
            localStorage.setItem('operationPosName', this.operationPosName);
            localStorage.setItem('officeShortName', this.OfficeShortName);
            localStorage.setItem('staffCode', res.StaffCode);
            localStorage.setItem('officeCode', res.OfficeCode);
            localStorage.setItem('UserAccountID', res.UserAccountID);
            let url = decodeURIComponent(this.returnUrl);
            this.router.navigateByUrl(url);
          } else this.errMsg = res.Msg;
        });
        /*****************************End Used outside the Excise****************************** */
      }
    }
  }

  ClearErrMsg() {
    this.errMsg = '';
  }

  ngOnInit() { }

}