import { pagination } from "../../../config/pagination";
import { NgForm } from "@angular/forms";
import { Message } from "../../../config/message";
import { LawsuitService } from "../lawsuit.service";
import { NavigationService } from "../../../shared/header-navigation/navigation.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Lawsuit } from "../models/lawsuit";
import { toLocalShort } from "../../../config/dateFormat";
import { Notice } from "../../notices/notice";
import { PreloaderService } from "../../../shared/preloader/preloader.component";
import { SidebarService } from "../../../shared/sidebar/sidebar.component";
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { IMyDpOptions } from 'mydatepicker';
import Swal from 'sweetalert2'
@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})

export class ListComponent implements OnInit, OnDestroy {

  results: Lawsuit[] = [];
  resultsPerPage: Lawsuit[] = [];

  subOnSearchByKeyword: any;
  subSetNextPage: any;

  advSearch: any;
  // advSearchSub: any;

  @ViewChild('advForm') advForm: NgForm;

  paginage = pagination;

  private today = new Date();

  constructor(private router: Router, private navService: NavigationService, private preLoaderService: PreloaderService
    , private lawsuitService: LawsuitService, private sidebarService: SidebarService
  ) {
    this.setShowButton();
    this.advSearch = this.navService.showAdvSearch;
  }
  async ngOnInit() {
    this.sidebarService.setVersion('0.0.0.27');
    this.paginage.TotalItems = 0;
    this.preLoaderService.setShowPreloader(true);
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
    this.setShowButton()
    this.navService.showAdvSearch.next(true);
    this.preLoaderService.setShowPreloader(false);
  }

  ngOnDestroy() {
    this.navService.showAdvSearch.next(false);
    this.subOnSearchByKeyword.unsubscribe();
    this.subSetNextPage.unsubscribe();
  }

