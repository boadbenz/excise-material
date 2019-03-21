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

    modal: any;

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
        this.navService.setNewButton(false);
        this.sidebarService.setVersion('evidenceStock 0.0.0.1');
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
    }


    ngOnDestroy(): void {
        this.subOnSearch.unsubscribe();
    }

    private active_Route() {
        this.sub = this.activeRoute.params.subscribe(p => {
            this.evitype = p['type'];
        });
    }

    clickView(EvidenceOutID: string) {
        this._router.navigate(['/evidenceStock/manage', '1']);
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

            // หน่วยงาน
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
}
