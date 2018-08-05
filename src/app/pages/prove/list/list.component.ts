import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ProveService } from '../prove.service';
import { Prove } from '../prove';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Message } from '../../../config/message';
import { pagination } from '../../../config/pagination';

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

    constructor(
        private _router: Router,
        private navService: NavigationService,
        private proveService: ProveService
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

    onSearch(Textsearch: any) {
        this.proveService.getByKeyword(Textsearch).subscribe(list => {
            debugger
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

        if (sDateDelivery.getTime() > eDateDelivery.getTime()) {
            alert(Message.checkRevenueDate);
        }
        else if (sDateProve.getTime() > eDateProve.getTime()) {
            alert(Message.checkRevenueDate);
        }
        else {
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
    }

    async pageChanges(event) {
        this.ListProve = await this.Prove.slice(event.startIndex - 1, event.endIndex);
    }

    clickView(LawsuitID: string,ArrestCode: string, ProveID: string) {
        this._router.navigate([`/prove/manage/R/${LawsuitID}/${ArrestCode}/${ProveID}`]);
    }

}
