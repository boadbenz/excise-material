import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { NoticeService } from '../notice.service';
import { Message } from '../../../config/message';
import { Notice } from '../notice';
import { pagination } from '../../../config/pagination';
import { toLocalShort, compareDate, toLocalNumeric, setZeroHours, getDateMyDatepicker, setDateMyDatepicker } from '../../../config/dateFormat';
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

    notice = [];
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

        this.sidebarService.setVersion('0.0.2.12');
        this.paginage.TotalItems = 0;

        // this.preLoaderService.setShowPreloader(true);
        // await this.noticeService.getByKeywordOnInt().then(list => this.onSearchComplete(list));

        this.subOnsearchByKeyword = this.navservice.searchByKeyword.subscribe(async Textsearch => {
            if (Textsearch) {
                await this.navservice.setOnSearch('');
                this.onSearch(Textsearch);
            }
        })

        this.subSetNextPage = this.navservice.onNextPage.subscribe(async status => {
            if (status) {
                await this.navservice.setOnNextPage(false);
                this._router.navigate(['/notice/manage', 'C', 'NEW']);
            }
        })

        // this.preLoaderService.setShowPreloader(false);
    }

    ngOnDestroy(): void {
        if (this.subOnsearchByKeyword)
            this.subOnsearchByKeyword.unsubscribe();

        if (this.subSetNextPage)
            this.subSetNextPage.unsubscribe();
    }

    async onSearch(Textsearch: any) {
        this.preLoaderService.setShowPreloader(true);
        await this.noticeService.getByKeyword(Textsearch).then(list => this.onSearchComplete(list));
        this.preLoaderService.setShowPreloader(false);
    }

    async onAdvSearch(form: any) {

        if (form.value.DateStartFrom && form.value.DateStartTo) {

            const sdate = getDateMyDatepicker(form.value.dateStartFrom);
            const edate = getDateMyDatepicker(form.value.dateStartTo);

            if (!compareDate(sdate, edate)) {
                alert(Message.checkDate);
                return false;
            }

            form.value.DateStartFrom = setZeroHours(sdate);
            form.value.DateStartTo = setZeroHours(edate);
        }

        this.preLoaderService.setShowPreloader(true);

        await this.noticeService.getByConAdv(form.value).then(list => this.onSearchComplete(list));

        this.preLoaderService.setShowPreloader(false);
    }

    async onSearchComplete(list) {
        if (list === undefined) {
            alert(Message.noRecord)
            return false;
        }

        // await list
        //     .filter(item => item.IsActive == 1)
        //     .map((item, i) => {
        //         item.RowId = i + 1;
        //         item.NoticeDate = toLocalShort(item.NoticeDate);
        //         item.NoticeStaff
        //             .filter(_s => _s.IsActive == 1)
        //             .map(s => {
        //                 s.StaffFullName = `${s.TitleName} ${s.FirstName} ${s.LastName}`;
        //             });
        //         item.NoticeSuspect
        //             .filter(_s => _s.IsActive == 1)
        //             .map(s => {
        //                 s.SuspectFullName = `${s.SuspectTitleName} ${s.SuspectFirstName} ${s.SuspectLastName}`;
        //             })
        //     })

        this.notice.push({
            NoticeCode: list.NoticeCode,
            NoticeDate: list.NoticeDate,
            StaffTitleName: list.StaffTitleName,
            StaffFirstName: list.StaffFirstName,
            StaffLastName: list.StaffLastName,
            StaffOfficeName: list.StaffOfficeName,
            SuspectTitleName: list.SuspectTitleName,
            SuspectFirstName: list.SuspectFirstName,
            SuspectMiddleName: list.SuspectMiddleName,
            SuspectLastName: list.SuspectLastName,
        })
        console.log(this.notice)
        // set total record
        // this.paginage.TotalItems = this.notice.length;
    }

    onSDateChange(event: IMyDateModel) {
        this.dateStartFrom = event;
        this.checkDate();
    }

    onEDateChange(event: IMyDateModel) {
        this.dateStartTo = event;
        this.checkDate();
    }

    checkDate() {
        if (this.dateStartFrom && this.dateStartTo) {

            const _sdate = this.dateStartFrom;
            const sdate = getDateMyDatepicker(this.dateStartFrom);
            const edate = getDateMyDatepicker(this.dateStartTo);

            if (!compareDate(sdate, edate)) {
                alert(Message.checkDate)
                setTimeout(() => {
                    this.dateStartTo = { date: _sdate.date };
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
