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

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

    private subOnSearch: any;
    dataTable: any;
    advSearch: any;
    paginage = pagination;
    Prove = new Array<Prove>();
    ListProve = new Array<Prove>();

    @ViewChild('advForm') advForm: NgForm;

    // DeliveryDateFrom = this.getCurrentDate();
    // DeliveryDateTo = this.getCurrentDate();
    // ProveDateFrom = this.getCurrentDate();
    // ProveDateTo = this.getCurrentDate();
    DeliveryDateFrom = "";
    DeliveryDateTo = "";
    ProveDateFrom = "";
    ProveDateTo = "";

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

    ngOnInit() {
        this.sidebarService.setVersion('1.0.0');

        this.onSearch({ Textsearch: "" });

        this.preLoaderService.setShowPreloader(true);
        this.subOnSearch = this.navService.searchByKeyword.subscribe(async Textsearch => {
            if (Textsearch) {
                await this.navService.setOnSearch('');
                this.onSearch(Textsearch);
            }
        })

        this.preLoaderService.setShowPreloader(false);
    }

    ngOnDestroy(): void {
        this.subOnSearch.unsubscribe();
    }

    onSearch(Textsearch: any) {
        this.proveService.getByKeyword(Textsearch).subscribe(list => {
            this.onSearchComplete(list)
        }, (err: HttpErrorResponse) => {
            alert(err.message);
        });
    }

    onAdvSearch(form: any) {

        const sDateDelivery = new Date(form.value.DeliveryDateFrom);
        const eDateDelivery = new Date(form.value.DeliveryDateTo);
        const sDateProve = new Date(form.value.ProveDateFrom);
        const eDateProve = new Date(form.value.ProveDateTo);

        form.value.DeliveryDateFrom = sDateDelivery.getTime();
        form.value.DeliveryDateTo = eDateDelivery.getTime();

        form.value.sDateProve = sDateProve.getTime();
        form.value.eDateProve = eDateProve.getTime();

        form.value.DeliveryProgramCode = "XCS05";
        form.value.DeliveryProcessCode = "01";
        form.value.ProveProgramCode = "XCS05";
        form.value.ProveProcessCode = "01";


        this.proveService.getByConAdv(form.value).then(async list => {
            this.onSearchComplete(list)

        }, (err: HttpErrorResponse) => {
            alert(err.message);
        });
    }

    onSearchComplete(list: any) {
        this.Prove = [];

        if (!list.length) {
            alert(Message.noRecord);
            return false;
        }

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

    clickView(LawsuitID: string, ArrestCode: string, ProveID: string) {
        this._router.navigate([`/prove/manage/R/${LawsuitID}/${ArrestCode}/${ProveID}`]);
    }

    getCurrentDate() {
        let date = new Date();
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).toISOString().substring(0, 10);
    }

    
    varidateDDF(form: any) {
        const sDateDelivery = new Date(form.value.DeliveryDateFrom);
        const eDateDelivery = new Date(form.value.DeliveryDateTo);

        if (sDateDelivery.getTime() > eDateDelivery.getTime()) {
            alert(Message.checkReceiveDate);
            this.DeliveryDateFrom = "";
        }
    }

    varidateDDE(form: any) {
        const sDateDelivery = new Date(form.value.DeliveryDateFrom);
        const eDateDelivery = new Date(form.value.DeliveryDateTo);

        if (sDateDelivery.getTime() > eDateDelivery.getTime()) {
            alert(Message.checkReceiveDate);
            this.DeliveryDateTo = "";
        }
    }

    varidatePDF(form: any) {
        const sDateProve = new Date(form.value.ProveDateFrom);
        const eDateProve = new Date(form.value.ProveDateTo);

        if (sDateProve.getTime() > eDateProve.getTime()) {
            alert(Message.checkScienceDate);
            this.ProveDateFrom = "";
        }
    }

    varidatePDE(form: any) {
        const sDateProve = new Date(form.value.ProveDateFrom);
        const eDateProve = new Date(form.value.ProveDateTo);

        if (sDateProve.getTime() > eDateProve.getTime()) {
            alert(Message.checkScienceDate);
            this.ProveDateTo = "";
        }
    }
    
}
