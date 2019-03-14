import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as uacDataModel from '../../uac-user-datamodel';
import { UacConfig } from '../../uac-config';
import { LoaderService } from "app/core/loader/loader.service";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()

export class RoleListService {
  constructor(private http: HttpClient, private loaderService: LoaderService) { }

  public roleListItemResponse: uacDataModel.RoleListItemResponse;
  
  public get RoleList(): Array<uacDataModel.RoleListItem> {
    return this.roleListItemResponse != null && this.roleListItemResponse.IsSuccess ? this.roleListItemResponse.Data : new Array<uacDataModel.RoleListItem>();
  }

  public loadRoleListgetByKeyword(request: uacDataModel.RoleListgetByKeywordRequest): Promise<any> {
    this.showLoader();
    return new Promise((resolve, reject) => {
      this.getAPIResponse(request, UacConfig.RoleListgetByKeyword).then(result => {
        let roleListItemResponse: uacDataModel.RoleListItemResponse = result;
        if (roleListItemResponse.IsSuccess) {
          this.roleListItemResponse = roleListItemResponse;
          resolve("OK");
        } else {
          reject("Data Inquiry Error::" + roleListItemResponse.Msg);
        }

        this.hideLoader();
      }).catch(error => {
        reject("Data Submission Error::" + JSON.stringify(error));
        this.hideLoader();
      });
    });
  }

  public loadRoleListgetByConAdv(request: uacDataModel.RoleListgetByConAdvRequest): Promise<any> {
    this.showLoader();
    return new Promise((resolve, reject) => {
      this.getAPIResponse(request, UacConfig.RoleListgetByConAdv).then(result => {
        let roleListItemResponse: uacDataModel.RoleListItemResponse = result;
        if (roleListItemResponse.IsSuccess) {
          this.roleListItemResponse = roleListItemResponse;
          resolve("OK");
        } else {
          reject("Data Inquiry Error::" + roleListItemResponse.Msg);
        }

        this.hideLoader();
      }).catch(error => {
        reject("Data Submission Error::" + JSON.stringify(error));
        this.hideLoader();
      });
    });
  }

  private showLoader(): void {
    this.loaderService.show();
  }

  private hideLoader(): void {
    this.loaderService.hide();
  }

  public getAPIResponse(request: any, endpoint: string): Promise<any> {
    return new Promise((resolve, reject) => {
      //console.log("getAPIResponse this.http==null" + this.http == null);
      //console.log("endpoint=" + endpoint + " <> request=" + request);
      try {
        this.http.post(endpoint, request, httpOptions).
          toPromise().
          then(response => { // Success
            //console.log(">>>>>>>>>>>>>>>  in then")
            //console.log("JSON.stringify(response)==" + JSON.stringify(response));
            resolve(response);
          }).catch(err => {
            //console.log(">>>>>>>>>>>>>>>  in catch")
            //console.log("error=" + JSON.stringify(err));
            reject(err)
          });
        //console.log(">>>>>>>>>>>>>>>  out http")
      } catch (error) {
        reject(error);
      }
    });
  }
}
