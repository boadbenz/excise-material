import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { NoticeService } from '../notice.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import { toLocalNumeric, resetLocalNumeric, setZero, compareDate } from '../../../config/dateFormat';
import { MasProductModel } from '../../../models/mas-product.model';
import { Message } from '../../../config/message';
import { NoticeProduct, NoticeProductFormControl } from '../notice-product';
import { NoticeSuspect } from '../notice-suspect';
import { NoticeDocument, NoticeDocumentFormControl } from '../notice-document';
import { NoticeStaffFormControl } from '../notice-staff';
import { NoticeInformerFormControl } from '../notice-informer';
import { NoticeLocaleFormControl } from '../notice-locale';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { SidebarService } from '../../../shared/sidebar/sidebar.component';
import { ArrestsService } from '../../arrests/arrests.service';
import { MasOfficeModel } from '../../../models/mas-office.model';
import {
    communicate,
    RegionModel,
    MasDistrictModel,
    MasProvinceModel,
    MasSubdistrictModel,
    MasStaffModel
} from '../../../models';
import { ProveService } from '../../prove/prove.service';
import { MasDutyProductUnitModel } from '../../../models/mas-duty-product-unit.model';

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html'
})
export class ManageComponent implements OnInit, OnDestroy {

    private onSaveSubscribe: any;
    private onDeleSubscribe: any;
    private onPrintSubscribe: any;
    private onNextPageSubscribe: any;
    private onCancelSubscribe: any;

    programSpect: 'ILG60-02-02-00';
    mode: string;
    showEditField: any;
    modal: any;
    noticeCode: string;
    arrestCode: string;
    noticeForm: FormGroup;
    searching = false;
    searchFailed = false;
    isConceal = false;
    isRequired: boolean;

    @ViewChild('printDocModal') printDocModel: ElementRef;
    @ViewChild('noticeDate') noticeDate: ElementRef;
    @ViewChild('noticeDueDate') noticeDueDate: ElementRef;

    communicateModel = communicate;

    subdistrict = new Array<MasSubdistrictModel>();
    district = new Array<MasDistrictModel>();
    province = new Array<MasProvinceModel>();
    typeheadRegion = new Array<RegionModel>();
    typeheadProduct = new Array<MasProductModel>();
    typeheadOffice = new Array<MasOfficeModel>();
    typeheadStaff = new Array<MasStaffModel>();
    typeheadProductUnit = new Array<MasDutyProductUnitModel>();

    get NoticeStaff(): FormArray {
        return this.noticeForm.get('NoticeStaff') as FormArray;
    }

    get NoticeInformer(): FormArray {
        return this.noticeForm.get('NoticeInformer') as FormArray;
    }

    get NoticeLocale(): FormArray {
        return this.noticeForm.get('NoticeLocale') as FormArray;
    }

    get NoticeProduct(): FormArray {
        return this.noticeForm.get('NoticeProduct') as FormArray;
    }

    get NoticeSuspect(): FormArray {
        return this.noticeForm.get('NoticeSuspect') as FormArray;
    }

    get NoticeDocument(): FormArray {
        return this.noticeForm.get('NoticeDocument') as FormArray;
    }

