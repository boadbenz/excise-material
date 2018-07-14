import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Http, Headers } from '@angular/http';
import { appConfig } from '../../app.config';
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import 'rxjs/add/observable/throw';


@Injectable()
export class AccusationsService {

    headers = new Headers();


    constructor(private http: Http) {
        this.headers.append('Content-Type', 'application/json');

    }

    LawsuitgetByKeyword(data): Observable<any> {
        let Textsearch = JSON.stringify(data);
        return this.http
            .post(`${appConfig.api8083}` + '/LawsuitgetByKeyword', Textsearch, {
                headers: this.headers
            })
            .map(res => {
                return res.json();
            })
            .catch(error => {
                return Observable.throw(error);
            })
    }

    LawSuitgetByConAdv(advForm: any): Observable<any> {
        let dataSearch = JSON.stringify({ advForm });
        return this.http
            .post(`${appConfig.api8083}` + '/LawsuitgetByConAdv', dataSearch, {
                headers: this.headers
            })
            .map(res => {
                return res.json();
            })
            .catch(error => {
                return Observable.throw(error);
            })
    }

    LawsuitArrestgetByCon(ArrestCode): Observable<any> {
        let arrestCode = JSON.stringify({ ArrestCode: ArrestCode })
        return this.http
            .post(`${appConfig.api8083}` + '/LawsuitArrestgetByCon', arrestCode, {
                headers: this.headers
            })
            .map(res => {
                return res.json();
            })
            .catch(error => {
                return Observable.throw(error);
            })
    }

    LawsuitgetByCon


}
