import { Component, OnInit, OnDestroy, ViewChild, ElementRef, DoCheck } from '@angular/core';
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
import { groupArrayItem, removeObjectItem, clearFormArray, sortFormArray } from '../../arrest.helper';
import { setViewLawbreaker } from '../lawbreaker-modal/lawbreaker-modal.component';
import { Acceptability } from '../../models';

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit, OnDestroy, DoCheck {
    // C: ข้อมูลใหม่
    // R: อัพเดทข้อมูล

    // FormArray ตรวจสอบสถานะด้วย
    // c: รายการใหม่
    // v: รายการแสดง
    // u: รายการอัพเดท
    // d: รายการที่ถูกลบ

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
    ACCEPTABILITY = Acceptability;

    documentType = '3';
    runningTable = 'ops_arrest';
    runningOfficeCode = '901112';
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

    @ViewChild('printDocModal') printDocModel: ElementRef;

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
        this.navService.setNextPageButton(false);

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

    ngDoCheck(): void {
        if (this.ArrestIndictment.length) {
            // เพิ่มสินค้าและผู้ต้องหาให้กับ ArrestIndictmentDetail
            // โดยที่ เพิ่มรายการสินค้าและผู้ต้องหา ให้กับทุกข้อกล่าวหา
            this.ArrestIndictment.value.map((_f1, i) => {
                let _IndictmentDetail = this.ArrestIndictment.at(i).get('ArrestIndicmentDetail') as FormArray;

                let _IndictmentProduct = this.ArrestIndictment.at(i).get('ArrestIndictmentProduct') as FormArray;
                this.ArrestProduct.value.map(_f3 => {
                    let nip = new fromModels.ArrestIndictmentProduct();
                    nip.ProductID = _f3.ProductID;
                    nip.IsProdcutCo = _f3.IsProdcutCo || '1';
                    nip.IndictmentProductQty = _f3.Qty || '0';
                    nip.IndictmentProductQtyUnit = _f3.QtyUnit || '-';
                    nip.IndictmentProductSize = _f3.Size || '0';
                    nip.IndictmentProductSizeUnit = _f3.SizeUnit || '-';
                    nip.IndictmentProductVolume = _f3.Volume || '0';
                    nip.IndictmentProductVolumeUnit = _f3.VolumeUnit || '-';
                    nip.IndictmentProductMistreatRate = _f3.MistreatRate || '';
                    nip.IndictmentProductFine = _f3.Fine || '';
                    nip.IndictmentProductIsActive = _f3.IndictmentProductIsActive || '1';
                    nip.ProductDesc = _f3.ProductDesc;
                    nip.IsChecked = _f3.IsChecked || true;
                    nip.IsModify = _f3.IsModify || 'c';
                    this.updateIndictmentProductItem(nip, _IndictmentProduct);
                })

                _IndictmentDetail.value.map((_f2) => {
                    this.ArrestLawbreaker.value
                        .map(x => {
                            this.updateItemIndictmentDetail(x, _IndictmentDetail)
                        });
                });

                if (_IndictmentDetail.length == 0) {
                    const _AID = new fromModels.ArrestIndictmentDetail;
                    _IndictmentDetail.push(this.groupArrestIndictmentDetail(_AID))
                }
            });
        }
    }

    showGuiltBase() {
        this.ArrestIndictment.value.map(indict => {
            indict.ArrestIndicmentDetail.map(indictD => {
                indictD.ArrestProductDetail.filter(prodD => {
                    console.log(prodD);
                })
            })
        })
        console.log(this.ArrestIndictment.value);
    }

    updateItemIndictmentDetail(x: any, _IndictmentDetail: FormArray) {
        if (!x.LawbreakerID) return;
        const _IL = _IndictmentDetail.value.filter(l => l.LawbreakerID == x.LawbreakerID);
        const _I = _IndictmentDetail.value.findIndex(_i => _i.LawbreakerID == x.LawbreakerID);

        const _PD = new fromModels.ArrestProductDetail;

        switch (x.IsModify) {
            case 'c':
            case 'v':
                if (!_IL.length) {
                    const __IndictmentDetail = _IndictmentDetail.length ? _IndictmentDetail.at(0).value : null;
                    if (__IndictmentDetail && __IndictmentDetail.LawbreakerID == null) {
                        _IndictmentDetail.at(0).patchValue(
                            this.groupArrestIndictmentDetail({
                                LawbreakerID: x.LawbreakerID,
                                ArrestLawbreaker: [x]
                            }).value
                        )
                    } else {
                        _IndictmentDetail.push(
                            this.groupArrestIndictmentDetail({
                                LawbreakerID: x.LawbreakerID,
                                ArrestLawbreaker: [x]
                            })
                        )
                    }
                }
                break;

            case 'u':
                _IndictmentDetail.at(_I).patchValue(
                    this.groupArrestIndictmentDetail({
                        LawbreakerID: x.LawbreakerID,
                        ArrestLawbreaker: [x],
                        ArrestProductDetail: [_PD]
                    }).value);
                break;

            case 'd':
                _IndictmentDetail.removeAt(_I);
                break;
        }
    }

    updateIndictmentProductItem(x, _AProduct: FormArray) {
        if (!x.ProductID && !x.ProductDesc) return;
        const _PD = _AProduct.value.filter(pd => pd.ProductID == x.ProductID);
        const _I = _AProduct.value.findIndex(_i => _i.ProductID == x.ProductID);
        switch (x.IsModify) {
            case 'c':
            case 'v':
                if (!_PD.length) {
                    const __Product = _AProduct.length ? _AProduct.at(0).value : null;
                    if (__Product && __Product.ProductID == null && __Product.ProductDesc == null) {
                        _AProduct.at(0).patchValue(this.groupArrestIndictmentProduct(x).value);
                    } else {
                        _AProduct.push(this.groupArrestIndictmentProduct(x));
                    }
                }
                break;

            case 'u':
                // 
                _AProduct.at(_I).patchValue(this.groupArrestIndictmentProduct(x).value)
                break;

            case 'd':
                _AProduct.removeAt(_I);
                break;
        }
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

        let _ALawbreaker = [];
        let _AIindictment = await _indict.map(async ai => {
            ai.IsModify = 'v';
            ai.ArrestIndicmentDetail.map(x => {
                x.ArrestLawbreaker[0].IsModify = 'v';
                _ALawbreaker.push(x.ArrestLawbreaker[0])
            })
            await this.s_indictment.ArrestIndictmentProductgetByIndictmentID(ai.IndictmentID.toString())
                .then(x => {
                    if (this.checkResponse(x)) {
                        ai.ArrestIndictmentProduct = x;
                        ai.ArrestIndictmentProduct.map(aip => aip.IsModify = 'v');
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
        // Group รายการที่ซ้ำกัน
        _ALawbreaker = groupArrayItem(_ALawbreaker, 'LawbreakerID');

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
    private setArrestIndictment(o: fromModels.ArrestIndictment[], indictmentIndex: number) {
        let arr = this.ArrestIndictment.length ? this.ArrestIndictment : new FormArray([]);

        if (indictmentIndex != null && this.ArrestIndictment.length) {
            let o_ArrestIndictment = o.find(x => x.RowId == arr.at(indictmentIndex).value.RowId);
            arr.at(indictmentIndex).patchValue({
                GuiltBaseID: o_ArrestIndictment.GuiltBaseID,
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
                    IndictmentID: x.IndictmentID || null,
                    GuiltBaseID: x.GuiltBaseID || null,
                    IsProve: x.IsProve || 1,
                    IsActive: 1,
                    IsLawsuitComplete: x.IsLawsuitComplete || 0,
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
            GuiltBaseID: x.GuiltBaseID || null,
            GuiltBaseName: x.GuiltBaseName || null,
            IsCompare: x.IsCompare || 0,
            IsActive: x.IsActive || 1,
            IsProve: x.IsProve || 1,
            SubSectionRuleID: x.SubSectionRuleID || null,
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
            o.map(x => { arr.push(this.groupArrestIndictmentDetail(x)) })
        }
        return arr;
    }
    private groupArrestIndictmentDetail(x: fromModels.ArrestIndictmentDetail) {
        return this.fb.group({
            IndictmentDetailID: x.IndictmentDetailID || null,
            IndictmentID: x.IndictmentID || null,
            LawbreakerID: x.LawbreakerID || null,
            IsActive: 1,
            ArrestLawbreaker: this.setArrestLawbreaker(x.ArrestLawbreaker, x.IndictmentDetailID),
            ArrestProductDetail: this.setArrestProductDetail(x.ArrestProductDetail, x.IndictmentDetailID)
        });
    }
    // --- 2.1 
    private setArrestLawbreaker = (o: fromModels.ArrestLawbreaker[], indictmentDetailID: number) => {
        let arr = new FormArray([]);
        if (!this.ArrestLawbreaker.length || !Array.isArray(o)) {
            arr.push(this.groupArrestLawbreaker(new fromModels.ArrestLawbreaker()));
        } else if (Array.isArray(o) && o.length) {
            o.map(x => {
                x.IsChecked = indictmentDetailID
                    ? this.ACCEPTABILITY.INACCEPTABLE
                    : this.ACCEPTABILITY.ACCEPTABLE;
                arr.push(this.groupArrestLawbreaker(x))
            })
        }
        return arr;
    }
    private groupArrestLawbreaker(x: fromModels.ArrestLawbreaker) {
        return this.fb.group({
            IsChecked: x.IsModify == 'c' ? this.ACCEPTABILITY.INACCEPTABLE : x.IsChecked ,
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
    private setArrestProductDetail = (o: fromModels.ArrestProductDetail[], indictmentDetailID: number) => {
        let arr = new FormArray([]);
        if (!this.ArrestProduct.length || !Array.isArray(o)) {
            arr.push(this.groupArrestProductDetail(new fromModels.ArrestProductDetail()))
        } else if (Array.isArray(o) && o.length) {
            o.map(x => {
                x.IsChecked = indictmentDetailID ? true : false;
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
            Qty: x.Qty || '0',
            QtyUnit: x.QtyUnit || '-',
            Size: x.Size || '0',
            SizeUnit: x.SizeUnit || '-',
            Volume: x.Volume || '0',
            VolumeUnit: x.VolumeUnit || '-',
            MistreatRate: x.MistreatRate || null,
            Fine: x.Fine || null,
            IndictmentDetailID: x.IndictmentDetailID || null,
            ProductDesc: x.ProductDesc || null,
            IsActive: x.IsActive || 1,
            IsChecked: x.IsChecked,
        })
    }
    // --- ArrestIndictmentProduct
    private setArrestIndictmentProduct = (o: fromModels.ArrestIndictmentProduct[]) => {
        let arr = new FormArray([]);
        if (!Array.isArray(o)) {
            arr.push(this.groupArrestIndictmentProduct(new fromModels.ArrestIndictmentProduct()));
        } else if (Array.isArray(o) && o.length) {
            o.map(x => {
                x.IsChecked = true;
                arr.push(this.groupArrestIndictmentProduct(x))
            });
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
            IsChecked: x.IsChecked || false,
            IsModify: x.IsModify || 'c'
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
        } else if (lastDoc.IsModify == 'd') {
            item.RowId = 1;
            this.ArrestStaff.push(this.fb.group(item));
        }
    }

    addProduct() {
        const lastIndex = this.ArrestProduct.length - 1;
        let item = new fromModels.ArrestProduct();
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
        lawbreaker.IsModify = lawbreaker.IsModify || 'c';
        lawbreaker.IsActive = 1;
        lawbreaker = removeObjectItem(lawbreaker, 'ResultCount') as fromModels.ArrestLawbreaker;
        this.ArrestLawbreaker.push(this.fb.group(lawbreaker))
        let sort = sortFormArray(this.ArrestLawbreaker.value, 'RowId');
        sort.then(x => this.setItemFormArray(x, 'ArrestLawbreaker'))
            .catch((error) => this.catchError(error));
    }

    addIndictment() {
        const lastIndex = this.ArrestIndictment.length - 1;
        let item = new fromModels.ArrestIndictment();
        item.ArrestCode = this.arrestCode;
        item.IsModify = 'c';
        item.RowId = null;
        if (lastIndex < 0) {
            this.setArrestIndictment([item], null);
            return;
        }

        const lastDoc = this.ArrestIndictment.at(lastIndex).value;
        if (lastDoc.GuiltBaseID) {
            this.setArrestIndictment([item], null);
        } else if (lastDoc.IsModify == 'd') {
            this.setArrestIndictment([item], null);
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
        if (lastItem.DataSource && lastItem.FilePath) {
            item.RowId = lastItem.RowId + 1;
            this.ArrestDocument.push(this.fb.group(item));
        } else if (lastItem.IsModify == 'd') {
            item.RowId = 1;
            this.ArrestDocument.push(this.fb.group(item));
        }
    }

    private deleteFormArray(o: FormArray, i: number, controls: string) {
        o.at(i).patchValue({ IsModify: 'd', RowId: 0 });
        let sort = sortFormArray(o.value, 'RowId');
        o.value.map(() => o.removeAt(0));
        sort.then(x => this.setItemFormArray(x, controls))
            .catch((error) => this.catchError(error));
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
        let notice = sortFormArray(this.ArrestNotice.value, 'RowId');
        this.ArrestNotice.value.map(() => this.ArrestNotice.removeAt(0));
        notice.then(x => this.setNoticeForm(x))
            .catch((error) => this.catchError(error));
    }

    async deleteIndicment(i: number) {
        this.ArrestIndictment.at(i).patchValue({ IsModify: 'd', RowId: 0 });
        const indictment = sortFormArray(this.ArrestIndictment.value, 'RowId');
        this.ArrestIndictment.value.map(() => this.ArrestIndictment.removeAt(0));
        indictment.then((_x) => {
            _x.filter(x => x.IsModify != 'd')
                .map((x) => {
                    x.RowId = null;
                    return x;
                });
            this.setArrestIndictment(_x, null);
        })
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
            IsModify: product.IsModify == 'v' ? 'u' : product.IsModify,
            RowId: product.RowId,
            ArrestCode: this.arrestCode,
            GroupCode: e.item.GroupCode || product.GroupCode,
            IsDomestic: e.item.IsDomestic || product.IsDomestic,
        })
    }

    // onChangeProductDesc(e, i) {
    //     this.ArrestProduct.at(i).patchValue({
    //         ProductDesc: e.target.value
    //     })
    // }

    selectItemStaff(e, i) {
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
            ContributorID: e.item.ContributorID
        })
    }

    onChangeContributer(e: any, i: number) {
        let contributerId = e.target.value;
        let staff = this.ArrestStaff.at(i).value;
        this.ArrestStaff.at(i).patchValue({
            ContributorCode: contributerId,
            IsModify: staff.IsModify == 'v' ? 'u' : staff.IsModify
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
        await this.loadMasterData();
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
        if (!this._isSuccess) {
            swal('', Message.saveFail, 'error');
            return;
        }
        swal('', Message.saveComplete, 'success');
        switch (this.mode) {
            case 'C':
                this.arrestFG.reset();
                clearFormArray(this.ArrestNotice);
                clearFormArray(this.ArrestStaff);
                clearFormArray(this.ArrestProduct);
                clearFormArray(this.ArrestLawbreaker);
                clearFormArray(this.ArrestIndictment);
                clearFormArray(this.ArrestDocument);

                setTimeout(() => {
                    this.router.navigate(['/arrest/manage', 'R', this.arrestCode]);
                }, 400);
                break;

            case 'R':
                // setTimeout(() => {
                //     this.router.navigate(['/arrest/manage', 'R', this.arrestCode]);
                // }, 400);
                this.enableBthModeR();
                break;
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
        return {
            ArrestCode: this.arrestCode,
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
            IsLawsuitComplete: a.IsLawsuitComplete || 0,
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

    private async modifyNotice() {
        let noticePromise = await this.ArrestNotice.value
            .map(async x => {
                x.ArrestCode = this.arrestCode;
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

    private async modifyStaff() {
        let staffPromise = await this.ArrestStaff.value
            .map(async (x: fromModels.ArrestStaff) => {
                x.ArrestCode = this.arrestCode;
                switch (x.IsModify) {
                    case 'd':
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
                                    ProductID: x.ProductID,
                                    ArrestProductID: y.ProductID
                                })
                                x.ProductID = y.ProductID;
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

        // let lawbreakerPromise = ;
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
                                x.LawbreakerID = y.LawbreakerID;
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
                        await this.s_lawbreaker.ArrestLawbreakerupdDelete(x.LawbreakerID.toString())
                            .then(y => {
                                if (!this.checkIsSuccess(y)) return;
                            })
                            .catch((error) => this.catchError(error));
                        break;
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
                newIndictment.IsProve = x.IsProve || 1;
                newIndictment.IsActive = x.IsActive || 1;
                newIndictment.IsLawsuitComplete = x.IsLawsuitComplete || 0;

                switch (x.IsModify) {
                    case 'd':
                        await this.s_indictment.ArrestIndictmentupdDelete(x.IndictmentID.toString())
                            .then().catch((error) => this.catchError(error));
                        break;

                    case 'c':
                        await this.s_indictment.ArrestIndictmentinsAll(newIndictment)
                            .then(y => {
                                if (!this.checkIsSuccess(y)) return;
                                x.IndictmentID = y.IndictmentID;
                            })
                            .catch((error) => this.catchError(error));
                        break;

                    case 'u':
                        await this.s_indictment.ArrestIndictmentupdByCon(newIndictment)
                            .then().catch((error) => this.catchError(error));
                        break;
                }

                return Promise.all([
                    await this.modifyIndictmentProduct(x.IndictmentID, arrestProductId, x.ArrestIndictmentProduct),
                    await this.modifyIndictmentDetail(
                        x.IndictmentID,
                        arrestLawbreakerId,
                        x.ArrestIndictmentProduct,
                        x.ArrestIndicmentDetail)
                ])
            })
        return Promise.all(indictmentPromise);
    }

    private async modifyIndictmentProduct(
        indictmentId: number,
        arrestProductId: any[],
        product: fromModels.ArrestIndictmentProduct[]
    ) {
        let promises = await product.map(async (x) => {

            switch (x.IsModify) {
                case 'c':
                    const apd = arrestProductId.find(pp => pp.ProductID == x.ProductID);
                    if (!apd) return;
                    x.IndictmentID = indictmentId;
                    x.ProductID = apd.ArrestProductID;
                    await this.s_indictment.ArrestIndictmentProductinsAll(x)
                        .then(y => {
                            if (!this.checkIsSuccess(y)) return;
                            x.IndictmentProductID = y.IndictmentProductID;
                        }).catch((error) => this.catchError(error));
                    break;

                case 'd':
                    await this.s_indictment.ArrestIndictmentProductupdDeleteByProductID(x.ProductID.toString())
                        .then().catch(error => this.catchError(error));
                    break;

                case 'u':
                case 'v':
                    if (x.IsChecked) {
                        await this.s_indictment.ArrestIndictmentProductupdByProductID(x)
                            .then().catch(error => this.catchError(error))
                        break;
                    } else {
                        await this.s_indictment.ArrestIndictmentProductupdDeleteByProductID(x.ProductID.toString())
                            .then().catch(error => this.catchError(error));
                    }
                    break;
            }
        })
        return Promise.all(promises);
    }

    private async modifyIndictmentDetail(
        indictmentID: number,
        arrestLawbreakerId: any[],
        indictmentProduct: fromModels.ArrestIndictmentProduct[],
        indictmentDetail: fromModels.ArrestIndictmentDetail[]
    ) {
        let promises = await indictmentDetail
            .filter(x => x.LawbreakerID != null)
            .map(async (x: fromModels.ArrestIndictmentDetail) => {
                const lawbreaker = x.ArrestLawbreaker.find(l => l.LawbreakerID == x.LawbreakerID)
                const newIndictmentDetail = {
                    IndictmentID: indictmentID || x.IndictmentID,
                    IndictmentDetailID: x.IndictmentDetailID,
                    IsActive: x.IsActive,
                    LawbreakerID: x.LawbreakerID,
                }

                switch (lawbreaker.IsModify) {
                    case 'c':
                        if (lawbreaker.IsChecked == Acceptability.ACCEPTABLE) return;
                        const lid = arrestLawbreakerId.find(xx => xx.LawbreakerID == x.LawbreakerID);
                        if (!lid) return;
                        console.log(lid);
                        newIndictmentDetail.LawbreakerID = lid.ArrestLawbreakerID;
                        await this.s_indictmentDetail.ArrestIndicmentDetailinsAll(newIndictmentDetail)
                            .then(y => {
                                if (!this.checkIsSuccess(y)) return;
                                x.IndictmentDetailID = y.IndictmentDetailID;
                            }).catch((error) => this.catchError(error));
                        break;

                    case 'u':
                    case 'v':
                        if (lawbreaker.IsChecked == Acceptability.INACCEPTABLE) {
                            await this.s_indictmentDetail.ArrestIndicmentDetailupdByCon(newIndictmentDetail)
                                .then().catch((error) => this.catchError(error));
                        } else {
                            await this.s_indictmentDetail.ArrestIndicmentDetailupdDelete(x.IndictmentDetailID.toString())
                                .then().catch((error) => this.catchError(error));
                        }
                        break;
                }

                return Promise.all([
                    this.modifyProductDetail(
                        x.IndictmentDetailID,
                        indictmentProduct,      // IndictmentProduct ที่อ้างอิงกับ Indictment
                        x.ArrestProductDetail,  // ProductDetail ที่อ้างอิงกับ IndictmentDetail
                        lawbreaker.IsModify,
                        lawbreaker.IsChecked
                    )
                ])
            })

        return Promise.all(promises).then();
    }

    private async modifyProductDetail(
        indictmentDetailID: number,
        indictmentProduct: fromModels.ArrestIndictmentProduct[],
        arrestProductDetail: fromModels.ArrestProductDetail[],
        lawbreakerModify: string,
        lawbreakerChecked: Acceptability
    ) {
        let indictmentProductPromise: any;
        let arrestProductDetailPromise: any;

        if (lawbreakerChecked) {
            // กรณีมีการเช็คเลือกรายการผู้ต้องหา
            indictmentProductPromise = await indictmentProduct
                .map(async x => {
                    let apd = new fromModels.ArrestProductDetail();
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

                    if (x.IsModify == 'c') {
                        if (!x.IsChecked) return;
                        console.log(indictmentDetailID, apd);
                        await this.s_productDetail.ArrestProductDetailinsAll(apd)
                            .then().catch((error) => this.catchError(error));
                    } else {
                        arrestProductDetailPromise = await arrestProductDetail
                            .filter(proD => proD.ProductID == x.ProductID)
                            .map(async proD => {
                                if (x.IsModify == 'd' || !x.IsChecked) {
                                    await this.s_productDetail.ArrestProductDetailupdDelete(proD.ProductDetailID.toString())
                                        .then().catch((error) => this.catchError(error));

                                } else if (x.IsModify == 'u') {
                                    apd.ProductDetailID = proD.ProductDetailID;
                                    await this.s_productDetail.ArrestProductDetailupdByCon(apd)
                                        .then().catch((error) => this.catchError(error));
                                }
                            });
                    }
                })
        } else if (!lawbreakerChecked || lawbreakerModify == 'd') {
            if (lawbreakerModify == 'c') return;
            // กรณีไม่มีการเช็คเลือกรายการผู้ต้องหา
            arrestProductDetailPromise = await arrestProductDetail.map(async x => {
                await this.s_productDetail.ArrestProductDetailupdDelete(x.ProductDetailID.toString())
                    .then().catch((error) => this.catchError(error));
            })
        }
        return Promise.all([indictmentProductPromise, arrestProductDetailPromise]);
    }

    private async modifyDocument() {
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
