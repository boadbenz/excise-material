import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Reward} from './reward';
import {environment} from '../../../environments/environment';
import {TextSearch} from './reward-search';
import {Lawsuit} from "../lawsuit/models/lawsuit";
import {appConfig} from "../../app.config";

const HOSTNAME = environment.hostXCS60;

@Injectable()
export class RewardService {

  private httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };

  constructor(private http: HttpClient) { }

  private async responsePromiseGet(params: string, url: string) {
    const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
    if (!res.IsSuccess || !(res.ResponseData || []).length) { return []; }
    return res.ResponseData
  }

  async getByKeywordOnInt(): Promise<Reward[]> {
    const params = { 'Textsearch': '' };
    const url = `${appConfig.api8883}/ArrestRequestgetByKeyword`;
    return await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
  }

  async getByKeyword(filterValue: any): Promise<Reward[]> {
    const params = filterValue === '' ? { 'Textsearch': '' } : filterValue;
    const url = `${appConfig.api8883}/ArrestRequestgetByKeyword`;
    // return this.responsePromiseGet(JSON.stringify(params), url)
    return await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
  }

  async getByConAdv(form: any): Promise<Reward[]> {
    const url = `${appConfig.api8883}/ArrestRequestgetByConAdv`;
    return this.responsePromiseGet(JSON.stringify(form), url)
  }

  async getMasStaffRequestGetByKeyword(filterValue: string) {
    const params = { 'Textsearch': (filterValue || '') };
    const url = `${appConfig.api8883}/MasStaffRequestgetByKeyword`;
    return await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
  }

  async getMasDepartmentRequestGetByKeyword(filterValue: string) {
    const params = { 'Textsearch': (filterValue || '') };
    const url = `${appConfig.api8883}/MasDepartmentRequestgetByKeyword`;
    return await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
  }










    // getArrestRequestgetByKeyword(textSearch: string) {
    //     return this.http.post(`${HOSTNAME}/ArrestRequestgetByKeyword`, textSearch)
    // }

    getArrestRequestgetByConAdv(reward: Reward) {
        return this.http.post<any[]>(`${HOSTNAME}/ArrestRequestgetByConAdv`, reward)
    }

    getArrestRequestgetByCon(arrestCode: string) {
        const params = {
            ArrestCode: arrestCode
        };
        return this.http.post<any>(`${HOSTNAME}/ArrestRequestgetByCon`, params)
    }

    getRequestbribegetByKeyword(text: string) {
        const textSearch = new TextSearch();
        textSearch.Textsearch = text;
        return this.http.post(`${HOSTNAME}/RequestbribegetByKeyword`, textSearch)
    }

    getRequestbribegetByCon(requestBribeCode: string) {
        return this.http.post(`${HOSTNAME}/RequestbribegetByCon`, requestBribeCode)
    }
}
