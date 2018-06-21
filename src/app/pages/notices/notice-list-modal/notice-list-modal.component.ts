import { Component, OnInit, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { options } from '../../../config/dataTable';

import * as $ from 'jquery';
import 'datatables.net-bs';

@Component({
  selector: 'app-notice-list-modal',
  templateUrl: './notice-list-modal.component.html',
  styleUrls: ['./notice-list-modal.component.scss']
})
export class NoticeListModalComponent implements OnInit {

  isOpen = false;
  isCheckAll = false;
  advSearch = false;
  private dataTable: any;

  @Output() d = new EventEmitter();
  @Output() c = new EventEmitter();

  constructor(private _chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.onDetactTable();
  }

  private onDetactTable() {
    const table: any = $('table#suspectModal');

    if ($.fn.dataTable.isDataTable('table#suspectModal')) {

      this.dataTable = table.DataTable();
      this.dataTable.destroy();
    }

    this._chRef.detectChanges();

    this.dataTable = table.DataTable(options);
  }

  checkAll() {
    this.isCheckAll = !this.isCheckAll;
  }

  toggle() {
    this.advSearch = !this.advSearch;
  }

  dismiss(e: any) {
    this.d.emit(e);
  }

  close(e: any) {
    this.c.emit(e);
  }

}
