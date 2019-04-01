import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { EvidenceService } from '../evidenceIn.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Evidence_In } from '../evidenceIn';
import { pagination } from '../../../config/pagination';
import { Message } from '../../../config/message';
import { toLocalShort, compareDate, setZeroHours } from '../../../config/dateFormat';
import { IMyDateModel, IMyOptions } from 'mydatepicker-th';
import { SidebarService } from '../../../shared/sidebar/sidebar.component';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { MatAutocomplete } from '@angular/material';
import swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit, OnDestroy {

    advSearch: any;
    evidenceIn = new Array<Evidence_In>();
    EvidenceInList = new Array<Evidence_In>();
    paginage = pagination;
    EvidenceInDateTo: any;
    DeliveryDateTo: any;
    _dateRecvStartFrom: any;
    _dateRecvStartTo: any;
    _dateSendStartFrom: any;
    _dateSendStartTo: any;

    StatusOption = [];
    options = [];
    rawOptions = [];
    RevenueStatus: string;

    private subOnSearch: any;
    private subSetNextPage: any;

    modal: any;

    // ----- Model ------ //
    @ViewChild('EvidenceTypeModel') evidenceTypeModel: ElementRef;

    constructor(
        private _router: Router,
        private navService: NavigationService,
        private sidebarService: SidebarService,
        private edidenceService: EvidenceService,
        private preloader: PreloaderService,
        private ngbModel: NgbModal
    ) {
        this.advSearch = this.navService.showAdvSearch;
    }

    async ngOnInit() {
        localStorage.setItem('programcode','ILG60-10-00');
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
        this.sidebarService.setVersion('evidenceIn 0.0.0.21');
        this.RevenueStatus = "";

        this.subOnSearch = await this.navService.searchByKeyword.subscribe(async res => {
            if (res) {
                await this.navService.setOnSearch('');

                let ts;
                ts = { Textsearch: "", AccountOfficeCode: localStorage.getItem("officeCode") }
                ts = res;

                if (ts.Textsearch == null) { this.onSearch({ Textsearch: "" }); }
                else { this.onSearch(res); }

            }
        })

        this.subSetNextPage = this.navService.onNextPage.subscribe(async status => {
            if (status) {
                await this.navService.setOnNextPage(false);

                this.modal = this.ngbModel.open(this.evidenceTypeModel, { size: 'lg', centered: true });
            }
        })
    }

    ngOnDestroy(): void {
        this.subOnSearch.unsubscribe();
        this.subSetNextPage.unsubscribe();
    }

    clickView(EvidenceInID: string, EvidenceInType: number, ProveID: string) {
        switch(EvidenceInType){
            case 0 : this._router.navigate([`/evidenceIn/manage/I/R/${EvidenceInID}/${ProveID}`]); break;
            case 1 : this._router.navigate([`/evidenceIn/manage/E/R/${EvidenceInID}/${ProveID}`]); break;
            case 2 : this._router.navigate([`/evidenceIn/manage/G/R/${EvidenceInID}/${ProveID}`]); break;
        }   
    }


    onSearch(p: any) {
        this.preloader.setShowPreloader(true);

        var paramsOther = {
            Textsearch: p.Textsearch,
            AccountOfficeCode: localStorage.getItem("officeCode")
        }

        this.edidenceService.getByKeyword(paramsOther).then(list => {
            this.onSearchComplete(list)

            this.preloader.setShowPreloader(false);
        }, (err: HttpErrorResponse) => {

            this.ShowAlertNoRecord();
            this.EvidenceInList = [];
            this.preloader.setShowPreloader(false);
        });
    }

    ShowAlertNoRecord() {
        swal({
            title: '',
            text: Message.noRecord,
            type: 'warning',
            confirmButtonText: 'ตกลง'
        });
    }

    async onSearchComplete(list: any) {
        this.evidenceIn = [];

        if (!list.length) {
            this.ShowAlertNoRecord();
            this.EvidenceInList = [];

            return false;
        }

        await list.map((item) => {
            if(item.EvidenceInDate){
                item.EvidenceInDate = toLocalShort(item.EvidenceInDate);
            }
            
            item.DeliveryDate = toLocalShort(item.DeliveryDate);

            // หน่วยงานที่รับมอบของกลางเพื่อเก็บรักษา
            item.EvidenceInStaff.filter(f => f.ContributorID == 42).map(s => {
                item.DeptNameRecv = s.OfficeName;
            });

            // หน่วยงานที่นำส่งของกลาง
            item.EvidenceInStaff.filter(f => f.ContributorID == 13).map(s => {
                item.DeptNameSent = s.OfficeName;
            });

            switch (item.EvidenceInType) {
                case 0:
                    item.EvidenceInTypeName = "ตรวจรับของกลางจากหน่วยงานภายใน";
                    break;
                case 1:
                    item.EvidenceInTypeName = "ตรวจรับของกลางจากหน่วยงานภายนอก";
                    break;
                case 2:
                    item.EvidenceInTypeName = "ตรวจรับของกลางที่ถูกนำออกไปใช้ในกิจกรรมของทางราชการ";
                    break;
            }
        })

        if (Array.isArray(list)) {
            this.evidenceIn = list;
        } else {
            this.evidenceIn.push(list);
        }

        // set total record
        this.paginage.TotalItems = this.evidenceIn.length;
        this.EvidenceInList = this.evidenceIn.slice(0, this.paginage.RowsPerPageOptions[0]);
    }

    async pageChanges(event) {
        this.EvidenceInList = await this.evidenceIn.slice(event.startIndex - 1, event.endIndex);
    }


    async onAdvSearch(form: any) {
        this.preloader.setShowPreloader(true);
        let sDate, eDate, sFullDate, eFullDate;

        // วันที่รับเริ่มต้น
        if (form.value.EvidenceInDateStart) {
            sDate = form.value.EvidenceInDateStart.date;

            if (sDate != undefined) {
                sFullDate = new Date(`${sDate.year}-${sDate.month}-${sDate.day}`);
                form.value.EvidenceInDateStart = setZeroHours(sFullDate);
            }
        } else {
            form.value.EvidenceInDateStart = null;
        }

        // วันที่รับสิ้นสุด
        if (form.value.EvidenceInDateTo) {
            eDate = form.value.EvidenceInDateTo.date;

            if (sDate != undefined) {
                eFullDate = new Date(`${eDate.year}-${eDate.month}-${eDate.day}`);
                form.value.EvidenceInDateTo = setZeroHours(eFullDate);
            }
        } else {
            form.value.EvidenceInDateTo = null;
        }

        // วันที่นำส่งเริ่มต้น
        if (form.value.DeliveryDateStart) {
            sDate = form.value.DeliveryDateStart.date;

            if (sDate != undefined) {
                sFullDate = new Date(`${sDate.year}-${sDate.month}-${sDate.day}`);
                form.value.DeliveryDateStart = setZeroHours(sFullDate);
            }
        } else {
            form.value.DeliveryDateStart = null;
        }

        // วันที่นำส่งสิ้นสุด
        if (form.value.DeliveryDateTo) {
            eDate = form.value.DeliveryDateTo.date;

            if (sDate != undefined) {
                eFullDate = new Date(`${eDate.year}-${eDate.month}-${eDate.day}`);
                form.value.DeliveryDateTo = setZeroHours(eFullDate);
            }
        } else {
            form.value.DeliveryDateTo = null;
        }

        // ประเภทรายการรับ
        if (form.value.EvidenceInType == "") {
            form.value.EvidenceInType = null;
        }

        if ((form.value.chk1 == true && form.value.chk2 == true) || (form.value.chk1 == "" && form.value.chk2 == "")) {
            form.value.IsReceive = "";
        } else if (form.value.chk1 == true) {
            form.value.IsReceive = 1;
        } else if (form.value.chk2 == true) {
            form.value.IsReceive = 0;
        } else {
            form.value.IsReceive = "";
        }

        form.value.AccountOfficeCode = localStorage.getItem("officeCode");

        await this.edidenceService.getByConAdv(form.value).then(async list => {
            this.onSearchComplete(list);
            this.preloader.setShowPreloader(false);
        }, (err: HttpErrorResponse) => {
            swal('', err.message, 'error');
            this.preloader.setShowPreloader(false);
        });
    }

    getCurrentDate() {
        let date = new Date();
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).toISOString().substring(0, 10);
    }

    // ----- Validate วันที่รับ -----
    onSRecvDateChange(event: IMyDateModel) {
        this._dateRecvStartFrom = event.date;
        this.checkDateRecv();
    }

    onERecvDateChange(event: IMyDateModel) {
        this._dateRecvStartTo = event.date;
        this.checkDateRecv();
    }

    checkDateRecv() {
        if (this._dateRecvStartFrom && this._dateRecvStartTo) {
            let sdate = `${this._dateRecvStartFrom.year}-${this._dateRecvStartFrom.month}-${this._dateRecvStartFrom.day}`;
            let edate = `${this._dateRecvStartTo.year}-${this._dateRecvStartTo.month}-${this._dateRecvStartTo.day}`;

            if (!compareDate(new Date(sdate), new Date(edate))) {
                swal('', Message.checkDate, 'warning');
                setTimeout(() => {
                    this.EvidenceInDateTo = { date: this._dateRecvStartFrom };
                }, 0);
            }
        }
    }

    // ----- Validate วันที่นำส่ง -----
    onSSendDateChange(event: IMyDateModel) {
        this._dateSendStartFrom = event.date;
        this.checkDateSend();
    }

    onESendDateChange(event: IMyDateModel) {
        this._dateSendStartTo = event.date;
        this.checkDateSend();
    }

    checkDateSend() {
        if (this._dateSendStartFrom && this._dateSendStartTo) {
            let sdate = `${this._dateSendStartFrom.year}-${this._dateSendStartFrom.month}-${this._dateSendStartFrom.day}`;
            let edate = `${this._dateSendStartTo.year}-${this._dateSendStartTo.month}-${this._dateSendStartTo.day}`;

            if (!compareDate(new Date(sdate), new Date(edate))) {
                swal('', Message.checkDate, 'warning');
                setTimeout(() => {
                    this.DeliveryDateTo = { date: this._dateSendStartFrom };
                }, 0);
            }
        }
    }
}
