import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { pagination } from '../../../config/pagination';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { MasProdService } from '../masProd.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ListComponent implements OnInit {
  @ViewChild('advForm') advForm: NgForm;
  private onNextPageSubscribe: any;
  private subOnSearch: any;
  advSearch: any;
  paginage = pagination;
  ListMasProd: any;
  DutyGroup: any;
  BrandMain: any;
  afBrandMain: any;
  BrandSecond: any;
  afBrandSecond: any;

  options = [];
  constructor(private navService: NavigationService,
    private preLoaderService: PreloaderService,
    private masProdService: MasProdService,
    private router: Router, ) {
    this.advSearch = this.navService.showAdvSearch;
  }

  async ngOnInit() {

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

    this.preLoaderService.setShowPreloader(true);
    await this.OnPageload();
    await this.navigate_service();
    this.preLoaderService.setShowPreloader(false);
  }

  async OnPageload() {
    this.preLoaderService.setShowPreloader(true);
    await this.masProdService.DutyGroupgetAll().subscribe(list => {
      this.DutyGroup = list
      this.preLoaderService.setShowPreloader(false);
    });

    // console.log('DutyGroup : ',this.DutyGroup)
    // await this.masProdService.MasProductgetByCon(Textsearch).subscribe(list => {});
    await this.masProdService.BrandMaingetAll().subscribe(list => {
      this.BrandMain = list, console.log('BrandMaingetAll : ', list)
      this.preLoaderService.setShowPreloader(false);
    });
    await this.masProdService.BrandSecondgetAll().subscribe(list => {
      console.log('BrandSecondgetAll : ', list)
      this.preLoaderService.setShowPreloader(false);
    });

    // await this.masProdService.DutyUnitgetAll().subscribe(list => {});
    // await this.masProdService.SizePackagegetAll().subscribe(list => {});
  }

  getValueByIndex($event) {
    console.log('$event : ', $event.GroupCode)
    this.setGroup('0501');
  }

  setGroup(GroupCode: string) {
    this.afBrandMain = this.BrandMain.filter(f => f.GroupID == GroupCode);
    // this.afBrandSecond = this.BrandSecond.filter(f => f.GroupID == GroupCode);
    console.log('afBrandMain : ', this.afBrandMain)
    console.log('afBrandSecond : ', this.afBrandSecond)
  }
  onAutoChange(value: string) {
    console.log('onAutoChange : ', value)
    if (value == '') {
      this.options = [];
    } else {
      this.options = this.afBrandMain;
    }
  }
  onAutoSelecteWord(event) {
    console.log('onAutoSelecteWord : ', event)
  }
  onAutoFocus(value: string) {
    console.log('onAutoFocus : ', value)
    if (value == '') {
        this.options = [];
    }
  }

  private navigate_service() {
    this.subOnSearch = this.navService.searchByKeyword.subscribe(async Textsearch => {
      if (Textsearch) {
        await this.navService.setOnSearch('');

        let ts;
        ts = { Textsearch: "" }
        ts = Textsearch;

        if (ts.Textsearch == null) { this.onSearch({ Textsearch: "" }); }
        else { } // this.onSearch(Textsearch);
      }
    })

    this.onNextPageSubscribe = this.navService.onNextPage.subscribe(async status => {
      if (status) {
        await this.navService.setOnNextPage(false);
        this.router.navigate(['/masProducts/manage', 'C', 'NEW']);
      }
    })
  }

  clickView(code: string) {
    this.router.navigate([`/masProducts/manage/R/${code}`]);
  }

  async onSearch(Textsearch) {
    this.preLoaderService.setShowPreloader(true);

    // await this.masProdService.DutyGroupgetAll().subscribe(list => {
    //   this.onSearchComplete(list)

    //   this.preLoaderService.setShowPreloader(false);
    // }, (err: HttpErrorResponse) => {
    //   // this.ShowAlertNoRecord();
    //   //alert(Message.noRecord);
    //   this.ListMasProd = [];
    //   this.preLoaderService.setShowPreloader(false);
    // });

  }

  async onSearchComplete(list: any) {
    this.paginage.TotalItems = 10; // this.Prove.length;
    // this.ListProve = this.Prove.slice(0, this.paginage.RowsPerPageOptions[0]);
  }
  async pageChanges(event) {
    // this.ListProve = await this.Prove.slice(event.startIndex - 1, event.endIndex);
  }

  ngOnDestroy(): void {
    //this.subOnSearch.next(true);
    this.subOnSearch.unsubscribe();
    this.onNextPageSubscribe.unsubscribe();
  }

}
