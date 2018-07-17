import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { ArrestsService } from '../arrests.service';
import { Arrest } from '../arrest';
import { Message } from '../../../config/message';
import { toLocalShort } from '../../../config/dateFormat';
import { pagination } from '../../../config/pagination';
import { SidebarService } from '../../../shared/sidebar/sidebar.component';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
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
    arrest = new Array<Arrest>();

    @ViewChild('arrestTable') arrestTable: ElementRef;


    constructor(
        private navService: NavigationService,
        private arrestService: ArrestsService,
        private router: Router,
        private sidebarService: SidebarService,
        private preLoader: PreloaderService
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

    async ngOnInit() {
        this.sidebarService.setVersion('1.00');

        this.onSearch('');

        this.subOnSearch = this.navService.searchByKeyword.subscribe(async Textsearch => {
            if (Textsearch) {
                await this.navService.setOnSearch('');
                this.onSearch(Textsearch);
            }
        })
    }

    async onSearch(Textsearch: any) {
        this.preLoader.setShowPreloader(true);
        await this.arrestService.getByKeyword(Textsearch).then(res => this.onSearchComplete(res));
        this.preLoader.setShowPreloader(false);
    }

    async onAdvSearch(form: any) {

        const sDateCompare = new Date(form.value.OccurrenceDateFrom);
        const eDateCompare = new Date(form.value.OccurrenceDateTo);

        if (sDateCompare.getTime() > eDateCompare.getTime()) {
            alert(Message.checkDate);
        } else {
            this.preLoader.setShowPreloader(true);
            form.value.DateStartFrom = sDateCompare.getTime();
            form.value.DateStartTo = eDateCompare.getTime();
            await this.arrestService.getByConAdv(form.value).then(res => this.onSearchComplete(res));
            this.preLoader.setShowPreloader(false);
        }
    }

    onSearchComplete(list: Arrest[]) {
        if (!list.length) {
            alert(Message.noRecord);
            return false;
        }

        this.arrest = [];
        list.map((p, i) => {
            p.RowsId = i + 1;
            p.OccurrenceDate = toLocalShort(p.OccurrenceDate);
            p.ArrestStaff.map(staff => {
                staff.FullName = `${staff.TitleName} ${staff.FirstName} ${staff.LastName}`;
            });
        })
        this.arrest = list;

        // set total record
        this.paginage.TotalItems = this.arrest.length;

    }

    clickView(code: string) {
        this.router.navigate([`/arrest/manage/R/${code}`]);
    }

    async pageChanges(event: any) {
        this.arrestList = await this.arrest.slice(event.startIndex - 1, event.endIndex);
    }

    ngOnDestroy() {
        this.subOnSearch.unsubscribe();
    }
}