  public LawsuitDateFromOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mmm/yyyy',
    disableSince: { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() + 1 },
  };
  public LawsuitDateToOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mmm/yyyy',
    disableSince: { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() + 1 },
  };

  onDateChanged(event) {
    setTimeout(() => {
      if (this.advForm.value.LawsuitDateFrom.epoc > this.advForm.value.LawsuitDateTo.epoc) {
        this.advForm.controls['LawsuitDateTo'].setValue({
          date: this.advForm.value.LawsuitDateFrom.date,
          epoc: this.advForm.value.LawsuitDateFrom.epoc,
          formatted: this.advForm.value.LawsuitDateFrom.formatted,
          jsdate: this.advForm.value.LawsuitDateFrom.jsdate,
        });
        console.log(this.advForm.controls['LawsuitDateTo'])
        Swal({
          text: Message.checkDate,
          type: 'warning',
        })
        return;
      }
      else {
        this.LawsuitDateFromOptions = {
          dateFormat: 'dd/mmm/yyyy',
          disableSince: { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() + 1 }
        }
      }
    }, 100);
  }
  onDateFromChanged(event) {
    setTimeout(() => {
      if (this.advForm.value.LawsuitDateFrom.epoc > this.advForm.value.LawsuitDateTo.epoc) {
        this.advForm.controls['LawsuitDateTo'].setValue({
          date: this.advForm.value.LawsuitDateFrom.date,
          epoc: this.advForm.value.LawsuitDateFrom.epoc,
          formatted: this.advForm.value.LawsuitDateFrom.formatted,
          jsdate: this.advForm.value.LawsuitDateFrom.jsdate,
        });
        Swal({
          text: Message.checkDate,
          type: 'warning',
        })
        return;
      }
      else if (!event) {
        let checkDate = new Date(event.jsdate);
        this.LawsuitDateFromOptions = {
          dateFormat: 'dd/mmm/yyyy',
          disableSince: { year: checkDate.getFullYear(), month: checkDate.getMonth() + 1, day: checkDate.getDate() + 1 }
        }
      }
    }, 100);
  }

  async onSearch(Textsearch: any) {
    this.preLoaderService.setShowPreloader(true);
    Textsearch = Textsearch.Textsearch == null ? {Textsearch: ""} : Textsearch
    await this.lawsuitService.LawsuitArrestGetByKeyword(Textsearch).then(list => this.onSearchComplete(list));
    this.preLoaderService.setShowPreloader(false);
  }

  async onAdvSearch(form: any) {
    if (form.value.LawsuitDateFrom) {
      let lawsuitDateToValue = form.value.LawsuitDateTo
      if (!lawsuitDateToValue) {
        lawsuitDateToValue = form.value.LawsuitDateFrom;
      }
      if (form.value.LawsuitDateTo == null) {
        form.value.LawsuitDateTo = form.value.LawsuitDateFrom
      }
      const sDateCompare = new Date(form.value.LawsuitDateFrom.jsdate);
      const eDateCompare = new Date(form.value.LawsuitDateTo.jsdate);
      if (sDateCompare.valueOf() > eDateCompare.valueOf()) {
        Swal({
          text: Message.checkDate,
          type: 'warning',
        })
        return false;
      }
      form.value.LawsuitDateFrom = sDateCompare.toISOString();
      form.value.LawsuitDateTo = eDateCompare.toISOString();
    }

    this.preLoaderService.setShowPreloader(true);
    await this.lawsuitService.LawsuitArrestGetByConAdv(form.value).then(list => this.onSearchComplete(list));
    this.advSearch = this.navService.showAdvSearch;
    this.preLoaderService.setShowPreloader(false);
  }

  private setShowButton(): void {
    this.navService.setSearchBar(true);
    this.navService.setPrintButton(false);
    this.navService.setDeleteButton(false);
    this.navService.setCancelButton(false);
    this.navService.setEditButton(false);
    this.navService.setSaveButton(false);
    this.navService.setNewButton(false);
    this.navService.setOnPrevPage(false);
    this.navService.setPrevPageButton(false);

  }
  private convertList(list: any) {
    let tempList = []
    list.forEach(lawsuit => {
      lawsuit.LawsuitArrestIndicment.forEach(indicment => {
        let lawsuitList = {
          Lawsuit: lawsuit,
          LawsuitArrestIndicment: indicment
        }
        tempList.push(lawsuitList)
      });

    });
    return tempList;
  }

  checkLawsuitType(item) {
    if (item.Lawsuit.length > 0) {
      return item.Lawsuit[0].IsOutside == 1 ? "น. " : ""
    } else {
      return "";
    }
  }

  showLawsuitDate(item) {
    if (item.Lawsuit.length > 0) {
      return toLocalShort(item.Lawsuit[0].LawsuitDate)
    }
  }

  private async onSearchComplete(list: any) {
    if (list.length == 0) {
      Swal({
        text: Message.noRecord,
        type: 'warning',
      })
      this.resultsPerPage = [];
      return false;
    }

    list = await this.convertList(list)
    /* Alert When No Data To Show */

    /* Adjust Another Column */
    this.results = list.map((item, i) => {
      item.RowsId = i + 1;
      return item;
    });
    this.paginage.TotalItems = this.results.length;
  }

  private viewData(item) {
    let LawsuitID = ""
    if (item.LawsuitArrestIndicment.Lawsuit[0]) {
      LawsuitID = item.LawsuitArrestIndicment.Lawsuit[0].LawsuitID;
    }
    if (LawsuitID != "") {
      this.router.navigate(['/lawsuit/manage', 'R'], {
        queryParams: { IndictmentID: item.LawsuitArrestIndicment.IndictmentID, LawsuitID: LawsuitID }
      });
    } else {
      this.router.navigate(['/lawsuit/manage', 'C'], {
        queryParams: { IndictmentID: item.LawsuitArrestIndicment.IndictmentID, LawsuitID: LawsuitID }
      });
    }
  }

  private closeAdvSearch() {
    this.navService.showAdvSearch.next(false);
  }

  async pageChanges(event) {
    this.resultsPerPage = await this.results.slice(event.startIndex - 1, event.endIndex);
  }

  checkNullLawsuitNo(data) {
    if (data.Lawsuit.length > 0) {
      return data.Lawsuit[0].LawsuitNo;
    } else {
      return "";
    }
  }

}
