import { Component, OnInit, OnDestroy, Input, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { NoticeService } from '../notice.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import { toLocalNumeric } from '../../../config/dateFormat';
import { products, regions, communicate, DutyUnit } from '../../../models';
import { Message } from '../../../config/message';
import { NoticeProduct, NoticeProductFormControl } from '../notice-product';
import { NoticeSuspect } from '../notice-suspect';
import { NoticeDocument, NoticeDocumentFormControl } from '../notice-document';
import { NoticeStaffFormControl } from '../notice-staff';
import { NoticeInformerFormControl } from '../notice-informer';
import { NoticeLocaleFormControl } from '../notice-locale';
import { Suspect } from '../../component/suspect-modal/suspect';

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html'
})
export class ManageComponent implements OnInit, OnDestroy {

    private sub: any;
    mode: string;
    showEditField: any;
    modal: any;
    noticeCode: string;
    noticeForm: FormGroup;
    searching = false;
    searchFailed = false;
    isConceal = false;

    // importSuspectData = new Array<Suspect>();

    regionModel = regions;
    productModel = products;
    communicateModel = communicate;
    dutyUnitModel = DutyUnit;

    get NoticeStaff(): FormArray {
        return this.noticeForm.get('NoticeStaff') as FormArray;
    }

    get NoticeInformer(): FormArray {
        return this.noticeForm.get('NoticeInformer') as FormArray;
    }

    get NoticeLocale(): FormArray {
        return this.noticeForm.get('NoticeLocale') as FormArray;
    }

    get NoticeProduct(): FormArray {
        return this.noticeForm.get('NoticeProduct') as FormArray;
    }

    get NoticeSuspect(): FormArray {
        return this.noticeForm.get('NoticeSuspect') as FormArray;
    }

    get NoticeDocument(): FormArray {
        return this.noticeForm.get('NoticeDocument') as FormArray;
    }

