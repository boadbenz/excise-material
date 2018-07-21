import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { InvestigateService } from '../investigate.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Investigate } from '../investigate';
import { pagination } from '../../../config/pagination';
import { Message } from '../../../config/message';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

    advSearch: any;
    investigate = new Array<Investigate>();
    invesList = new Array<Investigate>();
    paginage = pagination;
    private subOnSearch: any;

    @ViewChild('invesTable') invesTable: ElementRef;

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
        this.invesService.getByKeyword(Textsearch).subscribe(list => {

            this.onSearchComplete(list)

        }, (err: HttpErrorResponse) => {
            alert(err.message);
        });
    }

    onAdvSearch(form: any) {
      var options = { year: 'numeric', month: 'short', day: 'numeric' };
        const sDateCompare = new Date(form.value.DateStartFrom);
        const eDateCompare = new Date(form.value.DateStartTo);
        if (sDateCompare.getTime() > eDateCompare.getTime()) {
            alert(Message.checkDate);
        } else {
          console.log(`sDate: ${sDateCompare} eDate: ${eDateCompare}`)
            form.value.DateStartFrom = sDateCompare.getTime();
            form.value.DateStartTo = eDateCompare.getTime();
            form.value.StaffName = "ธวัชชัย";
            this.invesService.getByConAdv(form.value).subscribe(list => {
              console.log('list: ',list)
                this.onSearchComplete(list)

            }, (err: HttpErrorResponse) => {
              console.log('error: ',err)
                alert(err.message);
            });
        }
    }

    onSearchComplete(list: any) {
        this.investigate = [];

        if (!list) {
            alert(Message.noRecord);
            return false;
        }

        if (Array.isArray(list)) {
            this.investigate = list;
        } else {
            this.investigate.push(list);
        }

        if (!this.investigate.length) {
            alert(Message.noRecord);
        }
        this.invesList = this.investigate.slice(0, this.paginage.PageSize);
        // set total record
        this.paginage.TotalItems = this.investigate.length;
    }

    clickView(invesCode: string) {
        this.router.navigate([`/investigation/manage/R/${invesCode}`]);
    }

    async pageChanges(event) {
      console.log('pageChanges: ',event)
        this.invesList = await this.investigate.slice(event.startIndex - 1, event.endIndex);
    }
}
