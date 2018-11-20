import { Injectable } from '@angular/core';
import { HelperService } from './HelperService';
import { HttpClient } from '@angular/common/http';
import {
  IRequestBribeRewardgetByIndictmentID,
  IRequestBribeRewardinsAll,
  IRequestBribeRewardupdDelete
} from '../interfaces/RequestBribeReward.interface';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RequestBribeRewardService extends HelperService {
  constructor(private http: HttpClient) {
    super();
  }

  public RequestBribeRewardgetByIndictmentID(
    param: IRequestBribeRewardgetByIndictmentID
  ): Observable<any> {
    return this.http.post(
      `${this.ApiPrefixUrl}/RequestBribeRewardgetByIndictmentID`,
      param
    );
  }

  public RequestBribeRewardinsAll(
    param: IRequestBribeRewardinsAll
  ): Observable<any> {
    return this.http.post(
      `${this.ApiPrefixUrl}/RequestBribeRewardinsAll`,
      param
    );
  }

  public RequestBribeRewardupdDelete(
    param: IRequestBribeRewardupdDelete
  ): Observable<any> {
    return this.http.post(
      `${this.ApiPrefixUrl}/RequestBribeRewardupdDelete`,
      param
    );
  }
}
