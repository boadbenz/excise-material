import { Component, OnInit } from '@angular/core';
import { TableDataConfig } from './table-data.config';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss']
})
export class TableDataComponent extends TableDataConfig implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {}
  public pageChanges($event) {
    console.log('pageChange', $event);
  }
  public viewData(data) {}
}
