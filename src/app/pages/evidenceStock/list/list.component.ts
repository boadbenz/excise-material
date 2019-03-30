import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Routes } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { EvidenceStockService } from '../evidenceStock.service';
import { HttpErrorResponse } from '@angular/common/http';
// import { EvidenceOut } from '../evidenceOut';
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
    OfficeName: string;
    WarehouseName: string;
    evidenceSt = [];
    evidenceStList = [];
    paginage = pagination;
    modal: any;

    constructor(
        private activeRoute: ActivatedRoute,
        private _router: Router,
        private navService: NavigationService,
        private sidebarService: SidebarService,
        private EvidenceService: EvidenceStockService,
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
        this.navService.setSearchBar(false);
        this.navService.setNewButton(false);
        this.sidebarService.setVersion('evidenceStock 0.0.0.1');

        this.OfficeName = "";
        this.WarehouseName = "";

        this.onAdvSearch();
    }


    ngOnDestroy(): void { }

    clickView(WarehouseID: string) {
        this._router.navigate(['/evidenceStock/manage', WarehouseID]);
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
        this.evidenceSt = [];

        if (!list.length) {
            this.ShowAlertNoRecord();
            this.evidenceSt = [];

            return false;
        }

        if (Array.isArray(list)) {
            this.evidenceSt = list;
        } else {
            this.evidenceSt.push(list);
        }

        // set total record
        this.paginage.TotalItems = this.evidenceSt.length;
        this.evidenceStList = this.evidenceSt.slice(0, this.paginage.RowsPerPageOptions[0]);
    }

    async pageChanges(event) {
         this.evidenceStList = await this.evidenceSt.slice(event.startIndex - 1, event.endIndex);
    }

    onAdvSearch() {
        this.preloader.setShowPreloader(true);
        
        let oEvidenceInventory = {
            OfficeName: this.OfficeName,
            WarehouseName: this.WarehouseName,
            AccountOfficeCode: localStorage.getItem("officeCode")
        }

        this.EvidenceService.getByConAdv(oEvidenceInventory).then(async list => {
            this.onSearchComplete(list);
            this.preloader.setShowPreloader(false);
        }, (err: HttpErrorResponse) => {
            swal('', err.message, 'error');
            this.preloader.setShowPreloader(false);
        });
    }
}
