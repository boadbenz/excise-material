import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appConfig } from 'app/app.config';
import { HttpService } from 'app/core/http.service';
import { MasDocumentModel } from 'app/models/mas-document.model';

@Injectable()
export class MainMasterService {

  constructor(
    private http: HttpClient,
    private httpService: HttpService
  ) { }

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

  callApi(url: string): Promise<any[]> {
    return this.resposePromisGetList('{}', url);
  }

  MasStaffMaingetAll() {
    return this.callApi(`${appConfig.api8777}/MasStaffMaingetAll`);
  }
  MasDepartmentMaingetAll() {
    return this.callApi(`${appConfig.api8777}/MasDepartmentMaingetAll`);
  }
  MasOfficeMaingetAll() {
    return this.callApi(`${appConfig.api8777}/MasOfficeMaingetAll`);
  }
  MasDistrictMaingetAll() {
    return this.callApi(`${appConfig.api8777}/MasDistrictMaingetAll`);
  }
  MasDutyUnitMaingetAll() {
    return this.callApi(`${appConfig.api8777}/MasDutyUnitMaingetAll`);
  }
  MasProductMaingetAll() {
    return this.callApi(`${appConfig.api8777}/MasProductMaingetAll`);
  }
  MasCourtMaingetAll() {
    return this.callApi(`${appConfig.api8777}/MasCourtMaingetAll`);
  }
  MasCommunicationchanelMaingetAll() {
    return this.callApi(`${appConfig.api8777}/MasCommunicationchanelMaingetAll`);
  }
  MasTitleMaingetAll() {
    return this.callApi(`${appConfig.api8777}/MasTitleMaingetAll`);
  }
  MasNationalityMaingetAll() {
    return this.callApi(`${appConfig.api8777}/MasNationalityMaingetAll`);
  }
  MasRaceMaingetAll() {
    return this.callApi(`${appConfig.api8777}/MasRaceMaingetAll`);
  }
  MasReligionMaingetAll() {
    return this.callApi(`${appConfig.api8777}/MasReligionMaingetAll`);
  }
  MasCountryMaingetAll() {
    return this.callApi(`${appConfig.api8777}/MasCountryMaingetAll`);
  }
  MasDocumentMaingetAll(DocumentType: string, ReferenceCode: string): Promise<MasDocumentModel[]> {
    const params = { DocumentType, ReferenceCode }
    return this.resposePromisGetList(JSON.stringify(params), `${appConfig.api8777}/MasDocumentMaingetAll`);
  }



  masStaffMaingetAll(): Promise<any[]> {
    const url = `${appConfig.api8777}/MasStaffMaingetAll`;
    return this.resposePromisGetList('{}', url);
  }

  masDepartmentMaingetAll(): Promise<any[]> {
    const url = `${appConfig.api8777}/MasDepartmentMaingetAll`;
    return this.resposePromisGetList('{}', url);
  }
  masOfficeMaingetAll(): Promise<any[]> {
    const url = `${appConfig.api8777}/MasOfficeMaingetAll`;
    return this.resposePromisGetList('{}', url);
  }
  masDistrictMaingetAll(): Promise<any[]> {
    const url = `${appConfig.api8777}/MasDistrictMaingetAll`;
    return this.resposePromisGetList('{}', url);
  }
  masDutyUnitMaingetAll(): Promise<any[]> {
    const url = `${appConfig.api8777}/MasDutyUnitMaingetAll`;
    return this.resposePromisGetList('{}', url);
  }
  masProductMaingetAll(): Promise<any[]> {
    const url = `${appConfig.api8777}/MasProductMaingetAll`;
    return this.resposePromisGetList('{}', url);
  }
  masCourtMaingetAll(): Promise<any[]> {
    const url = `${appConfig.api8777}/MasCourtMaingetAll`;
    return this.resposePromisGetList('{}', url);
  }
  masCommunicationchanelMaingetAll(): Promise<any[]> {
    const url = `${appConfig.api8777}/MasCommunicationchanelMaingetAll`;
    return this.resposePromisGetList('{}', url);
  }

}
