import { Injectable } from "@angular/core";
import { ArrestProductDetail } from "../models/arrest-product";
import { appConfig } from "app/app.config";
import { HttpService } from "app/core/http.service";

@Injectable()
export class ArrestProductDetailService {

    constructor(private http: HttpService) { }

    ArrestProductDetailinsAll(ArrestProductDetail: ArrestProductDetail) {
        const params = ArrestProductDetail;
        const url = `${appConfig.api7788}/ArrestProductDetailinsAll`;
        return this.http.post(url, params).map(x => x.json());
    }

    ArrestProductDetailupdByCon(ArrestProductDetail: ArrestProductDetail) {
        const params = ArrestProductDetail;
        const url = `${appConfig.api7788}/ArrestProductDetailupdByCon`;
        return this.http.post(url, params).map(x => x.json());
    }
    ArrestProductDetailupdDelete(ProductDetailID: string) {
        const params = { ProductDetailID };
        const url = `${appConfig.api7788}/ArrestProductDetailupdDelete`;
        return this.http.post(url, params).map(x => x.json());
    }


}