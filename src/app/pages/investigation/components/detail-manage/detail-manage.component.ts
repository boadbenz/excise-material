import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import { NavigationService } from 'app/shared/header-navigation/navigation.service';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Subject } from 'rxjs/Subject';
import { MyDatePickerOptions, setDateMyDatepicker, compareDate, getDateMyDatepicker } from 'app/config/dateFormat';
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
import { InvestigateDetailStaff } from '../../models';


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

    _isSuccess: boolean;
    private mode: string;
    invesDetailId: string;
    private investMode: string;
    investCode: string;

    showEditField: boolean;
    printDocModel: any;
    investigateFG: FormGroup;

    readonly myDatePickerOptions = MyDatePickerOptions;
    readonly lawbreakerType = fromGobalModels.LawbreakerTypes;
    readonly entityType = fromGobalModels.EntityTypes;
    readonly contributorInvestType = fromGobalModels.ContributorInvestType;
    readonly valueofNews = fromGobalModels.ValueofNews;
    readonly costofNews = fromGobalModels.CostofNews;

    readonly runningTable = 'ops_investigate';
    readonly runningOfficeCode = '900012';
    readonly runningPrefix = 'AI';
    readonly documentType = '3';

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
        private store: Store<fromStore.AppState>
    ) {
        this.obInvest = store.select(s => s.invest);
        this.obInvest
            .takeUntil(this.destroy$)
            .subscribe((x: fromModels.InvestigateModel) => this.stateInvest = x);

        this.navService.setInnerTextNextPageButton('กลับ');
    }

    ngOnInit() {
        this.createForm();

        combineLatest(this.activeRoute.params, this.activeRoute.queryParams)
            .map(results => ({ params: results[0], queryParams: results[1] }))
            .takeUntil(this.destroy$)
            .subscribe(p => {
                this.mode = p.params.mode;
                this.investMode = p.queryParams.investMode;
                this.investCode = p.queryParams.investCode;
                this.invesDetailId = p.queryParams.invesDetailId;

                switch (this.mode) {
                    case 'C':
                        this.showEditField = true;
                        this.enableBtnModeC();
                        this.loadMasterData();
                        break;
                    case 'R':
                        this.enableBtnModeR();
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
                    if (confirm(Message.confirmAction)) {
                        this.onCancel();
                    }
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
                    this.modal = this.ngbModel.open(this.printDocModel, { size: 'lg', centered: true });
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
        this.navService.setNextPageButton(false);
        // set true
        this.navService.setPrintButton(true);
        this.navService.setEditButton(true);
        this.navService.setDeleteButton(true);
        this.navService.setEditField(true);
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

    onPageLoad() {
        this.s_investDetail.InvestigateDetailgetByCon(this.invesDetailId).then((x: fromModels.InvestigateDetail) => {
            if (!this.checkResponse(x)) return;

            let invest = this.investigateFG;
            x.InvestigateDateStart = setDateMyDatepicker(x.InvestigateDateStart);
            x.InvestigateDateEnd = setDateMyDatepicker(x.InvestigateDateEnd);

            this.pageRefreshStaff(x.InvestigateDetailStaff);

            this.pageRefreshSuspect(x.InvestigateDetailSuspect);

            this.pageRefreshLocal(x.InvestigateDetailLocal);

            this.pageRefreshProduct(x.InvestigateDetailProduct);

            invest.patchValue(x);
        })
    }

    pageRefreshStaff(staff: fromModels.InvestigateDetailStaff[]) {
        staff.map((y, index) => y.RowId = index + 1);
        this.setItemFormArray(staff, 'InvestigateDetailStaff');
    }

    pageRefreshSuspect(suspect: fromModels.InvestigateDetailSuspect[]) {
        suspect.map((y, index) => y.RowId = index + 1);
        this.setItemFormArray(suspect, 'InvestigateDetailSuspect');
    }

    pageRefreshLocal(local: fromModels.InvestigateDetailLocal[]) {
        local.map((y, index) => y.RowId = index + 1);
        this.setItemFormArray(local, 'InvestigateDetailLocal');
    }

    pageRefreshProduct(product: fromModels.InvestigateDetailProduct[]) {
        product.map((y, index) => y.RowId = index + 1);
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

            let sdate = this.isObject(this._dateStartFrom)
                ? getDateMyDatepicker(this._dateStartFrom)
                : new Date(this._dateStartFrom);
            let edate = this.isObject(this._dateStartTo)
                ? getDateMyDatepicker(this._dateStartTo)
                : new Date(this._dateStartTo);

            if (!compareDate(sdate, edate)) {
                alert(Message.checkDate)
                setTimeout(() => {
                    this.investigateFG.patchValue({
                        InvestigateDateEnd: this.isObject(this._dateStartFrom)
                            ? { date: this._dateStartFrom.date }
                            : setDateMyDatepicker(this._dateStartFrom)
                    })
                }, 0);
            }
        }
    }

    isObject = (obj) => obj === Object(obj);

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
        item.Region = null;
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
        item.GroupName = null;
        item.GroupCode = '1';
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
        item.ProductDesc = null;
        item.CarNo = null;
        item.Qty = null;
        item.QtyUnit = null;
        item.NetVolume = null;
        item.NetVolumeUnit = null;
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
        this.InvestigateDocument.at(index).patchValue({
            ReferenceCode: this.investCode,
            FilePath: replaceFakePath(e.target.value),
            IsActive: 1
        })
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
            InvestigateCode: new FormControl(null),
            InvestigateSeq: new FormControl(null, Validators.required),
            StationCode: new FormControl(null),
            StationName: new FormControl(null),
            InvestigateDateStart: new FormControl(null, Validators.required),
            InvestigateDateEnd: new FormControl(null, Validators.required),
            ConfidenceOfNews: new FormControl(null, Validators.required),
            ValueOfNews: new FormControl(null, Validators.required),
            InvestigateDetail: new FormControl(null, Validators.required),
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

    selectItemLocaleRegion(e) {
        this.InvestigateDetailLocal.at(0).patchValue({
            SubDistrictCode: e.item.SubdistrictCode,
            SubDistrict: e.item.SubdistrictNameTH,
            DistrictCode: e.item.DistrictCode,
            District: e.item.DistrictNameTH,
            ProvinceCode: e.item.ProvinceCode,
            Province: e.item.ProvinceNameTH,
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
            FullName: `${e.item.TitleName} ${e.item.FirstName} ${e.item.LastName}`,
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

    selectItemNetVolumeUnit(e: any, i: number) {
        this.InvestigateDetailProduct.at(i).patchValue({
            NetVolumeUnit: e.item.DutyCode,
        })
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
        this.investigateFG.reset();
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

    clearFormArray = (formArray: FormArray) => {
        while (formArray.length !== 0) {
            formArray.removeAt(0)
        }
    }

    onComplete() {
        if (this._isSuccess) {
            setTimeout(() => {
                this.store.dispatch(new fromStore.RemoveInvestigate);
                this.investigateFG.reset();
                this.clearFormArray(this.InvestigateDetailStaff);
                this.clearFormArray(this.InvestigateDetailSuspect);
                this.clearFormArray(this.InvestigateDetailLocal);
                this.clearFormArray(this.InvestigateDetailProduct);
                this.clearFormArray(this.InvestigateDocument);
            }, 300);

            alert(Message.saveComplete)
            this.onRefreshPage();

        } else {
            alert(Message.saveFail)
        }
    }

    private navigateToManage = () => this.router.navigate([`investigation/manage`, this.investMode, this.investCode])

    private onRefreshPage = () => this.router.navigate(
        [`investigation/detail-manage`, 'R'],
        {
            queryParams: {
                investMode: this.investMode,
                investCode: this.investCode,
                invesDetailId: this.invesDetailId
            }
        });

    private async onEdit() {
        await this.loadMasterData();
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
        if (confirm(Message.confirmAction)) {
            this.s_investDetail.InvestigateDetailupdDelete(this.invesDetailId).then(x => {
                if (!this.checkResponse(x)) {
                    alert(Message.delComplete);
                    this.navigateToManage();
                } else {
                    alert(Message.delFail);
                }
            })
        }
    }

    private async onSave() {
        if (!this.stateInvest) {
            alert('กรุณาย้อนกลับไประบุ ข้อมูลรายงานการสืบสวน');
            return;
        }

        if (!this.stateInvest.InvestigateNo || !this.stateInvest.DateStart || !this.stateInvest.DateEnd) {
            alert('กรุณาย้อนกลับไประบุ ข้อมูลรายงานการสืบสวน');
            return;
        }

        if (this.investigateFG.invalid) {
            alert(Message.checkData);
            return;
        }

        let staff: fromModels.InvestigateDetailStaff[] = this.InvestigateDetailStaff.value.filter(x => x.IsModify != 'd');
        if (staff.length) {
            if (staff.filter(x => x.ContributorID == '2').length <= 0) {
                alert('ส่วนผู้ร่วมทำการสืบสวน ต้องมีรายการที่ฐานะเป็น “ผู้ดูแลการสืบสวน” อย่างน้อย 1 รายการ')
                return;
            }

            if (staff.filter(x => x.ContributorID == '2').length > 1) {
                alert('ส่วนผู้ร่วมทำการสืบสวน รายการที่ฐานะเป็น “ผู้ดูแลการสืบสวน” ต้องมีได้แค่ 1 รายการเท่านั้น')
                return;
            }

            if (staff.filter(x => x.ContributorID == '3').length > 1) {
                alert('ส่วนผู้ร่วมทำการสืบสวน รายการที่ฐานะเป็น “ผู้สั่งการ” ต้องมีได้แค่ 1 รายการเท่านั้น')
                return;
            }
        } else {
            alert('ส่วนผู้ร่วมทำการสืบสวน ต้องมีรายการที่ฐานะเป็น “ผู้ดูแลการสืบสวน” อย่างน้อย 1 รายการ')
            return;
        }

        let local: fromModels.InvestigateDetailLocal[] = this.InvestigateDetailLocal.value.filter(x => x.IsModify != 'd');
        if (local.length) {
            if (local.filter(x => x.Region == '').length > 1) {
                alert('ส่วนสถานที่ทำการสืบสวน กรุณาระบุ “ตำบล/อำเภอ/จังหวัด”')
            }
        } else {
            alert('ส่วนสถานที่ทำการสืบสวน ต้องมีอย่างน้อย 1 รายการ');
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
        await this.insertInvestigate(this.investCode);

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
        this.updateInvestigateDetail();
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

        if (resRunning.length) {
            let tr = resRunning.sort((a, b) => b.RunningNo - a.RunningNo)[0] // sort desc
            let str = '' + (tr.RunningNo + 1)
            let pad = '00000';
            let ans = pad.substring(0, pad.length - str.length) + str
            this.investCode = `${tr.RunningPrefix}${tr.RunningOfficeCode}${tr.RunningYear}${ans}`;

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
                    this.investCode = `${this.runningPrefix}${this.runningOfficeCode}${year}${ans}`;
                    return true;
                }, () => { this.saveFail(); return; })
                .catch((error) => this.catchError(error));
        }

        if (this.investCode)
            await this.insertInvestigate(this.investCode);
    }

    private async insertInvestigate(investCode: string) {
        let invest = this.stateInvest;
        invest.InvestigateCode = investCode;
        await this.s_invest.InvestigateinsAll(invest).then(async x => {
            if (!this.checkIsSuccess(x)) return;

            await this.insertInvestigateDetail(investCode);

        }, () => { this.saveFail(); return; })
            .catch((error) => this.catchError(error));
    }

    private async insertInvestigateDetail(investCode: string) {
        let form: fromModels.InvestigateDetail = this.investigateFG.value;
        form.InvestigateCode = investCode;
        form.InvestigateDateStart = getDateMyDatepicker(form.InvestigateDateStart);
        form.InvestigateDateEnd = getDateMyDatepicker(form.InvestigateDateEnd);

        console.log("InvestigateDetailinsAll : ", JSON.stringify(form));

        await this.s_investDetail.InvestigateDetailinsAll(form).then(async x => {
            if (!this.checkIsSuccess(x)) return;
            this.investCode = x.InvestigateCode;
            this.invesDetailId = x.InvestigateDetailID;
            let suspect = await this.modifyInvestigateDetailSuspect(x.InvestigateDetailID);
            let product = await this.modifyInvestigateDetailProduct(x.InvestigateDetailID);
            let ducument = await this.modifyMasDocument(x.InvestigateDetailID);

            return Promise.all([suspect, product, ducument]);
        }, () => { this.saveFail(); return; })
            .catch((error) => this.catchError(error));

    }

    private updateInvestigateDetail() {
        let form: fromModels.InvestigateDetail = this.investigateFG.value;
        form.InvestigateDateStart = getDateMyDatepicker(form.InvestigateDateStart);
        form.InvestigateDateEnd = getDateMyDatepicker(form.InvestigateDateEnd);

        this.s_investDetail.InvestigateDetailupdByCon(form).then(async x => {
            if (!this.checkIsSuccess(x)) return;
            let suspect = await this.modifyInvestigateDetailSuspect(x.InvestigateDetailID);
            let product = await this.modifyInvestigateDetailProduct(x.InvestigateDetailID);
            let ducument = await this.modifyMasDocument(x.InvestigateDetailID);

            return Promise.all([suspect, product, ducument]);
        }, () => { this.saveFail(); return; })
            .catch((error) => this.catchError(error));

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
                        await this.s_investDetail.InvestigateDetailStaffinsAll(x)
                            .then(y => {
                                if (!this.checkIsSuccess(y)) return;
                            }, () => { this.saveFail(); return; })
                            .catch((error) => this.catchError(error));
                        break;
                    case 'u':
                        await this.s_investDetail.InvestigateDetailStaffupdByCon(x)
                            .then(y => {
                                if (!this.checkIsSuccess(y)) return;
                            }, () => { this.saveFail(); return; })
                            .catch((error) => this.catchError(error));
                        break;
                }
            });
        return Promise.all(suspect);
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
                        if (this.mode == 'C') return;
                        await this.s_investDetail.InvestigateDetailProductupdDelete(x.ReferenceCode)
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
                        await this.s_investDetail.InvestigateDetailProductupdByCon(x)
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
