import { Component, OnInit, Output, EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { pagination } from '../../../config/pagination';
import { appConfig } from '../../../app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Message } from '../../../config/message';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { NoticeMasSuspect } from './notice-mas-suspect';
import { LawbreakerTypes, EntityTypes } from 'app/models';
import { NoticeSuspect } from '../../notices/notice-suspect';

@Injectable()
export class SuspectService {

    constructor(private http: HttpClient) { }

    // tslint:disable-next-line:member-ordering
    private httpOptions = {
        headers: new HttpHeaders(
            {
                'Content-Type': 'application/json'
            })
    };

    async searchByKeyword(Textsearch: string): Promise<NoticeMasSuspect[]> {
        const params = JSON.stringify(Textsearch);
        const lawbreakerUrl = `${appConfig.api8082}/NoticeMasLawbreakergetByKeyword`;
        const suspectUrl = `${appConfig.api8082}/NoticeMasSuspectgetByKeyword`;
        const url = { lawbreakerUrl, suspectUrl };

        return this.response(params, url);
    }

    searchAdv(form: any): Promise<NoticeMasSuspect[]> {
        const params = JSON.stringify(form);
        const lawbreakerUrl = `${appConfig.api8082}/NoticeMasLawbreakergetByConAdv`;
        const suspectUrl = `${appConfig.api8082}/NoticeMasSuspectgetByConAdv`;
        const url = { lawbreakerUrl, suspectUrl };

        return this.response(params, url);
    }

    private async response(params: string, url: any) {
        // let lawbreaker = await this.http.post<any>(url.lawbreakerUrl, params, this.httpOptions).toPromise();

        // if (lawbreaker.length) {
        //     let response: NoticeMasSuspect[] = [];
        //     lawbreaker.map(item => {
        //         let obj: any = item;
        //         obj = this.renameProp('LawbreakerID', 'SuspectID', obj);
        //         obj = this.renameProp('LawbreakerType', 'SuspectType', obj);
        //         obj = this.renameProp('LawbreakerTitleCode', 'SuspectTitleCode', obj);
        //         obj = this.renameProp('LawbreakerTitleName', 'SuspectTitleName', obj);
        //         obj = this.renameProp('LawbreakerFirstName', 'SuspectFirstName', obj);
        //         obj = this.renameProp('LawbreakerMiddleName', 'SuspectMiddleName', obj);
        //         obj = this.renameProp('LawbreakerLastName', 'SuspectLastName', obj);
        //         obj = this.renameProp('LawbreakerOtherName', 'SuspectOtherName', obj);
        //         obj = this.renameProp('LawbreakerDesc', 'SuspectDesc', obj);
        //         response.push(obj);
        //     })
        //     return response;
        // } else {
            const suspect = await this.http.post<any>(url.suspectUrl, params, this.httpOptions).toPromise();

            if (suspect.length) {
                return suspect;
            } else {
                alert(Message.noRecord);
                return new Array<NoticeMasSuspect>();
            }
        // }
    }

    private renameProp = (oldProp, newProp, { [oldProp]: old, ...others }) => {
        return { [newProp]: old, ...others };
    };
}

@Component({
    selector: 'app-suspect-modal',
    templateUrl: './suspect-modal.component.html',
    styleUrls: ['./suspect-modal.component.scss']
})
export class SuspectModalComponent implements OnInit, OnDestroy {

    private sub: any;
    isOpen = false;
    isCheckAll = false;
    advSearch = false;
    suspect = new Array<NoticeMasSuspect>();

    suspectTypes = LawbreakerTypes;
    entityType = EntityTypes;

    paginage: any;

    suspectFormGroup: FormGroup;

    @Output() d = new EventEmitter();
    @Output() c = new EventEmitter();
    @Output() exportSuspectData = new EventEmitter<NoticeSuspect[]>()

    get Suspect(): FormArray {
        return this.suspectFormGroup.get('Suspect') as FormArray;
    }

    constructor(
        private suspectService: SuspectService,
        private fb: FormBuilder,
        private preloader: PreloaderService
    ) { }

    ngOnInit() {
        this.paginage = pagination;
        this.suspectFormGroup = this.fb.group({
            Suspect: this.fb.array([])
        });
    }

    private setItemFormArray(array: any[], formControl: string) {
        if (array !== undefined && array.length) {
            const itemFGs = array.map(item => this.fb.group(item));
            const itemFormArray = this.fb.array(itemFGs);
            this.suspectFormGroup.setControl(formControl, itemFormArray);
        }
    }

    async onSearchByKeyword(f: any) {
        this.preloader.setShowPreloader(true)

        await this.suspectService.searchByKeyword(f).then(res => this.onComplete(res));

        this.preloader.setShowPreloader(false)
    }

    async onSearchAdv(f: any) {
        this.preloader.setShowPreloader(true)

        await this.suspectService.searchAdv(f).then(res => this.onComplete(res));

        this.preloader.setShowPreloader(false)
    }

    async onComplete(res: NoticeMasSuspect[]) {

        this.suspect = new Array<NoticeMasSuspect>();
        if (!res.length) {
            alert(Message.noRecord)
            return false;
        }

        const list = await res.map((item, i) => {
            item.RowId = i + 1;
            item.IsChecked = false;
            item.EntityTypeName = this.entityType.find(el => parseInt(el.value) == item.EntityType).text;
            item.SuspectTypeName = this.suspectTypes.find(el => parseInt(el.value) == item.SuspectType).text;
            item.CompanyFullName = `${item.CompanyTitle} ${item.CompanyName}`;
            item.SuspectFullName = `${item.SuspectTitleName} ${item.SuspectFirstName} ${item.SuspectLastName}`;
            return item;
        });

        this.suspect = list;
        // set total record
        this.paginage.TotalItems = this.suspect.length;
        this.pageChanges(this.paginage);
    }

    checkAll() {
        this.isCheckAll = !this.isCheckAll;
        this.Suspect.value.map(item => item.IsChecked = true);
    }

    toggle() {
        this.advSearch = !this.advSearch;
    }

    dismiss(e: any) {
        this.d.emit(e);
    }

    close(e: any) {
        this.c.emit(e);
    }

    async exportData() {
        let form = this.suspectFormGroup.value.Suspect;
        form = await form.filter(item => item.IsChecked === true);
        this.exportSuspectData.emit(form);
        this.close('Save click');
    }

    async pageChanges(event: any) {
        const list = await this.suspect.slice(event.startIndex - 1, event.endIndex);
        this.setItemFormArray(list, 'Suspect')
    }

    ngOnDestroy() {
    }

}
