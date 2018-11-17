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

        this.navService.onCancel
            .takeUntil(this.destroy$)
            .subscribe(async status => {
                if (status) {
                    await this.navService.setOnCancel(false);
                }
            })

        this.navService.onSave
            .takeUntil(this.destroy$)
            .subscribe(async status => {
                if (status) {
                    await this.navService.setOnSave(false);

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

                }
            });

        this.navService.onDelete
            .takeUntil(this.destroy$)
            .subscribe(async status => {
                if (status) {
                    await this.navService.setOnDelete(false);
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
                    this.router.navigate(['investigation/manage', this.investMode, this.investCode])
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

    catchError(error: any) {
        console.log(error);
        this.endLoader();
    }

    endLoader = () => this.loaderService.hide();

    addStaff() {
        const lastIndex = this.InvestigateDetailStaff.length - 1;
        let item = new fromModels.InvestigateDetailStaff();
        item.PositionName = '';
        item.OfficeName = '';
        item.OfficeShortName = '';
        item.ContributorID = '';
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
        item.Address = '';
        item.Village = '';
        item.Building = '';
        item.Room = '';
        item.Floor = '';
        item.Alley = '';
        item.Road = '';
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
        item.ProductID = 0;
        item.IsModify = 'c';
        item.GroupCode = '1';
        item.ProductDesc = '';
        item.Qty = null;
        item.QtyUnit = '';
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
        item.DocumentType = '3';
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
        this.deleteFormArray(this.InvestigateDetailLocal, i , 'InvestigateDetailLocal');
    }

    deleteProduct(i: number) {
        this.deleteFormArray(this.InvestigateDetailProduct, i , 'InvestigateDetailProduct');
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
            ProgramCode: 'ILG60-01-03-00-00',
            ProcessCode: '03',
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

    private onSave() {
    }

    private onRevice() {
    }



}
