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
    const textSearch = { 'Textsearch': text };
    return this.http.post(`${HOSTNAME}/RequestbribegetByKeyword`, textSearch)
  }

  getNoticeRequestgetByCon(text: string) {
    const textSearch = { 'NoticeCode': text };
    return this.http.post(`${HOSTNAME}/NoticeRequestgetByCon`, textSearch)
  }

  getRequestrewardgetByCon(text: string) {
    const textSearch = { 'RequestRewardCode': text };
    return this.http.post(`${HOSTNAME}/RequestrewardgetByCon`, textSearch)
  }

  getRequestbribegetByCon(requestBribeCode: string) {
    return this.http.post(`${HOSTNAME}/RequestbribegetByCon`, requestBribeCode)
  }

  async ArrestRequestupdDelete(ArrestCode: string) {
    const params = { ArrestCode: ArrestCode };
    const url = `${appConfig.api8883}/ArrestRequestupdDelete`;
    return await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
  }

  async RequestbribeupdDelete(RequestBribeCode: string) {
    const params = { ArrestCode: RequestBribeCode };
    const url = `${appConfig.api8883}/RequestbribeupdDelete`;
    return await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
  }

  async RequestrewardupdDelete(RequestRewardCode: string) {
    const params = { ArrestCode: RequestRewardCode };
    const url = `${appConfig.api8883}/RequestrewardupdDelete`;
    return await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
  }

  async RequestbribeinsAll(form) {
    const params = form;
    const url = `${appConfig.api8883}/RequestbribeinsAll`;
    return await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
  }

}
