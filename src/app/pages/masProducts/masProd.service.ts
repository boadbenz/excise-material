import { Injectable, HostListener } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { appConfig } from '../../app.config';
import { PreloaderService } from '../../shared/preloader/preloader.component';

@Injectable()
export class MasProdService {

  constructor(private http: HttpClient,
    private preloaderService: PreloaderService) { }

  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json'
      })
  };

  DutyGroupgetAll() {
    // this.preloaderService.setShowPreloader(true);
    const params = '';
    const url = `${appConfig.api7777}/DutyGroupgetAll`;
    return this.http.post<any>(url, params, this.httpOptions);
  }

  MasProductgetByCon(ProductID: string) {
    const params ={ProductID: ProductID} 
    const url = `${appConfig.api7777}/MasProductgetByCon`;
    return this.http.post<any>(url, params, this.httpOptions);
  }

  BrandSecondgetAll() {
    const params = '';
    const url = `${appConfig.api7777}/BrandSecondgetAll`;
    return this.http.post<any>(url, params, this.httpOptions);
  }

  BrandMaingetAll() {
    const params = '';
    const url = `${appConfig.api7777}/BrandMaingetAll`;
    return this.http.post<BrandMainset>(url, params, this.httpOptions);
  }

  DutyUnitgetAll() {
    const params = '';
    const url = `${appConfig.api7777}/DutyUnitgetAll`;
    return this.http.post<any>(url, params, this.httpOptions);
  }

  SizePackagegetAll() {
    const params = '';
    const url = `${appConfig.api7777}/SizePackagegetAll`;
    return this.http.post<any>(url, params, this.httpOptions);
  }

  MasProductinsAll(params) {
    // const params = '';
    const url = `${appConfig.api7777}/MasProductinsAll`;
    return this.http.post<any>(url, params, this.httpOptions);
  }

  MasProductupdByCon(params) {
    const url = `${appConfig.api7777}/MasProductupdByCon`;
    return this.http.post<any>(url, params, this.httpOptions);
  }

  MasProductupdDelete(ProductID) {
    const params = {ProductID: ProductID}
    const url = `${appConfig.api7777}/MasProductupdDelete`;
    return this.http.post<any>(url, params, this.httpOptions);
  }

}

export interface BrandMainset {
  ID?: string;
  DutyCode?: string;
  BrandMainCode?: string;
  BrandMainThai?: string;
  BrandMainENG?: string;
  GroupID?: string;
  IsActive?: string;
}
