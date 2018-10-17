import { Injectable } from '@angular/core';
import { HttpService } from 'app/core/http.service';
import { appConfig } from 'app/app.config';

@Injectable()
export class TransactionRunningService {

  constructor(private http: HttpService) { }

  TransactionRunninggetByCon(RunningTable: string, RunningOfficeCode: string) {
      const params = { RunningTable, RunningOfficeCode };
      const url = `${appConfig.api8087}/TransactionRunninggetByCon`;
      return this.http.post(url, params).map(x => x.json());
  }

  TransactionRunninginsAll(RunningOfficeCode: string, RunningTable: string, RunningPrefix: string) {
      const params = { RunningTable, RunningOfficeCode, RunningPrefix };
      const url = `${appConfig.api8087}/TransactionRunninginsAll`;
      return this.http.post(url, params).map(x => x.json());
  }

  TransactionRunningupdByCon(RunningID: string) {
      const params = { RunningID };
      const url = `${appConfig.api8087}/TransactionRunningupdByCon`;
      return this.http.post(url, params).map(x => x.json());
  }

}
