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

  constructor(private router: Router, private navService: NavigationService, private preLoaderService: PreloaderService
              , private lawsuitService: LawsuitService
  ) {
    this.advSearch = this.navService.showAdvSearch;
    this.advSearchSub = this.navService.searchByKeyword.subscribe(filterValue => {
      if (filterValue) {
        this.lawsuitService.getByKeyword(filterValue)
          .then(res => this.onSearchComplete(res));
      }
    });
  }

  ngOnInit() {
    this.setShowButton();
    this.loadPage();
  }

  private loadPage(): void {
    this.preLoaderService.setShowPreloader(true);
    this.lawsuitService.getByKeywordOnInt().then(list => this.onSearchComplete(list));
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

  private onAdvSearch(form: any) {
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
    this.lawsuitService.LawsuitgetByConAdv(form.value).then(list => this.onSearchComplete(list));
    this.preLoaderService.setShowPreloader(false);
  }

  private viewData(item) {
    this.router.navigate(['/lawsuit/manage', 'R'], {
      queryParams: { id: item.LawsuitID, code: item.ArrestCode }
    });
  }

  private closeAdvSearch() {
    this.navService.showAdvSearch.next(false);
  }

  private pageChanges(event) {
    this.resultsPerPage = this.results.slice(event.startIndex - 1, event.endIndex);
  }

  ngOnDestroy() {
    this.advSearchSub.unsubscribe();
  }

}
