import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import {
    MasProductModel, MasProvinceModel, MasDistrictModel, MasSubdistrictModel, RegionModel, MasStaffModel
} from '../../../models'
import * as ProductActions from '../../../actions/arrest/get-mas-productget-all.action';
import { Observable } from 'rxjs/Observable';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { ArrestsService } from '../arrests.service';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { toLocalNumeric } from '../../../config/dateFormat';
import { ArrestStaff, ArrestStaffFormControl } from '../arrest-staff';
import { Message } from '../../../config/message';
import { ArrestProduct, ArrestProductFormControl } from '../arrest-product';
import { ArrestDocument } from '../arrest-document';
import { ArrestIndictment, IndictmentLawbreaker } from '../arrest-indictment';
import { SidebarService } from '../../../shared/sidebar/sidebar.component';
import { ArrestLocaleFormControl } from '../arrest-locale';
import { ArrestLawbreakerFormControl, ArrestLawbreaker, LawbreakerTypes, EntityTypes } from '../arrest-lawbreaker';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import { MasOfficeModel } from '../../../models/mas-office.model';
import { Notice } from '../../notices/notice';

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

    arrestFG: FormGroup;

    subdistrict: MasSubdistrictModel[];
    district: MasDistrictModel[];
    province: MasProvinceModel[];
    typeheadOffice = new Array<MasOfficeModel>();
    typeheadStaff = new Array<MasStaffModel>();
    typeheadRegion = new Array<RegionModel>();
    typeheadProduct = new Array<MasProductModel>();

    readonly lawbreakerType = LawbreakerTypes;
    readonly entityType = EntityTypes;

    private onSaveSubscribe: any;
    private onDeleSubscribe: any;
    private onPrintSubscribe: any;
    private onNextPageSubscribe: any;
    private onCancelSubscribe: any;

    get ArrestStaff(): FormArray {
        return this.arrestFG.get('ArrestStaff') as FormArray;
    }

    get ArrestLocale(): FormArray {
        return this.arrestFG.get('ArrestLocale') as FormArray;
    }

    get ArrestLawbreaker(): FormArray {
        return this.arrestFG.get('ArrestLawbreaker') as FormArray;
    }

    get ArrestProduct(): FormArray {
        return this.arrestFG.get('ArrestProduct') as FormArray;
    }

    get ArrestIndictment(): FormArray {
        return this.arrestFG.get('ArrestIndictment') as FormArray;
    }

    get ArrestDocument(): FormArray {
        return this.arrestFG.get('ArrestDocument') as FormArray;
    }

    get ArrestInictmentDetail(): FormArray {
        return this.arrestFG.get('ArrestInictmentDetail') as FormArray;
    }

    get ArrestProductDetail(): FormArray {
        return this.arrestFG.get('ArrestProductDetail') as FormArray;
    }

    @Input() _noticeCode: string;
    @ViewChild('printDocModal') printDocModel: ElementRef;
    // @Input() inputNotice: Notice;

    constructor(
        private fb: FormBuilder,
        private activeRoute: ActivatedRoute,
        private modelService: NgbModal,
        private navService: NavigationService,
        private ngbModel: NgbModal,
        private arrestService: ArrestsService,
        public router: Router,
        private sidebarService: SidebarService,
        private preloader: PreloaderService,
        private store: Store<AppState>
    ) {
        // set false
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);

        // set true
        this.navService.setNextPageButton(true);

        // this.productModel = store.select('productModel');
    }

    async ngOnInit() {
        this.preloader.setShowPreloader(true);

        this.sidebarService.setVersion('1.00');

        this.active_route();

        this.navigate_Service();

        this.createForm();

        await this.setStaffStore()
        await this.setOfficeStore()
        await this.setProductStore()
        await this.setRegionStore()

        this.preloader.setShowPreloader(false);
    }

    ngOnDestroy(): void {
        // this.sub.unsubscribe();
        this.onCancelSubscribe.unsubscribe();
        this.onSaveSubscribe.unsubscribe();
        this.onDeleSubscribe.unsubscribe();
        this.onPrintSubscribe.unsubscribe();
        this.onNextPageSubscribe.unsubscribe()
    }

    private createForm() {
        this.arrestFG = this.fb.group({
            ArrestCode: new FormControl(this.arrestCode),
            ArrestDate: new FormControl(null),
            ArrestTime: new FormControl(null),
            OccurrenceDate: new FormControl(null),
            OccurrenceTime: new FormControl(null),
            ArrestStationCode: new FormControl(null),
            ArrestStation: new FormControl(null),
            HaveCulprit: new FormControl(0),
            Behaviour: new FormControl(null),
            Testimony: new FormControl(null),
            Prompt: new FormControl(null),
            IsMatchNotice: new FormControl(null),
            ArrestDesc: new FormControl('N/A'),
            NoticeCode: new FormControl(null),
            InvestigationSurveyDocument: new FormControl(null),
            InvestigationCode: new FormControl(null),
            IsActive: new FormControl(1),
            ArrestStaff: this.fb.array([this.createStaffForm()]),
            ArrestLocale: this.fb.array([this.createLocalForm()]),
            ArrestLawbreaker: this.fb.array([]),
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

    private createProductForm(): FormGroup {
        ArrestProductFormControl.ArrestCode = new FormControl(this.arrestCode);
        return this.fb.group(ArrestProductFormControl);
    }

    private setItemFormArray(array: any[], formControl: string) {
        if (array !== undefined && array.length) {
            const itemFGs = array.map(item => this.fb.group(item));
            const itemFormArray = this.fb.array(itemFGs);
            this.arrestFG.setControl(formControl, itemFormArray);
        }
    }

    private active_route() {
        this.sub = this.activeRoute.params.subscribe(p => {
            this.mode = p['mode'];
            if (p['mode'] === 'C') {
                // set false
                this.navService.setPrintButton(false);
                this.navService.setEditButton(false);
                this.navService.setDeleteButton(false);
                this.navService.setEditField(false);
                // set true
                this.navService.setSaveButton(true);
                this.navService.setCancelButton(true);
                this.arrestCode = p['code'] == 'NEW' ? `NT-${(new Date).getTime()}` : p['code'];

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
        this.navService.showFieldEdit.subscribe(p => {
            this.showEditField = p;
        });

        this.onSaveSubscribe = this.navService.onSave.subscribe(async status => {
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

        this.onDeleSubscribe = this.navService.onDelete.subscribe(async status => {
            if (status) {
                await this.navService.setOnDelete(false);
                this.onDelete();
            }
        });

        this.onCancelSubscribe = this.navService.onCancel.subscribe(async status => {
            if (status) {
                await this.navService.setOnCancel(false);
                this.router.navigate(['/arrest/list']);
            }
        })

        this.onPrintSubscribe = this.navService.onPrint.subscribe(async status => {
            if (status) {
                await this.navService.setOnPrint(false);
                this.modal = this.ngbModel.open(this.printDocModel, { size: 'lg', centered: true });
            }
        })

        this.onNextPageSubscribe = this.navService.onNextPage.subscribe(async status => {
            if (status) {
                await this.navService.setOnNextPage(false);
                this.router.navigate(['/accusations/manage', 'C', 'NEW']);
            }
        })
    }

    private setOfficeStore() {
        this.arrestService.masOfficegetAll().then(res =>
            this.typeheadOffice = res
        )
    }

    private setProductStore() {
        this.arrestService.masProductgetAll().then(res => {
            this.typeheadProduct = res;
            // res.map(item => {
            //     this.store.dispatch(new ProductActions.AddProduct(item))
            // })
        })
    }

    private setStaffStore() {
        this.arrestService.masStaffgetAll().then(res =>
            this.typeheadStaff = res
        )
    }

    private async setRegionStore() {

        await this.arrestService.masSubdistrictgetAll().then(res =>
            this.subdistrict = res
        )
        await this.arrestService.masDistrictgetAll().then(res =>
            this.district = res
        )
        await this.arrestService.masProvincegetAll().then(res =>
            this.province = res
        )

        await this.subdistrict
            .map(subdis =>
                this.district
                    .filter(dis => dis.DistrictCode == subdis.districtCode)
                    .map(dis =>
                        this.province
                            .filter(pro => pro.ProvinceCode == dis.ProvinceCode)
                            .map(pro => {
                                let r = { ...subdis, ...dis, ...pro }
                                this.typeheadRegion.push({
                                    SubDistrictCode: r.subdistrictCode,
                                    SubDistrictNameTH: r.subdistrictNameTH,
                                    DistrictCode: r.DistrictCode,
                                    DistrictNameTH: r.DistrictNameTH,
                                    ProvinceCode: r.ProvinceCode,
                                    ProvinceNameTH: r.ProvinceNameTH,
                                    ZipCode: null
                                })
                            })
                    )
            )


    }

    private getByCon(code: string) {
        this.arrestService.getByCon(code).then(async res => {
            await this.arrestFG.reset({
                ArrestCode: res.ArrestCode,
                ArrestDate: toLocalNumeric(res.ArrestDate),
                ArrestTime: toLocalNumeric(res.ArrestTime),
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
                IsActive: res.IsActive
            });
            await res.ArrestLocale.map(item => item.Region = `${item.SubDistrict} ${item.District} ${item.Province}`);
            await res.ArrestStaff.map(item => {
                item.FullName = `${item.TitleName == null ? '' : item.TitleName}`;
                item.FullName += ` ${item.FirstName == null ? '' : item.FirstName}`;
                item.FullName += ` ${item.LastName == null ? '' : item.LastName}`;

                item.IsNewItem = false;
                item.ContributorID = item.ContributorID
            });
            await res.ArrestLawbreaker.map(item => {
                item.LawbreakerFullName = `${item.LawbreakerTitleName == null ? '' : item.LawbreakerTitleName}`;
                item.LawbreakerFullName += ` ${item.LawbreakerFirstName == null ? '' : item.LawbreakerFirstName}`;
                item.LawbreakerFullName += ` ${item.LawbreakerMiddleName == null ? '' : item.LawbreakerMiddleName}`;
                item.LawbreakerFullName += ` ${item.LawbreakerLastName == null ? '' : item.LawbreakerLastName}`;

                item.CompanyFullName = `${item.CompanyTitle == null ? '' : item.CompanyTitle}`;
                item.CompanyFullName += `${item.CompanyName == null ? '' : item.CompanyName}`;

                item.EntityTypeName = this.entityType.find(e => parseInt(e.value) == item.EntityType).text
                item.LawbreakerTypeName = this.lawbreakerType.find(e => parseInt(e.value) == item.LawbreakerType).text
                item.IsNewItem = false;
            });
            await res.ArrestProduct.map(item => {
                item.IsNewItem = false;
                item.ProductFullName = `${item.SubBrandNameTH == null ? '' : item.SubBrandNameTH}`;
                item.ProductFullName += ` ${item.BrandNameTH == null ? '' : item.BrandNameTH}`;
                item.ProductFullName += ` ${item.ModelName == null ? '' : item.ModelName}`;
            });

            await res.ArrestIndictment.map(async item => {
                item.IsNewItem = false
                item.SectionName = item.SectionName ? item.SectionName : null;
                let _IndictmentLawbreaker = [];

                await item.OpsArrestIndicmentDetailCollection.map(a1 => {
                    let _lawbreaker = res.ArrestLawbreaker.filter(a2 => a2.LawbreakerID == a1.LawbreakerID);
                    _IndictmentLawbreaker.push({
                        LawbreakerID: a1.LawbreakerID.toString(),
                        LawbreakerFullName: _lawbreaker.length ? _lawbreaker[0].LawbreakerFullName : null,
                        CompanyFullName: _lawbreaker.length ? _lawbreaker[0].CompanyFullName : null,
                        EntityType: _lawbreaker.length ? _lawbreaker[0].EntityType : null,

                        ProductID: null,
                        ProductName: null,
                        Qty: null,
                        QtyUnit: null,
                        Size: null,
                        SizeUnit: null,
                        Weight: null,
                        WeightUnit: null,
                        IsChecked: false
                    })
                })
                item.IndictmentLawbreaker = _IndictmentLawbreaker;
            });

            this.setItemFormArray(res.ArrestStaff, 'ArrestStaff');
            this.setItemFormArray(res.ArrestLocale, 'ArrestLocale');
            this.setItemFormArray(res.ArrestLawbreaker, 'ArrestLawbreaker');
            this.setItemFormArray(res.ArrestProduct, 'ArrestProduct');
            this.setItemFormArray(res.ArrestDocument, 'ArrestDocument');

            this.addIndictment(res.ArrestIndictment);
        })
    }

    private async onCreate() {
        this.preloader.setShowPreloader(true);
        const arrestDate = new Date(this.arrestFG.value.ArrestDate);
        const occurrenceDate = new Date(this.arrestFG.value.OccurrenceDate)
        this.arrestFG.value.ArrestDate = arrestDate.toISOString()
        this.arrestFG.value.OccurrenceDate = occurrenceDate.toISOString();

        console.log('====================================');
        console.log(JSON.stringify(this.arrestFG.value));
        console.log('====================================');
        let isSuccess: boolean | false;

        // ___1.บันทึกข้อมูลจับกุม
        await this.arrestService.insAll(this.arrestFG.value).then(async IsSuccess => {
            if (!IsSuccess) { IsSuccess = false; return false; }
            await this.saveIndictmentDetail().then(IsSuccess => isSuccess = IsSuccess);
        }, (error) => { isSuccess = false; console.error(error); return false; });

        if (isSuccess) {
            this.onComplete()
            alert(Message.saveComplete)
            this.router.navigate([`/arrest/manage`, 'R', this.arrestCode])

        } else {
            alert(Message.saveFail)
        }

        this.preloader.setShowPreloader(false);
    }

    private async saveIndictmentDetail(): Promise<boolean> {

        let IsSuccess: boolean | false;

        // ___2. ดึงข้อมูการจับกุม ด้วยเลขที่ ArrestCode
        await this.arrestService.getByCon(this.arrestCode).then(arrestRes => {
            if (!arrestRes) { IsSuccess = false; return false; }
            // ___3. ค้นหาข้อมูลภายใน ArrestIndictment
            IsSuccess = true
            arrestRes.ArrestIndictment.map(indictObj => {
                // ข้อกล่าวหา
                // ___4. เปรียบเทียบ รายการข้อกล่าวหาด้วย GuiltBaseID กับ res0.GuiltBaseID
                this.ArrestIndictment.value.filter(item1 => indictObj.GuiltBaseID == item1.GuiltBaseID).map((item1) => {
                    // รายละเอียดข้อกล่าวหา
                    item1.ArrestIndictmentDetail.map(async indictD => {
                        // ___5. Set IndictmentID ให้กับ object IndicmentDetail
                        indictD.IndictmentID = indictObj.IndictmentID;
                        // ___6. บันทึก ArrestIndictmentDetail
                        await this.arrestService.indicmentDetailinsAll(indictD).then(async indictDIns => {
                            if (!indictDIns) { IsSuccess = false; return false; }

                            IsSuccess = true
                            // ___7. ค้นหา indicmentDetail เพื่อดึงเอา indicmentDetailID มาใช้งาน
                            await this.arrestService
                                .indicmentgetByCon(indictD.IndictmentID.toString())
                                .then(indictDetailGet => {
                                    debugger
                                    if (!indictDetailGet.length) return false;

                                    console.log(indictDetailGet);

                                    // รายละเอียดสินค้า
                                    indictD.ArrestProductDetail.map(productD => {
                                        console.log(productD);
                                        debugger
                                        // ___8. set IndictmentDetailID ให้กับ Object ProductDetail
                                        // productD.IndictmentDetailID = indictDetailGet.IndictmentDetailID
                                        // ___9.บันทึก ArrestProductDetail
                                        // this.arrestService.productDetailInsAll(productD).then(productDIns => console.log(productDIns));
                                    })
                                }, (error) => { IsSuccess = false; console.error(error); return false; });

                        }, (error) => { IsSuccess = false; console.error(error); return false; });

                    })
                })

            })

        }, (error) => { IsSuccess = false; console.error(error); return false; });

        return IsSuccess;
    }

    private async onReviced() {
        this.preloader.setShowPreloader(true);
        const arrestDate = new Date(this.arrestFG.value.ArrestDate);
        const occurrenceDate = new Date(this.arrestFG.value.OccurrenceDate)
        this.arrestFG.value.ArrestDate = arrestDate.toISOString()
        this.arrestFG.value.OccurrenceDate = occurrenceDate.toISOString();

        console.log('====================================');
        console.log(JSON.stringify(this.arrestFG.value));
        console.log('====================================');

        let isSuccess: boolean | false;

        await this.arrestService.updByCon(this.arrestFG.value).then(async IsSuccess => {

            if (!isSuccess) {
                isSuccess = false;
                return false;
            }

            await this.arrestService.localeupdByCon(this.ArrestLocale.at(0).value)
                .then(IsSuccess => isSuccess = IsSuccess,
                    (error) => { IsSuccess = false; console.error(error); return false; });

            if (!isSuccess) return false;

            const staff = this.ArrestStaff.value;
            staff.filter(item => item.IsNewItem === true)
                .map(async item => {
                    await this.arrestService.staffinsAll(item).then(IsSuccess => {
                        if (!IsSuccess) {
                            isSuccess = IsSuccess;
                            return false;
                        }
                    }, (error) => { IsSuccess = false; console.error(error); return false; });
                });

            if (!isSuccess) return false;

            const lawbreaker = this.ArrestLawbreaker.value;
            lawbreaker.filter(item => item.IsNewItem === true)
                .map(async item => {
                    await this.arrestService.lawbreakerinsAll(item).then(IsSuccess => {
                        if (!IsSuccess) {
                            isSuccess = IsSuccess;
                            return false;
                        }
                    }, (error) => { IsSuccess = false; console.error(error); return false; });
                });

            if (!isSuccess) return false;

            const product = this.ArrestProduct.value;
            product.filter(item => item.IsNewItem === true)
                .map(async item => {
                    await this.arrestService.productinsAll(item).then(IsSuccess => {
                        if (!IsSuccess) {
                            isSuccess = IsSuccess;
                            return false;
                        }
                    }, (error) => { IsSuccess = false; console.error(error); return false; });
                });

            if (!isSuccess) return false;

            const indicment = this.ArrestIndictment.value;
            indicment.filter(item => item.IsNewItem === true)
                .map(async item => {
                    // ___1.บันทึกข้อมูลจับกุม
                    await this.arrestService.indicmentinsAll(item).then(async IsSuccess => {
                        if (!IsSuccess) {
                            isSuccess = IsSuccess;
                            return false;
                        }

                        await this.saveIndictmentDetail().then(IsSuccess => isSuccess = IsSuccess);

                    }, (error) => { IsSuccess = false; console.error(error); return false; });
                });

        }, (error) => { isSuccess = false; console.error(error); return false; })

        if (isSuccess) {
            alert(Message.saveComplete)
            this.onComplete();
        } else {
            alert(Message.saveFail)
        }
        this.preloader.setShowPreloader(false);
    }

    private async onDelete() {
        if (confirm(Message.confirmAction)) {
            this.preloader.setShowPreloader(true);
            await this.arrestService.updDelete(this.arrestCode).then(IsSuccess => {
                if (IsSuccess) {
                    alert(Message.delComplete)
                    this.router.navigate([`/arrest/list`]);
                } else {
                    alert(Message.delFail)
                }
            })
            this.preloader.setShowPreloader(false);
        }
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
    }

    // private deleteTableRow(form: FormArray, indexForm: number) {
    //     if (this.mode === 'C') {
    //         form.removeAt(indexForm);

    //     } else if (this.mode === 'R') {
    //         if (confirm(Message.confirmAction)) {
    //             form.removeAt(indexForm);
    //         }
    //     }
    // }

    setNoticeForm(notice: Notice) {
        this.arrestFG.patchValue({ NoticeCode: notice.NoticeCode });

        let locale = notice.NoticeLocale[0];
        let product = notice.NoticeProduct;
        let lawbreaker = [];

        this.ArrestLocale.at(0).reset(locale);
        this.ArrestLocale.at(0).patchValue({
            Region: `${locale.SubDistrict} ${locale.District} ${locale.Province}`,
            ArrestCode: this.arrestCode,
            IsArrest: 1
        })

        this.ArrestProduct.reset(product);
        this.ArrestProduct.value.map(item => {
            item.ArrestCode = this.arrestCode
            item.IsNewItem = true;
            item.ProductFullName = `${item.SubBrandNameTH == null ? '' : item.SubBrandNameTH}`;
            item.ProductFullName += ` ${item.BrandNameTH == null ? '' : item.BrandNameTH}`;
            item.ProductFullName += ` ${item.ModelName == null ? '' : item.ModelName}`;
        })
    }

    openModal(e) {
        this.modal = this.modelService.open(e, { size: 'lg', centered: true });
        this.isEditIndictment = false;
    }

    indictmentModal: ArrestIndictment;
    isEditIndictment: boolean | false;
    editAllegation(index: number, e: any) {
        this.modal = this.modelService.open(e, { size: 'lg', centered: true });
        this.indictmentModal = new ArrestIndictment();
        this.isEditIndictment = true;
        this.indictmentModal = this.ArrestIndictment.at(index).value;
    }

    addLawbreaker(e: ArrestLawbreaker[]) {
        e.map(item => {
            item.ArrestCode = this.arrestCode
            item.IsNewItem = true
            this.ArrestLawbreaker.push(this.fb.group(item))
        })
    }

    addStaff() {
        const lastIndex = this.ArrestStaff.length - 1;
        let item = new ArrestStaff();
        item.ArrestCode = this.arrestCode;
        item.IsNewItem = true;
        if (lastIndex < 0) {
            this.ArrestStaff.push(this.fb.group(item));
        } else {
            const lastDoc = this.ArrestStaff.at(lastIndex).value;
            if (lastDoc.StaffCode) {
                this.ArrestStaff.push(this.fb.group(item));
            }
        }
    }

    addProduct() {
        const lastIndex = this.ArrestProduct.length - 1;
        let item = new ArrestProduct();
        item.ArrestCode = this.arrestCode;
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

    addIndictment(e: ArrestIndictment[]) {

        e.map(async item => {
            let indictDetail = [];

            await item.IndictmentLawbreaker.map(lb => {
                let productDetail = [];

                productDetail.push(
                    this.fb.group({
                        ProductID: lb.ProductID,
                        IsProdcutCo: 1,
                        Qty: lb.Qty,
                        QtyUnit: lb.QtyUnit,
                        Size: lb.Size,
                        SizeUnit: lb.SizeUnit,
                        Weight: lb.Weight,
                        WeightUnit: lb.WeightUnit,
                        MistreatRate: null,
                        Fine: null,
                        IndictmentDetailID: null
                    })
                )

                indictDetail.push(
                    this.fb.group({
                        IndictmentID: null,
                        ArrestCode: this.arrestCode,
                        LawbreakerID: lb.LawbreakerID,
                        GuiltBaseID: item.GuiltBaseID,
                        IsProve: 1,
                        IsActive: 1,
                        ArrestProductDetail: this.fb.array(productDetail)
                    })
                )
            })

            let FG = this.fb.group({
                ArrestCode: this.arrestCode,
                IndictmentID: item.IndictmentID,
                IsProve: item.IsProve,
                IsActive: item.IsActive,
                GuiltBaseID: item.GuiltBaseID,
                SectionNo: item.SectionNo,
                SectionDesc1: item.SectionDesc1,
                SectionName: item.SectionName,
                IndictmentLawbreaker: this.fb.array(item.IndictmentLawbreaker),
                ArrestIndictmentDetail: this.fb.array(indictDetail),
                IsNewItem: item.IsNewItem == false ? false : true
            })
            this.ArrestIndictment.push(FG);
        })
    }

    addDocument() {
        const lastIndex = this.ArrestDocument.length - 1;
        let item = new ArrestDocument();
        item.ArrestCode = this.arrestCode;
        item.IsNewItem = true;
        if (lastIndex < 0) {
            this.ArrestDocument.push(this.fb.group(item));
        } else {
            const lastItem = this.ArrestDocument.at(lastIndex).value;
            if (lastItem.DataSource && lastItem.FilePath) {
                this.ArrestDocument.push(this.fb.group(item));
            }
        }
    }

    viewLawbreaker(id: number) {
        this.router.navigate([`/arrest/lawbreaker`, 'R', id]);
    }

    deleteStaff(indexForm: number, staffId: string) {
        if (this.mode === 'C') {
            this.ArrestStaff.removeAt(indexForm);

        } else if (this.mode === 'R') {
            const isNewItem = this.ArrestStaff.at(indexForm).value.IsNewItem
            if (isNewItem) {
                this.ArrestStaff.removeAt(indexForm)
            } else if (confirm(Message.confirmAction)) {
                this.preloader.setShowPreloader(true);
                this.arrestService.staffupdDelete(staffId).then(IsSuccess => {
                    if (IsSuccess) {
                        alert(Message.delStaffComplete)
                        this.ArrestStaff.removeAt(indexForm)
                    } else {
                        alert(Message.delStaffFail)
                    }
                })
                this.preloader.setShowPreloader(false);
            }
        }
    }

    deleteLawbreaker(indexForm: number, lawbreakerId: string) {
        if (this.mode === 'C') {
            this.ArrestLawbreaker.removeAt(indexForm);

        } else if (this.mode === 'R') {
            const isNewItem = this.ArrestLawbreaker.at(indexForm).value.IsNewItem
            if (isNewItem) {
                this.ArrestLawbreaker.removeAt(indexForm)
            } else if (confirm(Message.confirmAction)) {
                this.preloader.setShowPreloader(true);
                this.arrestService.lawbreakerupdDelete(lawbreakerId).then(IsSuccess => {
                    if (IsSuccess) {
                        alert(Message.delLawbreakerComplete)
                        this.ArrestLawbreaker.removeAt(indexForm)
                    } else {
                        alert(Message.delLawbreakerFail)
                    }
                })
                this.preloader.setShowPreloader(false);
            }
        }
    }

    deleteProduct(indexForm: number, productId: string) {
        if (this.mode === 'C') {
            this.ArrestProduct.removeAt(indexForm);

        } else if (this.mode === 'R') {
            const isNewItem = this.ArrestProduct.at(indexForm).value.IsNewItem
            if (isNewItem) {
                this.ArrestProduct.removeAt(indexForm)
            } else if (confirm(Message.confirmAction)) {
                this.preloader.setShowPreloader(true);
                this.arrestService.productupdDelete(productId).then(IsSuccess => {
                    if (IsSuccess) {
                        alert(Message.delProductComplete)
                        this.ArrestProduct.removeAt(indexForm)
                    } else {
                        alert(Message.delProductFail)
                    }
                })
                this.preloader.setShowPreloader(false);
            }
        }
    }

    async deleteIndicment(indexForm: number, indicmtmentId: string) {
        if (this.mode === 'C') {
            this.ArrestIndictment.removeAt(indexForm);

        } else if (this.mode === 'R') {

            const isNewItem = this.ArrestIndictment.at(indexForm).value.IsNewItem

            if (isNewItem) {
                this.ArrestIndictment.removeAt(indexForm)
            } else if (confirm(Message.confirmAction)) {
                this.preloader.setShowPreloader(true);
                await this.arrestService.indicmentupdDelete(indicmtmentId).then(IsSuccess => {
                    if (IsSuccess) {
                        alert(Message.delIndicmentComplete)
                        this.ArrestIndictment.removeAt(indexForm)
                    } else {
                        alert(Message.delIndicmentFail)
                    }
                })
                this.preloader.setShowPreloader(false);
            }
        }
    }

    deleteDocument(indexForm: number) {
        if (this.mode === 'C') {
            this.ArrestDocument.removeAt(indexForm);

        } else if (this.mode === 'R') {

            const isNewItem = this.ArrestDocument.at(indexForm).value.IsNewItem

            if (isNewItem) {
                this.ArrestDocument.removeAt(indexForm)
            } else if (confirm(Message.confirmAction)) {
                // this.arrestService.indicmentupdDelete(indicmtmentId).then(IsSuccess => {
                //     if (IsSuccess)
                this.ArrestDocument.removeAt(indexForm)
                // })
            }
        }
    }

    handleArrestDocInput(file: FileList, indexForm: number) {
        // this.ArrestDocument.patchValue({
        // })
    }

    searchProduct = (text$: Observable<string>) =>
        text$
            .debounceTime(200)
            .distinctUntilChanged()
            .map(term => term === '' ? []
                : this.typeheadProduct
                    .filter(v =>
                        v.SubBrandNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                        v.BrandNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                        v.ModelName.toLowerCase().indexOf(term.toLowerCase()) > -1
                    ).slice(0, 10));

    searchRegion = (text3$: Observable<string>) =>
        text3$
            .debounceTime(200)
            .distinctUntilChanged()
            .map(term => term === '' ? []
                : this.typeheadRegion
                    .filter(v =>
                        v.SubDistrictNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                        v.DistrictNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                        v.ProvinceNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1
                    ).slice(0, 10));

    searchStaff = (text3$: Observable<string>) =>
        text3$
            .debounceTime(200)
            .distinctUntilChanged()
            .map(term => term === '' ? []
                : this.typeheadStaff
                    .filter(v =>
                        v.TitleName.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                        v.FirstName.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                        v.LastName.toLowerCase().indexOf(term.toLowerCase()) > -1
                    ).slice(0, 10));

    serachOffice = (text3$: Observable<string>) =>
        text3$
            .debounceTime(200)
            .distinctUntilChanged()
            .map(term => term === '' ? []
                : this.typeheadOffice
                    .filter(v =>
                        v.OfficeName.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                        v.OfficeShortName.toLowerCase().indexOf(term.toLowerCase()) > -1
                    ).slice(0, 10));

    formatterRegion = (x: { SubDistrictNameTH: string, DistrictNameTH: string, ProvinceNameTH: string }) =>
        `${x.SubDistrictNameTH} ${x.DistrictNameTH} ${x.ProvinceNameTH}`;

    formatterProduct = (x: { SubBrandNameTH: string, BrandNameTH: string, ModelName: string }) =>
        `${x.SubBrandNameTH} ${x.BrandNameTH} ${x.ModelName}`;

    formatterStaff = (x: { TitleName: string, FirstName: string, LastName: string }) =>
        `${x.TitleName} ${x.FirstName} ${x.LastName}`

    formatterOffice = (x: { OfficeShortName: string }) => x.OfficeShortName

    selectItemLocaleRegion(e) {
        this.ArrestLocale.at(0).patchValue({
            SubDistrictCode: e.item.SubDistrictCode,
            SubDistrict: e.item.SubDistrictNameTH,
            DistrictCode: e.item.DistrictCode,
            District: e.item.DistrictNameTH,
            ProvinceCode: e.item.ProvinceCode,
            Province: e.item.ProvinceNameTH,
        })
    }

    selectItemProductItem(e, i) {
        this.ArrestProduct.at(i).reset(e.item)
        this.ArrestProduct.at(i).patchValue({
            IsNewItem: true,
            ArrestCode: this.arrestCode,
            Qty: e.item.Size,
            QtyUnit: e.item.SizeCode,
            NetVolume: null,
            NetVolumeUnit: e.item.SizeUnitCode
        })
    }

    selectItemStaff(e, i) {
        this.ArrestStaff.at(i).reset(e.item);
        this.ArrestStaff.at(i).patchValue({
            ProgramCode: 'XCS60-02-02',
            ProcessCode: '0002',
            ArrestCode: this.arrestCode,
            PositionCode: e.item.OperationPosCode,
            PositionName: e.item.OperationPosName.trim()
        })
    }

    selectItemOffice(e) {
        this.arrestFG.patchValue({
            ArrestStationCode: e.item.OfficeCode,
            ArrestStation: e.item.OfficeShortName
        })

    }


}
