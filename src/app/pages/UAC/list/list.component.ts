import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { NavigationService } from 'app/shared/header-navigation/navigation.service';
import { pagination } from '../../../config/pagination';
import { Router } from '@angular/router';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Message } from '../../../config/message';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ListComponent implements OnInit {
  @ViewChild('advForm') advForm: NgForm;
  paginage = pagination;
  advSearch: any;
  List: any = [{ "name": "นาย อนันชพงศ์ เอี่ยมสำอางค์", "pName": "เจ้าพนักงานสรรพสามิตปฏิบัติงาน", "offName": "สสพ.ชุมพร" },
  { "name": "นางสาว นุชนาถ ธรรมโชติ", "pName": "เจ้าพนักงานสรรพสามิตปฏิบัติงาน", "offName": "สสภ.9" }];


  // advSearch: any;
  constructor(private router: Router,
    private navService: NavigationService, ) {
    // set false
    // this.navService.setEditButton(false);
    // this.navService.setDeleteButton(false);
    // this.navService.setPrintButton(false);
    // this.navService.setSaveButton(false);
    // this.navService.setCancelButton(false);
    // this.navService.setNextPageButton(false);
    // set true
    this.navService.setSearchBar(true);
    // this.navService.setNewButton(false);
    this.advSearch = this.navService.showAdvSearch;
  }

  async pageChanges(event) { }

  clickView() {
    this.router.navigate([`/uac/manage`]);
  }

  async onAdvSearch(form: any) {
    const getfrom = form
    console.log("datafrom : ",getfrom) 
  }
  ngOnInit() { }
  ngOnDestroy() { }

}
