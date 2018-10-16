import { Injectable } from "@angular/core";
import { appConfig } from "app/app.config";
import { HttpService } from "app/core/http.service";
import { Arrest } from "../models/arrest";
import { ArrestStaff } from "../models/arrest-staff";

@Injectable()
export class ArrestStaffService {

    constructor(private http: HttpService) { }

    ArrestStaffinsAll(ArrestStaff: ArrestStaff){
        const params = ArrestStaff;
        const url = `${appConfig.api7788}/ArrestStaffinsAll`;
        return this.http.post(url, params).map(x => x.json());
    }

    ArrestStaffupdByCon(ArrestStaff: ArrestStaff) {
        const params = ArrestStaff;
        const url = `${appConfig.api7788}/ArrestStaffupdByCon`;
        return this.http.post(url, params).map(x => x.json());
    }

    ArrestStaffupdDelete(StaffID: string){
        const params = { StaffID };
        const url = `${appConfig.api7788}/ArrestStaffupdDelete`;
        return this.http.post(url, params).map(x => x.json());
    }
}