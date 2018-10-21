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

    private async resposePromisGetList(params: string, url: string) {
        const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
        if (!res.length || res.IsSuccess == 'False') {
            return [];
        }
        return res
    }

    private async responsePromisModify(params: string, url: string) {
        const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
        debugger
        if (!res || res.IsSuccess == 'False') {
            return false;
        }
        return true;
    }

    TransactionRunninggetByCon(RunningTable: string, RunningOfficeCode: string) {
        const params = { RunningTable, RunningOfficeCode };
        const url = `${appConfig.api8087}/TransactionRunninggetByCon`;
        return this.resposePromisGetList(JSON.stringify(params), url);
    }

    TransactionRunninginsAll(RunningOfficeCode: string, RunningTable: string, RunningPrefix: string) {
        const params = { RunningTable, RunningOfficeCode, RunningPrefix };
        const url = `${appConfig.api8087}/TransactionRunninginsAll`;
        return this.responsePromisModify(JSON.stringify(params), url);
    }

    TransactionRunningupdByCon(RunningID: string) {
        const params = { RunningID };
        const url = `${appConfig.api8087}/TransactionRunningupdByCon`;
        return this.responsePromisModify(JSON.stringify(params), url);
    }

}
