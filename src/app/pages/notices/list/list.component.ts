import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { NoticeService } from '../notice.service';
import { Message } from '../../../config/message';
import { Notice } from '../notice';
import { pagination } from '../../../config/pagination';
import { toLocalShort, compareDate, toLocalNumeric, setZeroHours } from '../../../config/dateFormat';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { SidebarService } from '../../../shared/sidebar/sidebar.component';
import { IMyDateModel, IMyOptions } from 'mydatepicker-th';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit, OnDestroy {

    advSearch: any;
    isRequired = false;
    setDefaultDate: string;
    paginage = pagination;

    notice = new Array<Notice>();
    noticeList = new Array<Notice>();

    dateStartFrom: any;
    dateStartTo: any;

    myDatePickerOptions: IMyOptions = {
        dateFormat: 'dd mmm yyyy',
        showClearDateBtn: false,
        height: '30px'
    };

    private subOnsearchByKeyword: any;
    private subSetNextPage: any;

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

    async ngOnInit() {

        this.sidebarService.setVersion('0.0.0.8');
        this.paginage.TotalItems = 0;

        this.preLoaderService.setShowPreloader(true);
        await this.noticeService.getByKeywordOnInt().then(list => this.onSearchComplete(list));

        this.subOnsearchByKeyword = this.navservice.searchByKeyword.subscribe(async Textsearch => {
            if (Textsearch) {
                await this.navservice.setOnSearch(null);
                this.onSearch(Textsearch);
            }
        })

        this.subSetNextPage = this.navservice.onNextPage.subscribe(async status => {
            if (status) {
                await this.navservice.setOnNextPage(false);
                this._router.navigate(['/notice/manage', 'C', 'NEW']);
            }
        })

        this.preLoaderService.setShowPreloader(false);
    }

    ngOnDestroy(): void {
        this.subOnsearchByKeyword.unsubscribe();
        this.subSetNextPage.unsubscribe();
    }

    async onSearch(Textsearch: any) {
        this.preLoaderService.setShowPreloader(true);
        await this.noticeService.getByKeyword(Textsearch).then(list => this.onSearchComplete(list));
        this.preLoaderService.setShowPreloader(false);
    }

    async onAdvSearch(form: any) {

        if (form.value.DateStartFrom && form.value.DateStartTo) {
            const sDate = form.value.DateStartFrom.date;
            const eDate = form.value.DateStartTo.date;
            const sDateCompare = new Date(`${sDate.year}-${sDate.month}-${sDate.day}`);
            const eDateCompare = new Date(`${eDate.year}-${eDate.month}-${eDate.day}`);

            if (sDateCompare.valueOf() > eDateCompare.valueOf()) {
                alert(Message.checkDate);
                return false;
            }

            form.value.DateStartFrom = setZeroHours(sDateCompare);
            form.value.DateStartTo = setZeroHours(eDateCompare);
        }

        this.preLoaderService.setShowPreloader(true);

        await this.noticeService.getByConAdv(form.value).then(list => this.onSearchComplete(list));

        this.preLoaderService.setShowPreloader(false);
    }

    async onSearchComplete(list: Notice[]) {

        if (!list.length) {
            alert(Message.noRecord)
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

        this.notice = list
        // set total record
        this.paginage.TotalItems = this.notice.length;
    }

    onSDateChange(event: IMyDateModel){
        this.dateStartFrom = event;
        this.checkDate();
    }

    onEDateChange(event: IMyDateModel){
        this.dateStartTo = event;
        this.checkDate();
    }

    checkDate() {
        if (this.dateStartFrom && this.dateStartTo) {
            
            const _sdate = this.dateStartFrom.date;
            const _edate = this.dateStartTo.date;

            const sdate = `${_sdate.year}-${_sdate.month}-${_sdate.day}`;
            const edate = `${_edate.year}-${_edate.month}-${_edate.day}`;

            if (!compareDate(sdate, edate)) {
                alert(Message.checkDate)
                setTimeout(() => {
                    this.dateStartTo = { date: _sdate };
                }, 0);
            }
        }
    }

    view(noticeCode: string) {
        this._router.navigate([`/notice/manage/R/${noticeCode}`]);
    }

    async pageChanges(event) {
        this.noticeList = await this.notice.slice(event.startIndex - 1, event.endIndex);
    }

}
