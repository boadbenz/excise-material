import { Component, OnInit, Output, EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { pagination } from '../../../config/pagination';
import { Observable } from 'rxjs/Observable';
import { appConfig } from '../../../app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormArray, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Message } from '../../../config/message';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { NoticeSuspect } from '../../notices/notice-suspect';

const suspectTypes = [
    {
        value: '0',
        text: 'ชาวต่างชาติ'
    }, {
        value: '1',
        text: 'ชาวไทย'
    }
]
const entityTypes = [
    {
        value: '1',
        text: 'บุคคลธรรมดา'
    }, {
        value: '2',
        text: 'นิติบุคคล'
    }
]

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

    searchByKeyword(Textsearch: string): Promise<NoticeSuspect[]> {
        const params = JSON.stringify(Textsearch);
        const url = `${appConfig.api8082}/NoticeSuspectgetByKeyword`;
        return this.response(params, url);
    }

    searchAdv(form: any): Promise<NoticeSuspect[]> {
        const params = JSON.stringify(form);
        const url = `${appConfig.api8082}/SuspectgetByConAdv`;
        return this.response(params, url);
    }

    private async response(params: string, url: string) {
        const res = await this.http.post<any>(url, params, this.httpOptions).toPromise()
        if (res.IsSuccess === false) {
            alert(Message.noRecord);
            return [];
        }

        if (!res.ResponseData.length) {
            alert(Message.noRecord);
            return [];
        }
        return res.ResponseData;
    }
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
    suspect = new Array<NoticeSuspect>();
    suspectList = new Array<NoticeSuspect>();

    suspectTypes = suspectTypes;
    entityType = entityTypes;

    paginage = pagination;

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

    async onComplete(res: NoticeSuspect[]) {
        this.suspect = new Array<NoticeSuspect>();
        const list = await res.map((item, i) => {
            item.RowId = i +1;
            item.IsChecked = false;
            item.CompanyFullName = `${item.CompanyTitleName} ${item.CompanyName}`;
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

    toggle(e) {
        this.advSearch = !this.advSearch;
    }

    dismiss(e: any) {
        this.d.emit(e);
    }

    close(e: any) {
        this.c.emit(e);
    }

    async exportData() {
        let form = this.suspectFormGroup.value.Suspect as NoticeSuspect[];
        form = await form
            .map(item => {
                // item.EntityTypeName = this.entityType.find(el => el.value == item.EntityType).text;
                // item.SuspectTypeName = this.suspectTypes.find(el => el.value == item.SuspectType).text;
                item.CompanyFullName = `${item.CompanyTitleName} ${item.CompanyName}`;
                item.SuspectFullName = `${item.SuspectTitleName} ${item.SuspectFirstName} ${item.SuspectLastName}`;
                return item;
            })
            .filter(item => item.IsChecked === true);

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
