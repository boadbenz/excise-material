import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { Observable } from 'rxjs/Observable';
import { MasProductModel, products } from '../../../models/mas-product.model';

@Component({
    selector: 'app-typehead-product',
    templateUrl: './typehead-product.component.html',
    styleUrls: ['./typehead-product.component.scss']
})
export class TypeheadProductComponent implements OnInit {

    productModel: Observable<MasProductModel[]>;

    constructor(
        private store: Store<AppState>
    ) { }

    ngOnInit() {
    }

    searchProduct = (text$: Observable<string>) =>
        text$
            .debounceTime(300)
            .distinctUntilChanged()
            .map(term => term === '' ? []
                : products
                    .filter(v =>
                        v.SubBrandNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                        v.BrandNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                        v.ModelName.toLowerCase().indexOf(term.toLowerCase()) > -1
                    ).slice(0, 10));

    formatter = (x: { BrandNameTH: string, SubBrandNameTH: string, ModelName: string }) =>
        `${x.BrandNameTH} ${x.SubBrandNameTH} ${x.ModelName}`;

    selectItemProductItem(e, i) {

    }
}
