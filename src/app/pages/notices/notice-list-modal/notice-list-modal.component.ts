import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { NoticeService } from '../notice.service';
import { pagination } from '../../../config/pagination';
import { Router } from '@angular/router';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { Message } from '../../../config/message';
import { Notice } from '../notice';
import { toLocalShort } from '../../../config/dateFormat';

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
    isNoRecord = false;
    notice = new Array<Notice>();
    noticeList = new Array<Notice>();
    msgNorecord = Message.noRecord;

    paginage = pagination;

    @Output() d = new EventEmitter();
    @Output() c = new EventEmitter();
    @Output() noticeCode = new EventEmitter<string>();

    @ViewChild('noticeTable') noticeTable: ElementRef

    constructor(
        private noticeService: NoticeService,
        private _router: Router,
        private preLoaderService: PreloaderService
    ) { }

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

        if (sDateCompare.getTime() >= eDateCompare.getTime()) {
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
        this.notice = [];
        await list.map(item => {
            item.IsNoticeCode = null;
            item.NoticeDate = toLocalShort(item.NoticeDate);
            item.NoticeStaff.map(s => {
                s.StaffFullName = `${s.TitleName} ${s.FirstName} ${s.LastName}`;
            });
            item.NoticeSuspect.map(s => {
                s.SuspectFullName = `${s.SuspectTitleName} ${s.SuspectFirstName} ${s.SuspectLastName}`;
            })
        })

        this.notice = list;
        // set total record
        this.paginage.TotalItems = list.length;
    }

    view(code: string) {
        this.dismiss('Cross click');
        this._router.navigate([`/notice/manage/R/${code}`]);
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

    async close(e: any) {
        const code = await this.noticeList.find(item => item.IsNoticeCode !== '').NoticeCode;
        this.noticeCode.emit(code);
        this.c.emit(e);
    }

    async pageChanges(event) {
        this.noticeList = await this.notice.slice(event.startIndex - 1, event.endIndex);
    }

}
