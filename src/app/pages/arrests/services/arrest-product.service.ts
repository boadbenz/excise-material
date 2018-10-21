import { Injectable } from "@angular/core";
import { HttpService } from "app/core/http.service";
import { appConfig } from "app/app.config";
import { ArrestProduct } from "../models/arrest-product";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class ArrestProductService {

    constructor(
        private http: HttpService,
        private httpClient: HttpClient
    ) { }

    private httpOptions = {
        headers: new HttpHeaders(
            {
                'Content-Type': 'application/json'
            })
    };

    ArrestProductgetByArrestCode(ArrestCode: string) {
        const params = { ArrestCode };
        const url = `${appConfig.api7788}/ArrestProductgetByArrestCode`;
        return this.http.post(url, params).map(x => x.json());
    }

    ArrestProductinsAll(ArrestProduct: ArrestProduct) {
        const params = ArrestProduct;
        const url = `${appConfig.api7788}/ArrestProductinsAll`;
        return this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
    }

    ArrestProductupdByCon(ArrestProduct: ArrestProduct) {
        const params = ArrestProduct;
        const url = `${appConfig.api7788}/ArrestProductupdByCon`;
        return this.http.post(url, params).map(x => x.json());
    }

    ArrestProductupdDelete(ProductID: string) {
        const params = { ProductID };
        const url = `${appConfig.api7788}/ArrestProductupdDelete`;
        return this.http.post(url, params).map(x => x.json());
    }
}