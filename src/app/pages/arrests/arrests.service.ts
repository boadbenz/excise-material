import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { appConfig } from '../../app.config';
import { Arrest } from './arrest';
import { ArrestStaff } from './arrest-staff';
import { ArrestLawbreaker } from './arrest-lawbreaker';
import { ArrestProduct } from './arrest-product';
import { ArrestIndictment } from './arrest-indictment';

// const options = { year: 'numeric', month: 'short', day: 'numeric' };

@Injectable()
export class ArrestsService {
  constructor(private http: HttpClient) {}

  // tslint:disable-next-line:member-ordering
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  async getByKeyword(Textsearch: string): Promise<Arrest[]> {
    const params = Textsearch;
    const url = `${appConfig.api7788}/ArrestgetByKeyword`;

    try {
      const res = await this.http
        .post<any>(url, params, this.httpOptions)
        .toPromise();
      return res.ResponseData as Arrest[];
    } catch (error) {
      await alert(error);
    }
  }

  async getByConAdv(form: any): Promise<Arrest[]> {
    const params = JSON.stringify(form);
    const url = `${appConfig.api7788}/ArrestgetByConAdv`;

    try {
      const res = await this.http
        .post<any>(url, params, this.httpOptions)
        .toPromise();
      return res.ResponseData as Arrest[];
    } catch (error) {
      await alert(error);
    }
  }

  async getByCon(ArrestCode: string): Promise<Arrest> {
    const params = { ArrestCode };
    const url = `${appConfig.api7788}/ArrestgetByCon`;

    try {
      const res = await this.http
        .post<any>(url, params, this.httpOptions)
        .toPromise();
      return res.ResponseData as Arrest;
    } catch (error) {
      await alert(error);
    }
  }

  async updDelete(ArrestCode: string): Promise<any> {
    const params = { ArrestCode };
    const url = `${appConfig.api7788}/ArrestupdDelete`;

    try {
      const res = await this.http
        .post<any>(url, params, this.httpOptions)
        .toPromise();
      return res.ResponseData;
    } catch (error) {
      await alert(error);
    }
  }

  async staffupdDelete(StaffID: string): Promise<any> {
    const params = { StaffID };
    const url = `${appConfig.api7788}/ArrestStaffupdDelete`;

    try {
      const res = await this.http
        .post<any>(url, params, this.httpOptions)
        .toPromise();
      return res.ResponseData;
    } catch (error) {
      await alert(error);
    }
  }

  async lawbreakerupdDelete(LawbreakerID: string): Promise<any> {
    const params = { LawbreakerID };
    const url = `${appConfig.api7788}/ArrestLawbreakerupdDelete`;

    try {
      const res = await this.http
        .post<any>(url, params, this.httpOptions)
        .toPromise();
      return res.ResponseData;
    } catch (error) {
      await alert(error);
    }
  }

  async productupdDelete(ProductID: string): Promise<any> {
    const params = { ProductID };
    const url = `${appConfig.api7788}/ArrestProductupdDelete`;

    try {
      const res = await this.http
        .post<any>(url, params, this.httpOptions)
        .toPromise();
      return res.ResponseData;
    } catch (error) {
      await alert(error);
    }
  }

  async indicmentupdDelete(IndicmentID: string): Promise<any> {
    const params = { IndicmentID };
    const url = `${appConfig.api7788}/ArrestIndicmentupdDelete`;

    try {
      const res = await this.http
        .post<any>(url, params, this.httpOptions)
        .toPromise();
      return res.ResponseData;
    } catch (error) {
      await alert(error);
    }
  }

  async insAll(Arrest: Arrest): Promise<any> {
    const params = Arrest;
    const url = `${appConfig.api7788}/ArrestinsAll`;

    try {
      const res = await this.http
        .post<any>(url, params, this.httpOptions)
        .toPromise();
      return res.ResponseData;
    } catch (error) {
      await alert(error);
    }
  }

  async staffinsAll(Staff: ArrestStaff): Promise<any> {
    const params = Arrest;
    const url = `${appConfig.api7788}/ArrestStaffinsAll`;

    try {
      const res = await this.http
        .post<any>(url, params, this.httpOptions)
        .toPromise();
      return res.ResponseData;
    } catch (error) {
      await alert(error);
    }
  }

  async lawbreakerinsAll(lawbreaker: ArrestLawbreaker): Promise<any> {
    const params = lawbreaker;
    const url = `${appConfig.api7788}/ArrestLawbreakerinsAll`;
    try {
      const res = await this.http
        .post<any>(url, params, this.httpOptions)
        .toPromise();
      return res.ResponseData;
    } catch (error) {
      await alert(error);
    }
  }

  async productinsAll(product: ArrestProduct): Promise<any> {
    const params = product;
    const url = `${appConfig.api7788}/ArrestProductinsAll`;
    try {
      const res = await this.http
        .post<any>(url, params, this.httpOptions)
        .toPromise();
      return res.ResponseData;
    } catch (error) {
      await alert(error);
    }
  }

  async indicmentinsAll(indicment: ArrestIndictment): Promise<any> {
    const params = indicment;
    const url = `${appConfig.api7788}/ArrestIndicmentinsAll`;
    try {
      const res = await this.http
        .post<any>(url, params, this.httpOptions)
        .toPromise();
      return res.ResponseData;
    } catch (error) {
      await alert(error);
    }
  }

  async updByCon(Arrest: Arrest): Promise<any> {
    const params = Arrest;
    const url = `${appConfig.api7788}/ArrestupdByCon`;

    try {
      const res = await this.http
        .post<any>(url, params, this.httpOptions)
        .toPromise();
      return res.ResponseData;
    } catch (error) {
      await alert(error);
    }
  }
}
