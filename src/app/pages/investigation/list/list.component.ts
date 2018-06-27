import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { InvestigateService } from '../investigate.service';
import { HttpErrorResponse } from '@angular/common/http';
import { InvestigateList } from '../investigate-list';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

    advSearch: any;
    invesList = new Array<InvestigateList>();

    private subOnSearch: any;

    constructor(
        private navService: NavigationService,
        private invesService: InvestigateService,
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
        this.subOnSearch = this.navService.textSearch.subscribe(Textsearch => {
            if (Textsearch) {
                this.onSearch(Textsearch);
                this.navService.setOnSearch('');
            }
        })
    }

    ngOnDestroy(): void {
        this.subOnSearch.unsubscribe();
    }

    onSearch(Textsearch: any) {
        this.invesService.getByKeyword(Textsearch)
            .subscribe(list => {

                if (!list) {
                    alert('ไม่พบข้อมูล');
                    return false;
                }

                if (Array.isArray(list)) {
                    this.invesList = list;
                } else {
                    this.invesList.push(list);
                }

            }, (err: HttpErrorResponse) => {
                alert(err.message);
            });
    }

    clickView(invesCode: string) {
        this.router.navigate([`/investigation/manage/R/${invesCode}`]);
    }
}
