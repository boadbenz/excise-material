import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { MasProdService } from '../masProd.service';
import { LoaderService } from 'app/core/loader/loader.service';
import swal from 'sweetalert2'
import { Message } from 'app/config/message';
import { FormGroup, FormBuilder, FormArray, FormControl, ValidatorFn } from '@angular/forms';

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
  ProductType: any = '';
  // ProductType= [
  //   {Selected: false,IsDomestic: 1,TypeName: 'ภายในประเทศ'},
  //   {Selected: true,IsDomestic: 2,TypeName: 'ต่างประเทศ'},
  //   {Selected: false,IsDomestic: 3,TypeName: 'ไม่ระบุ'}
  // ];

  //Ins complete
  ProductID: any;

  //dataSet for Upd
  ParamsUpd: any;


  private sub: any;
  mode: string;
  showEditField: any;

  couForm: FormGroup;

  constructor(private activeRoute: ActivatedRoute,
    private navService: NavigationService,
    private preLoaderService: PreloaderService,
    private masProdService: MasProdService,
    private loaderService: LoaderService,
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit() {
    // this.couForm = this.fb.group({
    //   couControl: [this.ProductType]
    // });

    this.active_route();
    this.navigate_service();
  }
  private navigate_service() {

    this.navService.showFieldEdit.subscribe(p => {
      this.showEditField = p;
      this.OnPageloadModeC();
    });

    this.onPrintSubscribe = this.navService.onPrint.subscribe(async status => {
      if (status) {
        await this.navService.setOnPrint(false);
        // this.modal = this.ngbModel.open(this.printDocModel, { size: 'lg', centered: true });
      }
    });
    this.onSaveSubscribe = this.navService.onSave.subscribe(async status => {
      if (status) {
        await this.navService.setOnSave(false);
        if (this.mode === 'C') {
          await this.SetDataInsMasProd();
          await this.onInsMasProd(this.ParamsIns);
        } else if (this.mode === 'R') {
          this.activeRoute.params.subscribe(p => { this.ProductID = p['code'] });

          await this.SetDataUpdMasPro();
          await this.onUpdMasProd(this.ParamsUpd);
        }
      }
    });
    this.onCancelSubscribe = this.navService.onCancel.subscribe(async status => {
      if (status) {
        this.navService.setOnCancel(false);
        await this.onCancel();
      }
    });
    this.onDeleSubscribe = this.navService.onDelete.subscribe(async status => {
      if (status) {
        await this.navService.setOnDelete(false);
      }
    });
  }
  private active_route() {
    this.sub = this.activeRoute.params.subscribe(p => {
      this.mode = p['mode'];
      console.log('active route mode ; ', this.mode)
      //alert(this.mode);
      if (p['mode'] === 'C') {
        console.log('in mode C')
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
        this.OnPageloadModeC();
      } else if (p['mode'] === 'R') {
        console.log('in mode R')
        // set false
        this.navService.setSaveButton(false);
        this.navService.setCancelButton(false);
        this.navService.setNewButton(false);
        // set true
        this.navService.setPrintButton(true);
        this.navService.setEditButton(true);
        this.navService.setDeleteButton(true);
        this.navService.setEditField(true);
        console.log(' p:[code] : ', p['code'])
        this.OnpageloadModeR(p['code'])
      }
    })
  }
  async OnpageloadModeR(ProductID) {

    await this.masProdService.MasProductgetByCon(ProductID).subscribe(list => {
      // this.DutyGroup = list
      this.ProductCode = list.ProductCode;
      this.BrandMainENG = list.BrandNameEN;
      this.BrandMainThai = list.BrandNameTH;
      this.BrandSecondThai = list.SubBrandNameEN;
      this.BrandSecondENG = list.SubBrandNameTH;
      this.ModelName = list.ModelName;
      this.Size = list.Size;
      this.DutyCode = list.SizeUnitName
      this.Degree = list.Degree
      console.log('MasProductgetByCon : ', list)
    });
  }
  async OnPageloadModeC() {
    this.loaderService.show();
    this.preLoaderService.setShowPreloader(true);
    await this.masProdService.DutyGroupgetAll().subscribe(list => {
      this.DutyGroup = list
      console.log('DutyGroup : ', this.DutyGroup)
    });

    // console.log('DutyGroup : ',this.DutyGroup)
    // await this.masProdService.MasProductgetByCon(Textsearch).subscribe(list => {});
    await this.masProdService.BrandMaingetAll().subscribe(list => {
      this.BrandMain = list, console.log('BrandMaingetAll : ', list)
    });

    await this.masProdService.BrandSecondgetAll().subscribe(list => {
      this.BrandSecond = list, console.log('BrandSecondgetAll : ', list)
    });

    await this.masProdService.DutyUnitgetAll().subscribe(list => {
      this.DutyUnit = list, console.log('DutyUnitgetAll : ', list)
    });
    // await this.masProdService.SizePackagegetAll().subscribe(list => {});

    this.preLoaderService.setShowPreloader(false);
    this.loaderService.hide();
  }



  //*********************************DutyGroup******************************** */
  onAutoChange(value: string) { //พิม
    console.log('onAutoChange : ', value)
    // console.log('onAutoChange this.DutyGroup.GroupName : ', this.DutyGroup)
    if (value == '') {
      this.options = [];
    } else {
      this.options = this.DutyGroup.filter(f => f.GroupName.toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10);
      console.log('onAutoChange options: ', this.options)
    }
  }
  onAutoSelecteWord(event: string) { //value all select
    console.log('onAutoSelecteWord : ', event)
    this.GroupCode = event
  }
  onAutoFocus(value: string) { //value in box
    console.log('onAutoFocus : ', value)
    if (value == '') {
      this.options = [];
    }
  }
  //*********************************BrandMain******************************** */

  BrandMainonAutoChange(value: string) { //พิม
    console.log('BrandMainonAutoChange : ', value);
    console.log('BrandMainonAutoChange this.BrandMain : ', this.BrandMain)
    if (value == '') {
      this.BrandMainoptions = [];
    } else {
      this.BrandMainoptions = this.BrandMain.filter(fil => fil.BrandMainENG == null || fil.BrandMainENG == undefined ? fil.BrandMainENG == 'null' : fil.BrandMainENG.toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10);
      console.log('BrandMainonAutoChange options: ', this.BrandMainoptions)
    }
  }
  BrandMainonAutoSelecteWord(BrandCode: string, BrandMainENG: string, BrandMainThai: string) { //value all select
    console.log('BrandMainonAutoSelecteWord : ', BrandCode)
    this.BrandCode = BrandCode;
    this.BrandMainENG = BrandMainENG;
    this.BrandMainThai = BrandMainThai;
  }
  BrandMainonAutoFocus(value: string) { //value in box
    console.log('BrandMainonAutoFocus : ', value)
    if (value == '') {
      this.BrandMainoptions = [];
    }
  }
  //********************************BrandSecond********************************* */
  BrandSecondonAutoChange(value: string) { //พิม
    console.log('BrandSecondonAutoChange : ', value);
    console.log('BrandSecondonAutoChange this.BrandSecond : ', this.BrandSecond)
    if (value == '') {
      this.BrandSecondoptions = [];
    } else {
      this.BrandSecondoptions = this.BrandSecond.filter(fil => fil.GroupName == null ? fil.GroupName == 'null' : fil.GroupName.toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10);
      console.log('BrandSecondonAutoChange options: ', this.BrandSecondoptions)
    }
  }
  BrandSecondonAutoSelecteWord(BrandSecondCode: string, BrandSecondENG: string, BrandSecondThai: string) { //value all select
    console.log('BrandSecondonAutoSelecteWord : ', event)
    this.BrandSecondCode = BrandSecondCode;
    this.BrandSecondENG = BrandSecondENG;
    this.BrandSecondThai = BrandSecondThai;
  }
  BrandSecondonAutoFocus(value: string) { //value in box
    console.log('BrandSecondonAutoFocus : ', value)
    if (value == '') {
      this.BrandSecondoptions = [];
    }
  }
  //********************************DutyUnit********************************* */
  DutyUnitonAutoChange(value: string) { //พิม
    console.log('DutyUnitonAutoChange : ', value);
    console.log('DutyUnitonAutoChange this.DutyUnit : ', this.DutyUnit)
    if (value == '') {
      this.DutyUnitoptions = [];
    } else {
      this.DutyUnitoptions = this.DutyUnit.filter(fil => fil.DutyCode == null ? fil.DutyCode == 'null' : fil.DutyCode.toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10);
      console.log('DutyUnitonAutoChange options: ', this.DutyUnitoptions)
    }
  }
  DutyUnitonAutoSelecteWord(DutyUnitCode: string, DutyCode: string) { //value all select
    console.log('DutyUnitonAutoSelecteWord : ', event)
    this.DutyUnitCode = DutyUnitCode;
    this.DutyCode = DutyCode;
  }
  DutyUnitonAutoFocus(value: string) { //value in box
    console.log('DutyUnitonAutoFocus : ', value)
    if (value == '') {
      this.DutyUnitoptions = [];
    }
  }
  onChecked(obj: any, isChecked: boolean) {
    isChecked == true ? this.IsActive = 1 : this.IsActive = 0;
  }

  async SetDataUpdMasPro() {
    this.ParamsUpd = {
      "IsActive": this.IsActive,
      "ProductID": '',
      "GroupCode": this.GroupCode,
      "IsDomestic": this.ProductType,
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
  async SetDataInsMasProd() {
    this.ParamsIns = {
      "IsActive": this.IsActive,
      "ProductID": null,
      "GroupCode": this.GroupCode,
      "IsDomestic": this.ProductType,
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
    this.preLoaderService.setShowPreloader(true);
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
    this.preLoaderService.setShowPreloader(false);
  }

  async onUpdMasProd(params) {
    await this.masProdService.MasProductupdByCon(params).subscribe(list => {
      console.log(' MasProductupdByCon : ', list)
      if (list.IsSuccess == "True") {
        // this.ProductID = list.ProductID
        swal('', Message.saveComplete, 'success')
        // this.ProductID == undefined ? console.log('undefined.ProductID : ', this.ProductID) :
        this.router.navigate([`/masProducts/manage/R/${this.ProductID}`]);
      } else {
        swal('', Message.saveFail, 'error')
      }
    });
  }

  async onCancel() {
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
    this.ProductType = '';
    this.router.navigate(['/masProducts/list']);
  }


  ngOnDestroy(): void {
    if (this.onPrintSubscribe) { this.onPrintSubscribe.unsubscribe(); }
    if (this.onSaveSubscribe) { this.onSaveSubscribe.unsubscribe(); }
    if (this.onCancelSubscribe) { this.onCancelSubscribe.unsubscribe(); }
    if (this.onDeleSubscribe) { this.onDeleSubscribe.unsubscribe(); }
  }
}
