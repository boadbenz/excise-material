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
export class NavigationComponent {
    newButton: any;
    printButton: any;
    editButton: any;
    deleteButton: any;
    cancelButton: any;
    saveButton: any;
    searchBar: any;
    proofButton: any;

    constructor(private navService: NavigationService) {
        this.newButton = this.navService.showNewButton;
        this.printButton = this.navService.showPrintButton;
        this.editButton = this.navService.showEditButton;
        this.deleteButton = this.navService.showDeleteButton;
        this.cancelButton = this.navService.showCancelButton;
        this.saveButton = this.navService.showSaveButton;
        this.searchBar = this.navService.showSearchBar;
        this.proofButton = this.navService.showProofButton;
    }

    clickAdvSearch() {
        this.navService.setAdvSearch();
    }

    clickNew() {
        // this.navService.setNewButton
    }

    clickEdit() {
        this.navService.setEditField(false);
    }

    clickCancel() {
        this.navService.setEditField(true);
    }

    clickSave() {
        this.navService.setEditField(false);
    }

    // pageType: string;
    // nextPage: string;
    // nextPageTitle: string;
    // mode: string;

    // private subParam: any;

    // @Output() btnSave: EventEmitter<boolean> = new EventEmitter();
    // @Output() btnCancel: EventEmitter<boolean> = new EventEmitter();

    // constructor(
    //     private router: Router,
    //     private activatedRoute: ActivatedRoute
    // ) { };

    // ngOnInit(): void {
    //     this
    //         .router.events
    //         .filter(event => event instanceof NavigationEnd)
    //         .map(() => this.activatedRoute)
    //         .map(route => {
    //             // tslint:disable-next-line:curly
    //             while (route.firstChild) route = route.firstChild;
    //             return route;
    //         })
    //         .filter(route => route.outlet === 'primary')
    //         .mergeMap(route => route.data)
    //         .subscribe((event) => {
    //             if (event['pageType']) {
    //                 this.pageType = event['pageType'];
    //             }
    //             if (event['nextPage']) {
    //                 const next = event['nextPage'];
    //                 this.nextPage = next['url'];
    //                 this.nextPageTitle = next['title'];
    //             }
    //         });
    // }

    // onSave() {
    //     this.btnSave.emit(true);
    // }

    // onCancel() {
    //     this.btnCancel.emit(true);
    // }

    // onNextToCreate() {
    //     this.router.navigate([`${this.nextPage}`, 'c', 'new']);
    // }

    // advSearch() {
    //     jQuery('#advSearch').slideToggle();
    // }

}
