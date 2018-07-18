import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { AppState } from 'app/app.state';
import { ProductModel, ProvinceModel, DistrictModel, SubdistrictModel } from 'app/models'
import * as ProductActions from 'app/actions/arrest/get-mas-productget-all.action';
import { Observable } from 'rxjs/Observable';
import { NavigationService } from 'app/shared/header-navigation/navigation.service';
import { ArrestsService } from '../arrests.service';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { toLocalNumeric } from 'app/config/dateFormat';
import { ArrestStaff, ArrestStaffFormControl } from '../arrest-staff';
import { Message } from 'app/config/message';
import { ArrestProduct, ArrestProductFormControl } from '../arrest-product';
import { ArrestDocument } from '../arrest-document';
import { ArrestIndictment } from '../arrest-indictment';
import { SidebarService } from 'app/shared/sidebar/sidebar.component';
import { ArrestLocaleFormControl } from '../arrest-locale';
import { ArrestLawbreakerFormControl } from '../arrest-lawbreaker';
import { PreloaderService } from 'app/shared/preloader/preloader.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit, OnDestroy {

    private sub: any;
    mode: string;
    modal: any;
    arrestCode: string;
    showEditField: any;

    arrestForm: FormGroup;

    productModel: Observable<ProductModel[]>;

    subdistrict: SubdistrictModel[];
    district: DistrictModel[];
    province: ProvinceModel[];
    typeheadProduct: ProductModel[];

    get ArrestStaff(): FormArray {
        return this.arrestForm.get('ArrestStaff') as FormArray;
    }

    get ArrestLocale(): FormArray {
        return this.arrestForm.get('ArrestLocale') as FormArray;
    }

    get ArrestLawbreaker(): FormArray {
        return this.arrestForm.get('ArrestLawbreaker') as FormArray;
    }

    get ArrestProduct(): FormArray {
        return this.arrestForm.get('ArrestProduct') as FormArray;
    }

    get ArrestIndictment(): FormArray {
        return this.arrestForm.get('ArrestIndictment') as FormArray;
    }

    get ArrestDocument(): FormArray {
        return this.arrestForm.get('ArrestDocument') as FormArray;
    }

    @Input() _noticeCode: string;
    @ViewChild('printDocModal') printDocModel: ElementRef;
    @Input() noticeCode: string;

    constructor(
        private fb: FormBuilder,
        private activeRoute: ActivatedRoute,
        private suspectModalService: NgbModal,
        private navService: NavigationService,
        private ngbModel: NgbModal,
        private arrestService: ArrestsService,
        private router: Router,
        private sidebarService: SidebarService,
        private preloader: PreloaderService,
        private store: Store<AppState>
    ) {
        // set false
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);
        // set true
        this.navService.setNextPageButton(true);

        this.productModel = store.select('productModel');
    }

    ngOnInit() {

        this.sidebarService.setVersion('1.00');

        this.active_route();

        this.navigate_Service();

        this.createForm();

        this.preloader.setShowPreloader(true);

        this.addProductStore()
        this.addRegion()

        this.preloader.setShowPreloader(false);


    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    private createForm() {
        this.arrestForm = this.fb.group({
            ArrestCode: new FormControl(this.arrestCode),
            ArrestDate: new FormControl(null),
            ArrestTime: new FormControl(null),
            OccurrenceDate: new FormControl(null),
            OccurrenceTime: new FormControl(null),
            ArrestStationCode: new FormControl('stationCode'),
            ArrestStation: new FormControl('station'),
            HaveCulprit: new FormControl(0),
            Behaviour: new FormControl(null),
            Testimony: new FormControl(null),
            Prompt: new FormControl(null),
            IsMatchNotice: new FormControl(null),
            ArrestDesc: new FormControl(null),
            NoticeCode: new FormControl(null),
            InvestigationSurveyDocument: new FormControl(null),
            InvestigationCode: new FormControl(null),
            IsActive: new FormControl(null),
            ArrestStaff: this.fb.array([this.createStaffForm()]),
            ArrestLocale: this.fb.array([this.createLocalForm()]),
            ArrestLawbreaker: this.fb.array([this.createLawbreakerForm()]),
            ArrestProduct: this.fb.array([this.createProductForm()]),
            ArrestIndictment: this.fb.array([]),
            ArrestDocument: this.fb.array([])
        })
    }

    private createStaffForm(): FormGroup {
        ArrestStaffFormControl.ArrestCode = new FormControl(this.arrestCode);
        return this.fb.group(ArrestStaffFormControl);
    }

    private createLocalForm(): FormGroup {
        ArrestLocaleFormControl.ArrestCode = new FormControl(this.arrestCode);
        return this.fb.group(ArrestLocaleFormControl);
    }

    private createLawbreakerForm(): FormGroup {
        ArrestLawbreakerFormControl.ArrestCode = new FormControl(this.arrestCode);
        return this.fb.group(ArrestLawbreakerFormControl);
    }

    private createProductForm(): FormGroup {
        ArrestProductFormControl.ArrestCode = new FormControl(this.arrestCode);
        return this.fb.group(ArrestProductFormControl);
    }

    private setItemFormArray(array: any[], formControl: string) {
        if (array !== undefined && array.length) {
            const itemFGs = array.map(item => this.fb.group(item));
            const itemFormArray = this.fb.array(itemFGs);
            this.arrestForm.setControl(formControl, itemFormArray);
        }
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
                this.arrestCode = `NT-${(new Date).getTime()}`;

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
                    this.arrestCode = p['code'];
                    this.getByCon(p['code']);
                }
            }
        });
    }

    private navigate_Service() {
        this.sub = this.navService.showFieldEdit.subscribe(p => {
            this.showEditField = p;
        });

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

        this.sub = this.navService.onDelete.subscribe(async status => {
            if (status) {
                await this.navService.setOnDelete(false);
                this.onDelete();
            }
        });

        this.sub = this.navService.onCancel.subscribe(async status => {
            if (status) {
                await this.navService.setOnCancel(false);
                this.router.navigate(['/arrest/list']);
            }
        })

        this.sub = this.navService.onPrint.subscribe(async status => {
            if (status) {
                await this.navService.setOnPrint(false);
                this.modal = this.ngbModel.open(this.printDocModel, { size: 'lg', centered: true });
            }
        })
    }

    private addProductStore() {
        this.arrestService.masProductgetAll().subscribe(res => {
            this.typeheadProduct = res;
            // res.map(item => {
            //     this.store.dispatch(new ProductActions.AddProduct(item))
            // })
        })
    }

    private async addRegion() {

        await this.arrestService.masSubdistrictgetAll().then(res =>
            this.subdistrict = res
        )
        await this.arrestService.masDistrictgetAll().then(res =>
            this.district = res
        )
        await this.arrestService.masProvincegetAll().then(res =>
            this.province = res
        )

        let region = []
        await this.subdistrict
            .map(subdis =>
                this.district
                    .filter(dis => dis.DistrictCode == subdis.districtCode)
                    .map(dis =>
                        this.province
                            .filter(pro => pro.ProvinceCode == dis.ProvinceCode)
                            .map(pro => region.push({ ...subdis, ...dis, ...pro }))
                    )
            )
        
        console.log(region);
    }

    private getByCon(code: string) {
        this.arrestService.getByCon(code).subscribe(async res => {
            await this.arrestForm.reset({
                ArrestCode: res.ArrestCode,
                ArrestDate: toLocalNumeric(res.ArrestDate),
                ArrestTime: res.ArrestTime,
                OccurrenceDate: toLocalNumeric(res.OccurrenceDate),
                OccurrenceTime: res.OccurrenceTime,
                ArrestStationCode: res.ArrestStationCode,
                ArrestStation: res.ArrestStation,
                HaveCulprit: res.HaveCulprit,
                Behaviour: res.Behaviour,
                Testimony: res.Testimony,
                Prompt: res.Prompt,
                IsMatchNotice: res.IsMatchNotice,
                ArrestDesc: res.ArrestDesc,
                NoticeCode: res.NoticeCode,
                InvestigationSurveyDocument: res.InvestigationSurveyDocument,
                InvestigationCode: res.InvestigationCode,
                IsActive: res.IsActive,
            });
            await res.ArrestLocale.map(item => item.Region = `${item.SubDistrict} ${item.District} ${item.Province}`);
            await res.ArrestStaff.map(item => {
                item.FullName = `${item.TitleName} ${item.FirstName} ${item.LastName}`;
                item.IsNewItem = false;
            });
            await res.ArrestLawbreaker.map(item => {
                item.LawbreakerFullName = `${item.LawbreakerTitleName} ${item.LawbreakerFirstName}`;
                item.LawbreakerFullName += ` ${item.LawbreakerMiddleName} ${item.LawbreakerLastName}`;
                item.CompanyFullName = `${item.CompanyTitle} ${item.CompanyName}`;
                item.IsNewItem = false;
            });
            await res.ArrestProduct.map(item => item.IsNewItem = false);
            await res.ArrestIndictment.map(item => item.IsNewItem = false);

            this.setItemFormArray(res.ArrestStaff, 'ArrestStaff');
            this.setItemFormArray(res.ArrestLocale, 'ArrestLocale');
            this.setItemFormArray(res.ArrestLawbreaker, 'ArrestLawbreaker');
            this.setItemFormArray(res.ArrestProduct, 'ArrestProduct');
            this.setItemFormArray(res.ArrestIndictment, 'ArrestIndictment');
            this.setItemFormArray(res.ArrestDocument, 'ArrestDocument');
        })
    }

    private onCreate() {
        const arrestDate = new Date(this.arrestForm.value.ArrestDate);
        const occurrenceDate = new Date(this.arrestForm.value.OccurrenceDate)
        this.arrestForm.value.ArrestDate = arrestDate.toISOString()
        this.arrestForm.value.OccurrenceDate = occurrenceDate.toISOString();

        this.arrestService.insAll(this.arrestForm.value).subscribe(res => {
            // tslint:disable-next-line:triple-equals
            if (res.IsSuccess == true) {
                this.onComplete();
            } else {
                alert(Message.saveError);
            }
        })
    }

    private onReviced() {
        const arrestDate = new Date(this.arrestForm.value.ArrestDate);
        const occurrenceDate = new Date(this.arrestForm.value.OccurrenceDate)
        this.arrestForm.value.ArrestDate = arrestDate.toISOString()
        this.arrestForm.value.OccurrenceDate = occurrenceDate.toISOString();

        this.arrestService.updByCon(this.arrestForm.value).subscribe(async res => {
            if (res.IsSuccess === true) {
                // this.onComplete();
                let isSuccess: boolean;
                const staff = this.ArrestStaff.value;
                await staff.filter(item => item.IsNewItem === true)
                    .map(item => {
                        this.arrestService.staffinsAll(item).subscribe(s => isSuccess = s.IsSuccess);
                        if (isSuccess === false) { return false; }
                    });

                const lawbreaker = this.ArrestLawbreaker.value;
                await lawbreaker.filter(item => item.IsNewItem === true)
                    .map(item => {
                        this.arrestService.lawbreakerinsAll(item).subscribe(s => isSuccess = s.IsSuccess);
                        if (isSuccess === false) { return false; }
                    });

                const product = this.ArrestProduct.value;
                await product.filter(item => item.IsNewItem === true)
                    .map(item => {
                        this.arrestService.productinsAll(item).subscribe(s => isSuccess = s.IsSuccess);
                        if (isSuccess === false) { return false; }
                    });

                const indicment = this.ArrestIndictment.value;
                await indicment.filter(item => item.IsNewItem === true)
                    .map(item => {
                        this.arrestService.indicmentinsAll(item).subscribe(s => isSuccess = s.IsSuccess);
                        if (isSuccess === false) { return false; }
                    });

                this.onComplete();
            } else {
                alert(Message.saveError);
            }
        })
    }

    private onDelete() {
        this.arrestService.updDelete(this.arrestCode).subscribe(res => {
            if (res.IsSuccess) {
                alert(Message.saveComplete);
            } else {
                alert(Message.saveError);
            }
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

        this.arrestForm.reset();

        alert(Message.saveComplete);
    }

    private deleteTableRow(form: FormArray, indexForm: number) {
        if (this.mode === 'C') {
            form.removeAt(indexForm);

        } else if (this.mode === 'R') {
            if (confirm(Message.confirmAction)) {
                form.removeAt(indexForm);
            }
        }
    }

    setNoticeCode(e) {
        console.log(e);

        this.arrestForm.patchValue({ NoticeCode: e });
    }

    openModal(e) {
        this.modal = this.suspectModalService.open(e, { size: 'lg', centered: true });
    }

    addStaff() {
        const lastIndex = this.ArrestStaff.length - 1;
        let item = new ArrestStaff();
        item.IsNewItem = true;
        if (lastIndex < 0) {
            this.ArrestStaff.push(this.fb.group(item));
        } else {
            const lastDoc = this.ArrestStaff.at(lastIndex).value;
            if (lastDoc.StaffID) {
                this.ArrestStaff.push(this.fb.group(item));
            }
        }
    }

    addProduct() {
        const lastIndex = this.ArrestProduct.length - 1;
        let item = new ArrestProduct();
        item.IsNewItem = true;
        if (lastIndex < 0) {
            this.ArrestProduct.push(this.fb.group(item));
        } else {
            const lastDoc = this.ArrestProduct.at(lastIndex).value;
            if (lastDoc.ProductID) {
                this.ArrestProduct.push(this.fb.group(item));
            }
        }
    }

    addIndicment() {
        const lastIndex = this.ArrestIndictment.length - 1;
        let indicment = new ArrestIndictment();
        indicment.IsNewItem = true;
        this.ArrestIndictment.push(this.fb.group(indicment));
        if (lastIndex < 0) {
            this.ArrestIndictment.push(this.fb.group(indicment));
        } else {
            const lastItem = this.ArrestIndictment.at(lastIndex).value;
            if (lastItem.DataSource && lastItem.FilePath) {
                this.ArrestIndictment.push(this.fb.group(indicment));
            }
        }
    }

    addDocument() {
        const lastIndex = this.ArrestDocument.length - 1;
        let indicment = new ArrestDocument();
        indicment.IsNewItem = true;
        this.ArrestDocument.push(this.fb.group(indicment));
        if (lastIndex < 0) {
            this.ArrestDocument.push(this.fb.group(indicment));
        } else {
            const lastItem = this.ArrestDocument.at(lastIndex).value;
            if (lastItem.DataSource && lastItem.FilePath) {
                this.ArrestDocument.push(this.fb.group(indicment));
            }
        }
    }

    viewLawbreaker(id: number) {
        this.router.navigate([`/arrest/lawbreaker/R/${id}`]);
    }

    deleteStaff(indexForm: number, staffId: string) {
        if (this.mode === 'C') {
            this.ArrestStaff.removeAt(indexForm);

        } else if (this.mode === 'R') {
            if (confirm(Message.confirmAction)) {
                this.arrestService.staffupdDelete(staffId).subscribe(res => {
                    // tslint:disable-next-line:triple-equals
                    if (res.IsSuccess == true) {
                        this.ArrestStaff.removeAt(indexForm);
                    } else {
                        alert(Message.saveError);
                    }
                })
            }
        }
    }

    deleteLawbreaker(indexForm: number, lawbreakerId: string) {
        if (this.mode === 'C') {
            this.ArrestLawbreaker.removeAt(indexForm);

        } else if (this.mode === 'R') {
            if (confirm(Message.confirmAction)) {
                this.arrestService.lawbreakerupdDelete(lawbreakerId).subscribe(res => {
                    // tslint:disable-next-line:triple-equals
                    if (res.IsSuccess == true) {
                        this.ArrestLawbreaker.removeAt(indexForm);
                    } else {
                        alert(Message.saveError);
                    }
                })
            }
        }
    }

    deleteProduct(indexForm: number, productId: string) {
        if (this.mode === 'C') {
            this.ArrestProduct.removeAt(indexForm);

        } else if (this.mode === 'R') {
            if (confirm(Message.confirmAction)) {
                this.arrestService.productupdDelete(productId).subscribe(res => {
                    // tslint:disable-next-line:triple-equals
                    if (res.IsSuccess == true) {
                        this.ArrestProduct.removeAt(indexForm);
                    } else {
                        alert(Message.saveError);
                    }
                })
            }
        }
    }

    deleteIndicment(indexForm: number, indicmtmentId: string) {
        if (this.mode === 'C') {
            this.ArrestIndictment.removeAt(indexForm);

        } else if (this.mode === 'R') {
            if (confirm(Message.confirmAction)) {
                this.arrestService.indicmentupdDelete(indicmtmentId).subscribe(res => {
                    // tslint:disable-next-line:triple-equals
                    if (res.IsSuccess == true) {
                        this.ArrestIndictment.removeAt(indexForm);
                    } else {
                        alert(Message.saveError);
                    }
                })
            }
        }
    }

    deleteDocument(indexForm: number) {
        this.deleteTableRow(this.ArrestDocument, indexForm);
    }

    handleArrestDocInput(file: FileList, indexForm: number) {
        // this.ArrestDocument.patchValue({
        // })
    }

    searchProduct = (text$: Observable<string>) =>
        text$
            .debounceTime(300)
            .distinctUntilChanged()
            .map(term => term === '' ? []
                : this.typeheadProduct
                    .filter(v =>
                        v.SubBrandNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                        v.BrandNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                        v.ModelName.toLowerCase().indexOf(term.toLowerCase()) > -1
                    ).slice(0, 10));

    formatterProduct = (x: { BrandNameTH: string, SubBrandNameTH: string, ModelName: string }) =>
        `${x.BrandNameTH} ${x.SubBrandNameTH} ${x.ModelName}`;

    selectItemProductItem(e, i) {
        console.log(e.item);

        this.ArrestProduct.at(i).reset(e.item)
    }

}
