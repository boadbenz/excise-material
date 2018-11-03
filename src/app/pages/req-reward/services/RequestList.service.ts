import { Injectable } from '@angular/core';
import { HelperService } from './HelperService';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IConAdv } from '../request-list/request-list.interface';

@Injectable()
export class RequestListService extends HelperService {
  constructor(private http: HttpClient) {
    super();
  }
  public RequestListgetByKeyword(TextSearch: string): Observable<any> {
    return this.http.post(
      `${this.ApiPrefixUrl}/RequestListgetByKeyword`,
      TextSearch
    );
  }
  public RequestListgetByConAdv(ConAdv: IConAdv): Observable<any> {
    return this.http.post(
        `${this.ApiPrefixUrl}/RequestListgetByConAdv`,
        ConAdv
      );
  }
}
