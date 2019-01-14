import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ProveService } from '../prove.service';
import { Prove } from '../prove';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Message } from '../../../config/message';
import { pagination } from '../../../config/pagination';
import { NgForm, FormBuilder } from '@angular/forms';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { SidebarService } from '../../../shared/sidebar/sidebar.component';
import { toLocalShort, compareDate, setZeroHours } from '../../../config/dateFormat';
import { IMyDateModel, IMyOptions } from 'mydatepicker-th';
import swal from 'sweetalert2';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

    private subOnSearch: any;

    dataTable: any;
    advSearch: any;
    _dateDeliveryStartFrom: any;
    _dateDeliveryStartTo: any;
    _dateProveStartFrom: any;
    _dateProveStartTo: any;

    paginage = pagination;
    Prove = new Array<Prove>();
    ListProve = new Array<Prove>();

    @ViewChild('advForm') advForm: NgForm;

    // DeliveryDateFrom = this.getCurrentDate();
    // DeliveryDateTo = this.getCurrentDate();
    // ProveDateFrom = this.getCurrentDate();
    // ProveDateTo = this.getCurrentDate();
    DeliveryDateFrom = "";
    DeliveryDateTo: any;
    ProveDateFrom = "";
    ProveDateTo: any;

    constructor(
        private _router: Router,
        private navService: NavigationService,
        private proveService: ProveService,
        private sidebarService: SidebarService,
        private preLoaderService: PreloaderService
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
        this.navService.setNewButton(false);
        this.advSearch = this.navService.showAdvSearch;
    }

    async ngOnInit() {
        this.sidebarService.setVersion('Prove 0.0.0.25');

        //this.advSearch.next(true);
        this.DeliveryDateTo = null;
        this.ProveDateTo = null;

        //this.preLoaderService.setShowPreloader(true);
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
    }

    ngOnDestroy(): void {
        this.subOnSearch.unsubscribe();
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

    async onSearch(Textsearch: any) {
        this.preLoaderService.setShowPreloader(true);

        await this.proveService.getByKeyword(Textsearch).subscribe(list => {
            this.onSearchComplete(list)

            this.preLoaderService.setShowPreloader(false);
        }, (err: HttpErrorResponse) => {
            this.ShowAlertNoRecord();
            //alert(Message.noRecord);
            this.ListProve = [];
            this.preLoaderService.setShowPreloader(false);
        });
       
    }

    async onAdvSearch(form: any) { 
        let sDate, eDate, sDateDelivery, eDateDelivery, sDateProve, eDateProve;

        if (form.value.DeliveryDateFrom) {
            sDate = form.value.DeliveryDateFrom.date;

            if (sDate != undefined) {
                sDateDelivery = new Date(`${sDate.year}-${sDate.month}-${sDate.day}`);
                form.value.DeliveryDateFrom = setZeroHours(sDateDelivery);
            }
        }

        if (form.value.DeliveryDateTo) {
            eDate = form.value.DeliveryDateTo.date;

            if (sDate != undefined) {
                eDateDelivery = new Date(`${eDate.year}-${eDate.month}-${eDate.day}`);
                form.value.DeliveryDateTo = setZeroHours(eDateDelivery);
            }
        }

        if (form.value.ProveDateFrom) {
            sDate = form.value.ProveDateFrom.date;

            if (sDate != undefined) {
                {
                    sDateProve = new Date(`${sDate.year}-${sDate.month}-${sDate.day}`);
                    form.value.ProveDateFrom = setZeroHours(sDateProve);
                }
            }
        }

        if (form.value.ProveDateTo) {
            eDate = form.value.ProveDateTo.date;

            if (sDate != undefined) {
                eDateProve = new Date(`${eDate.year}-${eDate.month}-${eDate.day}`);
                form.value.ProveDateTo = setZeroHours(eDateProve);
            }
        }

        // form.value.DeliveryProgramCode = "XCS05";
        // form.value.DeliveryProcessCode = "01";
        // form.value.ProveProgramCode = "XCS05";
        // form.value.ProveProcessCode = "01";


        this.preLoaderService.setShowPreloader(true);

        debugger
        await this.proveService.getByConAdv(form.value).then(async list => {
            this.onSearchComplete(list);
            this.preLoaderService.setShowPreloader(false);
        }, (err: HttpErrorResponse) => {
            //alert(Message.noRecord);
            this.ShowAlertNoRecord();
            this.preLoaderService.setShowPreloader(false);
        });
    }

    async onSearchComplete(list: any) {
        this.Prove = [];

        if (!list.length) {
            this.ShowAlertNoRecord();
            //alert(Message.noRecord);
            this.ListProve = [];

            return false;
        }

        await list.map((item) => {
            var vProveStaff, vProveStaffScience;

            if(item.DeliveryDate){
                item.DeliveryDate = toLocalShort(item.DeliveryDate);
            }
           
            if(item.ProveDate){
                item.ProveDate = toLocalShort(item.ProveDate);
            }
            

            vProveStaff = item.ProveStaff.filter(item => item.ContributorID === 14);
            vProveStaffScience = item.ProveStaff.filter(item => item.ContributorID === 15);

            item.ProveOneStaff = "";
            item.ProveOneStaffScience = "";
            item.ProveOneDeptScience = "";

            if(vProveStaff.length > 0){
                item.ProveOneStaff = `${vProveStaff[0].TitleName == 'null' || vProveStaff[0].TitleName == null ? '' : vProveStaff[0].TitleName}` 
                                   + `${vProveStaff[0].FirstName == 'null' || vProveStaff[0].FirstName == null ? '' : vProveStaff[0].FirstName}` + " " 
                                   + `${vProveStaff[0].LastName == 'null' || vProveStaff[0].LastName == null ? '' : vProveStaff[0].LastName}`;
            }

            if(vProveStaffScience.length > 0){
                item.ProveOneStaffScience = `${vProveStaffScience[0].TitleName == 'null' || vProveStaffScience[0].TitleName == null ? '' : vProveStaffScience[0].TitleName}` 
                                          + `${vProveStaffScience[0].FirstName == 'null' || vProveStaffScience[0].FirstName == null? '' : vProveStaffScience[0].FirstName}` + " " 
                                          + `${vProveStaffScience[0].LastName == 'null' || vProveStaffScience[0].LastName == null ? '' : vProveStaffScience[0].LastName}`;
                item.ProveOneDeptScience =  vProveStaffScience[0].OfficeShortName;
            }
        })

        if (Array.isArray(list)) {
            this.Prove = list;
        } else {
            this.Prove.push(list);
        }

        // set total record
        this.paginage.TotalItems = this.Prove.length;
        this.ListProve = this.Prove.slice(0, this.paginage.RowsPerPageOptions[0]);
    }

    async pageChanges(event) {
        this.ListProve = await this.Prove.slice(event.startIndex - 1, event.endIndex);
    }

    clickView(LawsuitID: string, ArrestCode: string, IndictmentID: string, GuiltBaseID: string, ProveID: string) {
        //this._router.navigate([`/prove/manage/R/${LawsuitID}/${ArrestCode}/${IndictmentID}/${GuiltBaseID}/${ProveID}`]);
        debugger
        if(ProveID == "" || ProveID == undefined)
        {
            ProveID = "0";
            this._router.navigate([`/prove/manage/C/${ProveID}/${IndictmentID}`]);
        }
        else
        {
            this._router.navigate([`/prove/manage/R/${ProveID}/${IndictmentID}`]);
        }
    }

    getCurrentDate() {
        let date = new Date();
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).toISOString().substring(0, 10);
    }

    onSDeliveryDateChange(event: IMyDateModel) {
        this._dateDeliveryStartFrom = event.date;
        this.checkDateDelivery();
    }

    onEDeliveryDateChange(event: IMyDateModel) {
        this._dateDeliveryStartTo = event.date;
        this.checkDateDelivery();
    }

    checkDateDelivery() {
        if (this._dateDeliveryStartFrom && this._dateDeliveryStartTo) {
            const sdate = `${this._dateDeliveryStartFrom.year}-${this._dateDeliveryStartFrom.month}-${this._dateDeliveryStartFrom.day}`;
            const edate = `${this._dateDeliveryStartTo.year}-${this._dateDeliveryStartTo.month}-${this._dateDeliveryStartTo.day}`;

            if (!compareDate(new Date(sdate) , new Date(edate))) {
                swal('', Message.checkDate, 'warning');
                //alert(Message.checkDate)
                setTimeout(() => {
                    this.DeliveryDateTo = { date: this._dateDeliveryStartFrom };
                }, 0);
            }
        }
    }

    onSProveDateChange(event: IMyDateModel) {
        this._dateProveStartFrom = event.date;
        this.checkDateProve();
    }

    onEProveDateChange(event: IMyDateModel) {
        this._dateProveStartTo = event.date;
        this.checkDateProve();
    }

    checkDateProve() {
        if (this._dateProveStartFrom && this._dateProveStartTo) {
            const sPdate = `${this._dateProveStartFrom.year}-${this._dateProveStartFrom.month}-${this._dateProveStartFrom.day}`;
            const ePdate = `${this._dateProveStartTo.year}-${this._dateProveStartTo.month}-${this._dateProveStartTo.day}`;

            if (!compareDate(new Date(sPdate), new Date(ePdate))) {
                swal('', Message.checkDate, 'warning');
                //alert(Message.checkDate)
                setTimeout(() => {
                    this.ProveDateTo = { date: this._dateProveStartFrom };
                }, 0);
            }
        }
    }
}
