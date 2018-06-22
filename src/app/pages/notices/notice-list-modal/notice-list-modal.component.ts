import { Component, OnInit, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-notice-list-modal',
  templateUrl: './notice-list-modal.component.html',
  styleUrls: ['./notice-list-modal.component.scss']
})
export class NoticeListModalComponent implements OnInit {

  isOpen = false;
  isCheckAll = false;
  advSearch = false;

  @Output() d = new EventEmitter();
  @Output() c = new EventEmitter();

  constructor(private _chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.onDetactTable();
  }

  private onDetactTable() {
    // const table: any = $('table#suspectModal');

    // if ($.fn.dataTable.isDataTable('table#suspectModal')) {

    //   this.dataTable = table.DataTable();
    //   this.dataTable.destroy();
    // }

    // this._chRef.detectChanges();

    // this.dataTable = table.DataTable(options);
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
