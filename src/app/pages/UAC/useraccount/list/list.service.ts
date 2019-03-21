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
export class UserListService {
  constructor(private http: HttpClient, private loaderService: LoaderService) { }

  public userAccountListItemResponse: uacDataModel.UserAccountListItemResponse;
  public get UserAccountList() : Array<uacDataModel.UserAccountListItem> {
    return this.userAccountListItemResponse!=null&&this.userAccountListItemResponse.IsSuccess?this.userAccountListItemResponse.Data:new Array<uacDataModel.UserAccountListItem>();
  } 

  public loadUserAccountListgetByKeyword(request: uacDataModel.UserAccountListgetByKeywordRequest): Promise<any> {
    this.showLoader();
    return new Promise((resolve, reject) => {
      this.getAPIResponse(request, UacConfig.UserAccountListgetByKeyword).then(result => {
        let userAccountListItemResponse: uacDataModel.UserAccountListItemResponse = result;
        if (userAccountListItemResponse.IsSuccess) {
          this.userAccountListItemResponse = userAccountListItemResponse;
          resolve("OK");
          
        } else {
          reject("Data Inquiry Error::" + userAccountListItemResponse.Msg);
        }

        this.hideLoader();
      }).catch(error => {
        reject("Data Submission Error::" + JSON.stringify(error));
        this.hideLoader();
      });
    });
  }

  public loadUserAccountListgetByConAdv(request: uacDataModel.UserAccountListgetByConAdvRequest): Promise<any> {
    this.showLoader();
    return new Promise((resolve, reject) => {
      this.getAPIResponse(request, UacConfig.UserAccountListgetByConAdv).then(result => {
        let userAccountListItemResponse: uacDataModel.UserAccountListItemResponse = result;
        if (userAccountListItemResponse.IsSuccess) {
          this.userAccountListItemResponse = userAccountListItemResponse;
          resolve("OK");
        } else {
          reject("Data Inquiry Error::" + userAccountListItemResponse.Msg);
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