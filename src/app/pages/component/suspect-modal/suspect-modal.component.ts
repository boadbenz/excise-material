import { Component, OnInit, Output, EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { Suspect, SuspectForm } from './suspect';
import { pagination } from '../../../config/pagination';
import { Observable } from 'rxjs/Observable';
import { appConfig } from '../../../app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormArray, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Message } from '../../../config/message';

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

    searchByKeyword(Textsearch: string): Observable<Suspect[]> {
        if (Textsearch === '') {
            return Observable.of([]);
        }
        const params = JSON.stringify(Textsearch);
        const url = `${appConfig.api8082}/NoticeSuspectgetByKeyword`;
        return this.response(params, url);
    }

    searchAdv(form: any): Observable<Suspect[]> {
        if (form === '') {
            return Observable.of([]);
        }
        const params = JSON.stringify(form);
        const url = `${appConfig.api8082}/SuspectgetByConAdv`;
        return this.response(params, url);
    }

    private response(params: string, url: string) {
        return this.http.post<any>(url, params, this.httpOptions)
            .map(res => {
                if (res.IsSuccess === false) {
                    alert(res.ResponseData.Msg);
                    return Observable.of([]);
                }

                if (!res.ResponseData.length) {
                    alert(Message.noRecord);
                    return Observable.of([]);
                }
                return res.ResponseData;
            })
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
    suspect = new Array<Suspect>();
    suspectList = new Array<Suspect>();

    suspectTypes = suspectTypes;
    entityType = entityTypes;

    paginage = pagination;

    suspectFormGroup: FormGroup;

    @Output() d = new EventEmitter();
    @Output() c = new EventEmitter();
    @Output() exportSuspectData = new EventEmitter<Suspect[]>()

    get Suspect(): FormArray {
        return this.suspectFormGroup.get('Suspect') as FormArray;
    }

    constructor(
        private suspectService: SuspectService,
        private fb: FormBuilder
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

    onSearchByKeyword(f: any) {
        this.suspectService.searchByKeyword(f).subscribe(res => this.onComplete(res));
    }

    onSearchAdv(f: any) {
        this.suspectService.searchAdv(f).subscribe(res => this.onComplete(res));
    }

    async onComplete(res: Suspect[]) {
        this.suspect = new Array<Suspect>();
        const list = await res.map(item => {
            item.IsChecked = false;
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
        let form = this.suspectFormGroup.value.Suspect as Suspect[];
        form = await form
            .map(item => {
                item.EntityTypeName = this.entityType.find(el => el.value == item.EntityType).text;
                item.SuspectTypeName = this.suspectTypes.find(el => el.value == item.SuspectType).text;
                item.CompanyFullName = `${item.CompanyTitle} ${item.CompanyName}`;
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
