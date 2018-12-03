import { Injectable } from '@angular/core';
import { HelperService } from './HelperService';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {
  IRequestRewardgetByRequestBribeRewardID,
  IRequestRewardgetByCon,
  IRequestRewardinsAll,
  IRequestRewardupdByCon
} from '../interfaces/RequestReward';

@Injectable()
export class RequestRewardService extends HelperService {
  constructor(private http: HttpClient) {
    super();
  }

  public RequestRewardgetByRequestBribeRewardID(
    param: IRequestRewardgetByRequestBribeRewardID
  ): Observable<any> {
    return this.http.post(
      `${this.ApiPrefixUrl}/RequestRewardgetByRequestBribeRewardID`,
      param
    );
  }

  public RequestRewardgetByCon(param: IRequestRewardgetByCon): Observable<any> {
    return this.http.post(`${this.ApiPrefixUrl}/RequestRewardgetByCon`, param);
  }
  public RequestRewardinsAll(param): Observable<any> {
    return this.http.post(`${this.ApiPrefixUrl}/RequestRewardinsAll`, param);
  }
  public RequestRewardupdByCon(param): Observable<any> {
    return this.http.post(`${this.ApiPrefixUrl}/RequestRewardupdByCon`, param);
  }
}