    constructor(
        private activeRoute: ActivatedRoute,
        private suspectModalService: NgbModal,
        private router: Router,
        private fb: FormBuilder,
        private navService: NavigationService,
        private noticeService: NoticeService
    ) {
        // set false
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);
        // set true
        this.navService.setNextPageButton(true);
    }

    ngOnInit() {
        this.active_route();

        this.navigate_service();

        this.createForm();
    }

    private active_route() {
        this.sub = this.activeRoute.params.subscribe(p => {
            this.mode = p['mode'];
            if (p['mode'] === 'C') {
                // set false
                this.navService.setEditButton(false);
                this.navService.setDeleteButton(false);
                this.navService.setEditField(false);
                // set true
                this.navService.setSaveButton(true);
                this.navService.setCancelButton(true);
                this.noticeCode = `NT-${(new Date).getTime()}`;

            } else if (p['mode'] === 'R') {
                // set false
                this.navService.setSaveButton(false);
                this.navService.setCancelButton(false);
                // set true
                this.navService.setPrintButton(true);
                this.navService.setEditButton(true);
                this.navService.setDeleteButton(true);
                this.navService.setEditField(true);

                if (p['code']) {
                    this.noticeCode = p['code'];
                    this.getByCon(p['code']);
                }
            }
        });
    }

    private navigate_service() {
        this.sub = this.navService.showFieldEdit.subscribe(p => {
            this.showEditField = p;
        });

        this.sub = this.navService.onCancel.subscribe(async status => {
            if (status) {
                await this.navService.setOnCancel(false);
                this.router.navigate(['/arrest/list']);
            }
        })

        this.sub = this.navService.onSave.subscribe(async status => {
            if (status) {
                // set action save = false
                await this.navService.setOnSave(false);
                if (this.mode === 'C') {
                    this.onCreate();

                } else if (this.mode === 'R') {
                    this.onReviced();
                }
            }
        });
    }

    private createForm() {
        this.noticeForm = this.fb.group({
            NoticeCode: new FormControl(this.noticeCode),
            NoticeStationCode: new FormControl('Code'),
            NoticeStation: [null],
            NoticeDate: [null],
            NoticeTime: [null],
            NoticeDue: [null],
            NoticeDueDate: [null],
            GroupNameDesc: new FormControl('groupDesc'),
            CommunicationChanelID: [null],
            DataSource: [null],
            FilePath: [null],
            ArrestCode: [null],
            IsActive: new FormControl(1),
            NoticeStaff: this.fb.array([this.createStaffForm()]),
            NoticeInformer: this.fb.array([this.createInformerForm()]),
            NoticeLocale: this.fb.array([this.createLocaleForm()]),
            NoticeProduct: this.fb.array([this.createProductForm()]),
            NoticeSuspect: this.fb.array([]),
            NoticeDocument: this.fb.array([this.createDocumentForm()])
        })
    }


    private createStaffForm(): FormGroup {
        NoticeStaffFormControl.NoticeCode = new FormControl(this.noticeCode);
        return this.fb.group(NoticeStaffFormControl)
    }

    private createInformerForm(): FormGroup {
        NoticeInformerFormControl.NoticeCode = new FormControl(this.noticeCode);
        return this.fb.group(NoticeInformerFormControl)
    }

    private createLocaleForm(): FormGroup {
        NoticeLocaleFormControl.NoticeCode = new FormControl(this.noticeCode);
        return this.fb.group(NoticeLocaleFormControl)
    }

    private createProductForm(): FormGroup {
        NoticeProductFormControl.NoticeCode = new FormControl(this.noticeCode);
        return this.fb.group(NoticeProductFormControl)
    }

    // private createSuspectForm(): FormGroup {
    //     return this.fb.group({
    //         SuspectID: [null],
    //         SuspectReferenceID: [null],
    //         NoticeCode: new FormControl(this.noticeCode),
    //         SuspectTitleName: [null],
    //         SuspectFirstName: [null],
    //         SuspectLastName: [null],
    //         CompanyTitleName: [null],
    //         CompanyName: [null],
    //         CompanyOtherName: [null],
    //         IsActive: [null],
    //         SuspectFullName: [null],
    //         IsNewItem: [null]
    //     })
    // }

    private createDocumentForm(): FormGroup {
        return this.fb.group(NoticeDocumentFormControl)
    }

    private setItemFormArray(array: any[], formControl: string) {
        if (array !== undefined && array.length) {
            const itemFGs = array.map(item => this.fb.group(item));
            const itemFormArray = this.fb.array(itemFGs);
            this.noticeForm.setControl(formControl, itemFormArray);
        }
    }

    private getByCon(code: string) {
        this.noticeService.getByCon(code).then(async res => {
            this.noticeCode = res.NoticeCode;
            await this.noticeForm.reset({
                NoticeCode: res.NoticeCode,
                NoticeStationCode: res.NoticeStationCode,
                NoticeStation: res.NoticeStation,
                NoticeDate: toLocalNumeric(res.NoticeDate),
                NoticeTime: res.NoticeTime,
                NoticeDue: res.NoticeDue,
                NoticeDueDate: toLocalNumeric(res.NoticeDueDate),
                GroupNameDesc: res.GroupNameDesc,
                CommunicationChanelID: res.CommunicationChanelID,
                ArrestCode: res.ArrestCode,
                IsActive: res.IsActive,
            });

            await res.NoticeStaff.map(item =>
                item.StaffFullName = `${item.TitleName} ${item.FirstName} ${item.LastName}`
            );

            await res.NoticeLocale.map(item =>
                item.Region = `${item.SubDistrict} ${item.District} ${item.Province}`
            )

            await res.NoticeInformer.map(item =>
                item.FullName = `${item.TitleName} ${item.FirstName} ${item.LastName}`
            );

            await res.NoticeSuspect.map(item =>
                item.SuspectFullName = `${item.SuspectTitleName} ${item.SuspectFirstName} ${item.SuspectLastName}`
            )

            await res.NoticeProduct.map(item =>
                item.BrandFullName = `${item.BrandNameTH} ${item.SubBrandNameTH} ${item.ModelName}`
            )

            this.setItemFormArray(res.NoticeStaff, 'NoticeStaffForm');
            this.setItemFormArray(res.NoticeInformer, 'NoticeInformer');
            this.setItemFormArray(res.NoticeLocale, 'NoticeLocale');
            this.setItemFormArray(res.NoticeProduct, 'NoticeProduct');
            this.setItemFormArray(res.NoticeSuspect, 'NoticeSuspect');
            this.setItemFormArray(res.NoticeDocument, 'NoticeDocument')
        })
    }

    private onCreate() {
        const noticeDate = new Date(this.noticeForm.value.NoticeDate);
        const noticeDueDate = new Date(this.noticeForm.value.NoticeDueDate);
        this.noticeForm.value.NoticeDate = noticeDate.toISOString();
        this.noticeForm.value.NoticeDueDate = noticeDueDate.toISOString();

        this.noticeService.insAll(this.noticeForm.value).then(isSuccess => {
            if (isSuccess) { this.onComplete() }
        });
    }

    private onReviced() {
        const noticeDate = new Date(this.noticeForm.value.NoticeDate);
        const noticeDueDate = new Date(this.noticeForm.value.NoticeDueDate);
        this.noticeForm.value.NoticeDate = noticeDate.toISOString();
        this.noticeForm.value.NoticeDueDate = noticeDueDate.toISOString();
        this.noticeService.updByCon(this.noticeForm.value).then(isSuccess => {
            if (isSuccess) { this.onComplete() }
        })
    }

    private async onComplete() {
        // set true
        await this.navService.setEditField(true);
        await this.navService.setEditButton(true);
        await this.navService.setPrintButton(true);
        await this.navService.setDeleteButton(true);
        // set false
        await this.navService.setSaveButton(false);
        await this.navService.setCancelButton(false);

        alert(Message.saveComplete);
    }

    addProduct() {
        let product = new NoticeProduct();
        product.IsNewItem = true;
        this.NoticeProduct.push(this.fb.group(product));
    }

    addSuspect(suspect: any[]) {
        suspect.map(item => {
            item.IsNewItem = true;
            this.NoticeSuspect.push(this.fb.group(item))
        });
    }

    addDocument() {
        let document = new NoticeDocument();
        document.IsNewItem = true;
        this.NoticeDocument.push(this.fb.group(document));
    }


    searchRegion = (text3$: Observable<string>) =>
        text3$
            .debounceTime(300)
            .distinctUntilChanged()
            .map(term => term === '' ? []
                : this.regionModel
                    .filter(v =>
                        v.SubDistrict.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                        v.District.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                        v.Province.toLowerCase().indexOf(term.toLowerCase()) > -1
                    ).slice(0, 10));

    searchProduct = (text$: Observable<string>) =>
        text$
            .debounceTime(300)
            .distinctUntilChanged()
            .do(() => this.searching = true)
            .switchMap(term =>
                this.noticeService.productgetByKeyword(term)
                    .do(() => this.searchFailed = false)
                    .catch(() => {
                        this.searchFailed = true;
                        return Observable.of([]);
                    })
            ).do(() => this.searching = false);

    formatterProduct = (x: { BrandNameTH: string, SubBrandNameTH: string, ModelName: string }) =>
        `${x.BrandNameTH} ${x.SubBrandNameTH} ${x.ModelName}`;

    formatterRegion = (x: { SubDistrict: string, District: string, Province: string }) =>
        `${x.SubDistrict} ${x.District} ${x.Province}`;

    selectItemInformmerRegion(ele: any) {
        ele.item.NoticeCode = this.noticeCode;
        this.NoticeInformer.at(0).patchValue({
            SubDistrictCode: ele.item.SubDistrictCode,
            SubDistrict: ele.item.SubDistrict,
            DistrictCode: ele.item.DistrictCode,
            District: ele.item.District,
            ProvinceCode: ele.item.ProvinceCode,
            Province: ele.item.Province,
            ZipCode: ele.item.ZipCode
        });
    }

    selectItemLocaleRegion(ele: any) {
        ele.item.NoticeCode = this.noticeCode;
        this.NoticeLocale.at(0).patchValue({
            SubDistrictCode: ele.item.SubDistrictCode,
            SubDistrict: ele.item.SubDistrict,
            DistrictCode: ele.item.DistrictCode,
            District: ele.item.District,
            ProvinceCode: ele.item.ProvinceCode,
            Province: ele.item.Province,
            ZipCode: ele.item.ZipCode
        });
    }

    selectItemProductItem(ele: any, index: number) {
        ele.item.NoticeCode = this.noticeCode;
        this.NoticeProduct.at(index).reset(ele.item)
    }

    onDeleteProduct(id: string, index: number) {
        if (this.mode === 'C') {
            this.NoticeProduct.removeAt(index);

        } else if (this.mode === 'R') {
            if (!this.NoticeProduct.at(index).get('ProductID').value) {
                this.NoticeProduct.removeAt(index);
                return false;
            }

            if (confirm(Message.confirmAction)) {
                this.noticeService.productupdDelete(id).then(isSuccess => {
                    if (isSuccess == true) {
                        this.NoticeProduct.removeAt(index);
                    } else {
                        alert(Message.saveError);
                    }
                })
            }
        }
    }

    onDeleteSuspect(id: string, index: number) {
        if (this.mode === 'C') {
            this.NoticeSuspect.removeAt(index);

        } else if (this.mode === 'R') {
            if (!this.NoticeSuspect.at(index).get('SuspectID').value) {
                this.NoticeSuspect.removeAt(index);
                return false;
            }

            if (confirm(Message.confirmAction)) {
                this.noticeService.suspectupdDelete(id).then(isSuccess => {
                    if (isSuccess == true) {
                        this.NoticeSuspect.removeAt(index);
                    } else {
                        alert(Message.saveError);
                    }
                })
            }
        }
    }

    onDeleteDocument(id: string, index: number) {
        if (this.mode === 'C') {
            this.NoticeDocument.removeAt(index);

        } else if (this.mode === 'R') {
            if (!this.NoticeDocument.at(index).get('DocumentID').value) {
                this.NoticeDocument.removeAt(index);
                return false;
            }

            if (confirm(Message.confirmAction)) {
                this.noticeService.suspectupdDelete(id).then(isSuccess => {
                    // tslint:disable-next-line:triple-equals
                    if (isSuccess == true) {
                        this.NoticeSuspect.removeAt(index);
                    } else {
                        alert(Message.saveError);
                    }
                })
            }
        }
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    openSuspect(e) {
        this.modal = this.suspectModalService.open(e, { size: 'lg', centered: true });
    }

    onChangeConceal() {
        this.isConceal = !this.isConceal;
    }
}
