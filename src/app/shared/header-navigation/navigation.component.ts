import { Component, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

declare var jQuery: any;

@Component({
    selector: 'ma-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']

})
export class NavigationComponent implements OnInit {

    pageType: string;
    nextPage: string;

    // @Output() btnCreate = new EventEmitter();
    // @Output() btnAdvSearch = new EventEmitter();

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
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
                const page = event['page'];
                this.pageType = page['type'];
                this.nextPage = page['next'];
            });
    }

    create() {
        this.router.navigate([`${this.nextPage}`], { queryParams: { c: true } });
    }

    advSearch() {
        jQuery('#advSearch').slideToggle();
    }

}
