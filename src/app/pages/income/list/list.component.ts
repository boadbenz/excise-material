import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { IncomeService } from '../income.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Revenue } from '../revenue';
import { pagination } from '../../../config/pagination';
import { Message } from '../../../config/message';
import { toLocalShort, compareDate, setZeroHours } from '../../../config/dateFormat';
import { IMyDateModel, IMyOptions } from 'mydatepicker-th';
import { SidebarService } from '../../../shared/sidebar/sidebar.component';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { MatAutocomplete } from '@angular/material';
import swal from 'sweetalert2';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit, OnDestroy {

    advSearch: any;
    revenue = new Array<Revenue>();
    RevenueList = new Array<Revenue>();
    paginage = pagination;
    DateStartTo: any;
    _dateStartFrom: any;
    _dateStartTo: any;

    StatusOption = [];
    options = [];
    rawOptions = [];
    RevenueStatus: string;

    private subOnSearch: any;
    private subSetNextPage: any;

    @ViewChild('revenueTable') revenueTable: ElementRef;

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
        this.sidebarService.setVersion('Revenue 0.0.0.26');
        this.RevenueStatus = "";
        //this.advSearch.next(true);
        //this.preloader.setShowPreloader(true);

        //this.getDepartmentRevenue();
        //this.onSearch({ Textsearch: "" });

        this.subOnSearch = await this.navService.searchByKeyword.subscribe(async Textsearch => {
            if (Textsearch) {               
                await this.navService.setOnSearch('');

                let ts;
                ts = { Textsearch: "" }
                ts = Textsearch;

                if (ts.Textsearch == null) { this.onSearch({ Textsearch: "" }); }
                else { this.onSearch(Textsearch); }

            }
        })

        this.subSetNextPage = this.navService.onNextPage.subscribe(async status => {
            if (status) {
                await this.navService.setOnNextPage(false);
                this._router.navigate(['/income/manage', 'C', 'NEW']);
            }
        })
    }

    ngOnDestroy(): void {
        this.subOnSearch.unsubscribe();
        this.subSetNextPage.unsubscribe();
    }

    ShowAlertNoRecord()
    {
        swal({
            title: '',
            text: Message.noRecord,
            type: 'warning',
            confirmButtonText : 'ตกลง'
        });
    }

    onSearch(Textsearch: any) {
        this.preloader.setShowPreloader(true);

        this.incomeService.getByKeyword(Textsearch).subscribe(list => {
            this.onSearchComplete(list)

            this.preloader.setShowPreloader(false);
        }, (err: HttpErrorResponse) => {

            this.ShowAlertNoRecord();
            //alert(Message.noRecord);
            this.RevenueList = [];
            this.preloader.setShowPreloader(false);
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

        if(form.value.RevenueStatus == ""){
            form.value.RevenueStatus = null;
        }

        await this.incomeService.getByConAdv(form.value).then(async list => {
            this.onSearchComplete(list);
            this.preloader.setShowPreloader(false);
        }, (err: HttpErrorResponse) => {
            swal('', err.message, 'error');
            //alert(err.message);
            this.preloader.setShowPreloader(false);
        });
    }

    async onSearchComplete(list: any) {
        this.revenue = [];

        if (!list.length) {
            this.ShowAlertNoRecord();
            //alert(Message.noRecord);
            this.RevenueList = [];

            return false;
        }

        await list.map((item) => {
            var StaffSendMoney;
            item.RevenueDate = toLocalShort(item.RevenueDate);
            StaffSendMoney = item.RevenueStaff.filter(item => item.ContributorID === 20);

            item.RevenueOneStaff = "";
            item.RevenueOneStaffDept = "";

            if(StaffSendMoney.length > 0){
                item.RevenueOneStaff = StaffSendMoney[0].TitleName + StaffSendMoney[0].FirstName + " " + StaffSendMoney[0].LastName;
                item.RevenueOneStaffDept =  StaffSendMoney[0].OfficeShortName;
            }

            if (item.RevenueStatus == "1") {
                item.RevenueStatus = "นำส่งเงินรายได้"
            }
            else if (item.RevenueStatus == "2") {
                item.RevenueStatus = "รับรายการนำส่งเงิน"
            }
            else{
                item.RevenueStatus = "";
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

    clickView(RevenueID: string) {
        this._router.navigate([`/income/manage/R/${RevenueID}`]);
    }

    async pageChanges(event) {
        this.RevenueList = await this.revenue.slice(event.startIndex - 1, event.endIndex);
    }


    getCurrentDate() {
        let date = new Date();
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).toISOString().substring(0, 10);
    }

    onSDateChange(event: IMyDateModel) {
        this._dateStartFrom = event.date;
        this.checkDateDelivery();
    }

    onEDateChange(event: IMyDateModel) {
        this._dateStartTo = event.date;
        this.checkDateDelivery();
    }

    checkDateDelivery() {
        if (this._dateStartFrom && this._dateStartTo) {
            const sdate = `${this._dateStartFrom.year}-${this._dateStartFrom.month}-${this._dateStartFrom.day}`;
            const edate = `${this._dateStartTo.year}-${this._dateStartTo.month}-${this._dateStartTo.day}`;

            if (!compareDate(new Date(sdate), new Date(edate))) {
                swal('', Message.checkDate, 'warning');
                //alert(Message.checkDate)
                setTimeout(() => {
                    this.DateStartTo = { date: this._dateStartFrom };
                }, 0);
            }
        }
    }

    // --- หน่วยงาน ---
    async getDepartmentRevenue() {
        await this.incomeService.getDepartment().then(async res => {
            if (res) {
                this.rawOptions = res;
            }
        }, (err: HttpErrorResponse) => {
            this.preloader.setShowPreloader(false);
        });
    }

    onAutoChange(value: string) {
        // if (value == '') {
        //     this.options = [];

        //     // this.oProve.ProveStationCode = "";
        //     // this.oProve.ProveStation = "";
        // } else {
        //     this.options = this.rawOptions.filter(f => f.OfficeName.toLowerCase().indexOf(value.toLowerCase()) > -1);
        // }
    }

    onAutoFocus(value: string) {
        // if (value == '') {
        //     this.options = [];
        // }
    }

    // onAutoSelecteWord(event) {
    //     // this.oProve.ProveStationCode = event.OfficeCode;
    //     // this.oProve.ProveStation = event.OfficeName;
    // }
    // ----- End หน่วยงาน ---
}
