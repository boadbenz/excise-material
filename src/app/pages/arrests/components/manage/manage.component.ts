import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import { MasOfficeModel } from 'app/models/mas-office.model';
import { MasStaffModel, RegionModel, MasProductModel, LawbreakerTypes, EntityTypes, ContributorType, MasProvinceModel } from 'app/models';
import { MasDutyProductUnitModel } from 'app/models/mas-duty-product-unit.model';
import { MyDatePickerOptions, setDateMyDatepicker, setZero, getDateMyDatepicker, convertDateForSave, toLocalShort } from 'app/config/dateFormat';
import { ArrestProduct, ArrestProductDetail } from '../../models/arrest-product';
import { NavigationService } from 'app/shared/header-navigation/navigation.service';
import { SidebarService } from 'app/shared/sidebar/sidebar.component';
import { PreloaderService } from 'app/shared/preloader/preloader.component';
import { MainMasterService } from 'app/services/main-master.service';
import { ArrestLocaleFormControl } from '../../models/arrest-locale';
import { Message } from 'app/config/message';
import { ArrestNotice, ArrestNoticeStaff, ArrestNoticeSuspect } from '../../models/arrest-notice';
import { ArrestIndictment, ArrestIndictmentDetail } from '../../models/arrest-indictment';
import { ArrestLawbreaker } from '../../models/arrest-lawbreaker';
import { ArrestLawGuitbase, ArrestLawSubSectionRule, LawsuitLawSubSection } from '../../models/arrest-law-guiltbase';
import { ArrestStaff } from '../../models/arrest-staff';
import { ArrestDocument } from '../../models/arrest-document';
import { replaceFakePath } from 'app/config/dataString';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { ArrestsService } from '../../arrests.service';

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

    myDatePickerOptions = MyDatePickerOptions;
    mode: string;
    modal: any;
    arrestCode: string;
    showEditField: boolean;
    isRequired: boolean;
    arrestFG: FormGroup;
    typeheadOffice = new Array<MasOfficeModel>();
    typeheadStaff = new Array<MasStaffModel>();
    typeheadRegion = new Array<RegionModel>();
    typeheadProduct = new Array<MasProductModel>();
    typeheadProductUnit = new Array<MasDutyProductUnitModel>();

    readonly lawbreakerType = LawbreakerTypes;
    readonly entityType = EntityTypes;
    readonly contributerType = ContributorType;

    private destroy$: Subject<boolean> = new Subject<boolean>();

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

    @ViewChild('printDocModal') printDocModel: ElementRef;

    // Redux based variables
    arrestProduct: Observable<ArrestProduct[]>;

    constructor(
        private fb: FormBuilder,
        private activeRoute: ActivatedRoute,
        private modelService: NgbModal,
        private navService: NavigationService,
        private ngbModel: NgbModal,
        private router: Router,
        private sidebarService: SidebarService,
        private mainMasterService: MainMasterService,
        private store: Store<fromStore.AppState>,
        private arrestService: ArrestsService
    ) {
        // set false
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);
        this.navService.setPrevPageButton(false);
        // set true
        this.navService.setNextPageButton(true);
        this.navService.setInnerTextNextPageButton("รับคำกล่าวโทษ")
    }

    async ngOnInit() {

        this.sidebarService.setVersion('0.0.0.17');
        this.active_route();
        this.arrestFG = this.createForm();
        this.navigate_Service();

        this.setStaffStore()
        await this.setOfficeStore()
        this.setProductStore()
        this.setProductUnitStore()
        this.setRegionStore()
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
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
        this.activeRoute.params.takeUntil(this.destroy$).subscribe(p => {
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

        this.navService.onSave.takeUntil(this.destroy$).subscribe(async status => {
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

        this.navService.onDelete.takeUntil(this.destroy$).subscribe(async status => {
            if (status) {
                await this.navService.setOnDelete(false);
                this.onDelete();
            }
        });

        this.navService.onCancel.takeUntil(this.destroy$).subscribe(async status => {
            if (status) {
                await this.navService.setOnCancel(false);
                this.router.navigate(['/arrest/list']);
            }
        })

        this.navService.onPrint.takeUntil(this.destroy$).subscribe(async status => {
            if (status) {
                await this.navService.setOnPrint(false);
                this.modal = this.ngbModel.open(this.printDocModel, { size: 'lg', centered: true });
            }
        })

        this.navService.onNextPage.takeUntil(this.destroy$).subscribe(async status => {
            if (status) {
                await this.navService.setOnNextPage(false);
                this.router.navigate(['/lawsuit/manage', 'C']);
            }
        })
    }

    private setOfficeStore() {
        this.mainMasterService.MasOfficeMaingetAll()
            .takeUntil(this.destroy$)
            .subscribe((x: MasOfficeModel[]) => this.typeheadOffice = x);
    }

    private setStaffStore() {
        this.mainMasterService.MasStaffMaingetAll()
            .takeUntil(this.destroy$)
            .subscribe((x: MasStaffModel[]) => this.typeheadStaff = x);
    }

    private setProductStore() {
        this.mainMasterService.MasProductMaingetAll()
            .takeUntil(this.destroy$)
            .subscribe((x: MasProductModel[]) => this.typeheadProduct = x);
    }

    private setProductUnitStore() {
        this.mainMasterService.MasDutyUnitMaingetAll()
            .takeUntil(this.destroy$)
            .subscribe((x: MasDutyProductUnitModel[]) => this.typeheadProductUnit = x);
    }

    private async setRegionStore() {
        this.mainMasterService.MasDistrictMaingetAll()
            .takeUntil(this.destroy$)
            .subscribe((x: MasProvinceModel[]) => {
                x.map(prov =>
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
            });
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
    }


    private async onReviced() {

    }

    private async onDelete() {
        if (confirm(Message.confirmAction)) {

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
    setNoticeForm(n: ArrestNotice[]) {
        let arrestNotice = this.ArrestNotice;
        let i = 0;
        n.map(x => {
            const modify = arrestNotice.value.filter(x => x.IsModify != 'd');
            i = (modify.length) && modify[modify.length - 1].RowId;
            arrestNotice.push(
                this.fb.group({
                    ArrestCode: this.arrestCode,
                    NoticeCode: x.NoticeCode,
                    NoticeDate: x.NoticeDate,
                    IsModify: x.IsModify || 'c',
                    RowId: x.IsModify != 'd' && ++i,
                    ArrestNoticeStaff: this.setArrestNoticeStaff(x.ArrestNoticeStaff),
                    ArrestNoticeSuspect: this.setArrestNoticeSuspect(x.ArrestNoticeSuspect)
                })
            );
        })
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
    setArrestIndictmentForm(o: ArrestIndictment[]) {
        let arr = this.ArrestIndictment;
        o.map(x => {
            arr.push(
                this.fb.group({
                    ArrestIndictmentDetail: this.setArrestIndictmentDetail(x.ArrestIndictmentDetail),
                    ArrestLawGuitbase: this.setArrestLawGuitbase(x.ArrestLawGuitbase)
                })
            )
        });
        return arr;
    }
    // --- 1.1
    private setArrestIndictmentDetail(o: ArrestIndictmentDetail[]) {
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

    addAllegation() {
        let payload = this.ArrestProduct.value as ArrestProduct[];
        payload = payload.filter(x => x.ProductID == '')
        this.store.dispatch(new fromStore.CreateArrestProduct(payload));
        this.router.navigate(
            [`arrest/allegation`, 'C', this.arrestCode],
            { queryParams: { indictmentDetailId: '', guiltbaseId: '' } });
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
        if (lastItem.DataSource && lastItem.FilePath) {
            item.RowId = lastItem.RowId + 1;
            this.ArrestDocument.push(this.fb.group(item));
        }
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

    private deleteFormArray(o: FormArray, i: number, controls: string) {
        o.at(i).patchValue({ IsModify: 'd', RowId: 0 });
        let sort = this.sortFormArray(o.value);
        o.value.map(() => o.removeAt(0));
        sort.then(x => this.setItemFormArray(x, controls));
    }

    deleteStaff(i: number) {
        this.deleteFormArray(this.ArrestStaff, i, 'ArrestStaff');
    }

    deleteProduct(i: number) {
        this.deleteFormArray(this.ArrestProduct, i, 'ArrestProduct');
    }

    deleteDocument(i: number) {
        this.deleteFormArray(this.ArrestDocument, i, 'ArrestDocument');
    }

    deleteNotice(i: number) {
        this.ArrestNotice.at(i).patchValue({ IsModify: 'd', RowId: 0 });
        let notice = this.sortFormArray(this.ArrestNotice.value);
        this.ArrestNotice.value.map(() => this.ArrestNotice.removeAt(0));
        notice.then(x => this.setNoticeForm(x));
    }

    deleteIndicment(i: number) {
        this.ArrestIndictment.at(i).patchValue({ IsModify: 'd', RowId: 0 });
        let indictment = this.sortFormArray(this.ArrestIndictment.value);
        this.ArrestIndictment.value.map(() => this.ArrestIndictment.removeAt(0));
        indictment.then((x) => this.setArrestIndictmentForm(x));
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

    formatterProduct = (x: { ProductDesc: string }) => x.ProductDesc;

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
        const product = this.ArrestProduct.at(i).value;
        this.ArrestProduct.at(i).reset(e.item);
        this.ArrestProduct.at(i).patchValue({
            IsModify: product.IsModify,
            RowId: product.RowId,
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
            FullName: `${e.item.TitleName} ${e.item.FirstName} ${e.item.LastName}`,
            ProgramCode: 'ILG60-03-02-00-00',
            ProcessCode: '02',
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
        // let file = e.target.files[0];
        this.ArrestDocument.at(index).patchValue({
            ReferenceCode: this.arrestCode,
            FilePath: replaceFakePath(e.target.value),
            IsActive: 1
        })
    }
}
