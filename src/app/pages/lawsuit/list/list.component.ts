import { Router } from "@angular/router";
import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";

import { pagination } from "../../../config/pagination";
import { Message } from "../../../config/message";
import { Lawsuit } from "../models/lawsuit";
import { toLocalShort } from "../../../config/dateFormat";
import { PreloaderService } from "../../../shared/preloader/preloader.component";
import { SidebarService } from "../../../shared/sidebar/sidebar.component";
import { IMyDpOptions } from 'mydatepicker';

import { LawsuitService } from "../lawsuit.service";
import { NavigationService } from "../../../shared/header-navigation/navigation.service";

import Swal from 'sweetalert2';

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

  constructor(
    private router: Router,
    private navService: NavigationService,
    private preLoaderService: PreloaderService,
    private lawsuitService: LawsuitService,
    private sidebarService: SidebarService
  ) {
    this.setShowButton();
    this.setPagination()
    this.advSearch = this.navService.showAdvSearch;
  }
  async ngOnInit() {
    this.sidebarService.setVersion('0.0.0.49');
    localStorage.setItem('programcode','ILG60-04-00')
    await this.onSearchByKeyword()
    await this.setShowButton();
    // await this.onNextPage()
  }

  async ngOnDestroy() {
    await this.navService.showAdvSearch.next(false);
    await this.subOnSearchByKeyword.unsubscribe();
    await this.subSetNextPage.unsubscribe();
  }

  private setShowButton(): void {
    this.navService.showAdvSearch.next(true);
    this.navService.setSearchBar(true);
    this.navService.setPrintButton(false);
    this.navService.setDeleteButton(false);
    this.navService.setCancelButton(false);
    this.navService.setEditButton(false);
    this.navService.setSaveButton(false);
    this.navService.setNewButton(false);
    this.navService.setOnPrevPage(false);
    this.navService.setNextPageButton(false);
  }

  setPagination() {
    this.paginage.TotalItems = 0;
  }

  closeAdvSearch() {
    this.navService.showAdvSearch.next(false);
  }

  async pageChanges(event) {
    this.resultsPerPage = await this.results.slice(event.startIndex - 1, event.endIndex);
  }

  onSearchByKeyword() {
    this.subOnSearchByKeyword = this.navService.searchByKeyword.subscribe(async Textsearch => {
      await this.onSearch(Textsearch);
    });
  }

  onNextPage() {
    this.subSetNextPage = this.navService.onNextPage.subscribe(async status => {
      if (status) {
        await this.navService.setOnNextPage(false);
        this.router.navigate(['/notice/manage', 'C', 'NEW']);
      }
    });
  }

  async setLawsuitArrestList(list) {
    let tempList = []
    if (list.length == 0) {
      Swal({
        text: Message.noRecord,
        type: 'warning',
      })
    } else {
      await list.forEach(async lawsuit => {
        await lawsuit.LawsuitArrestIndicment.forEach(indicment => {
          let lawsuitList = { Lawsuit: lawsuit, LawsuitArrestIndicment: indicment }
          tempList.push(lawsuitList)
        });
      });
    }
    this.paginage.TotalItems = tempList.length;
    this.preLoaderService.setShowPreloader(false);
    return tempList;
  }

  async onSearch(Textsearch: any) {
    if (Textsearch) {
      this.preLoaderService.setShowPreloader(true);
      let LawsuitArrestList = await this.lawsuitService.LawsuitArrestGetByKeyword(Textsearch);
      this.resultsPerPage = await this.setLawsuitArrestList(LawsuitArrestList)
      this.results = this.resultsPerPage
      // return await this.navService.setOnSearch('');
    } else {
      return false;
    }
  }

  async onAdvSearch(form: any) {
    if (form.value.LawsuitDateFrom) {
      form.value.LawsuitDateTo = form.value.LawsuitDateTo == null ? form.value.LawsuitDateFrom : form.value.LawsuitDateTo;
      const sDateCompare = new Date(form.value.LawsuitDateFrom.jsdate);
      const eDateCompare = new Date(form.value.LawsuitDateTo.jsdate);
      sDateCompare ? sDateCompare.setDate(sDateCompare.getDate() + 1) : null;
      eDateCompare ? eDateCompare.setDate(eDateCompare.getDate() + 1) : null;
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
    if (!form.value.LawsuitDateFrom && form.value.LawsuitDateTo) {
      Swal({
        text: "รูปแบบวันที่ไม่ถูกต้อง",
        type: 'warning',
      })
      return false;
    }
    this.preLoaderService.setShowPreloader(true);
    let ArrestGetByCon = await this.lawsuitService.LawsuitArrestGetByConAdv(form.value);
    this.resultsPerPage = await this.setLawsuitArrestList(ArrestGetByCon)
    console.log(ArrestGetByCon)
    this.results = this.resultsPerPage
    this.advSearch = this.navService.showAdvSearch;
    this.preLoaderService.setShowPreloader(false);
  }

  checkLawsuitType(item) {
    if (item.Lawsuit.length > 0) {
      return item.Lawsuit[0].IsOutside == 1 ? "น. " : ""
    } else {
      return "";
    }
  }

  showLawsuitDate(item) {
    if (item.Lawsuit.length > 0 && item.Lawsuit[0].LawsuitDate) {
      return toLocalShort(item.Lawsuit[0].LawsuitDate)
    }
  }

  checkNullLawsuitNo(data) {
    if (data.Lawsuit.length > 0 && data.Lawsuit[0].LawsuitNo && data.Lawsuit[0].LawsuitNo != "/") {
      return data.Lawsuit[0].LawsuitNo;
    } else {
      return "";
    }
  }

  viewData(item) {
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


  onDateChanged(event) {
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

}
