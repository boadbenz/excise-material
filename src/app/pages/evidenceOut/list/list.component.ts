import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Routes } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { EvidenceOutService } from '../evidenceOut.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EvidenceOut } from '../evidenceOut';
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
    private sub: any;
    evitype: any;


    advSearch: any;
    evidenceOut = new Array<EvidenceOut>();
    EvidenceOutList = new Array<EvidenceOut>();
    paginage = pagination;
    DateStartTo: any;
    _dateEviStartFrom: any;
    _dateEviStartTo: any;
    _dateEviNoStartFrom: any;
    _dateEviNoStartTo: any;

    StatusOption = [];
    options = [];
    rawOptions = [];

    RevenueStatus: string;
    EvidenceOutType: string;
    EvidenceOutCode: string;
    EvidenceOutDateStart: any;
    EvidenceOutDateTo: any;
    EvidenceOutNo: string;
    EvidenceOutNoDateStart: any;
    EvidenceOutNoDateTo: any;
    StaffName: string;
    OfficeName: string;

    private subOnSearch: any;
    private subSetNextPage: any;

    modal: any;

    // ----- Model ------ //
    @ViewChild('EvidenceTypeModel') evidenceTypeModel: ElementRef;

    constructor(
        private activeRoute: ActivatedRoute,

        private _router: Router,
        private navService: NavigationService,
        private sidebarService: SidebarService,
        private EvidenceService: EvidenceOutService,
        private preloader: PreloaderService,
        private ngbModel: NgbModal


    ) {
        this.advSearch = this.navService.showAdvSearch;
    }

    async ngOnInit() {
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
        this.sidebarService.setVersion('evidenceOut 0.0.0.1');
        this.RevenueStatus = "";
        this.EvidenceOutList = [];
        this.active_Route();

        this.subOnSearch = await this.navService.searchByKeyword.subscribe(async TextSearch => {
            if (TextSearch) {
                await this.navService.setOnSearch('');

                let ts;
                ts = { TextSearch: "", OfficeCode: localStorage.getItem("officeCode") }
                ts = TextSearch;

                if (ts.TextSearch == null) { this.onSearch({ TextSearch: "" }); }
                else { this.onSearch(TextSearch); }
            }
        })

        this.subSetNextPage = this.navService.onNextPage.subscribe(async status => {
            if (status) {
                await this.navService.setOnNextPage(false);

                if (this.evitype == "11" || this.evitype == '15') {
                    this.modal = this.ngbModel.open(this.evidenceTypeModel, { size: 'lg', centered: true });
                }
                else {
                    this._router.navigate(['/evidenceOut/manage', this.evitype, 'C', 'NEW', '0']);
                }
            }
        })
    }


    ngOnDestroy(): void {
        this.subOnSearch.unsubscribe();
        this.subSetNextPage.unsubscribe();
    }

    private active_Route() {
        this.sub = this.activeRoute.params.subscribe(p => {
            this.evitype = p['type'];

            this.activeRoute.data.subscribe(
                (data) => {
                    switch (this.evitype) {
                        case '11':
                            data.urls[1].title = "ค้นหารายการคืนของกลาง";
                            data.codePage = "ILG60-11-01-00-00";
                            this.EvidenceOutType = "0";
                            break;
                        case '12':
                            data.urls[1].title = "ค้นหารายการจัดเก็บเข้าพิพิธภัณฑ์";
                            data.codePage = "ILG60-12-01-00-00";
                            this.EvidenceOutType = "4";
                            break;
                        case '13':
                            data.urls[1].title = "ค้นหารายการขายทอดตลาด";
                            data.codePage = "ILG60-13-01-00-00";
                            this.EvidenceOutType = "2";
                            break;
                        case '14':
                            data.urls[1].title = "ค้นหารายการทำลายของกลาง";
                            data.codePage = "ILG60-14-01-00-00";
                            this.EvidenceOutType = "1";
                            break;
                        case '15':
                            data.urls[1].title = "ค้นหารายการนำของกลางออกจากคลัง";
                            data.codePage = "ILG60-15-01-00-00";
                            this.EvidenceOutType = "5";
                            break;
                        case '16':
                            data.urls[1].title = "ค้นหารายการโอนย้ายของกลาง";
                            data.codePage = "ILG60-16-01-00-00";
                            this.EvidenceOutType = "6";
                            break;
                    }

                }
            );

            this.EvidenceOutList = [];
        });
    }

    clickView(EvidenceOutID: string, EvidenceInType: string) {
        if (this.evitype == "11" && EvidenceInType == "0") {
            this._router.navigate(['/evidenceOut/manage', '11I', 'R', EvidenceOutID, "0"]);
        } else if (this.evitype == "11" && EvidenceInType == "1") {
            this._router.navigate(['/evidenceOut/manage', "11E", 'R', EvidenceOutID, "0"]);
        } else {
            this._router.navigate(['/evidenceOut/manage', this.evitype, 'R', EvidenceOutID, "0"]);
        }
    }

    async onSearch(p: any) {
        var paramsOther = {
            TextSearch: p.TextSearch,
            EvidenceOutType: this.EvidenceOutType,
            OfficeCode: localStorage.getItem("officeCode")
        }

        this.EvidenceService.getByKeyword(paramsOther).subscribe(list => {
            this.onSearchComplete(list)

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
        this.evidenceOut = [];

        if (!list.length) {
            this.ShowAlertNoRecord();
            this.EvidenceOutList = [];

            return false;
        }

        await list.map((item) => {
            item.EvidenceOutDate = toLocalShort(item.EvidenceOutDate);
            item.EvidenceOutNoDate = toLocalShort(item.EvidenceOutNoDate);

            // หน่วยงานที่นำส่งคืน
            item.EvidenceOutStaff.filter(f => f.ContributorID == 43).map(s => {
                item.EvidenceStaffName = `${s.TitleName == 'null' || s.TitleName == null ? '' : s.TitleName}`
                    + `${s.FirstName == 'null' || s.FirstName == null ? '' : s.FirstName}` + ' '
                    + `${s.LastName == 'null' || s.LastName == null ? '' : s.LastName}`;
                item.DeptName = s.OfficeName;
            });
        })

        if (Array.isArray(list)) {
            this.evidenceOut = list;
        } else {
            this.evidenceOut.push(list);
        }

        // set total record
        this.paginage.TotalItems = this.evidenceOut.length;
        this.EvidenceOutList = this.evidenceOut.slice(0, this.paginage.RowsPerPageOptions[0]);
    }

    async pageChanges(event) {
        this.EvidenceOutList = await this.evidenceOut.slice(event.startIndex - 1, event.endIndex);
    }

    async onAdvSearch() {
        this.preloader.setShowPreloader(true);
        let sDate, eDate, sFullDate, eFullDate;

        // วันที่คืน/วันที่ขาย/วันที่ทำลาย/วันที่นำออก/วันที่โอนย้าย/วันที่จัดเก็บพิพิธภัณฑ์ เริ่มต้น
        if (this.EvidenceOutDateStart) {
            sDate = this.EvidenceOutDateStart.date;

            if (sDate != undefined) {
                sFullDate = new Date(`${sDate.year}-${sDate.month}-${sDate.day}`);
                this.EvidenceOutDateStart = setZeroHours(sFullDate);
            }
        } else {
            this.EvidenceOutDateStart = null;
        }

        // วันที่คืน/วันที่ขาย/วันที่ทำลาย/วันที่นำออก/วันที่โอนย้าย/วันที่จัดเก็บพิพิธภัณฑ์ สิ้นสุด
        if (this.EvidenceOutDateTo) {
            eDate = this.EvidenceOutDateTo.date;

            if (sDate != undefined) {
                eFullDate = new Date(`${eDate.year}-${eDate.month}-${eDate.day}`);
                this.EvidenceOutDateTo = setZeroHours(eFullDate);
            }
        } else {
            this.EvidenceOutDateTo = null;
        }

        // วันที่ขอคืน/วันที่อนุมัติ เริ่มต้น
        if (this.EvidenceOutNoDateStart) {
            sDate = this.EvidenceOutNoDateStart.date;

            if (sDate != undefined) {
                sFullDate = new Date(`${sDate.year}-${sDate.month}-${sDate.day}`);
                this.EvidenceOutNoDateStart = setZeroHours(sFullDate);
            }
        } else {
            this.EvidenceOutNoDateStart = null;
        }

        // วันที่ขอคืน/วันที่อนุมัติ สิ้นสุด
        if (this.EvidenceOutNoDateTo) {
            eDate = this.EvidenceOutNoDateTo.date;

            if (sDate != undefined) {
                eFullDate = new Date(`${eDate.year}-${eDate.month}-${eDate.day}`);
                this.EvidenceOutNoDateTo = setZeroHours(eFullDate);
            }
        } else {
            this.EvidenceOutNoDateTo = null;
        }

        let oEvidenceOut = {
            EvidenceOutCode: this.EvidenceOutCode,
            EvidenceOutDateFrom: this.EvidenceOutDateStart,
            EvidenceOutDateTo: this.EvidenceOutDateTo,
            EvidenceOutNo: this.EvidenceOutNo,
            EvidenceOutNoDateFrom: this.EvidenceOutNoDateStart,
            EvidenceOutNoDateTo: this.EvidenceOutNoDateTo,
            StaffName: this.StaffName,
            StaffOfficeName: this.OfficeName,
            OfficeCode: localStorage.getItem("officeCode"),
            EvidenceOutType: this.EvidenceOutType
        }


        await this.EvidenceService.getByConAdv(oEvidenceOut).then(async list => {
            this.onSearchComplete(list);
            this.preloader.setShowPreloader(false);
        }, (err: HttpErrorResponse) => {
            swal('', err.message, 'error');
            this.preloader.setShowPreloader(false);
        });
    }

    // ----- Validate วันที่คืน/วันที่ขาย/วันที่ทำลาย/วันที่นำออก/วันที่โอนย้าย/วันที่จัดเก็บพิพิธภัณฑ์ -----
    onSEviDateChange(event: IMyDateModel) {
        this._dateEviStartFrom = event.date;
        this.checkDateEvidence();
    }

    onEEviDateChange(event: IMyDateModel) {
        this._dateEviStartTo = event.date;
        this.checkDateEvidence();
    }

    checkDateEvidence() {
        if (this._dateEviStartFrom && this._dateEviStartTo) {
            let sdate = `${this._dateEviStartFrom.year}-${this._dateEviStartFrom.month}-${this._dateEviStartTo.day}`;
            let edate = `${this._dateEviStartFrom.year}-${this._dateEviStartFrom.month}-${this._dateEviStartTo.day}`;

            if (!compareDate(new Date(sdate), new Date(edate))) {
                swal('', Message.checkDate, 'warning');
                setTimeout(() => {
                    this.EvidenceOutDateTo = { date: this._dateEviStartFrom };
                }, 0);
            }
        }
    }

    // ----- Validate วันที่ขอคืน/วันที่อนุมัติ -----
    onSEviNoDateChange(event: IMyDateModel) {
        this._dateEviNoStartFrom = event.date;
        this.checkDateEvidenceNo();
    }

    onEEviNoDateChange(event: IMyDateModel) {
        this._dateEviNoStartFrom = event.date;
        this.checkDateEvidenceNo();
    }

    checkDateEvidenceNo() {
        if (this._dateEviNoStartFrom && this._dateEviNoStartTo) {
            let sdate = `${this._dateEviNoStartFrom.year}-${this._dateEviNoStartFrom.month}-${this._dateEviNoStartFrom.day}`;
            let edate = `${this._dateEviNoStartTo.year}-${this._dateEviNoStartTo.month}-${this._dateEviNoStartTo.day}`;

            if (!compareDate(new Date(sdate), new Date(edate))) {
                swal('', Message.checkDate, 'warning');
                setTimeout(() => {
                    this.EvidenceOutDateTo = { date: this._dateEviNoStartFrom };
                }, 0);
            }
        }
    }
}
