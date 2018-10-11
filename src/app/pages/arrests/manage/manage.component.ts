import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { ArrestsService } from '../arrests.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { setZero, MyDatePickerOptions, setDateMyDatepicker, getDateMyDatepicker, convertDateForSave, toLocalShort } from '../../../config/dateFormat';
import { ArrestStaff } from '../models/arrest-staff';
import { Message } from '../../../config/message';
import { ArrestProduct, ArrestProductDetail } from '../models/arrest-product';
import { ArrestDocument } from '../models/arrest-document';
import { ArrestIndictment, ArrestIndicmentDetail } from '../models/arrest-indictment';
import { SidebarService } from '../../../shared/sidebar/sidebar.component';
import { ArrestLocaleFormControl } from '../models/arrest-locale';
import { ArrestLawbreaker } from '../models/arrest-lawbreaker';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import { MasOfficeModel } from '../../../models/mas-office.model';
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
import { MasDutyProductUnitModel } from '../../../models/mas-duty-product-unit.model';
import { replaceFakePath } from '../../../config/dataString';
import { MainMasterService } from '../../../services/main-master.service';
import { Subscription } from 'rxjs';
import { ArrestNotice, ArrestNoticeStaff, ArrestNoticeSuspect } from '../models/arrest-notice';
import { ArrestLawGuitbase, ArrestLawSubSectionRule, LawsuitLawSubSection } from '../models/arrest-law-guiltbase';

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit, OnDestroy {

    // FormGroup ตรวจสอบสถานะในการบันทึก
    // C: ข้อมูลใหม่
    // R: อัพเดทข้อมูล

    // FormArray ตรวจสอบสถานะด้วย
    // c: รายการใหม่
    // r: รายการอัพเดท
    // d: รายการที่ถูกลบ

    card1: boolean = true;
    noticeCard: boolean = false;
    card2: boolean = false;
    card3: boolean = false;
    card4: boolean = false;
    card5: boolean = false;
    card6: boolean = false;
    card7: boolean = false;
    card8: boolean = false;

    programSpect = 'ILG60-03-02-00'
    mode: string;
    modal: any;
    arrestCode: string;
    showEditField: boolean;
    isRequired: boolean;

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

    readonly lawbreakerType = LawbreakerTypes;
    readonly entityType = EntityTypes;
    readonly contributerType = ContributorType;

    private sub: Subscription;
    private onSaveSubscribe: Subscription;
    private onDeleSubscribe: Subscription;
    private onPrintSubscribe: Subscription;
    private onNextPageSubscribe: Subscription;
    private onCancelSubscribe: Subscription;

    // --- ArresNotice --- //
    get ArrestNotice(): FormArray {
        return this.arrestFG.get('ArrestNotice') as FormArray;
    }

    // --- ArrestStaff --- //
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

    getArrestNoticeSuspect(form: any) {
        return form.controls.ArrestNoticeSuspect.controls;
    }

    getArrestNoticeStaff(form: any) {
        return form.controls.ArrestNoticeStaff.controls;
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

        this.sidebarService.setVersion('0.0.0.16');
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
        this.sub.unsubscribe();
        this.onCancelSubscribe.unsubscribe();
        this.onSaveSubscribe.unsubscribe();
        this.onDeleSubscribe.unsubscribe();
        this.onPrintSubscribe.unsubscribe();
        this.onNextPageSubscribe.unsubscribe();
    }

    private createForm(): FormGroup {
        let ArrestDate = this.mode == 'C' ? setDateMyDatepicker(new Date()) : null;
        let ArrestTime = this.mode == 'C' ? `${setZero((new Date).getHours())}.${setZero((new Date).getMinutes())} น.` : null;
        let testCode = `test-${(new Date).getTime()}`;
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
            InvestigationCode: new FormControl(testCode, Validators.required),
            IsActive: new FormControl(1),
            ArrestNotice: this.fb.array([]),
            ArrestStaff: this.fb.array([]),
            ArrestLocale: this.fb.array([this.createLocalForm()]),
            ArrestLawbreaker: this.fb.array([]),
            ArrestProduct: this.fb.array([]),
            ArrestIndictment: this.fb.array([]),
            ArrestDocument: this.fb.array([])
        })
    }

    private createLocalForm(): FormGroup {
        ArrestLocaleFormControl.ArrestCode = new FormControl(this.arrestCode);
        return this.fb.group(ArrestLocaleFormControl);
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

            const notice = o.ArrestNotice;
            notice.map((item: ArrestNotice) => {
                item.NoticeDate = toLocalShort(item.NoticeDate)
                item.ArrestNoticeSuspect.map(suspect => {
                    suspect.FullName = `${suspect.SuspectTitleName || ''}`;
                    suspect.FullName += ` ${suspect.SuspectFirstName || ''}`;
                    suspect.FullName += ` ${suspect.SuspectLastName || ''}`
                });

                item.ArrestNoticeStaff.map(staff => {
                    staff.FullName = `${staff.TitleName || ''}`;
                    staff.FullName += ` ${staff.FirstName || ''}`;
                    staff.FullName += ` ${staff.LastName || ''}`
                })
            })

            const staff = o.ArrestStaff.filter(item => item.IsActive == 1);
            staff.map((item: ArrestStaff) => {
                item.FullName = `${item.TitleName == null ? '' : item.TitleName}`;
                item.FullName += ` ${item.FirstName == null ? '' : item.FirstName}`;
                item.FullName += ` ${item.LastName == null ? '' : item.LastName}`;

                item.IsNewItem = false;
                item.ContributorID = item.ContributorID;
            });

            const product = o.ArrestProduct.filter(item => item.IsActive == 1);
            product.map((item: ArrestProduct) => {
                item.IsNewItem = false;
                item.ProductFullName = `${item.SubBrandNameTH == null ? '' : item.SubBrandNameTH}`;
                item.ProductFullName += ` ${item.BrandNameTH == null ? '' : item.BrandNameTH}`;
                item.ProductFullName += ` ${item.ModelName == null ? '' : item.ModelName}`;
            });

            const indictment = o.ArrestIndictment.filter(item => item.IsActive == 1);

            await this.arrestService.MasDocumentMaingetAll('3', this.arrestCode).then(res => {
                const doc = res.filter(item => item.IsActive == 1);
                doc.map(item => item.IsNewItem = false)
                this.setItemFormArray(res, 'ArrestDocument');
            })

            this.setItemFormArray(notice, 'ArrestNotice');
            this.setItemFormArray(staff, 'ArrestStaff');
            this.setItemFormArray(o.ArrestLocale, 'ArrestLocale');
            this.setItemFormArray(product, 'ArrestProduct');
            // this.setItemFormArray(indictment, 'ArrestIndictment');
            this.setArrestIndictmentForm(indictment);


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

            // this.ArrestDocument.value.map(async doc => {
            //     // insert Document
            //     await this.arrestService.insDocument(doc).then(docIsSuccess => {
            //         if (!docIsSuccess) { isSuccess = docIsSuccess; return; }
            //     }, () => { isSuccess = false; return false; });
            // });

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
                    }, () => { isSuccess = false; return false; });
                } else {
                    await this.arrestService.indictmentUpd(item).then(async _indict => {
                        if (!_indict) { isSuccess = false; return; }
                    }, () => { isSuccess = false; return false; });
                }

            });

            const document = this.ArrestDocument.value;
            document.map(async item => {
                if (item.IsNewItem) {
                    // await this.arrestService.insDocument(item).then(docIsSuccess => {
                    //     if (!docIsSuccess) { isSuccess = docIsSuccess; return; }
                    // }, () => { isSuccess = false; return false; });

                } else {
                    this.arrestService.MasDocumentMainupdByCon(item).then(docIsSuccess => {
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
    // Set Array ArrestNoticeForm
    // 1
    setNoticeForm(n: ArrestNotice) {
        let arrestNotice = this.ArrestNotice;
        arrestNotice.push(
            this.fb.group({
                ArrestCode: this.arrestCode,
                NoticeCode: n.NoticeCode,
                NoticeDate: n.NoticeDate,
                isModify: 'c',
                ArrestNoticeStaff: this.setArrestNoticeStaff(n.ArrestNoticeStaff),
                ArrestNoticeSuspect: this.setArrestNoticeSuspect(n.ArrestNoticeSuspect)
            })
        );
    }
    // 2
    private setArrestNoticeStaff(o: ArrestNoticeStaff[]) {
        let arr = new FormArray([]);
        o.map(x => {
            arr.push(this.fb.group({ FullName: x.FullName, OfficeName: x.OfficeName }));
        })
        return arr;
    }
    // 3
    private setArrestNoticeSuspect(o: ArrestNoticeSuspect[]) {
        let arr = new FormArray([]);
        o.map(x => {
            arr.push(this.fb.group({ FullName: x.FullName }));
        })
        return arr;
    }
    // set FormArray ArrestIndictment
    // 1
    setArrestIndictmentForm(o: ArrestIndictment) {
        let arr = this.ArrestIndictment;
        arr.push(
            this.fb.group({
                ArrestIndictmentDetail: this.setArrestIndictmentDetail(o.ArrestIndictmentDetail),
                ArrestLawGuitbase: this.setArrestLawGuitbase(o.ArrestLawGuitbase)
            })
        )
        return arr;
    }
    // --- 1.1
    private setArrestIndictmentDetail(o: ArrestIndicmentDetail[]) {
        let arr = new FormArray([]);
        o.map(x => {
            arr.push(this.fb.group({
                ArrestLawbreaker: this.setArrestLawbreaker(x.ArrestLawbreaker),
                ArrestProductDetail: this.setArrestProductDetail(x.ArrestProductDetail)
            }))
        })
        return arr;
    }
    // --- --- 1.1.1
    private setArrestLawbreaker = (o: ArrestLawbreaker[]) => {
        let arr = new FormArray([]);
        let LawbreakerFullName;
        o.map(x => {
            LawbreakerFullName = x.LawbreakerTitleName == null ? '' : x.LawbreakerTitleName;
            LawbreakerFullName += x.LawbreakerFirstName == null ? '' : ` ${x.LawbreakerFirstName}`;
            LawbreakerFullName += x.LawbreakerLastName == null ? '' : ` ${x.LawbreakerLastName}`;
            arr.push(this.fb.group({
                LawbreakerFullName
            }))
        })
        return arr;
    }
    // --- --- 1.1.2
    private setArrestProductDetail = (o: ArrestProductDetail[]) => {
        let arr = new FormArray([]);
        o.map(x => arr.push(this.fb.group({ ProductDesc: x.ProductDesc })));
        return arr;
    }

    // --- 2.1
    private setArrestLawGuitbase = (o: ArrestLawGuitbase[]) => {
        let arr = new FormArray([]);
        o.map(x => {
            arr.push(this.fb.group({
                GuiltBaseID: x.GuiltBaseID,
                GuiltBaseName: x.GuiltBaseName,
                IsCompare: x.IsCompare,
                IsActive: x.IsActive,
                IsProve: x.IsProve,
                ArrestLawSubSectionRule: this.setArrestLawSubSectionRule(x.ArrestLawSubSectionRule)
            }))
        })
        return arr;
    }
    // --- --- 2.1.1
    private setArrestLawSubSectionRule = (o: ArrestLawSubSectionRule[]) => {
        let arr = new FormArray([]);
        o.map(x => {
            arr.push(this.fb.group({
                SectionNo: x.SectionNo,
                LawsuitLawSubSection: this.setLawsuitLawSubSection(x.LawsuitLawSubSection)
            }))
        })
    }
    // --- --- 2.1.2
    private setLawsuitLawSubSection = (o: LawsuitLawSubSection[]) => {
        let arr = new FormArray([]);
        o.map(x => {
            arr.push(this.fb.group({
                SubSectionNo: x.SubSectionNo,
                SubSectionType: x.SubSectionType
            }))
        })
    }

    openModal(e) {
        this.modal = this.modelService.open(e, { size: 'lg', centered: true });
    }

    addStaff() {
        const lastIndex = this.ArrestStaff.length - 1;
        let item = new ArrestStaff();
        item.ArrestCode = this.arrestCode;
        item.IsModify = 'c'
        if (lastIndex < 0) {
            item.RowId = 1;
            this.ArrestStaff.push(this.fb.group(item));
            return;
        }
        const lastDoc = this.ArrestStaff.at(lastIndex).value;
        if (lastDoc.ContributorID) {
            item.RowId = lastDoc.RowId + 1;
            this.ArrestStaff.push(this.fb.group(item));
        }
    }

    addProduct() {
        const lastIndex = this.ArrestProduct.length - 1;
        let item = new ArrestProduct();
        item.ArrestCode = this.arrestCode;
        item.IsModify = 'c';
        if (lastIndex < 0) {
            item.RowId = 1;
            this.ArrestProduct.push(this.fb.group(item));
            return;
        }
        const lastDoc = this.ArrestProduct.at(lastIndex).value;
        if (lastDoc.Qty && lastDoc.QtyUnit) {
            item.RowId = lastDoc.RowId + 1;
            this.ArrestProduct.push(this.fb.group(item));
        }
    }

    addDocument() {
        const lastIndex = this.ArrestDocument.length - 1;
        let item = new ArrestDocument();
        item.DocumentType = '3';
        item.ReferenceCode = this.arrestCode;
        item.IsModify = 'c';
        if (lastIndex < 0) {
            item.RowId = 1;
            this.ArrestDocument.push(this.fb.group(item));
            return;
        }
        const lastItem = this.ArrestDocument.at(lastIndex).value;
        if (lastItem.DocumentName && lastItem.FilePath) {
            item.RowId = lastItem.RowId + 1;
            this.ArrestDocument.push(this.fb.group(item));
        }
    }

    viewLawbreaker(id: number) {
        this.router.navigate([`/arrest/lawbreaker`, 'R', id]);
    }

    private async sortFormArray(arr: any[]) {
        let a = await arr.sort((a, b) => {
            if (a.RowId < b.RowId) return -1; // asc
            if (a.RowId > b.RowId) return 1; // desc
            return 0;
        });
        let i = 0;
        a.map((x) => { if (x.RowId != 0) x.RowId = ++i; });
        return a;
    }

    deleteNotice(i: number) {
        this.ArrestNotice.at(i).patchValue({ IsModify: 'd', RowId: 0 });
        let notice = this.sortFormArray(this.ArrestNotice.value);
        notice.then(x => this.ArrestNotice.patchValue(x));
    }

    deleteStaff(i: number) {
        this.ArrestStaff.at(i).patchValue({ IsModify: 'd', RowId: 0 });
        let staff = this.sortFormArray(this.ArrestStaff.value);
        staff.then(x => this.ArrestStaff.patchValue(x));
    }

    deleteProduct(i: number) {
        this.ArrestProduct.at(i).patchValue({ IsModify: 'd', RowId: 0 });
        
    }

    deleteIndicment(i: number) {
        this.ArrestIndictment.at(i).patchValue({ IsModify: 'd', RowId: 0 });
    }

    deleteDocument(i: number) {
        this.ArrestDocument.at(i).patchValue({ IsModify: 'd', RowId: 0 });
    }

    searchProduct = (text$: Observable<string>) =>
        text$.debounceTime(200).distinctUntilChanged()
            .map(term => term === '' ? []
                : this.typeheadProduct
                    .filter(v =>
                        (v.SubBrandNameTH && v.SubBrandNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        (v.BrandNameTH && v.BrandNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        (v.ModelName && v.ModelName.toLowerCase().indexOf(term.toLowerCase()) > -1)
                    ).slice(0, 10));

    searchRegion = (text3$: Observable<string>) =>
        text3$.debounceTime(200).distinctUntilChanged()
            .map(term => term === '' ? []
                : this.typeheadRegion
                    .filter(v =>
                        (v.SubdistrictNameTH && v.SubdistrictNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        (v.DistrictNameTH && v.DistrictNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        (v.ProvinceNameTH && v.ProvinceNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1)
                    ).slice(0, 10));

    searchStaff = (text3$: Observable<string>) =>
        text3$.debounceTime(200).distinctUntilChanged()
            .map(term => term === '' ? []
                : this.typeheadStaff
                    .filter(v =>
                        (v.TitleName && v.TitleName.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        (v.FirstName && v.FirstName.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        (v.LastName && v.LastName.toLowerCase().indexOf(term.toLowerCase()) > -1)
                    ).slice(0, 10));

    serachOffice = (text3$: Observable<string>) =>
        text3$.debounceTime(200).distinctUntilChanged()
            .map(term => term === '' ? []
                : this.typeheadOffice
                    .filter(v =>
                        (v.OfficeName && v.OfficeName.toLowerCase().indexOf(term.toLowerCase()) > -1)
                    ).slice(0, 10));

    formatterRegion = (x: { SubdistrictNameTH: string, DistrictNameTH: string, ProvinceNameTH: string }) =>
        `${x.SubdistrictNameTH || ''} ${x.DistrictNameTH || ''} ${x.ProvinceNameTH || ''}`;

    formatterProduct = (x: { SubBrandNameTH: string, BrandNameTH: string, ModelName: string }) =>
        `${x.SubBrandNameTH || ''} ${x.BrandNameTH || ''} ${x.ModelName || ''}`;

    formatterStaff = (x: { TitleName: string, FirstName: string, LastName: string }) =>
        `${x.TitleName || ''} ${x.FirstName || ''} ${x.LastName || ''}`

    formatterOffice = (x: { OfficeName: string }) => x.OfficeName

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
        const isModify = this.ArrestProduct.at(i).value.IsModify;
        this.ArrestProduct.at(i).reset(e.item);
        this.ArrestProduct.at(i).patchValue({
            IsNewItem: isModify,
            ArrestCode: this.arrestCode,
            GroupCode: e.item.GroupCode || 1,
            IsDomestic: e.item.IsDomestic || 1
        })
    }

    selectItemStaff(e, i) {
        const staff = this.ArrestStaff.at(i).value;
        this.ArrestStaff.at(i).reset(e.item);
        this.ArrestStaff.at(i).patchValue({
            IsModify: staff.IsModify,
            RowId: staff.RowId,
            ProgramCode: this.programSpect,
            ProcessCode: '0002',
            ArrestCode: this.arrestCode,
            PositionCode: e.item.OperationPosCode,
            PositionName: e.item.OperationPosName,
            DepartmentCode: e.item.OfficeCode,
            DepartmentName: e.item.OfficeName,
            DepartmentLevel: e.item.DeptLevel,
            ContributorID: e.item.ContributorID
        })
    }

    selectItemOffice(e) {
        this.arrestFG.patchValue({
            ArrestStationCode: e.item.OfficeCode,
            ArrestStation: e.item.OfficeName
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
