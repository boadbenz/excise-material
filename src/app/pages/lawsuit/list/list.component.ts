import { pagination } from "../../../config/pagination";
import { NgForm } from "@angular/forms";
import { Message } from "../../../config/message";
import { LawsuitService } from "../lawsuit.service";
import { NavigationService } from "../../../shared/header-navigation/navigation.service";
import { Router } from "@angular/router";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Lawsuit } from "../models/lawsuit";
import { toLocalShort } from "../../../config/dateFormat";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit, OnDestroy {

  advSearch: any;
  lawsuitList = new Array<Lawsuit>();
  lawsuitListforPage = new Array<Lawsuit>();
  paginage = pagination;

  private advSearchSub: any;

  constructor(
    private navService: NavigationService,
    private router: Router,
    private lawsuitService: LawsuitService
  ) {
    this.advSearch = this.navService.showAdvSearch;
    this.advSearchSub = this.navService.searchByKeyword.subscribe(
      Textsearch => {
        if (Textsearch) {
          this.lawsuitService
            .getByKeyword(Textsearch)
            .then(res => this.getSearchComplete(res));
        }
      }
    );
  }

  ngOnInit() {
    this.setShowButton();
  }

  private setShowButton() {
    this.navService.setSearchBar(true);
    this.navService.setPrintButton(false);
    this.navService.setDeleteButton(false);
    this.navService.setCancelButton(false);
    this.navService.setEditButton(false);
    this.navService.setSaveButton(false);
  }

  private getSearchComplete(res: any) {
    if (res.IsSuccess) {
      this.lawsuitList = res.ResponseData;
      this.lawsuitList.map((data, index) => {
        data.RowsId = index + 1;
        data.LawsuitDate = toLocalShort(data.LawsuitDate);
        data.LawsuiteStaff.map(staff => {
          staff.FullName = `${staff.TitleName} ${staff.FirstName} ${
            staff.LastName
            }`;
        });
      });

      this.lawsuitListforPage = this.lawsuitList;
      this.paginage.TotalItems = this.lawsuitList.length;
    } else {
      alert(Message.noRecord);
      return false;
    }
  }

  advSearchForm(advForm: NgForm) {
    const DateFrom = new Date(advForm.value.LawsuitDateFrom);
    const DateTo = new Date(advForm.value.LawsuitDateTo);
    // Compare Date
    if (DateFrom.getTime() > DateTo.getTime()) {
      alert(Message.checkDate);
    } else {
      this.lawsuitService
        .getByKeyword(advForm.value)
        .then(res => this.getSearchComplete(res));
    }
    advForm.reset();
  }

  viewData(item) {
    this.router.navigate(["/lawsuit/manage", "R"], {
      queryParams: { id: item.LawsuitID, code: "050100020" }
    });
  }

  closeAdvSearch() {
    this.navService.showAdvSearch.next(false);
  }

  async pageChanges(event: any) {
    this.lawsuitList = await this.lawsuitListforPage.slice(
      event.startIndex - 1,
      event.endIndex
    );
  }

  ngOnDestroy() {
    this.advSearchSub.unsubscribe();
  }
}
