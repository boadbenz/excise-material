import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { IncomeService } from '../income.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Revenue } from '../revenue';
import { pagination } from '../../../config/pagination';
import { Message } from '../../../config/message';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit, OnDestroy {

    advSearch: any;
    revenue = new Array<Revenue>();
    RevenueList = new Array<Revenue>();
    paginage = pagination;
    private subOnSearch: any;

    @ViewChild('revenueTable') revenueTable: ElementRef;

    constructor(
        private _router: Router,
        private navService: NavigationService,
        private incomeService: IncomeService
    ) {
        // set false
        this.navService.setEditButton(false);
        this.navService.setDeleteButton(false);
        this.navService.setPrintButton(false);
        this.navService.setSaveButton(false);
        this.navService.setCancelButton(false);
        this.navService.setNextPageButton(false);
        // set true
        this.navService.setSearchBar(true);
        this.navService.setNewButton(true);
        this.advSearch = this.navService.showAdvSearch;
    }

    ngOnInit() {
        this.subOnSearch = this.navService.searchByKeyword.subscribe(async Textsearch => {
            if (Textsearch) {
                await this.navService.setOnSearch('');
                this.onSearch(Textsearch);
            }
        })
    }

    ngOnDestroy(): void {
        this.subOnSearch.unsubscribe();
    }

    onSearch(Textsearch: any) {
        this.incomeService.getByKeyword(Textsearch).subscribe(list => {

            this.onSearchComplete(list)

        }, (err: HttpErrorResponse) => {
            alert(err.message);
        });
    }

    onAdvSearch(form: any) {

        const sDateCompare = new Date(form.value.DateStartFrom);
        const eDateCompare = new Date(form.value.DateStartTo);

        if (sDateCompare.getTime() > eDateCompare.getTime()) {
            alert(Message.checkRevenueDate);
        } else {
            form.value.DateStartFrom = sDateCompare.getTime();
            form.value.DateStartTo = eDateCompare.getTime();
            this.incomeService.getByConAdv(form.value).subscribe(list => {

                this.onSearchComplete(list)

            }, (err: HttpErrorResponse) => {
                alert(err.message);
            });
        }
    }

    onSearchComplete(list: any) {
        this.revenue = [];

        debugger
        if (!list.length) {
            alert(Message.noRecord);
            return false;
        }

        if (Array.isArray(list)) {
            this.revenue = list;
        } else {
            this.revenue.push(list);
        }

        // set total record
        this.paginage.TotalItems = this.revenue.length;
    }

    clickView(revenueCode: string) {
        this._router.navigate([`/income/manage/R/${revenueCode}`]);
    }

    async pageChanges(event) {
        this.RevenueList = await this.revenue.slice(event.startIndex - 1, event.endIndex);
    }
}
