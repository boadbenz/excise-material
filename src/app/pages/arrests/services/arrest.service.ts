import { Injectable } from "@angular/core";
import { appConfig } from "app/app.config";
import { Arrest } from "../models/arrest";
import { HttpService } from "app/core/http.service";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { LoaderService } from "app/core/loader/loader.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ArrestService {

    constructor(
        private http: HttpService,
        private httpClient: HttpClient,
        private loaderService: LoaderService
    ) {
    }

    version = '0.0.0.70'

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    private onEnd(): void {
        this.hideLoader();
    }

    private showLoader(): void {
        this.loaderService.show();
    }

    private hideLoader(): void {
        this.loaderService.hide();
    }

    private onSuccess(res: Response): void {
        console.log('Request successful');
    }

    private onError(res: Response): void {
        console.log('Error, status code: ' + res.status);
    }

    private onCatch(error: any, caught: Observable<any>): Observable<any> {
        return Observable.throw(error);
    }

    ArrestReportgetByCon(ArrestCode: string) {
        const params = { ArrestCode };
        const url = `${appConfig.apiReport}/ILG60_00_03_001.aspx`;
        this.showLoader();
        return this.httpClient.post(url, params, { ...this.httpOptions, responseType: 'blob' })
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSuccess(res);
            }, (error: any) => {
                this.onError(error);
            })
            .map(x => x)
            .finally(() => this.onEnd());
    }

    ArrestgetByKeyword(Textsearch: any) {
        const params = Textsearch === '' ? { 'Textsearch': '' } : Textsearch;
        const url = `${appConfig.api7788}/ArrestgetByKeyword`;
        return this.http.post(url, params).map(x => x.json());
    }

    async ArrestgetByCon(ArrestCode: string) {
        const params = { ArrestCode };
        const url = `${appConfig.api7788}/ArrestgetByCon`;
        return await this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
    }

    ArrestgetByConAdv(form: any) {
        const params = form;
        const url = `${appConfig.api7788}/ArrestgetByConAdv`;
        return this.http.post(url, params).map(x => x.json());
    }

    async ArrestinsAll(Arrest: any) {
        const params = Arrest;
        const url = `${appConfig.api7788}/ArrestinsAll`;
        return await this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
    }

    async ArrestupdByCon(Arrest: any) {
        const params = Arrest;
        const url = `${appConfig.api7788}/ArrestupdByCon`;
        return await this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
    }

    async ArrestupdDelete(ArrestCode: string) {
        const params = { ArrestCode };
        const url = `${appConfig.api7788}/ArrestupdDelete`;
        return await this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
    }
}
