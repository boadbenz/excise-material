import { Injectable } from "@angular/core";
import { appConfig } from "app/app.config";
import { HttpService } from "app/core/http.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class ArrestLawSuitService {

    constructor(private http: HttpService,
        private httpClient: HttpClient
    ) { }

    private httpOptions = {
        headers: new HttpHeaders(
            {
                'Content-Type': 'application/json'
            })
    };

    ArrestLawsuitgetByLawbreakerID(LawbreakerID: string) {
        const params = { LawbreakerID };
        const url = `${appConfig.api7788}/ArrestLawsuitgetByLawbreakerID`;
        return this.http.post(url, params).map(x => x.json());
    }

    ArrestLawsuitgetByIndictmentID(IndictmentID: string) {
        const params = { IndictmentID };
        const url = `${appConfig.api7788}/ArrestLawsuitgetByIndictmentID`;
        return this.http.post(url, params).map(x => x.json());
    }
}