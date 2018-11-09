import { Component, OnInit } from '@angular/core';
import { TableDataConfig } from './table-data.config';
import { PagerService, IPagerService } from '../services/Pager.service';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss']
})
export class TableDataComponent extends TableDataConfig implements OnInit {
  // array of all items to be paged
  private allItems: any[];

  // pager object
  public pager: IPagerService;

  // paged items
  public pagedItems: any[];

  constructor(private pagerService: PagerService) {
    super();
  }

  ngOnInit() {
    this.data$.subscribe(data => {
      this.allItems = data;
      this.setPage(1,  this.paginage.PageSize);
    });
  }
  public setPage(current: number, pageSize) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, current, pageSize);

    // get current page of items
    this.pagedItems = this.allItems.slice(
      this.pager.startIndex,
      this.pager.endIndex + 1
    );
  }
  public pageChanges($event) {
    // console.log('pageChange', $event);
    // this.pager.totalItems = $event.TotalItems
    // this.pager.pageSize = $event.PageSize
    this.pager.currentPage = $event.currentPage;
    this.pager.startIndex = $event.startIndex;
    this.pager.endIndex = $event.endIndex;
    this.pager.pageSize = $event.pageSize;
    this.pager.pages = $event.pages;
    this.setPage($event.currentPage, $event.pageSize);
  }
  public viewData(data) {}
}
