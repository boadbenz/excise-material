import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { options } from '../../../config/dataTable';

// import * as $ from 'jquery';

declare var $: any;
import 'datatables.net-bs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  dataTable: any;

  constructor(
    private _router: Router,
    private _chRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  onDetactTable() {
    const table: any = $('table');

    // if ($.fn.dataTable.isDataTable('table')) {

    //   this.dataTable = table.DataTable();
    //   this.dataTable.destroy();
    // }

    this._chRef.detectChanges();

    this.dataTable = table.DataTable(options);

  }

  view(noticeCode: string) {
    this._router.navigate(['/proof/manage'], { queryParams: { v: true, nationalityCode: noticeCode } });
  }

}
