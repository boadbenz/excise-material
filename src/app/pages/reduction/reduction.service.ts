import { Injectable } from '@angular/core';
import { appConfig } from "../../app.config";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ReductionService {

    constructor(private http: HttpClient) { }

    private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    ReductionReport(RequestBribeID) {
        const params = { RequestBribeID };
        const url = `${appConfig.apiReport}/ILG60_00_09_001.aspx`;
        return this.http.post(url, params, { ...this.httpOptions, responseType: 'blob' })
            .map(x => x)
    }
    ReductionReport2(RequestBribeID) {
        const params = { RequestBribeID };
        const url = `${appConfig.apiReport}/ILG60_00_09_002.aspx`;
        return this.http.post(url, params, { ...this.httpOptions, responseType: 'blob' })
            .map(x => x)
    }
    ReductionReport3(RequestBribeID) {
        const params = { RequestBribeID };
        const url = `${appConfig.apiReport}/ILG60_00_09_003.aspx`;
        return this.http.post(url, params, { ...this.httpOptions, responseType: 'blob' })
            .map(x => x)
    }
    ReductionReport4(RequestBribeID) {
        const params = { RequestBribeID };
        const url = `${appConfig.apiReport}/ILG60_00_09_004.aspx`;
        return this.http.post(url, params, { ...this.httpOptions, responseType: 'blob' })
            .map(x => x)
    }
}
