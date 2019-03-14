import { Component, OnInit, OnDestroy, ViewChild, ElementRef, DoCheck, AfterViewInit } from '@angular/core';
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
import { MasStaffModel, RegionModel, MasProductModel, LawbreakerTypes, EntityTypes, ContributorType } from 'app/models';
import { MasDutyProductUnitModel } from 'app/models/mas-duty-product-unit.model';
import { MyDatePickerOptions, setDateMyDatepicker, setZero, getDateMyDatepicker, convertDateForSave, compareDate, toLocalShort } from 'app/config/dateFormat';
import { NavigationService } from 'app/shared/header-navigation/navigation.service';
import { SidebarService } from 'app/shared/sidebar/sidebar.component';
import { MainMasterService } from 'app/services/main-master.service';
import { Message } from 'app/config/message';
import { ArrestStaff } from '../../models/arrest-staff';
import { ArrestDocument } from '../../models/arrest-document';
import { replaceFakePath } from 'app/config/dataString';
import * as fromModels from '../../models';
import * as fromServices from '../../services';
import { LoaderService } from 'app/core/loader/loader.service';
import { MasDocumentMainService } from 'app/services/mas-document-main.service';
import { IMyDateModel } from 'mydatepicker-th';
import { ManageConfig } from './manage.config';
import swal from 'sweetalert2';
import { TransactionRunningService } from 'app/services/transaction-running.service';
import { TransactionRunning } from 'app/models/transaction-running.model';
import { groupArrayItem, removeObjectItem, clearFormArray, sortFormArray, sortingArray, IntialLastRowID } from '../../arrest.helper';
import { setViewLawbreaker } from '../lawbreaker-modal/lawbreaker-modal.component';
import { Acceptability, ArrestIndictmentDetail } from '../../models';

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit, AfterViewInit, OnDestroy, DoCheck {
    // C: ข้อมูลใหม่
    // R: อัพเดทข้อมูล

    // FormArray ตรวจสอบสถานะด้วย
    // c: รายการใหม่
    // v: รายการแสดง
    // u: รายการอัพเดท
    // d: รายการที่ถูกลบ

    // @ViewChild('ItemLocalRetion') inputLocalRetion: ElementRef;

    showStaff() {

        console.log(this.ArrestStaff);

    }
    toLocalShort = toLocalShort;
    getDateMyDatepicker = getDateMyDatepicker;
    myDatePickerOptions = MyDatePickerOptions;
    _isSuccess: boolean = false;
    mode: string;
    modal: any;
    arrestCode: string;
    showEditField: boolean;
    isRequired: boolean = false;
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
    ACCEPTABILITY = Acceptability;

    documentType = '3';
    runningTable = 'ops_arrest';
    runningOfficeCode = localStorage.getItem('officeCode');
    runningPrefix = 'TN';


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

    getArrestIndictmentProduct(form: any) {
        return form.controls.ArrestIndictmentProduct.controls;
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

    @ViewChild('printDocModalArrests') printDocModel: ElementRef;

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
        private s_arrest: fromServices.ArrestService,
        private s_product: fromServices.ArrestProductService,
        private s_indictment: fromServices.ArrestIndictmentService,
        private s_notice: fromServices.ArrestNoticeService,
        private s_staff: fromServices.ArrestStaffService,
        private s_lawsuit: fromServices.ArrestLawSuitService,
        private loaderService: LoaderService,
        private s_transactionRunning: TransactionRunningService,
        private s_productDetail: fromServices.ArrestProductDetailService,
        private s_indictmentDetail: fromServices.ArrestIndictmentDetailService,
        private s_lawbreaker: fromServices.ArrestLawbreakerService,
        private manageConfig: ManageConfig
    ) {
        // set false
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);
        this.navService.setPrevPageButton(false);

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
        localStorage.setItem('programcode', 'ILG60-03-00');
        this.sidebarService.setVersion(this.s_arrest.version);
        this.active_route();
        this.arrestFG = this.createForm();
        this.navigate_Service();

        // this.ArrestProduct.valueChanges.subscribe(() => {

        // })
    }

    ngAfterViewInit(): void {
        this.addStaff();
    }

    ngDoCheck(): void {
        this.checkChangeArrestIndictment();
    }

    showGuiltBase() {
        this.ArrestIndictment.value.map(indict => {
            console.log(indict);
        })
    }

    checkChangeArrestIndictment() {
        if (this.ArrestIndictment.length) {
            // เพิ่มสินค้าและผู้ต้องหาให้กับ ArrestIndictmentDetail
            // โดยที่ เพิ่มรายการสินค้าและผู้ต้องหา ให้กับทุกข้อกล่าวหา
            this.ArrestIndictment.value.map(async (_f1, i) => {
                let _IndictmentProduct = this.ArrestIndictment.at(i).get('ArrestIndictmentProduct') as FormArray;
                this.updateArrestIndictmentProduct(_IndictmentProduct);

                let _IndictmentDetail = this.ArrestIndictment.at(i).get('ArrestIndicmentDetail') as FormArray;
                this.updateArrestIndictmentDetail(_IndictmentDetail, _IndictmentProduct);
            });
        }
    }

    updateArrestIndictmentProduct(_IndictmentProduct: FormArray) {
        this.ArrestProduct.value.map((_f3) => {
            let nip = new fromModels.ArrestIndictmentProduct();
            const _indictPro_ = _IndictmentProduct.value
                .find($ => $.RowId == _f3.RowId) as fromModels.ArrestIndictmentProduct;

            nip.RowId = _f3.RowId;
            nip.ProductID = _f3.ProductID;
            nip.IsProdcutCo = _f3.IsProdcutCo || '1';
            nip.IndictmentProductQty = _f3.Qty || '0';
            nip.IndictmentProductQtyUnit = _f3.QtyUnit;
            nip.IndictmentProductSize = _f3.Size || '0';
            nip.IndictmentProductSizeUnit = _f3.SizeUnitName;
            nip.IndictmentProductVolume = _f3.NetVolume || '0';
            nip.IndictmentProductVolumeUnit = _f3.NetVolumeUnit;
            nip.IndictmentProductMistreatRate = _f3.MistreatRate || '';
            nip.IndictmentProductFine = _f3.Fine || '';
            nip.IndictmentProductIsActive = _f3.IndictmentProductIsActive || 1;
            nip.ProductDesc = _f3.ProductDesc;
            nip.IsModify = _f3.IsModify;

            const AIPIndex = _IndictmentProduct.value.findIndex(aip => aip.RowId == _f3.RowId);
            if (AIPIndex >= 0 && _indictPro_) {
                nip.IndictmentID = _indictPro_.IndictmentID;
                nip.IndictmentProductID = _indictPro_.IndictmentProductID;
                nip.IsChecked = _indictPro_.IsChecked;

                _IndictmentProduct.at(AIPIndex)
                    .patchValue(this.groupArrestIndictmentProduct(nip).value);

            } else {
                nip.IndictmentID = null;
                nip.IndictmentProductID = null;
                nip.IsChecked = this.mode == 'C' ? true : false;
                if (_IndictmentProduct.value && _IndictmentProduct.value[0].ProductID == null)
                    _IndictmentProduct.removeAt(0);

                _IndictmentProduct.push(this.groupArrestIndictmentProduct(nip));

            };

        })
    }

    updateArrestIndictmentDetail(AIDArr: FormArray, _IndictmentProduct: FormArray) {
        if (AIDArr.length == 0 || !this.ArrestLawbreaker.length) {
            const _AID = new fromModels.ArrestIndictmentDetail();
            _AID.ArrestProductDetail = this.updateProductDetail(_IndictmentProduct, AIDArr[0])
            if (AIDArr.length)
                AIDArr.removeAt(0);
            AIDArr.push(this.groupArrestIndictmentDetail(_AID))

        } else {
            // map และ loop ข้อมูลจาก ArrestLawbreaker ให้กับ ArrestIndictmentDetail
            this.ArrestLawbreaker.value.map((_f3) => {

                let AIDObj = AIDArr.value
                    .find($ => $.LawbreakerID == _f3.LawbreakerID) as fromModels.ArrestIndictmentDetail;

                if (!AIDObj) AIDObj = new fromModels.ArrestIndictmentDetail();

                let lawB = new fromModels.ArrestLawbreaker();
                let indictD = new fromModels.ArrestIndictmentDetail();

                lawB.LawbreakerID = _f3.LawbreakerID;
                lawB.LawbreakerTitleName = _f3.LawbreakerTitleName;
                lawB.LawbreakerFirstName = _f3.LawbreakerFirstName;
                lawB.LawbreakerMiddleName = _f3.LawbreakerMiddleName;
                lawB.LawbreakerLastName = _f3.LawbreakerLastName;
                lawB.LawbreakerOtherName = _f3.LawbreakerOtherName;
                lawB.IsModify = _f3.IsModify;

                indictD.IndictmentID = AIDObj.IndictmentID || null;
                indictD.IndictmentDetailID = AIDObj.IndictmentDetailID || null;
                indictD.LawbreakerID = _f3.LawbreakerID;
                indictD.IsModify = _f3.IsModify; // indictmentDetail คือ lawbreaker 
                indictD.ArrestLawbreaker = [lawB];

                indictD.ArrestProductDetail = this.updateProductDetail(_IndictmentProduct, AIDObj);

                const lawBIndex = AIDArr.value.findIndex($ => $.LawbreakerID == _f3.LawbreakerID);
                if (lawBIndex >= 0) {
                    indictD.ArrestLawbreaker[0].IsChecked = AIDObj.ArrestLawbreaker[0].IsChecked;
                    AIDArr.at(lawBIndex).patchValue(this.groupArrestIndictmentDetail(indictD).value);

                } else {
                    indictD.ArrestLawbreaker[0].IsChecked = this.mode == 'C'
                        ? this.ACCEPTABILITY.INACCEPTABLE
                        : this.ACCEPTABILITY.ACCEPTABLE
                    if (AIDArr.value && AIDArr.value[0].LawbreakerID == null)
                        AIDArr.removeAt(0);

                    AIDArr.push(this.groupArrestIndictmentDetail(indictD));
                }
            });
        }
    }

    updateProductDetail(_IndictmentProduct: FormArray, AIDObj: fromModels.ArrestIndictmentDetail) {
        // map และ loop ข้อมูลจาก ArrestIndictmentProduct
        return _IndictmentProduct.value.map((_f3, _i1) => {

            let prodD = new fromModels.ArrestProductDetail();
            prodD.ProductDetailID = null;
            prodD.IndictmentDetailID = null;
            prodD.IsActive = _f3.IsActive || 1;

            if (AIDObj && AIDObj.ArrestProductDetail) {
                const _productD_ = AIDObj.ArrestProductDetail
                    .find($ => $.RowId == _f3.RowId) as fromModels.ArrestProductDetail;

                if (_productD_) {
                    prodD.ProductDetailID = _productD_.ProductDetailID;
                    prodD.IsActive = _productD_.IsActive;
                }
                prodD.IndictmentDetailID = AIDObj.IndictmentDetailID;
            }
            prodD.IsChecked = _f3.IsChecked;
            prodD.RowId = _f3.RowId;
            prodD.Qty = _f3.IndictmentProductQty;
            prodD.QtyUnit = _f3.IndictmentProductQtyUnit;
            prodD.Size = _f3.IndictmentProductSize;
            prodD.SizeUnit = _f3.IndictmentProductSizeUnit;
            prodD.Volume = _f3.IndictmentProductVolume;
            prodD.VolumeUnit = _f3.IndictmentProductVolumeUnit;

            prodD.ProductID = _f3.ProductID || null;
            prodD.IsProdcutCo = _f3.IsProdcutCo || '0';
            prodD.MistreatRate = _f3.MistreatRate || null;
            prodD.Fine = _f3.Fine || null;
            prodD.ProductDesc = _f3.ProductDesc || null;
            prodD.IsModify = _f3.IsModify;
            return prodD;
        });
    }

    checkedIndictmentProduct(indictIndex: number, proDIndex: number) {
        let _IndictmentProduct = <FormArray>this.ArrestIndictment.at(indictIndex).get('ArrestIndictmentProduct');
        const indictProD = _IndictmentProduct.at(proDIndex).value;
        _IndictmentProduct.at(proDIndex).patchValue({
            IsChecked: !indictProD.IsChecked
        })
    }

    checkedIndictmentLawbreaker(indictIndex: number, indictDIdex: number) {
        let _indictD = <FormArray>this.ArrestIndictment.at(indictIndex).get('ArrestIndicmentDetail');
        let _IndictLawB = <FormArray>_indictD.at(indictDIdex).get('ArrestLawbreaker');
        const indictLawB = _IndictLawB.at(0).value;
        _IndictLawB.at(0).patchValue({
            IsChecked: !indictLawB.IsChecked
        })
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
        this.clearForm();
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
            ArrestStation: new FormControl(Validators.required),
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
            IsLawsuitComplete: new FormControl(null),
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
                if (this.arrestFG.invalid) {
                    this.isRequired = true;
                    if (this.arrestFG.get('ArrestLocale').invalid)
                        this.ILG60_03_02_00_00_E18.next(true);

                    swal('', Message.checkData, 'warning')
                    return false;
                }

                const _ArrestDate = getDateMyDatepicker(this.arrestFG.value.ArrestDate);
                const notice: fromModels.ArrestNotice[] = this.ArrestNotice.value
                    .filter(x => _ArrestDate.valueOf() < (new Date(x.NoticeDate)).valueOf());

                // ถ้ามีรายการ วันที่จับกุม < วันที่แจ้งความ ให้ออกจาก function
                if (notice.length) {
                    swal('', '“วันที่จับกุม” ต้องมากกว่าหรือเท่ากับ “วันที่แจ้งความ” ในส่วนใบแจ้งความนำจับ', 'warning')
                    return;
                }

                let staff: fromModels.ArrestStaff[] = this.ArrestStaff.value.filter(x => x.IsModify != 'd')
                if (staff.length < 1) {
                    swal('', 'ต้องมีรายการผู้จับกุมอย่างน้อย 1 รายการ', 'warning')
                    return;
                }
                if (staff.filter(x => x.ContributorID == '6').length !== 1) {
                    swal('', 'ต้องมีผู้จับกุมที่มีฐานะเป็น “ผู้กล่าวหา” 1 รายการ', 'warning');
                    return;
                }
                if (staff.filter(x => !x.ContributorID || !x.FullName).length > 0) {
                    swal('', 'กรุณาผู้จับกุมให้ครบถ้วน', 'warning');
                    return;
                }
                const lawbreaker: fromModels.ArrestLawbreaker[] = this.ArrestLawbreaker.value.filter(x => x.IsModify != 'd');
                const product: fromModels.ArrestProduct[] = this.ArrestProduct.value.filter(x => x.IsModify != 'd');
                if (product.filter(x => !x.ProductDesc || !x.Qty || !x.QtyUnit || !x.NetVolume || !x.NetVolumeUnit).length) {
                    swal('', 'กรุณาระบุข้อมูลของกลางให้ครบถ้วน', 'warning');
                    return;
                }

                if (lawbreaker.length <= 0 && product.length <= 0) {
                    this.ILG60_03_02_00_00_E21.next(true);
                    this.ILG60_03_03_00_00_E15.next(true);
                    swal('', 'ต้องมีรายการ “ผู้ต้องหา” หรือ “ของกลาง” อย่างน้อย 1 รายการ', 'warning');
                    return;
                }
                const arrestIndictment: fromModels.ArrestIndictment[] = this.ArrestIndictment.value.filter(x => x.IsModify != 'd');
                if (!arrestIndictment.length) {
                    this.ILG60_03_02_00_00_E25.next(true);
                    swal('', '“ฐานความผิดมาตรา” ในส่วนข้อกล่าวหาต้องมีอย่างน้อย 1 รายการ', 'warning')
                    return;
                }
                if (arrestIndictment.filter(x => x.GuiltBaseID == null).length) {
                    this.ILG60_03_02_00_00_E25.next(true);
                    swal('', 'กรุณาเลือกข้อมูล “ฐานความผิดมาตรา”', 'warning')
                    return;
                };
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
            if (status && localStorage.programcode == "ILG60-03-00") {
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

                await this.navService.setNextPageButton(false);

                const staff = this.typeheadStaff.find(x => x.StaffCode == localStorage.getItem('staffCode'));
                if (staff) {
                    const _staff = { item: staff };
                    await this.selectItemStaff(_staff, 0);
                    this.ArrestStaff.at(0).patchValue({
                        ContributorID: '6',
                        ContributorCode: '6'
                    })
                };

                const office = this.typeheadOffice.find(x => x.OfficeCode == this.runningOfficeCode);
                if (office) {
                    const _office = { item: office };
                    await this.selectItemOffice(_office);
                }

                this.showEditField = false;
                await this.pageRefresh(this.arrestCode);
                break;

            case 'R':
                this.enableBthModeR();
                this.expandCard();
                this.pageRefresh(arrestCode);
                // await this.navService.setNextPageButton(true);
                // await this.navService.setInnerTextNextPageButton('รับคำกล่าวโทษ');
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
        }

        if (arr.length) {
            let _arr = arr[0];
            this.pageRefreshArrest(_arr);

            await this.pageRefreshProduct(_arr.ArrestProduct, arrestCode);

            await this.pageRefreshIndictment(_arr.ArrestIndictment, _arr.ArrestProduct, _arr.ArrestLawbreaker, arrestCode);

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
            x.IsModify = x.IsModify || 'v';
            x.NoticeDateString = toLocalShort(x.NoticeDate);
            x.ArrestNoticeStaff.map(s => s.FullName = `${s.TitleName} ${s.FirstName} ${s.LastName}`);
            x.ArrestNoticeSuspect.map(s => s.FullName = `${s.SuspectTitleName} ${s.SuspectFirstName} ${s.SuspectLastName}`);
        })
        this.setNoticeForm(_arr.ArrestNotice);

        _arr.ArrestStaff.map((x, index) => {
            x.RowId = index + 1;
            x.IsModify = x.IsModify || 'v';
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

        // setTimeout(() => {
        //     this.inputLocalRetion.nativeElement.value = _arr.ArrestLocale[0].Region;
        // }, 100);
    }

    private async pageRefreshProduct(_arrProd: fromModels.ArrestProduct[], arrestCode: string) {
        let _prod = new Array<fromModels.ArrestProduct>();
        if (arrestCode != 'NEW') {
            await this.s_product.ArrestProductgetByArrestCode(arrestCode)
                .then((pro) => {
                    if (this.checkResponse(pro)) {
                        _prod = pro.map(x => {
                            x.IsModify = 'v';
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

    private async pageRefreshIndictment(
        _arrIndict: fromModels.ArrestIndictment[],
        _arrProduct: fromModels.ArrestProduct[],
        _arrLawbreaker: fromModels.ArrestLawbreaker[],
        arrestCode: string
    ) {
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

        let _ALawbreaker = [];
        _indict.map(ai => {
            ai.ArrestIndicmentDetail.map(x => {
                // ค้นหา ArrestLawbreaker จาก ArrestIndicmentDetail
                // เพื่อนำเอาข้อมูลมาใส่ให้กับส่วนผู้ต้องหา
                if (x.ArrestLawbreaker.length) {
                    x.ArrestLawbreaker[0].IsModify = 'v';
                    x.ArrestLawbreaker[0].IsChecked = this.ACCEPTABILITY.ACCEPTABLE;
                    _ALawbreaker.push(...x.ArrestLawbreaker);
                }
            });
        });
        // Group ArrestLawbreaker
        _ALawbreaker = groupArrayItem(_ALawbreaker, 'LawbreakerID');

        // map และ loop ตามจำนวนข้อกล่าวหา (ArrestIndictment)
        let _AIindictment = await _indict.map(async ai => {
            ai.IsModify = 'v';

            // map และ loop ตามจำนวน ผู้ต้องหา (ArrestLawbreaker)
            ai.ArrestIndicmentDetail = _ALawbreaker.map(lawB => {

                let arrIndictD = ai.ArrestIndicmentDetail.find(x1 => x1.LawbreakerID == lawB.LawbreakerID);

                // map และ loop ตามจำนวน ของกลาง (ArrestLawbreaker)
                let _arrIndictProductD = _arrProduct.map((x1, index) => {
                    let arrProd = new fromModels.ArrestProductDetail();
                    arrProd.RowId = index + 1;
                    arrProd.ProductID = parseInt(x1.ProductID) || null;
                    arrProd.IsProdcutCo = '0';
                    arrProd.Qty = parseInt(x1.Qty);
                    arrProd.QtyUnit = x1.QtyUnit;
                    arrProd.Size = x1.Size;
                    arrProd.ProductDesc = x1.ProductDesc;
                    arrProd.IsActive = x1.IsActive;
                    arrProd.IsChecked = false;
                    arrProd.IsModify = 'v';
                    return arrProd;
                });

                if (!arrIndictD) {
                    arrIndictD = new ArrestIndictmentDetail();
                    arrIndictD.IndictmentID = ai.IndictmentID;
                    arrIndictD.IsActive = 1;
                    arrIndictD.LawbreakerID = lawB.LawbreakerID;
                    arrIndictD.LawsuitEnd = 0;
                    arrIndictD.LawsuitType = '0';
                    arrIndictD.IndictmentDetailID = null;

                } else {
                    arrIndictD.ArrestProductDetail.filter((x1: fromModels.ArrestProductDetail) => {
                        let _arrIndictProductD_ = _arrIndictProductD.find(p => p.ProductID == x1.ProductID);
                        if (!_arrIndictProductD_) return;
                        _arrIndictProductD_.IndictmentDetailID = arrIndictD.IndictmentDetailID;
                        _arrIndictProductD_.ProductDetailID = x1.ProductDetailID;
                        _arrIndictProductD_.SizeUnit = x1.SizeUnit;
                        _arrIndictProductD_.Volume = x1.Volume;
                        _arrIndictProductD_.VolumeUnit = x1.VolumeUnit;
                        _arrIndictProductD_.MistreatRate = x1.MistreatRate;
                        _arrIndictProductD_.Fine = x1.Fine;
                        _arrIndictProductD_.IsModify = 'v';
                    });
                }

                let _lawB = new fromModels.ArrestLawbreaker();
                _lawB.IsChecked = arrIndictD.IndictmentDetailID ? this.ACCEPTABILITY.INACCEPTABLE : this.ACCEPTABILITY.ACCEPTABLE;
                _lawB.LawbreakerID = lawB.LawbreakerID;
                _lawB.LawbreakerTitleName = lawB.LawbreakerTitleName || null;
                _lawB.LawbreakerFirstName = lawB.LawbreakerFirstName || null;
                _lawB.LawbreakerMiddleName = lawB.LawbreakerMiddleName || null;
                _lawB.LawbreakerLastName = lawB.LawbreakerLastName || null;
                _lawB.LawbreakerOtherName = lawB.LawbreakerOtherName || null;
                _lawB.IsModify = lawB.IsModify || 'v';

                arrIndictD.ArrestLawbreaker = [_lawB];

                arrIndictD.ArrestProductDetail = _arrIndictProductD;
                return arrIndictD;
            });

            await this.s_indictment
                .ArrestIndictmentProductgetByIndictmentID(ai.IndictmentID.toString())
                .then(x => {
                    if (this.checkResponse(x)) {

                        let __arrProduct = _arrProduct.map((x1, index) => {
                            let aip = new fromModels.ArrestIndictmentProduct();
                            aip.RowId = index + 1;
                            aip.ProductID = parseInt(x1.ProductID);
                            aip.IsProdcutCo = '1';
                            aip.IndictmentID = ai.IndictmentID;
                            aip.IndictmentProductID = null;
                            aip.IndictmentProductQty = parseInt(x1.Qty) || 0;
                            aip.IndictmentProductQtyUnit = x1.QtyUnit;
                            aip.IndictmentProductSize = x1.Size || '0';
                            aip.IndictmentProductSizeUnit = x1.SizeUnitName;
                            aip.IndictmentProductVolume = x1.NetVolume || '0';
                            aip.IndictmentProductVolumeUnit = x1.NetVolumeUnit;
                            aip.IndictmentProductMistreatRate = '';
                            aip.IndictmentProductFine = '';
                            aip.IndictmentProductIsActive = 1;
                            aip.ProductDesc = x1.ProductDesc;
                            aip.IsChecked = false;
                            aip.IsModify = 'v';
                            return aip;
                        })

                        x.filter((x1: fromModels.ArrestIndictmentProduct) => {
                            let _arrProduct_ = __arrProduct.find(p => p.ProductID == x1.ProductID);
                            if (!_arrProduct_) return;
                            _arrProduct_.IndictmentProductID = x1.IndictmentProductID;
                            _arrProduct_.IsProdcutCo = x1.IsProdcutCo;
                            _arrProduct_.IndictmentProductMistreatRate = x1.IndictmentProductMistreatRate;
                            _arrProduct_.IndictmentProductFine = x1.IndictmentProductFine;
                            _arrProduct_.IndictmentProductIsActive = x1.IndictmentProductIsActive;
                            _arrProduct_.IsChecked = true;
                        })

                        ai.ArrestIndictmentProduct = __arrProduct;
                    }
                });

            return ai;
        });

        Promise.all(_AIindictment).then(indictment => {
            this.pageRefeshLawbreaker(_ALawbreaker);
            this.setArrestIndictment(indictment, null);
        })

    }

    pageRefeshLawbreaker(_ALawbreaker: fromModels.ArrestLawbreaker[]) {
        _ALawbreaker.map(al => {
            al = setViewLawbreaker(al);
            this.addArrestLawbreaker(al)
        });
    }

    private async pageRefreshDocument(_arrDoc: fromModels.ArrestDocument[], arrestCode) {
        let _doc = new Array<fromModels.ArrestDocument>();
        if (arrestCode != 'NEW') {
            await this.s_document.MasDocumentMaingetAll(this.documentType, arrestCode)
                .then((x) => {
                    if (this.checkResponse(x)) {
                        _doc = x.map(y => {
                            y.IsModify = 'v';
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
                this.loaderService.hide();
            }).catch((error) => {
                this.catchError(error);
                this.loaderService.hide();
            });

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
    private setArrestIndictment(o: fromModels.ArrestIndictment[], indictmentIndex: number) {
        let arr = this.ArrestIndictment.length ? this.ArrestIndictment : new FormArray([]);

        if (indictmentIndex != null && this.ArrestIndictment.length) {
            let o_ArrestIndictment = o.find(x => x.RowId == arr.at(indictmentIndex).value.RowId);

            arr.at(indictmentIndex).patchValue({
                GuiltBaseID: o_ArrestIndictment.GuiltBaseID,
                IsProve: o_ArrestIndictment.ArrestLawGuitbase[0].IsProve,
                ArrestLawGuitbase: this.setArrestLawGuitbase(o_ArrestIndictment.ArrestLawGuitbase).value
            })
        }

        let i = 0;
        let modify = this.ArrestIndictment.value.filter(x => x.IsModify != 'd');
        i = (modify.length) && modify[modify.length - 1].RowId;

        o.map(x => {
            if (x.RowId) return;
            arr.push(
                this.fb.group({
                    IsModify: x.IsModify || 'c',
                    RowId: x.IsModify != 'd' && ++i,
                    ArrestCode: x.ArrestCode || this.arrestCode,
                    IndictmentID: x.IndictmentID,
                    GuiltBaseID: x.GuiltBaseID,
                    IsProve: x.IsProve,
                    IsActive: 1,
                    IsLawsuitComplete: x.IsLawsuitComplete,
                    ArrestLawGuitbase: this.setArrestLawGuitbase(x.ArrestLawGuitbase),
                    ArrestIndicmentDetail: this.setArrestIndicmentDetail(x.ArrestIndicmentDetail),
                    ArrestIndictmentProduct: this.setArrestIndictmentProduct(x.ArrestIndictmentProduct)
                })
            )
        });

        this.arrestFG.setControl('ArrestIndictment', arr);
    }
    // --- ArrestGuildBase 1
    private setArrestLawGuitbase = (o: fromModels.ArrestLawGuitbase[]) => {
        let arr = new FormArray([]);
        if (!Array.isArray(o)) {
            arr.push(this.groupArrestLawGuitbase(new fromModels.ArrestLawGuitbase()));
        } else if (Array.isArray(o) && o.length) {
            o.map(x => arr.push(this.groupArrestLawGuitbase(x)))
        }
        return arr;
    }
    private groupArrestLawGuitbase(x: fromModels.ArrestLawGuitbase) {
        return this.fb.group({
            IsChecked: false,
            GuiltBaseID: x.GuiltBaseID,
            GuiltBaseName: x.GuiltBaseName,
            IsCompare: x.IsCompare || 0,
            IsActive: x.IsActive || 1,
            IsProve: x.IsProve,
            SubSectionRuleID: x.SubSectionRuleID,
            ArrestLawSubSectionRule: this.setArrestLawSubSectionRule(x.ArrestLawSubSectionRule)
        })
    }
    // --- --- 1.1
    private setArrestLawSubSectionRule = (o: fromModels.ArrestLawSubSectionRule[]) => {
        let arr = new FormArray([]);
        if (!Array.isArray(o)) {
            arr.push(this.groupArrestLawSubSectionRule(new fromModels.ArrestLawSubSectionRule()));
            return arr;
        } else if (Array.isArray(o) && o.length) {
            o.map(x => arr.push(this.groupArrestLawSubSectionRule(x)))
        }
        return arr;
    }
    private groupArrestLawSubSectionRule = (x: fromModels.ArrestLawSubSectionRule) => {
        return this.fb.group({
            SubSectionRuleID: x.SubSectionRuleID || null,
            SubSectionID: x.SubSectionID || null,
            SectionNo: x.SectionNo || null,
            IsActive: x.IsActive || 1,
            ArrestLawSubSection: this.setArrestLawSubSection(x.ArrestLawSubSection),
            ArrestLawSection: this.setArrestLawSection(x.ArrestLawSection)
        })
    }
    // --- --- --- 1.1.1
    private setArrestLawSubSection = (o: fromModels.ArrestLawSubSection[]) => {
        let arr = new FormArray([]);
        if (!Array.isArray(o)) {
            arr.push(this.groupArrestLawSubSection(new fromModels.ArrestLawSubSection()))
        } else if (Array.isArray(o) && o.length) {
            o.map(x => arr.push(this.groupArrestLawSubSection(x)));
        }
        return arr;
    }
    private groupArrestLawSubSection = (x: fromModels.ArrestLawSubSection) => {
        return this.fb.group({
            SubSectionID: x.SubSectionID || null,
            SubSectionNo: x.SubSectionNo || null,
            SubSectionType: x.SubSectionType || null,
            SubSectionDesc: x.SubSectionDesc || null,
            SectionNo: x.SectionNo || null
        });
    }
    // --- --- --- 1.1.2
    private setArrestLawSection = (o: fromModels.ArrestLawSection[]) => {
        let arr = new FormArray([]);
        if (!Array.isArray(o)) {
            arr.push(this.groupArrestLawSection(new fromModels.ArrestLawSection()))
        } else if (Array.isArray(o) && o.length) {
            o.map(x => arr.push(this.groupArrestLawSection(x)))
        }
        return arr;
    }
    private groupArrestLawSection(x: fromModels.ArrestLawSection) {
        return this.fb.group({
            SectionNo: x.SectionNo || null,
            SectionName: x.SectionName || null,
            SectionDesc1: x.SectionDesc1 || null,
            SectionDesc2: x.SectionDesc2 || null,
            SectionDesc3: x.SectionDesc3 || null,
            LawGroupID: x.LawGroupID || null,
            ArrestLawPenalty: this.setArrestLawPenalty(x.ArrestLawPenalty)
        });
    }
    // --- --- --- --- 1.1.2.1
    private setArrestLawPenalty = (o: fromModels.ArrestLawPenalty[]) => {
        let arr = new FormArray([]);
        if (!Array.isArray(o)) {
            arr.push(this.groupArrestLawPenalty(new fromModels.ArrestLawPenalty()))
        } else if (Array.isArray(o) && o.length) {
            o.map(x => arr.push(this.groupArrestLawPenalty(x)))
        }
        return arr;
    }
    private groupArrestLawPenalty(x: fromModels.ArrestLawPenalty) {
        return this.fb.group({
            PenaltyID: x.PenaltyID || null,
            SectionNo: x.SectionNo || null,
            PenaltyDesc: x.PenaltyDesc || null,
            FineMin: x.FineMin || null,
            FineMax: x.FineMax || null,
            IsFinePrison: x.IsFinePrison || null,
            IsTaxPaid: x.IsTaxPaid || null
        });
    }
    // --- ArrestIndictmentDetail 2
    private setArrestIndicmentDetail = (o: fromModels.ArrestIndictmentDetail[]) => {
        let arr = new FormArray([]);
        if (!Array.isArray(o)) {
            arr.push(this.groupArrestIndictmentDetail(new fromModels.ArrestIndictmentDetail()));
        } else if (Array.isArray(o) && o.length) {
            o.map(x => {
                arr.push(this.groupArrestIndictmentDetail(x))
            })
        }
        return arr;
    }
    private groupArrestIndictmentDetail(x: fromModels.ArrestIndictmentDetail) {

        return this.fb.group({
            IndictmentDetailID: x.IndictmentDetailID,
            IndictmentID: x.IndictmentID || null,
            LawbreakerID: x.LawbreakerID || null,
            IsActive: 1,
            ArrestLawbreaker: this.setArrestLawbreaker(x.ArrestLawbreaker),
            ArrestProductDetail: this.setArrestProductDetail(x.ArrestProductDetail),
            IsModify: x.IsModify || 'c'
        });
    }
    // --- 2.1 
    private setArrestLawbreaker = (o: fromModels.ArrestLawbreaker[]) => {
        let arr = new FormArray([]);
        if (!this.ArrestLawbreaker.length || !Array.isArray(o)) {
            let lawb = new fromModels.ArrestLawbreaker();
            lawb.IsChecked = this.mode == 'C' ? this.ACCEPTABILITY.INACCEPTABLE : this.ACCEPTABILITY.ACCEPTABLE;
            arr.push(this.groupArrestLawbreaker(lawb));
        } else if (Array.isArray(o) && o.length) {
            o.map(x => {
                arr.push(this.groupArrestLawbreaker(x))
            });
        }
        return arr;
    }
    private groupArrestLawbreaker(x: fromModels.ArrestLawbreaker) {
        return this.fb.group({
            IsChecked: x.IsChecked,
            LawbreakerID: x.LawbreakerID || null,
            LawbreakerTitleName: x.LawbreakerTitleName || null,
            LawbreakerFirstName: x.LawbreakerFirstName || null,
            LawbreakerMiddleName: x.LawbreakerMiddleName || null,
            LawbreakerLastName: x.LawbreakerLastName || null,
            LawbreakerOtherName: x.LawbreakerOtherName || null,
            IsModify: x.IsModify || 'c'
        });
    }
    // --- 2.2
    private setArrestProductDetail = (o: fromModels.ArrestProductDetail[]) => {
        let arr = new FormArray([]);
        if (!this.ArrestProduct.length || !Array.isArray(o)) {
            arr.push(this.groupArrestProductDetail(new fromModels.ArrestProductDetail()))
        } else if (Array.isArray(o) && o.length) {
            o.map(x => {
                // if (x.ProductDetailID) {
                //     x.IsChecked = true;
                // }
                arr.push(this.groupArrestProductDetail(x))
            })
        }
        return arr;
    }
    private groupArrestProductDetail(x: fromModels.ArrestProductDetail) {
        return this.fb.group({
            ProductID: x.ProductID || null,
            ProductDetailID: x.ProductDetailID || null,
            IsProdcutCo: x.IsProdcutCo || '0',
            Qty: x.Qty || 0,
            QtyUnit: x.QtyUnit,
            Size: x.Size || 0,
            SizeUnit: x.SizeUnit,
            Volume: x.Volume || 0,
            VolumeUnit: x.VolumeUnit,
            MistreatRate: x.MistreatRate || null,
            Fine: x.Fine || null,
            IndictmentDetailID: x.IndictmentDetailID || null,
            ProductDesc: x.ProductDesc || null,
            IsActive: x.IsActive || 1,
            IsChecked: x.IsChecked,
            IsModify: x.IsModify || 'c',
            RowId: x.RowId
        })
    }
    // --- ArrestIndictmentProduct
    private setArrestIndictmentProduct = (o: fromModels.ArrestIndictmentProduct[]) => {
        let arr = new FormArray([]);
        if (!Array.isArray(o)) {
            let indictProD = new fromModels.ArrestIndictmentProduct();
            indictProD.IsChecked = true;
            arr.push(this.groupArrestIndictmentProduct(indictProD));
        }
        else if (Array.isArray(o) && o.length) {
            o.map(x => arr.push(this.groupArrestIndictmentProduct(x)));
        }
        return arr;
    }
    private groupArrestIndictmentProduct = (x: fromModels.ArrestIndictmentProduct) => {
        return this.fb.group({
            IndictmentProductID: x.IndictmentProductID,
            IndictmentID: x.IndictmentID,
            ProductID: x.ProductID,
            IsProdcutCo: x.IsProdcutCo || '1',
            IndictmentProductQty: x.IndictmentProductQty,
            IndictmentProductQtyUnit: x.IndictmentProductQtyUnit,
            IndictmentProductSize: x.IndictmentProductSize,
            IndictmentProductSizeUnit: x.IndictmentProductSizeUnit,
            IndictmentProductVolume: x.IndictmentProductVolume,
            IndictmentProductVolumeUnit: x.IndictmentProductVolumeUnit,
            IndictmentProductMistreatRate: x.IndictmentProductMistreatRate,
            IndictmentProductFine: x.IndictmentProductFine,
            IndictmentProductIsActive: x.IndictmentProductIsActive,
            ProductDesc: x.ProductDesc,
            IsChecked: x.IsChecked,
            IsModify: x.IsModify,
            RowId: x.RowId
        })
    }

    openModal(e) {
        this.modal = this.modelService.open(e, { size: 'lg', centered: true });
    }

    addStaff() {
        const lastIndex = this.ArrestStaff.value.filter(x => x.IsModify != 'd').length - 1;
        let item = new ArrestStaff();
        item.ArrestCode = this.arrestCode;
        item.IsModify = 'c'
        
        item.ContributorID = lastIndex >= 0 ? '7' : '6';
        item.ContributorCode = lastIndex >= 0 ? '7' : '6';

        if (lastIndex >= 0) {
            const lastDoc = this.ArrestStaff.at(lastIndex).value;
            if (lastDoc.ContributorID) {
                item.RowId = lastDoc.RowId + 1;
                this.ArrestStaff.push(this.fb.group(item));
            }
        } else {
            item.RowId = 1; 
            this.ArrestStaff.push(this.fb.group(item));
        }
        this.sortFormArray(this.ArrestStaff);
    }

    addProduct() {
        const lastIndex = this.ArrestProduct.value.filter(x => x.IsModify != 'd').length - 1;
        let item = new fromModels.ArrestProduct();
        item.ArrestCode = this.arrestCode;
        item.ProductID = '';
        item.IsModify = 'c';
        // item.IsChecked = this.mode == 'C' ? true : false;
        item.GroupCode = '1';
        item.IsDomestic = '1';

        if (lastIndex >= 0) {
            const lastDoc = this.ArrestProduct.at(lastIndex).value;
            if (lastDoc.ProductDesc) {
                item.RowId = lastDoc.RowId;
                this.ArrestProduct.push(this.fb.group(item));
            }
        } else {
            item.RowId = 1;
            this.ArrestProduct.push(this.fb.group(item));
        }
        this.sortFormArray(this.ArrestProduct);
    }

    addArrestLawbreaker(lawbreaker: fromModels.ArrestLawbreaker) {
        lawbreaker.RowId = 1;
        lawbreaker.IsModify = lawbreaker.IsModify || 'c';
        lawbreaker.IsActive = 1;
        // lawbreaker.IsChecked = Acceptability.INACCEPTABLE;
        lawbreaker = removeObjectItem(lawbreaker, 'ResultCount') as fromModels.ArrestLawbreaker;
        this.ArrestLawbreaker.push(this.fb.group(lawbreaker))
        this.sortFormArray(this.ArrestLawbreaker);
    }

    addIndictment() {
        const lastIndex = this.ArrestIndictment.value.filter(x => x.IsModify != 'd').length - 1;
        let item = new fromModels.ArrestIndictment();
        item.ArrestCode = this.arrestCode;
        item.IsModify = 'c';
        item.RowId = null;

        if (lastIndex >= 0) {
            const lastDoc = this.ArrestIndictment.at(lastIndex).value;
            if (lastDoc.GuiltBaseID || lastDoc.IsModify == 'd') {
                this.setArrestIndictment([item], null);
            }
        } else {
            this.setArrestIndictment([item], null);
        }
        this.sortFormArray(this.ArrestIndictment);
    }

    addDocument() {
        const lastIndex = this.ArrestDocument.value.filter(x => x.IsModify != 'd').length - 1;
        let item = new ArrestDocument();
        item.DocumentType = '3';
        item.ReferenceCode = this.arrestCode;
        item.IsModify = 'c';

        if (lastIndex >= 0) {
            const lastItem = this.ArrestDocument.at(lastIndex).value;
            if (lastItem.DataSource && lastItem.FilePath) {
                item.RowId = lastItem.RowId + 1;
                this.ArrestDocument.push(this.fb.group(item));
            }
        } else {
            item.RowId = 1;
            this.ArrestDocument.push(this.fb.group(item));
        }
        this.sortFormArray(this.ArrestDocument);
    }

    private sortFormArray(o: FormArray) {
        let sort = sortingArray(o.value, 'RowId');
        sort.forEach(($, i1) => o.at(i1).patchValue($));
    }

    private deleteFormArray(o: FormArray, i: number) {
        const arr = o.value.filter($ => $.IsModify == 'd');
        const RowId = arr.length
            ? arr.reduce((max, p) => p.RowId > max ? p.RowId : max, arr[0].RowId) + 1
            : IntialLastRowID;
        o.at(i).patchValue({ IsModify: 'd', RowId: RowId });
        sortingArray(o.value, 'RowId').forEach(($, i1) => o.at(i1).patchValue($));
    }

    deleteStaff(i: number) {
        this.deleteFormArray(this.ArrestStaff, i);
    }

    deleteProduct(i: number) {
        const ArrestProductDelete = this.ArrestProduct.value.filter($ => $.IsModify == 'd');
        const RowId = ArrestProductDelete.length
            ? ArrestProductDelete
                .reduce((max, p) => p.RowId > max ? p.RowId : max, ArrestProductDelete[0].RowId) + 1
            : IntialLastRowID;

        this.ArrestProduct.at(i).patchValue({ IsModify: 'd', RowId: RowId });
        // อัพเดทสถานะข้อมูลของกลางที่เกี่ยวห้อง
        this.checkChangeIndictmentProduct(i, RowId);
        sortingArray(this.ArrestProduct.value, 'RowId')
            .forEach(($, i1) => this.ArrestProduct.at(i1).patchValue($));
    }

    checkChangeIndictmentProduct(APIndex: number, RowId: number) {
        if (this.ArrestIndictment.length) {
            this.ArrestIndictment.value.map(async (_f1, i) => {

                let _IndictmentProduct = this.ArrestIndictment.at(i).get('ArrestIndictmentProduct') as FormArray;
                this.deleteArrestIndictmentProduct(APIndex, RowId, _IndictmentProduct);

                let _IndictmentDetail = this.ArrestIndictment.at(i).get('ArrestIndicmentDetail') as FormArray;
                this.deleteArrestProductDetail(APIndex, RowId, _IndictmentDetail);

            });
        }
    }

    deleteArrestIndictmentProduct(APIndex: number, RowId: number, _IndictmentProduct: FormArray) {
        let nip = _IndictmentProduct.value as fromModels.ArrestIndictmentProduct[];
        if (!nip[APIndex]) return;
        nip[APIndex].RowId = RowId;
        nip[APIndex].IsModify = 'd';
        nip[APIndex].IsChecked = false;
        sortingArray(nip, 'RowId')
            .forEach(($, i1) => _IndictmentProduct.at(i1).patchValue($));
    }

    deleteArrestProductDetail(APIndex: number, RowId: number, _IndictmentDetail: FormArray) {
        if (_IndictmentDetail.length) {
            _IndictmentDetail.value.forEach((_, i1: number) => {
                // ค้นหา ArrestProductDetail
                let _ProductDetail = _IndictmentDetail.at(i1).get('ArrestProductDetail') as FormArray;
                if (_ProductDetail.length) {
                    // อัพเดท ArrestProductDetail ตามที่ได้รับ index มา
                    let apd = _ProductDetail.value as fromModels.ArrestProductDetail[];
                    if (!apd[APIndex]) return;
                    apd[APIndex].RowId = RowId;
                    apd[APIndex].IsModify = 'd';
                    apd[APIndex].IsChecked = false;
                    sortingArray(apd, 'RowId')
                        .forEach(($, i2) => _ProductDetail.at(i2).patchValue($));
                }
            });
        }
    }

    selectItemProductItem(e, i) {
        const product = this.ArrestProduct.at(i).value;
        this.ArrestProduct.at(i).reset(e.item);
        this.ArrestProduct.at(i).patchValue({
            ProductType: e.item.ProductID ? '1' : '2',
            ProductID: product.ProductID || e.item.ProductID,
            IsModify: product.IsModify == 'v' ? 'u' : product.IsModify,
            RowId: product.RowId,
            ArrestCode: this.arrestCode,
            GroupCode: e.item.GroupCode || product.GroupCode,
            IsDomestic: e.item.IsDomestic || product.IsDomestic,
            Size: e.item.Size || product.Size,
            SizeUnitName: e.item.SizeUnitName || product.SizeUnitName,
            Qty: product.Qty || '',
            QtyUnit: product.QtyUnit || '',
            NetVolume: product.NetVolume || '',
            NetVolumeUnit: product.NetVolumeUnit || ''
        })
    }

    deleteLawbreaker(i: number) {
        this.deleteFormArray(this.ArrestLawbreaker, i);
    }

    deleteDocument(i: number) {
        this.deleteFormArray(this.ArrestDocument, i);
    }

    deleteNotice(i: number) {
        this.deleteFormArray(this.ArrestNotice, i);
        // this.ArrestNotice.at(i).patchValue({ IsModify: 'd', RowId: 0 });
        // let notice = sortFormArray(this.ArrestNotice.value, 'RowId');
        // this.ArrestNotice.value.map(() => this.ArrestNotice.removeAt(0));
        // notice.then(x => this.setNoticeForm(x))
        //     .catch((error) => this.catchError(error));
    }

    async deleteIndicment(i: number) {
        this.deleteFormArray(this.ArrestIndictment, i);
        // this.ArrestIndictment.at(i).patchValue({ IsModify: 'd', RowId: 0 });
        // const indictment = sortFormArray(this.ArrestIndictment.value, 'RowId');
        // this.ArrestIndictment.value.map(() => this.ArrestIndictment.removeAt(0));
        // indictment.then((_x) => {
        //     _x.filter(x => x.IsModify != 'd')
        //         .map((x) => {
        //             x.RowId = null;
        //             return x;
        //         });
        //     this.setArrestIndictment(_x, null);
        // })
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

    formatterUnit = (x: { DutyCode: string }) => x.DutyCode;

    selectItemLocaleRegion(e) {
        this.ArrestLocale.at(0).patchValue({
            SubDistrictCode: e.item.SubdistrictCode,
            SubDistrict: e.item.SubdistrictNameTH,
            DistrictCode: e.item.DistrictCode,
            District: e.item.DistrictNameTH,
            ProvinceCode: e.item.ProvinceCode,
            Province: e.item.ProvinceNameTH,
            Region: `${e.item.SubdistrictNameTH} ${e.item.DistrictNameTH} ${e.item.ProvinceNameTH}`
        })
    }

    selectItemStaff(e: any, i: number) {
        let staff: fromModels.ArrestStaff = this.ArrestStaff.at(i).value;
        this.ArrestStaff.at(i).reset(e.item);
        this.ArrestStaff.at(i).patchValue({
            IsModify: staff.IsModify == 'v' ? 'u' : staff.IsModify,
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
            ContributorID: e.item.ContributorID || staff.ContributorID,
            ContributorCode: e.item.ContributorID || staff.ContributorID
        })
    }

    onChangeStaff(e: any, i: number) {
        let staff: fromModels.ArrestStaff = this.ArrestStaff.at(i).value;
        if (staff.FullName == e.target.value) return;
        this.ArrestStaff.at(i).reset();
        this.ArrestStaff.at(i).patchValue({
            IsModify: staff.IsModify == 'v' ? 'u' : staff.IsModify,
            RowId: staff.RowId,
            FullName: e.target.value,
            FirstName: e.target.value,
            ProgramCode: 'ILG60-03-02-00-00',
            ProcessCode: '02',
            ContributorID: staff.ContributorID,
            ContributorCode: staff.ContributorID
        })
    }

    onChangeContributer(e: any, i: number) {
        let contributerId = e.target.value;
        let staff = this.ArrestStaff.at(i).value;
        this.ArrestStaff.at(i).patchValue({
            ContributorCode: contributerId
        })
    }

    selectItemOffice(e) {
        this.arrestFG.patchValue({
            ArrestStationCode: e.item.OfficeCode,
            ArrestStation: e.item.OfficeName
        })
    }

    selectItemQtyUnit(e: any, i: number) {
        // e.preventDefault();
        this.ArrestProduct.at(i).patchValue({
            QtyUnit: e.item.DutyCode,
        })
    }

    changeItemQtyUnit(e: any, i: number) {
        const volume = this.typeheadQtyUnit.find(x => x.DutyCode == e.target.value);
        this.ArrestProduct.at(i).patchValue({
            QtyUnit: volume ? volume.DutyCode : ''
        })
    }

    selectItemNetVolumeUnit(e: any, i: number) {
        this.ArrestProduct.at(i).patchValue({
            NetVolumeUnit: e.item.DutyCode
        })
    }

    changeItemNetVolumeUnit(e: any, i: number) {
        const volume = this.typeheadNetVolumeUnit.find(x => x.DutyCode == e.target.value);
        this.ArrestProduct.at(i).patchValue({
            NetVolumeUnit: volume ? volume.DutyCode : ''
        })
    }

    changeArrestDoc(e: any, index: number) {
        const file = e.target.files[0];
        if (file != undefined) {
            this.ArrestDocument.at(index).patchValue({
                ReferenceCode: this.arrestCode,
                FilePath: replaceFakePath(e.target.value),
                IsActive: 1
            })
        }
    }

    catchError(error: any) {
        console.log(error);
        this._isSuccess = false;
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
        switch (this.mode) {
            case 'C':
                this.createWithOutArrestCode();
                break;

            case 'R':
                this.revised();
                break;
        }
    }

    private async onCancel() {
        switch (this.mode) {
            case 'C':
                if (this.arrestCode != 'NEW') {
                    this.loaderService.show();
                    Promise.all([
                        await this.setDeleteForm(),
                        await this.deleteArrest(),
                        await this.modifyNotice(),
                        await this.modifyStaff(),
                        await this.modifyProduct(),
                        await this.modifyDocument()
                    ])
                    this.router.navigate(['arrest/list']);
                    this.loaderService.hide();
                } else {
                    this.router.navigate([`arrest/list`]);
                }
                break;

            case 'R':
                this.clearForm();
                this.pageLoad(this.arrestCode);
                break;
        }
    }

    private async onEdit() {
        if (
            !this.typeheadStaff.length &&
            !this.typeheadOffice.length &&
            !this.typeheadProduct.length &&
            !this.typeheadQtyUnit.length &&
            !this.typeheadNetVolumeUnit.length &&
            !this.typeheadRegion.length
        ) {
            let arr = [];
            let isLawsuit = await this.ArrestIndictment.value.map(async x => {
                return await this.s_lawsuit.ArrestLawsuitgetByIndictmentID(x.IndictmentID).then(y => {
                    if (this.checkResponse(y)) arr.push(...y);
                    return arr;
                })
            })
            Promise.all(isLawsuit).then(async () => {
                if (arr.length && arr.some(y => y.ArrestCode == this.arrestCode)) {
                    this.enableBthModeR();
                    swal('', Message.cannotModify, 'warning');
                } else {
                    this.loaderService.show();
                    await this.loadMasterData();
                    this.loaderService.hide();
                }

            });
        }
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
                }).then(async (result) => {
                    if (result.value) {
                        this.loaderService.show();
                        Promise.all([
                            await this.setDeleteForm(),
                            await this.deleteArrest(),
                            await this.modifyNotice(),
                            await this.modifyStaff(),
                            await this.modifyProduct(),
                            await this.modifyDocument()
                        ])

                        swal({
                            title: '',
                            text: Message.saveComplete,
                            type: 'success',
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Ok'
                        }).then(res => {
                            if (res.value)
                                this.router.navigate(['arrest/list']);
                        })
                        this.loaderService.hide();
                    }
                })
            }
        }).catch((error) => this.catchError(error));
    }

    private async onComplete() {
        if (!this._isSuccess) {
            swal('', Message.saveFail, 'error');
            return;
        }

        swal({
            title: '',
            text: Message.saveComplete,
            type: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.value) {
                this.clearForm();
                switch (this.mode) {
                    case 'C':
                        setTimeout(() => {
                            this.router.navigate(['/arrest/manage', 'R', this.arrestCode]);
                        }, 400);
                        break;

                    case 'R':
                        this.pageLoad(this.arrestCode);
                        break;
                }
            }
        })

    }

    private clearForm() {
        this.arrestFG.reset();
        clearFormArray(this.ArrestNotice);
        clearFormArray(this.ArrestStaff);
        clearFormArray(this.ArrestProduct);
        clearFormArray(this.ArrestLawbreaker);
        clearFormArray(this.ArrestIndictment);
        clearFormArray(this.ArrestDocument);
    }

    async setDeleteForm() {
        for (let index = 0; index < this.ArrestNotice.length; index++) {
            await this.ArrestNotice.at(index).patchValue({ IsModify: 'd' });
        }
        for (let index = 0; index < this.ArrestStaff.length; index++) {
            await this.ArrestStaff.at(index).patchValue({ IsModify: 'd' });
        }
        for (let index = 0; index < this.ArrestProduct.length; index++) {
            await this.ArrestProduct.at(index).patchValue({ IsModify: 'd' });
        }
        for (let index = 0; index < this.ArrestLawbreaker.length; index++) {
            await this.ArrestLawbreaker.at(index).patchValue({ IsModify: 'd' });
        }
        for (let index = 0; index < this.ArrestIndictment.length; index++) {
            await this.ArrestIndictment.at(index).patchValue({ IsModify: 'd' });
        }
        for (let index = 0; index < this.ArrestDocument.length; index++) {
            await this.ArrestDocument.at(index).patchValue({ IsModify: 'd' });
        }
    }


    private async createWithOutArrestCode() {
        this.loaderService.show();
        await this.getTransactionRunning();
        this.onComplete();
        this.loaderService.hide();
    }

    private async revised() {
        this.loaderService.show();
        try {
            Promise.all([
                await this.upateArrest(),
                await this.modifyNotice(),
                await this.modifyStaff(),
                await this.modifyProduct(),
                await this.modifyDocument()
            ])
        } catch (error) {
        }

        this.onComplete();
        this.loaderService.hide();
    }

    private async getTransactionRunning() {

        let resRunning: any[] = await this.s_transactionRunning
            .TransactionRunninggetByCon(this.runningTable, this.runningOfficeCode)
            .then(async (x: TransactionRunning[]) => x)

        if (resRunning.length) {
            let tr = resRunning.sort((a, b) => b.RunningNo - a.RunningNo)[0] // sort desc
            let str = '' + (tr.RunningNo + 1)
            let pad = '00000';
            let ans = pad.substring(0, pad.length - str.length) + str
            this.arrestCode = `${tr.RunningPrefix}${tr.RunningOfficeCode}${tr.RunningYear}${ans}`;

            await this.s_transactionRunning.
                TransactionRunningupdByCon(tr.RunningID.toString())
                .then(async y => {
                    if (!this.checkIsSuccess(y)) return;
                    return true;
                }, () => { this.saveFail(); return; })
                .catch((error) => this.catchError(error));

        } else {
            await this.s_transactionRunning
                .TransactionRunninginsAll(this.runningOfficeCode, this.runningTable, this.runningPrefix)
                .then(async y => {
                    if (!this.checkIsSuccess(y)) return;

                    let ans = '00001'
                    let year = ((new Date).getFullYear() + 543).toString()
                    year = year.substring(2, 4);
                    this.arrestCode = `${this.runningPrefix}${this.runningOfficeCode}${year}${ans}`;
                    return true;
                }, () => { this.saveFail(); return; })
                .catch((error) => this.catchError(error));
        }

        if (this.arrestCode != 'NEW') {
            try {
                Promise.all([
                    await this.insertArrest(),
                    await this.modifyNotice(),
                    await this.modifyStaff(),
                    await this.modifyProduct(),
                    await this.modifyDocument()
                ])
            } catch (error) {

            }
        }
    }

    private async insertArrest() {
        const newArrest = this.setArrestForSave();
        await this.s_arrest.ArrestinsAll(newArrest)
            .then(async x => {
                if (!this.checkIsSuccess(x)) return;
            }, () => { this.saveFail(); return; })
            .catch((error) => this.catchError(error));
    }

    private setArrestForSave() {
        let a: fromModels.Arrest = this.arrestFG.value;
        const ArrestDate = getDateMyDatepicker(a.ArrestDate);
        const OccurrenceDate = getDateMyDatepicker(a.OccurrenceDate);
        const HaveCulprit = this.ArrestLawbreaker.value.filter(l => l.IsModify != 'd').length > 0 ? 1 : 0;
        return {
            ArrestCode: this.arrestCode,
            ArrestDate: convertDateForSave(ArrestDate),
            ArrestTime: a.ArrestTime,
            OccurrenceDate: convertDateForSave(OccurrenceDate),
            OccurrenceTime: a.OccurrenceTime,
            ArrestStationCode: a.ArrestStationCode,
            ArrestStation: a.ArrestStation,
            HaveCulprit: HaveCulprit,
            Behaviour: a.Behaviour,
            Testimony: a.Testimony,
            Prompt: a.Prompt,
            IsMatchNotice: a.IsMatchNotice,
            ArrestDesc: a.ArrestDesc,
            NoticeCode: a.NoticeCode,
            InvestigationSurveyDocument: a.InvestigationSurveyDocument,
            InvestigationCode: a.InvestigationCode,
            IsActive: a.IsActive,
            IsLawsuitComplete: a.IsLawsuitComplete || null,
            ArrestLocale: a.ArrestLocale
                .map(x => {
                    x.ArrestCode = this.arrestCode;
                    return x;
                }),
            ArrestStaff: a.ArrestStaff
                .filter(x => x.IsModify != 'd')
                .map(x => {
                    x.ArrestCode = this.arrestCode;
                    return x;
                })
        }
    }

    private async upateArrest() {
        await this.s_arrest.ArrestupdByCon(this.setArrestForSave())
            .then(async x => {
                if (!this.checkIsSuccess(x)) return;
            }, () => { this.saveFail(); return; })
            .catch((error) => this.catchError(error));
    }

    private async deleteArrest() {
        await this.s_arrest.ArrestupdDelete(this.arrestCode)
            .then(async (x) => {
                if (!this.checkIsSuccess(x)) return;
            }, () => { this.saveFail(); return; })
            .catch((error) => this.catchError(error));
    }

    private async modifyNotice() {
        let noticePromise = await this.ArrestNotice.value
            .map(async x => {
                x.ArrestCode = this.arrestCode;
                switch (x.IsModify) {
                    case 'd':
                        if (this.mode == 'C') return;
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

    private async modifyStaff() {
        let staffPromise = await this.ArrestStaff.value
            .map(async (x: fromModels.ArrestStaff) => {
                x.ArrestCode = this.arrestCode;
                switch (x.IsModify) {
                    case 'd':
                        if (this.mode == 'C' || !x.StaffID) return;
                        await this.s_staff.ArrestStaffupdDelete(x.StaffID)
                            .then(y => {
                                if (!this.checkIsSuccess(y)) return;
                            }, () => { this.saveFail(); return; })
                            .catch((error) => this.catchError(error));
                        break;
                    case 'c':
                        if (this.mode == 'C') return;
                        await this.s_staff.ArrestStaffinsAll(x)
                            .then(y => {
                                if (!this.checkIsSuccess(y)) return;
                                x.StaffID = y.StaffID;
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

    private async modifyProduct() {
        let arrestProductId = [];
        let productPromise = await this.ArrestProduct.value
            .map(async (x: fromModels.ArrestProduct) => {
                x.ProductDesc = this.isObject(x.ProductDesc) ? x.ProductDesc['ProductDesc'] : x.ProductDesc;
                x.ArrestCode = this.arrestCode;
                switch (x.IsModify) {
                    case 'd':
                        if (this.mode == 'C' || !x.ProductID) return;
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
                                arrestProductId.push({
                                    RowId: x.RowId,
                                    ArrestProductID: y.ProductID
                                })
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

                if (x.IsModify != 'c') {
                    arrestProductId.push({
                        RowId: x.RowId,
                        ArrestProductID: x.ProductID
                    })
                }
            })

        return Promise.all(productPromise).then(async () => {
            await this.modifyLawbreaker(arrestProductId)
        });
    }

    private async modifyLawbreaker(arrestProductId: any[]) {
        let arrestLawbreakerId = [];
        let lawbreakerPromise = await this.ArrestLawbreaker.value
            .map(async (x: fromModels.ArrestLawbreaker, i) => {
                x.ArrestCode = this.arrestCode;

                switch (x.IsModify) {
                    case 'c':
                        await this.s_lawbreaker.ArrestLawbreakerinsAll(x)
                            .then(y => {
                                if (!this.checkIsSuccess(y)) return;
                                arrestLawbreakerId.push({
                                    LawbreakerID: x.LawbreakerID,
                                    ArrestLawbreakerID: y.LawbreakerID
                                })
                            })
                            .catch((error) => this.catchError(error));
                        break;

                    case 'u':
                        await this.s_lawbreaker.ArrestLawbreakerupdByCon(x)
                            .then(y => {
                                if (!this.checkIsSuccess(y)) return;
                            })
                            .catch((error) => this.catchError(error));
                        break;

                    case 'd':
                        if (this.mode == 'C') return;
                        await this.s_lawbreaker.ArrestLawbreakerupdDelete(x.LawbreakerID.toString())
                            .then(y => {
                                if (!this.checkIsSuccess(y)) return;
                            })
                            .catch((error) => this.catchError(error));
                        break;
                }

                if (x.IsModify != 'c') {
                    arrestLawbreakerId.push({
                        LawbreakerID: x.LawbreakerID,
                        ArrestLawbreakerID: x.LawbreakerID
                    })
                }
            })

        return Promise.all(lawbreakerPromise).then(async () => {
            await this.modifyIndictment(arrestLawbreakerId, arrestProductId);
        });
    }

    private async modifyIndictment(arrestLawbreakerId: any[], arrestProductId: any[]) {
        let indictmentPromise = await this.ArrestIndictment.value
            .map(async (x: fromModels.ArrestIndictment) => {
                let newIndictment = new fromModels.ArrestIndictment;
                x.ArrestCode = this.arrestCode;
                newIndictment.ArrestCode = x.ArrestCode;
                newIndictment.GuiltBaseID = x.GuiltBaseID;
                newIndictment.IsProve = x.IsProve;
                newIndictment.IsActive = x.IsActive || 1;
                newIndictment.IsLawsuitComplete = x.IsLawsuitComplete || null;

                let indict;
                switch (x.IsModify) {
                    case 'd':
                        if (this.mode == 'C' || !x.IndictmentID) return;
                        indict = await this.s_indictment.ArrestIndictmentupdDelete(x.IndictmentID.toString())
                            .then().catch((error) => this.catchError(error));
                        break;

                    case 'c':
                        indict = await this.s_indictment.ArrestIndictmentinsAll(newIndictment)
                            .then(async y => {
                                if (!this.checkIsSuccess(y)) return;
                                x.IndictmentID = y.IndictmentID;
                            }).catch((error) => this.catchError(error));
                        break;

                    case 'u':
                        newIndictment.IndictmentID = x.IndictmentID;
                        indict = await this.s_indictment.ArrestIndictmentupdByCon(newIndictment)
                            .then().catch((error) => this.catchError(error));
                        break;
                }

                let proD = await this.modifyIndictmentProduct(
                    x.IndictmentID,
                    x.IsModify,
                    arrestProductId,
                    x.ArrestIndictmentProduct);
                let indictD = await this.modifyIndictmentDetail(
                    x.IndictmentID,
                    x.IsModify,
                    arrestLawbreakerId,
                    x.ArrestIndictmentProduct,
                    x.ArrestIndicmentDetail);

                return Promise.all([indict, proD, indictD]);
            })
        return Promise.all(indictmentPromise);
    }

    private async modifyIndictmentProduct(
        indictmentId: number,
        indictmentModify: string,
        arrestProductId: any[],
        product: fromModels.ArrestIndictmentProduct[]
    ) {

        let promises = await product.map(async (x) => {
            if (indictmentModify == 'c' || x.IsModify == 'c') {
                if (!x.IsChecked) return;
                const apd = arrestProductId.find(pp => pp.RowId == x.RowId);
                if (!apd) return;
                x.IndictmentID = indictmentId;
                x.ProductID = apd.ArrestProductID;
                await this.s_indictment.ArrestIndictmentProductinsAll(x)
                    .then(y => {
                        if (!this.checkIsSuccess(y)) return;
                        x.IndictmentProductID = y.IndictmentProductID;
                    }).catch((error) => this.catchError(error));

            } else if (x.IsModify == 'd') {
                if (this.mode == 'C' || !x.ProductID) return;
                await this.s_indictment.ArrestIndictmentProductupdDeleteByProductID(x.ProductID.toString())
                    .then().catch(error => this.catchError(error));

            } else if (x.IsModify == 'u' || x.IsModify == 'v') {
                if (this.mode == 'C' || !x.ProductID) return;
                if (x.IndictmentProductID) {
                    if (x.IsChecked) {
                        await this.s_indictment.ArrestIndictmentProductupdByProductID(x)
                            .then().catch(error => this.catchError(error))
                    } else if (!x.IsChecked) {
                        await this.s_indictment.ArrestIndictmentProductupdDeleteByProductID(x.ProductID.toString())
                            .then().catch(error => this.catchError(error));
                    }
                } else if (!x.IndictmentProductID && x.IsChecked) {
                    x.IndictmentID = indictmentId;
                    await this.s_indictment.ArrestIndictmentProductinsAll(x)
                        .then(y => {
                            if (!this.checkIsSuccess(y)) return;
                            x.IndictmentProductID = y.IndictmentProductID;
                        }).catch((error) => this.catchError(error));
                }
            }
        })
        return Promise.all(promises);
    }

    private async modifyIndictmentDetail(
        indictmentID: number,
        indictmentModify: string,
        arrestLawbreakerId: any[],
        indictmentProduct: fromModels.ArrestIndictmentProduct[],
        indictmentDetail: fromModels.ArrestIndictmentDetail[]
    ) {
        let promises = indictmentDetail.filter(x => x.LawbreakerID != null)
        if (promises.length) {
            // กรณีที่มีผู้ต้องหา
            indictmentDetail.map(async (x: fromModels.ArrestIndictmentDetail) => {
                const lawbreaker = x.ArrestLawbreaker.find(l => l.LawbreakerID == x.LawbreakerID);
                const newIndictmentDetail = {
                    IndictmentID: indictmentID || x.IndictmentID,
                    IndictmentDetailID: x.IndictmentDetailID,
                    IsActive: x.IsActive,
                    LawbreakerID: x.LawbreakerID,
                }

                if (lawbreaker.IsModify == 'c' || indictmentModify == 'c' || !x.IndictmentDetailID) {
                    if (lawbreaker.IsChecked == Acceptability.ACCEPTABLE) return;
                    const lid = arrestLawbreakerId.find(xx => xx.LawbreakerID == x.LawbreakerID);
                    if (!lid) return;
                    newIndictmentDetail.LawbreakerID = lid.ArrestLawbreakerID;
                    await this.s_indictmentDetail.ArrestIndicmentDetailinsAll(newIndictmentDetail)
                        .then(y => {
                            if (!this.checkIsSuccess(y)) return;
                            x.IndictmentDetailID = y.IndictmentDetailID;
                        }).catch((error) => this.catchError(error));

                } else if (lawbreaker.IsModify == 'u' || lawbreaker.IsModify == 'v') {
                    if (this.mode == 'C') return;
                    if (x.IndictmentDetailID) {
                        if (lawbreaker.IsChecked == Acceptability.INACCEPTABLE) {
                            await this.s_indictmentDetail.ArrestIndicmentDetailupdByCon(newIndictmentDetail)
                                .then().catch((error) => this.catchError(error));
                        } else {
                            await this.s_indictmentDetail.ArrestIndicmentDetailupdDelete(x.IndictmentDetailID.toString())
                                .then().catch((error) => this.catchError(error));
                        }
                    }

                } else if (lawbreaker.IsModify == 'd') {
                    if (this.mode == 'C') return;
                    if (x.IndictmentDetailID) {
                        await this.s_indictmentDetail.ArrestIndicmentDetailupdDelete(x.IndictmentDetailID.toString())
                            .then().catch((error) => this.catchError(error));
                    }
                }

                let proD = this.modifyProductDetail(
                    x.IndictmentDetailID,
                    indictmentModify,
                    indictmentProduct,      // IndictmentProduct ที่อ้างอิงกับ Indictment
                    x.ArrestProductDetail,  // ProductDetail ที่อ้างอิงกับ IndictmentDetail
                    lawbreaker.IsModify,
                    lawbreaker.IsChecked
                );

                return Promise.all([proD])
            })
        } else {
            // กรณีที่ไม่มีผู้ต้องหา 
            // แต่มี ProductDetail
            if (indictmentDetail[0].ArrestProductDetail.length) {
                let x = indictmentDetail[0]
                const newIndictmentDetail = {
                    IndictmentID: indictmentID || x.IndictmentID,
                    IndictmentDetailID: x.IndictmentDetailID,
                    IsActive: x.IsActive,
                    LawbreakerID: x.LawbreakerID || null
                }

                if (indictmentModify == 'c' || x.IsModify == 'c') {
                    await this.s_indictmentDetail.ArrestIndicmentDetailinsAll(newIndictmentDetail)
                        .then(y => {
                            if (!this.checkIsSuccess(y)) return;
                            x.IndictmentDetailID = y.IndictmentDetailID;
                        }).catch((error) => this.catchError(error));

                } else if (x.IsModify == 'u' || x.IsModify == 'v') {
                    await this.s_indictmentDetail.ArrestIndicmentDetailupdByCon(newIndictmentDetail)
                        .then().catch((error) => this.catchError(error));
                }

                let proD = this.modifyProductDetail(
                    x.IndictmentDetailID,
                    indictmentModify,
                    indictmentProduct,                        // IndictmentProduct ที่อ้างอิงกับ Indictment
                    x.ArrestProductDetail,  // ProductDetail ที่อ้างอิงกับ IndictmentDetail
                    'c',
                    this.ACCEPTABILITY.INACCEPTABLE
                );
                return Promise.all([proD]);
            }
        }

        return Promise.all(promises).then();
    }

    comparer(otherArray) {
        return (current) => {
            return otherArray.filter((other) => {
                return other.ProductID == current.ProductID
            }).length == 0;
        }
    }

    private async modifyProductDetail(
        indictmentDetailID: number,
        indictmentModify: string,
        indictmentProduct: fromModels.ArrestIndictmentProduct[],
        arrestProductDetail: fromModels.ArrestProductDetail[],
        lawbreakerModify: string,
        lawbreakerChecked: fromModels.Acceptability,
    ) {
        if ((indictmentModify == 'c' || lawbreakerModify == 'c') && lawbreakerChecked == this.ACCEPTABILITY.INACCEPTABLE) {
            const _Promise = await indictmentProduct
                .filter(x => x.IsModify != 'd')
                .map(async x => {
                    let apd = new fromModels.ArrestProductDetail();
                    apd.ProductDetailID = null;
                    apd.ProductID = x.ProductID;
                    apd.IsProdcutCo = x.IsProdcutCo;
                    apd.Qty = x.IndictmentProductQty;
                    apd.QtyUnit = x.IndictmentProductQtyUnit;
                    apd.Size = x.IndictmentProductSize;
                    apd.SizeUnit = x.IndictmentProductSizeUnit;
                    apd.Volume = x.IndictmentProductVolume;
                    apd.VolumeUnit = x.IndictmentProductVolumeUnit;
                    apd.MistreatRate = x.IndictmentProductMistreatRate;
                    apd.Fine = x.IndictmentProductFine;
                    apd.IndictmentDetailID = indictmentDetailID;
                    apd.ProductDesc = x.ProductDesc;
                    apd.IsActive = x.IndictmentProductIsActive || 1;

                    if (!x.IsChecked) return;
                    console.log('section 1: ', apd);

                    await this.s_productDetail.ArrestProductDetailinsAll(apd)
                        .then().catch((error) => this.catchError(error));
                });
            return Promise.all(_Promise);

        } else if (lawbreakerModify != 'd' && lawbreakerChecked == this.ACCEPTABILITY.INACCEPTABLE) {

            let promises = await arrestProductDetail.map(async x => {

                if (x.IsModify == 'd' || !x.IsChecked) {
                    if (!x.ProductDetailID) return;
                    await this.s_productDetail.ArrestProductDetailupdDelete(x.ProductDetailID.toString())
                        .then().catch((error) => this.catchError(error));

                } else if ((x.IsModify == 'v' || x.IsModify == 'u') && x.IsChecked) {
                    if (x.ProductDetailID) {
                        await this.s_productDetail.ArrestProductDetailupdByCon(x)
                            .then().catch((error) => this.catchError(error));

                    } else {
                        await this.s_productDetail.ArrestProductDetailinsAll(x)
                            .then().catch((error) => this.catchError(error));
                    }

                } else if (x.IsModify == 'c' && x.IsChecked) {
                    await this.s_productDetail.ArrestProductDetailinsAll(x)
                        .then().catch((error) => this.catchError(error));
                }
            })
            return Promise.all(promises);

        } else {
            if (indictmentModify == 'c' || lawbreakerModify == 'c') return;
            const _Promise = await arrestProductDetail.map(async x => {
                if (x.ProductDetailID) {
                    await this.s_productDetail.ArrestProductDetailupdDelete(x.ProductDetailID.toString())
                        .then().catch((error) => this.catchError(error));
                }
            })
            return Promise.all(_Promise);
        }
    }

    private async modifyDocument() {
        let docPromise = await this.ArrestDocument.value
            .map(async (x: fromModels.ArrestDocument) => {
                x.ReferenceCode = this.arrestCode;
                switch (x.IsModify) {
                    case 'd':
                        if (this.mode == 'C') return;
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
                                x.DocumentID = y.DocumentID;
                                x.IsModify = 'v';
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
