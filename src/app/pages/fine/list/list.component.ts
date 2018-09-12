import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { FineService } from '../fine.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Compare } from '../fine-model';
import { pagination } from '../../../config/pagination';
import { Message } from '../../../config/message';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit, OnDestroy {

    advSearch: any;
    Compare = new Array<Compare>();
    CompareList = new Array<Compare>();
    paginage = pagination;
    private subOnSearch: any;

    @ViewChild('fineTable') fineTable: ElementRef;

    constructor(
        private _router: Router,
        private navService: NavigationService,
        private fineService: FineService
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
        this.fineService.getByKeyword(Textsearch).subscribe(list => {
        debugger
            this.onSearchComplete(list)

        }, (err: HttpErrorResponse) => {
            alert(err.message);
        });
    }

    onAdvSearch(form: any) {
        
        const sDateCompare = new Date(form.value.CompareDateFrom );
        const eDateCompare = new Date(form.value.CompareDateTo);

        if (sDateCompare.getTime() > eDateCompare.getTime()) {
            alert(Message.checkRevenueDate);
        } else {
            form.value.CompareDateFrom  = sDateCompare.getTime();
            form.value.CompareDateTo = eDateCompare.getTime();

            form.value.ProgramCode = "XCS06";
            form.value.ProcessCode = "01";


            this.fineService.getByConAdv(form.value).then(async list => {
debugger
                this.onSearchComplete(list)

            }, (err: HttpErrorResponse) => {
                alert(err.message);
            });
        }
    }

    onSearchComplete(list: any) {
        this.Compare = [];
debugger
        if (!list.length) {
            alert(Message.noRecord);
            return false;
        }

        if (Array.isArray(list)) {
            this.Compare = list;
        } else {
            this.Compare.push(list);
        }

        // set total record
        this.paginage.TotalItems = this.Compare.length;
    }

    clickView(LawsuitID: string,ArrestCode: string, CompareID:string) {
        if(CompareID == null || CompareID == "")
            CompareID = "-";

        this._router.navigate([`/fine/manage/R/${LawsuitID}/${ArrestCode}/${CompareID}`]);
    }

    async pageChanges(event) {
        this.CompareList = await this.Compare.slice(event.startIndex - 1, event.endIndex);
    }
}
