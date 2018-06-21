import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { options as dataTableOptions } from '../../../config/dataTable';

import * as $ from 'jquery';
import 'datatables.net-bs';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

    dataTable: any;

    constructor(
        private _router: Router,
        private _chRef: ChangeDetectorRef,
        private navservice: NavigationService
    ) {
        this.navservice.setSearchBar(true);
        this.navservice.setNewButton(true);
    }

    ngOnInit() {
        this.onDetactTable();
    }

    onDetactTable() {
        const table: any = $('table');

        if ($.fn.dataTable.isDataTable('table')) {

            this.dataTable = table.DataTable();
            this.dataTable.destroy();
        }

        this._chRef.detectChanges();

        this.dataTable = table.DataTable(dataTableOptions);

    }

    view(noticeCode: string) {
        this._router.navigate(['/notice/manage'], { queryParams: { v: true, nationalityCode: noticeCode } });
    }

}
