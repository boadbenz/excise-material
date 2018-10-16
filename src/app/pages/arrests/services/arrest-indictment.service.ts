import { Injectable } from "@angular/core";
import { HttpService } from "app/core/http.service";
import { appConfig } from "app/app.config";
import { ArrestIndictment } from "../models/arrest-indictment";

@Injectable()
export class ArrestIndictmentService {

    constructor(private http: HttpService) { }

    ArrestIndictmentgetByArrestCode(ArrestCode: string) {
        const params = { ArrestCode };
        const url = `${appConfig.api7788}/ArrestIndictmentgetByArrestCode`;
        return this.http.post(url, params).map(x => x.json());
    }

    ArrestIndictmentgetByCon(IndictmentID: string) {
        const params = { IndictmentID };
        const url = `${appConfig.api7788}/ArrestIndictmentgetByCon`;
        return this.http.post(url, params).map(x => x.json());
    }

    ArrestIndictmentinsAll(Indictment: ArrestIndictment) {
        const params = Indictment;
        const url = `${appConfig.api7788}/ArrestIndictmentinsAll`;
        return this.http.post(url, params).map(x => x.json());
    }

    ArrestIndictmentupdByCon(Indictment: ArrestIndictment) {
        const params = Indictment;
        const url = `${appConfig.api7788}/ArrestIndictmentupdByCon`;
        return this.http.post(url, params).map(x => x.json());
    }

    ArrestIndictmentupdDelete(IndictmentID: string) {
        const params = { IndictmentID };
        const url = `${appConfig.api7788}/ArrestIndictmentupdByCon`;
        return this.http.post(url, params).map(x => x.json());
    }
}