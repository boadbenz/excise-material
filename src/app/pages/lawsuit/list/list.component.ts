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
  paginage = pagination;

  private advSearchSub: any;

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
    await this.lawsuitService.getByKeywordOnInt().then(list => this.onSearchComplete(list));
  }

  async onSearchComplete(list: Lawsuit[]) {

    if (!list.length) {
      alert(Message.noRecord);
      return false;
    }

    // await list.map((item, i) => {
    //   item.rowId = i + 1;
    //   item.NoticeDate = toLocalShort(item.NoticeDate);
    //   item.NoticeStaff.map(s => {
    //     s.StaffFullName = `${s.TitleName} ${s.FirstName} ${s.LastName}`;
    //   });
    //   item.NoticeSuspect.map(s => {
    //     s.SuspectFullName = `${s.SuspectTitleName} ${s.SuspectFirstName} ${s.SuspectLastName}`;
    //   })
    // });

    this.results = list.map((item, i) => {
      item.RowsId = i + 1;
      return item;
    });

    /* Set Total Record */
    this.paginage.TotalItems = this.results.length;
  }

  private setShowButton() {
    this.navService.setSearchBar(true);
    this.navService.setPrintButton(false);
    this.navService.setDeleteButton(false);
    this.navService.setCancelButton(false);
    this.navService.setEditButton(false);
    this.navService.setSaveButton(false);
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

  // private getSearchComplete(res: any) {
  //   console.log(res);
  //   if (res.IsSuccess) {
  //     this.results = res.ResponseData;
  //     this.results.map((data, index) => {
  //       data.RowsId = index + 1;
  //       data.LawsuitDate = toLocalShort(data.LawsuitDate);
  //       data.LawsuiteStaff.map(staff => {
  //         staff.FullName = `${staff.TitleName} ${staff.FirstName} ${
  //           staff.LastName
  //           }`;
  //       });
  //     });
  //
  //     this.resultsPerPage = this.results;
  //     this.paginage.TotalItems = this.results.length;
  //   } else {
  //     alert(Message.noRecord);
  //     return false;
  //   }
  // }

  // advSearchForm(advForm: NgForm) {
  //   const DateFrom = new Date(advForm.value.LawsuitDateFrom);
  //   const DateTo = new Date(advForm.value.LawsuitDateTo);
  //   // Compare Date
  //   if (DateFrom.getTime() > DateTo.getTime()) {
  //     alert(Message.checkDate);
  //   } else {
  //     this.lawsuitService.getByKeyword(advForm.value)
  //       .then(res => this.onSearchComplete(res));
  //   }
  //   advForm.reset();
  // }

  viewData(item) {
    console.log('going to detail page');
    console.log(item);
    this.router.navigate(['/lawsuit/manage', 'R'], {
      queryParams: { id: item.LawsuitID, code: item.ArrestCode }
    });
    // this.router.navigate(['/lawsuit/manage', 'R']);
    console.log('gone to detail page');
  }

  closeAdvSearch() {
    this.navService.showAdvSearch.next(false);
  }

  // async pageChanges(event: any) {
  //   this.results = await this.resultsPerPage.slice(
  //     event.startIndex - 1,
  //     event.endIndex
  //   );
  // }

  async pageChanges(event) {
    this.results = await this.results.slice(event.startIndex - 1, event.endIndex);
  }

  ngOnDestroy() {
    this.advSearchSub.unsubscribe();
  }
}
