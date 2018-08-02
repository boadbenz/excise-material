import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { NoticeService } from '../notice.service';
import { Message } from '../../../config/message';
<<<<<<< HEAD
import { HttpErrorResponse } from '@angular/common/http';
import { Notice } from '../notice';
import { pagination } from '../../../config/pagination';
=======
import { Notice } from '../notice';
import { pagination } from '../../../config/pagination';
import { toLocalShort } from '../../../config/dateFormat';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { SidebarService } from '../../../shared/sidebar/sidebar.component';
>>>>>>> FL_J

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

    private subOnSearch: any;
    advSearch: any;
    isRequired = false;

    paginage = pagination;
    
    notice = new Array<Notice>();

    @ViewChild('noticeTable') noticeTable: ElementRef;

    constructor(
        private _router: Router,
        private navservice: NavigationService,
        private noticeService: NoticeService,
        private preLoaderService: PreloaderService,
        private sidebarService: SidebarService
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

<<<<<<< HEAD
    ngOnInit() {
        this.subOnSearch = this.navservice.searchByKeyword.subscribe(async Textsearch => {
=======
    async ngOnInit() {

        this.sidebarService.setVersion('1.01');
        this.paginage.TotalItems = 0;

        this.preLoaderService.setShowPreloader(true);
        await this.noticeService.getByKeywordOnInt().then(list => this.onSearchComplete(list));
        this.preLoaderService.setShowPreloader(false);

        this.navservice.searchByKeyword.subscribe(async Textsearch => {
>>>>>>> FL_J
            if (Textsearch) {
                await this.navservice.setOnSearch(null);
                this.onSearch(Textsearch);
            }
        })

        this.preLoaderService.setShowPreloader(false);
    }

<<<<<<< HEAD
    onSearch(Textsearch: any) {
        this.noticeService.getByKeyword(Textsearch).subscribe(list => {
            this.onSearchComplete(list)
        }, (err: HttpErrorResponse) => {
            alert(err.message);
        });
=======
    async onSearch(Textsearch: any) {
        this.preLoaderService.setShowPreloader(true);
        await this.noticeService.getByKeyword(Textsearch).then(list => this.onSearchComplete(list));
        this.preLoaderService.setShowPreloader(false);
>>>>>>> FL_J
    }

    async onAdvSearch(form: any) {

        if (!form.valid) {
            this.isRequired = true;
            return false;
        }

        const sDateCompare = new Date(form.value.DateStartFrom);
        const eDateCompare = new Date(form.value.DateStartTo);

        if (sDateCompare.valueOf() > eDateCompare.valueOf()) {
            alert(Message.checkDate);
        } else {
<<<<<<< HEAD
            form.value.DateStartFrom = sDateCompare.getTime();
            form.value.DateStartTo = eDateCompare.getTime();
            this.noticeService.getByConAdv(form.value).subscribe(list => {

                this.onSearchComplete(list)

            }, (err: HttpErrorResponse) => {
                alert(err.message);
            });
=======
            this.preLoaderService.setShowPreloader(true);

            form.value.DateStartFrom = sDateCompare.toISOString();
            form.value.DateStartTo = eDateCompare.toISOString();
            await this.noticeService.getByConAdv(form.value).then(list => this.onSearchComplete(list));

            this.preLoaderService.setShowPreloader(false);
>>>>>>> FL_J
        }
    }

    onSearchComplete(list: any) {
        this.notice = [];

<<<<<<< HEAD
        if (!list) {
            alert(Message.noRecord);
            return false;
        }

        if (Array.isArray(list)) {
            this.notice = list;
        } else {
            this.notice.push(list);
        }
=======
        if (!list.length) {
            return false;
        }

        this.notice = [];
        await list.map((item, i) => {
            item.RowId = i + 1;
            item.NoticeDate = toLocalShort(item.NoticeDate);
            item.NoticeStaff.map(s => {
                s.StaffFullName = `${s.TitleName} ${s.FirstName} ${s.LastName}`;
            });
            item.NoticeSuspect.map(s => {
                s.SuspectFullName = `${s.SuspectTitleName} ${s.SuspectFirstName} ${s.SuspectLastName}`;
            })
        })
>>>>>>> FL_J

        // set total record
        // this.invesPaginate.TotalItems = this.notice.length;
    }

    view(noticeCode: string) {
        this._router.navigate([`/notice/manage/v/${noticeCode}`]);
    }

    async pageChanges(event) {

    }

}
