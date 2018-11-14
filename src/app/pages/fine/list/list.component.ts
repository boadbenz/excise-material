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
import { stringify } from 'querystring';

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
        // this.onAdvSearch(form);
        this.onSearch({Textsearch:""});
        this.preLoaderService.setShowPreloader(true);

        this.subOnSearch = await this.navService.searchByKeyword.subscribe(async Textsearch => {
            if (Textsearch) {
                await this.navService.setOnSearch('');
                if(Textsearch.Textsearch && Textsearch.Textsearch == null){
                    Textsearch = {Textsearch:""};
                }
                await this.onSearch(Textsearch);
            }
        });

        this.preLoaderService.setShowPreloader(false);
    }

    ngOnDestroy(): void {
        this.subOnSearch.unsubscribe();
    }

    async onSearch(Textsearch: any) {
        if(Textsearch.Textsearch == null){
            Textsearch = {Textsearch:""};
        }
        await this.fineService.getByKeyword(Textsearch).subscribe(list => {
            this.onSearchComplete(list)
        }, (err: HttpErrorResponse) => {
            console.log("fail onSearch");
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

            isNaN(form.value.CompareDateFrom) ? form.value.CompareDateFrom = "" :  form.value.CompareDateFrom = new Date(form.value.CompareDateFrom).toLocaleString('en-GB', { timeZone: 'UTC' });
            isNaN(form.value.CompareDateTo) ? form.value.CompareDateTo = "" :  form.value.CompareDateFrom = new Date(form.value.CompareDateTo).toLocaleString('en-GB', { timeZone: 'UTC' });

            form.value.ProgramCode = "";
            form.value.ProcessCode = "";
            
            var sendingFormat = {
                ArrestCode: form.value.ArrestCode,
                LawsuitCode: form.value.LawsuitCode,
                CompareCode: form.value.CompareCode,
                ProveReportNo: form.value.ProveReportNo,
                CompareDateFrom: form.value.CompareDateFrom,
                CompareDateTo: form.value.CompareDateTo,
                StaffName: form.value.Staff,
                DepartmentName: form.value.Department,
            }
            this.fineService.getByConAdv(sendingFormat).subscribe(async list => {
                this.onSearchComplete(list)
            }, (err: HttpErrorResponse) => {
                console.log("fail onAdvSearch", err.message);
            });
        }
    }

    onSearchComplete(list: any) {
        var IsOutside = 0;
        var CompareCode = "";
        this.CompareList = [];
        if (list.length < 1) {
            alert(Message.noRecord);
            return false;
        }
        if (Array.isArray(list)) {
            list.forEach(element => {
                this.CompareList.push({
                    CompareCode: CompareCode,
                    ArrestCode: element.ArrestCode, 
                    LawsuitNo: element.LawsuitNo,
                    ProveReportNo: element.ProveReportNo,
                    TitleName: element.TitleName,
                    FirstName: element.FirstName,
                    LastName: element.LastName,
                    CompareDate: new Date(element.CompareDate),
                    DepartmentName: element.DepartmentName,
                    IsOutside: IsOutside
                });                
            });
        } else {
            this.CompareList.push(list);
        }
        // set total record
        this.paginage.TotalItems = this.CompareList.length;
    }

    clickView(LawsuitID: string, ArrestCode: string, CompareID: string) {
        if (CompareID == null || CompareID == "")
            CompareID = "0";

        this._router.navigate([`/fine/manage/R/${LawsuitID}/${ArrestCode}/${CompareID}`]);
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
