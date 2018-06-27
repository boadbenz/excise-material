import { Component, OnInit, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { NoticeService } from '../notice.service';
import { NoticeList } from '../list/notice-list';

@Component({
  selector: 'app-notice-list-modal',
  templateUrl: './notice-list-modal.component.html',
  styleUrls: ['./notice-list-modal.component.scss']
})
export class NoticeListModalComponent implements OnInit {

  isOpen = false;
  isCheckAll = false;
  advSearch = false;

  noticeList = new Array<NoticeList>();

  @Output() d = new EventEmitter();
  @Output() c = new EventEmitter();

  constructor(private noticeServie: NoticeService) {

   }

  ngOnInit() {
    this.noticeList = this.noticeServie.getList;
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
