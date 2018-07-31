<<<<<<< HEAD
import { Component, OnInit, OnDestroy, Input, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { NoticeInformer } from '../notice-informer';
import { NoticeStaff } from '../notice-staff';
=======
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { NoticeService } from '../notice.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import { toLocalNumeric } from '../../../config/dateFormat';
import { regions, communicate, DutyUnit, RegionModel, MasDistrictModel, MasProvinceModel, MasSubdistrictModel } from '../../../models';
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
>>>>>>> FL_J

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html'
})
export class ManageComponent implements OnInit, OnDestroy {

    private sub: any;
    mode: string;
    modal: any;
<<<<<<< HEAD
=======
    noticeCode: string;
    noticeForm: FormGroup;
    searching = false;
    searchFailed = false;
    isConceal = false;

    @ViewChild('printDocModal') printDocModel: ElementRef;

    // importSuspectData = new Array<Suspect>();

    regionModel = regions;
    communicateModel = communicate;
    dutyUnitModel = DutyUnit;

    subdistrict = new Array<MasSubdistrictModel>();
    district = new Array<MasDistrictModel>();
    province = new Array<MasProvinceModel>();
    typeheadRegion = new Array<RegionModel>();
    typeheadProduct = new Array<MasProductModel>();
    typeheadOffice = new Array<MasOfficeModel>();

    get NoticeStaff(): FormArray {
        return this.noticeForm.get('NoticeStaff') as FormArray;
    }

    get NoticeInformer(): FormArray {
        return this.noticeForm.get('NoticeInformer') as FormArray;
    }

    get NoticeLocale(): FormArray {
        return this.noticeForm.get('NoticeLocale') as FormArray;
    }
>>>>>>> FL_J

    noticeForm: FormGroup;

    showEditField: any;

    constructor(
        private activeRoute: ActivatedRoute,
        private suspectModalService: NgbModal,
        private fb: FormBuilder,
<<<<<<< HEAD
        private navService: NavigationService
=======
        private navService: NavigationService,
        private noticeService: NoticeService,
        private ngbModel: NgbModal,
        private preloader: PreloaderService,
        private sidebarService: SidebarService,
        private arrestService: ArrestsService
>>>>>>> FL_J
    ) {
        // set false
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);
        // set true
        this.navService.setNextPageButton(true);
    }

    async ngOnInit() {
        this.preloader.setShowPreloader(true);

        this.sidebarService.setVersion('1.01');

        this.active_route();

        this.navigate_service();

        this.createForm();

<<<<<<< HEAD
        this.setNoticeinFormer(new Array<NoticeInformer>());

        this.setNoticestaff(new Array<NoticeStaff>());
=======
       await this.setRegionStore();
       await this.setProductStore();
    //    await this.setOfficeStore();

       this.preloader.setShowPreloader(false);
>>>>>>> FL_J
    }

    private active_route() {
        this.sub = this.activeRoute.params.subscribe(p => {
            this.mode = p['mode'];
            if (p['mode'] === 'C') {
                // set false
                this.navService.setEditButton(false);
                this.navService.setDeleteButton(false);
                this.navService.setEditField(false);
                // set true
                this.navService.setSaveButton(true);
                this.navService.setCancelButton(true);

            } else if (p['mode'] === 'R') {
                // set false
                this.navService.setSaveButton(false);
                this.navService.setCancelButton(false);
                // set true
                this.navService.setPrintButton(true);
                this.navService.setEditButton(true);
                this.navService.setDeleteButton(true);
                this.navService.setEditField(true);
            }
        });
    }

    private navigate_service() {
        this.navService.showFieldEdit.subscribe(p => {
            this.showEditField = p;
        });

        this.navService.onSave.subscribe(status => {
            if (status) {
<<<<<<< HEAD
                // set true
                this.navService.setEditField(true);
                this.navService.setEditButton(true);
                this.navService.setPrintButton(true);
                this.navService.setDeleteButton(true);
                // set false
                this.navService.setSaveButton(false);
                this.navService.setCancelButton(false);
=======
                await this.navService.setOnCancel(false);
                this.router.navigate(['/notice/list']);
            }
        })

        this.sub = this.navService.onSave.subscribe(async status => {
            if (status) {
                // set action save = false
                await this.navService.setOnSave(false);
                if (this.mode === 'C') {
                    this.onCreate();

                } else if (this.mode === 'R') {
                    this.onReviced();
                }
>>>>>>> FL_J
            }
        });

        this.sub = this.navService.onDelete.subscribe(async status => {
            if (status) {
                await this.navService.setOnDelete(false);
                this.onDelete();
            }
        });

        this.sub = this.navService.onPrint.subscribe(async status => {
            if (status) {
                await this.navService.setOnPrint(false);
                this.modal = this.ngbModel.open(this.printDocModel, { size: 'lg', centered: true });
            }
        })

        this.sub = this.navService.onNextPage.subscribe(async status => {
            if (status) {
                await this.navService.setOnNextPage(false);
                this.router.navigate(['/arrest/manage', 'C', this.noticeCode]);
            }
        })
    }

    private createForm() {
        this.noticeForm = this.fb.group({
            NoticeCode: new FormControl(''),
            NoticeStationCode: new FormControl(''),
            NoticeStation: new FormControl(''),
            NoticeDate: new FormControl(''),
            NoticeTime: new FormControl(''),
            NoticeDue: new FormControl(''),
            NoticeDueDate: new FormControl(''),
            GroupNameDesc: new FormControl(''),
            CommunicationChannelID: new FormControl(''),
            ArrestCode: new FormControl(''),
            StaffFullName: new FormControl(''),
            IsActive: new FormControl(''),
            Noticestaff: this.fb.array([]),
            Noticeinformer: this.fb.array([]),
            Noticelocale: this.fb.array([]),
            NoticeProduct: this.fb.array([]),
            NoticeSuspect: this.fb.array([])
        })
    }

    get Noticestaff(): FormArray {
        return this.noticeForm.get('Noticestaff') as FormArray;
    }

