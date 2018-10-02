import {Injectable} from "@angular/core";
import {appConfig} from "../../app.config";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Lawsuit} from "./models/lawsuit";
import {Arrest} from "../model/arrest";
import {Notice} from "../notices/notice";

@Injectable()
export class LawsuitService {

  private httpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json'}) };

  constructor(private http: HttpClient) { }

  private async responsePromiseGetWithStatus(params: string, url: string) {
    const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
    if (!res.IsSuccess || !(res.ResponseData || []).length) { return []; }
    return res.ResponseData
  }

  private async responsePromiseGetWithoutStatus(params: string, url: string) {
    return await this.http.post<any>(url, params, this.httpOptions).toPromise() || [ ];
  }

  async getByKeywordOnInt(): Promise<Lawsuit[]> {
    const params = { 'Textsearch': '' };
    const url = `${appConfig.api8083}/LawsuitArrestgetByKeyword`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }

  getByKeyword(Textsearch: any): Promise<Lawsuit[]> {
    const params = Textsearch === '' ? { 'Textsearch': '' } : Textsearch;
    const url = `${appConfig.api8083}/LawsuitArrestgetbyKeyword`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url)
  }

  async LawsuitgetByConAdv(form: any): Promise<Lawsuit[]> {
    const url = `${appConfig.api8083}/LawsuitgetByConAdv`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(form), url)
  }

  async ArrestgetByCon(ArrestCode) {
    const params = { ArrestCode: ArrestCode };
    const url = `${appConfig.api7788}/ArrestgetByCon`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }

  async LawsuitgetByCon(LawsuitID) {
    const params = { LawsuitID: LawsuitID };
    const url = `${appConfig.api8083}/LawsuitgetByCon`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }

  async CompareMasLawgetByCon(GuiltBaseID) {
    const params = { GuiltBaseID: GuiltBaseID };
    const url = `${appConfig.api8881}/CompareMasLawgetByCon`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }

  async LawsuitArrestgetByCon(ArrestCode: string) {
    const params = { ArrestCode: ArrestCode };
    const url = `${appConfig.api8083}/LawsuitArrestgetByCon`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }





  async getByArrestCon(ArrestCode: string): Promise<Arrest> {
    const params = { ArrestCode };
    const url = `${appConfig.api7788}/ArrestgetByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res.ResponseData as Arrest;
    } catch (error) {
      await alert(error);
    }
  }

  async ArrestLawbreakergetByCon(LawbreakerID) {
    const params = { LawbreakerID: LawbreakerID };
    const url = `${appConfig.api7788}/ArrestLawbreakergetByCon`;
    return await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
  }

  async LawsuitupdByCon(LawsuitList) {
    const params = LawsuitList;
    const url = `${appConfig.api8083}/LawsuitupdByCon`;
    return await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
  }

  async LawsuitupdDelete(LawsuitID) {
    const params = { LawsuitID: LawsuitID };
    const url = `${appConfig.api8083}/LawsuitupdDelete`;
    return await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
  }



  // async getByKeyword(filterValue) {
  //   const params = JSON.stringify(filterValue);
  //   const url = `${appConfig.api8083}/LawsuitgetByKeyword`;
  //   const res = await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
  //   try {
  //     const res = await this.http
  //       .post(url, params, this.httpOptions)
  //       .toPromise();
  //     return res.json();
  //   } catch (error) {
  //     await alert(error);
  //   }
  // }
  //
  // async LawSuitgetByConAdv(advForm) {
  //   const params = JSON.stringify({ advForm });
  //   const url = `${appConfig.api8083}/LawSuitgetByConAdv`;
  //   try {
  //     const res = await this.http
  //       .post(url, params, this.httpOptions)
  //       .toPromise();
  //     return res.json();
  //   } catch (error) {
  //     await alert(error);
  //   }
  // }
  //
  // async LawsuitArrestgetByCon(ArrestCode) {
  //   const params = JSON.stringify({ ArrestCode: ArrestCode });
  //   const url = `${appConfig.api8083}/LawsuitArrestgetByCon`;
  //   try {
  //     const res = await this.http
  //       .post(url, params, this.httpOptions)
  //       .toPromise();
  //     return res.json();
  //   } catch (error) {
  //     await alert(error);
  //   }
  // }
  //
  // async LawsuitgetByCon(LawsuitID) {
  //   const params = JSON.stringify({ LawsuitID: LawsuitID });
  //   const url = `${appConfig.api8083}/LawsuitgetByCon`;
  //   try {
  //     const res = await this.http
  //       .post(url, params, this.httpOptions)
  //       .toPromise();
  //     return res.json();
  //   } catch (error) {
  //     await alert(error);
  //   }
  // }
  //
  // async ArrestgetByCon(ArrestCode) {
  //   const params = JSON.stringify({ ArrestCode: ArrestCode });
  //   const url = `${appConfig.api7788}/ArrestgetByCon`;
  //   try {
  //     const res = await this.http
  //       .post(url, params, this.httpOptions)
  //       .toPromise();
  //     return res.json();
  //   } catch (error) {
  //     await alert(error);
  //   }
  // }
  //
  // async CompareMasLawgetByCon(GuiltBaseID) {
  //   const params = JSON.stringify({ GuiltBaseID: GuiltBaseID });
  //   const url = `${appConfig.api8881}/CompareMasLawgetByCon`;
  //   try {
  //     const res = await this.http
  //       .post(url, params, this.httpOptions)
  //       .toPromise();
  //     return res.json();
  //   } catch (error) {
  //     await alert(error);
  //   }
  // }


}
