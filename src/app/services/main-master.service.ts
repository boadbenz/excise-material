import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appConfig } from 'app/app.config';

@Injectable()
export class MainMasterService {

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
