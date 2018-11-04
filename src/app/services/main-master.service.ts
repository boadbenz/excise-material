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
    return this.callApi(`${appConfig.api7789}/MasStaffMaingetAll`);
  }
  MasDepartmentMaingetAll() {
    return this.callApi(`${appConfig.api7789}/MasDepartmentMaingetAll`);
  }
  MasOfficeMaingetAll() {
    return this.callApi(`${appConfig.api7789}/MasOfficeMaingetAll`);
  }
  MasDistrictMaingetAll() {
    return this.callApi(`${appConfig.api7789}/MasDistrictMaingetAll`);
  }
  MasDutyUnitMaingetAll() {
    return this.callApi(`${appConfig.api7789}/MasDutyUnitMaingetAll`);
  }
  MasProductMaingetAll() {
    return this.callApi(`${appConfig.api7789}/MasProductMaingetAll`);
  }
  MasCourtMaingetAll() {
    return this.callApi(`${appConfig.api7789}/MasCourtMaingetAll`);
  }
  MasCommunicationchanelMaingetAll() {
    return this.callApi(`${appConfig.api7789}/MasCommunicationchanelMaingetAll`);
  }
  MasTitleMaingetAll() {
    return this.callApi(`${appConfig.api7789}/MasTitleMaingetAll`);
  }
  MasNationalityMaingetAll() {
    return this.callApi(`${appConfig.api7789}/MasNationalityMaingetAll`);
  }
  MasRaceMaingetAll() {
    return this.callApi(`${appConfig.api7789}/MasRaceMaingetAll`);
  }
  MasReligionMaingetAll() {
    return this.callApi(`${appConfig.api7789}/MasReligionMaingetAll`);
  }
  MasCountryMaingetAll() {
    return this.callApi(`${appConfig.api7789}/MasCountryMaingetAll`);
  }
  MasDocumentMaingetAll(DocumentType: string, ReferenceCode: string): Promise<MasDocumentModel[]> {
    const params = { DocumentType, ReferenceCode }
    return this.resposePromisGetList(JSON.stringify(params), `${appConfig.api7789}/MasDocumentMaingetAll`);
  }



  masStaffMaingetAll(): Promise<any[]> {
    const url = `${appConfig.api7789}/MasStaffMaingetAll`;
    return this.resposePromisGetList('{}', url);
  }

  masDepartmentMaingetAll(): Promise<any[]> {
    const url = `${appConfig.api7789}/MasDepartmentMaingetAll`;
    return this.resposePromisGetList('{}', url);
  }
  masOfficeMaingetAll(): Promise<any[]> {
    const url = `${appConfig.api7789}/MasOfficeMaingetAll`;
    return this.resposePromisGetList('{}', url);
  }
  masDistrictMaingetAll(): Promise<any[]> {
    const url = `${appConfig.api7789}/MasDistrictMaingetAll`;
    return this.resposePromisGetList('{}', url);
  }
  masDutyUnitMaingetAll(): Promise<any[]> {
    const url = `${appConfig.api7789}/MasDutyUnitMaingetAll`;
    return this.resposePromisGetList('{}', url);
  }
  masProductMaingetAll(): Promise<any[]> {
    const url = `${appConfig.api7789}/MasProductMaingetAll`;
    return this.resposePromisGetList('{}', url);
  }
  masCourtMaingetAll(): Promise<any[]> {
    const url = `${appConfig.api7789}/MasCourtMaingetAll`;
    return this.resposePromisGetList('{}', url);
  }
  masCommunicationchanelMaingetAll(): Promise<any[]> {
    const url = `${appConfig.api7789}/MasCommunicationchanelMaingetAll`;
    return this.resposePromisGetList('{}', url);
  }

}
