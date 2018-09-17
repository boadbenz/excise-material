import { pagination } from "../../../config/pagination";
import { NgForm } from "@angular/forms";
import { Message } from "../../../config/message";
import { LawsuitService } from "../lawsuit.service";
import { NavigationService } from "../../../shared/header-navigation/navigation.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Lawsuit } from "../models/lawsuit";
import { compareDate, getDateMyDatepicker, setZeroHours, toLocalShort } from "../../../config/dateFormat";
import { Notice } from "../../notices/notice";
import { PreloaderService } from "../../../shared/preloader/preloader.component";
import { SidebarService } from "../../../shared/sidebar/sidebar.component";
import { IMyDateModel, IMyOptions } from 'mydatepicker-th';
import { PaginationTableComponent } from "../../component/pagination-table/pagination-table.component";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit, OnDestroy {

  @ViewChild(PaginationTableComponent) paginator: PaginationTableComponent;

  results: Lawsuit[] = [];
  resultsPerPage: Lawsuit[] = [];

  subOnSearchByKeyword: any;
  subSetNextPage: any;

  advSearch: any;
  paginage = pagination;

  lawsuitDateFrom: any;
  lawsuitDateTo: any;

  datePickerOptions: IMyOptions = {
    dateFormat: 'dd mmm yyyy',
    showClearDateBtn: false,
    height: '30px'
  };

  constructor(private router: Router, private navService: NavigationService, private preLoaderService: PreloaderService
              , private lawsuitService: LawsuitService, private sidebarService: SidebarService
  ) {
    this.setShowButton();
    this.advSearch = this.navService.showAdvSearch;
  }

  async ngOnInit() {
    this.sidebarService.setVersion('0.0.0.4');
    this.paginage.TotalItems = 0;

    this.preLoaderService.setShowPreloader(true);
    await this.lawsuitService.getByKeywordOnInt().then(list => this.onSearchComplete(list));

    this.subOnSearchByKeyword = this.navService.searchByKeyword.subscribe(async Textsearch => {
      if (Textsearch) {
        await this.navService.setOnSearch('');
        this.onSearch(Textsearch);
      }
    });

    this.subSetNextPage = this.navService.onNextPage.subscribe(async status => {
      if (status) {
        await this.navService.setOnNextPage(false);
        this.router.navigate(['/notice/manage', 'C', 'NEW']);
      }
    });

    this.preLoaderService.setShowPreloader(false);
  }

  ngOnDestroy() {
    this.subOnSearchByKeyword.unsubscribe();
    this.subSetNextPage.unsubscribe();
  }

  async onSearch(Textsearch: any) {
    this.preLoaderService.setShowPreloader(true);
    await this.lawsuitService.getByKeyword(Textsearch).then(list => this.onSearchComplete(list));
    this.preLoaderService.setShowPreloader(false);
  }

  async onAdvSearch(form: any) {
    console.log();
    console.log();
    /* Clear Time */
    form.value.LawsuitDateFrom = form.value.LawsuitDateFrom? new Date(getDateMyDatepicker(form.value.LawsuitDateFrom)): "";
    form.value.LawsuitDateTo = form.value.LawsuitDateTo? new Date(getDateMyDatepicker(form.value.LawsuitDateTo)): "";
    /* Query (Advance Search) */
    this.preLoaderService.setShowPreloader(true);
    await this.lawsuitService.LawsuitgetByConAdv(form.value).then(list => this.onSearchComplete(list));
    this.preLoaderService.setShowPreloader(false);
  }

  private setShowButton(): void {
    this.navService.setSearchBar(true);
    this.navService.setPrintButton(false);
    this.navService.setDeleteButton(false);
    this.navService.setCancelButton(false);
    this.navService.setEditButton(false);
    this.navService.setSaveButton(false);
  }

  private onSearchComplete(list: Lawsuit[]) {
    /* Adjust Another Column */
    this.results = list.map((item, i) => {
      item.RowsId = i + 1;
      item.LawsuitDate = toLocalShort(item.LawsuitDate);
      return item;
    });
    /* Reload Data & Set Total Record */
    this.paginator.changePage();
    this.paginage.TotalItems = this.results.length;
    /* Alert When No Data To Show */
    if (!list.length) {
      alert(Message.noRecord);
      return false;
    }
  }

  private viewData(item) {
    this.router.navigate(['/lawsuit/manage', 'R'], {
      queryParams: { id: item.LawsuitID, code: item.ArrestCode }
    });
  }

  private closeAdvSearch() {
    this.navService.showAdvSearch.next(false);
  }

  async pageChanges(event) {
    this.resultsPerPage = await this.results.slice(event.startIndex - 1, event.endIndex);
  }

  onLawsuitDateFromChange(form: any, event: IMyDateModel) {
    if ((event && form.value.LawsuitDateTo)
        && !compareDate(getDateMyDatepicker(event), getDateMyDatepicker(form.value.LawsuitDateTo))) {
      alert(Message.checkDate);
      setTimeout(() => {
        this.lawsuitDateTo = { date: event.date };
      }, 0);
      return false;
    }
  }

  onLawsuitDateToChange(form: any, event: IMyDateModel) {
    if ((form.value.LawsuitDateFrom && event)
        && !compareDate(getDateMyDatepicker(form.value.LawsuitDateFrom), getDateMyDatepicker(event))) {
      alert(Message.checkDate);
      setTimeout(() => {
        this.lawsuitDateTo = { date: form.value.LawsuitDateFrom.date };
      }, 0);
      return false;
    }
  }

}
