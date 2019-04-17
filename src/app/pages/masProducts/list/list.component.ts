import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { pagination } from '../../../config/pagination';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { MasProdService } from '../masProd.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import swal from 'sweetalert2'
import { Message } from 'app/config/message';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ListComponent implements OnInit {
  @ViewChild('advForm') advForm: NgForm;
  // BrandAllFG: FormGroup;

  private onNextPageSubscribe: any;
  private subOnSearch: any;
  advSearch: any;
  paginage = pagination;

  //var of api
  ListMasProd: any;
  DutyGroup: any;
  BrandMain: any;
  afBrandMain: any;
  BrandSecond: any;
  afBrandSecond: any;

  //option keypress
  options = [];
  BrandMainoptions = [];
  BrandSecondoptions = [];

  //after sreach
  listOfsreach = [];
  masProductList: any = [];

  constructor(private navService: NavigationService,
    private preLoaderService: PreloaderService,
    private masProdService: MasProdService,
    private router: Router,
    private fb: FormBuilder, ) {
    this.advSearch = this.navService.showAdvSearch;
    // if (this.advSearch != undefined) {
    //     console.log('onAdv')
    //   this.Pageload();
    // }
  }

  ngOnInit() {
    // await this.navService.showAdvSearch.next(false); ?????????
    localStorage.setItem('programcode', 'ILG60-99-01');

    // set false
    this.navService.setEditButton(false);
    this.navService.setDeleteButton(false);
    this.navService.setPrintButton(false);
    this.navService.setSaveButton(false);
    this.navService.setCancelButton(false);
    this.navService.setNextPageButton(false);
    // set true
    this.navService.setSearchBar(true);
    this.navService.setNewButton(true);

    this.navigate_service();
    // this.Pageload();

    // const control = new FormControl(this.listOfsreach);
    // console.log('control.value : ',control.value);
  }

  private navigate_service() {
    this.subOnSearch = this.navService.searchByKeyword.subscribe(Textsearch => {
      if (Textsearch) {
        this.navService.setOnSearch('');

        let ts;
        ts = { Textsearch: "" }
        ts = Textsearch;

        if (ts.Textsearch == null) { this.onSearch({ Textsearch: "" }); }
        else { this.onSearch(Textsearch); }
      }
    })

    this.onNextPageSubscribe = this.navService.onNextPage.subscribe(status => {
      if (status && localStorage.programcode == 'ILG60-99-01') {
        this.navService.setOnNextPage(false);
        this.router.navigate(['/masProducts/manage', 'C', 'NEW']);
      }
    })
  }

  // async Pageload() {
  //   this.preLoaderService.setShowPreloader(true); ////
  //   await this.masProdService.DutyGroupgetAll().subscribe(list => {
  //     this.DutyGroup = list
  //     // console.log('DutyGroup list : ', this.DutyGroup)
  //   });

  //   await this.masProdService.BrandMaingetAll().subscribe(list => {
  //     this.BrandMain = list
  //     // console.log('BrandMaingetAll list: ', list)
  //   });

  //   await this.masProdService.BrandSecondgetAll().subscribe(list => {
  //     this.BrandSecond = list
  //     // console.log('BrandSecondgetAll list : ', list)
  //     this.preLoaderService.setShowPreloader(false); ////
  //   });

  // }

  // //*********************************DutyGroup******************************** */
  // onAutoChange(value: string) { //พิม
  //   console.log('onAutoChange : ', value)
  //   // console.log('onAutoChange this.DutyGroup.GroupName : ', this.DutyGroup)
  //   if (value == '') {
  //     this.options = [];
  //   } else {
  //     this.options = this.DutyGroup.filter(f => f.GroupName.toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10);
  //     console.log('onAutoChange options: ', this.options)
  //   }
  // }
  // onAutoSelecteWord(event: string) { //value all select
  //   console.log('onAutoSelecteWord : ', event)
  // }
  // onAutoFocus(value: string) { //value in box
  //   console.log('onAutoFocus : ', value)
  //   if (value == '') {
  //     this.options = [];
  //   }
  // }
  // //*********************************BrandMain******************************** */

  // BrandMainonAutoChange(value: string) { //พิม
  //   console.log('BrandMainonAutoChange : ', value);
  //   console.log('BrandMainonAutoChange this.BrandMain : ', this.BrandMain)
  //   if (value == '') {
  //     this.BrandMainoptions = [];
  //   } else {
  //     this.BrandMainoptions = this.BrandMain.filter(fil => fil.BrandMainENG == null || fil.BrandMainENG == undefined ? fil.BrandMainENG == 'null' : fil.BrandMainENG.toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10);
  //     console.log('BrandMainonAutoChange options: ', this.BrandMainoptions)
  //   }
  // }
  // BrandMainonAutoSelecteWord(event: string) { //value all select
  //   console.log('onAutoSelecteWord : ', event)
  // }
  // BrandMainonAutoFocus(value: string) { //value in box
  //   console.log('BrandMainonAutoFocus : ', value)
  //   if (value == '') {
  //     this.BrandMainoptions = [];
  //   }
  // }
  // //********************************BrandSecond********************************* */
  // BrandSecondonAutoChange(value: string) { //พิม
  //   console.log('BrandSecondonAutoChange : ', value);
  //   console.log('BrandSecondonAutoChange this.BrandSecond : ', this.BrandSecond)
  //   if (value == '') {
  //     this.BrandSecondoptions = [];
  //   } else {
  //     this.BrandSecondoptions = this.BrandSecond.filter(fil => fil.GroupName == null ? fil.GroupName == 'null' : fil.GroupName.toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10);
  //     console.log('BrandSecondonAutoChange options: ', this.BrandSecondoptions)
  //   }
  // }
  // BrandSecondonAutoSelecteWord(event: string) { //value all select
  //   console.log('BrandSecondonAutoSelecteWord : ', event)
  // }
  // BrandSecondonAutoFocus(value: string) { //value in box
  //   console.log('BrandSecondonAutoFocus : ', value)
  //   if (value == '') {
  //     this.BrandSecondoptions = [];
  //   }
  // }

  clickView(code: string) {
    this.router.navigate([`/masProducts/manage/R/${code}`]);
  }

  async onSearch(Textsearch) {

    this.listOfsreach = [
      { prodCode: '070101000000T007MG00002228',ProductID:'75', GroupName: 'รถจักรยานยนต์', BrandMain: 'VESPA', BrandSecond: '', model: 'PX 125 WHITE', size: '125 ซีซี', Alcohol: '' },
      { prodCode: '070104000001P007f800023428',ProductID:'76', GroupName: 'รถจักรยานยนต์', BrandMain: 'Harley-Davidson', BrandSecond: '', model: 'FLHXS ANX/2018', size: '1745 ซีซี', Alcohol: '' }  
    ]
    if (!this.listOfsreach.length) {
      swal('', Message.noRecord, 'warning');
      return false;
    } else { this.onSearchComplete(this.listOfsreach) }

    // await this.masProdService.DutyGroupgetAll().subscribe(list => {
    // }, (err: HttpErrorResponse) => {
    //   // this.ShowAlertNoRecord();
    //   //alert(Message.noRecord);
    //   this.ListMasProd = [];
    // });
  }
  onAdvSearch(f: any) {
    console.log('advForm : ', f)
  }

  async onSearchComplete(list: any[]) {

    this.paginage.TotalItems = list.length;
    this.masProductList = list.slice(0, this.paginage.RowsPerPageOptions[0]);
  }
  async pageChanges(event) {
    this.masProductList = await this.listOfsreach.slice(event.startIndex - 1, event.endIndex);
  }

  ngOnDestroy(): void {
    //this.subOnSearch.next(true);
    this.subOnSearch.unsubscribe();
    this.onNextPageSubscribe.unsubscribe();
  }

}

// export interface BrandMainset {
//   ID: string;
//   DutyCode: string;
//   BrandMainCode: string;
//   BrandMainThai: string;
//   BrandMainENG: string;
//   GroupID: string;
//   IsActive: string;
// }
