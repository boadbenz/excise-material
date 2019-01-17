import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { IMyOptions, IMyDateModel } from 'mydatepicker-th';
import { pagination } from 'app/config/pagination';
import { NavigationService } from 'app/shared/header-navigation/navigation.service';
import { SidebarService } from 'app/shared/sidebar/sidebar.component';
import { Arrest } from '../../models/arrest';
import { getDateMyDatepicker, compareDate, toLocalShort, convertDateForSave, MyDatePickerOptions } from 'app/config/dateFormat';
import { Message } from 'app/config/message';
import { ArrestService } from '../../services';
import { Subject, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/takeUntil';
import swal from 'sweetalert2'
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit, OnDestroy, DoCheck {


    // private subOnSearch: Subscription;
    // private subSetNextPage: Subscription;
    private destroy$: Subject<boolean> = new Subject<boolean>();

    paginage = pagination;
    dataTable: any;
    advSearch: BehaviorSubject<Boolean>;
    private dateStartFrom: any;
    private dateStartTo: any;
    OccurrenceDateTo: any;

    arrestList = new Array<Arrest>();
    arrest = new Array<Arrest>();

    @ViewChild('arrestTable') arrestTable: ElementRef;
    @ViewChild('advForm') advForm: FormGroup;

    myDatePickerOptions = MyDatePickerOptions;

    constructor(
        private navService: NavigationService,
        private arrestService: ArrestService,
        private router: Router,
        private sidebarService: SidebarService,
        public chRef: ChangeDetectorRef
    ) {
        this.advSearch = this.navService.showAdvSearch;

    }

    async ngOnInit() {
        // set false
        await this.navService.setEditButton(false);
        await this.navService.setDeleteButton(false);
        await this.navService.setPrintButton(false);
        await this.navService.setSaveButton(false);
        await this.navService.setCancelButton(false);
        await this.navService.setNextPageButton(false);
        await this.navService.setPrevPageButton(false);
        // set true
        await this.navService.setSearchBar(true);
        await this.navService.setNewButton(true);
        
        this.advSearch.next(true);

        this.sidebarService.setVersion(this.arrestService.version);

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

    ngDoCheck(): void {
        if (this.advSearch.getValue() == false && this.advForm != undefined) {
            this.advForm.reset();
        };
    }

    onSearch(Textsearch: any) {
        this.arrestService
            .ArrestgetByKeyword(Textsearch)
            .takeUntil(this.destroy$)
            .subscribe((x: Arrest[]) => this.onSearchComplete(x));
    }

    onAdvSearch(form: any) {
        let sdate = getDateMyDatepicker(form.OccurrenceDateFrom);
        let edate = getDateMyDatepicker(form.OccurrenceDateTo);

        if (sdate && edate) {
            if (!compareDate(sdate, edate)) {
                swal('', Message.checkDate, 'warning');
                return
            }
        }

        form.OccurrenceDateFrom = convertDateForSave(sdate) || '';
        form.OccurrenceDateTo = convertDateForSave(edate) || convertDateForSave(new Date());

        this.arrestService
            .ArrestgetByConAdv(form)
            .takeUntil(this.destroy$)
            .subscribe((x: Arrest[]) => this.onSearchComplete(x));
    }

    private onSearchComplete(list: Arrest[]) {
        if (!list.length) {
            swal('', Message.noRecord, 'warning');
            return false;
        }
        this.arrest = [];
        let rows = list.map((p, i) => {
            p.RowsId = i + 1;
            p.OccurrenceDate = toLocalShort(p.OccurrenceDate);
            let staff = p.ArrestStaff
                .filter(staff => staff.ContributorID == '6' || staff.ContributorCode == '6')
                .map(staff => {
                    staff.FullName = `${staff.TitleName} ${staff.FirstName} ${staff.LastName}`;
                    return staff;
                });
            p.ArrestStaff = staff;
            return p;
        })

        this.arrest = rows;
        this.arrestList =  this.arrest.slice(0, 5);
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
                swal('', Message.checkDate, 'warning')
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
        this.advSearch.next(false);
    }
}
