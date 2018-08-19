import { Staff } from './../income/staff';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { appConfig } from '../../app.config';
import { Investigate } from './investigate';
import { InvestigateTeam } from './investigate-team';
import { InvestigateDetail } from './investigate-detail';

@Injectable()
export class InvestigateService {

    constructor(private http: HttpClient) { }

    // tslint:disable-next-line:member-ordering
    private httpOptions = {
        headers: new HttpHeaders(
            {
                'Content-Type': 'application/json'
            })
    };

    private async resposePromiseArray(params: string, url: string) {
        const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
        return res[0];
    }

    getByKeyword(Textsearch: string) {
        const params = Textsearch === '' ? { 'Textsearch': '' } : Textsearch;
        const url = `${appConfig.apiUrl}/InvestigategetByKeyword`;
        return this.http.post<Investigate[]>(url, params, this.httpOptions);
    }

    getByCon(InvestigateCode: string) {
        const params = { InvestigateCode };
        const url = `${appConfig.apiUrl}/InvestigategetByCon`;
        return this.http.post<Investigate>(url, params, this.httpOptions);
    }

    getByConAdv(form: any) {
        const params = JSON.stringify(form);
        const url = `${appConfig.apiUrl}/InvestigategetByConAdv`;
        return this.http.post<Investigate[]>(url, params, this.httpOptions);
    }

    detailGetByCon(InvestigateCode: string) {
        const params = { InvestigateCode };
        const url = `${appConfig.apiUrl}/InvestigateDetailgetByCon`;
        return this.resposePromiseArray(JSON.stringify(params), url)
    }

    updByCon(investigate: Investigate) {
        const params = investigate;
        const url = `${appConfig.apiUrl}/InvestigateupdByCon`;
        return this.http.post<any>(url, params, this.httpOptions);
    }

    teaminsAll(investTeam: InvestigateTeam) {
        const params = investTeam;
        const url = `${appConfig.apiUrl}/InvestigateTeaminsAll`;
        return this.http.post<any>(url, params, this.httpOptions);
    }

    teamudpDelete(StaffId: string) {
        const params = { StaffId }
        const url = `${appConfig.apiUrl}/InvestigateTeamupdDelete`;
        return this.http.post<any>(url, params, this.httpOptions);
    }

    updDelete(InvestigateCode: string) {
        const params = { InvestigateCode };
        const url = `${appConfig.apiUrl}/InvestigateupdDelete`;
        return this.http.post<any>(url, params, this.httpOptions);
    }

    insAll(investigate: Investigate) {
        const params = investigate;
        const url = `${appConfig.apiUrl}/InvestigateinsAll`;
        return this.http.post<any>(url, params, this.httpOptions);
    }

    masStaffByKeyword() {
        const params = "";
        const url = `${appConfig.apiUrl}/InvestigateMasStaffgetByKeyword`;
        return this.http.post<Investigate[]>(url, params, this.httpOptions);
    }

    teamByKeyword(Textsearch: string) {
        const params = Textsearch === '' ? { 'Textsearch': '' } : Textsearch;
        const url = `${appConfig.apiUrl}/InvestigateTeamgetByKeyword`;
        return this.http.post<Investigate[]>(url, params, this.httpOptions);
    }

    teamgetByCon(InvestigateCode: string) {
        const params = { InvestigateCode };
        const url = `${appConfig.apiUrl}/InvestigateTeamgetByCon`;
        return this.http.post<any>(url, params, this.httpOptions);
    }


}
