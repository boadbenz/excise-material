import { Injectable } from "@angular/core";
import { HttpService } from "app/core/http.service";
import { appConfig } from "app/app.config";
import { ArrestProduct } from "../models/arrest-product";

@Injectable()
export class ArrestProductService {

    constructor(private http: HttpService) { }

    ArrestProductgetByArrestCode(ArrestCode: string) {
        const params = { ArrestCode };
        const url = `${appConfig.api7788}/ArrestProductgetByArrestCode`;
        return this.http.post(url, params).map(x => x.json());
    }

    ArrestProductinsAll(ArrestProduct: ArrestProduct) {
        const params = ArrestProduct;
        const url = `${appConfig.api7788}/ArrestProductinsAll`;
        return this.http.post(url, params).map(x => x.json());
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