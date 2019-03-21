import { Injectable } from '@angular/core';
import { HttpService } from 'app/core/http.service';
import { appConfig } from 'app/app.config';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class TransactionRunningService {

    constructor(private http: HttpClient) { }

    private httpOptions = {
        headers: new HttpHeaders(
            {
                'Content-Type': 'application/json'
            })
    };
    
    async TransactionRunninggetByCon(RunningTable: string, RunningOfficeCode: string) {
        const params = { RunningTable, RunningOfficeCode };
        const url = `${appConfig.api8777}/TransactionRunninggetByCon`;
        return await this.http.post<any>(url, params, this.httpOptions).toPromise();
    }

    async TransactionRunninginsAll(RunningOfficeCode: string, RunningTable: string, RunningPrefix: string) {
        const params = { RunningTable, RunningOfficeCode, RunningPrefix };
        const url = `${appConfig.api8777}/TransactionRunninginsAll`;
        return await this.http.post<any>(url, params, this.httpOptions).toPromise();
    }

    async TransactionRunningupdByCon(RunningID: string) {
        const params = { RunningID };
        const url = `${appConfig.api8777}/TransactionRunningupdByCon`;
        return await this.http.post<any>(url, params, this.httpOptions).toPromise();
    }

}
