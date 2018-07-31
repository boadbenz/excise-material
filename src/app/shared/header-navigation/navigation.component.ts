import { Component, OnInit, HostListener, Input, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NavigationService } from './navigation.service';
import { NgForm } from '@angular/forms';

// declare var jQuery: any;

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ma-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']

})
export class NavigationComponent implements OnInit {
    newButton: any;
    printButton: any;
    editButton: any;
    deleteButton: any;
    cancelButton: any;
    saveButton: any;
    searchBar: any;
    nextPageButton: any;

    nextPage: string;
    nextPageTitle: string;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private navService: NavigationService
    ) {
        this.newButton = this.navService.showNewButton;
        this.printButton = this.navService.showPrintButton;
        this.editButton = this.navService.showEditButton;
        this.deleteButton = this.navService.showDeleteButton;
        this.cancelButton = this.navService.showCancelButton;
        this.saveButton = this.navService.showSaveButton;
        this.searchBar = this.navService.showSearchBar;
        this.nextPageButton = this.navService.showNextPageButton;
    }

    ngOnInit(): void {
        this.router.events
            .filter(event => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .map(route => {
                // tslint:disable-next-line:curly
                while (route.firstChild) route = route.firstChild;
                return route;
            })
            .filter(route => route.outlet === 'primary')
            .mergeMap(route => route.data)
            .subscribe((event) => {
                if (event['nextPage']) {
                    const next = event['nextPage'];
                    this.nextPage = next['url'];
                    this.nextPageTitle = next['title'];
                }
            });

        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }

            const scrollToTop = window.setInterval(function () {
                const pos = window.pageYOffset;
                if (pos > 0) {
                    window.scrollTo(0, pos - 20); // how far to scroll on each step
                } else {
                    window.clearInterval(scrollToTop);
                }
            }, 16); // how fast to scroll (this equals roughly 60 fps)
        });
    }

    clickAdvSearch() {
        this.navService.setAdvSearch();
    }

    clickSearch(formSearch: NgForm) {
        this.navService.setOnSearch(formSearch.value);
        formSearch.reset();
    }

    clickNew() {
        this.router.navigate([`${this.nextPage}`, 'C', 'NEW']);
    }

    clickNextPage() {
        this.router.navigate([`${this.nextPage}`, 'C', 'NEW']);
    }

    clickPrint() {
        this.navService.setOnPrint(true);
    }

    clickEdit() {
        // set false
        this.navService.setEditField(false);
        this.navService.setEditButton(false);
        this.navService.setPrintButton(false);
        this.navService.setDeleteButton(false);
        // set true
        this.navService.setSaveButton(true);
        this.navService.setCancelButton(true);
        // set event click edit
        this.navService.setOnEdit(true);
    }

    clickCancel() {
        // // set true
        // this.navService.setEditField(true);
        // this.navService.setEditButton(true);
        // this.navService.setPrintButton(true);
        // this.navService.setDeleteButton(true);
        // // set false
        // this.navService.setSaveButton(false);
        // this.navService.setCancelButton(false);
        // set event click cancel
        this.navService.setOnCancel(true);
    }

    clickSave() {
        // set true
        this.navService.setOnSave(true);
    }

    clickDelete() {
        this.navService.setOnDelete(true);
    }

}
