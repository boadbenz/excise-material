//#region "Imports"
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { IncomeService } from '../income.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Revenue } from '../Revenue';
import { pagination } from '../../../config/pagination';
import { Message } from '../../../config/message';
import { toLocalShort, compareDate, setZeroHours, getDateMyDatepicker, MyDatePickerOptions } from '../../../config/dateFormat';
import { IMyDateModel, IMyOptions } from 'mydatepicker-th';
import { SidebarService } from '../../../shared/sidebar/sidebar.component';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { MatAutocomplete } from '@angular/material';
//#endregion

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit, OnDestroy {

    //#region "Variables"
    
    advSearch: any;
    revenue = new Array<Revenue>();
    RevenueList = new Array<Revenue>();
    paginage = pagination;
    DateStartFrom: any;
    DateStartTo: any;
    _dateStartFrom: any;
    _dateStartTo: any;

    showEditField: any;
    DepartmentName: string;

    RevenueStatus: any;
    StatusOption = [];
    options = [];
    rawOptions = [];

    myDatePickerOptions = MyDatePickerOptions;

    private subOnSearch: any;
    private subSetNextPage: any;

    @ViewChild('revenueTable') revenueTable: ElementRef;

    //#endregion

    //#region "Ng"
    
    constructor(
        private _router: Router,
        private navService: NavigationService,
        private sidebarService: SidebarService,
        private incomeService: IncomeService,
        private preloader: PreloaderService
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
        this.sidebarService.setVersion('Revenue 0.0.0.1');

        this.preloader.setShowPreloader(true);

        this.getDepartmentRevenue();
        // this.onSearch({ Textsearch: "" });

        // this.subOnSearch = await this.navService.searchByKeyword.subscribe(async Textsearch => {
        //     if (Textsearch) {
        //         await this.navService.setOnSearch('');

        //         let ts;
        //         ts = { Textsearch: "" }
        //         ts = Textsearch;

        //         if (ts.Textsearch == null) { this.onSearch({ Textsearch: "" }); }
        //         else { this.onSearch(Textsearch); }

        //     }
        // })

        // this.subSetNextPage = this.navService.onNextPage.subscribe(async status => {
        //     if (status) {
        //         await this.navService.setOnNextPage(false);
        //         this._router.navigate(['/income/manage', 'C', 'NEW']);
        //     }
        // })
    }

    ngOnDestroy(): void {
        this.subOnSearch.unsubscribe();
        this.subSetNextPage.unsubscribe();
    }

    //#endregion

    //#region "Getter"

    getCurrentDate() {
        let date = new Date();
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).toISOString().substring(0, 10);
    }

    async getDepartmentRevenue() {
        await this.incomeService.getDepartment().then(async res => {
            if (res) {
                this.rawOptions = res;
            }
        }, (err: HttpErrorResponse) => {
            this.preloader.setShowPreloader(false);
        });
    }


    //#endregion
    
    //#region "Others"

    clickView(RevenueCode: string) {
        this._router.navigate([`/income/manage/R/${RevenueCode}`]);
    }

    async pageChanges(event) {
        this.RevenueList = await this.revenue.slice(event.startIndex - 1, event.endIndex);
    }


    

    

    checkDateDelivery() {
        if (this._dateStartFrom && this._dateStartTo) {
            const sdate = getDateMyDatepicker(this._dateStartFrom);
            const edate = getDateMyDatepicker(this._dateStartTo);

            if (!compareDate(new Date(sdate), new Date(edate))) {
                alert(Message.checkDate)
                setTimeout(() => {
                    this.DateStartTo = { date: this._dateStartFrom.date };
                }, 0);
            }
        }
    }

    //#endregion
    
    //#region "Events"

    onAutoChange(value: string) {
        // 
        if (value == '') {
            this.options = [];

            // this.oProve.ProveStationCode = "";
            // this.oProve.ProveStation = "";
        } else {
            this.options = this.rawOptions.filter(f => f.DepartmentNameTH.toLowerCase().indexOf(value.toLowerCase()) > -1);
            debugger
        }
    }

    onAutoFocus(value: string) {
        if (value == '') {
            this.options = [];
        }
    }

    onAutoSelecteWord(event) {
        // this.oProve.ProveStationCode = event.OfficeCode;
        // this.oProve.ProveStation = event.OfficeName;
    }

    onSDateChange(event: IMyDateModel) {
        this._dateStartFrom = event.date;
        this.checkDateDelivery();
    }

    onEDateChange(event: IMyDateModel) {
        this._dateStartTo = event.date;
        if (this.checkDateDelivery()) {

        }
    }

    onSearch(Textsearch: any) {
        this.incomeService.getByKeyword(Textsearch).subscribe(list => {
            this.onSearchComplete(list)

            this.preloader.setShowPreloader(false);
        }, (err: HttpErrorResponse) => {
            alert(Message.noRecord);
            this.preloader.setShowPreloader(true);
        });
    }

    async onAdvSearch(form: any) {
        this.preloader.setShowPreloader(true);
        let sDate, eDate, sDateRevenue, eDateRevenue;

        if (form.value.DateStartFrom) {
            sDate = form.value.DateStartFrom.date;

            if (sDate != undefined) {
                sDateRevenue = new Date(`${sDate.year}-${sDate.month}-${sDate.day}`);
                form.value.DateStartFrom = setZeroHours(sDateRevenue);
            }
        }

        if (form.value.DateStartTo) {
            eDate = form.value.DateStartTo.date;

            if (sDate != undefined) {
                eDateRevenue = new Date(`${eDate.year}-${eDate.month}-${eDate.day}`);
                form.value.DateStartTo = setZeroHours(eDateRevenue);
            }
        }


        await this.incomeService.getByConAdv(form.value).then(async list => {
            this.onSearchComplete(list);
            this.preloader.setShowPreloader(false);
        }, (err: HttpErrorResponse) => {
            alert(err.message);
            this.preloader.setShowPreloader(false);
        });
    }

    async onSearchComplete(list: any) {
        this.revenue = [];

        if (!list.length) {
            alert(Message.noRecord);
            return false;
        }

        await list.map((item) => {
            item.RevenueDate = toLocalShort(item.RevenueDate);
            item.RevenueOneStaff = item.RevenueStaff.filter(item => item.ContributorCode === '20');

            debugger
            if (item.RevenueDetail.length > 0) {
                if (item.RevenueDetail[0].RevenueStatus == "0") {
                    item.RevenueDetail[0].RevenueStatus = "ยังไม่นำส่งเงินรายได้"
                }
                else if (item.RevenueDetail[0].RevenueStatus == "0") {
                    item.RevenueDetail[0].RevenueStatus = "นำส่งเงินรายได้"
                }
                else {
                    item.RevenueDetail[0].RevenueStatus = "รับรายการนำส่งเงิน"
                }
            }

        })

        if (Array.isArray(list)) {
            this.revenue = list;
        } else {
            this.revenue.push(list);
        }

        // set total record
        this.paginage.TotalItems = this.revenue.length;
        this.RevenueList = this.revenue.slice(0, this.paginage.RowsPerPageOptions[0]);
    }

    //#endregion

}
