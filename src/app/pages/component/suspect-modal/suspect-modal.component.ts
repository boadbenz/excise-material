import { Component, OnInit, Output, EventEmitter, Injectable } from '@angular/core';
import { Suspect, SuspectForm } from './suspect';
import { pagination } from 'app/config/pagination';
import { Observable } from 'rxjs/Observable';
import { appConfig } from 'app/app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormArray, FormControl, FormBuilder, FormGroup } from '@angular/forms';

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

    searchByKeyword(Textsearch: string) {

    }

    searchAdv(form: any): Observable<Suspect[]> {
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
    selector: 'app-suspect-modal',
    templateUrl: './suspect-modal.component.html',
    styleUrls: ['./suspect-modal.component.scss']
})
export class SuspectModalComponent implements OnInit {

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
        })
    }

    private setItemFormArray(array: any[], formControl: string) {
        if (array !== undefined && array.length) {
            const itemFGs = array.map(item => this.fb.group(item));
            const itemFormArray = this.fb.array(itemFGs);
            this.suspectFormGroup.setControl(formControl, itemFormArray);
        }
    }

    onSearchAdv(f: any) {
        this.suspectService.searchAdv(f).subscribe(async res => {
            await res.map(item => {
                item.IsChecked = false;
                item.CompanyFullName = `${item.CompanyTitle} ${item.CompanyName}`;
                item.SuspectFullName = `${item.SuspectTitleName} ${item.SuspectFirstName} ${item.SuspectLastName}`;
            });
            this.suspect = res;
            // set total record
            this.paginage.TotalItems = this.suspect.length;
        });
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

}
