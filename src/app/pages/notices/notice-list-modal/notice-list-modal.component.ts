import { Component, OnInit, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { NoticeService } from '../notice.service';
import { pagination } from '../../../config/pagination';
import { Router } from '../../../../../node_modules/@angular/router';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { Message } from 'app/config/message';
import { Notice } from '../notice';
import { toLocalShort } from 'app/config/dateFormat';

@Component({
    selector: 'app-notice-list-modal',
    templateUrl: './notice-list-modal.component.html',
    styleUrls: ['./notice-list-modal.component.scss']
})
export class NoticeListModalComponent implements OnInit {

    isOpen = false;
    isCheckAll = false;
    advSearch = false;
    isRequired = false;
    notice = Array<Notice>();
    noticeList = Array<Notice>();

    paginage = pagination;

    @Output() d = new EventEmitter();
    @Output() c = new EventEmitter();

    constructor(
        private noticeService: NoticeService,
        private _router: Router,
        private preLoaderService: PreloaderService
    ) {

    }

    ngOnInit() {
    }

    async onSearch(Textsearch: any) {
        this.preLoaderService.setShowPreloader(true);
        await this.noticeService.getByKeyword(Textsearch).then(list => this.onSearchComplete(list));
        this.preLoaderService.setShowPreloader(false);
    }

    async onAdvSearch(form: any) {

        if (!form.valid) {
            this.isRequired = true;
            return false;
        }

        const sDateCompare = new Date(form.value.DateStartFrom);
        const eDateCompare = new Date(form.value.DateStartTo);

        if (sDateCompare.getTime() > eDateCompare.getTime()) {
            alert(Message.checkDate);
        } else {
            this.preLoaderService.setShowPreloader(true);

            form.value.DateStartFrom = sDateCompare.toISOString();
            form.value.DateStartTo = eDateCompare.toISOString();
            await this.noticeService.getByConAdv(form.value).then(list => this.onSearchComplete(list));

            this.preLoaderService.setShowPreloader(false);
        }
    }

    async onSearchComplete(list: Notice[]) {

        if (!list.length) {
            alert(Message.noRecord);
            return false;
        }

        this.notice = [];
        await list.map(item => {
            item.NoticeDate = toLocalShort(item.NoticeDate);
            item.NoticeStaff.map(s => {
                s.StaffFullName = `${s.TitleName} ${s.FirstName} ${s.LastName}`;
            });
            item.NoticeSuspect.map(s => {
                s.SuspectFullName = `${s.SuspectTitleName} ${s.SuspectFirstName} ${s.SuspectLastName}`;
            })
        })

        this.notice = list
        // set total record
        this.paginage.TotalItems = this.notice.length;
    }

    view(noticeCode: string) {
        this._router.navigate([`/notice/manage/R/${noticeCode}`]);
    }

    checkAll() {
        this.isCheckAll = !this.isCheckAll;
    }

    toggle() {
        this.advSearch = !this.advSearch;
    }

    dismiss(e: any) {
        this.d.emit(e);
    }

    close(e: any) {
        this.c.emit(e);
    }

    async pageChanges(event) {
        this.noticeList = await this.notice.slice(event.startIndex - 1, event.endIndex);
    }

}
