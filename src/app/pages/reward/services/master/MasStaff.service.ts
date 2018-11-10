import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MasterHelperService } from './MasterHelperService';

@Injectable()
export class MasStaffService extends MasterHelperService {
  constructor(private http: HttpClient) {
    super();
  }

  public MasStaffMaingetAll() {
    return this.http.post(`${this.ApiPrefixUrl}/MasStaffMaingetAll`, {});
  }
}
