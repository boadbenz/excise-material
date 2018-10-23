import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { IMyOptions, IMyDateModel } from 'mydatepicker-th';
import { pagination } from 'app/config/pagination';
import { NavigationService } from 'app/shared/header-navigation/navigation.service';
import { SidebarService } from 'app/shared/sidebar/sidebar.component';
import { Arrest } from '../../models/arrest';
import { getDateMyDatepicker, compareDate, toLocalShort, convertDateForSave } from 'app/config/dateFormat';
import { Message } from 'app/config/message';
import { ArrestService } from '../../services';
import { Subscription, Subject } from 'rxjs';
import 'rxjs/add/operator/takeUntil';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit, OnDestroy {

    // private subOnSearch: Subscription;
    // private subSetNextPage: Subscription;
    private destroy$: Subject<boolean> = new Subject<boolean>();

    paginage = pagination;
    dataTable: any;
    advSearch: any;
    private dateStartFrom: any;
    private dateStartTo: any;
    OccurrenceDateTo: any;

    arrestList = new Array<Arrest>();
    arrest = new Array<Arrest>();

    @ViewChild('arrestTable') arrestTable: ElementRef;

    myDatePickerOptions: IMyOptions = {
        dateFormat: 'dd mmm yyyy',
        showClearDateBtn: false,
        height: '30px'
    };

    constructor(
        private navService: NavigationService,
        private arrestService: ArrestService,
        private router: Router,
        private sidebarService: SidebarService,
        public chRef: ChangeDetectorRef
    ) {
        // set false
        this.navService.setEditButton(false);
        this.navService.setDeleteButton(false);
        this.navService.setPrintButton(false);
        this.navService.setSaveButton(false);
        this.navService.setCancelButton(false);
        this.navService.setNextPageButton(false);
        this.navService.setPrevPageButton(false);
        // set true
        this.navService.setSearchBar(true);
        this.navService.setNewButton(true);
        this.advSearch = this.navService.showAdvSearch;

    }

    async ngOnInit() {
        this.sidebarService.setVersion('0.0.0.19');

        this.navService.searchByKeyword
            .takeUntil(this.destroy$)
            .subscribe(async Textsearch => {
                if (Textsearch) {
                    await this.navService.setOnSearch('');
                    this.onSearch(Textsearch);
                }
            })

        this.navService.onNextPage
            .takeUntil(this.destroy$)
            .subscribe(async status => {
                if (status) {
                    await this.navService.setOnNextPage(false);
                    this.router.navigate(['/arrest/manage', 'C', 'NEW']);
                }
            })
    }

    onSearch(Textsearch: any) {
        this.arrestService
            .ArrestgetByKeyword(Textsearch)
            .takeUntil(this.destroy$)
            .subscribe((x: Arrest[]) => this.onSearchComplete(x));
    }

    onAdvSearch(form: any) {
        const sdate = getDateMyDatepicker(form.OccurrenceDateFrom);
        const edate = getDateMyDatepicker(form.OccurrenceDateTo);

        if (sdate && edate) {
            if (!compareDate(sdate, edate)) {
                alert(Message.checkDate);
                return
            }
        }

        form.OccurrenceDateFrom = convertDateForSave(sdate) || '';
        form.OccurrenceDateTo = convertDateForSave(edate) || '';

        this.arrestService
            .ArrestgetByConAdv(form)
            .takeUntil(this.destroy$)
            .subscribe((x: Arrest[]) => this.onSearchComplete(x));
    }

    private onSearchComplete(list: Arrest[]) {
        if (!list.length) {
            alert(Message.noRecord);
            return false;
        }
        this.arrest = [];
        list.map((p, i) => {
            p.RowsId = i + 1;
            p.OccurrenceDate = toLocalShort(p.OccurrenceDate);
            p.ArrestStaff.map(staff => {
                staff.FullName = `${staff.TitleName} ${staff.FirstName} ${staff.LastName}`;
            });
        })
        this.arrest = list;
        // set total record
        this.paginage.TotalItems = this.arrest.length;

    }

    onSDateChange(event: IMyDateModel) {
        this.dateStartFrom = event
        this.checkDate();
    }

    onEDateChange(event: IMyDateModel) {
        this.dateStartTo = event
        this.checkDate()
    }

    checkDate() {
        if (this.dateStartFrom && this.dateStartTo) {

            const sdate = getDateMyDatepicker(this.dateStartFrom);
            const edate = getDateMyDatepicker(this.dateStartTo);

            if (!compareDate(sdate, edate)) {
                alert(Message.checkDate)
                setTimeout(() => {
                    this.OccurrenceDateTo = { date: this.dateStartFrom.date };
                }, 0);
            }
        }
    }

    clickView(code: string) {
        this.router.navigate([`/arrest/manage/R/${code}`]);
    }

    async pageChanges(event: any) {
        this.arrestList = await this.arrest.slice(event.startIndex - 1, event.endIndex);
    }

    ngOnDestroy() {
        this.paginage.TotalItems = 0;
        // this.subOnSearch.unsubscribe();
        // this.subSetNextPage.unsubscribe();
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
        this.advSearch = false;
    }
}