    constructor(
        private activeRoute: ActivatedRoute,
        private suspectModalService: NgbModal,
        private router: Router,
        private fb: FormBuilder,
        private navService: NavigationService,
        private noticeService: NoticeService,
        private ngbModel: NgbModal,
        private preloader: PreloaderService,
        private sidebarService: SidebarService,
        private arrestService: ArrestsService,
        private proveService: ProveService
    ) {
        // set false
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);
        this.navService.setInnerTextNextPageButton('งานจับกุม')
    }

    async ngOnInit() {
        this.preloader.setShowPreloader(true);

        this.sidebarService.setVersion('1.04');

        this.active_route();

        this.navigate_service();

        this.createForm();

        await this.setProductStore();
        await this.setStaffStore();
        await this.setRegionStore();
        await this.setProductUnitStore();

        this.preloader.setShowPreloader(false);
    }

    private active_route() {
        this.activeRoute.params.subscribe(p => {
            this.mode = p['mode'];
            if (p['mode'] === 'C') {
                // set false
                this.navService.setEditButton(false);
                this.navService.setDeleteButton(false);
                this.navService.setEditField(false);
                // set true
                this.navService.setSaveButton(true);
                this.navService.setCancelButton(true);
                this.navService.setNextPageButton(true);
                this.noticeCode = `LS-${(new Date).getTime()}`;
                this.arrestCode = `TN-${(new Date).getTime()}`;

            } else if (p['mode'] === 'R') {
                // set false
                this.navService.setSaveButton(false);
                this.navService.setCancelButton(false);
                // set true
                this.navService.setPrintButton(true);
                this.navService.setEditButton(true);
                this.navService.setDeleteButton(true);
                this.navService.setEditField(true);
                this.navService.setNextPageButton(true);

                if (p['code']) {
                    this.noticeCode = p['code'];
                    this.getByCon(p['code']);
                }
            }
        });
    }

    private navigate_service() {
        this.navService.showFieldEdit.subscribe(p => {
            this.showEditField = p;
        });

        this.onCancelSubscribe = this.navService.onCancel.subscribe(async status => {
            if (status) {
                await this.navService.setOnCancel(false);
                this.router.navigate(['/notice/list']);
            }
        })

        this.onSaveSubscribe = this.navService.onSave.subscribe(async status => {

            if (status) {

                await this.navService.setOnSave(false);

                if (!this.noticeForm.valid) {
                    this.isRequired = true;
                    alert(Message.checkData)
                    return false;
                }

                const sDateCompare = new Date(resetLocalNumeric(this.noticeForm.value.NoticeDate));
                const eDateCompare = new Date(resetLocalNumeric(this.noticeForm.value.NoticeDueDate));

                if (sDateCompare.valueOf() > eDateCompare.valueOf()) {
                    alert(Message.checkDate);
                    return false;
                }
        
                this.noticeForm.value.NoticeDate = sDateCompare.toISOString();
                this.noticeForm.value.NoticeDueDate = eDateCompare.toISOString();
                this.noticeForm.value.NoticeInformer.map(item => {
                    item.InformerType = item.InformerType == true ? 1 : 0;
                });

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

        this.onPrintSubscribe = this.navService.onPrint.subscribe(async status => {
            if (status) {
                await this.navService.setOnPrint(false);
                this.modal = this.ngbModel.open(this.printDocModel, { size: 'lg', centered: true });
            }
        })

        this.onNextPageSubscribe = this.navService.onNextPage.subscribe(async status => {
            if (status) {
                await this.navService.setOnNextPage(false);
                this.router.navigate(['/arrest/manage', 'C', 'NEW']);
            }
        })
    }

    private createForm() {
        let noticeDate = this.mode == 'C' ? toLocalNumeric((new Date()).toISOString()) : null;
        let noticeTime = this.mode == 'C' ? `${setZero((new Date).getHours())}.${setZero((new Date).getMinutes())} น.` : null;
        let noticeDueDate = noticeDate;
        this.noticeForm = this.fb.group({
            NoticeCode: new FormControl(this.noticeCode, Validators.required),
            NoticeStationCode: new FormControl(null, Validators.required),
            NoticeStation: new FormControl(null, Validators.required),
            NoticeDate: new FormControl(noticeDate, Validators.required),
            NoticeTime: new FormControl(noticeTime, Validators.required),
            NoticeDue: new FormControl(null, Validators.required),
            NoticeDueDate: new FormControl(noticeDueDate, Validators.required),
            NoticeDueTime: new FormControl(null),
            GroupNameDesc: new FormControl('N/A'),
            CommunicationChanelID: new FormControl(null, Validators.required),
            DataSource: new FormControl(null),
            FilePath: new FormControl(null),
            ArrestCode: new FormControl(null),
            IsArrest: new FormControl(1),
            IsActive: new FormControl(1),
            NoticeStaff: this.fb.array([this.createStaffForm()]),
            NoticeInformer: this.fb.array([this.createInformerForm()]),
            NoticeLocale: this.fb.array([this.createLocaleForm()]),
            NoticeProduct: this.fb.array([this.createProductForm()]),
            NoticeSuspect: this.fb.array([]),
            NoticeDocument: this.fb.array([this.createDocumentForm()])
        })
    }

    private createStaffForm(): FormGroup {
        NoticeStaffFormControl.NoticeCode = new FormControl(this.noticeCode);
        return this.fb.group(NoticeStaffFormControl)
    }

    private createInformerForm(): FormGroup {
        NoticeInformerFormControl.NoticeCode = new FormControl(this.noticeCode);
        return this.fb.group(NoticeInformerFormControl)
    }

    private createLocaleForm(): FormGroup {
        NoticeLocaleFormControl.NoticeCode = new FormControl(this.noticeCode);
        return this.fb.group(NoticeLocaleFormControl)
    }

    private createProductForm(): FormGroup {
        NoticeProductFormControl.NoticeCode = new FormControl(this.noticeCode);
        return this.fb.group(NoticeProductFormControl)
    }

    private createDocumentForm(): FormGroup {
        NoticeDocumentFormControl.IsActive = new FormControl(1);
        NoticeDocumentFormControl.IsNewItem = new FormControl(true);
        return this.fb.group(NoticeDocumentFormControl)
    }

    private setItemFormArray(array: any[], formControl: string) {
        if (array !== undefined && array.length) {
            const itemFGs = array.map(item => this.fb.group(item));
            const itemFormArray = this.fb.array(itemFGs);
            this.noticeForm.setControl(formControl, itemFormArray);
        }
    }

    private async getByCon(code: string) {
        await this.noticeService.getByCon(code).then(async res => {
            this.noticeCode = res.NoticeCode;
            this.arrestCode = res.ArrestCode;
            await this.noticeForm.reset({
                NoticeCode: res.NoticeCode,
                NoticeStationCode: res.NoticeStationCode,
                NoticeStation: res.NoticeStation,
                NoticeDate: toLocalNumeric(res.NoticeDate),
                NoticeTime: res.NoticeTime,
                NoticeDue: res.NoticeDue,
                NoticeDueDate: toLocalNumeric(res.NoticeDueDate),
                GroupNameDesc: res.GroupNameDesc,
                CommunicationChanelID: res.CommunicationChanelID,
                ArrestCode: res.ArrestCode,
                IsActive: res.IsActive
            });

            await res.NoticeStaff.map(item => {
                item.StaffFullName = `${item.TitleName} ${item.FirstName} ${item.LastName}`
            });

            await res.NoticeLocale.map(item =>
                item.Region = `${item.SubDistrict} ${item.District} ${item.Province}`
            )

            await res.NoticeInformer.map(item => {
                this.isConceal = item.InformerType == 1 ? true : false;
                item.Region = item.SubDistrict == null ? '' : `${item.SubDistrict}`;
                item.Region += item.District == null ? '' : ` ${item.District}`;
                item.Region += item.Province == null ? '' : ` ${item.Province}`;
            });

            await res.NoticeSuspect.map(item =>
                item.SuspectFullName = `${item.SuspectTitleName} ${item.SuspectFirstName} ${item.SuspectLastName}`
            )

            await res.NoticeProduct.map(item =>
                item.BrandFullName = `${item.BrandNameTH} ${item.SubBrandNameTH} ${item.ModelName}`
            )

            await this.setItemFormArray(res.NoticeStaff, 'NoticeStaff');
            await this.setItemFormArray(res.NoticeInformer, 'NoticeInformer');
            await this.setItemFormArray(res.NoticeLocale, 'NoticeLocale');
            await this.setItemFormArray(res.NoticeProduct, 'NoticeProduct');
            await this.setItemFormArray(res.NoticeSuspect, 'NoticeSuspect');
        })

        // await this.noticeService.getDocument(code).then(async res => {
        //     res.map(item => item.IsNewItem = false)
        //     await this.setItemFormArray(res, 'NoticeDocument')
        // })
    }

    private async onCreate() {

        // Set Preloader
        this.preloader.setShowPreloader(true);

        console.log('===================');
        console.log('Create : ', JSON.stringify(this.noticeForm.value));
        console.log('===================');

        let IsSuccess: boolean | false;
        await this.noticeService.insAll(this.noticeForm.value).then(isSuccess => {
            IsSuccess = isSuccess;
            if (!isSuccess)
                return;

            this.NoticeDocument.value.map(async doc => {
                // insert Document
                await this.noticeService.insDocument(doc).then(docIsSuccess => {
                    IsSuccess = docIsSuccess;
                    if (!docIsSuccess)
                        return;
                })
            })
        });

        if (IsSuccess) {
            alert(Message.saveComplete)
            this.router.navigate(['/notice/manage', 'R', this.noticeCode]);
        } else {
            alert(Message.saveFail)
        }

        this.preloader.setShowPreloader(false);
    }

    private async onReviced() {
        
        // Set Preloader
        this.preloader.setShowPreloader(true);

        console.log('===================');
        console.log('Update : ', JSON.stringify(this.noticeForm.value));
        console.log('===================');

        let IsSuccess: boolean | false;
        await this.noticeService.updByCon(this.noticeForm.value).then(isSuccess => {
            IsSuccess = isSuccess;
            if (!isSuccess)
                return;

            this.NoticeDocument.value
                .filter((item: NoticeDocument) => item.IsNewItem = true)
                .map((item: NoticeDocument) => {
                    this.noticeService.updDocument(item).then(docIsSuccess => {
                        IsSuccess = docIsSuccess
                        if (!docIsSuccess)
                            return;
                    })
                })
        })

        if (IsSuccess) {
            alert(Message.saveComplete)
            this.onComplete()
        } else {
            alert(Message.saveFail)
        }

        this.preloader.setShowPreloader(false);
    }

    private onDelete() {
        if (confirm(Message.confirmAction)) {
            // Set Preloader
            this.preloader.setShowPreloader(true);
            this.noticeService.updDelete(this.noticeCode).then(IsSuccess => {
                if (IsSuccess) {
                    alert(Message.delComplete)
                    this.router.navigate(['/notice/list']);
                } else (
                    alert(Message.delFail)
                )
            })
        } else {
            this.router.navigate(['/notice/list']);
        }
    }

    private async onComplete() {
        // set true
        await this.navService.setEditField(true);
        await this.navService.setEditButton(true);
        await this.navService.setPrintButton(true);
        await this.navService.setDeleteButton(true);
        await this.navService.setNextPageButton(true);
        // set false
        await this.navService.setSaveButton(false);
        await this.navService.setCancelButton(false);

    }

    checkDate() {
        if (!compareDate(this.noticeDate.nativeElement.value, this.noticeDueDate.nativeElement.value)) {
            alert(Message.checkDate)
            this.noticeDueDate.nativeElement.value = this.noticeDate.nativeElement.value;
        }
    }

    addProduct() {
        const lastIndex = this.NoticeProduct.length - 1;
        let product = new NoticeProduct();
        product.IsNewItem = true;
        if (lastIndex < 0) {
            this.NoticeProduct.push(this.fb.group(product));
        } else {
            const lastDoc = this.NoticeProduct.at(lastIndex).value;
            if (lastDoc.ProductID) {
                this.NoticeProduct.push(this.fb.group(product));
            }
        }
    }

    addSuspect(suspect: NoticeSuspect[]) {
        if (suspect.length) {
            suspect.map(item => {
                item.IsNewItem = true;
                item.NoticeCode = this.noticeCode;
                this.NoticeSuspect.push(this.fb.group(item))
            });
        }
    }

    addDocument() {
        const lastIndex = this.NoticeDocument.length - 1;
        let document = new NoticeDocument();
        document.IsNewItem = true;
        if (lastIndex < 0) {
            this.NoticeDocument.push(this.fb.group(document));
        } else {
            const lastDoc = this.NoticeDocument.at(lastIndex).value;
            if (lastDoc.DataSource && lastDoc.FilePath) {
                this.NoticeDocument.push(this.fb.group(document));
            }
        }
    }

    private async setStaffStore() {
        await this.arrestService.masStaffgetAll().then(res =>
            this.typeheadStaff = res
        )
    }

    private async setProductStore() {
        await this.arrestService.masProductgetAll().then(res => {
            this.typeheadProduct = res;
        })
    }

    private async setProductUnitStore() {
        await this.proveService.getProveProductUnit('').then(res => {
            this.typeheadProductUnit = res;
        })
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

    addNoticeDueDate(e: any) {
        if (!this.noticeForm.value.NoticeDate) {
            this.noticeForm.patchValue({
                NoticeDate: toLocalNumeric((new Date()).toISOString()),
                NoticeTime: `${setZero((new Date).getHours())}.${setZero((new Date).getMinutes())} น.`
            })
        }
        let noticeDate = new Date(resetLocalNumeric(this.noticeForm.value.NoticeDate))
        let noticeTime = this.noticeForm.value.NoticeTime;
        let dueDate = e.value == '' ? 0 : e.value;
        noticeDate.setDate(noticeDate.getDate() + parseInt(dueDate));
        this.noticeForm.patchValue({
            NoticeDueDate: toLocalNumeric(noticeDate.toISOString()),
            NoticeDueTime: noticeTime
        })
    }

    searchRegion = (text3$: Observable<string>) =>
        text3$
            .debounceTime(300)
            .distinctUntilChanged()
            .map(term => term === '' ? []
                : this.typeheadRegion
                    .filter(v =>
                        v.SubDistrictNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                        v.DistrictNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                        v.ProvinceNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1
                    ).slice(0, 10));

    searchProduct = (text$: Observable<string>) =>
        text$
            .debounceTime(300)
            .distinctUntilChanged()
            .map(term => term === '' ? []
                : this.typeheadProduct
                    .filter(v =>
                        v.SubBrandNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                        v.BrandNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                        v.ModelName.toLowerCase().indexOf(term.toLowerCase()) > -1
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

    formatterProduct = (x: { BrandNameTH: string, SubBrandNameTH: string, ModelName: string }) =>
        `${x.BrandNameTH} ${x.SubBrandNameTH} ${x.ModelName}`;

    formatterRegion = (x: { SubDistrictNameTH: string, DistrictNameTH: string, ProvinceNameTH: string }) =>
        `${x.SubDistrictNameTH} ${x.DistrictNameTH} ${x.ProvinceNameTH}`;

    formatterStaff = (x: { TitleName: string, FirstName: string, LastName: string }) =>
        `${x.TitleName} ${x.FirstName} ${x.LastName}`

    // formatterOffice = (x: { OfficeShortName: string }) => x.OfficeShortName

    selectItemInformmerRegion(ele: any) {
        this.NoticeInformer.at(0).patchValue({
            SubDistrictCode: ele.item.SubDistrictCode,
            SubDistrict: ele.item.SubDistrictNameTH,
            DistrictCode: ele.item.DistrictCode,
            District: ele.item.DistrictNameTH,
            ProvinceCode: ele.item.ProvinceCode,
            Province: ele.item.ProvinceNameTH,
            ZipCode: ele.item.ZipCode
        });
    }

    selectItemLocaleRegion(ele: any) {
        this.NoticeLocale.at(0).patchValue({
            SubdistrictCode: ele.item.SubDistrictCode,
            SubDistrict: ele.item.SubDistrictNameTH,
            DistrictCode: ele.item.DistrictCode,
            District: ele.item.DistrictNameTH,
            ProvinceCode: ele.item.ProvinceCode,
            Province: ele.item.ProvinceNameTH,
            ZipCode: 'N/A'
        });
    }

    selectItemProductItem(ele: any, index: number) {
        ele.item.NoticeCode = this.noticeCode;
        ele.item.IsActive = 1;
        this.NoticeProduct.at(index).reset(ele.item)
        this.NoticeProduct.at(index).patchValue({
            IsNewItem: true,
            NoticeCode: this.noticeCode,
            // Qty: ele.item.Size,
            // QtyUnit: ele.item.SizeCode
        })
    }

    selectItemStaff(e, i) {
        this.NoticeStaff.at(i).reset(e.item);
        this.NoticeStaff.at(i).patchValue({
            ProgramCode: this.programSpect,
            ProcessCode: '0002',
            NoticeCode: this.noticeCode,
            IsActive: 1,
            PositionCode: e.item.ManagementPosCode,
            PositionName: e.item.ManagementPosName,
            DepartmentCode: e.item.OfficeCode,
            DepartmentName: e.item.OfficeName,
            ContributorCode: e.item.ContributorCode == null ? 2 : e.item.ContributorCode
        })

        this.noticeForm.patchValue({
            NoticeStationCode: e.item.OperationPosCode,
            NoticeStation: e.item.OperationPosName,
        })
    }

    // selectItemOffice(e) {
    //     this.noticeForm.patchValue({
    //         NoticeStationCode: e.item.OfficeCode,
    //         NoticeStation: e.item.OfficeShortName
    //     })
    // }

    async onDeleteProduct(id: string, index: number) {
        if (this.mode === 'C') {
            this.NoticeProduct.removeAt(index);

        } else if (this.mode === 'R') {
            if (!this.NoticeProduct.at(index).get('ProductID').value) {
                this.NoticeProduct.removeAt(index);
                return false;
            }

            if (confirm(Message.confirmAction)) {
                this.preloader.setShowPreloader(true);
                console.log('===================');
                console.log('ProductDel : ', id);
                console.log('===================');

                await this.noticeService.productupdDelete(id).then(isSuccess => {
                    if (isSuccess === true) {
                        this.NoticeProduct.removeAt(index);
                        alert(Message.delProductComplete)
                    } else {
                        alert(Message.delProductFail)
                    }
                })

                this.preloader.setShowPreloader(false);
            }
        }
    }

    async onDeleteSuspect(id: string, index: number) {
        if (this.mode === 'C') {
            this.NoticeSuspect.removeAt(index);

        } else if (this.mode === 'R') {

            if (confirm(Message.confirmAction)) {
                this.preloader.setShowPreloader(true);
                console.log('===================');
                console.log('SuspectDel : ', id);
                console.log('===================');

                await this.noticeService.suspectupdDelete(id).then(isSuccess => {
                    if (isSuccess === true) {
                        this.NoticeSuspect.removeAt(index);
                        alert(Message.delSuspcetComplete)
                    } else {
                        alert(Message.delSuspectFail)
                    }
                })

                this.preloader.setShowPreloader(false);
            }
        }
    }

    async onDeleteDocument(id: string, index: number) {
        if (this.mode === 'C') {
            this.NoticeDocument.removeAt(index);

        } else if (this.mode === 'R') {
            if (confirm(Message.confirmAction)) {
                this.preloader.setShowPreloader(true);
                console.log('===================');
                console.log('NoticeDel : ', id);
                console.log('===================');

                await this.noticeService.documentUpDelete(id).then(isSuccess => {
                    if (isSuccess === true) {
                        this.NoticeSuspect.removeAt(index);
                        alert(Message.delDocumentComplete)
                    } else {
                        alert(Message.delDocumentFail)
                    }
                })

                this.preloader.setShowPreloader(false);
            }
        }
    }

    onViewSuspect(id: string) {
        this.router.navigate(['/notice/suspect', 'R', id])
    }

    ngOnDestroy(): void {
        this.onCancelSubscribe.unsubscribe();
        this.onSaveSubscribe.unsubscribe();
        this.onDeleSubscribe.unsubscribe();
        this.onPrintSubscribe.unsubscribe();
        this.onNextPageSubscribe.unsubscribe();
    }

    openSuspect(e) {
        this.modal = this.suspectModalService.open(e, { size: 'lg', centered: true });
    }

    onChangeConceal() {
        this.isConceal = !this.isConceal;
        const informName = 'สายลับขอปิดนาม';
        this.NoticeInformer.at(0).patchValue({
            FullName: !this.isConceal ? null : informName,
            FirstName: !this.isConceal ? null : informName
        })
    }

    changeComunicateFile(e: any) {
        let reader = new FileReader();
        let file = e.target.files[0];
        let fileName: string = file.name;
        let fileType: string = file.type;

        reader.readAsDataURL(file);
        reader.onload = () => {
            let dataSource = reader.result.split(',')[1];
            if (dataSource && dataSource !== undefined) {
                this.noticeForm.patchValue({
                    FilePath: fileName
                })
            }
        };
    }

    changeNoticeDoc(e: any, index: number) {
        let reader = new FileReader();
        let file = e.target.files[0];
        let fileName: string = file.name;
        let fileType: string = file.type;

        reader.readAsDataURL(file);
        reader.onload = () => {
            let dataSource = reader.result.split(',')[1];
            if (dataSource && dataSource !== undefined) {
                this.NoticeDocument.at(index).patchValue({
                    ReferenceCode: this.noticeCode,
                    FilePath: fileName,
                    DataSource: dataSource,
                    DocumentType: fileType,
                    DocumentName: null,
                    IsActive: 1
                })
            }
        };
    }
}
