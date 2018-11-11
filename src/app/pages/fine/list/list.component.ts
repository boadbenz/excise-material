import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { FineService } from '../fine.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Compare } from '../compare';
import { pagination } from '../../../config/pagination';
import { Message } from '../../../config/message';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { FormGroup, FormControl } from "@angular/forms";

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

    CompareDateFrom = "";
    CompareDateTo = "";

    constructor(
        private _router: Router,
        private navService: NavigationService,
        private fineService: FineService,
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
        // {"ArrestCode":"","LawsuitCode":"","ProveReportNo":"","CompareCode":"","CompareDateFrom":null,"CompareDateTo":null,"ProgramCode":"XCS06","ProcessCode":"01","Staff":"","Department":""}

        const form = new FormGroup({
            ArrestCode: new FormControl(""),
            LawsuitCode: new FormControl(""),
            ProveReportNo: new FormControl(""),
            CompareCode: new FormControl(""),
            CompareDateFrom: new FormControl(""),
            CompareDateTo: new FormControl(""),
            ProgramCode: new FormControl(""),
            ProcessCode: new FormControl(""),
            Staff: new FormControl(""),
            Department: new FormControl(""),

        });

        this.onAdvSearch(form);
        // this.onSearch({ Textsearch: "" });


        this.preLoaderService.setShowPreloader(true);

        this.subOnSearch = await this.navService.searchByKeyword.subscribe(async Textsearch => {
            if (Textsearch) {
                await this.navService.setOnSearch('');
                await this.onSearch(Textsearch);
            }
        });

        this.preLoaderService.setShowPreloader(false);
    }

    ngOnDestroy(): void {
        this.subOnSearch.unsubscribe();
    }

    async onSearch(Textsearch: any) {
        await this.fineService.getListByKeyword(Textsearch).subscribe(list => {
            this.onSearchComplete(list)
        }, (err: HttpErrorResponse) => {
            alert(err.message);
        });
    }

    async onAdvSearch(form: any) {

        const sDateCompare = new Date(form.value.CompareDateFrom);
        const eDateCompare = new Date(form.value.CompareDateTo);

        if (sDateCompare.getTime() > eDateCompare.getTime()) {
            alert(Message.checkRevenueDate);
        } else {
            form.value.CompareDateFrom = sDateCompare.getTime();
            form.value.CompareDateTo = eDateCompare.getTime();

            if (isNaN(form.value.CompareDateFrom)) {
                form.value.CompareDateFrom = "";
                form.value.CompareDateTo = "";
            }

            form.value.ProgramCode = "";
            form.value.ProcessCode = "";


            await this.fineService.getListByConAdv(form.value).then(async list => {
                this.onSearchComplete(list)
            }, (err: HttpErrorResponse) => {
                alert(err.message);
            });
        }
    }

    onSearchComplete(list: any) {
        this.Compare = [];
        console.log("getListByConAdv");
        console.log(list);
        if (list !== undefined && !list.length) {
            alert(Message.noRecord);
            return false;
        }
        //
        if (Array.isArray(list)) {
            this.Compare = list;
        } else {
            this.Compare.push(list);
        }
        //
        // // set total record
        this.paginage.TotalItems = this.Compare.length;
        this.CompareList = this.Compare.slice(0, this.paginage.RowsPerPageOptions[0]);
    }

    clickView(LawsuitID: string, ArrestCode: string, CompareID: string) {
        if (CompareID == null || CompareID == "")
            CompareID = "0";

        // this._router.navigate([`/fine/manage/R/${LawsuitID}/${ArrestCode}/${CompareID}`]);
      // 2018-11-11 : wish
      this._router.navigate([`/fine/manage/R/${LawsuitID}/${CompareID}`]);
    }

    async pageChanges(event) {
        this.CompareList = await this.Compare.slice(event.startIndex - 1, event.endIndex);
    }

    varidateCDF(form: any) {
        const sDateCompare = new Date(form.value.CompareDateFrom);
        const eDateCompare = new Date(form.value.CompareDateTo);

        if (sDateCompare.getTime() > eDateCompare.getTime()) {
            alert(Message.checkReceiveDate);
            this.CompareDateFrom = "";
        }
    }

    varidateCDE(form: any) {
        const sDateCompare = new Date(form.value.CompareDateFrom);
        const eDateCompare = new Date(form.value.CompareDateTo);

        if (sDateCompare.getTime() > eDateCompare.getTime()) {
            alert(Message.checkReceiveDate);
            this.CompareDateTo = "";
        }
    }
}
