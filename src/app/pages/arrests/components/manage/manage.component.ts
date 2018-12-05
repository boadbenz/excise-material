import { Component, OnInit, OnDestroy, ViewChild, ElementRef, OnChanges, AfterContentInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Subject, BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import { MasOfficeModel } from 'app/models/mas-office.model';
import { MasStaffModel, RegionModel, MasProductModel, LawbreakerTypes, EntityTypes, ContributorType } from 'app/models';
import { MasDutyProductUnitModel } from 'app/models/mas-duty-product-unit.model';
import { MyDatePickerOptions, setDateMyDatepicker, setZero, getDateMyDatepicker, convertDateForSave, compareDate, toLocalShort } from 'app/config/dateFormat';
import { ArrestProduct } from '../../models/arrest-product';
import { NavigationService } from 'app/shared/header-navigation/navigation.service';
import { SidebarService } from 'app/shared/sidebar/sidebar.component';
import { MainMasterService } from 'app/services/main-master.service';
import { Message } from 'app/config/message';
import { ArrestStaff } from '../../models/arrest-staff';
import { ArrestDocument } from '../../models/arrest-document';
import { replaceFakePath } from 'app/config/dataString';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import * as fromModels from '../../models';
import * as fromServices from '../../services';
import { ArrestsService } from '../../arrests.service';
import { LoaderService } from 'app/core/loader/loader.service';
import { MasDocumentMainService } from 'app/services/mas-document-main.service';
import { IMyDateModel } from 'mydatepicker-th';
import { ManageConfig } from './manage.config';
import swal from 'sweetalert2'

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit, OnDestroy {


    // FormGroup ตรวจสอบสถานะในการบันทึก TN905016100058
    // C: ข้อมูลใหม่
    // R: อัพเดทข้อมูล

    // FormArray ตรวจสอบสถานะด้วย
    // c: รายการใหม่
    // r: รายการแสดง
    // u: รายการอัพเดท
    // d: รายการที่ถูกลบ
    // card1: boolean = true;
    noticeCard: boolean = false;
    card2: boolean = false;
    card3: boolean = false;
    card4: boolean = false;
    card5: boolean = false;
    card6: boolean = false;
    card7: boolean = false;
    card8: boolean = false;

    myDatePickerOptions = MyDatePickerOptions;
    _isSuccess: boolean = false;
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
    typeheadQtyUnit = new Array<MasDutyProductUnitModel>();
    typeheadNetVolumeUnit = new Array<MasDutyProductUnitModel>();
    Acceptability: fromModels.Acceptability

    dateStartFrom: any;
    dateStartTo: any;

    documentType = '3';

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

    getArrestLawGuitbase(form: any) {
        return form.controls.ArrestLawGuitbase.controls;
    }

    getArrestIndicmentDetail(form: any) {
        return form.controls.ArrestIndicmentDetail.controls;
    }

    getArrestLawbreaker(form: any) {
        return form.controls.ArrestLawbreaker.controls;
    }

    getArrestProductDetail(form: any) {
        return form.controls.ArrestProductDetail.controls;
    }

    // --- 1
    getArrestLawSubSectionRule(form: any) {
        return form.controls.ArrestLawSubSectionRule.controls;
    }
    // --- --- 1.1
    getArrestLawSubSection(form: any) {
        return form.controls.ArrestLawSubSection.controls;
    }
    // --- --- 1.2
    getArrestLawSection(form: any) {
        return form.controls.ArrestLawSection.controls;
    }
    // --- --- --- 1.2.1
    getArrestLawPenalty(form: any) {
        return form.controls.ArrestLawPenalty.controls;
    }

    getArrestNoticeSuspect(form: any) {
        return form.controls.ArrestNoticeSuspect.controls;
    }

    getArrestNoticeStaff(form: any) {
        return form.controls.ArrestNoticeStaff.controls;
    }

    @ViewChild('printDocModal') printDocModel: ElementRef;

    // Redux based variables
    obArrest: Observable<fromModels.Arrest>;
    stateArrest: fromModels.Arrest;

    constructor(
        private fb: FormBuilder,
        private activeRoute: ActivatedRoute,
        private modelService: NgbModal,
        private navService: NavigationService,
        private ngbModel: NgbModal,
        private router: Router,
        private sidebarService: SidebarService,
        private mainMasterService: MainMasterService,
        private s_document: MasDocumentMainService,
        private store: Store<fromStore.AppState>,
        private s_arrest: fromServices.ArrestService,
        private s_product: fromServices.ArrestProductService,
        private s_indictment: fromServices.ArrestIndictmentService,
        private s_notice: fromServices.ArrestNoticeService,
        private s_staff: fromServices.ArrestStaffService,
        private s_lawsuit: fromServices.ArrestLawSuitService,
        private loaderService: LoaderService,
        private manageConfig: ManageConfig
    ) {
        // set false
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);
        this.navService.setPrevPageButton(false);
        this.navService.setNextPageButton(false);

        this.obArrest = store.select(s => s.arrest);
        this.obArrest
            .takeUntil(this.destroy$)
            .subscribe((x: fromModels.Arrest) => this.stateArrest = x)
    }

    onCollapse = this.manageConfig.onCollapse;

    ILG60_03_02_00_00_E08 = this.manageConfig.ILG60_03_02_00_00_E08;
    ILG60_03_02_00_00_E10 = this.manageConfig.ILG60_03_02_00_00_E10;
    ILG60_03_02_00_00_E13 = this.manageConfig.ILG60_03_02_00_00_E13;
    ILG60_03_02_00_00_E18 = this.manageConfig.ILG60_03_02_00_00_E18;
    ILG60_03_02_00_00_E20 = this.manageConfig.ILG60_03_02_00_00_E20;
    ILG60_03_02_00_00_E21 = this.manageConfig.ILG60_03_02_00_00_E21;
    ILG60_03_03_00_00_E15 = this.manageConfig.ILG60_03_03_00_00_E15;
    ILG60_03_02_00_00_E25 = this.manageConfig.ILG60_03_02_00_00_E25;
    ILG60_03_02_00_00_E28 = this.manageConfig.ILG60_03_02_00_00_E28;

    async ngOnInit() {
        this.sidebarService.setVersion(this.s_arrest.version);
        this.active_route();
        if (this.arrestFG) {
            setTimeout(() => {
                this.arrestFG.reset();
            }, 300);
        }

        this.arrestFG = this.createForm();
        this.navigate_Service();

    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
        this.arrestFG.reset();
    }

    private createForm(): FormGroup {
        let ArrestDate = setDateMyDatepicker(new Date());
        let ArrestTime = `${setZero((new Date).getHours())}.${setZero((new Date).getMinutes())} น.`;
        return new FormGroup({
            ArrestCode: new FormControl(this.arrestCode, Validators.required),
            ArrestDate: new FormControl(ArrestDate, Validators.required),
            ArrestTime: new FormControl(ArrestTime, Validators.required),
            OccurrenceDate: new FormControl(ArrestDate, Validators.required),
            OccurrenceTime: new FormControl(ArrestTime, Validators.required),
            ArrestStationCode: new FormControl(null),
            ArrestStation: new FormControl(null, Validators.required),
            HaveCulprit: new FormControl(0),
            Behaviour: new FormControl('รับสารภาพตลอดข้อกล่าวหา'),
            Testimony: new FormControl('รับสารภาพตลอดข้อกล่าวหา'),
            Prompt: new FormControl('แจ้งให้ญาติทราบ'),
            IsMatchNotice: new FormControl(null),
            ArrestDesc: new FormControl(''),
            NoticeCode: new FormControl(null),
            InvestigationSurveyDocument: new FormControl(null),
            InvestigationCode: new FormControl(null),
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
        fromModels.ArrestLocaleFormControl.ArrestCode = new FormControl(this.arrestCode);
        return this.fb.group(fromModels.ArrestLocaleFormControl);
    }

    private setItemFormArray(array: any[], formControl: string) {
        if (array !== undefined && array.length) {
            const itemFGs = array.map(item => this.fb.group(item));
            const itemFormArray = this.fb.array(itemFGs);
            this.arrestFG.setControl(formControl, itemFormArray);
        }
    }

    private active_route() {
        this.activeRoute.params.takeUntil(this.destroy$).subscribe(async p => {
            this.mode = p['mode'];
            this.arrestCode = p['code'];
            this.pageLoad(this.arrestCode);
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
                    swal('', Message.checkData, 'warning')
                    return false;
                }
                const sDateCompare = getDateMyDatepicker(this.arrestFG.value.ArrestDate);
                const eDateCompare = getDateMyDatepicker(this.arrestFG.value.OccurrenceDate);
                this.arrestFG.value.ArrestDate = convertDateForSave(sDateCompare);
                this.arrestFG.value.OccurrenceDate = convertDateForSave(eDateCompare);
                if (this.arrestFG.invalid) return;
                let staff: fromModels.ArrestStaff[] = this.ArrestStaff.value.filter(x => x.IsModify != 'd')
                if (staff.length <= 0) {
                    swal('', 'ต้องมีรายการผู้ร่วมจับกุมอย่างน้อย 1 รายการ', 'warning')
                    return
                }
                if (staff.filter(x => x.ContributorID == '').length > 0) {
                    swal('', 'กรุณาเลือกฐานะของผู้จับกุม', 'warning');
                    return;
                }
                if (staff.filter(x => x.ContributorID == '6').length <= 0) {
                    swal('', 'ต้องมีผู้จับกุมที่มีฐานะเป็น “ผู้กล่าวหา” อย่างน้อย 1 รายการ', 'warning');
                    return;
                }
                if (!this.ArrestIndictment.value.length) {
                    swal('', '“ฐานความผิดมาตรา” ในส่วนข้อกล่าวหาต้องมีอย่างน้อย 1 รายการ', 'warning')
                    return;
                }
                this.onSave();
            }
        });

        this.navService.onEdit.takeUntil(this.destroy$).subscribe(async status => {
            if (status) {
                await this.navService.setOnEdit(false);
                this.onEdit();
            }
        })

        this.navService.onDelete.takeUntil(this.destroy$).subscribe(async status => {
            if (status) {
                await this.navService.setOnDelete(false);
                this.onDelete();
            }
        });

        this.navService.onCancel.takeUntil(this.destroy$).subscribe(async status => {
            if (status) {
                await this.navService.setOnCancel(false);

                swal({
                    title: '',
                    text: Message.confirmAction,
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Confirm!'
                }).then((result) => {
                    if (result.value) {
                        this.onCancel();
                    }
                })
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

    private async pageLoad(arrestCode: string) {
        switch (this.mode) {
            case 'C':
                this.enableBtnModeC()
                await this.loadMasterData();
                this.showEditField = false;
                if (this.stateArrest) {
                    if (this.arrestCode != this.stateArrest.ArrestCode)
                        this.stateArrest = null;
                }
                await this.pageRefresh(this.arrestCode);
                break;

            case 'R':
                this.enableBthModeR();
                this.expandCard();
                this.pageRefresh(arrestCode);
                break;
        }
    }

    private enableBtnModeC() {
        // set false
        this.navService.setPrintButton(false);
        this.navService.setEditButton(false);
        this.navService.setDeleteButton(false);
        this.navService.setEditField(false);
        // set true 
        this.navService.setSaveButton(true);
        this.navService.setCancelButton(true);
    }

    private enableBthModeR() {
        // set false
        this.navService.setSaveButton(false);
        this.navService.setCancelButton(false);
        // set true
        this.navService.setPrintButton(true);
        this.navService.setEditButton(true);
        this.navService.setDeleteButton(true);
        this.navService.setEditField(true);
    }

    private expandCard() {
        this.ILG60_03_02_00_00_E08.next(true);
        this.ILG60_03_02_00_00_E10.next(true);
        this.ILG60_03_02_00_00_E13.next(true);
        this.ILG60_03_02_00_00_E18.next(true);
        this.ILG60_03_02_00_00_E20.next(true);
        this.ILG60_03_02_00_00_E21.next(true);
        this.ILG60_03_03_00_00_E15.next(true);
        this.ILG60_03_02_00_00_E25.next(true);
        this.ILG60_03_02_00_00_E28.next(true);
    }

    private async pageRefresh(arrestCode: string) {
        this.loaderService.show();

        let arr = new Array<fromModels.Arrest>();
        if (arrestCode != 'NEW') {
            await this.s_arrest.ArrestgetByCon(arrestCode)
                .then((a) => {
                    if (this.checkResponse(a))
                        arr = a;
                }).catch((error) => this.catchError(error));
        } else {
            arr = this.stateArrest ? [this.stateArrest] : [];
        }

        if (arr.length) {
            let _arr = arr[0];
            this.pageRefreshArrest(_arr);

            await this.pageRefreshProduct(_arr.ArrestProduct, arrestCode);

            await this.pageRefreshIndictment(_arr.ArrestIndictment, arrestCode);

            await this.pageRefreshDocument(_arr.ArrestDocument, arrestCode);
        };
        this.loaderService.hide();
    }

    private pageRefreshArrest(_arr: fromModels.Arrest) {
        let arrestForm = this.arrestFG;

        _arr.ArrestDate = this.isObject(_arr.ArrestDate)
            ? _arr.ArrestDate
            : setDateMyDatepicker(_arr.ArrestDate);
        _arr.OccurrenceDate = this.isObject(_arr.OccurrenceDate)
            ? _arr.OccurrenceDate
            : setDateMyDatepicker(_arr.OccurrenceDate);

        _arr.ArrestNotice.map((x, index) => {
            x.RowId = index + 1;
            x.IsModify = x.IsModify || 'r';
            x.NoticeDateString = toLocalShort(x.NoticeDate);
            x.ArrestNoticeStaff.map(s => s.FullName = `${s.TitleName} ${s.FirstName} ${s.LastName}`);
            x.ArrestNoticeSuspect.map(s => s.FullName = `${s.SuspectTitleName} ${s.SuspectFirstName} ${s.SuspectLastName}`);
        })
        this.setNoticeForm(_arr.ArrestNotice);

        _arr.ArrestStaff.map((x, index) => {
            x.RowId = index + 1;
            x.IsModify = x.IsModify || 'r';
            x.ContributorID = x.ContributorID || x.ContributorCode;
            x.FullName = `${x.TitleName} ${x.FirstName} ${x.LastName}`;
        });
        this.setItemFormArray(_arr.ArrestStaff, 'ArrestStaff');

        _arr.ArrestLocale.map(x => {
            if (x.SubDistrictCode && x.DistrictCode && x.ProvinceCode) {
                x.Region = `${x.SubDistrict} ${x.District} ${x.Province}`;
            }
        })
        arrestForm.patchValue(_arr);
    }

    private async pageRefreshProduct(_arrProd: fromModels.ArrestProduct[], arrestCode: string) {
        let _prod = new Array<fromModels.ArrestProduct>();
        if (arrestCode != 'NEW') {
            await this.s_product.ArrestProductgetByArrestCode(arrestCode)
                .then((pro) => {
                    if (this.checkResponse(pro)) {
                        _prod = pro.map(x => {
                            x.IsModify = 'r';
                            return x;
                        })
                    };
                }).catch((error) => this.catchError(error));
        } else {
            _prod = _arrProd;
        }

        if (!_prod.length) return;

        _prod.map((x, index) => x.RowId = index + 1);

        this.setItemFormArray(_prod, 'ArrestProduct');
    }

    private async pageRefreshIndictment(_arrIndict: fromModels.ArrestIndictment[], arrestCode) {
        let _indict = new Array<fromModels.ArrestIndictment>();
        if (arrestCode != 'NEW') {
            await this.s_indictment.ArrestIndictmentgetByArrestCode(arrestCode)
                .then((ind) => {
                    if (this.checkResponse(ind)) _indict = ind;
                }).catch((error) => this.catchError(error));
        } else {
            _indict = _arrIndict;
        }

        if (!_indict.length) return;

        this.setArrestIndictment(_indict);
    }

    private async pageRefreshDocument(_arrDoc: fromModels.ArrestDocument[], arrestCode) {
        let _doc = new Array<fromModels.ArrestDocument>();
        if (arrestCode != 'NEW') {
            await this.s_document.MasDocumentMaingetAll(this.documentType, arrestCode)
                .then((x) => {
                    if (this.checkResponse(x)) {
                        _doc = x.map(y => {
                            y.IsModify = 'r';
                            return y;
                        });
                    };
                }).catch((error) => this.catchError(error));
        } else {
            _doc = _arrDoc;
        }

        if (!_doc.length) return;

        _doc.map((y, index) => y.RowId = index + 1);

        this.setItemFormArray(_doc, 'ArrestDocument');
    }

    private async loadMasterData() {
        this.loaderService.show();
        const promises = [
            await this.mainMasterService.MasStaffMaingetAll(),
            await this.mainMasterService.MasOfficeMaingetAll(),
            await this.mainMasterService.MasProductMaingetAll(),
            await this.mainMasterService.MasDutyUnitMaingetAll(),
            await this.mainMasterService.MasDistrictMaingetAll()
        ]

        Promise.all(promises)
            .then(x => {
                this.typeheadStaff = x[0]
                this.typeheadOffice = x[1]
                this.typeheadProduct = x[2]
                this.typeheadQtyUnit = x[3]
                this.typeheadNetVolumeUnit = x[3]
                x[4].map(prov =>
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
                );
            }).catch((error) => this.catchError(error));
        this.loaderService.hide();
    }

    onSDateChange(event: IMyDateModel) {
        this.dateStartFrom = event
        this.dateStartTo = this.dateStartTo || this.arrestFG.value.OccurrenceDate
        this.checkDate();
    }

    onEDateChange(event: IMyDateModel) {
        this.dateStartFrom = this.dateStartFrom || this.arrestFG.value.ArrestDate
        this.dateStartTo = event
        this.checkDate()
    }

    private checkDate() {
        if (this.dateStartFrom && this.dateStartTo) {

            let sdate = this.isObject(this.dateStartFrom)
                ? getDateMyDatepicker(this.dateStartFrom)
                : new Date(this.dateStartFrom);
            let edate = this.isObject(this.dateStartTo)
                ? getDateMyDatepicker(this.dateStartTo)
                : new Date(this.dateStartTo);

            if (!compareDate(sdate, edate)) {
                swal('', Message.checkDate, 'warning')
                setTimeout(() => {
                    this.arrestFG.patchValue({
                        OccurrenceDate: this.isObject(this.dateStartFrom)
                            ? { date: this.dateStartFrom.date }
                            : setDateMyDatepicker(this.dateStartFrom)
                    })
                }, 0);
            }
        }
    }

    // Set Array ArrestNoticeForm
    // 1
    setNoticeForm(n: fromModels.ArrestNotice[]) {
        let arrestNotice = this.ArrestNotice;
        let i = 0;
        n.map(x => {
            let modify = arrestNotice.value.filter(x => x.IsModify != 'd');
            i = (modify.length) && modify[modify.length - 1].RowId;
            arrestNotice.push(
                this.fb.group({
                    ArrestCode: this.arrestCode,
                    NoticeCode: x.NoticeCode,
                    NoticeDateString: x.NoticeDateString,
                    NoticeDate: x.NoticeDate,
                    IsModify: x.IsModify || 'c',
                    RowId: x.IsModify != 'd' && ++i,
                    ArrestNoticeStaff: this.setArrestNoticeStaff(x.ArrestNoticeStaff),
                    ArrestNoticeSuspect: this.setArrestNoticeSuspect(x.ArrestNoticeSuspect)
                })
            );
        })

        this.arrestFG.setControl('ArrestNotice', arrestNotice);
    }
    // 2
    private setArrestNoticeStaff(o: fromModels.ArrestNoticeStaff[]) {
        let arr = new FormArray([]);
        o.map(x => {
            arr.push(this.fb.group({ FullName: x.FullName, OfficeName: x.OfficeName }));
        })
        return arr;
    }
    // 3
    private setArrestNoticeSuspect(o: fromModels.ArrestNoticeSuspect[]) {
        let arr = new FormArray([]);
        o.map(x => {
            arr.push(this.fb.group({ FullName: x.FullName }));
        })
        return arr;
    }
    // set FormArray ArrestIndictment
    private setArrestIndictment(o: fromModels.ArrestIndictment[]) {
        let arr = new FormArray([]);
        o.map((x, index) => {
            arr.push(
                this.fb.group({
                    RowId: index + 1,
                    IsModify: x.IsModify || 'r',
                    IndictmentID: x.IndictmentID,
                    GuiltBaseID: x.GuiltBaseID,
                    ArrestLawGuitbase: this.setArrestLawGuitbase(x.ArrestLawGuitbase),
                    ArrestIndicmentDetail: this.setArrestIndicmentDetail(x.ArrestIndicmentDetail)
                })
            )
        });
        this.arrestFG.setControl('ArrestIndictment', arr);
    }

    // --- ArrestGuildBase 1
    private setArrestLawGuitbase = (o: fromModels.ArrestLawGuitbase[]) => {
        let arr = new FormArray([]);
        o.map((x, index) => {
            arr.push(this.fb.group({
                // RowId: index + 1,
                IsChecked: false,
                GuiltBaseID: x.GuiltBaseID,
                GuiltBaseName: x.GuiltBaseName,
                IsCompare: x.IsCompare,
                IsActive: x.IsActive,
                IsProve: x.IsProve,
                SubSectionRuleID: x.SubSectionRuleID,
                ArrestLawSubSectionRule: this.setArrestLawSubSectionRule(x.ArrestLawSubSectionRule)
            }))
        })
        return arr;
    }
    // --- --- 1.1
    private setArrestLawSubSectionRule = (o: fromModels.ArrestLawSubSectionRule[]) => {
        let arr = new FormArray([]);
        o.map(x => {
            arr.push(this.fb.group({
                SubSectionRuleID: x.SubSectionRuleID,
                SubSectionID: x.SubSectionID,
                SectionNo: x.SectionNo,
                IsActive: x.IsActive,
                ArrestLawSubSection: this.setArrestLawSubSection(x.ArrestLawSubSection),
                ArrestLawSection: this.setArrestLawSection(x.ArrestLawSection)
            }))
        })
        return arr;
    }
    // --- --- --- 1.1.1
    private setArrestLawSubSection = (o: fromModels.ArrestLawSubSection[]) => {
        let arr = new FormArray([]);
        o.map(x => {
            arr.push(this.fb.group({
                SubSectionID: x.SubSectionID,
                SubSectionNo: x.SubSectionNo,
                SubSectionType: x.SubSectionType,
                SubSectionDesc: x.SubSectionDesc,
                SectionNo: x.SectionNo
            }))
        })
        return arr;
    }
    // --- --- --- 1.1.2
    private setArrestLawSection = (o: fromModels.ArrestLawSection[]) => {
        let arr = new FormArray([]);
        o.map(x => {
            arr.push(this.fb.group({
                SectionNo: x.SectionNo,
                SectionName: x.SectionName,
                SectionDesc1: x.SectionDesc1,
                SectionDesc2: x.SectionDesc2,
                SectionDesc3: x.SectionDesc3,
                LawGroupID: x.LawGroupID,
                ArrestLawPenalty: this.setArrestLawPenalty(x.ArrestLawPenalty)
            }))
        })
        return arr;
    }
    // --- --- --- --- 1.1.2.1
    private setArrestLawPenalty = (o: fromModels.ArrestLawPenalty[]) => {
        let arr = new FormArray([]);
        o.map(x => {
            arr.push(this.fb.group({
                PenaltyID: x.PenaltyID,
                SectionNo: x.SectionNo,
                PenaltyDesc: x.PenaltyDesc,
                FineMin: x.FineMin,
                FineMax: x.FineMax,
                IsFinePrison: x.IsFinePrison,
                IsTaxPaid: x.IsTaxPaid
            }))
        })
        return arr;
    }

    // --- ArrestIndictmentDetail 2
    private setArrestIndicmentDetail = (o: fromModels.ArrestIndictmentDetail[]) => {
        let arr = new FormArray([]);
        o.map(x => {
            arr.push(this.fb.group({
                IndictmentDetailID: x.IndictmentDetailID,
                IndictmentID: x.IndictmentID,
                ArrestLawbreaker: this.setArrestLawbreaker(x.ArrestLawbreaker),
                ArrestProductDetail: this.setArrestProductDetail(x.ArrestProductDetail)
            }))
        })
        return arr;
    }

    // --- 2.1 
    private setArrestLawbreaker = (o: fromModels.ArrestLawbreaker[]) => {
        let arr = new FormArray([]);
        o.map(x => {
            arr.push(this.fb.group({
                LawbreakerTitleName: x.LawbreakerTitleName,
                LawbreakerFirstName: x.LawbreakerFirstName,
                LawbreakerMiddleName: x.LawbreakerMiddleName,
                LawbreakerLastName: x.LawbreakerLastName,
                LawbreakerOtherName: x.LawbreakerOtherName
            }))
        })
        return arr;
    }

    // --- 2.2
    private setArrestProductDetail = (o: fromModels.ArrestProductDetail[]) => {
        let arr = new FormArray([]);
        o.map(x => {
            arr.push(this.fb.group({
                ProductDesc: x.ProductDesc
            }))
        })
        return arr;
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
        } else if (lastDoc.IsModify == 'd') {
            item.RowId = 1;
            this.ArrestStaff.push(this.fb.group(item));
        }
    }

    addProduct() {
        const lastIndex = this.ArrestProduct.length - 1;
        let item = new ArrestProduct();
        item.ArrestCode = this.arrestCode;
        item.ProductID = '';
        item.IsModify = 'c';
        item.IsChecked = false;
        item.GroupCode = '1';
        item.IsDomestic = '1';
        if (lastIndex < 0) {
            item.RowId = 1;
            this.ArrestProduct.push(this.fb.group(item));
            return;
        }

        const lastDoc = this.ArrestProduct.at(lastIndex).value;
        if (lastDoc.ProductDesc) {
            item.RowId = lastDoc.RowId + 1;
            this.ArrestProduct.push(this.fb.group(item));
        } else if (lastDoc.IsModify == 'd') {
            item.RowId = 1;
            this.ArrestProduct.push(this.fb.group(item));
        }
    }

    addArrestLawbreaker(lawbreaker: fromModels.ArrestLawbreaker) {
        lawbreaker.RowId = 1;
        lawbreaker.IsModify = 'c';

        this.ArrestLawbreaker.push(this.fb.group(lawbreaker))
        let sort = this.sortFormArray(this.ArrestLawbreaker.value);
        sort.then(x => this.setItemFormArray(x, 'ArrestLawbreaker'))
            .catch((error) => this.catchError(error));
    }

    addAllegation() {
        
        // let arrest = this.arrestFG.value as fromModels.Arrest;
        // this.store.dispatch(new fromStore.CreateArrest(arrest));
        // this.router.navigate(
        //     [`arrest/allegation`, 'C'],
        //     {
        //         queryParams: {
        //             arrestMode: this.mode,
        //             arrestCode: this.arrestCode,
        //             indictmentId: '',
        //             guiltbaseId: ''
        //         }
        //     });
    }

    viewAllegation(indictmentId: number, guiltbaseId: number) {
        let arrest = this.arrestFG.value as fromModels.Arrest;
        this.store.dispatch(new fromStore.CreateArrest(arrest));
        this.router.navigate(
            [`arrest/allegation`, 'R'],
            {
                queryParams: {
                    arrestMode: this.mode,
                    arrestCode: this.arrestCode,
                    indictmentId: indictmentId,
                    guiltbaseId: guiltbaseId
                }
            });
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
        } else if (lastItem.IsModify == 'd') {
            item.RowId = 1;
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
        sort.then(x => this.setItemFormArray(x, controls))
            .catch((error) => this.catchError(error));;
    }

    deleteStaff(i: number) {
        this.deleteFormArray(this.ArrestStaff, i, 'ArrestStaff');
    }

    deleteProduct(i: number) {
        this.deleteFormArray(this.ArrestProduct, i, 'ArrestProduct');
    }

    deleteLawbreaker(i: number) {
        this.deleteFormArray(this.ArrestLawbreaker, i, 'ArrestLawbreaker');
    }

    deleteDocument(i: number) {
        this.deleteFormArray(this.ArrestDocument, i, 'ArrestDocument');
    }

    deleteNotice(i: number) {
        this.ArrestNotice.at(i).patchValue({ IsModify: 'd', RowId: 0 });
        let notice = this.sortFormArray(this.ArrestNotice.value);
        this.ArrestNotice.value.map(() => this.ArrestNotice.removeAt(0));
        notice.then(x => this.setNoticeForm(x))
            .catch((error) => this.catchError(error));
    }

    deleteIndicment(i: number) {
        this.ArrestIndictment.at(i).patchValue({ IsModify: 'd', RowId: 0 });
        let indictment = this.sortFormArray(this.ArrestIndictment.value);
        this.ArrestIndictment.value.map(() => this.ArrestIndictment.removeAt(0));
        // indictment.then((x) => this.setArrestIndictmentForm(x));
    }

    searchProduct = (text$: Observable<string>) =>
        text$.debounceTime(200).distinctUntilChanged()
            .map(term => term === '' ? []
                : this.typeheadProduct
                    .filter(v => v.ProductDesc.toLowerCase().indexOf(term.toLowerCase()) > -1)
                    .slice(0, 10));

    searchRegion = (text3$: Observable<string>) =>
        text3$.debounceTime(200).distinctUntilChanged()
            .map(term => term === '' ? []
                : this.typeheadRegion
                    .filter(v =>
                        (`${v.SubdistrictNameTH} ${v.DistrictNameTH} ${v.ProvinceNameTH}`)
                            .toLowerCase()
                            .indexOf(term.toLowerCase()) > -1
                    ).slice(0, 10));

    searchStaff = (text3$: Observable<string>) =>
        text3$.debounceTime(200).distinctUntilChanged()
            .map(term => term === '' ? []
                : this.typeheadStaff
                    .filter(v =>
                        (`${v.TitleName} ${v.FirstName} ${v.LastName}`)
                            .toLowerCase()
                            .indexOf(term.toLowerCase()) > -1
                    ).slice(0, 10));

    serachOffice = (text3$: Observable<string>) =>
        text3$.debounceTime(200).distinctUntilChanged()
            .map(term => term === '' ? []
                : this.typeheadOffice
                    .filter(v => (v.OfficeName && v.OfficeName.toLowerCase().indexOf(term.toLowerCase()) > -1))
                    .slice(0, 10)
            );

    searchUnit = (text$: Observable<string>) =>
        text$.debounceTime(200).distinctUntilChanged()
            .map(term => term == '' ? []
                : this.typeheadQtyUnit
                    .filter(v => v.DutyCode.toLowerCase().indexOf(term.toLowerCase()) > -1)
                    .slice(0, 10)
            );

    formatterRegion = (x: { SubdistrictNameTH: string, DistrictNameTH: string, ProvinceNameTH: string }) =>
        `${x.SubdistrictNameTH || ''} ${x.DistrictNameTH || ''} ${x.ProvinceNameTH || ''}`;

    formatterProduct = (x: { ProductDesc: string }) => x.ProductDesc;

    formatterStaff = (x: { TitleName: string, FirstName: string, LastName: string }) =>
        `${x.TitleName || ''} ${x.FirstName || ''} ${x.LastName || ''}`

    formatterOffice = (x: { OfficeName: string }) => x.OfficeName;

    formatterUnit = (DutyCode: string) => DutyCode;

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
            ProductType: e.item.ProductID ? '1' : '2',
            ProductID: product.ProductID || e.item.ProductID,
            IsModify: product.IsModify == 'r' ? 'u' : product.IsModify,
            RowId: product.RowId,
            ArrestCode: this.arrestCode,
            GroupCode: e.item.GroupCode || product.GroupCode,
            IsDomestic: e.item.IsDomestic || product.IsDomestic,
            // ProductFrom: product.IsModify == 'c' ? 'mas-product' : product.ProductFrom
        })
    }

    onChangeProductDesc(e, i) {
        this.ArrestProduct.at(i).patchValue({
            ProductDesc: e.target.value
        })
    }

    selectItemStaff(e, i) {
        let staff: fromModels.ArrestStaff = this.ArrestStaff.at(i).value;
        this.ArrestStaff.at(i).reset(e.item);
        this.ArrestStaff.at(i).patchValue({
            IsModify: staff.IsModify == 'r' ? 'u' : staff.IsModify,
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

    onChangeContributer(e: any, i: number) {
        let contributerId = e.target.value;
        let staff = this.ArrestStaff.at(i).value;
        this.ArrestStaff.at(i).patchValue({
            ContributorCode: contributerId,
            IsModify: staff.IsModify == 'r' ? 'u' : staff.IsModify
        })
    }

    selectItemOffice(e) {
        this.arrestFG.patchValue({
            ArrestStationCode: e.item.OfficeCode,
            ArrestStation: e.item.OfficeName
        })
    }

    onChangeArrestStation(e: any) {
        this.arrestFG.patchValue({
            ArrestStation: e.target.value
        })
    }

    selectItemQtyUnit(e: any, i: number) {
        this.ArrestProduct.at(i).patchValue({
            QtyUnit: e.item.DutyCode,
        })
    }

    selectItemNetVolumeUnit(e: any, i: number) {
        this.ArrestProduct.at(i).patchValue({
            NetVolumeUnit: e.item.DutyCode,
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

    catchError(error: any) {
        console.log(error);
        this.endLoader();
    }

    endLoader = () => this.loaderService.hide();

    isObject = (obj) => obj === Object(obj);

    saveFail() {
        swal('', Message.saveFail, 'error');
        this._isSuccess = false;
        return false;
    }

    checkResponse(res: any) {
        switch (res.IsSuccess) {
            case 'False':
            case false:
                return false;
            default:
                return true;
        }
    }

    checkIsSuccess(res: any) {
        switch (res.IsSuccess) {
            case 'True':
            case true:
                this._isSuccess = true;
                return true;
            default:
                this._isSuccess = false;
                return false;
        }
    }

    private async onSave() {
        this.loaderService.show();
        await this.upateArrest();
        await this.updateNotice();
        await this.updateStaff();
        await this.updateProduct();
        await this.updateDocument();

        if (this._isSuccess) {
            swal('', Message.saveComplete, 'success')
            this.onComplete()
        } else {
            swal('', Message.saveFail, 'warning')
        }
        this.loaderService.hide();
    }

    private async onCancel() {
        switch (this.mode) {
            case 'C':
                if (this.arrestCode != 'NEW') {
                    this.deleteArrest();
                } else {
                    this.router.navigate([`arrest/list`]);
                }
                break;

            case 'R':
                this.arrestFG.reset();
                this.pageLoad(this.arrestCode);
                break;
        }
    }

    private async onEdit() {
        this.loaderService.show();
        let isCheck: boolean;
        let indict = await this.ArrestIndictment.value
            .map(async (x: fromModels.ArrestIndictment) => {
                await this.s_lawsuit
                    .ArrestLawsuitgetByIndictmentID(x.IndictmentID.toString())
                    .then(y => isCheck = this.checkResponse(y))
                    .catch((error) => this.catchError(error));
            })

        Promise.all(indict).then(() => {
            if (isCheck) {
                swal('', Message.cannotModify, 'warning');
                this.enableBthModeR();
            } else {
                this.loadMasterData();
            }
        }).catch((error) => this.catchError(error));

        this.loaderService.hide();
    }

    private async onDelete() {
        this.loaderService.show()
        let isCheck: boolean;
        let indict = await this.ArrestIndictment.value
            .map(async (x: fromModels.ArrestIndictment) => {
                await this.s_lawsuit
                    .ArrestLawsuitgetByIndictmentID(x.IndictmentID.toString())
                    .then(y => isCheck = this.checkResponse(y))
                    .catch((error) => this.catchError(error));
            })

        Promise.all(indict).then(() => {
            this.loaderService.hide();
            if (isCheck) {
                swal('', Message.cannotDeleteRec, 'warning');
            } else {
                swal({
                    title: '',
                    text: Message.confirmAction,
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Confirm!'
                }).then((result) => {
                    if (result.value) {
                        this.deleteArrest();
                    }
                })
            }
        }).catch((error) => this.catchError(error));
    }

    private async onComplete() {
        this.router.navigate(['/arrest/manage', 'R', this.arrestCode]);
        // // set true
        // await this.navService.setEditField(true);
        // await this.navService.setEditButton(true);
        // await this.navService.setPrintButton(true);
        // await this.navService.setDeleteButton(true);
        // // set false
        // await this.navService.setSaveButton(false);
        // await this.navService.setCancelButton(false);
    }

    private async upateArrest() {
        let a: fromModels.Arrest = this.arrestFG.value;

        let newArrest = {
            ArrestCode: a.ArrestCode,
            ArrestDate: a.ArrestDate,
            ArrestTime: a.ArrestTime,
            OccurrenceDate: a.OccurrenceDate,
            OccurrenceTime: a.OccurrenceTime,
            ArrestStationCode: a.ArrestStationCode,
            ArrestStation: a.ArrestStation,
            HaveCulprit: a.HaveCulprit,
            Behaviour: a.Behaviour,
            Testimony: a.Testimony,
            Prompt: a.Prompt,
            IsMatchNotice: a.IsMatchNotice,
            ArrestDesc: a.ArrestDesc,
            NoticeCode: a.NoticeCode,
            InvestigationSurveyDocument: a.InvestigationSurveyDocument,
            InvestigationCode: a.InvestigationCode,
            IsActive: a.IsActive,
            ArrestLocale: a.ArrestLocale
                .map(x => {
                    x.ArrestCode = a.ArrestCode;
                    return x;
                })
        }

        await this.s_arrest.ArrestupdByCon(newArrest)
            .then(x => {
                if (!this.checkIsSuccess(x)) return;
            }, () => { this.saveFail(); return; })
            .catch((error) => this.catchError(error));
    }

    private async deleteArrest() {
        this.loaderService.show();
        await this.s_arrest.ArrestupdDelete(this.arrestCode)
            .then(x => {
                if (this.checkResponse(x)) {
                    swal('', Message.delComplete, 'success');
                    this.arrestFG.reset();
                    this.router.navigate([`arrest/list`]);
                } else {
                    swal('', Message.delFail, 'error');
                }
            }, () => { swal('', Message.delFail, 'error'); return; })
            .catch((error) => this.catchError(error));
        this.loaderService.hide();
    }

    private async updateNotice() {
        let noticePromise = await this.ArrestNotice.value
            .map(async x => {
                switch (x.IsModify) {
                    case 'd':
                        await this.s_notice.ArrestNoticeupdDelete(x.NoticeCode)
                            .then(x => {
                                if (!this.checkIsSuccess(x)) return;
                            }, () => { this.saveFail(); return; })
                            .catch((error) => this.catchError(error));
                        break;

                    case 'c':
                        await this.s_notice.ArrestNoticeupdByCon(x.ArrestCode, x.NoticeCode)
                            .then(x => {
                                if (!this.checkIsSuccess(x)) return;
                            }, () => { this.saveFail(); return; })
                            .catch((error) => this.catchError(error));
                        break;
                }
            })
        return Promise.all(noticePromise);
    }

    private async updateStaff() {
        let staffPromise = await this.ArrestStaff.value
            .map(async (x: fromModels.ArrestStaff) => {
                switch (x.IsModify) {
                    case 'd':
                        await this.s_staff.ArrestStaffupdDelete(x.StaffID)
                            .then(y => {
                                if (!this.checkIsSuccess(y)) return;
                            }, () => { this.saveFail(); return; })
                            .catch((error) => this.catchError(error));
                        break;
                    case 'c':
                        await this.s_staff.ArrestStaffinsAll(x)
                            .then(y => {
                                if (!this.checkIsSuccess(y)) return;
                            }, () => { this.saveFail(); return; })
                            .catch((error) => this.catchError(error));
                        break;
                    case 'u':
                        await this.s_staff.ArrestStaffupdByCon(x)
                            .then(y => {
                                if (!this.checkIsSuccess(y)) return;
                            }, () => { this.saveFail(); return; })
                            .catch((error) => this.catchError(error));
                        break;
                }
            })
        return Promise.all(staffPromise);
    }

    private async updateProduct() {
        let productPromise = await this.ArrestProduct.value
            .map(async (x: fromModels.ArrestProduct) => {
                x.ProductDesc = this.isObject(x.ProductDesc) ? x.ProductDesc['ProductDesc'] : x.ProductDesc;
                switch (x.IsModify) {
                    case 'd':
                        await this.s_product.ArrestProductupdDelete(x.ProductID)
                            .then(y => {
                                if (!this.checkIsSuccess(y)) return;
                            }, () => { this.saveFail(); return; })
                            .catch((error) => this.catchError(error));
                        break;
                    case 'c':
                        await this.s_product.ArrestProductinsAll(x)
                            .then(y => {
                                if (!this.checkIsSuccess(y)) return;
                            }, () => { this.saveFail(); return; })
                            .catch((error) => this.catchError(error));
                        break;
                    case 'u':
                        await this.s_product.ArrestProductupdByCon(x)
                            .then(y => {
                                if (!this.checkIsSuccess(y)) return;
                            }, () => { this.saveFail(); return; })
                            .catch((error) => this.catchError(error));
                        break;
                }
            })
        return Promise.all(productPromise);
    }

    private async updateDocument() {
        let docPromise = await this.ArrestDocument.value
            .map(async (x: fromModels.ArrestDocument) => {
                switch (x.IsModify) {
                    case 'd':
                        this.s_document.MasDocumentMainupdDelete(x.DocumentID)
                            .then(y => {
                                if (!this.checkIsSuccess(y)) return;
                            }, () => { this.saveFail(); return; })
                            .catch((error) => this.catchError(error));
                        break;
                    case 'c':
                        this.s_document.MasDocumentMaininsAll(x)
                            .then(y => {
                                if (!this.checkIsSuccess(y)) return;
                            }, () => { this.saveFail(); return; })
                            .catch((error) => this.catchError(error));
                        break;
                    case 'u':
                        this.s_document.MasDocumentMainupdByCon(x)
                            .then(y => {
                                if (!this.checkIsSuccess(y)) return;
                            }, () => { this.saveFail(); return; })
                            .catch((error) => this.catchError(error));
                        break;
                }
            })

        return Promise.all(docPromise);
    }
}
