import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { ArrestsService } from '../arrests.service';
import { Arrest } from '../arrest';
import { Message } from 'app/config/message';
import { toLocalShort } from 'app/config/dateFormat';
import { pagination } from 'app/config/pagination';
@Component({
    selector: 'app-list',
    templateUrl: './list.component.html'
})
export class ListComponent implements OnInit, OnDestroy {

    private subOnSearch: any;
    paginage = pagination;
    dataTable: any;
    advSearch: any;

    arrestList = new Array<Arrest>();

    @ViewChild('arrestTable') arrestTable: ElementRef;

    constructor(
        private navService: NavigationService,
        private arrestService: ArrestsService,
        private router: Router,
        private chRef: ChangeDetectorRef
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
        if (!list.length) {
            alert(Message.noRecord);
            return false;
        }

        this.arrestList = [];
        list.map(p => {
            p.OccurrenceDate = toLocalShort(p.OccurrenceDate);
            p.ArrestStaff.map(staff => {
                staff.FullName = `${staff.TitleName} ${staff.FirstName} ${staff.LastName}`;
            });
        })
        this.arrestList = list;

        // set total record
        this.paginage.TotalItems = this.arrestList.length;

    }

    clickView(code: string) {
        this.router.navigate([`/arrest/manage/R/${code}`]);
    }

    pageChanges(event) {
        // this.invesPaginate.CurrentPage = event.currentPage;
        // this.invesPaginate.TotalItems = event.totalItems;
        // this.invesPaginate.PageSize = event.pageSize;
        // this.invesPaginate.TotalPageLinkButtons = event.totalPageLinkButtons;

        console.log(this.arrestTable.nativeElement);

    }

    ngOnDestroy() {
        this.subOnSearch.unsubscribe();
    }
}
