import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
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
import { setZero, compareDate, setDateMyDatepicker, getDateMyDatepicker, MyDatePickerOptions, setZeroHours, convertDateForSave } from '../../../config/dateFormat';
import { MasProductModel } from '../../../models/mas-product.model';
import { Message } from '../../../config/message';
import { NoticeProduct, NoticeProductFormControl } from '../notice-product';
import { NoticeSuspect } from '../notice-suspect';
import { NoticeDocument, NoticeDocumentFormControl } from '../notice-document';
import { NoticeStaffFormControl } from '../notice-staff';
import { NoticeInformerFormControl } from '../notice-informer';
import { NoticeLocaleFormControl, NoticeLocale } from '../notice-locale';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { SidebarService } from '../../../shared/sidebar/sidebar.component';
import { MasOfficeModel } from '../../../models/mas-office.model';
import {
    communicate,
    RegionModel,
    MasDistrictModel,
    MasProvinceModel,
    MasSubdistrictModel,
    MasStaffModel,
    CommunicationChanelModel,
    LawbreakerTypes,
    EntityTypes
} from '../../../models';
import { IMyDateModel } from 'mydatepicker-th';
import { replaceFakePath } from 'app/config/dataString';
import { NoticeMasSuspect } from '../../component/suspect-modal/notice-mas-suspect';
import { MainMasterService } from '../../../services/main-master.service';
import { MasDutyUnitModel } from '../../../models/mas-duty-unit.model';

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

    programSpect: string = 'ILG60-02-02-00';
    mode: string;
    showEditField: Boolean;
    modal: any;
    noticeCode: string;
    arrestCode: string;
    noticeForm: FormGroup;
    searching = false;
    searchFailed = false;
    isConceal = false;
    isRequired: boolean;

    myDatePickerOptions = MyDatePickerOptions;

    @ViewChild('printDocModal') printDocModel: ElementRef;

    communicateModel = communicate;
    suspectTypes = LawbreakerTypes;
    entityTypes = EntityTypes;

    subdistrict = new Array<MasSubdistrictModel>();
    district = new Array<MasDistrictModel>();
    province = new Array<MasProvinceModel>();
    typeheadRegion = new Array<RegionModel>();
    typeheadProduct = new Array<MasProductModel>();
    typeheadOffice = new Array<MasOfficeModel>();
    typeheadStaff = new Array<MasStaffModel>();
    typeheadProductUnit = new Array<MasDutyUnitModel>();
    typeheadcommunicateModel = new Array<CommunicationChanelModel>();

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
        private mainMasterService: MainMasterService
    ) {
        // set false
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);
        this.navService.setInnerTextNextPageButton('งานจับกุม')
    }

    async ngOnInit() {
        this.preloader.setShowPreloader(true);

        this.sidebarService.setVersion('0.0.2.12');

        this.navigate_service();

        this.active_route();

        this.createForm();

        await this.setCommunicateStore();
        await this.setProductStore();
        await this.setStaffStore();
        await this.setRegionStore();
        await this.setProductUnitStore();
        await this.setOfficeStore();
        await this.setCommunicateStore();

        if (this.mode == 'R') {
            this.getByCon(this.noticeCode);
        }

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
                this.navService.setNextPageButton(false);
                // set true
                this.navService.setSaveButton(true);
                this.navService.setCancelButton(true);
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

                this.noticeCode = p['code'];
            }
        });
    }

    private navigate_service() {
        this.navService.showFieldEdit.subscribe(async p => {
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

                const sDateCompare = getDateMyDatepicker(this.noticeForm.value.NoticeDate);
                const eDateCompare = getDateMyDatepicker(this.noticeForm.value.NoticeDueDate);

                if (sDateCompare.valueOf() > eDateCompare.valueOf()) {
                    alert(Message.checkDate);
                    return;
                }

                if (!this.NoticeSuspect.value.length) {
                    alert(Message.checkData);
                    return;
                }

                this.noticeForm.value.NoticeDate = convertDateForSave(sDateCompare);
                this.noticeForm.value.NoticeDueDate = convertDateForSave(eDateCompare);
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
                this.router.navigate(['/arrest/list']);
            }
        })
    }

    private createForm() {
        let noticeDate = this.mode == 'C' ? setDateMyDatepicker(new Date()) : null;
        let noticeTime = this.mode == 'C' ? `${setZero((new Date).getHours())}.${setZero((new Date).getMinutes())} น.` : null;
        let noticeDueDate = noticeDate;
        this.noticeForm = this.fb.group({
            NoticeCode: new FormControl(this.noticeCode, Validators.required),
            NoticeStationCode: new FormControl(null),
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
            NoticeDocument: this.fb.array([])
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
                NoticeDate: setDateMyDatepicker(new Date(res.NoticeDate)),
                NoticeTime: res.NoticeTime,
                NoticeDue: res.NoticeDue,
                NoticeDueDate: setDateMyDatepicker(new Date(res.NoticeDueDate)),
                GroupNameDesc: res.GroupNameDesc || 'N/A',
                CommunicationChanelID: res.CommunicationChanelID,
                ArrestCode: res.ArrestCode,
                IsActive: res.IsActive,
                IsArrest: res.IsArrest || 1
            });

            const staff = res.NoticeStaff.filter(item => item.IsActive == 1);
            staff.map(item => {
                item.StaffFullName = `${item.TitleName} ${item.FirstName} ${item.LastName}`
            });

            await res.NoticeLocale.map(item =>
                item.Region = `${item.SubDistrict} ${item.District} ${item.Province}`
            )

            const informer = res.NoticeInformer.filter(item => item.IsActive == 1);
            informer.map(item => {
                this.isConceal = item.InformerType == 1 ? true : false;
                item.Region = item.SubDistrict == null ? '' : `${item.SubDistrict}`;
                item.Region += item.District == null ? '' : ` ${item.District}`;
                item.Region += item.Province == null ? '' : ` ${item.Province}`;
            });

            const suspect = res.NoticeSuspect.filter(item => item.IsActive == 1);
            suspect.map(item => {
                item.SuspectFullName = !item.SuspectTitleName ? '' : item.SuspectTitleName;
                item.SuspectFullName += !item.SuspectFirstName ? '' : ` ${item.SuspectFirstName}`;
                item.SuspectFullName += !item.SuspectFirstName ? '' : ` ${item.SuspectFirstName}`;

                item.CompanyFullName = !item.CompanyTitleName ? '' : item.CompanyTitleName;
                item.CompanyFullName += !item.CompanyName ? '' : ` ${item.CompanyName}`;

                item.SuspectType = item.SuspectType || 0;
                item.EntityType = item.EntityType || 0;
                item.SuspectTypeName = item.SuspectTypeName || this.suspectTypes.find(el => parseInt(el.value) == item.SuspectType).text;
                item.EntityTypeName = item.EntityTypeName || this.entityTypes.find(el => parseInt(el.value) == item.EntityType).text;
            }
            )

            const product = res.NoticeProduct.filter(item => item.IsActive == 1);
            product.map(item => {
                item.BrandFullName = item.BrandNameTH == null ? '' : item.BrandNameTH;
                item.BrandFullName += item.SubBrandNameTH == null ? '' : ` ${item.SubBrandNameTH}`;
                item.BrandFullName += item.ModelName == null ? '' : ` ${item.ModelName}`;
                item.NetWeight = item.NetWeight || '0';
                item.NetWeightUnit = item.NetWeightUnit || '0';
            }
            )

            await this.setItemFormArray(staff, 'NoticeStaff');
            await this.setItemFormArray(informer, 'NoticeInformer');
            await this.setItemFormArray(res.NoticeLocale, 'NoticeLocale');
            await this.setItemFormArray(product, 'NoticeProduct');
            await this.setItemFormArray(suspect, 'NoticeSuspect');
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
        console.log('Create Notice : ', JSON.stringify(this.noticeForm.value));
        console.log('===================');

        let IsSuccess: boolean = true;
        await this.noticeService.insAll(this.noticeForm.value).then(async isSuccess => {
            if (!isSuccess) { IsSuccess = false; return false; };
        }, () => { IsSuccess = false; return; });

        if (IsSuccess) {
            await this.NoticeDocument.value.map(async doc => {
                // insert Document
                await this.noticeService.noticeDocumentinsAll(doc).then(docIsSuccess => {
                    if (!docIsSuccess) { IsSuccess = false; return false; };

                }, () => { IsSuccess = false; return false; });
            });
        }

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
        console.log('Update Notice : ', JSON.stringify(this.noticeForm.value));
        console.log('===================');

        let IsSuccess: boolean = true;
        await this.noticeService.updByCon(this.noticeForm.value).then(async isSuccess => {
            debugger
            if (!isSuccess) { IsSuccess = false; return; };
        }, () => { IsSuccess = false; return; });

        if (IsSuccess) {
            const document = this.NoticeDocument.value;
            await document.map(async (item: NoticeDocument) => {
                if (item.IsNewItem) {
                    await this.noticeService.noticeDocumentinsAll(item).then(docIsSuccess => {
                        if (!docIsSuccess) { IsSuccess = false; return; };
                    }, () => { IsSuccess = false; return; });

                } else {
                    this.noticeService.noticeDocumentupd(item).then(docIsSuccess => {
                        if (!docIsSuccess) { IsSuccess = false; return };
                    }, () => { IsSuccess = false; return; })
                }
            })
        }

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

    _noticeDate: any;
    _noticeDueDate: any;
    onNoticeDateChange(event: IMyDateModel) {
        this._noticeDate = event;
        this.checkDate();
    }

    onNoticeDueDateChange(event: IMyDateModel) {
        this._noticeDueDate = event;
        this.checkDate();
    }

    checkDate() {
        const _sdate = this._noticeDate ? this._noticeDate : this.noticeForm.value.NoticeDate;
        const _edate = this._noticeDueDate ? this._noticeDueDate : this.noticeForm.value.NoticeDueDate;

        if (_sdate && _edate) {
            const sdate = getDateMyDatepicker(_sdate);
            const edate = getDateMyDatepicker(_edate);

            if (!compareDate(sdate, edate)) {
                alert(Message.checkDate)
                setTimeout(() => {
                    this.noticeForm.patchValue({
                        NoticeDueDate: { date: _sdate.date }
                    });
                }, 0);
            }
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
            if (lastDoc.Qty && lastDoc.QtyUnit) {
                this.NoticeProduct.push(this.fb.group(product));
            }
        }
    }

    addSuspect(suspect: NoticeMasSuspect[]) {
        if (suspect.length) {
            suspect.map(item => {
                let noticeSuspect: NoticeSuspect = {
                    SuspectID: item.SuspectID.toString(),
                    SuspectReferenceID: item.SuspectID.toString(),
                    NoticeCode: this.noticeCode,
                    SuspectTitleName: item.SuspectTitleName,
                    SuspectFirstName: item.SuspectFirstName,
                    SuspectLastName: item.SuspectLastName,
                    CompanyTitleName: item.CompanyTitle,
                    CompanyName: item.CompanyName,
                    CompanyOtherName: item.CompanyOtherName,
                    IsActive: 1,

                    EntityType: item.EntityType,
                    SuspectType: item.SuspectType,
                    EntityTypeName: item.EntityTypeName,
                    SuspectTypeName: item.SuspectTypeName,
                    CompanyFullName: item.CompanyFullName,
                    SuspectFullName: item.SuspectFullName,
                    RowId: item.RowId,
                    IsChecked: true,
                    IsNewItem: true,
                }
                this.NoticeSuspect.push(this.fb.group(noticeSuspect))
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
            if (lastDoc.DocumentName && lastDoc.FilePath) {
                this.NoticeDocument.push(this.fb.group(document));
            }
        }
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

    private async setCommunicateStore() {
        await this.mainMasterService.masCommunicationchanelMaingetAll().then(res => {
            this.typeheadcommunicateModel = res;
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

    addNoticeDueDate(e: any) {
        const _date = new Date();
        if (!this.noticeForm.value.NoticeDate) {
            this.noticeForm.patchValue({
                NoticeDate: setDateMyDatepicker(_date),
                NoticeTime: `${setZero((new Date).getHours())}.${setZero((new Date).getMinutes())} น.`
            })
        }

        const noticeTime = this.noticeForm.value.NoticeTime;
        const dueDate = e.value == '' ? 0 : e.value;
        let noticeDate = getDateMyDatepicker(this.noticeForm.value.NoticeDate);
        noticeDate.setDate(noticeDate.getDate() + parseInt(dueDate));
        this.noticeForm.patchValue({
            NoticeDueDate: setDateMyDatepicker(noticeDate),
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
                        (v.SubdistrictNameTH && v.SubdistrictNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        (v.DistrictNameTH && v.DistrictNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        (v.ProvinceNameTH && v.ProvinceNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1)
                    ).slice(0, 10));

    searchProduct = (text$: Observable<string>) =>
        text$
            .debounceTime(300)
            .distinctUntilChanged()
            .map(term => term === '' ? []
                : this.typeheadProduct
                    .filter(v =>
                        (v.SubBrandNameTH && v.SubBrandNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        (v.BrandNameTH && v.BrandNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        (v.ModelName && v.ModelName.toLowerCase().indexOf(term.toLowerCase()) > -1)
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

    formatterProduct = (x: { BrandNameTH: String, SubBrandNameTH: String, ModelName: String }) =>
        `${x.SubBrandNameTH || ''} ${x.BrandNameTH || ''} ${x.ModelName || ''}`;

    formatterRegion = (x: { SubdistrictNameTH: string, DistrictNameTH: string, ProvinceNameTH: string }) =>
        `${x.SubdistrictNameTH || ''} ${x.DistrictNameTH || ''} ${x.ProvinceNameTH || ''}`;

    formatterStaff = (x: { TitleName: string, FirstName: string, LastName: string }) =>
        `${x.TitleName || ''} ${x.FirstName || ''} ${x.LastName || ''}`

    formatterOffice = (x: { OfficeShortName: string }) => x.OfficeShortName

    selectItemInformmerRegion(ele: any) {
        this.NoticeInformer.at(0).patchValue({
            SubDistrictCode: ele.item.SubdistrictCode,
            SubDistrict: ele.item.SubdistrictNameTH,
            DistrictCode: ele.item.DistrictCode,
            District: ele.item.DistrictNameTH,
            ProvinceCode: ele.item.ProvinceCode,
            Province: ele.item.ProvinceNameTH,
            ZipCode: ele.item.ZipCode
        });
    }

    selectItemLocaleRegion(ele: any) {
        this.NoticeLocale.at(0).patchValue({
            SubDistrictCode: ele.item.SubdistrictCode,
            SubDistrict: ele.item.SubdistrictNameTH,
            DistrictCode: ele.item.DistrictCode,
            District: ele.item.DistrictNameTH,
            ProvinceCode: ele.item.ProvinceCode,
            Province: ele.item.ProvinceNameTH,
            ZipCode: 'N/A'
        });
    }

    selectItemProductItem(ele: any, index: number) {
        this.NoticeProduct.at(index).reset(ele.item)
        this.NoticeProduct.at(index).patchValue({
            IsActive: 1,
            IsNewItem: true,
            NoticeCode: this.noticeCode,
            GroupCode: ele.item.GroupCode || '1',
            IsDomestic: ele.item.IsDomestic || '1',
            NetWeight: ele.item.NetWeight || 0,
            NetWeightUnit: ele.item.NetWeightUnit || 0,
        })
    }

    selectItemStaff(e, i) {
        this.NoticeStaff.at(i).reset(e.item);
        this.NoticeStaff.at(i).patchValue({
            ProgramCode: this.programSpect,
            ProcessCode: '0002',
            NoticeCode: this.noticeCode,
            IsActive: 1,
            StaffFullName: `${e.item.TitleName || ''} ${e.item.FirstName || ''} ${e.item.LastName || ''}`,
            PositionCode: e.item.PositionCode || e.item.ManagementPosCode,
            PositionName: e.item.PositionName || e.item.ManagementPosName,
            DepartmentLevel: e.item.DepartmentLevel || e.item.DeptLevel,
            DepartmentCode: e.item.DepartmentCode || e.item.OfficeCode,
            DepartmentName: `${e.item.DepartmentName || e.item.OfficeName}`,
            ContributorCode: e.item.ContributorCode || 2,
            ContributorID: e.item.ContributorID || 1
        })
    }

    selectItemOffice(e) {
        this.noticeForm.patchValue({
            NoticeStationCode: e.item.OfficeCode || '-',
            NoticeStation: e.item.OfficeName
        })
    }

    async onDeleteProduct(id: string, index: number) {
        if (this.mode === 'C') {
            this.NoticeProduct.removeAt(index);

        } else if (this.mode === 'R') {
            if (this.NoticeProduct.at(index).value.IsNewItem) {
                this.NoticeProduct.removeAt(index);
                return;
            }

            if (confirm(Message.confirmAction)) {
                this.preloader.setShowPreloader(true);

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
            if (this.NoticeSuspect.at(index).value.IsNewItem) {
                this.NoticeSuspect.removeAt(index);
                return;
            }

            if (confirm(Message.confirmAction)) {
                this.preloader.setShowPreloader(true);

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
            if (this.NoticeDocument.at(index).value.IsNewItem) {
                this.NoticeDocument.removeAt(index);
                return;
            }

            if (confirm(Message.confirmAction)) {
                this.preloader.setShowPreloader(true);

                await this.noticeService.noticeDocumentupdDelete(id).then(isSuccess => {
                    if (isSuccess === true) {
                        this.NoticeDocument.removeAt(index);
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

        reader.readAsDataURL(file);
        reader.onload = () => {
            let dataSource = reader.result.split(',')[1];
            if (dataSource && dataSource !== undefined) {
                this.noticeForm.patchValue({
                    FilePath: replaceFakePath(e.target.value),
                    DataSource: dataSource,
                    IsActive: 1
                })
            }
        };
    }

    changeNoticeDoc(e: any, index: number) {
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.readAsDataURL(file);
        reader.onload = () => {
            let dataSource = reader.result.split(',')[1];
            if (dataSource && dataSource !== undefined) {
                this.NoticeDocument.at(index).patchValue({
                    ReferenceCode: this.noticeCode,
                    FilePath: replaceFakePath(e.target.value),
                    DataSource: dataSource,
                    IsActive: 1
                })
            }
        };
    }
}
