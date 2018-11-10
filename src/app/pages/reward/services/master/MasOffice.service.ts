import { Injectable } from '@angular/core';
import { MasterHelperService } from './MasterHelperService';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MasOfficeService extends MasterHelperService {
  constructor(private http: HttpClient) {
    super();
  }

  public MasOfficeMaingetAll() {
    return this.http.post(`${this.ApiPrefixUrl}/MasOfficeMaingetAll`, {});
  }
}
