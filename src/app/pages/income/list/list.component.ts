//#region "Imports"
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { IncomeService } from '../income.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Revenue } from '../Revenue';
import { pagination } from '../../../config/pagination';
import { Message } from '../../../config/message';
import { toLocalShort, compareDate, setZeroHours } from '../../../config/dateFormat';
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
    DateStartTo: any;
    _dateStartFrom: any;
    _dateStartTo: any;

<<<<<<< HEAD
    showEditField: any;
    DepartmentName: string;
    AdvRevenueCode: string;

    RevenueStatus: any = "";
=======
>>>>>>> Kat_Dev
    StatusOption = [];
    options = [];
    rawOptions = [];
    RevenueStatus: string;

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
<<<<<<< HEAD
        this.sidebarService.setVersion('Revenue 0.0.0.2');
=======
        this.sidebarService.setVersion('Revenue 0.0.0.10');
>>>>>>> Kat_Dev

        this.RevenueStatus = "";

<<<<<<< HEAD
        // this.getDepartmentRevenue();
        // this.onSearch({ Textsearch: "" });
=======
        //this.preloader.setShowPreloader(true);

        //this.getDepartmentRevenue();
        //this.onSearch({ Textsearch: "" });
>>>>>>> Kat_Dev

        this.subOnSearch = await this.navService.searchByKeyword.subscribe(async Textsearch => {
            this.preloader.setShowPreloader(true);

            if (Textsearch) {
                await this.navService.setOnSearch('');

                let ts;
                ts = { Textsearch: "" }
                ts = Textsearch;

                //alert("1");

                if (ts.Textsearch == null) { 
                    this.onSearch({ Textsearch: "" }); 
                } else { 

                    //alert(ts.Textsearch);

                    this.onSearch(Textsearch); 
                }

            } else {
                this.onSearch({ Textsearch: "" }); 
            }
        })

        this.subSetNextPage = this.navService.onNextPage.subscribe(async status => {
            if (status) {
                await this.navService.setOnNextPage(false);
                this._router.navigate(['/income/manage', 'C', 'NEW']);
            }
        })

        // this.navService.onSearch.subscribe(async status => {
        //     if (status) {
        //         alert(this.navService.searchByKeyword);

        //         this.preloader.setShowPreloader(true);

        //         this.onSearch({ Textsearch: status }); 
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

        RevenueCode = btoa(RevenueCode);
        //RevenueCode = encodeURI(RevenueCode);

        //alert(RevenueCode);

        this._router.navigate([`/income/manage/R/${RevenueCode}`]);
    }

    async pageChanges(event) {
        this.RevenueList = await this.revenue.slice(event.startIndex - 1, event.endIndex);
    }


    

    

    checkDateDelivery() {
        

        if (this._dateStartFrom && this._dateStartTo) {
            //console.log(this._dateStartFrom);
            //alert(this._dateStartFrom);


            //const sdate = getDateMyDatepicker(this._dateStartFrom);
            //const edate = getDateMyDatepicker(this._dateStartTo);

            //alert(sdate);

            if (!compareDate(new Date(`${this._dateStartFrom.year}-${this._dateStartFrom.month}-${this._dateStartFrom.day}`), new Date(`${this._dateStartTo.year}-${this._dateStartTo.month}-${this._dateStartTo.day}`))) {
                alert(Message.checkDate)
                setTimeout(() => {
                    this.DateStartTo = "";
                }, 0);
            }
        }
    }

    //#endregion
    
    //#region "Events"

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
<<<<<<< HEAD
            alert(err.statusText);
            //console.log(err.statusText);
            // this.preloader.setShowPreloader(false);

            // this.revenue = [];
            // this.revenue.push({RevenueCode:"C111"});
            
            
            
            // this.paginage.TotalItems = 1;
            // this.RevenueList = this.revenue;

=======
            alert(Message.noRecord);
            this.RevenueList = [];
            this.preloader.setShowPreloader(true);
>>>>>>> Kat_Dev
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
        }else{
            form.value.DateStartFrom = "";
        }

        if (form.value.DateStartTo) {
            eDate = form.value.DateStartTo.date;

            if (sDate != undefined) {
                eDateRevenue = new Date(`${eDate.year}-${eDate.month}-${eDate.day}`);
                form.value.DateStartTo = setZeroHours(eDateRevenue);
            }
        }else{
            form.value.DateStartTo = "";
        }

        if(form.value.RevenueStatus == ""){
            form.value.RevenueStatus = null;
        }

        debugger
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
            this.RevenueList = [];

            return false;
        }

        await list.map((item) => {
            var StaffSendMoney;
            item.RevenueDate = toLocalShort(item.RevenueDate);
<<<<<<< HEAD
            item.RevenueOneStaff = item.RevenueStaff.filter(item => item.ContributorID === 20);

            //alert(item.RevenueOneStaff.length);

            item.NameX = "";
            item.OfficeName = "";

            if(item.RevenueOneStaff.length > 0) {
                item.NameX = item.RevenueOneStaff[0].TitleName+item.RevenueOneStaff[0].FirstName+' '+item.RevenueOneStaff[0].LastName;

                item.OfficeName = item.RevenueOneStaff[0].OfficeName;
            }

            //console.log(item.RevenueOneStaff);

            item.Count = item.RevenueDetail.length;

            debugger

            item.RevenueStatus = "ยังไม่นำส่งเงินรายได้";
            

            if (item.RevenueDetail.length > 0) {
                if (item.RevenueDetail[0].RevenueStatus == "0") {
                    item.RevenueStatus = "ยังไม่นำส่งเงินรายได้"
                }
                else if (item.RevenueDetail[0].RevenueStatus == "1") {
                    item.RevenueStatus = "นำส่งเงินรายได้"
                }
                else {
                    item.RevenueStatus = "รับรายการนำส่งเงิน"
                }
=======
            StaffSendMoney = item.RevenueStaff.filter(item => item.ContributorID === 20);

            item.RevenueOneStaff = "";
            item.RevenueOneStaffDept = "";

            if(StaffSendMoney.length > 0){
                item.RevenueOneStaff = StaffSendMoney[0].TitleName + StaffSendMoney[0].FirstName + " " + StaffSendMoney[0].LastName;
                item.RevenueOneStaffDept =  StaffSendMoney[0].OfficeName;
            }

            if (item.RevenueStatus == "1") {
                item.RevenueStatus = "นำส่งเงินรายได้"
            }
            else if (item.RevenueStatus == "2") {
                item.RevenueStatus = "รับรายการนำส่งเงิน"
            }
            else{
                item.RevenueStatus = "";
>>>>>>> Kat_Dev
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

<<<<<<< HEAD
    //#endregion

=======
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
        if (this.checkDateDelivery()) {

        }
    }

    checkDateDelivery() {
        if (this._dateStartFrom && this._dateStartTo) {
            const sdate = `${this._dateStartFrom.year}-${this._dateStartFrom.month}-${this._dateStartFrom.day}`;
            const edate = `${this._dateStartTo.year}-${this._dateStartTo.month}-${this._dateStartTo.day}`;

            if (!compareDate(new Date(sdate), new Date(edate))) {
                alert(Message.checkDate)
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
>>>>>>> Kat_Dev
}
