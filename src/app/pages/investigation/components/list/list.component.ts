import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Message } from 'app/config/message';
import { pagination } from 'app/config/pagination';
import { NavigationService } from 'app/shared/header-navigation/navigation.service';
import { SidebarService } from 'app/shared/sidebar/sidebar.component';
import { PreloaderService } from 'app/shared/preloader/preloader.component';
import * as fromServices from '../../services';
import * as fromModels from '../../models';
import { IMyOptions, IMyDateModel } from 'mydatepicker-th';
import { compareDate, getDateMyDatepicker, toLocalShort, convertDateForSave, MyDatePickerOptions } from 'app/config/dateFormat';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit, OnDestroy {

    private staffCode = '134194';

    private destroy$: Subject<boolean> = new Subject<boolean>();

    _dateStartFrom: any;
    _dateStartTo: any;
    DateStartTo: any;

    advSearch: any;
    investigate = new Array<fromModels.InvestigateList>();
    invesList = new Array<fromModels.InvestigateList>();
    paginage = pagination;
    myDatePickerOptions = MyDatePickerOptions;

    @ViewChild('invesTable') invesTable: ElementRef;

    constructor(
        private navService: NavigationService,
        private s_invest: fromServices.InvestgateService,
        private router: Router,
        private sidebarService: SidebarService,
        private preLoader: PreloaderService
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
        this.advSearch.next(true)
        this.sidebarService.setVersion(this.s_invest.version);

        this.navService.searchByKeyword.subscribe(async Textsearch => {
            if (Textsearch) {
                await this.navService.setOnSearch('');
                this.onSearch(Textsearch);
            }
        })

        this.navService.onNextPage.subscribe(async status => {
            if (status) {
                await this.navService.setOnNextPage(false);
                this.router.navigate([`/investigation/manage/C/NEW`]);
            }
        })

    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
        this.paginage.TotalItems = 0;
    }

    onSearch(form: any) {

        this.s_invest.InvestigateListgetByKeyword(form.Textsearch, this.staffCode)
            .takeUntil(this.destroy$)
            .subscribe(x => this.onSearchComplete(x))

    }

    onAdvSearch(form: any) {
        const sdate = getDateMyDatepicker(form.DateStart);
        const edate = getDateMyDatepicker(form.DateEnd);

        if (sdate && edate) {
            if (!compareDate(sdate, edate)) {
                alert(Message.checkDate);
                return
            }
        }

        form.DateStart = sdate || '';
        form.DateEnd = edate || '';

        console.log(JSON.stringify(form));
        
        this.s_invest.InvestigateListgetByConAdv(form)
            .takeUntil(this.destroy$)
            .subscribe(list => {
                this.onSearchComplete(list)
            }, (err: HttpErrorResponse) => {
                alert(Message.noRecord);
            });
    }

    onSearchComplete(list: fromModels.InvestigateList[]) {
        this.investigate = [];

        if (!list.length) {
            alert(Message.noRecord);
            return false;
        }

        let rows = list.map((p, i) => {
            p.RowsId = i + 1;
            p.DateStart = toLocalShort(p.DateStart);
            p.DateEnd = toLocalShort(p.DateEnd);
            return p;
        })

        this.investigate = rows;
        // set total record
        this.paginage.TotalItems = this.investigate.length;
    }

    onSDateChange(event: IMyDateModel) {
        this._dateStartFrom = event
        this.checkDate();
    }

    onEDateChange(event: IMyDateModel) {
        this._dateStartTo = event
        this.checkDate()
    }

    checkDate() {
        if (this._dateStartFrom && this._dateStartTo) {

            const sdate = getDateMyDatepicker(this._dateStartFrom);
            const edate = getDateMyDatepicker(this._dateStartTo);

            if (!compareDate(sdate, edate)) {
                alert(Message.checkDate)
                setTimeout(() => {
                    this.DateStartTo = { date: this._dateStartFrom.date };
                }, 0);
            }
        }
    }

    clickView(invesCode: string) {
        this.router.navigate([`/investigation/manage/R/${invesCode}`]);
    }

    async pageChanges(event) {
        this.invesList = await this.investigate.slice(event.startIndex - 1, event.endIndex);
    }
}
