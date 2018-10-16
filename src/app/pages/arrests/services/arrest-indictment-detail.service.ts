import { Injectable } from "@angular/core";
import { appConfig } from "app/app.config";
import { HttpService } from "app/core/http.service";
import { ArrestIndictmentDetail } from "../models/arrest-indictment";

@Injectable() 
export class ArrestIndictmentDetailService {

    constructor(private http: HttpService) { }

    ArrestIndicmentDetailgetByIndictmentID(IndictmentID: string){
        const params = { IndictmentID };
        const url = `${appConfig.api7788}/ArrestIndicmentDetailgetByIndictmentID`;
        return this.http.post(url, params).map(x => x.json());
    }

    ArrestIndicmentDetailgetByCon(IndictmentDetailID: string) {
        const params = { IndictmentDetailID };
        const url = `${appConfig.api7788}/ArrestIndicmentDetailgetByCon`;
        return this.http.post(url, params).map(x => x.json());
    }

    ArrestIndicmentDetailinsAll(IndictmentDetail: ArrestIndictmentDetail) {
        const params = IndictmentDetail;
        const url = `${appConfig.api7788}/ArrestIndicmentDetailinsAll`;
        return this.http.post(url, params).map(x => x.json());
    }

    ArrestIndicmentDetailupdByCon(IndictmentDetail: ArrestIndictmentDetail) {
        const params = IndictmentDetail;
        const url = `${appConfig.api7788}/ArrestIndicmentDetailupdByCon`;
        return this.http.post(url, params).map(x => x.json());
    }

    ArrestIndicmentDetailupdDelete(IndictmentDetailID: string) {
        const params = { IndictmentDetailID };
        const url = `${appConfig.api7788}/ArrestIndicmentDetailupdDelete`;
        return this.http.post(url, params).map(x => x.json());
    }
}