import { Injectable } from "@angular/core";
import { appConfig } from "app/app.config";
import { HttpService } from "app/core/http.service";
import { Arrest } from "../models/arrest";
import { ArrestStaff } from "../models/arrest-staff";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class ArrestStaffService {

    constructor(private http: HttpService,
        private httpClient: HttpClient
    ) { }

    private httpOptions = {
        headers: new HttpHeaders(
            {
                'Content-Type': 'application/json'
            })
    };

    async ArrestStaffinsAll(ArrestStaff: any){
        const params = ArrestStaff;
        const url = `${appConfig.api7788}/ArrestStaffinsAll`;
        return await this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
    }

    async ArrestStaffupdByCon(ArrestStaff: any) {
        const params = ArrestStaff;
        const url = `${appConfig.api7788}/ArrestStaffupdByCon`;
        return await this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
    }

    async ArrestStaffupdDelete(StaffID: string){
        const params = { StaffID };
        const url = `${appConfig.api7788}/ArrestStaffupdDelete`;
        return await this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
    }
}