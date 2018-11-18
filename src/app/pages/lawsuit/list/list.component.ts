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
    this.sidebarService.setVersion('0.0.0.10');
    this.paginage.TotalItems = 0;
    this.preLoaderService.setShowPreloader(true);
    // await this.lawsuitService.LawsuitArrestGetByKeyword('').then(list => this.onSearchComplete(list));
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
          alert(Message.checkDate);
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
        alert(Message.checkDate);
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
    await this.lawsuitService.LawsuitArrestGetByKeyword(Textsearch).then(list => this.onSearchComplete(list));
    this.preLoaderService.setShowPreloader(false);
  }

  async onAdvSearch(form: any) {
    if (form.value.LawsuitDateFrom) {
      let lawsuitDateToValue = form.value.LawsuitDateTo
      if (!lawsuitDateToValue) {
        lawsuitDateToValue = form.value.LawsuitDateFrom;
      }
      const sDateCompare = new Date(form.value.LawsuitDateFrom.jsdate);
      const eDateCompare = new Date(form.value.LawsuitDateTo.jsdate);
      if (sDateCompare.valueOf() > eDateCompare.valueOf()) {
        alert(Message.checkDate);
        return false;
      }
      // console.log('form.value.LawsuitDateFrom ===>', form.value.LawsuitDateFrom)
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
    this.navService.setOnPrevPage(false);
  }

  private onSearchComplete(list: any) {
    /* Alert When No Data To Show */
    if (!list.length) {
      alert(Message.noRecord);
      this.resultsPerPage = [];
      return false;
    }
    /* Adjust Another Column */
    this.results = list.map((item, i) => {
      item.RowsId = i + 1;
      try {
        item.LawsuitDate = toLocalShort(item.LawsuitArrestIndicment[0].Lawsuit[0].LawsuitDate);
      } catch (error) {

      }

      //item.LawsuitID = list.LawsuitArrestIndicment[0];
      //console.log("Check LIST:"+JSON.stringify(item));
      return item;
    });
    /* Set Total Record */
    this.paginage.TotalItems = this.results.length;
  }

  private viewData(item) {
    // console.log('item==>', item)

    if (item.LawsuitArrestIndicment[0].Lawsuit[0]) {
      item.LawsuitID = item.LawsuitArrestIndicment[0].Lawsuit[0].LawsuitID;
    } else {
      item.LawsuitID = '';
    }
    if(item.LawsuitID != "") {
      this.router.navigate(['/lawsuit/manage', 'R'], {
        queryParams: { IndictmentID: item.LawsuitArrestIndicment[0].IndictmentID, LawsuitID: item.LawsuitID }
      });
    } else {
      this.router.navigate(['/lawsuit/manage', 'C'], {
        queryParams: { IndictmentID: item.LawsuitArrestIndicment[0].IndictmentID, LawsuitID: item.LawsuitID }
      });
    }
      
    

  }

  private closeAdvSearch() {
    this.navService.showAdvSearch.next(false);
  }

  async pageChanges(event) {
    this.resultsPerPage = await this.results.slice(event.startIndex - 1, event.endIndex);
    console.log('this.resultsPerPage', this.resultsPerPage);
  }

  checkNullLawsuitNo(data) {
    if (data.LawsuitArrestIndicment[0].Lawsuit.length > 0) {
      return data.LawsuitArrestIndicment[0].Lawsuit[0].LawsuitNo;
    } else {
      return "";
    }
  }

}
