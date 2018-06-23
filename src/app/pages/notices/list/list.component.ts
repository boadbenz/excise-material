import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

    dataTable: any;
    advSearch: any;

    constructor(
        private _router: Router,
        private navservice: NavigationService
    ) {
        // set false
        this.navservice.setEditButton(false);
        this.navservice.setDeleteButton(false);
        this.navservice.setPrintButton(false);
        this.navservice.setSaveButton(false);
        this.navservice.setCancelButton(false);
        this.navservice.setNextPageButton(false);
        // set true
        this.navservice.setSearchBar(true);
        this.navservice.setNewButton(true);
        this.advSearch = this.navservice.showAdvSearch;
    }

    ngOnInit() {
        this.onDetactTable();
    }

    onDetactTable() {
        // const table: any = $('table');

        // if ($.fn.dataTable.isDataTable('table')) {

        //     this.dataTable = table.DataTable();
        //     this.dataTable.destroy();
        // }

        // this._chRef.detectChanges();

        // this.dataTable = table.DataTable(dataTableOptions);

    }

    view(noticeCode: string) {
        this._router.navigate(['/notice/manage'], { queryParams: { v: true, nationalityCode: noticeCode } });
    }

}
