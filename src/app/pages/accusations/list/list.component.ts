import { pagination } from 'app/config/pagination';
import { NgForm } from '@angular/forms';
import { Message } from 'app/config/message';
import { AccusationsService } from './../accusations.service';
import { NavigationService } from './../../../shared/header-navigation/navigation.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  listData: any;
  advSearch: any;
  paginage = pagination;

  constructor(private navService: NavigationService, private router: Router, private accService: AccusationsService) {
    this.advSearch = this.navService.showAdvSearch;

    this.navService.searchByKeyword.subscribe(Textsearch => {
      if (Textsearch) {
        this.getSearchFromService(Textsearch);
      }

    })
  }

  ngOnInit() {
    this.navService.setSearchBar(true);
    this.navService.setPrintButton(false);
    this.navService.setDeleteButton(false);
    this.navService.setCancelButton(false);
    this.navService.setEditButton(false);
    this.navService.setSaveButton(false);
  }

  private getSearchFromService(Textsearch: any) {
    this.accService.LawsuitgetByKeyword(Textsearch).subscribe(res => {
      if (res.IsSuccess) {
        this.listData = res.ResponseData;
      }
      else {
        alert(Message.noRecord);
        this.listData = [];
      }
    })
  }

  viewData(ArrestCode: string) {
    this.router.navigate(['/accusations/manage', 'R'], { queryParams: { code: ArrestCode } });
  }

  advSearchForm(advForm: NgForm) {

    const DateFrom = new Date(advForm.value.LawsuitDateFrom);
    const DateTo = new Date(advForm.value.LawsuitDateTo);

    //Compare Date
    if (DateFrom.getTime() > DateTo.getTime()) {
      alert(Message.checkDate);
    }
    else {
      advForm.value.LawsuitDateFrom = DateFrom.getTime();
      advForm.value.LawsuitDateTo = DateTo.getTime();
      this.accService.LawSuitgetByConAdv(advForm.value).subscribe(
        res => {
          if (res.IsSuccess) {
            this.listData = res.ResponseData;
          }
          else {
            alert(Message.noRecord);
            this.listData = [];
          }
        });
    }
  }

  closeAdvSearch() {
    this.navService.showAdvSearch.next(false);
  }

  pageChanges(event) { }

}
