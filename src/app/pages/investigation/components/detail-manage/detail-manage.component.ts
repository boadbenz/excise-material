import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import { NavigationService } from 'app/shared/header-navigation/navigation.service';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Subject } from 'rxjs/Subject';
import { MyDatePickerOptions, setDateMyDatepicker, compareDate, getDateMyDatepicker, setZeroHours } from 'app/config/dateFormat';
import { IMyDateModel } from 'mydatepicker-th';
import { Message } from 'app/config/message';
import * as fromGobalModels from 'app/models';
import * as fromModels from '../../models';
import * as fromServices from '../../services';
import { LoaderService } from 'app/core/loader/loader.service';
import { MainMasterService } from 'app/services/main-master.service';
import { replaceFakePath } from 'app/config/dataString';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { TransactionRunningService } from 'app/services/transaction-running.service';
import { TransactionRunning } from 'app/models/transaction-running.model';
import { MasDocumentMainService } from 'app/services/mas-document-main.service';
import { SidebarService } from 'app/shared/sidebar/sidebar.component';
import { setViewSuspect } from '../suspect-modal/suspect-modal.component';
import swal from 'sweetalert2';
import { clearFormArray } from 'app/pages/arrests/arrest.helper';

@Component({
    selector: 'app-investigate-detail-manage',
    templateUrl: './detail-manage.component.html'
})
export class DetailManageComponent implements OnInit, OnDestroy {

    private destroy$: Subject<boolean> = new Subject<boolean>();
    private obInvest: Observable<fromModels.InvestigateModel>;
    stateInvest: fromModels.InvestigateModel;

    modal: any;
    _dateStartFrom: any;
    _dateStartTo: any;

    card1 = true;
    card2 = true;
    card3 = true;
    card4 = true;
    card5 = true;
    card6 = true;
    card7 = true;

    isRequired: boolean = false;
    _isSuccess: boolean;
    private mode: string;
    invesDetailId: string;
    private investMode: string;
    investCode: string;
    investigateSeq: string;

    showEditField: boolean;
    investigateFG: FormGroup;

    readonly myDatePickerOptions = MyDatePickerOptions;
    readonly lawbreakerType = fromGobalModels.LawbreakerTypes;
    readonly entityType = fromGobalModels.EntityTypes;
    readonly contributorInvestType = fromGobalModels.ContributorInvestType;
    readonly valueofNews = fromGobalModels.ValueofNews;
    readonly costofNews = fromGobalModels.CostofNews;

    readonly runningTable = 'ops_investigate';
    readonly runningOfficeCode = localStorage.getItem('officeCode');
    readonly runningPrefix = 'AI';
    readonly officeName = localStorage.getItem('officeShortName');
    readonly documentType = '3';

    @ViewChild('printDocModal') printDocModal: ElementRef;

    typeheadOffice = new Array<fromGobalModels.MasOfficeModel>();
    typeheadStaff = new Array<fromGobalModels.MasStaffModel>();
    typeheadRegion = new Array<fromGobalModels.RegionModel>();
    typeheadProduct = new Array<fromGobalModels.MasProductModel>();
    typeheadQtyUnit = new Array<fromGobalModels.MasDutyProductUnitModel>();
    typeheadNetVolumeUnit = new Array<fromGobalModels.MasDutyProductUnitModel>();

    get InvestigateDetail(): FormArray {
        return this.investigateFG.get('InvestigateDetail') as FormArray;
    }

    get InvestigateDetailStaff(): FormArray {
        return this.investigateFG.get('InvestigateDetailStaff') as FormArray;
    }

    get InvestigateDetailSuspect(): FormArray {
        return this.investigateFG.get('InvestigateDetailSuspect') as FormArray;
    }

    get InvestigateDetailLocal(): FormArray {
        return this.investigateFG.get('InvestigateDetailLocal') as FormArray;
    }

    get InvestigateDetailProduct(): FormArray {
        return this.investigateFG.get('InvestigateDetailProduct') as FormArray;
    }

    get InvestigateDocument(): FormArray {
        return this.investigateFG.get('InvestigateDocument') as FormArray;
    }

    constructor(
        private fb: FormBuilder,
        private activeRoute: ActivatedRoute,
        private ngbModel: NgbModal,
        private navService: NavigationService,
        private mainMasterService: MainMasterService,
        private loaderService: LoaderService,
        private s_transactionRunning: TransactionRunningService,
        private s_invest: fromServices.InvestgateService,
        private s_investDetail: fromServices.InvestgateDetailService,
        private s_document: MasDocumentMainService,
        private router: Router,
        private sidebarService: SidebarService,
        private store: Store<fromStore.AppState>
    ) {
        this.obInvest = store.select(s => s.invest);
        this.obInvest
            .takeUntil(this.destroy$)
            .subscribe((x: fromModels.InvestigateModel) => this.stateInvest = x);

        this.navService.setInnerTextNextPageButton('กลับ');
    }

