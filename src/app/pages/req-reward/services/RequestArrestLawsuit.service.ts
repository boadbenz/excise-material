import { Injectable } from '@angular/core';
import { IRequestArrestLawsuitGetByIndictmentId } from '../request-arrest-lawsuit/request-arrest-lawsuit.interface';
import { Observable } from 'rxjs/Observable';
import { HelperService } from './HelperService';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RequestArrestLawsuitService extends HelperService {
  constructor(private http: HttpClient) {
    super();
  }
  public RequestArrestLawsuitgetByIndictmentID(
    param: IRequestArrestLawsuitGetByIndictmentId
  ): Observable<any> {
    return this.http.post(
      `${this.ApiPrefixUrl}/RequestArrestLawsuitgetByIndictmentID`,
      param
    );
  }
}
