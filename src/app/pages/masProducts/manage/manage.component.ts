import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { MasProdService } from '../masProd.service';
import swal from 'sweetalert2'
import { Message } from 'app/config/message';
import { FormGroup, FormBuilder, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ManageComponent implements OnInit {
  private onPrintSubscribe: any;
  private onSaveSubscribe: any;
  private onCancelSubscribe: any;
  private onDeleSubscribe: any;

  //var of api
  DutyGroup: any;
  BrandMain: any;
  BrandSecond: any;
  DutyUnit: any;

  //option keypress
  options = [];
  BrandMainoptions = [];
  BrandSecondoptions = [];
  DutyUnitoptions = [];

  //dataSet for Ins
  ParamsIns: any;
  IsActive: any = 0;
  ProductCode: any = '';
  GroupCode: any = '';
  BrandCode: any = '';
  BrandMainENG: any = '';
  BrandMainThai: any = '';
  BrandSecondCode: any = '';
  BrandSecondENG: any = '';
  BrandSecondThai: any = '';
  ModelName: any = '';
  Degree: any = '';
  Size: any = '';
  DutyUnitCode: any = '';
  DutyCode: any = '';
  ProductDesc: any = '';
  IsDomestic: any = '';
  IsDomesticvalue: any = '';
  IsDomesticOpt = [
    { Selected: false, IsDomestic: 1, TypeName: 'ภายในประเทศ' },
    { Selected: false, IsDomestic: 2, TypeName: 'ต่างประเทศ' },
    { Selected: false, IsDomestic: 3, TypeName: 'ไม่ระบุ' }
  ];

  //Ins complete
  ProductID: any;

  //dataSet for Upd
  ParamsUpd: any;


  private sub: any;
  mode: string;
  showEditField: any;

  // couForm: FormGroup;

  constructor(private activeRoute: ActivatedRoute,
    private navService: NavigationService,
    private preLoaderService: PreloaderService,
    private masProdService: MasProdService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    console.log('Mas manage ngOnInit')
    // this.couForm = this.fb.group({
    //   couControl: [this.IsDomestic]
    // });

    this.setButton();
    this.navigate_service();
    this.active_route();
  }
  private navigate_service() {

    this.navService.showFieldEdit.subscribe(p => {
      this.showEditField = p;
      switch (p) {
        case false: {
          this.OnPageloadModeC();
          break;
        } default: {
          break;
        }
      }

      // if (!p) {
      //   console.log('edit p :', p)
      //   this.OnPageloadModeC();
      // }
    });

    this.onPrintSubscribe = this.navService.onPrint.subscribe(status => {
      if (status) {
        this.navService.setOnPrint(false);
        // this.modal = this.ngbModel.open(this.printDocModel, { size: 'lg', centered: true });
      }
    });
    this.onSaveSubscribe = this.navService.onSave.subscribe(status => {
      if (status) {
        this.navService.setOnSave(false);
        if (this.mode === 'C') {
          this.SetDataInsMasProd();
          this.onInsMasProd(this.ParamsIns);
        } else if (this.mode === 'R') {
          this.activeRoute.params.subscribe(p => { this.ProductID = p['code'] });
          this.OnpageloadModeR(this.ProductID);
          this.SetDataUpdMasPro();
          this.onUpdMasProd(this.ParamsUpd);
        }
      }
    });
    this.onCancelSubscribe = this.navService.onCancel.subscribe(status => {
      if (status) {
        this.navService.setOnCancel(false);
        swal({
          title: '',
          text: Message.confirmAction,
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirm!'
        }).then((result) => {
          if (result.value) {
            this.onCancel();
          }
        })
      }
    });
    this.onDeleSubscribe = this.navService.onDelete.subscribe(status => {
      if (status) {
        this.navService.setOnDelete(false);
        this.activeRoute.params.subscribe(p => { this.ProductID = p['code'] });
        this.onDeleteMasProd();
      }
    });
  }
  setButton() {
    console.log('setButton')
    this.sub = this.activeRoute.params.subscribe(p => {
      this.mode = p['mode'];
      if (p['mode'] === 'C') {
        console.log('setButton C')
        // set false
        this.navService.setPrintButton(false);
        this.navService.setEditButton(false);
        this.navService.setDeleteButton(false);
        this.navService.setEditField(false);
        this.navService.setOnNextPage(false);
        this.navService.setNewButton(false);
        // set true
        this.navService.setSaveButton(true);
        this.navService.setCancelButton(true);
      } else if (p['mode'] === 'R') {
        console.log('setButton R')
        // set false
        this.navService.setSaveButton(false);
        this.navService.setCancelButton(false);
        this.navService.setNewButton(false);
        // set true
        this.navService.setPrintButton(true);
        this.navService.setEditButton(true);
        this.navService.setDeleteButton(true);
        this.navService.setEditField(true);
      }
    });
  }
  private active_route() {
    this.sub = this.activeRoute.params.subscribe(p => {
      this.mode = p['mode'];
      console.log('active route mode ; ', this.mode)
      //alert(this.mode);
      if (p['mode'] === 'C') {
        console.log('in active_route mode C')
        this.OnPageloadModeC();
      } else if (p['mode'] === 'R') {
        console.log(' p:[code] : ', p['code'])
        this.OnpageloadModeR(p['code'])
      }
    })
  }
 
  async OnpageloadModeR(ProductID) {
    this.preLoaderService.setShowPreloader(true);////

    await this.masProdService.MasProductgetByCon(ProductID).subscribe(list => {
      // this.DutyGroup = list
      this.ProductCode = list.ProductCode==null? '':list.ProductCode;
      this.BrandMainENG = list.BrandNameEN==null? '':list.BrandNameEN;
      this.BrandMainThai = list.BrandNameTH==null? '':list.BrandNameTH;
      this.BrandSecondThai = list.SubBrandNameEN==null? '':list.SubBrandNameEN;
      this.BrandSecondENG = list.SubBrandNameTH==null? '':list.SubBrandNameTH;
      this.ModelName = list.ModelName==null? '':list.ModelName;
      this.Size = list.Size==null? '':list.Size;
      this.DutyCode = list.SizeUnitName==null? '':list.SizeUnitName;
      this.Degree = list.Degree==null? '':list.Degree;
      this.ProductDesc = list.ProductDesc==null? '':list.ProductDesc;
      this.IsDomestic = list.IsDomestic==null? '':list.IsDomestic;
      
      console.log('MasProductgetByCon R : ', list)
      this.preLoaderService.setShowPreloader(false);////
    });
  }
  setIsDomestic(IsDomestic){
    console.log('setIsDomestic : ',IsDomestic)
    this.IsDomesticvalue = this.IsDomesticOpt.filter(f => {f.IsDomestic == IsDomestic})
    console.log('this.IsDomesticvalue : ',this.IsDomesticvalue);
  }
  getIsDomestic(value) {
    console.log('value : ', value)
  }

  async  OnPageloadModeC() {
    console.log('OnPageload mode C')
    this.preLoaderService.setShowPreloader(true);////
    await this.masProdService.DutyGroupgetAll().subscribe(list => {
      this.DutyGroup = list;
      console.log('DutyGroup C : ', this.DutyGroup)
    });

    await this.masProdService.DutyUnitgetAll().subscribe(list => {
      this.DutyUnit = list, console.log('DutyUnitgetAll C : ', list)
    });

    await this.masProdService.BrandMaingetAll().subscribe(list => {
      this.BrandMain = list, console.log('BrandMaingetAll C : ', list)
    });

    await this.masProdService.BrandSecondgetAll().subscribe(list => {
      this.BrandSecond = list, console.log('BrandSecondgetAll C : ', list)
      this.preLoaderService.setShowPreloader(false);////
    });
  }

  //*********************************DutyGroup******************************** */
  searchDutyGroup = (text$) =>
    text$.map(term => term === '' ? []
      : this.options = this.DutyGroup.filter(v => (`${v.GroupName}`)
        .toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));
  selectItemDutyGroup(ele: any) {
    console.log('selectItemRegion ele.item : ', ele.item);
  }
  formatterDutyGroup = (x: { GroupName: string }) =>
    `${x.GroupName}`;
  // onAutoChange(value: string) { //พิม
  //   console.log('onAutoChange : ', value)
  //   if (value == '') {
  //     this.options = [];
  //   } else {
  //     this.options = this.DutyGroup.filter(f => f.GroupName.toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10);
  //   }
  // }
  // onAutoSelecteWord(event: string) { //value all select
  //   this.GroupCode = event
  // }
  // onAutoFocus(value: string) { //value in box
  //   if (value == '') {
  //     this.options = [];
  //   }
  // }
  //*********************************BrandMain******************************** */
  searchBrandMain = (text1$) =>
    text1$.map(term => term === '' ? []
      : this.BrandMainoptions = this.BrandMain.filter(v => (`${v.BrandMainENG} ${v.BrandMainThai}`).toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));
  selectItemBrandMain(ele: any) {
    console.log('selectItemBrandMain ele.item : ', ele.item);
  }
  formatterBrandMain = (x: { BrandMainENG: string, BrandMainThai: string }) =>
    `${x.BrandMainENG} ${x.BrandMainThai}`;
  // BrandMainonAutoChange(value: string) { //พิม
  //   if (value == '') {
  //     this.BrandMainoptions = [];
  //   } else {
  //     this.BrandMainoptions = this.BrandMain.filter(fil => fil.BrandMainENG == null || fil.BrandMainENG == undefined ? fil.BrandMainENG == 'null' : fil.BrandMainENG.toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10);
  //   }
  // }
  // BrandMainonAutoSelecteWord(BrandCode: string, BrandMainENG: string, BrandMainThai: string) { //value all select
  //   this.BrandCode = BrandCode;
  //   this.BrandMainENG = BrandMainENG;
  //   this.BrandMainThai = BrandMainThai;
  // }
  // BrandMainonAutoFocus(value: string) { //value in box
  //   if (value == '') {
  //     this.BrandMainoptions = [];
  //   }
  // }
  //********************************BrandSecond********************************* */
  searchBrandSecond = (text2$) =>
    text2$.map(term => term === '' ? []
      : this.BrandSecondoptions = this.BrandSecond.filter(v => (`${v.BrandSecondNameENG} ${v.BrandSecondNameThai}`).toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));
  selectItemBrandSecond(ele: any) {
    console.log('selectItemBrandSecond ele.item : ', ele.item);
  }
  formatterBrandSecond = (x: { BrandSecondNameENG: string, BrandSecondNameThai: string }) =>
    `${x.BrandSecondNameENG} ${x.BrandSecondNameThai}`;
  // BrandSecondonAutoChange(value: string) { //พิม
  //   if (value == '') {
  //     this.BrandSecondoptions = [];
  //   } else {
  //     this.BrandSecondoptions = this.BrandSecond.filter(fil => fil.GroupName == null ? fil.GroupName == 'null' : fil.GroupName.toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10);
  //   }
  // }
  // BrandSecondonAutoSelecteWord(BrandSecondCode: string, BrandSecondENG: string, BrandSecondThai: string) { //value all select
  //   this.BrandSecondCode = BrandSecondCode;
  //   this.BrandSecondENG = BrandSecondENG;
  //   this.BrandSecondThai = BrandSecondThai;
  // }
  // BrandSecondonAutoFocus(value: string) { //value in box
  //   if (value == '') {
  //     this.BrandSecondoptions = [];
  //   }
  // }
  //********************************DutyUnit********************************* */
  searchDutyUnit = (text3$) =>
    text3$.map(term => term === '' ? []
      : this.DutyUnitoptions = this.DutyUnit.filter(v => (`${v.DutyCode}`).toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));
  selectItemDutyUnit(ele: any) {
    console.log('selectItemDutyUnit ele.item : ', ele.item);
  }
  formatterDutyUnit = (x: { DutyCode: string }) =>
    `${x.DutyCode}`;
  // DutyUnitonAutoChange(value: string) { //พิม
  //   if (value == '') {
  //     this.DutyUnitoptions = [];
  //   } else {
  //     this.DutyUnitoptions = this.DutyUnit.filter(fil => fil.DutyCode == null ? fil.DutyCode == 'null' : fil.DutyCode.toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10);
  //   }
  // }
  // DutyUnitonAutoSelecteWord(DutyUnitCode: string, DutyCode: string) { //value all select
  //   this.DutyUnitCode = DutyUnitCode;
  //   this.DutyCode = DutyCode;
  // }
  // DutyUnitonAutoFocus(value: string) { //value in box
  //   if (value == '') {
  //     this.DutyUnitoptions = [];
  //   }
  // }
  //********************************End********************************* */
  onChecked(obj: any, isChecked: boolean) {
    isChecked == true ? this.IsActive = 1 : this.IsActive = 0;
  }

  SetDataUpdMasPro() {
    this.ParamsUpd = {
      "IsActive": this.IsActive,
      "ProductID": this.ProductID,
      "GroupCode": this.GroupCode,
      "IsDomestic": this.IsDomestic,
      "ProductCode": this.ProductCode,
      "BrandCode": this.BrandCode,
      "BrandNameTH": this.BrandMainThai,
      "BrandNameEN": this.BrandMainENG,
      "SubBrandCode": this.BrandSecondCode,
      "SubBrandNameTH": this.BrandSecondThai,
      "SubBrandNameEN": this.BrandSecondENG,
      "ModelCode": '',
      "ModelName": this.ModelName,
      "FixNo1": 0,
      "DegreeCode": '',
      "Degree": this.Degree,
      "SizeCode": '',
      "Size": this.Size,
      "SizeUnitCode": this.DutyUnitCode,
      "SizeUnitName": this.DutyCode,
      "FixNo2": 0,
      "SequenceNo": '',
      "ProductDesc": this.ProductDesc,
      "EffectiveDate": '',
      "ExpirationDate": '',
      "EventDatetime": ''
    }
  }
  SetDataInsMasProd() {
    this.ParamsIns = {
      "IsActive": this.IsActive,
      "ProductID": null,
      "GroupCode": this.GroupCode,
      "IsDomestic": this.IsDomestic,
      "ProductCode": this.ProductCode,
      "BrandCode": this.BrandCode,
      "BrandNameTH": this.BrandMainThai,
      "BrandNameEN": this.BrandMainENG,
      "SubBrandCode": this.BrandSecondCode,
      "SubBrandNameTH": this.BrandSecondThai,
      "SubBrandNameEN": this.BrandSecondENG,
      "ModelCode": null,
      "ModelName": this.ModelName,
      "FixNo1": 0,
      "DegreeCode": null,
      "Degree": this.Degree,
      "SizeCode": null,
      "Size": this.Size,
      "SizeUnitCode": this.DutyUnitCode,
      "SizeUnitName": this.DutyCode,
      "FixNo2": 0,
      "SequenceNo": 0,
      "ProductDesc": this.ProductDesc,
      "EffectiveDate": '',
      "ExpirationDate": '',
      "EventDatetime": ''
    }

  }

  async onInsMasProd(params) {
    await this.masProdService.MasProductinsAll(params).subscribe(list => {
      console.log('MasProductinsAll: ', list)
      if (list.IsSuccess == "True") {
        this.ProductID = list.ProductID
        swal('', Message.saveComplete, 'success')
        this.router.navigate([`/masProducts/manage/R/${this.ProductID}`]);

      } else {
        swal('', Message.saveFail, 'error')
      }
    });
  }

  async onUpdMasProd(params) {
    await this.masProdService.MasProductupdByCon(params).subscribe(list => {
      console.log(' MasProductupdByCon : ', list)
      if (list.IsSuccess == "True") {
        swal('', Message.saveComplete, 'success')
        this.ClearData();
        this.setButton();
        this.OnpageloadModeR(this.ProductID);
      } else {
        swal('', Message.saveFail, 'error')
      }
    });
  }

  async onDeleteMasProd() {
    console.log('onDel this.ProductID ', this.ProductID)
    await this.masProdService.MasProductupdDelete(this.ProductID).subscribe(list => {
      console.log('del res : ', list)
      if (list.IsSuccess == "True") {
        swal('', Message.delComplete, 'success')
        this.router.navigate([`/masProducts/list`]);
      } else {
        swal('', Message.delFail, 'error')
      }
    });
  }

  onCancel() {
    this.ParamsIns = '';
    this.IsActive = '';
    this.ProductCode = '';
    this.GroupCode = '';
    this.BrandCode = '';
    this.BrandMainENG = '';
    this.BrandMainThai = '';
    this.BrandSecondCode = '';
    this.BrandSecondENG = '';
    this.BrandSecondThai = '';
    this.ModelName = '';
    this.Degree = '';
    this.Size = '';
    this.DutyUnitCode = '';
    this.DutyCode = '';
    this.ProductDesc = '';
    this.IsDomestic = '';
    this.router.navigate(['/masProducts/list']);
  }

  ClearData() {
    this.IsActive = '';
    this.ProductCode = '';
    this.GroupCode = '';
    this.BrandCode = '';
    this.BrandMainENG = '';
    this.BrandMainThai = '';
    this.BrandSecondCode = '';
    this.BrandSecondENG = '';
    this.BrandSecondThai = '';
    this.ModelName = '';
    this.Degree = '';
    this.Size = '';
    this.DutyUnitCode = '';
    this.DutyCode = '';
    this.ProductDesc = '';
    this.IsDomestic = '';
  }

  ngOnDestroy(): void {
    if (this.onPrintSubscribe) { this.onPrintSubscribe.unsubscribe(); }
    if (this.onSaveSubscribe) { this.onSaveSubscribe.unsubscribe(); }
    if (this.onCancelSubscribe) { this.onCancelSubscribe.unsubscribe(); }
    if (this.onDeleSubscribe) { this.onDeleSubscribe.unsubscribe(); }
  }
}
