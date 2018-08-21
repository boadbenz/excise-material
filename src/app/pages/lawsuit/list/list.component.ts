import { pagination } from "../../../config/pagination";
import { NgForm } from "@angular/forms";
import { Message } from "../../../config/message";
import { LawsuitService } from "../lawsuit.service";
import { NavigationService } from "../../../shared/header-navigation/navigation.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Lawsuit } from "../models/lawsuit";
import { toLocalShort } from "../../../config/dateFormat";
import { Notice } from "../../notices/notice";
import {PreloaderService} from "../../../shared/preloader/preloader.component";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit, OnDestroy {

  results: Lawsuit[] = [];
  resultsPerPage: Lawsuit[] = [];

  advSearch: any;
  advSearchSub: any;

  paginage = pagination;

  private setShowButton() {
    this.navService.setSearchBar(true);
    this.navService.setPrintButton(false);
    this.navService.setDeleteButton(false);
    this.navService.setCancelButton(false);
    this.navService.setEditButton(false);
    this.navService.setSaveButton(false);
  }

  constructor(
    private navService: NavigationService,
    private router: Router,
    private preLoaderService: PreloaderService,
    private lawsuitService: LawsuitService
  ) {
    /* Initial Adv.Search */
    this.advSearch = this.navService.showAdvSearch;
    this.advSearchSub = this.navService.searchByKeyword.subscribe(filterValue => {
      if (filterValue) {
        this.lawsuitService.getByKeyword(filterValue)
          .then(res => this.onSearchComplete(res));
      }
    });
  }

  async ngOnInit() {
    /* Display Button */
    this.setShowButton();
    /* Load Data*/
    this.preLoaderService.setShowPreloader(true);
    await this.lawsuitService.getByKeywordOnInt().then(list => this.onSearchComplete(list));
    this.preLoaderService.setShowPreloader(false);
  }

  async onSearchComplete(list: Lawsuit[]) {
    /* Alert When No Data To Show */
    if (!list.length) {
      alert(Message.noRecord);
      return false;
    }
    /* Adjust Another Column */
    this.results = list.map((item, i) => {
      item.RowsId = i + 1;
      item.LawsuitDate = toLocalShort(item.LawsuitDate);
      return item;
    });
    /* Set Total Record */
    this.paginage.TotalItems = this.results.length;
  }

  async onAdvSearch(form: any) {
    if (form.value.LawsuitDateFrom && form.value.LawsuitDateTo) {
      const sDateCompare = new Date(form.value.LawsuitDateFrom);
      const eDateCompare = new Date(form.value.LawsuitDateTo);
      if (sDateCompare.valueOf() > eDateCompare.valueOf()) {
        alert(Message.checkDate);
        return false;
      }
      form.value.LawsuitDateFrom = sDateCompare.toISOString();
      form.value.LawsuitDateTo = eDateCompare.toISOString();
    }
    this.preLoaderService.setShowPreloader(true);
    await this.lawsuitService.getByConAdv(form.value).then(list => this.onSearchComplete(list));
    this.preLoaderService.setShowPreloader(false);
  }

  viewData(item) {
    this.router.navigate(['/lawsuit/manage', 'R'], {
      queryParams: { id: item.LawsuitID, code: item.ArrestCode }
    });
  }

  closeAdvSearch() {
    this.navService.showAdvSearch.next(false);
  }

  async pageChanges(event) {
    this.resultsPerPage = await this.results.slice(event.startIndex - 1, event.endIndex);
  }

  ngOnDestroy() {
    this.advSearchSub.unsubscribe();
  }
}
