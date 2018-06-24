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


    }

    view(noticeCode: string) {
        this._router.navigate(['/income/manage'], { queryParams: { v: true, nationalityCode: noticeCode } });
    }

}
