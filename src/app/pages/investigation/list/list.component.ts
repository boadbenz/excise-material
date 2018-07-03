import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { InvestigateService } from '../investigate.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Investigate } from '../investigate';
import { pagination } from '../../../config/pagination';
import { Message } from '../../../config/message';
import { async } from '@angular/core/testing';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

    advSearch: any;
    invesList = new Array<Investigate>();
    invesPaginate = pagination;
    private subOnSearch: any;

    @ViewChild('invesTable') invesTable: ElementRef;

    constructor(
        private navService: NavigationService,
        private invesService: InvestigateService,
        private router: Router
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
        this.invesService.getByKeyword(Textsearch).subscribe(list => {

            this.onSearchComplete(list)

        }, (err: HttpErrorResponse) => {
            alert(err.message);
        });
    }

    onAdvSearch(form: any) {

        const sDateCompare = new Date(form.value.DateStartFrom);
        const eDateCompare = new Date(form.value.DateStartTo);

        if (sDateCompare.getTime() > eDateCompare.getTime()) {
            alert(Message.checkDate);
        } else {
            form.value.DateStartFrom = sDateCompare.getTime();
            form.value.DateStartTo = eDateCompare.getTime();
            this.invesService.getByConAdv(form.value).subscribe(list => {

                this.onSearchComplete(list)

            }, (err: HttpErrorResponse) => {
                alert(err.message);
            });
        }
    }

    onSearchComplete(list: any) {
        this.invesList = [];

        if (!list) {
            alert(Message.noRecord);
            return false;
        }

        if (Array.isArray(list)) {
            this.invesList = list;
        } else {
            this.invesList.push(list);
        }

        // set total record
        this.invesPaginate.TotalItems = this.invesList.length;
    }

    clickView(invesCode: string) {
        this.router.navigate([`/investigation/manage/R/${invesCode}`]);
    }

    pageChanges(event) {
        // this.invesPaginate.CurrentPage = event.currentPage;
        // this.invesPaginate.TotalItems = event.totalItems;
        // this.invesPaginate.PageSize = event.pageSize;
        // this.invesPaginate.TotalPageLinkButtons = event.totalPageLinkButtons;

        console.log(this.invesTable.nativeElement);

    }
}