    ngOnInit() {
        this.sidebarService.setVersion(this.s_invest.version);

        this.createForm();

        combineLatest(this.activeRoute.params, this.activeRoute.queryParams)
            .map(results => ({ params: results[0], queryParams: results[1] }))
            .takeUntil(this.destroy$)
            .subscribe(p => {
                this.mode = p.params.mode;
                this.investMode = p.queryParams.investMode;
                this.investCode = p.queryParams.investCode;
                this.invesDetailId = p.queryParams.invesDetailId;
                this.investigateSeq = p.queryParams.InvestigateSeq;

                switch (this.mode) {
                    case 'C':
                        this.showEditField = true;
                        this.investigateFG.patchValue({
                            InvestigateSeq: this.investigateSeq
                        })
                        this.enableBtnModeC();
                        this.loadMasterData();
                        break;
                    case 'R':
                        this.enableBtnModeR();
                        this.resetConfig();
                        this.onPageLoad();
                        break;
                }
            });

        this.navService.showFieldEdit
            .takeUntil(this.destroy$)
            .subscribe(status => {
                this.showEditField = status.valueOf();
            });

        this.navService.onEdit
            .takeUntil(this.destroy$)
            .subscribe(async status => {
                if (status) {
                    await this.navService.setOnEdit(false);
                    this.onEdit();
                }
            })

        this.navService.onCancel
            .takeUntil(this.destroy$)
            .subscribe(async status => {
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

        this.navService.onSave
            .takeUntil(this.destroy$)
            .subscribe(async status => {
                if (status) {
                    await this.navService.setOnSave(false);
                    this.onSave();
                }
            });

        this.navService.onDelete
            .takeUntil(this.destroy$)
            .subscribe(async status => {
                if (status) {
                    await this.navService.setOnDelete(false);
                    this.onDelete();
                }
            });

        this.navService.onPrint
            .takeUntil(this.destroy$)
            .subscribe(async status => {
                if (status) {
                    await this.navService.setOnPrint(false);
                    this.modal = this.ngbModel.open(this.printDocModal, { size: 'lg', centered: true });
                }
            })

        this.navService.onNextPage
            .takeUntil(this.destroy$)
            .subscribe(async status => {
                if (status) {
                    await this.navService.setOnNextPage(false);
                    this.navigateToManage();
                }
            })
    }

    private resetConfig() {
        let routerConfig = this.router['config'];
        routerConfig
            .find(x => x.path == 'suppression/investigation')['_loadedConfig'].routes // core investigation path
            .filter(x => x.path.indexOf('detail-manage') >= 0) // curent path
            .map(x => {
                x.data.urls
                    .find(y => y.url.indexOf('suppression/investigation/manage') >= 0)
                    .url = `/suppression/investigation/manage/R/${this.investCode}`; // previous path
                return x;
            })
        this.router.resetConfig(routerConfig);
    }

    private enableBtnModeC() {
        // set false
        this.navService.setPrintButton(false);
        this.navService.setEditButton(false);
        this.navService.setDeleteButton(false);
        this.navService.setEditField(false);
        this.navService.setPrevPageButton(false);
        this.navService.setNextPageButton(false);
        // set true 
        this.navService.setSaveButton(true);
        this.navService.setCancelButton(true);
    }

    private enableBtnModeR() {
        // set false
        this.navService.setSaveButton(false);
        this.navService.setCancelButton(false);
        this.navService.setPrevPageButton(false);
        // set true
        this.navService.setPrintButton(true);
        this.navService.setEditButton(true);
        this.navService.setDeleteButton(true);
        this.navService.setEditField(true);
        this.navService.setNextPageButton(true);
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

    async onPageLoad() {
        this.loaderService.show();
        let invest = await this.s_investDetail.InvestigateDetailgetByCon(this.invesDetailId).then(async (x: fromModels.InvestigateDetail) => {
            if (!this.checkResponse(x)) return;
            
            let invest = this.investigateFG;
            x.InvestigateDateStart = setDateMyDatepicker(x.InvestigateDateStart);
            x.InvestigateDateEnd = setDateMyDatepicker(x.InvestigateDateEnd);
            // x.InvestigateSeq = this.investigateSeq;

            await this.pageRefreshStaff(x.InvestigateDetailStaff);

            await this.pageRefreshSuspect(x.InvestigateDetailSuspect);

            await this.pageRefreshLocal(x.InvestigateDetailLocal);

            await this.pageRefreshProduct(x.InvestigateDetailProduct);

            await this.pageRefreshDocument(this.invesDetailId);

            invest.patchValue(x);
        })
        Promise.all([invest]);
        this.loaderService.hide();
    }

    private async pageRefreshStaff(staff: fromModels.InvestigateDetailStaff[]) {
        await staff.map((y, index) => {
            y.RowId = index + 1;
            y.IsModify = 'r';
            y.StaffFullName = `${y.TitleName} ${y.FirstName} ${y.LastName}`;
        });
        this.setItemFormArray(staff, 'InvestigateDetailStaff');
    }

    private async pageRefreshSuspect(suspect: fromModels.InvestigateDetailSuspect[]) {

        await suspect.map((y, index) => {
            y = setViewSuspect(y);
            y.RowId = index + 1;
            y.IsModify = 'r';
            y.FullName = `${y.SuspectTitleName} ${y.SuspectFirstName} ${y.SuspectLastName}`;
            return y;
        });
        this.setItemFormArray(suspect, 'InvestigateDetailSuspect');
    }

    private async pageRefreshLocal(local: fromModels.InvestigateDetailLocal[]) {
        await local.map((y, index) => {
            y.RowId = index + 1;
            y.IsModify = 'r';
            y.Floor = y.Floor || null;
            if (y.SubDistrictCode && y.DistrictCode && y.ProvinceCode) {
                y.Region = `${y.SubDistrict} ${y.District} ${y.Province}`
            }
        });
        this.setItemFormArray(local, 'InvestigateDetailLocal');
    }

    private async pageRefreshProduct(product: fromModels.InvestigateDetailProduct[]) {
        await product.map((y, index) => {
            y.RowId = index + 1;
            y.IsModify = 'r';
        });
        this.setItemFormArray(product, 'InvestigateDetailProduct');
    }

    private async pageRefreshDocument(investDetailId: string) {
        let _doc = new Array<fromModels.InvestigateDocumentModel>();

        await this.s_document.MasDocumentMaingetAll(this.documentType, investDetailId)
            .then((x) => {
                if (!this.checkResponse(x)) return;
                _doc = x.map(y => {
                    y.IsModify = 'r';
                    return y;
                });
            }).catch((error) => this.catchError(error));

        if (!_doc.length) return;

        _doc.map((y, index) => y.RowId = index + 1);
        this.setItemFormArray(_doc, 'InvestigateDocument');
    }

    onSDateChange(event: IMyDateModel) {
        this._dateStartFrom = event
        this._dateStartTo = this._dateStartTo || this.investigateFG.value.DateEnd
        this.checkDate();
    }

    onEDateChange(event: IMyDateModel) {
        this._dateStartFrom = this._dateStartFrom || this.investigateFG.value.DateStart
        this._dateStartTo = event
        this.checkDate()
    }

    private checkDate() {
        if (this._dateStartFrom && this._dateStartTo) {

            let sdate = getDateMyDatepicker(this._dateStartFrom);
            let edate = getDateMyDatepicker(this._dateStartTo);

            if (!compareDate(sdate, edate)) {
                swal('', Message.checkDate, 'warning')
                setTimeout(() => {
                    this.investigateFG.patchValue({
                        InvestigateDateEnd: setDateMyDatepicker(this._dateStartFrom)
                    })
                }, 0);
            }
        }
    }

    // isObject = (obj) => obj === Object(obj);

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

    private setItemFormArray(array: any[], formControl: string) {
        if (array !== undefined && array.length) {
            const itemFGs = array.map(item => this.fb.group(item));
            const itemFormArray = this.fb.array(itemFGs);
            this.investigateFG.setControl(formControl, itemFormArray);
        }
    }

    endLoader = () => this.loaderService.hide();

    addStaff() {
        const lastIndex = this.InvestigateDetailStaff.length - 1;
        let item = new fromModels.InvestigateDetailStaff();
        item.StaffID = null;
        item.ProgramCode = null;
        item.ProcessCode = null;
        item.InvestigateDetailID = null;
        item.StaffFullName = null;
        item.StaffCode = null;
        item.TitleName = null;
        item.FirstName = null;
        item.LastName = null;
        item.PositionCode = null;
        item.PositionName = null;
        item.PosLevel = null;
        item.PosLevelName = null;
        item.DepartmentCode = null;
        item.DepartmentName = null;
        item.DepartmentLevel = null;
        item.OfficeCode = null;
        item.OfficeName = null;
        item.OfficeShortName = null;
        item.ContributorID = null;
        item.IsActive = null;
        item.IsModify = 'c'
        if (lastIndex < 0) {
            item.RowId = 1;
            this.InvestigateDetailStaff.push(this.fb.group(item));
            return;
        }
        const lastDoc = this.InvestigateDetailStaff.at(lastIndex).value;
        if (lastDoc.ContributorID) {
            item.RowId = lastDoc.RowId + 1;
            this.InvestigateDetailStaff.push(this.fb.group(item));
        }
    }

    addSuspect(suspect: fromModels.InvestigateDetailSuspect) {
        suspect.RowId = 1;
        suspect.IsModify = 'c';

        this.InvestigateDetailSuspect.push(this.fb.group(suspect))
        let sort = this.sortFormArray(this.InvestigateDetailSuspect.value);
        sort.then(x => this.setItemFormArray(x, 'InvestigateDetailSuspect'))
            .catch((error) => this.catchError(error));
    }

    addLocal() {
        const lastIndex = this.InvestigateDetailLocal.length - 1;
        let item = new fromModels.InvestigateDetailLocal();
        item.LocalID = null;
        item.InvestigateDetailID = null;
        item.GPS = null;
        item.Location = null;
        item.Address = null;
        item.Village = null;
        item.Building = null;
        item.Room = null;
        item.Alley = null;
        item.Road = null;
        item.Floor = null;
        item.SubDistrictCode = null;
        item.SubDistrict = null;
        item.DistrictCode = null;
        item.District = null;
        item.ProvinceCode = null;
        item.Province = null;
        item.ZipCode = null;
        item.IsActive = 1;
        item.Region = '';
        item.IsModify = 'c';
        if (lastIndex < 0) {
            item.RowId = 1;
            this.InvestigateDetailLocal.push(this.fb.group(item));
            return;
        }
        const lastDoc = this.InvestigateDetailLocal.at(lastIndex).value;
        if (lastDoc.Address) {
            item.RowId = lastDoc.RowId + 1;
            this.InvestigateDetailLocal.push(this.fb.group(item));
        }
    }

    addProduct() {
        const lastIndex = this.InvestigateDetailProduct.length - 1;
        let item = new fromModels.InvestigateDetailProduct();
        item.ProductID = null;
        item.InvestigateDetailID = null;
        item.GroupCode = '1';
        item.GroupName = null;
        item.IsDomestic = null;
        item.ProductCode = null;
        item.BrandCode = null;
        item.BrandNameTH = null;
        item.BrandNameEN = null;
        item.SubBrandCode = null;
        item.SubBrandNameTH = null;
        item.SubBrandNameEN = null;
        item.ModelCode = null;
        item.ModelName = null;
        item.FixNo1 = null;
        item.DegreeCode = null;
        item.Degree = null;
        item.SizeCode = null;
        item.Size = null;
        item.SizeUnitCode = null;
        item.SizeUnitName = null;
        item.FixNo2 = null;
        item.SequenceNo = null;
        item.ProductDesc = '';
        item.CarNo = null;
        item.Qty = null;
        item.QtyUnit = null;
        item.NetVolume = null;
        item.NetVolumeUnit = '';
        item.IsActive = null;
        item.IsModify = 'c';
        item.GroupCode = '1';
        if (lastIndex < 0) {
            item.RowId = 1;
            this.InvestigateDetailProduct.push(this.fb.group(item));
            return;
        }
        const lastDoc = this.InvestigateDetailProduct.at(lastIndex).value;
        if (lastDoc.ProductDesc) {
            item.RowId = lastDoc.RowId + 1;
            this.InvestigateDetailProduct.push(this.fb.group(item));
        }
    }

    addDocument() {
        const lastIndex = this.InvestigateDocument.length - 1;
        let item = new fromModels.InvestigateDocumentModel();
        item.DocumentType = this.documentType;
        item.DataSource = null;
        item.FilePath = null;
        item.IsModify = 'c';
        if (lastIndex < 0) {
            item.RowId = 1;
            this.InvestigateDocument.push(this.fb.group(item));
            return;
        }
        const lastItem = this.InvestigateDocument.at(lastIndex).value;
        if (lastItem.DataSource && lastItem.FilePath) {
            item.RowId = lastItem.RowId + 1;
            this.InvestigateDocument.push(this.fb.group(item));
        }
    }

    changeArrestDoc(e: any, index: number) {
        const file = e.target.files[0];
        if (file != undefined) {
            this.InvestigateDocument.at(index).patchValue({
                FilePath: replaceFakePath(e.target.value),
                IsActive: 1
            })
        }
    }

    deleteStaff(i: number) {
        this.deleteFormArray(this.InvestigateDetailStaff, i, 'InvestigateDetailStaff');
    }

    deleteSuspect(i: number) {
        this.deleteFormArray(this.InvestigateDetailSuspect, i, 'InvestigateDetailSuspect');
    }

    deleteLocal(i: number) {
        this.deleteFormArray(this.InvestigateDetailLocal, i, 'InvestigateDetailLocal');
    }

    deleteProduct(i: number) {
        this.deleteFormArray(this.InvestigateDetailProduct, i, 'InvestigateDetailProduct');
    }

    deleteDocument(i: number) {
        this.deleteFormArray(this.InvestigateDocument, i, 'InvestigateDocument');
    }

    private createForm() {
        this.investigateFG = this.fb.group({
            InvestigateDetailID: new FormControl(null),
            InvestigateCode: new FormControl(null),
            InvestigateSeq: new FormControl(null, Validators.required),
            StationCode: new FormControl(this.runningOfficeCode),
            StationName: new FormControl(this.officeName),
            InvestigateDateStart: new FormControl(null, Validators.required),
            InvestigateDateEnd: new FormControl(null),
            ConfidenceOfNews: new FormControl(null, Validators.required),
            ValueOfNews: new FormControl(null, Validators.required),
            InvestigateDetail: new FormControl(null, Validators.required),
            IsActive: new FormControl(1, Validators.required),
            InvestigateDetailStaff: this.fb.array([]),
            InvestigateDetailProduct: this.fb.array([]),
            InvestigateDetailLocal: this.fb.array([]),
            InvestigateDetailSuspect: this.fb.array([]),
            InvestigateDocument: this.fb.array([])
        });
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

    formatterStaff = (x: { TitleName: string, FirstName: string, LastName: string }) =>
        `${x.TitleName} ${x.FirstName} ${x.LastName}`

    formatterRegion = (x: { SubdistrictNameTH: string, DistrictNameTH: string, ProvinceNameTH: string }) =>
        `${x.SubdistrictNameTH || ''} ${x.DistrictNameTH || ''} ${x.ProvinceNameTH || ''}`;

    formatterProduct = (x: { ProductDesc: string }) => x.ProductDesc;

    formatterOffice = (x: { OfficeName: string }) => x.OfficeName;

    formatterUnit = (DutyCode: string) => DutyCode;

    selectItemLocaleRegion(e, i) {
        this.InvestigateDetailLocal.at(i).patchValue({
            SubDistrictCode: e.item.SubdistrictCode,
            SubDistrict: e.item.SubdistrictNameTH,
            DistrictCode: e.item.DistrictCode,
            District: e.item.DistrictNameTH,
            ProvinceCode: e.item.ProvinceCode,
            Province: e.item.ProvinceNameTH,
            Region: `${e.item.SubdistrictNameTH} ${e.item.DistrictNameTH} ${e.item.ProvinceNameTH}`
        })
    }

    selectItemProductItem(e, i) {
        const product = this.InvestigateDetailProduct.at(i).value;
        this.InvestigateDetailProduct.at(i).reset(e.item);
        this.InvestigateDetailProduct.at(i).patchValue({
            ProductType: e.item.ProductID ? '1' : '2',
            ProductID: product.ProductID || e.item.ProductID,
            IsModify: product.IsModify == 'r' ? 'u' : product.IsModify,
            RowId: product.RowId,
            GroupCode: e.item.GroupCode || product.GroupCode,
            GroupName: e.item.GroupName || e.item.GroupCode || product.GroupCode,
            IsDomestic: e.item.IsDomestic || product.IsDomestic,
            // ProductFrom: product.IsModify == 'c' ? 'mas-product' : product.ProductFrom
        })
    }

    onChangeProductDesc(e, i) {
        this.InvestigateDetailProduct.at(i).patchValue({
            ProductDesc: e.target.value
        })
    }

    selectItemStaff(e, i) {
        let staff: fromModels.InvestigateDetailStaff = this.InvestigateDetailStaff.at(i).value;
        this.InvestigateDetailStaff.at(i).reset(e.item);
        this.InvestigateDetailStaff.at(i).patchValue({
            IsModify: staff.IsModify == 'r' ? 'u' : staff.IsModify,
            RowId: staff.RowId,
            StaffFullName: `${e.item.TitleName} ${e.item.FirstName} ${e.item.LastName}`,
            ProgramCode: 2,
            ProcessCode: '02',
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
        let staff = this.InvestigateDetailStaff.at(i).value;
        this.InvestigateDetailStaff.at(i).patchValue({
            ContributorCode: contributerId,
            IsModify: staff.IsModify == 'r' ? 'u' : staff.IsModify
        })
    }

    selectItemOffice(e) {
        this.investigateFG.patchValue({
            ArrestStationCode: e.item.OfficeCode,
            ArrestStation: e.item.OfficeName
        })
    }

    onChangeArrestStation(e: any) {
        this.investigateFG.patchValue({
            ArrestStation: e.target.value
        })
    }

    selectItemQtyUnit(e: any, i: number) {
        this.InvestigateDetailProduct.at(i).patchValue({
            QtyUnit: e.item.DutyCode,
        })
    }

    changeItemQtyUnit(e: any, i: number) {
        const qty = this.typeheadQtyUnit.find(x => x.DutyCode == e.target.value);
        this.InvestigateDetailProduct.at(i).patchValue({
            QtyUnit: qty ? qty.DutyCode : '',
        })
    }

    selectItemNetVolumeUnit(e: any, i: number) {
        this.InvestigateDetailProduct.at(i).patchValue({
            NetVolumeUnit: e.item.DutyCode,
        })
    }

    async clearForm() {
        this.investigateFG.reset();
        clearFormArray(this.InvestigateDetailStaff);
        clearFormArray(this.InvestigateDetailSuspect);
        clearFormArray(this.InvestigateDetailLocal);
        clearFormArray(this.InvestigateDetailProduct);
        clearFormArray(this.InvestigateDocument);
    }

    async ngOnDestroy(): Promise<void> {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
        await this.clearForm();
    }

    openModal(e) {
        this.modal = this.ngbModel.open(e, { size: 'lg', centered: true });
    }

    saveFail() {
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

    catchError(error: any) {
        console.log(error);
        this._isSuccess = false;
        this.endLoader();
    }

    async onComplete() {
        if (this._isSuccess) {
            swal({
                title: '',
                text: Message.saveComplete,
                type: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok'
            }).then(async (result) => {
                if (result.value) {
                    await this.clearForm();
                    switch (this.mode) {
                        case 'C':
                            await this.store.dispatch(new fromStore.RemoveInvestigate);
                            this.onRefreshPage();
                            break;
                        case 'R':
                            this.onPageLoad();
                            break;
                    }
                }
            });

        } else {
            swal('', Message.saveFail, 'error')
        }
    }

    private navigateToManage = () => this.router.navigate([`/suppression/investigation/manage`, this.investMode, this.investCode]);

    private onRefreshPage = () => this.router.navigate(
        [`/suppression/investigation/detail-manage`, 'R'],
        {
            queryParams: {
                investMode: this.investMode,
                investCode: this.investCode,
                invesDetailId: this.invesDetailId
            }
        });

    private async onEdit() {
        if (
            !this.typeheadStaff.length &&
            !this.typeheadOffice.length &&
            !this.typeheadProduct.length &&
            !this.typeheadQtyUnit.length &&
            !this.typeheadNetVolumeUnit.length &&
            !this.typeheadRegion.length
        ) {
            await this.loadMasterData();
        }
    }

    private onCancel() {
        switch (this.mode) {
            case 'C':
                this.navigateToManage();
                break;
            case 'R':
                this.onRefreshPage();
                break;
        }
    }

    private async onDelete() {
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
                this.s_investDetail.InvestigateDetailupdDelete(this.invesDetailId)
                    .takeUntil(this.destroy$)
                    .subscribe(x => {
                        if (this.checkIsSuccess(x)) {
                            swal('', Message.delComplete, 'success');
                            this.navigateToManage();
                        } else {
                            swal('', Message.delFail, 'error');
                        }
                    })
            }
        })
    }

    private async onSave() {

        if (this.investigateFG.invalid) {
            swal('', Message.checkData, 'warning');
            this.isRequired = true;
            return;
        }

        let staff: fromModels.InvestigateDetailStaff[] = this.InvestigateDetailStaff.value.filter(x => x.IsModify != 'd');
        if (staff.length) {
            if (staff.filter(x => x.ContributorID == '2').length <= 0) {
                swal('', 'ส่วนผู้ร่วมทำการสืบสวน ต้องมีรายการที่ฐานะเป็น “ผู้ดูแลการสืบสวน” อย่างน้อย 1 รายการ', 'warning')
                return;
            }

            if (staff.filter(x => x.ContributorID == '2').length > 1) {
                swal('', 'ส่วนผู้ร่วมทำการสืบสวน รายการที่ฐานะเป็น “ผู้ดูแลการสืบสวน” ต้องมีได้แค่ 1 รายการเท่านั้น', 'warning')
                return;
            }

            if (staff.filter(x => x.ContributorID == '3').length > 1) {
                swal('', 'ส่วนผู้ร่วมทำการสืบสวน รายการที่ฐานะเป็น “ผู้สั่งการ” ต้องมีได้แค่ 1 รายการเท่านั้น', 'warning')
                return;
            }
        } else {
            swal('', 'ส่วนผู้ร่วมทำการสืบสวน ต้องมีรายการที่ฐานะเป็น “ผู้ดูแลการสืบสวน” อย่างน้อย 1 รายการ', 'warning')
            return;
        }

        let local: fromModels.InvestigateDetailLocal[] = this.InvestigateDetailLocal.value.filter(x => x.IsModify != 'd');
        if (local.length) {
            if (local.filter(x => x.Region == '').length > 1) {
                swal('', 'ส่วนสถานที่ทำการสืบสวน กรุณาระบุ “ตำบล/อำเภอ/จังหวัด”', 'warning')
            }
        } else {
            swal('', 'ส่วนสถานที่ทำการสืบสวน ต้องมีอย่างน้อย 1 รายการ', 'warning');
        }

        switch (this.mode) {
            case 'C':
                if (this.investCode == 'NEW') {
                    await this.createWithOutInvestCode();
                } else {
                    await this.createWithInvestCode();
                }
                break;
            case 'R':
                await this.onRevice();
                break;
        }
    }

    private async createWithInvestCode() {
        this.loaderService.show();
        await this.insertInvestigateDetail(this.investCode);

        this.onComplete();

        this.loaderService.hide();
    }

    private async createWithOutInvestCode() {
        this.loaderService.show();
        await this.getTransactionRunning();

        this.onComplete();

        this.loaderService.hide();
    }

    private async onRevice() {
        this.loaderService.show();
        await this.updateInvestigateDetail();
        this.onComplete();

        this.loaderService.hide();
    }

    private async getTransactionRunning() {

        let resRunning: any[] = await this.s_transactionRunning
            .TransactionRunninggetByCon(this.runningTable, this.runningOfficeCode)
            .then((x: TransactionRunning[]) => {
                if (!this.checkResponse(x)) return;
                return x;
            })
        let investCode: string;
        if (resRunning.length) {
            let tr = resRunning.sort((a, b) => b.RunningNo - a.RunningNo)[0] // sort desc
            let str = '' + (tr.RunningNo + 1)
            let pad = '00000';
            let ans = pad.substring(0, pad.length - str.length) + str
            investCode = `${tr.RunningPrefix}${tr.RunningOfficeCode}${tr.RunningYear}${ans}`;

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
                    investCode = `${this.runningPrefix}${this.runningOfficeCode}${year}${ans}`;
                    return true;
                }, () => { this.saveFail(); return; })
                .catch((error) => this.catchError(error));
        }

        if (investCode)
            await this.insertInvestigate(investCode);
    }

    private async insertInvestigate(investCode: string) {
        let invest = this.stateInvest;
        invest.InvestigateCode = investCode;
        invest.DateStart = setZeroHours(invest.DateStart);
        invest.DateEnd = setZeroHours(invest.DateEnd);

        await this.s_invest.InvestigateinsAll(invest).then(async x => {
            if (!this.checkIsSuccess(x)) return;
            this.investCode = investCode;
            await this.insertInvestigateDetail(investCode);

            this.investMode = 'R';
            this.resetConfig();

        }, () => { this.saveFail(); return; })
            .catch((error) => this.catchError(error));
    }

    private async insertInvestigateDetail(investCode: string) {
        this.loaderService.show();
        let form: fromModels.InvestigateDetail = this.investigateFG.value;

        form.InvestigateCode = investCode;
        const dateStart = getDateMyDatepicker(form.InvestigateDateStart);
        const dateEnd = getDateMyDatepicker(form.InvestigateDateEnd);
        form.InvestigateDateStart = setZeroHours(dateStart);
        form.InvestigateDateEnd = setZeroHours(dateEnd);

        console.log("InvestigateDetailinsAll : ", JSON.stringify(form));

        await this.s_investDetail.InvestigateDetailinsAll(form).then(async x => {
            if (!this.checkIsSuccess(x)) return;
            this.invesDetailId = x.InvestigateDetailID;
            let staff = await this.modifyInvestigateDetailStaff(x.InvestigateDetailID);
            let suspect = await this.modifyInvestigateDetailSuspect(x.InvestigateDetailID);
            let local = await this.modifyInvestigateDetailLocal(x.InvestigateDetailID);
            let product = await this.modifyInvestigateDetailProduct(x.InvestigateDetailID);
            let ducument = await this.modifyMasDocument(x.InvestigateDetailID);
            return Promise.all([staff, suspect, local, product, ducument]);
        }, () => { this.saveFail(); return; })
            .catch((error) => this.catchError(error));
        this.loaderService.hide();
    }

    private async updateInvestigateDetail() {
        this.loaderService.show();
        let form: fromModels.InvestigateDetail = this.investigateFG.value;
        const dateStart = getDateMyDatepicker(form.InvestigateDateStart);
        const dateEnd = getDateMyDatepicker(form.InvestigateDateEnd);
        form.InvestigateDateStart = setZeroHours(dateStart);
        form.InvestigateDateEnd = setZeroHours(dateEnd);

        console.log("InvestigateDetailupdByCon : ", JSON.stringify(form));

        await this.s_investDetail.InvestigateDetailupdByCon(form).then(async x => {
            if (!this.checkIsSuccess(x)) return;
            let staff = await this.modifyInvestigateDetailStaff(parseInt(this.invesDetailId));
            let suspect = await this.modifyInvestigateDetailSuspect(parseInt(this.invesDetailId));
            let local = await this.modifyInvestigateDetailLocal(parseInt(this.invesDetailId));
            let product = await this.modifyInvestigateDetailProduct(parseInt(this.invesDetailId));
            let ducument = await this.modifyMasDocument(parseInt(this.invesDetailId));
            return Promise.all([staff, suspect, local, product, ducument]);
        }, () => { this.saveFail(); return; })
            .catch((error) => this.catchError(error));

        this.loaderService.hide();
    }

    private async modifyInvestigateDetailStaff(investDetailId: number) {
        const staff = await this.InvestigateDetailStaff.value
            .map(async (x: fromModels.InvestigateDetailStaff, index) => {
                x.InvestigateDetailID = investDetailId;
                switch (x.IsModify) {
                    case 'd':
                        if (this.mode == 'C') return;
                        await this.s_investDetail.InvestigateDetailStaffupdDelete(x.StaffID.toString())
                            .then(y => {
                                if (!this.checkIsSuccess(y)) return;
                            }, () => { this.saveFail(); return; })
                            .catch((error) => this.catchError(error));
                        break;
                    case 'c':
                        if (this.mode == 'C') return;
                        await this.s_investDetail.InvestigateDetailStaffinsAll(x)
                            .then(y => {
                                if (!this.checkIsSuccess(y)) return;
                            }, () => { this.saveFail(); return; })
                            .catch((error) => this.catchError(error));
                        break;
                    case 'u':
                    case 'r':
                        await this.s_investDetail.InvestigateDetailStaffupdByCon(x)
                            .then(y => {
                                if (!this.checkIsSuccess(y)) return;
                            }, () => { this.saveFail(); return; })
                            .catch((error) => this.catchError(error));
                        break;
                }
            })
        return Promise.all(staff);
    }

    private async modifyInvestigateDetailSuspect(investDetailId: number) {
        const suspect = await this.InvestigateDetailSuspect.value
            .map(async (x: fromModels.InvestigateDetailSuspect) => {
                x.InvestigateDetailID = investDetailId;
                switch (x.IsModify) {
                    case 'd':
                        if (this.mode == 'C') return;
                        await this.s_investDetail.InvestigateDetailSuspectupdDelete(x.SuspectID.toString())
                            .then(y => {
                                if (!this.checkIsSuccess(y)) return;
                            }, () => { this.saveFail(); return; })
                            .catch((error) => this.catchError(error));
                        break;
                    case 'c':
                        await this.s_investDetail.InvestigateDetailSuspectinsAll(x)
                            .then(y => {
                                if (!this.checkIsSuccess(y)) return;
                            }, () => { this.saveFail(); return; })
                            .catch((error) => this.catchError(error));
                        break;
                }
            });
        return Promise.all(suspect);
    }

    private async modifyInvestigateDetailLocal(investDetailId: number) {
        const product = await this.InvestigateDetailLocal.value
            .map(async (x: fromModels.InvestigateDetailLocal, index) => {
                x.InvestigateDetailID = investDetailId;
                switch (x.IsModify) {
                    case 'd':
                        if (this.mode == 'C') return;
                        await this.s_investDetail.InvestigateDetailLocalupdDelete(x.LocalID.toString())
                            .then(y => {
                                if (!this.checkIsSuccess(y)) return;
                            }, () => { this.saveFail(); return; })
                            .catch((error) => this.catchError(error));
                        break;
                    case 'c':
                        if (this.mode == 'C') return;
                        await this.s_investDetail.InvestigateDetailLocalinsAll(x)
                            .then(y => {
                                if (!this.checkIsSuccess(y)) return;
                            }, () => { this.saveFail(); return; })
                            .catch((error) => this.catchError(error));
                        break;
                    case 'u':
                    case 'r':
                        await this.s_investDetail.InvestigateDetailLocalupdByCon(x)
                            .then(y => {
                                if (!this.checkIsSuccess(y)) return;
                            }, () => { this.saveFail(); return; })
                            .catch((error) => this.catchError(error));
                        break;
                }
            });
        return Promise.all(product);
    }

    private async modifyInvestigateDetailProduct(investDetailId: number) {
        const product = await this.InvestigateDetailProduct.value
            .map(async (x: fromModels.InvestigateDetailProduct) => {
                x.InvestigateDetailID = investDetailId;
                switch (x.IsModify) {
                    case 'd':
                        if (this.mode == 'C') return;
                        await this.s_investDetail.InvestigateDetailProductupdDelete(x.ProductID.toString())
                            .then(y => {
                                if (!this.checkIsSuccess(y)) return;
                            }, () => { this.saveFail(); return; })
                            .catch((error) => this.catchError(error));
                        break;
                    case 'c':
                        await this.s_investDetail.InvestigateDetailProductinsAll(x)
                            .then(y => {
                                if (!this.checkIsSuccess(y)) return;
                            }, () => { this.saveFail(); return; })
                            .catch((error) => this.catchError(error));
                        break;
                    case 'u':
                    case 'r':
                        await this.s_investDetail.InvestigateDetailProductupdByCon(x)
                            .then(y => {
                                if (!this.checkIsSuccess(y)) return;
                            }, () => { this.saveFail(); return; })
                            .catch((error) => this.catchError(error));
                        break;
                }
            });
        return Promise.all(product);
    }

    private async modifyMasDocument(investDetailId: number) {
        const document = await this.InvestigateDocument.value
            .map(async (x: fromModels.InvestigateDocumentModel) => {
                x.ReferenceCode = investDetailId.toString();
                switch (x.IsModify) {
                    case 'd':
                        this.s_document.MasDocumentMainupdDelete(x.DocumentID.toString())
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
                    case 'r':
                        this.s_document.MasDocumentMainupdByCon(x)
                            .then(y => {
                                if (!this.checkIsSuccess(y)) return;
                            }, () => { this.saveFail(); return; })
                            .catch((error) => this.catchError(error));
                        break;
                }
            })
        return Promise.all(document);
    }



}
