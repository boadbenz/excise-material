import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-offense-modal',
  templateUrl: './offense-modal.component.html',
  styleUrls: ['./offense-modal.component.scss']
})
export class OffenseModalComponent implements OnInit {

  dataTable: any;
  @Output() d = new EventEmitter();
  @Output() c = new EventEmitter();

  constructor(private _chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.onDetactTable();
  }

  onDetactTable() {
    // const table: any = $('table');

    // if ($.fn.dataTable.isDataTable('table')) {

    //   this.dataTable = table.DataTable();
    //   this.dataTable.destroy();
    // }

    // this._chRef.detectChanges();

    // this.dataTable = table.DataTable(dataTableOptions);

  }

  dismiss(e: any) {
    this.d.emit(e);
  }

  close(e: any) {
    this.c.emit(e);
  }

}
