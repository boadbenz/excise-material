import { Component, OnInit, Output, EventEmitter, Injectable } from '@angular/core';
import { LawbreakerTypes, EntityTypes, ArrestLawbreaker } from '../arrest-lawbreaker';
import { pagination } from 'app/config/pagination';
import { Observable } from 'rxjs/Observable';
import { appConfig } from 'app/app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LawbreakerService {
    constructor(private http: HttpClient) { }

    // tslint:disable-next-line:member-ordering
    private httpOptions = {
        headers: new HttpHeaders(
            {
                'Content-Type': 'application/json'
            })
    };

    searchByKeyword(Textsearch: string) {

    }

    searchAdv(form: any) {
        if (form === '') {
            return Observable.of([]);
        }

        const params = JSON.stringify(form);
        const url = `${appConfig.api8082}/SuspectgetByConAdv`;
        return this.http.post<any>(url, params, this.httpOptions)
            .map(res => {
                if (res.IsSuccess === false) {
                    return Observable.of([]);
                }
                return res.ResponseData;
            })
    }
}

@Component({
    selector: 'app-lawbreaker-modal',
    templateUrl: './lawbreaker-modal.component.html',
    styleUrls: ['./lawbreaker-modal.component.scss'],
})

export class LawbreakerModalComponent implements OnInit {

    isOpen = false;
    isCheckAll = false;
    advSearch = false;
    lawbreaker = new Array<ArrestLawbreaker>();
    lawbreakerList = new Array<ArrestLawbreaker>();

    lawbreakerType = LawbreakerTypes;
    entityType = EntityTypes;

    paginage = pagination;

    @Output() d = new EventEmitter();
    @Output() c = new EventEmitter();

    constructor(private lawService: LawbreakerService) { }

    ngOnInit() {
        this.onDetactTable();
    }

    private onDetactTable() {
    }

    onSearchAdv(f: any) {
        this.lawService.searchAdv(f).subscribe(res => this.lawbreaker = res);
    }

    checkAll() {
        this.isCheckAll = !this.isCheckAll;
    }

    toggle(e) {
        this.advSearch = !this.advSearch;
    }

    dismiss(e: any) {
        this.d.emit(e);
    }

    close(e: any) {
        this.c.emit(e);
    }

    async pageChanges(event: any) {
        this.lawbreakerList = await this.lawbreaker.slice(event.startIndex - 1, event.endIndex);
    }

}
