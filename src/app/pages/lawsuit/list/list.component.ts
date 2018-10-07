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

  // lawsuitDateFrom: any;
  // lawsuitDateTo: any;

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
    this.sidebarService.setVersion('0.0.0.5');
    this.paginage.TotalItems = 0;

    this.preLoaderService.setShowPreloader(true);
    await this.lawsuitService.LawsuitArrestGetByKeyword('').then(list => this.onSearchComplete(list));

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
    await this.lawsuitService.LawsuitArrestGetByKeyword(Textsearch).then(list => this.onSearchComplete(list));
    this.preLoaderService.setShowPreloader(false);
  }

  async onAdvSearch(form: any) {
    /* Query (Advance Search) */
    this.preLoaderService.setShowPreloader(true);
    await this.lawsuitService.LawsuitArrestGetByConAdv({
      ArrestCode: form.value.ArrestCode,
      SubSectionType: form.value.SubSectionType,
      LawsuitNo: form.value.LawsuitNo,
      LawsuitDateFrom: form.value.LawsuitDateFrom? new Date(getDateMyDatepicker(form.value.LawsuitDateFrom)): "",
      LawsuitDateTo: form.value.LawsuitDateTo? new Date(getDateMyDatepicker(form.value.LawsuitDateTo)): (form.value.LawsuitDateFrom? new Date(): ""),
      StaffName: form.value.StaffName,
      DepartmentName: form.value.OfficeName,
    }).then(list => this.onSearchComplete(list));
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

  private onSearchComplete(list: any[]) {
    /* Adjust Another Column */

    /* Add-in attribute */
    // this.dataSource = new MatTableDataSource<CreditAdjustmentDetail>(this.result.adjustmentDetails.map(x => {
    //   x.docNo = 'REFUND-CN'.includesWithSingleQuoteWrap(this.result.caActionCode)?
    //     ((x.invoice && x.invoice.invoiceNo)? x.invoice.invoiceNo: null): ((x.receipt && x.receipt.receiptNo)? x.receipt.receiptNo: null);
    //   x.docDate = 'REFUND-CN'.includesWithSingleQuoteWrap(this.result.caActionCode)?
    //     ((x.invoice && x.invoice.invoiceDate)? new Date(x.invoice.invoiceDate): null): ((x.receipt && x.receipt.receiptDate)? new Date(x.receipt.receiptDate): null);
    //   x.totalAmount = Number(x.amount) + Number(x.vatAmount);
    //   return x;
    // }).sort(function(a,b) {return (a.lstCaID > b.lstCaID) ? 1 : ((b.lstCaID > a.lstCaID) ? -1 : 0);} ));

    this.results = list.map((item, i) => {
      item.RowsId = i + 1;
      // item.LawsuitDate = toLocalShort(item.LawsuitDate);
      item.LawsuitArrestIndicment = (item.LawsuitArrestIndicment || [ ]).map(x => {
        x.Lawsuit = (x.Lawsuit || [ ]).map(y => {
          y.LawsuitDate = toLocalShort(y.LawsuitDate);
          return y;
        });
        return x;
      });
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
    
    if(item.LawsuitArrestIndicment[0].Lawsuit[0]) {
      item.LawsuitID = item.LawsuitArrestIndicment[0].Lawsuit[0].LawsuitID;
    } else {
      item.LawsuitID = '';
    }
    this.router.navigate(['/lawsuit/manage', 'R'], {
      queryParams: { IndictmentID : item.LawsuitArrestIndicment[0].IndictmentID, LawsuitID : item.LawsuitID }
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
      // setTimeout(() => {
      //   form.controls['LawsuitDateTo'].setValue(new Date());
      //   this.lawsuitDateTo = { date: event.date };
      // }, 0);
      return false;
    }
  }

  onLawsuitDateToChange(form: any, event: IMyDateModel) {
    if ((form.value.LawsuitDateFrom && event)
        && !compareDate(getDateMyDatepicker(form.value.LawsuitDateFrom), getDateMyDatepicker(event))) {
      alert(Message.checkDate);
      // setTimeout(() => {
      //   this.lawsuitDateTo = { date: form.value.LawsuitDateFrom.date };
      // }, 0);
      return false;
    }
  }

}
