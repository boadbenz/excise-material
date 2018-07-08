import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { NoticeService } from '../notice.service';
import { Message } from 'app/config/message';
import { HttpErrorResponse } from '@angular/common/http';
import { Notice } from '../notice';
import { pagination } from 'app/config/pagination';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

    private subOnSearch: any;
    advSearch: any;

    paginage = pagination;

    notice = new Array<Notice>();

    @ViewChild('noticeTable') noticeTable: ElementRef;

    constructor(
        private _router: Router,
        private navservice: NavigationService,
        private noticeService: NoticeService
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
        this.subOnSearch = this.navservice.searchByKeyword.subscribe(async Textsearch => {
            if (Textsearch) {
                await this.navservice.setOnSearch('');
                this.onSearch(Textsearch);
            }
        })
    }

    onSearch(Textsearch: any) {
        this.noticeService.getByKeyword(Textsearch).subscribe(list => {
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
            this.noticeService.getByConAdv(form.value).subscribe(list => {

                this.onSearchComplete(list)

            }, (err: HttpErrorResponse) => {
                alert(err.message);
            });
        }
    }

    onSearchComplete(list: any) {
        this.notice = [];

        if (!list) {
            alert(Message.noRecord);
            return false;
        }

        if (Array.isArray(list)) {
            this.notice = list;
        } else {
            this.notice.push(list);
        }

        // set total record
        // this.invesPaginate.TotalItems = this.notice.length;
    }

    view(noticeCode: string) {
        this._router.navigate([`/notice/manage/v/${noticeCode}`]);
    }

    async pageChanges(event) {

    }

}
