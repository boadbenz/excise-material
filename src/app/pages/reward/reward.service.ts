import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { appConfig } from "../../app.config";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class RewardService {

    private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    public bribeState$ = new BehaviorSubject<any>(null);
    constructor(private http: HttpClient, ) { }

    RewardReport08_001(RequestBribeID) {
        const params = { RequestBribeID };
        const url = `${appConfig.apiReport}/ILG60_00_08_001.aspx`;
        return this.http.post(url, params, { ...this.httpOptions, responseType: 'blob' })
            .map(x => x)

    }
    RewardReport08_002(RequestBribeID) {
        const params = { RequestBribeID };
        const url = `${appConfig.apiReport}/ILG60_00_08_002.aspx`;
        return this.http.post(url, params, { ...this.httpOptions, responseType: 'blob' })
            .map(x => x)

    }
}
