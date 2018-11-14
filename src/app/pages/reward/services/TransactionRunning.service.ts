import { Injectable } from '@angular/core';
import { HelperService } from './HelperService';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {
  ITransactionRunninggetByCon,
  ITransactionRunningupdByCon,
  ITransactionRunninginsAll
} from '../interfaces/TransactionRunning';

@Injectable()
export class TransactionRunningService extends HelperService {
  constructor(private http: HttpClient) {
    super();
  }
  public TransactionRunninggetByCon(
    param: ITransactionRunninggetByCon
  ): Observable<any> {
    return this.http.post(
      `${this.ApiPrefixUrl}/TransactionRunninggetByCon`,
      param
    );
  }

  public TransactionRunningupdByCon(
    param: ITransactionRunningupdByCon
  ): Observable<any> {
    return this.http.post(
      `${this.ApiPrefixUrl}/TransactionRunningupdByCon`,
      param
    );
  }

  public TransactionRunninginsAll(
    param: ITransactionRunninginsAll
  ): Observable<any> {
    return this.http.post(
      `${this.ApiPrefixUrl}/TransactionRunninginsAll`,
      param
    );
  }
}
