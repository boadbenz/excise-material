import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { ArrestsService } from '../arrests.service';
import { Arrest } from '../arrest';
import { Message } from '../../../config/message';
import { toLocalShort, toLocalNumeric, resetLocalNumeric, compareDate } from '../../../config/dateFormat';
import { pagination } from '../../../config/pagination';
import { SidebarService } from '../../../shared/sidebar/sidebar.component';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { IMyOptions, IMyDateModel } from 'mydatepicker-th';
@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit, OnDestroy {

    private subOnSearch: any;
    private subSetNextPage: any;
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
        private arrestService: ArrestsService,
        private router: Router,
        private sidebarService: SidebarService,
        private preLoader: PreloaderService,
        public chRef: ChangeDetectorRef
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

    async ngOnInit() {
        this.sidebarService.setVersion('1.04');

        this.onSearch('');

        this.subOnSearch = this.navService.searchByKeyword.subscribe(async Textsearch => {
            if (Textsearch) {
                await this.navService.setOnSearch('');
                this.onSearch(Textsearch);
            }
        })

        this.subSetNextPage = this.navService.onNextPage.subscribe(async status => {
            if (status) {
                await this.navService.setOnNextPage(false);
                this.router.navigate(['/arrest/manage', 'C', 'NEW']);
            }
        })
    }

    async onSearch(Textsearch: any) {
        this.paginage.TotalItems = 0;
        this.preLoader.setShowPreloader(true);
        await this.arrestService.getByKeyword(Textsearch).then(res => this.onSearchComplete(res));
        this.preLoader.setShowPreloader(false);
    }

    async onAdvSearch(form: any) {

        if (form.value.OccurrenceDateFrom && form.value.OccurrenceDateTo) {
            const sDate = form.value.OccurrenceDateFrom.date;
            const eDate = form.value.OccurrenceDateTo.date;
            const sDateCompare = new Date(`${sDate.year}-${sDate.month}-${sDate.day}`);
            const eDateCompare = new Date(`${eDate.year}-${eDate.month}-${eDate.day}`);

            if (sDateCompare.valueOf() > eDateCompare.valueOf()) {
                alert(Message.checkDate);
                return
            }

            form.value.OccurrenceDateFrom = sDateCompare.toISOString();
            form.value.OccurrenceDateTo = eDateCompare.toISOString();
        }

        this.paginage.TotalItems = 0;        

        this.preLoader.setShowPreloader(true);
        console.log('===================');
        console.log(form.value);
        console.log('===================');
        await this.arrestService.getByConAdv(form.value).then(res => this.onSearchComplete(res));
        this.preLoader.setShowPreloader(false);

    }

    onSearchComplete(list: Arrest[]) {
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
        this.dateStartFrom = event.date
        this.checkDate();
    }

    onEDateChange(event: IMyDateModel) {
        this.dateStartTo = event.date
        this.checkDate()
    }

    checkDate() {
        if (this.dateStartFrom && this.dateStartTo) {
            const sdate = `${this.dateStartFrom.year}-${this.dateStartFrom.month}-${this.dateStartFrom.day}`;
            const edate = `${this.dateStartTo.year}-${this.dateStartTo.month}-${this.dateStartTo.day}`;

            if (!compareDate(sdate, edate)) {
                alert(Message.checkDate)
                setTimeout(() => {
                    this.OccurrenceDateTo = { date: this.dateStartFrom };
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
        this.subOnSearch.unsubscribe();
        this.subSetNextPage.unsubscribe();
    }
}
