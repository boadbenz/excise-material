import { Injectable } from '@angular/core';
import { HelperService } from './HelperService';
import { HttpClient } from '@angular/common/http';
import { IRequestBribeRewardgetByIndictmentID } from '../interfaces/RequestBribeReward.interface';
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
}
