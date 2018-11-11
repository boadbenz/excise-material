import { Injectable } from '@angular/core';
import { HelperService } from './HelperService';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IRequestCommandgetByArrestCode, IRequestCommandinsAll } from '../interfaces/RequestCommand';

@Injectable()
export class RequestCommandService  extends HelperService {
    constructor(private http: HttpClient) {
      super();
    }
    public RequestCommandgetByArrestCode(
      param: IRequestCommandgetByArrestCode
    ): Observable<any> {
      return this.http.post(
        `${this.ApiPrefixUrl}/RequestCommandgetByArrestCode`,
        param
      );
    }

    public RequestCommandinsAll(
      param: IRequestCommandinsAll
    ): Observable<any> {
      return this.http.post(
        `${this.ApiPrefixUrl}/RequestCommandinsAll`,
        param
      );
    }
}
