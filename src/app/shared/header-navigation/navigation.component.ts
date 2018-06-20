import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

declare var jQuery: any;

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ma-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']

})
export class NavigationComponent implements OnInit {

    pageType: string;
    nextPage: string;
    nextPageTitle: string;
    mode: string;

    private subParam: any;

    @Output() btnSave: EventEmitter<boolean> = new EventEmitter();
    @Output() btnCancel: EventEmitter<boolean> = new EventEmitter();

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { };

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
                if (event['pageType']) {
                    this.pageType = event['pageType'];
                }
                if (event['nextPage']) {
                    const next = event['nextPage'];
                    this.nextPage = next['url'];
                    this.nextPageTitle = next['title'];
                }
            });
    }

    onSave() {
        this.btnSave.emit(true);
    }

    onCancel() {
        this.btnCancel.emit(true);
    }

    create() {
        this.router.navigate([`${this.nextPage}`, 'c', 'new']);
    }

    advSearch() {
        jQuery('#advSearch').slideToggle();
    }

}
