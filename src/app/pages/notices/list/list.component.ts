import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { NoticeService } from '../notice.service';
import { Message } from 'app/config/message';
import { Notice } from '../notice';
import { pagination } from 'app/config/pagination';
import { toLocalShort } from 'app/config/dateFormat';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

    private subOnSearch: any;
    advSearch: any;

    paginage = pagination;

    notice = new Array<Notice>();
    noticeList = new Array<Notice>();

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
        this.noticeService.getByKeyword(Textsearch).then(list => {
            this.onSearchComplete(list)
        });
    }

    onAdvSearch(form: any) {

        const sDateCompare = new Date(form.value.DateStartFrom);
        const eDateCompare = new Date(form.value.DateStartTo);

        if (sDateCompare.getTime() > eDateCompare.getTime()) {
            alert(Message.checkDate);
        } else {
            form.value.DateStartFrom = sDateCompare.toISOString();
            form.value.DateStartTo = eDateCompare.toISOString();
            this.noticeService.getByConAdv(form.value).then(list => {
                this.onSearchComplete(list)
            });
        }
    }

    async onSearchComplete(list: Notice[]) {
        this.notice = [];

        if (!list.length) {
            alert(Message.noRecord);
            return false;
        }

        await list.map(item => {
            item.NoticeDate = toLocalShort(item.NoticeDate);
            item.Noticestaff.map(s => {
                s.StaffFullName = `${s.TitleName} ${s.FirstName} ${s.LastName}`;
            });
            item.NoticeSuspect.map(s => {
                s.SuspectFullName = `${s.SuspecTitleName} ${s.SuspectFirstName} ${s.SuspectLastName}`;
            })
        })

        // set total record
        this.paginage.TotalItems = this.notice.length;
    }

    view(noticeCode: string) {
        this._router.navigate([`/notice/manage/R/${noticeCode}`]);
    }

    async pageChanges(event) {
        this.noticeList = await this.notice.slice(event.startIndex - 1, event.endIndex);
    }

}
