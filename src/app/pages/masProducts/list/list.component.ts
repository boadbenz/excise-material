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
  constructor(private navService: NavigationService,
    private preLoaderService: PreloaderService,
    private masProdService: MasProdService,
    private router: Router, ) {
    this.advSearch = this.navService.showAdvSearch;
  }

  ngOnInit() {
    localStorage.setItem('programcode', 'ILG60-99-01');
    this.OnPageload();
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


  }

  async OnPageload() {
     this.preLoaderService.setShowPreloader(true);
    await this.masProdService.DutyGroupgetAll().subscribe(list => { this.DutyGroup = list });

    // console.log('DutyGroup : ',this.DutyGroup)
    // await this.masProdService.MasProductgetByCon(Textsearch).subscribe(list => {});
    await this.masProdService.BrandSecondgetAll().subscribe(list => {console.log('BrandSecondgetAll : ',list)});
    await this.masProdService.BrandMaingetAll().subscribe(list => {
      this.BrandMain = list,console.log('BrandMaingetAll : ',list)
    });
    // await this.masProdService.DutyUnitgetAll().subscribe(list => {});
    // await this.masProdService.SizePackagegetAll().subscribe(list => {});
     this.preLoaderService.setShowPreloader(false);
  }

  getValueByIndex($event) {
    console.log('$event : ', $event)

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
