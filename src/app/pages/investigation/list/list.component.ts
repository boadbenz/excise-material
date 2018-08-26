import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { InvestigateService } from '../investigate.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Investigate } from '../investigate';
import { pagination } from '../../../config/pagination';
import { Message } from '../../../config/message';
import { getDateMyDatepicker, compareDate, MyDatePickerOptions, toLocalShort } from 'app/config/dateFormat';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { IMyDateModel } from 'mydatepicker-th';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

    advSearch: any;
    investigate = new Array<Investigate>();
    invesList = new Array<Investigate>();
    paginage = pagination;

    myDatePickerOptions = MyDatePickerOptions;

    dateStartFrom: any;
    dateStartTo: any;

    private subOnSearch: any;

    @ViewChild('invesTable') invesTable: ElementRef;

    constructor(
        private navService: NavigationService,
        private invesService: InvestigateService,
        private router: Router,
        private preLoaderService: PreloaderService,
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

        this.preLoaderService.setShowPreloader(true);
        await this.invesService.getByKeyword('').then(list => this.onSearchComplete(list));
        this.preLoaderService.setShowPreloader(false);

        this.subOnSearch = this.navService.searchByKeyword.subscribe(async Textsearch => {
            if (Textsearch) {
                await this.navService.setOnSearch('');

                this.onSearch(Textsearch);
            }
        })
    }

    ngOnDestroy(): void {
        this.subOnSearch.unsubscribe();
    }

    async onSearch(Textsearch: any) {
        this.preLoaderService.setShowPreloader(true);
        await this.invesService.getByKeyword(Textsearch).then(list => this.onSearchComplete(list));
        this.preLoaderService.setShowPreloader(false);
    }

    onAdvSearch(form: any) {

        const sDateCompare = new Date(form.value.DateStartFrom);
        const eDateCompare = new Date(form.value.DateStartTo);

        if (sDateCompare.getTime() > eDateCompare.getTime()) {
            alert(Message.checkDate);
        } else {
            form.value.DateStartFrom = sDateCompare.getTime();
            form.value.DateStartTo = eDateCompare.getTime();
            this.invesService.getByConAdv(form.value).subscribe(list => {

                this.onSearchComplete(list)

            }, (err: HttpErrorResponse) => {
                alert(err.message);
            });
        }
    }

    async onSearchComplete(list: Investigate[]) {
        if (!list.length) {
            alert(Message.noRecord);
            return false;
        }
        
        await list
            .filter(item => item.IsActive == 1)
            .map(item => {
                item.DateStart = toLocalShort(item.DateStart);
                item.DateEnd = toLocalShort(item.DateEnd);
            })

        this.investigate = list;
        this.paginage.TotalItems = this.investigate.length;
    }

    clickView(invesCode: string) {
        this.router.navigate([`/investigation/manage/R/${invesCode}`]);
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

    async pageChanges(event) {
        this.invesList = await this.investigate.slice(event.startIndex - 1, event.endIndex);
    }
}
