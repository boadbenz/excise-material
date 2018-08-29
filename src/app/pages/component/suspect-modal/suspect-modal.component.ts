import { Component, OnInit, Output, EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { pagination } from '../../../config/pagination';
import { Observable } from 'rxjs/Observable';
import { appConfig } from '../../../app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormArray, FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { Message } from '../../../config/message';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { NoticeSuspect } from '../../notices/notice-suspect';
import { ArrestLawbreaker } from '../../model/arrest-lawbreaker';

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

    async searchByKeyword(Textsearch: string): Promise<NoticeSuspect[]> {
        const params = JSON.stringify(Textsearch);
        const lawbreakerUrl = `${appConfig.api8082}/LawbreakergetByKeyword`;
        const suspectUrl = `${appConfig.api8082}/NoticeSuspectgetByKeyword`;
        const url = { lawbreakerUrl, suspectUrl };

        return this.response(params, url, 'keyword');
    }

    searchAdv(form: any): Promise<NoticeSuspect[]> {
        const params = JSON.stringify(form);
        const lawbreakerUrl = `${appConfig.api8082}/LawbreakergetByConAdv`;
        const suspectUrl = `${appConfig.api8082}/SuspectgetByConAdv`;
        const url = { lawbreakerUrl, suspectUrl };

        return this.response(params, url, 'advance');
    }

    private async response(params: string, url: any, searchMode: string) {
        // const res = await this.http.post<any>(url, params, this.httpOptions).toPromise()
        const lawbreaker = await this.http.post<any>(url.lawbreakerUrl, params, this.httpOptions).toPromise()

        

        if (lawbreaker.IsSuccess && lawbreaker.ResponseData.length) {
            let response: NoticeSuspect[];
            // lawbreaker.reduce()
            // Object.assign({
            //     SuspectID: LawbreakerID,
            //     EntityType,
            //     CompanyTitleCode,
            //     CompanyTitle,
            //     CompanyName,
            //     CompanyOtherName,
            //     CompanyRegistrationNo,
            //     CompanyLicenseNo,
            //     FoundedDate,
            //     LicenseDateForm,
            //     LicenseDateTo,
            //     TaxID,
            //     ExciseRegNo,
            //     SuspectType,
            //     SuspectTitleCode: LawbreakerTitleCode,
            //     SuspectTitleName: LawbreakerTitleName,
            //     SuspectFirstName: LawbreakerFirstName,
            //     SuspectMiddleName: LawbreakerMiddleName,
            //     SuspectLastName:LawbreakertLastName,
            //     SuspectOtherName: LawbreakerOtherName,
            //     SuspectDesc: LawbreakerDesc,
            //     IDCard,
            //     PassportNo,
            //     VISAType,
            //     PassportCountryCode,
            //     PassportCountryName,
            //     PassportDateIn,
            //     PassportDateOut,
            //     BirthDate,
            //     GenderType,
            //     BloodType,
            //     NationalityCode,
            //     NationalityNameTH,
            //     RaceCode,
            //     RaceName,
            //     ReligionCode,
            //     ReligionName,
            //     MaritalStatus,
            //     Career,
            //     GPS,
            //     Location,
            //     Address,
            //     Village,
            //     Building,
            //     Floor,
            //     Room,
            //     Alley,
            //     Road,
            //     SubDistrictCode,
            //     SubDistrict,
            //     DistrictCode,
            //     District,
            //     ProvinceCode,
            //     Province,
            //     ZipCode,
            //     TelephoneNo,
            //     Email,
            //     FatherName,
            //     MotherName,
            //     Remarks,
            //     LinkPhoto,
            //     PhotoDesc,
            //     IsActive,
            // }, ...lawbreaker);

            return response;
        }

        const suspect = await this.http.post<any>(url.suspectUrl, params, this.httpOptions).toPromise();

        if (!suspect.IsSuccess || suspect.ResponseData.length) {
            return suspect.ResponseData;
        }

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
        // let lawbreaker = await this.s
        await this.suspectService.searchByKeyword(f).then(res => res);

        this.preloader.setShowPreloader(false)
    }

    async onSearchAdv(f: any) {
        this.preloader.setShowPreloader(true)

        await this.suspectService.searchAdv(f).then(res => this.onComplete(res));

        this.preloader.setShowPreloader(false)
    }

    async onComplete(res: NoticeSuspect[]) {

        if (!res.length) {
            alert(Message.noRecord)
            return false;
        }

        this.suspect = new Array<NoticeSuspect>();
        const list = await res.map((item, i) => {
            item.RowId = i + 1;
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
