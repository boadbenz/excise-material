import { Injectable } from '@angular/core';
import { MasterHelperService } from './MasterHelperService';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MasDocumentService extends MasterHelperService {
  constructor(private http: HttpClient) {
    super();
  }

  public MasDocumentMaingetAll() {
    return this.http.post(`${this.ApiPrefixUrl}/MasDocumentMaingetAll`, {});
  }
}
