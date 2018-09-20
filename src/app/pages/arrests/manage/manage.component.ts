import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { ArrestsService } from '../arrests.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { setZero, MyDatePickerOptions, setDateMyDatepicker, getDateMyDatepicker, setZeroHours, convertDateForSave } from '../../../config/dateFormat';
import { ArrestStaff, ArrestStaffFormControl } from '../arrest-staff';
import { Message } from '../../../config/message';
import { ArrestProduct, ArrestProductFormControl } from '../arrest-product';
import { ArrestDocument } from '../arrest-document';
import { ArrestIndictment, IndictmentLawbreaker } from '../arrest-indictment';
import { SidebarService } from '../../../shared/sidebar/sidebar.component';
import { ArrestLocaleFormControl } from '../arrest-locale';
import { ArrestLawbreaker } from '../arrest-lawbreaker';
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
import {
    MasProductModel,
    MasProvinceModel,
    MasDistrictModel,
    MasSubdistrictModel,
    RegionModel,
    MasStaffModel,
    LawbreakerTypes,
    EntityTypes,
    ContributorType
} from '../../../models'
import { ProveService } from '../../prove/prove.service';
import { MasDutyProductUnitModel } from '../../../models/mas-duty-product-unit.model';
import { replaceFakePath } from '../../../config/dataString';
import { MainMasterService } from '../../../services/main-master.service';

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit, OnDestroy {

    private sub: any;
    programSpect = 'ILG60-03-02-00'
    mode: string;
    modal: any;
    arrestCode: string;
    showEditField: boolean;
    isRequired: boolean | false;

    myDatePickerOptions = MyDatePickerOptions;

    arrestFG: FormGroup;

    subdistrict: MasSubdistrictModel[];
    district: MasDistrictModel[];
    province: MasProvinceModel[];
    typeheadOffice = new Array<MasOfficeModel>();
    typeheadStaff = new Array<MasStaffModel>();
    typeheadRegion = new Array<RegionModel>();
    typeheadProduct = new Array<MasProductModel>();
    typeheadProductUnit = new Array<MasDutyProductUnitModel>();
    // typeheadNetVolumeUnit = new Array<MasDutyProductUnitModel>();

    readonly lawbreakerType = LawbreakerTypes;
    readonly entityType = EntityTypes;
    readonly contributerType = ContributorType;

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

    constructor(
        private fb: FormBuilder,
        private activeRoute: ActivatedRoute,
        private modelService: NgbModal,
        private navService: NavigationService,
        private ngbModel: NgbModal,
        private arrestService: ArrestsService,
        private router: Router,
        private sidebarService: SidebarService,
        private preloader: PreloaderService,
        private mainMasterService: MainMasterService,
    ) {
        // set false
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);

        // set true
        this.navService.setNextPageButton(true);
        this.navService.setInnerTextNextPageButton("รับคำกล่าวโทษ")
    }

    async ngOnInit() {
        this.preloader.setShowPreloader(true);

        this.sidebarService.setVersion('0.0.0.14');

        this.active_route();
        this.arrestFG = this.createForm();
        this.navigate_Service();

        await this.setStaffStore()
        await this.setOfficeStore()
        await this.setProductStore()
        await this.setProductUnitStore()
        await this.setRegionStore()

        this.preloader.setShowPreloader(false);
    }

    ngOnDestroy(): void {
        // this.sub.unsubscribe();
        if (this.onCancelSubscribe)
            this.onCancelSubscribe.unsubscribe();
        if (this.onSaveSubscribe)
            this.onSaveSubscribe.unsubscribe();
        if (this.onDeleSubscribe)
            this.onDeleSubscribe.unsubscribe();
        if (this.onPrintSubscribe)
            this.onPrintSubscribe.unsubscribe();
        if (this.onNextPageSubscribe)
            this.onNextPageSubscribe.unsubscribe();
    }

    private createForm(): FormGroup {
        let ArrestDate = this.mode == 'C' ? setDateMyDatepicker(new Date()) : null;
        let ArrestTime = this.mode == 'C' ? `${setZero((new Date).getHours())}.${setZero((new Date).getMinutes())} น.` : null;
        // let OccurrenceDate = ArrestDate;
        return new FormGroup({
            ArrestCode: new FormControl(this.arrestCode, Validators.required),
            ArrestDate: new FormControl(ArrestDate, Validators.required),
            ArrestTime: new FormControl(ArrestTime, Validators.required),
            OccurrenceDate: new FormControl(ArrestDate, Validators.required),
            OccurrenceTime: new FormControl(ArrestTime, Validators.required),
            ArrestStationCode: new FormControl(null, Validators.required),
            ArrestStation: new FormControl(null, Validators.required),
            HaveCulprit: new FormControl(0),
            Behaviour: new FormControl(null, Validators.required),
            Testimony: new FormControl(null, Validators.required),
            Prompt: new FormControl(null, Validators.required),
            IsMatchNotice: new FormControl(null),
            ArrestDesc: new FormControl('N/A'),
            NoticeCode: new FormControl(null, Validators.required),
            InvestigationSurveyDocument: new FormControl(null),
            InvestigationCode: new FormControl(null, Validators.required),
            IsActive: new FormControl(1),
            ArrestStaff: this.fb.array([this.createStaffForm()]),
            ArrestLocale: this.fb.array([this.createLocalForm()]),
            ArrestLawbreaker: this.fb.array([]),
            ArrestProduct: this.fb.array([]),
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

    // private createIndictment(): FormGroup {
    //     return this.fb.group(ArrestIndictmentFormControl)
    // }

    // private createLawbreaker(): FormGroup {
    //     return this.fb.group(ArrestLawbreakerFormControl);
    // }

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

            if (p['mode'] == 'C') {
                // set false
                this.navService.setPrintButton(false);
                this.navService.setEditButton(false);
                this.navService.setDeleteButton(false);
                this.navService.setEditField(false);
                // set true
                this.navService.setSaveButton(true);
                this.navService.setCancelButton(true);
                this.arrestCode = p['code'] == 'NEW' ? `TN-${(new Date).getTime()}` : p['code'];

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
            this.showEditField = p.valueOf();
        });

        this.onSaveSubscribe = this.navService.onSave.subscribe(async status => {
            if (status) {
                // set action save = false
                await this.navService.setOnSave(false);

                if (!this.arrestFG.valid) {
                    this.isRequired = true;
                    alert(Message.checkData)
                    return false;
                }

                if (!this.ArrestLawbreaker.length) {
                    alert(Message.checkData)
                    return false;
                }

                const sDateCompare = getDateMyDatepicker(this.arrestFG.value.ArrestDate);
                const eDateCompare = getDateMyDatepicker(this.arrestFG.value.OccurrenceDate);

                if (sDateCompare.valueOf() > eDateCompare.valueOf()) {
                    alert(Message.checkDate);
                    return false;
                }

                this.arrestFG.value.ArrestDate = convertDateForSave(sDateCompare);
                this.arrestFG.value.OccurrenceDate = convertDateForSave(eDateCompare);

                this.arrestFG.value.ArrestTime = (new Date()).toISOString();

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
                this.router.navigate(['/lawsuit/manage', 'C']);
            }
        })
    }

    private async setOfficeStore() {
        await this.mainMasterService.masOfficeMaingetAll().then(res =>
            this.typeheadOffice = res
        )
    }

    private async setStaffStore() {
        await this.mainMasterService.masStaffMaingetAll().then(res =>
            this.typeheadStaff = res
        )
    }

    private async setProductStore() {
        await this.mainMasterService.masProductMaingetAll().then(res => {
            this.typeheadProduct = res;
        })
    }

    private async setProductUnitStore() {
        await this.mainMasterService.masDutyUnitMaingetAll().then(res => {
            this.typeheadProductUnit = res;
        })
    }

    private async setRegionStore() {
        await this.mainMasterService.masDistrictMaingetAll().then(res => {
            res.map(prov =>
                prov.MasDistrict.map(dis =>
                    dis.MasSubDistrict.map(subdis => {
                        this.typeheadRegion.push({
                            SubdistrictCode: subdis.SubdistrictCode,
                            SubdistrictNameTH: subdis.SubdistrictNameTH,
                            DistrictCode: dis.DistrictCode,
                            DistrictNameTH: dis.DistrictNameTH,
                            ProvinceCode: prov.ProvinceCode,
                            ProvinceNameTH: prov.ProvinceNameTH,
                            ZipCode: null
                        })
                    })
                )
            )
        })
    }

    private getByCon(code: string) {

        this.arrestService.getByCon(code).then(async res => {
            let o = res[0];
            await this.arrestFG.reset({
                ArrestCode: o.ArrestCode,
                ArrestDate: setDateMyDatepicker(new Date(o.ArrestDate)),
                ArrestTime: o.ArrestTime,
                OccurrenceDate: setDateMyDatepicker(new Date(o.OccurrenceDate)),
                OccurrenceTime: o.OccurrenceTime,
                ArrestStationCode: o.ArrestStationCode,
                ArrestStation: o.ArrestStation,
                HaveCulprit: o.HaveCulprit,
                Behaviour: o.Behaviour,
                Testimony: o.Testimony,
                Prompt: o.Prompt,
                IsMatchNotice: o.IsMatchNotice,
                ArrestDesc: o.ArrestDesc,
                NoticeCode: o.NoticeCode,
                InvestigationSurveyDocument: o.InvestigationSurveyDocument,
                InvestigationCode: o.InvestigationCode,
                IsActive: o.IsActive
            });
            o.ArrestLocale.map(item => {
                item.ArrestCode = item.ArrestCode || code;
                item.Region = `${item.SubDistrict} ${item.District} ${item.Province}`;
            });

            const staff = o.ArrestStaff.filter(item => item.IsActive == 1);
            staff.map(item => {
                item.FullName = `${item.TitleName == null ? '' : item.TitleName}`;
                item.FullName += ` ${item.FirstName == null ? '' : item.FirstName}`;
                item.FullName += ` ${item.LastName == null ? '' : item.LastName}`;

                item.IsNewItem = false;
                item.ContributorID = item.ContributorID;
            });

            const lawbreaker = o.ArrestLawbreaker.filter(item => item.IsActive == 1);
            lawbreaker.map(item => {
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

            const product = o.ArrestProduct.filter(item => item.IsActive == 1);
            product.map(item => {
                item.IsNewItem = false;
                item.ProductFullName = `${item.SubBrandNameTH == null ? '' : item.SubBrandNameTH}`;
                item.ProductFullName += ` ${item.BrandNameTH == null ? '' : item.BrandNameTH}`;
                item.ProductFullName += ` ${item.ModelName == null ? '' : item.ModelName}`;
            });

            const indictment = o.ArrestIndictment.filter(item => item.IsActive == 1);
            indictment.map(async item => {
                item.IsNewItem = false
                item.SectionName = item.SectionName ? item.SectionName : null;
                let _IndictmentLawbreaker = new Array<IndictmentLawbreaker>();

                // await item.OpsArrestIndicmentDetailCollection.map(a1 => {
                //     let _lawbreaker = o.ArrestLawbreaker.filter(a2 => a2.LawbreakerID == a1.LawbreakerID);
                //     _IndictmentLawbreaker.push({
                //         LawbreakerID: a1.LawbreakerID.toString(),
                //         LawbreakerFullName: _lawbreaker.length ? _lawbreaker[0].LawbreakerFullName : null,
                //         CompanyFullName: _lawbreaker.length ? _lawbreaker[0].CompanyFullName : null,
                //         EntityType: _lawbreaker.length ? _lawbreaker[0].EntityType : null,

                //         ProductID: null,
                //         ProductName: null,
                //         Qty: null,
                //         QtyUnit: null,
                //         Size: null,
                //         SizeUnit: null,
                //         Weight: null,
                //         WeightUnit: null,
                //         IsChecked: false
                //     })
                // })
                item.IndictmentLawbreaker = _IndictmentLawbreaker;
            });

            await this.arrestService.getDocument(code).then(async res => {
                const doc = res.filter(item => item.IsActive == 1);
                doc.map(item => item.IsNewItem = false)

                await this.setItemFormArray(res, 'ArrestDocument');
            })

            this.setItemFormArray(staff, 'ArrestStaff');
            this.setItemFormArray(o.ArrestLocale, 'ArrestLocale');
            this.setItemFormArray(lawbreaker, 'ArrestLawbreaker');
            this.setItemFormArray(product, 'ArrestProduct');

            this.addIndicment(indictment);
        })
    }

    private async onCreate() {

        this.preloader.setShowPreloader(true);

        console.log('====================================');
        console.log(JSON.stringify(this.arrestFG.value));
        console.log('====================================');
        let isSuccess: boolean | false;

        // ___1.บันทึกข้อมูลจับกุม
        await this.arrestService.insAll(this.arrestFG.value).then(async IsSuccess => {
            if (!IsSuccess) { isSuccess = false; return false; }
            await this.saveIndictmentDetail().then(IsSuccess => isSuccess = IsSuccess);

            if (!isSuccess) { return; }

            this.ArrestDocument.value.map(async doc => {
                // insert Document
                await this.arrestService.insDocument(doc).then(docIsSuccess => {
                    if (!docIsSuccess) { isSuccess = docIsSuccess; return; }
                }, () => { isSuccess = false; return false; });
            });

        }, () => { isSuccess = false; return; });

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
            if (!arrestRes) { IsSuccess = false; return; }
            // ___3. ค้นหาข้อมูลภายใน ArrestIndictment
            IsSuccess = true
            // arrestRes.ArrestIndictment.map(indictObj => {
            //     // ข้อกล่าวหา
            //     // ___4. เปรียบเทียบ รายการข้อกล่าวหาด้วย GuiltBaseID กับ res0.GuiltBaseID
            //     this.ArrestIndictment.value.filter(item1 => indictObj.GuiltBaseID == item1.GuiltBaseID).map((item1) => {
            //         // รายละเอียดข้อกล่าวหา
            //         item1.ArrestIndictmentDetail.map(async indictD => {
            //             // ___5. Set IndictmentID ให้กับ object IndicmentDetail
            //             indictD.IndictmentID = indictObj.IndictmentID;
            //             // ___6. บันทึก ArrestIndictmentDetail
            //             await this.arrestService.indicmentDetailinsAll(indictD).then(async indictDIns => {
            //                 if (!indictDIns) { IsSuccess = false; return false; }

            //                 IsSuccess = true
            //                 // ___7. ค้นหา indicmentDetail เพื่อดึงเอา indicmentDetailID มาใช้งาน
            //                 await this.arrestService
            //                     .indicmentgetByCon(indictD.IndictmentID.toString())
            //                     .then(indictDetailGet => {
            //                         debugger
            //                         if (!indictDetailGet.length) return false;

            //                         console.log(indictDetailGet);

            //                         // รายละเอียดสินค้า
            //                         indictD.ArrestProductDetail.map(productD => {
            //                             console.log(productD);
            //                             debugger
            //                             // ___8. set IndictmentDetailID ให้กับ Object ProductDetail
            //                             // productD.IndictmentDetailID = indictDetailGet.IndictmentDetailID
            //                             // ___9.บันทึก ArrestProductDetail
            //                             // this.arrestService.productDetailInsAll(productD).then(productDIns => console.log(productDIns));
            //                         })
            //                     }, (error) => { IsSuccess = false; console.error(error); return false; });

            //             }, (error) => { IsSuccess = false; console.error(error); return false; });

            //         })
            //     })

            // })

        }, () => { IsSuccess = false; return false; });

        return IsSuccess;
    }

    private async onReviced() {

        this.preloader.setShowPreloader(true);

        console.log('====================================');
        console.log(JSON.stringify(this.arrestFG.value));
        console.log('====================================');

        let isSuccess: boolean | true;

        await this.arrestService.updByCon(this.arrestFG.value).then(async _arrest => {

            if (!_arrest) { isSuccess = false; return; }

            await this.arrestService.localeupdByCon(this.ArrestLocale.at(0).value)
                .then(IsSuccess => isSuccess = IsSuccess, () => { isSuccess = false; return false; });

            if (!isSuccess) return false;

            const staff = this.ArrestStaff.value;
            staff.map(async item => {
                if (item.IsNewItem) {
                    await this.arrestService.staffinsAll(item).then(_staff => {
                        if (!_staff) { isSuccess = false; return; }
                    }, () => { isSuccess = false; return; });

                } else {
                    await this.arrestService.staffUpd(item).then(_staff => {
                        if (!_staff) { isSuccess = false; return; }
                    }, () => { isSuccess = false; return; });
                }

            });

            if (!isSuccess) return false;

            const lawbreaker = this.ArrestLawbreaker.value;
            lawbreaker.map(async item => {

                if (item.IsNewItem) {
                    await this.arrestService.lawbreakerinsAll(item).then(_lawbreaker => {
                        if (!_lawbreaker) { isSuccess = false; return; }

                    }, () => { isSuccess = false; return; });

                } else {
                    await this.arrestService.lawbreakerUpd(item).then(_lawbreaker => {
                        if (!_lawbreaker) { isSuccess = false; return; }
                    }, () => { isSuccess = false; return; });
                }

            });

            if (!isSuccess) return false;

            const product = this.ArrestProduct.value;
            product.map(async item => {
                if (item.IsNewItem) {
                    await this.arrestService.productinsAll(item).then(_product => {
                        if (!_product) { isSuccess = false; return; }
                    }, () => { isSuccess = false; return false; });
                } else {
                    await this.arrestService.productUpd(item).then(_product => {
                        if (!_product) { isSuccess = false; return; }
                    }, () => { isSuccess = false; return false; });
                }
            });

            if (!isSuccess) return false;

            const indicment = this.ArrestIndictment.value;
            indicment.map(async item => {
                if (item.IsNewItem) {
                    await this.arrestService.indicmentinsAll(item).then(async _indict => {
                        if (!_indict) { isSuccess = false; return; }
                        // await this.saveIndictmentDetail().then(IsSuccess => isSuccess = IsSuccess);
                    }, () => { isSuccess = false; return false; });
                } else {
                    await this.arrestService.indictmentUpd(item).then(async _indict => {
                        if (!_indict) { isSuccess = false; return; }
                        // await this.saveIndictmentDetail().then(IsSuccess => isSuccess = IsSuccess);
                    }, () => { isSuccess = false; return false; });
                }

            });

            const document = this.ArrestDocument.value;
            document.map(async item => {
                if (item.IsNewItem) {
                    await this.arrestService.insDocument(item).then(docIsSuccess => {
                        if (!docIsSuccess) { isSuccess = docIsSuccess; return; }
                    }, () => { isSuccess = false; return false; });

                } else {
                    this.arrestService.updDocument(item).then(docIsSuccess => {
                        if (!docIsSuccess) { isSuccess = docIsSuccess; return; }
                    }, () => { isSuccess = false; return; })
                }
            })

        }, () => { isSuccess = false; return false; })

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

    async setNoticeForm(notice: Notice) {
        this.arrestFG.patchValue({ NoticeCode: notice.NoticeCode });

        const locale = notice.NoticeLocale[0];
        let product = notice.NoticeProduct;

        const region = this.findRegion(locale.SubDistrict, locale.District, locale.Province)

        this.ArrestLocale.at(0).reset(locale);
        this.ArrestLocale.at(0).patchValue({
            SubDistrictCode: locale.SubDistrictCode || region.SubdistrictCode,
            SubDistrict: locale.SubDistrict || region.SubdistrictNameTH,
            DistrictCode: locale.DistrictCode || region.DistrictCode,
            District: locale.District || region.DistrictNameTH,
            ProvinceCode: locale.ProvinceCode || region.ProvinceCode,
            Province: locale.Province || region.ProvinceNameTH,
            Region: `${locale.SubDistrict} ${locale.District} ${locale.Province}`,
            ArrestCode: this.arrestCode,
            IsArrest: 1
        })

        await product.map(item => {
            item.ProductFullName = `${item.SubBrandNameTH == null ? '' : item.SubBrandNameTH}`;
            item.ProductFullName += ` ${item.BrandNameTH == null ? '' : item.BrandNameTH}`;
            item.ProductFullName += ` ${item.ModelName == null ? '' : item.ModelName}`;
            item.NetWeight = item.NetWeight || null;
            item.NetWeightUnit = item.NetWeightUnit || null;
            this.ArrestProduct.push(this.fb.group(item));
        })

        for (let i = 0; i < this.ArrestProduct.length; i++) {
            this.ArrestProduct.at(i).patchValue({
                ArrestCode: this.arrestCode,
                IsNewItem: true
            })
        }

    }

    findRegion(subdistrict, district, province) {
        let r = this.typeheadRegion.filter(v =>
            (v.SubdistrictNameTH == subdistrict) &&
            (v.DistrictNameTH == district) &&
            (v.ProvinceNameTH == province)
        ).reduce((obj, key) => {
            obj['SubdistrictCode'] = key.SubdistrictCode;
            obj['SubdistrictNameTH'] = key.SubdistrictNameTH;
            obj['DistrictCode'] = key.SubdistrictCode;
            obj['DistrictNameTH'] = key.DistrictNameTH;
            obj['ProvinceCode'] = key.ProvinceCode;
            obj['ProvinceNameTH'] = key.ProvinceNameTH;
            return obj;
        }, {});

        return r as RegionModel;
    }

    openModal(e) {
        this.modal = this.modelService.open(e, { size: 'lg', centered: true });
        this.isEditIndicment = false;
        this.indicmentIndex = null;
    }

    indictmentModal: ArrestIndictment;
    isEditIndicment: boolean | false;
    indicmentIndex: number | null;
    editAllegation(index: number, e: any) {
        this.modal = this.modelService.open(e, { size: 'lg', centered: true });
        this.indictmentModal = new ArrestIndictment();
        this.isEditIndicment = true;
        this.indicmentIndex = index;
        // this.indictmentModal = this.ArrestIndictment.at(index).value;
    }

    addLawbreaker(e: ArrestLawbreaker[]) {
        e.map(item => {
            item.ArrestCode = this.arrestCode;
            item.IsNewItem = true;
            item.LawbreakerRefID = item.LawbreakerID;
            this.ArrestLawbreaker.push(this.fb.group(item));
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
            if (lastDoc.PositionName && lastDoc.DepartmentName && lastDoc.ContributorID) {
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
            if (lastDoc.Qty && lastDoc.QtyUnit) {
                this.ArrestProduct.push(this.fb.group(item));
            }
        }
    }

    addIndicment(e: ArrestIndictment[]) {

        e.map(async item => {
            let indictDetail = [];

            await item.IndictmentLawbreaker.map(lb => {
                let productDetail = [];

                productDetail.push(
                    this.fb.group({
                        ProductID: new FormControl(lb.ProductID, Validators.required),
                        IsProdcutCo: 1,
                        Qty: new FormControl(lb.Qty, Validators.required),
                        QtyUnit: new FormControl(lb.QtyUnit, Validators.required),
                        Size: new FormControl(lb.Size),
                        SizeUnit: new FormControl(lb.SizeUnit),
                        Weight: new FormControl(lb.Weight),
                        WeightUnit: new FormControl(lb.WeightUnit),
                        MistreatRate: null,
                        Fine: null,
                        IndictmentDetailID: null
                    })
                )

                indictDetail.push(
                    this.fb.group({
                        IndictmentID: null,
                        ArrestCode: new FormControl(this.arrestCode, Validators.required),
                        LawbreakerID: new FormControl(lb.LawbreakerID, Validators.required),
                        GuiltBaseID: new FormControl(item.GuiltBaseID, Validators.required),
                        IsProve: 1,
                        IsActive: 1,
                        ArrestProductDetail: this.fb.array(productDetail)
                    })
                )
            })

            let FG = this.fb.group({
                ArrestCode: new FormControl(this.arrestCode, Validators.required),
                IndicmentID: new FormControl(item.IndicmentID),
                IsProve: new FormControl(item.IsProve, Validators.required),
                IsActive: new FormControl(item.IsActive, Validators.required),
                GuiltBaseID: new FormControl(item.GuiltBaseID, Validators.required),
                SectionNo: new FormControl(item.SectionNo),
                SectionDesc1: item.SectionDesc1,
                SectionName: item.SectionName,
                IndictmentLawbreaker: this.fb.array(item.IndictmentLawbreaker),
                ArrestIndictmentDetail: this.fb.array(indictDetail),
                IsNewItem: item.IsNewItem == false ? false : true
            })

            this.ArrestIndictment.push(FG);
        })
    }

    patchIndicment(e: ArrestIndictment) {
        const isNewItem = this.ArrestIndictment.at(this.indicmentIndex).value.isNewItem;
        this.ArrestIndictment.at(this.indicmentIndex).reset({
            IsNewItem: isNewItem || true,
            ArrestCode: this.arrestCode,
            IsProve: 1,
            IsActive: 1,
            GuiltBaseID: e.GuiltBaseID,
            SectionNo: e.SectionNo,
            SectionDesc1: e.SectionDesc1,
            SectionName: e.SectionName,
            IndictmentLawbreaker: this.fb.array(e.IndictmentLawbreaker),
        });
    }

    addDocument() {
        const lastIndex = this.ArrestDocument.length - 1;
        let item = new ArrestDocument();
        item.ReferenceCode = this.arrestCode;
        item.IsNewItem = true;
        if (lastIndex < 0) {
            this.ArrestDocument.push(this.fb.group(item));
        } else {
            const lastItem = this.ArrestDocument.at(lastIndex).value;
            if (lastItem.DocumentName && lastItem.FilePath) {
                this.ArrestDocument.push(this.fb.group(item));
            }
        }
    }

    viewLawbreaker(id: number) {
        this.router.navigate([`/arrest/lawbreaker`, 'R', id]);
    }

    async deleteStaff(indexForm: number, staffId: string) {
        if (this.mode === 'C') {
            this.ArrestStaff.removeAt(indexForm);

        } else if (this.mode === 'R') {
            const isNewItem = this.ArrestStaff.at(indexForm).value.IsNewItem;
            if (isNewItem) { this.ArrestStaff.removeAt(indexForm); return; }

            if (confirm(Message.confirmAction)) {
                this.preloader.setShowPreloader(true);
                await this.arrestService.staffupdDelete(staffId).then(IsSuccess => {
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

    async deleteLawbreaker(indexForm: number, lawbreakerId: string) {
        if (this.mode === 'C') {
            this.ArrestLawbreaker.removeAt(indexForm);

        } else if (this.mode === 'R') {
            const isNewItem = this.ArrestLawbreaker.at(indexForm).value.IsNewItem;
            if (isNewItem) { this.ArrestLawbreaker.removeAt(indexForm); return; }

            if (confirm(Message.confirmAction)) {
                this.preloader.setShowPreloader(true);
                await this.arrestService.lawbreakerupdDelete(lawbreakerId).then(IsSuccess => {
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

    async deleteProduct(indexForm: number, productId: string) {
        if (this.mode === 'C') {
            this.ArrestProduct.removeAt(indexForm);

        } else if (this.mode === 'R') {
            const isNewItem = this.ArrestProduct.at(indexForm).value.IsNewItem;

            if (isNewItem) { this.ArrestProduct.removeAt(indexForm); return; }

            if (confirm(Message.confirmAction)) {
                this.preloader.setShowPreloader(true);
                await this.arrestService.productupdDelete(productId).then(IsSuccess => {
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

            const isNewItem = this.ArrestIndictment.at(indexForm).value.IsNewItem;

            if (isNewItem) { this.ArrestIndictment.removeAt(indexForm); return; }

            if (confirm(Message.confirmAction)) {
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

    async deleteDocument(id: string, indexForm: number) {
        if (this.mode === 'C') {
            this.ArrestDocument.removeAt(indexForm);

        } else if (this.mode === 'R') {

            const isNewItem = this.ArrestDocument.at(indexForm).value.IsNewItem;

            if (isNewItem) { this.ArrestDocument.removeAt(indexForm); return; }

            if (confirm(Message.confirmAction)) {
                this.preloader.setShowPreloader(true);

                await this.arrestService.documentUpDelete(id).then(isSuccess => {
                    if (isSuccess === true) {
                        this.ArrestDocument.removeAt(indexForm);
                        alert(Message.delDocumentComplete)
                    } else {
                        alert(Message.delDocumentFail)
                    }
                })
                this.preloader.setShowPreloader(false);
            }
        }
    }

    searchProduct = (text$: Observable<string>) =>
        text$
            .debounceTime(200)
            .distinctUntilChanged()
            .map(term => term === '' ? []
                : this.typeheadProduct
                    .filter(v =>
                        (v.SubBrandNameTH && v.SubBrandNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        (v.BrandNameTH && v.BrandNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        (v.ModelName && v.ModelName.toLowerCase().indexOf(term.toLowerCase()) > -1)
                    ).slice(0, 10));

    searchRegion = (text3$: Observable<string>) =>
        text3$
            .debounceTime(200)
            .distinctUntilChanged()
            .map(term => term === '' ? []
                : this.typeheadRegion
                    .filter(v =>
                        (v.SubdistrictNameTH && v.SubdistrictNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        (v.DistrictNameTH && v.DistrictNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        (v.ProvinceNameTH && v.ProvinceNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1)
                    ).slice(0, 10));

    searchStaff = (text3$: Observable<string>) =>
        text3$
            .debounceTime(200)
            .distinctUntilChanged()
            .map(term => term === '' ? []
                : this.typeheadStaff
                    .filter(v =>
                        (v.TitleName && v.TitleName.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        (v.FirstName && v.FirstName.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        (v.LastName && v.LastName.toLowerCase().indexOf(term.toLowerCase()) > -1)
                    ).slice(0, 10));

    serachOffice = (text3$: Observable<string>) =>
        text3$
            .debounceTime(200)
            .distinctUntilChanged()
            .map(term => term === '' ? []
                : this.typeheadOffice
                    .filter(v =>
                        (v.OfficeName && v.OfficeName.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        (v.OfficeShortName && v.OfficeShortName.toLowerCase().indexOf(term.toLowerCase()) > -1)
                    ).slice(0, 10));

    formatterRegion = (x: { SubdistrictNameTH: string, DistrictNameTH: string, ProvinceNameTH: string }) =>
        `${x.SubdistrictNameTH || ''} ${x.DistrictNameTH || ''} ${x.ProvinceNameTH || ''}`;

    formatterProduct = (x: { SubBrandNameTH: string, BrandNameTH: string, ModelName: string }) =>
        `${x.SubBrandNameTH || ''} ${x.BrandNameTH || ''} ${x.ModelName || ''}`;

    formatterStaff = (x: { TitleName: string, FirstName: string, LastName: string }) =>
        `${x.TitleName || ''} ${x.FirstName || ''} ${x.LastName || ''}`

    formatterOffice = (x: { OfficeShortName: string }) => x.OfficeShortName

    selectItemLocaleRegion(e) {
        this.ArrestLocale.at(0).patchValue({
            SubDistrictCode: e.item.SubdistrictCode,
            SubDistrict: e.item.SubdistrictNameTH,
            DistrictCode: e.item.DistrictCode,
            District: e.item.DistrictNameTH,
            ProvinceCode: e.item.ProvinceCode,
            Province: e.item.ProvinceNameTH,
        })
    }

    selectItemProductItem(e, i) {
        const isNewItem = this.ArrestProduct.at(i).value.isNewItem;
        this.ArrestProduct.at(i).reset(e.item);
        this.ArrestProduct.at(i).patchValue({
            IsNewItem: isNewItem || true,
            ArrestCode: this.arrestCode,
            GroupCode: e.item.GroupCode || 1,
            IsDomestic: e.item.IsDomestic || 1
        })
    }

    selectItemStaff(e, i) {
        const isNewItem = this.ArrestStaff.at(i).value.isNewItem;
        this.ArrestStaff.at(i).reset(e.item);
        this.ArrestStaff.at(i).patchValue({
            IsNewItem: isNewItem || true,
            ProgramCode: this.programSpect,
            ProcessCode: '0002',
            ArrestCode: this.arrestCode,
            PositionCode: e.item.OperationPosCode,
            PositionName: e.item.OperationPosName,
            DepartmentCode: e.item.OfficeCode,
            DepartmentName: e.item.OfficeName,
            DepartmentLevel: e.item.DeptLevel,
            ContributorID: e.item.ContributorID || 2,
            ContributorCode: e.item.ContributorCode || 2

        })
    }

    selectItemOffice(e) {
        this.arrestFG.patchValue({
            ArrestStationCode: e.item.OfficeCode,
            ArrestStation: e.item.OfficeShortName
        })
    }

    changeArrestDoc(e: any, index: number) {
        let reader = new FileReader();
        let file = e.target.files[0];
        let fileName: string = file.name;
        let fileType: string = file.type;

        reader.readAsDataURL(file);
        reader.onload = () => {
            let dataSource = reader.result.split(',')[1];
            if (dataSource && dataSource !== undefined) {
                this.ArrestDocument.at(index).patchValue({
                    ReferenceCode: this.arrestCode,
                    FilePath: replaceFakePath(e.target.value),
                    IsActive: 1
                })
            }
        };
    }
}
