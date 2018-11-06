import { Injectable } from '@angular/core';
import { HelperService } from './HelperService';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RequestBribeRewardService extends HelperService {
  constructor(private http: HttpClient) {
    super();
  }
}
