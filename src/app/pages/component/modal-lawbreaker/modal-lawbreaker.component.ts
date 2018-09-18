import { Component, OnInit, Output, EventEmitter, Injectable } from '@angular/core';
import { ArrestLawbreaker } from '../../arrests/arrest-lawbreaker';
import { pagination } from '../../../config/pagination';
import { ArrestsService } from '../../arrests/arrests.service';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { Router } from '@angular/router';
import { LawbreakerTypes, EntityTypes } from '../../../models';
import { Message } from '../../../config/message';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appConfig } from 'app/app.config';
import { NoticeLawbreaker } from './notice-lawbreaker';

@Injectable()
export class LawbreakerService {

    constructor(private http: HttpClient) { }

    private httpOptions = {
        headers: new HttpHeaders(
            {
                'Content-Type': 'application/json'
            })
    };

    async searchByKeyword(Textsearch: string): Promise<NoticeLawbreaker[]> {
        const params = JSON.stringify(Textsearch);
        const lawbreakerUrl = `${appConfig.api8082}/NoticeLawbreakergetByKeyword`;
        const suspectUrl = `${appConfig.api8082}/NoticeMasSuspectgetByKeyword`;
        const url = { lawbreakerUrl, suspectUrl };

        return this.response(params, url);
    }

    searchAdv(form: any): Promise<NoticeLawbreaker[]> {
        const params = JSON.stringify(form);
        const lawbreakerUrl = `${appConfig.api8082}/NoticeLawbreakergetByConAdv`;
        const suspectUrl = `${appConfig.api8082}/NoticeMasSuspectgetByConAdv`;
        const url = { lawbreakerUrl, suspectUrl };

        return this.response(params, url);
    }

    private async response(params: string, url: any) {
        const lawbreaker = await this.http.post<any>(url.lawbreakerUrl, params, this.httpOptions).toPromise()

        if (lawbreaker.NoticeLawbreaker.length) {
            return lawbreaker.NoticeLawbreaker;

        } else {
            const suspect = await this.http.post<any>(url.suspectUrl, params, this.httpOptions).toPromise();

            if (!suspect.ResponseData.length) {
                alert(Message.noRecord);
                return new Array<NoticeLawbreaker>();
            }

            let response: NoticeLawbreaker[] = [];
            suspect.ResponseData.map(item => {
                let obj: any = item;
                obj = this.renameProp('SuspectID', 'LawbreakerID', obj);
                obj = this.renameProp('SuspectType', 'LawbreakerType', obj);
                obj = this.renameProp('SuspectTitleCode', 'LawbreakerTitleCode', obj);
                obj = this.renameProp('SuspectTitleName', 'LawbreakerTitleName', obj);
                obj = this.renameProp('SuspectFirstName', 'LawbreakerFirstName', obj);
                obj = this.renameProp('SuspectMiddleName', 'LawbreakerMiddleName', obj);
                obj = this.renameProp('SuspectLastName', 'LawbreakerLastName', obj);
                obj = this.renameProp('SuspectOtherName', 'LawbreakerOtherName', obj);
                obj = this.renameProp('SuspectDesc', 'LawbreakerDesc', obj);
                response.push(obj);
            })
            return response;
        }
    }

    private renameProp = (oldProp, newProp, { [oldProp]: old, ...others }) => {
        return { [newProp]: old, ...others };
    };
}

@Component({
    selector: 'app-modal-lawbreaker',
    templateUrl: './modal-lawbreaker.component.html'
})

export class ModalLawbreakerComponent implements OnInit {

    isOpen = false;
    isCheckAll = false;
    advSearch = false;
    lawbreaker = new Array<NoticeLawbreaker>();
    lawbreakerList = new Array<NoticeLawbreaker>();

    lawbreakerType = LawbreakerTypes;
    entityType = EntityTypes;

    paginage = pagination;

    lawbreakerFG: FormGroup;

    @Output() d = new EventEmitter();
    @Output() c = new EventEmitter();
    @Output() lawbreakerEmit = new EventEmitter<NoticeLawbreaker[]>();

    get Lawbreaker(): FormArray {
        return this.lawbreakerFG.get('Lawbreaker') as FormArray
    }

    constructor(
        private arrestService: ArrestsService,
        private fb: FormBuilder,
        private preloader: PreloaderService,
        private router: Router
    ) { }

    ngOnInit() {
        this.paginage.TotalItems = 0;
        this.lawbreakerFG = this.fb.group({
            Lawbreaker: this.fb.array([])
        })
    }

    async  onSearchAdv(f: any) {
        this.preloader.setShowPreloader(true);
        await this.arrestService
            .masLawbreakergetByConAdv(f)
            .then(res => this.onSearchComplete(res));
        this.preloader.setShowPreloader(false);
    }

    async  onSearchByKey(f: any) {
        this.preloader.setShowPreloader(true);
        await this.arrestService
            .masLawbreakergetByKeyword(f)
            .then(res => this.onSearchComplete(res));
        this.preloader.setShowPreloader(false)
    }

    private async onSearchComplete(list: NoticeLawbreaker[]) {
        if (!list.length) {
            alert(Message.noRecord);
            return;
        }

        await list.filter(item => item.IsActive == 1).map((item, i) => {
            item.RowId = i + 1;
            item.IsChecked = false;
            item.LawbreakerRefID = item.LawbreakerRefID == null ? 1 : item.LawbreakerRefID
            item.CompanyFullName = `${item.CompanyTitle} ${item.CompanyName}`
            item.LawbreakerFullName = `${item.LawbreakerTitleName} ${item.LawbreakerFirstName} ${item.LawbreakerLastName}`
            item.LawbreakerTypeName = this.lawbreakerType.find(key => parseInt(key.value) == item.LawbreakerType).text
            item.EntityTypeName = this.entityType.find(key => parseInt(key.value) == item.EntityType).text
        })

        this.lawbreaker = list;
        // set total record
        this.paginage.TotalItems = list.length;
    }

    private setItemFormArray(array: any[], formControl: string) {
        if (array !== undefined && array.length) {
            const itemFGs = array.map(item => this.fb.group(item));
            const itemFormArray = this.fb.array(itemFGs);
            this.lawbreakerFG.setControl(formControl, itemFormArray);
        }
    }

    checkAll() {
        this.isCheckAll = !this.isCheckAll;
        this.Lawbreaker.value.map(item => item.IsChecked = true);
    }

    toggle() {
        this.advSearch = !this.advSearch;
    }

    dismiss(e: any) {
        this.d.emit(e);
    }

    view(id: number) {
        this.dismiss('Cross click')
        this.router.navigate([`/arrest/lawbreaker/R/${id}`])
    }

    async close(e: any) {
        let form = this.lawbreakerFG.value.Lawbreaker as NoticeLawbreaker[];
        form = await form
            .filter(item => item.IsChecked);

        this.lawbreakerEmit.emit(form);
        this.c.emit(e);
    }

    async pageChanges(event: any) {
        const list = await this.lawbreaker.slice(event.startIndex - 1, event.endIndex);
        this.setItemFormArray(list, 'Lawbreaker')
    }

}
