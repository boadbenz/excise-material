import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { ArrestsService } from '../arrests.service';
import { Arrest } from '../arrest';
import { Message } from '../../../config/message';
import { HttpErrorResponse } from '@angular/common/http';
import { toLocalShort } from '../../../config/dateFormat';
@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit, OnDestroy {

    private subOnSearch: any;

    dataTable: any;
    advSearch: any;

    arrestList = new Array<Arrest>();

    constructor(
        private navService: NavigationService,
        private arrestService: ArrestsService,
        private router: Router
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
        this.navService.setNewButton(true);
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

    onSearch(Textsearch: any) {
        this.arrestService.getByKeyword(Textsearch).then(res => this.onSearchComplete(res));
    }

    onAdvSearch(form: any) {

        const sDateCompare = new Date(form.value.DateStartFrom);
        const eDateCompare = new Date(form.value.DateStartTo);

        if (sDateCompare.getTime() > eDateCompare.getTime()) {
            alert(Message.checkDate);
        } else {
            form.value.DateStartFrom = sDateCompare.getTime();
            form.value.DateStartTo = eDateCompare.getTime();
            this.arrestService.getByConAdv(form.value).then(res => this.onSearchComplete(res));
        }
    }

    onSearchComplete(list: Arrest[]) {
        this.arrestList = [];

        if (!list) {
            alert(Message.noRecord);
            return false;
        }

        list.map(p => {
            p.OccurrenceDate = toLocalShort(p.OccurrenceDate);
            console.log(p.ArrestStaff);
        })
        this.arrestList = list;
        
        // if (Array.isArray(list)) {
        //     this.arrestList = list;
        // } else {
        //     this.arrestList.push(list);
        // }

        // set total record
        // this.invesPaginate.TotalItems = this.arrestList.length;
    }

    clickView(invesCode: string) {
        this.router.navigate([`/investigation/manage/R/${invesCode}`]);
    }

    ngOnDestroy() {
        this.subOnSearch.unsubscribe();
    }
}
