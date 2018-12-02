import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appConfig } from 'app/app.config';

@Injectable()
export class MasDocumentMainService {

  constructor(private httpClient: HttpClient
  ) { }

  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json'
      })
  };

  MasDocumentMaininsAll(document: any) {
    const params = document;
    const url = `${appConfig.api7789}/MasDocumentMaininsAll`;
    return this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
  }

  MasDocumentMaingetAll(DocumentType: any, ReferenceCode: string) {
    const params = {DocumentType, ReferenceCode};
    const url = `${appConfig.api7789}/MasDocumentMaingetAll`;
    return this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
  }

  MasDocumentMainupdByCon(document: any) {
    const params = document;
    const url = `${appConfig.api7789}/MasDocumentMainupdByCon`;
    return this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
  }

  MasDocumentMainupdDelete(DocumentID: string) {
    const params = {DocumentID};
    const url = `${appConfig.api7789}/MasDocumentMainupdDelete`;
    return this.httpClient.post<any>(url, params, this.httpOptions).toPromise();
  }

}
