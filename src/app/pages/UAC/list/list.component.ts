import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationService } from 'app/shared/header-navigation/navigation.service';
import { pagination } from '../../../config/pagination';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ListComponent implements OnInit {

  paginage = pagination;
  List: any = [{"name":"นาย อนันชพงศ์ เอี่ยมสำอางค์","pName":"เจ้าพนักงานสรรพสามิตปฏิบัติงาน","offName":"สสพ.ชุมพร"}];
  // advSearch: any;
  constructor() { }
  onSearchComplete(list: any) {

    this.List = list.map((item, i) => {
        // item.RowsId = i + 1;
        // try {
          
        // } catch (error) {

        // }

        return item;
      });   
    this.paginage.TotalItems = this.List.length;
}
  ngOnInit() {
    // this.advSearch.next(true);
  }
  ngOnDestroy() {
    // this.advSearch = false;
}

}