<<<<<<< HEAD
    setNoticestaff(staff: NoticeStaff[]) {
        if (staff) {
            // informer.map(item => item.FullName = `${item.TitleName} ${item.FirstName} ${item.LastName}`);
            const itemFGs = staff.map(item => this.fb.group(item));
=======
    private createProductForm(): FormGroup {
        NoticeProductFormControl.NoticeCode = new FormControl(this.noticeCode);
        return this.fb.group(NoticeProductFormControl)
    }

    private createDocumentForm(): FormGroup {
        return this.fb.group(NoticeDocumentFormControl)
    }

    private setItemFormArray(array: any[], formControl: string) {
        if (array !== undefined && array.length) {
            const itemFGs = array.map(item => this.fb.group(item));
>>>>>>> FL_J
            const itemFormArray = this.fb.array(itemFGs);
            this.noticeForm.setControl('Noticestaff', itemFormArray);
        }
    }

<<<<<<< HEAD
    get Noticeinformer(): FormArray {
        return this.noticeForm.get('Noticeinformer') as FormArray;
    }

    setNoticeinFormer(informer: NoticeInformer[]) {
        if (informer) {
            // informer.map(item => item.FullName = `${item.TitleName} ${item.FirstName} ${item.LastName}`);
            const itemFGs = informer.map(item => this.fb.group(item));
            const itemFormArray = this.fb.array(itemFGs);
            this.noticeForm.setControl('Noticeinformer', itemFormArray);
        }
    }

    get Noticelocale(): FormArray {
        return this.noticeForm.get('Noticelocale') as FormArray;
=======
    private getByCon(code: string) {
        this.noticeService.getByCon(code).then(async res => {
            this.noticeCode = res.NoticeCode;
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
                IsActive: res.IsActive,
            });

            await res.NoticeStaff.map(item =>
                item.StaffFullName = `${item.TitleName} ${item.FirstName} ${item.LastName}`
            );

            await res.NoticeLocale.map(item =>
                item.Region = `${item.SubDistrict} ${item.District} ${item.Province}`
            )

            await res.NoticeInformer.map(item => {
                this.isConceal = item.InformerType === 1 ? true : false;
                item.FullName = `${item.TitleName} ${item.FirstName} ${item.LastName}`;
                item.Region = `${item.SubDistrict} ${item.District} ${item.Province}`
            });

            await res.NoticeSuspect.map(item =>
                item.SuspectFullName = `${item.SuspectTitleName} ${item.SuspectFirstName} ${item.SuspectLastName}`
            )

            await res.NoticeProduct.map(item =>
                item.BrandFullName = `${item.BrandNameTH} ${item.SubBrandNameTH} ${item.ModelName}`
            )

            this.setItemFormArray(res.NoticeStaff, 'NoticeStaffForm');
            this.setItemFormArray(res.NoticeInformer, 'NoticeInformer');
            this.setItemFormArray(res.NoticeLocale, 'NoticeLocale');
            this.setItemFormArray(res.NoticeProduct, 'NoticeProduct');
            this.setItemFormArray(res.NoticeSuspect, 'NoticeSuspect');
            this.setItemFormArray(res.NoticeDocument, 'NoticeDocument')
        })
    }

    private async onCreate() {
        // Set Preloader
        this.preloader.setShowPreloader(true);

        const noticeDate = new Date(this.noticeForm.value.NoticeDate);
        const noticeDueDate = new Date(this.noticeForm.value.NoticeDueDate);
        this.noticeForm.value.NoticeDate = noticeDate.toISOString();
        this.noticeForm.value.NoticeDueDate = noticeDueDate.toISOString();
        this.noticeForm.value.NoticeInformer.map(item => {
            item.InformerType = item.InformerType === true ? 1 : 0;
        });

        console.log(JSON.stringify(this.noticeForm.value));

        await this.noticeService.insAll(this.noticeForm.value).then(isSuccess => {
            if (isSuccess) { this.onComplete() }
        });

        this.preloader.setShowPreloader(false);
    }

    private async onReviced() {
        // Set Preloader
        this.preloader.setShowPreloader(true);

        const noticeDate = new Date(this.noticeForm.value.NoticeDate);
        const noticeDueDate = new Date(this.noticeForm.value.NoticeDueDate);
        this.noticeForm.value.NoticeDate = noticeDate.toISOString();
        this.noticeForm.value.NoticeDueDate = noticeDueDate.toISOString();
        this.noticeForm.value.NoticeInformer.map(item => {
            item.InformerType = item.InformerType === true ? 1 : 0;
        });

        console.log(JSON.stringify(this.noticeForm.value));

        await this.noticeService.updByCon(this.noticeForm.value).then(isSuccess => {
            if (isSuccess) { this.onComplete() }
        })

        this.preloader.setShowPreloader(false);
    }

    private async onDelete() {
        // Set Preloader
        this.preloader.setShowPreloader(true);  

        await this.noticeService.updDelete(this.noticeCode).then(IsSuccess => {
            if (IsSuccess) {
                this.router.navigate(['/notice/list']);
            }
        })
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

    private setOfficeStore() {
        this.arrestService.masOfficegetAll().then(res =>
            this.typeheadOffice = res
        )
    }

    private setProductStore() {
        this.arrestService.masProductgetAll().then(res => {
            this.typeheadProduct = res;
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
                                    SubdistrictNameTH: r.subdistrictNameTH,
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

    searchRegion = (text3$: Observable<string>) =>
        text3$
            .debounceTime(300)
            .distinctUntilChanged()
            .map(term => term === '' ? []
                : this.typeheadRegion
                    .filter(v =>
                        v.SubdistrictNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
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

    // searchProduct = (text$: Observable<string>) =>
    //     text$
    //         .debounceTime(300)
    //         .distinctUntilChanged()
    //         .do(() => this.searching = true)
    //         .switchMap(term =>
    //             this.noticeService.productgetByKeyword(term)
    //                 .do(() => this.searchFailed = false)
    //                 .catch(() => {
    //                     this.searchFailed = true;
    //                     return Observable.of([]);
    //                 })
    //         ).do(() => this.searching = false);

    formatterProduct = (x: { BrandNameTH: string, SubBrandNameTH: string, ModelName: string }) =>
        `${x.BrandNameTH} ${x.SubBrandNameTH} ${x.ModelName}`;

    formatterRegion = (x: { SubdistrictNameTH: string, DistrictNameTH: string, ProvinceNameTH: string }) =>
        `${x.SubdistrictNameTH} ${x.DistrictNameTH} ${x.ProvinceNameTH}`;

    selectItemInformmerRegion(ele: any) {
        ele.item.NoticeCode = this.noticeCode;
        this.NoticeInformer.at(0).patchValue({
            SubDistrictCode: ele.item.subdistrictCode,
            SubDistrict: ele.item.SubdistrictNameTH,
            DistrictCode: ele.item.DistrictCode,
            District: ele.item.DistrictNameTH,
            ProvinceCode: ele.item.ProvinceCode,
            Province: ele.item.ProvinceNameTH,
            ZipCode: ele.item.ZipCode
        });
    }

    selectItemLocaleRegion(ele: any) {
        ele.item.NoticeCode = this.noticeCode;
        this.NoticeLocale.at(0).patchValue({
            SubDistrictCode: ele.item.SubDistrictCode,
            SubDistrict: ele.item.SubDistrictNameTH,
            DistrictCode: ele.item.DistrictCode,
            District: ele.item.DistrictNameTH,
            ProvinceCode: ele.item.ProvinceCode,
            Province: ele.item.ProvinceNameTH,
            ZipCode: ele.item.ZipCode
        });
    }

    selectItemProductItem(ele: any, index: number) {
        ele.item.NoticeCode = this.noticeCode;
        this.NoticeProduct.at(index).reset(ele.item)
    }

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

                await this.noticeService.productupdDelete(id).then(isSuccess => {
                    if (isSuccess === true) {
                        this.NoticeProduct.removeAt(index);
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
            if (!this.NoticeSuspect.at(index).get('SuspectID').value) {
                this.NoticeSuspect.removeAt(index);
                return false;
            }

            if (confirm(Message.confirmAction)) {
                this.preloader.setShowPreloader(true);

                await this.noticeService.suspectupdDelete(id).then(isSuccess => {
                    if (isSuccess === true) {
                        this.NoticeSuspect.removeAt(index);
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
            if (!this.NoticeDocument.at(index).get('DocumentID').value) {
                this.NoticeDocument.removeAt(index);
                return false;
            }

            if (confirm(Message.confirmAction)) {
                this.preloader.setShowPreloader(true);

                await this.noticeService.suspectupdDelete(id).then(isSuccess => {
                    if (isSuccess === true) {
                        this.NoticeSuspect.removeAt(index);
                    } 
                })

                this.preloader.setShowPreloader(false);
            }
        }
>>>>>>> FL_J
    }

    onViewSuspect(id: string) {
        this.router.navigate(['/arrest/lawbreaker', 'R', id])
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    openSuspect(e) {
        this.modal = this.suspectModalService.open(e, { size: 'lg', centered: true });
    }

}
