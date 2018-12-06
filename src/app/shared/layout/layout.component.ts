import { Component, OnInit,  ViewChild, AfterViewInit } from '@angular/core';
import { PreloaderService } from '../preloader/preloader.component';
import * as custom from 'assets/js/_custom';
import { LoginComponent } from '../../pages/login/login.component';
import { VariableAst } from '@angular/compiler';
// import { AuthService } from '../../pages/login/auth.service'
// import { fullName, operationPosName } from '../../pages/login/login.component'
// import * as vars from './fullName';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  // providers: [LoginComponent,AuthService]

})
export class LayoutComponent implements OnInit {

  @ViewChild(LoginComponent) Vars;

  isPreloader: any;
  fName: string;
  opName: string;

  constructor(private preloader: PreloaderService,
    //  private loginComponent: LoginComponent
  ) {

  }
  // ngAfterViewInit() {
    // this.fName = this.Vars.operationPosName
    // console.log("layout this.fName : ",this.fName)
  // }
  ngOnInit() {
    custom.detectChange();
    this.isPreloader = this.preloader.showPreloader;
    // this.fName = this.loginComponent.fullName;
    //  this.opName = this.loginComponent.operationPosName;
    // console.log("layout this.fName : ",this.fName)
    // console.log("layout this.fName : ",this.fName)
  }




}
