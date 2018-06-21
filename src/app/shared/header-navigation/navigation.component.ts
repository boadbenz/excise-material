import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NavigationService } from './navigation.service';

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

    //-----------------
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
        this
            .router.events
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
    }

    clickAdvSearch() {
        this.navService.setAdvSearch();
    }

    clickNew() {
        this.router.navigate([`${this.nextPage}`, 'c', 'new']);
    }

    clickNextPage() {
        this.router.navigate([`${this.nextPage}`, 'c', 'new']);
        
    }

    clickPrint() {
        
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
    }

    clickCancel() {
        // set true
        this.navService.setEditField(true);
        this.navService.setEditButton(true);
        this.navService.setPrintButton(true);
        this.navService.setDeleteButton(true);
        // set false
        this.navService.setSaveButton(false);
        this.navService.setCancelButton(false);
    }

    clickSave() {
        this.navService.setEditField(false);
        this.navService.setOnSave(true);
    }

    clickDelete() {
        this.navService.setOnDelete(true);
    }

}
