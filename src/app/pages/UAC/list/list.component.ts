import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationService } from 'app/shared/header-navigation/navigation.service';
import { pagination } from '../../../config/pagination';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ListComponent implements OnInit {

  paginage = pagination;
  // Compare = new Array<Compare>();
  List: any = [{ "name": "นาย อนันชพงศ์ เอี่ยมสำอางค์", "pName": "เจ้าพนักงานสรรพสามิตปฏิบัติงาน", "offName": "สสพ.ชุมพร" },
                { "name": "นางสาว นุชนาถ ธรรมโชติ", "pName": "เจ้าพนักงานสรรพสามิตปฏิบัติงาน", "offName": "สสภ.9" }];
  // advSearch: any;
  constructor(private router: Router) { }

  async pageChanges(event) { }

  clickView() {
      this.router.navigate([`/uac/manage`]); 
  }
  ngOnInit() { }
  ngOnDestroy() { }

}
