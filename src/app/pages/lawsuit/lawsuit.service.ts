import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { appConfig } from "../../app.config";

@Injectable()
export class LawsuitService {
  private httpOptions = {
    headers: new Headers({
      "Content-Type": "application/json"
    })
  };

  constructor(private http: Http) { }

  async getByKeyword(textSearch) {
    const params = JSON.stringify(textSearch);
    const url = `${appConfig.api8083}/LawsuitgetByKeyword`;
    try {
      const res = await this.http
        .post(url, params, this.httpOptions)
        .toPromise();
      return res.json();
    } catch (error) {
      await alert(error);
    }
  }

  async LawSuitgetByConAdv(advForm) {
    const params = JSON.stringify({ advForm });
    const url = `${appConfig.api8083}/LawSuitgetByConAdv`;
    try {
      const res = await this.http
        .post(url, params, this.httpOptions)
        .toPromise();
      return res.json();
    } catch (error) {
      await alert(error);
    }
  }

  async LawsuitArrestgetByCon(ArrestCode) {
    const params = JSON.stringify({ ArrestCode: ArrestCode });
    const url = `${appConfig.api8083}/LawsuitArrestgetByCon`;
    try {
      const res = await this.http
        .post(url, params, this.httpOptions)
        .toPromise();
      return res.json();
    } catch (error) {
      await alert(error);
    }
  }

  async LawsuitgetByCon(LawsuitID) {
    const params = JSON.stringify({ LawsuitID: LawsuitID });
    const url = `${appConfig.api8083}/LawsuitgetByCon`;
    try {
      const res = await this.http
        .post(url, params, this.httpOptions)
        .toPromise();
      return res.json();
    } catch (error) {
      await alert(error);
    }
  }

  async ArrestgetByCon(ArrestCode) {
    const params = JSON.stringify({ ArrestCode: ArrestCode });
    const url = `${appConfig.api7788}/ArrestgetByCon`;
    try {
      const res = await this.http
        .post(url, params, this.httpOptions)
        .toPromise();
      return res.json();
    } catch (error) {
      await alert(error);
    }
  }

  async CompareMasLawgetByCon(GuiltBaseID) {
    const params = JSON.stringify({ GuiltBaseID: GuiltBaseID });
    const url = `${appConfig.api8881}/CompareMasLawgetByCon`;
    try {
      const res = await this.http
        .post(url, params, this.httpOptions)
        .toPromise();
      return res.json();
    } catch (error) {
      await alert(error);
    }
  }

  async ArrestLawbreakergetByCon(LawbreakerID) {
    const params = JSON.stringify({ LawbreakerID: LawbreakerID });
    const url = `${appConfig.api7788}/ArrestLawbreakergetByCon`;
    try {
      const res = await this.http
        .post(url, params, this.httpOptions)
        .toPromise();
      return res.json();
    } catch (error) {
      await alert(error);
    }
  }

  async LawsuitupdByCon(LawsuitList) {
    const params = JSON.stringify(LawsuitList);
    const url = `${appConfig.api8083}/LawsuitupdByCon`;
    try {
      const res = await this.http
        .post(url, params, this.httpOptions)
        .toPromise();
      return res.json();
    } catch (error) {
      await alert(error);
    }
  }

  async LawsuitupdDelete(LawsuitID) {
    const params = JSON.stringify({ LawsuitID: LawsuitID });
    const url = `${appConfig.api8083}/LawsuitupdDelete`;
    try {
      const res = await this.http
        .post(url, params, this.httpOptions)
        .toPromise();
      return res.json();
    } catch (error) {
      await alert(error);
    }
  }
}
