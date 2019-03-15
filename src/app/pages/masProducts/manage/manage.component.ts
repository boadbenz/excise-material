import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { MasProdService } from '../masProd.service';
import { LoaderService } from 'app/core/loader/loader.service';

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

  private sub: any;
  mode: string;
  showEditField: any;

  constructor(private activeRoute: ActivatedRoute,
    private navService: NavigationService,
    private preLoaderService: PreloaderService,
    private masProdService: MasProdService,
    private loaderService: LoaderService ) { }

  ngOnInit() {
    this.active_route();
    this.navigate_service();
    this.OnPageload();
  }
  private navigate_service() {

    this.navService.showFieldEdit.subscribe(p => {
      this.showEditField = p;
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
      }
    });
    this.onCancelSubscribe = this.navService.onCancel.subscribe(async status => {
      if (status) {
        this.navService.setOnCancel(false);
      }
    });
    this.onDeleSubscribe = this.navService.onDelete.subscribe(async status => {
      if (status) {
        await this.navService.setOnDelete(false);
      }
    });


  }

  async OnPageload() {
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
      }
    })
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
  BrandMainonAutoSelecteWord(event: string) { //value all select
    console.log('onAutoSelecteWord : ', event)
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
  BrandSecondonAutoSelecteWord(event: string) { //value all select
    console.log('BrandSecondonAutoSelecteWord : ', event)
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
  DutyUnitonAutoSelecteWord(event: string) { //value all select
    console.log('DutyUnitonAutoSelecteWord : ', event)
  }
  DutyUnitonAutoFocus(value: string) { //value in box
    console.log('DutyUnitonAutoFocus : ', value)
    if (value == '') {
      this.DutyUnitoptions = [];
    }
  }

  onSave(){
    
  }


  ngOnDestroy(): void {
    if(this.onPrintSubscribe){this.onPrintSubscribe.unsubscribe();}
    if(this.onSaveSubscribe){this.onSaveSubscribe.unsubscribe();}
    if(this.onCancelSubscribe){this.onCancelSubscribe.unsubscribe();}
    if(this.onDeleSubscribe){this.onDeleSubscribe.unsubscribe();}   
  }
}
