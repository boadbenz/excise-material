import { Injectable } from '@angular/core';
import * as uacDataModel from '../../uac-user-datamodel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UacConfig } from '../../uac-config';
import { LoaderService } from "app/core/loader/loader.service";
import * as uacdatamodel from '../../uac-user-datamodel';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class ManageService {

  constructor(private http: HttpClient, private loaderService: LoaderService) { }

  public roleinsAll(roleRequest: uacdatamodel.RoleinsAllRequest): Promise<any> {
    this.loaderService.show();
    return new Promise((resolve, reject) => {
      this.getAPIResponse(roleRequest, UacConfig.RoleinsAll).then(result => {
        let roleinsAllResponse: uacDataModel.RoleinsAllResponse = result;
        if (roleinsAllResponse.IsSuccess) {
          resolve("OK");
          this.loaderService.hide();
        } else {
          this.loaderService.hide();
          reject("Data Inquiry Error::" + roleinsAllResponse.Msg);
        }
      }).catch(error => {
        this.loaderService.hide();
        reject("Data Submission Error::" + JSON.stringify(error));
      });
    });
  }

  public roleupdByCon(releRequest: uacdatamodel.RoleinsAllRequest): Promise<any> {
    this.loaderService.show();
    return new Promise((resolve, reject) => {
      this.getAPIResponse(releRequest, UacConfig.RoleupdByCon).then(result => {
        let roleupdByConResponse: uacDataModel.RoleupdByConResponse = result;
        if (roleupdByConResponse.IsSuccess) {
          resolve("OK");
          this.loaderService.hide();
        } else {
          this.loaderService.hide();
          reject("Data Inquiry Error::" + roleupdByConResponse.Msg);
        }
      }).catch(error => {
        this.loaderService.hide();
        reject("Data Submission Error::" + JSON.stringify(error));
      });
    });
  }

  public loadRolegetByCon(roleID: number): Promise<any> {
    let rolegetByConRequest: uacDataModel.RolegetByConRequest = new uacDataModel.RolegetByConRequest();
    rolegetByConRequest.RoleID = roleID;
    this.loaderService.show();
    return new Promise((resolve, reject) => {
      this.getAPIResponse(rolegetByConRequest, UacConfig.RolegetByCon).then(result => {
        let rolegetByConResponse: uacDataModel.RolegetByConResponse = result;
        if (rolegetByConResponse.IsSuccess) {
          if (rolegetByConResponse.Data.length == 1) {
            this.loaderService.hide();
            resolve(rolegetByConResponse.Data[0]);
          }
        } else {
          this.loaderService.hide();
          reject("Data Inquiry Error::" + rolegetByConResponse.Msg);
        }
      }).catch(error => {
        this.loaderService.hide();
        reject("Data Submission Error::" + JSON.stringify(error));
      });
    });
  }

  public getAPIResponse(request: any, endpoint: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.http.post(endpoint, request, httpOptions).
          toPromise().
          then(response => { // Success
            resolve(response);
          }).catch(err => {
            reject(err)
          });
      } catch (error) {
        reject(error);
      }
    });
  }
}