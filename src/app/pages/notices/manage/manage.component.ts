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
// import { NoticeMasSuspect } from '../../component/suspect-modal/notice-mas-suspect';
import { NoticeMasSuspect } from '../../component/notice-suspect-modal/notice-mas-suspect';
import { MainMasterService } from '../../../services/main-master.service';
import { MasDutyUnitModel } from '../../../models/mas-duty-unit.model';
import { async } from 'q';
import { TransactionRunningService } from 'app/services/transaction-running.service';
import { SwalComponent, BeforeOpenEvent } from '@toverux/ngx-sweetalert2';

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html'
})
export class ManageComponent implements OnInit, OnDestroy {

  @ViewChild('alertSwal') private alertSwal: SwalComponent;
  @ViewChild('deleteProduct') private deleteProduct: SwalComponent;
  @ViewChild('deleteSuspect') private deleteSuspect: SwalComponent;
  @ViewChild('deleteDocument') private deleteDocument: SwalComponent;

    private onSaveSubscribe: any;
    private onDeleSubscribe: any;
    private onPrintSubscribe: any;
    private onNextPageSubscribe: any;
    private onCancelSubscribe: any;

    actionFrom:string;
    months:any[];
    programSpect: string = 'ILG60-02-02-00';
    mode: string;
    showEditField: Boolean;
    localEditField: Boolean;
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
        private mainMasterService: MainMasterService,
        private transactionRunningService: TransactionRunningService, private activatedRoute:ActivatedRoute
    ) {
        // set false
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);
        this.navService.setInnerTextNextPageButton('งานจับกุม');
    }

    async ngOnInit() {
        this.months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
        this.activatedRoute.queryParams.subscribe(params => {
          this.actionFrom = params['from'];
        });
        this.preloader.setShowPreloader(true);

        this.sidebarService.setVersion('0.0.2.29');

        this.navigate_service();

        this.active_route();

        this.createForm();

        await this.setCommunicateStore();
        await this.setProductStore();
        await this.setStaffStore();
        await this.setRegionStore();
        await this.setProductUnitStore();
        await this.setOfficeStore();

        if (this.mode == 'R') {
            await this.getByCon(this.noticeCode);
        }else if(this.mode=="C"){
            this.NoticeInformer.at(0).patchValue({
                InformerType: true
            });
            this.onChangeConceal();
            let e = {value:1};
            this.addNoticeDueDate(e);
        }

        if(this.actionFrom=="edit"){
            let res = JSON.parse(sessionStorage.getItem("notice_form_data"));
            if(res){
                let noticeDate = res.NoticeDate;
                if(noticeDate){
                    let date = noticeDate.date;
                    res.NoticeDate = date.year+"-"+this.months[date.month-1]+"-"+date.day;
                }
                let noticeDueDate = res.NoticeDueDate;
                if(noticeDueDate){
                    let date = noticeDueDate.date;
                    res.NoticeDueDate = date.year+"-"+this.months[date.month-1]+"-"+date.day;
                }
                this.setDataInit(res);
            }
        }

        this.preloader.setShowPreloader(false);

        let url = this.router.url;
        let tmps = url.split("?");
        sessionStorage.setItem("notice_current_page", tmps[0]+"?from=edit");
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
                this.noticeCode = "NEW";//`LS${(new Date).getTime()}`;
                this.arrestCode = `TN-${(new Date).getTime()}`;

                this.localEditField = false;

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

                this.localEditField = true;
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

                sessionStorage.removeItem("notice_form_data");
            }
        });

        this.onSaveSubscribe = this.navService.onSave.subscribe(async status => {

            if (status) {

                await this.navService.setOnSave(false);

                if (!this.noticeForm.valid) {
                    this.isRequired = true;
                    this.showSwal(Message.checkData, "warning");
                    return false;
                }

                const sDateCompare = getDateMyDatepicker(this.noticeForm.value.NoticeDate);
                const eDateCompare = getDateMyDatepicker(this.noticeForm.value.NoticeDueDate);

                if (sDateCompare.valueOf() > eDateCompare.valueOf()) {
                    this.showSwal(Message.checkData, "warning");
                    return;
                }

                const noticeDate = this.noticeForm.value.NoticeDate;
                const noticeDueDate = this.noticeForm.value.NoticeDueDate;

                this.noticeForm.value.NoticeDate = noticeDate.date.day+"-"+this.months[noticeDate.date.month-1]+"-"+noticeDate.date.year;//convertDateForSave(sDateCompare);
                this.noticeForm.value.NoticeDueDate = noticeDueDate.date.day+"-"+this.months[noticeDueDate.date.month-1]+"-"+noticeDueDate.date.year;//convertDateForSave(eDateCompare);
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
                this.preloader.setShowPreloader(true);
                await this.navService.setOnPrint(false);
                this.noticeService.print(this.noticeCode).subscribe((res)=>{
                    this.preloader.setShowPreloader(false);

                    const file = new Blob([res], {type: 'application/pdf'});
                    const fileURL = URL.createObjectURL(file);

                    // let a = document.createElement("a");
                    // a.href = fileURL;
                    // a.target = "_blank";
                    // a.click();
                    window.open(fileURL, "_blank");
                });
            }
        })

        this.onNextPageSubscribe = this.navService.onNextPage.subscribe(async status => {
            if (status) {
                await this.navService.setOnNextPage(false);
                if(this.arrestCode){
                    this.router.navigateByUrl('/arrest/manage/R/'+this.arrestCode);
                }else{
                    this.router.navigateByUrl('/arrest/manage/C/NEW');
                }
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
            NoticeDue: new FormControl(1, Validators.required),
            NoticeDueDate: new FormControl(noticeDueDate, Validators.required),
            NoticeDueTime: new FormControl(null),
            GroupNameDesc: new FormControl('N/A'),
            CommunicationChanelID: new FormControl(null),
            DataSource: new FormControl(null),
            FilePath: new FormControl(null),
            ArrestCode: new FormControl(null),
            IsArrest: new FormControl(0),
            IsActive: new FormControl(1),
            NoticeStaff: this.fb.array([this.createStaffForm()]),
            NoticeInformer: this.fb.array([this.createInformerForm()]),
            NoticeLocale: this.fb.array([this.createLocaleForm()]),
            NoticeProduct: this.fb.array([]),
            NoticeSuspect: this.fb.array([]),
            NoticeDocument: this.fb.array([])
        });
    }

    private createStaffForm(): FormGroup {
        NoticeStaffFormControl.NoticeCode = new FormControl(this.noticeCode);
        if(this.actionFrom=="new"){
            NoticeStaffFormControl.StaffFullName = new FormControl(null, Validators.required);
            NoticeStaffFormControl.StaffID = new FormControl(null);
            NoticeStaffFormControl.NoticeCode = new FormControl(null, Validators.required);
            NoticeStaffFormControl.StaffCode = new FormControl(null, Validators.required);
            NoticeStaffFormControl.TitleName = new FormControl(null);
            NoticeStaffFormControl.FirstName = new FormControl(null, Validators.required);
            NoticeStaffFormControl.LastName = new FormControl(null);
            NoticeStaffFormControl.PositionCode = new FormControl(null);
            NoticeStaffFormControl.PositionName = new FormControl(null);
            NoticeStaffFormControl.PosLevel = new FormControl(null);
            NoticeStaffFormControl.PosLevelName = new FormControl(null);
            NoticeStaffFormControl.DepartmentCode = new FormControl(null);
            NoticeStaffFormControl.DepartmentName = new FormControl(null);
            NoticeStaffFormControl.DepartmentLevel = new FormControl(null);
            NoticeStaffFormControl.OfficeCode = new FormControl(null);
            NoticeStaffFormControl.OfficeName = new FormControl(null);
            NoticeStaffFormControl.OfficeShortName = new FormControl(null);
            NoticeStaffFormControl.ContributorCode = new FormControl(null);
            NoticeStaffFormControl.IsActive = new FormControl(1);
        }
        return this.fb.group(NoticeStaffFormControl)
    }

    private createInformerForm(): FormGroup {
        NoticeInformerFormControl.NoticeCode = new FormControl(this.noticeCode);
        if(this.actionFrom=="new"){
            NoticeInformerFormControl.InformerID = new FormControl('22');
            NoticeInformerFormControl.InformerType = new FormControl(null);
            NoticeInformerFormControl.TitleCode = new FormControl(null);
            NoticeInformerFormControl.TitleName = new FormControl(null);
            NoticeInformerFormControl.FirstName = new FormControl(null, Validators.required);
            NoticeInformerFormControl.LastName = new FormControl(null);
            NoticeInformerFormControl.IDCard = new FormControl('N/A');
            NoticeInformerFormControl.Age = new FormControl(null);
            NoticeInformerFormControl.GenderType = new FormControl('-');
            NoticeInformerFormControl.Location = new FormControl('N/A');
            NoticeInformerFormControl.Address = new FormControl(null);
            NoticeInformerFormControl.Village = new FormControl(null);
            NoticeInformerFormControl.Building = new FormControl(null);
            NoticeInformerFormControl.Floor = new FormControl(null);
            NoticeInformerFormControl.Room = new FormControl(null);
            NoticeInformerFormControl.Alley = new FormControl(null);
            NoticeInformerFormControl.Road = new FormControl(null);
            NoticeInformerFormControl.SubDistrictCode = new FormControl(null);
            NoticeInformerFormControl.SubDistrict = new FormControl(null);
            NoticeInformerFormControl.DistrictCode = new FormControl(null);
            NoticeInformerFormControl.District = new FormControl(null);
            NoticeInformerFormControl.ProvinceCode = new FormControl(null);
            NoticeInformerFormControl.Province = new FormControl(null);
            NoticeInformerFormControl.ZipCode = new FormControl('N/A');
            NoticeInformerFormControl.TelephoneNo = new FormControl('N/A');
            NoticeInformerFormControl.InformerInfo = new FormControl(null);
            NoticeInformerFormControl.IsActive = new FormControl(1);
            NoticeInformerFormControl.FullName = new FormControl(null);
            NoticeInformerFormControl.Region = new FormControl(null);
        }
        return this.fb.group(NoticeInformerFormControl)
    }

    private createLocaleForm(): FormGroup {
        NoticeLocaleFormControl.NoticeCode = new FormControl(this.noticeCode);
        if(this.actionFrom=="new"){
            NoticeLocaleFormControl.LocaleID = new FormControl(null);
            NoticeLocaleFormControl.Location = new FormControl(null);
            NoticeLocaleFormControl.Address = new FormControl(null);
            NoticeLocaleFormControl.Village = new FormControl(null);
            NoticeLocaleFormControl.Building = new FormControl(null);
            NoticeLocaleFormControl.Floor = new FormControl(null);
            NoticeLocaleFormControl.Room = new FormControl(null);
            NoticeLocaleFormControl.Alley = new FormControl(null);
            NoticeLocaleFormControl.Road = new FormControl(null);
            NoticeLocaleFormControl.SubDistrictCode = new FormControl(null);
            NoticeLocaleFormControl.SubDistrict = new FormControl(null);
            NoticeLocaleFormControl.DistrictCode = new FormControl(null);
            NoticeLocaleFormControl.District = new FormControl(null);
            NoticeLocaleFormControl.ProvinceCode = new FormControl(null, Validators.required);
            NoticeLocaleFormControl.Province = new FormControl(null);
            NoticeLocaleFormControl.ZipCode = new FormControl('N/A');
            NoticeLocaleFormControl.Policestation = new FormControl(null);
            NoticeLocaleFormControl.IsActive = new FormControl(1);
            NoticeLocaleFormControl.Region = new FormControl(null);
        }
        return this.fb.group(NoticeLocaleFormControl)
    }

    private createProductForm(): FormGroup {
        NoticeProductFormControl.NoticeCode = new FormControl(this.noticeCode);
        if(this.actionFrom=="new"){
            NoticeProductFormControl.ProductID = new FormControl(null);
            NoticeProductFormControl.GroupCode = new FormControl(null);
            NoticeProductFormControl.IsDomestic = new FormControl(null);
            NoticeProductFormControl.ProductCode = new FormControl(null);
            NoticeProductFormControl.BrandCode = new FormControl(null);
            NoticeProductFormControl.BrandNameTH = new FormControl(null);
            NoticeProductFormControl.BrandNameEN = new FormControl(null);
            NoticeProductFormControl.SubBrandCode = new FormControl(null);
            NoticeProductFormControl.SubBrandNameTH = new FormControl(null);
            NoticeProductFormControl.SubBrandNameEN = new FormControl(null);
            NoticeProductFormControl.ModelCode = new FormControl(null);
            NoticeProductFormControl.ModelName = new FormControl(null);
            NoticeProductFormControl.FixNo1 = new FormControl(null);
            NoticeProductFormControl.DegreeCode = new FormControl(null);
            NoticeProductFormControl.Degree = new FormControl(null);
            NoticeProductFormControl.SizeCode = new FormControl(null);
            NoticeProductFormControl.Size = new FormControl(null);
            NoticeProductFormControl.SizeUnitCode = new FormControl(null);
            NoticeProductFormControl.SizeUnitName = new FormControl(null);
            NoticeProductFormControl.FixNo2 = new FormControl(null);
            NoticeProductFormControl.SequenceNo = new FormControl(null);
            NoticeProductFormControl.ProductDesc = new FormControl(null);
            NoticeProductFormControl.CarNo = new FormControl(null);
            NoticeProductFormControl.Qty = new FormControl(null);
            NoticeProductFormControl.QtyUnit = new FormControl(null);
            NoticeProductFormControl.NetVolume = new FormControl(0);
            NoticeProductFormControl.NetVolumeUnit = new FormControl(null);
            NoticeProductFormControl.Remarks = new FormControl(null);
            NoticeProductFormControl.IsActive = new FormControl(1);
        
            NoticeProductFormControl.BrandFullName = new FormControl(null);
            NoticeProductFormControl.IsNewItem = new FormControl(false);
        }
        return this.fb.group(NoticeProductFormControl)
    }

    private setItemFormArray(array: any[], formControl: string) {
        if (array !== undefined && array.length) {
            const itemFGs = array.map(item => this.fb.group(item));
            const itemFormArray = this.fb.array(itemFGs);
            this.noticeForm.setControl(formControl, itemFormArray);
        }
    }

    private async setDataInit(res:any){
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
    }

    private async getByCon(code: string) {
        await this.noticeService.getByCon(code).then(async res => {
            
            // this.noticeCode = res.NoticeCode;
            // this.arrestCode = res.ArrestCode;
            // await this.noticeForm.reset({
            //     NoticeCode: res.NoticeCode,
            //     NoticeStationCode: res.NoticeStationCode,
            //     NoticeStation: res.NoticeStation,
            //     NoticeDate: setDateMyDatepicker(new Date(res.NoticeDate)),
            //     NoticeTime: res.NoticeTime,
            //     NoticeDue: res.NoticeDue,
            //     NoticeDueDate: setDateMyDatepicker(new Date(res.NoticeDueDate)),
            //     GroupNameDesc: res.GroupNameDesc || 'N/A',
            //     CommunicationChanelID: res.CommunicationChanelID,
            //     ArrestCode: res.ArrestCode,
            //     IsActive: res.IsActive,
            //     IsArrest: res.IsArrest || 1
            // });

            // const staff = res.NoticeStaff.filter(item => item.IsActive == 1);
            // staff.map(item => {
            //     item.StaffFullName = `${item.TitleName} ${item.FirstName} ${item.LastName}`
            // });

            // await res.NoticeLocale.map(item =>
            //     item.Region = `${item.SubDistrict} ${item.District} ${item.Province}`
            // )

            // const informer = res.NoticeInformer.filter(item => item.IsActive == 1);
            // informer.map(item => {
            //     this.isConceal = item.InformerType == 1 ? true : false;
            //     item.Region = item.SubDistrict == null ? '' : `${item.SubDistrict}`;
            //     item.Region += item.District == null ? '' : ` ${item.District}`;
            //     item.Region += item.Province == null ? '' : ` ${item.Province}`;
            // });

            // const suspect = res.NoticeSuspect.filter(item => item.IsActive == 1);
            // suspect.map(item => {
            //     item.SuspectFullName = !item.SuspectTitleName ? '' : item.SuspectTitleName;
            //     item.SuspectFullName += !item.SuspectFirstName ? '' : ` ${item.SuspectFirstName}`;
            //     item.SuspectFullName += !item.SuspectFirstName ? '' : ` ${item.SuspectFirstName}`;

            //     item.CompanyFullName = !item.CompanyTitleName ? '' : item.CompanyTitleName;
            //     item.CompanyFullName += !item.CompanyName ? '' : ` ${item.CompanyName}`;

            //     item.SuspectType = item.SuspectType || 0;
            //     item.EntityType = item.EntityType || 0;
            //     item.SuspectTypeName = item.SuspectTypeName || this.suspectTypes.find(el => parseInt(el.value) == item.SuspectType).text;
            //     item.EntityTypeName = item.EntityTypeName || this.entityTypes.find(el => parseInt(el.value) == item.EntityType).text;
            // }
            // )

            // const product = res.NoticeProduct.filter(item => item.IsActive == 1);
            // product.map(item => {
            //     item.BrandFullName = item.BrandNameTH == null ? '' : item.BrandNameTH;
            //     item.BrandFullName += item.SubBrandNameTH == null ? '' : ` ${item.SubBrandNameTH}`;
            //     item.BrandFullName += item.ModelName == null ? '' : ` ${item.ModelName}`;
            //     item.NetWeight = item.NetWeight || '0';
            //     item.NetWeightUnit = item.NetWeightUnit || '0';
            // }
            // )

            // await this.setItemFormArray(staff, 'NoticeStaff');
            // await this.setItemFormArray(informer, 'NoticeInformer');
            // await this.setItemFormArray(res.NoticeLocale, 'NoticeLocale');
            // await this.setItemFormArray(product, 'NoticeProduct');
            // await this.setItemFormArray(suspect, 'NoticeSuspect');
            this.setDataInit(res);
        });

        // await this.noticeService.getDocument(code).then(async res => {
        //     res.map(item => item.IsNewItem = false)
        //     await this.setItemFormArray(res, 'NoticeDocument')
        // })
    }

    private async onCreate() {

        console.log('===================');
        console.log('Create Notice : ', JSON.stringify(this.noticeForm.value));
        console.log('===================');

        let noticeForm = this.noticeForm.value;

        let noticeStaff = [];
        let noticeInformer = [];
        let noticeLocale = [];
        let noticeProduct = [];
        let noticeSuspect = [];
        let noticeDocument = [];
        for(let l of noticeForm.NoticeStaff){
            l.NoticeCode = this.noticeCode;
            l.ContributorID = 4;
            l.IsActive = 1;
            noticeStaff.push(l);
        }
        for(let l of noticeForm.NoticeInformer){
            l.NoticeCode = this.noticeCode;
            l.IsActive = 1;
            noticeInformer.push(l);
        }
        for(let l of noticeForm.NoticeLocale){
            l.NoticeCode = this.noticeCode;
            l.IsActive = 1;
            noticeLocale.push(l);
        }
        for(let l of noticeForm.NoticeProduct){
            l.NoticeCode = this.noticeCode;
            l.IsActive = 1;
            l.NetVolume = l.NetVolume?l.NetVolume:0;
            if(!l.ProductCode){
                this.isRequired = true;
                this.showSwal(Message.checkData, "warning");
                return false;
            }
            noticeProduct.push(l);
        }
        for(let l of noticeForm.NoticeSuspect){
            l.NoticeCode = this.noticeCode;
            l.IsActive = 1;
            noticeSuspect.push(l);
        }
        for(let l of noticeForm.NoticeDocument){
            l.NoticeCode = this.noticeCode;
            l.IsActive = 1;
            noticeDocument.push(l);
        }
        this.noticeForm.value.NoticeStaff = noticeStaff;
        this.noticeForm.value.NoticeInformer = noticeInformer;
        this.noticeForm.value.NoticeLocale = noticeLocale;
        this.noticeForm.value.NoticeProduct = noticeProduct;
        this.noticeForm.value.NoticeSuspect = noticeSuspect;
        this.noticeForm.value.NoticeDocument = noticeDocument;

        // Set Preloader
        this.preloader.setShowPreloader(true);
        let IsSuccess: boolean = true;
        await this.noticeService.insAll(this.noticeForm.value).then(async isSuccess => {
            if (!isSuccess) { IsSuccess = false; return false; };
        }, () => { IsSuccess = false; return; });

        // if (IsSuccess) {
        //     await this.NoticeDocument.value.map(async doc => {
        //         // insert Document
        //         await this.noticeService.noticeDocumentinsAll(doc).then(docIsSuccess => {
        //             if (!docIsSuccess) { IsSuccess = false; return false; };

        //         }, () => { IsSuccess = false; return false; });
        //     });
        // }

        if (IsSuccess) {
            this.showSwal(Message.saveComplete, "success");
            // this.router.routeReuseStrategy.shouldReuseRoute = function() {
            //   return false;
            // };
            this.router.navigateByUrl('/notice/manage/R/'+this.noticeCode);
            this.getByCon(this.noticeCode);

            sessionStorage.removeItem("notice_form_data");
        } else {
            this.showSwal(Message.saveFail, "error");
        }

        this.preloader.setShowPreloader(false);
    }

    private async onReviced() {
        let noticeForm = this.noticeForm.value;
        for(let l of noticeForm.NoticeProduct){
            if(!l.ProductCode){
                this.isRequired = true;
                this.showSwal(Message.checkData, "warning");
                return false;
            }
        }

        // Set Preloader
        this.preloader.setShowPreloader(true);

        console.log('===================');
        console.log('Update Notice : ', JSON.stringify(this.noticeForm.value));
        console.log('===================');

        let IsSuccess: boolean = true;
        await this.noticeService.updByCon(this.noticeForm.value).then(async isSuccess => {
            if (!isSuccess) { IsSuccess = false; return; };
        }, () => { IsSuccess = false; return; });

        if (IsSuccess) {
            const products = this.NoticeProduct.value;
            if(products && products.length>0){
                for(let i in products){
                    let l = products[i];
                    if(l.IsNewItem){
                        l.IsActive = 1;
                        l.NetVolume = l.NetVolume?l.NetVolume:0;
                        await this.noticeService.insProductAll(l).then(async isSuccess => {});
                    }else{
                        await this.noticeService.updProduct(l).then(async isSuccess=>{});
                    }
                }
            }

            const suspects = this.NoticeSuspect.value;
            if(suspects && suspects.length>0){
                for(let i in suspects){
                    let l = suspects[i];
                    if(l.IsNewItem){
                        await this.noticeService.insSuspect(l).then(async isSuccess => {});
                    }
                }
            }
        //     const document = this.NoticeDocument.value;
        //     await document.map(async (item: NoticeDocument) => {
        //         if (item.IsNewItem) {
        //             await this.noticeService.noticeDocumentinsAll(item).then(docIsSuccess => {
        //                 if (!docIsSuccess) { IsSuccess = false; return; };
        //             }, () => { IsSuccess = false; return; });

        //         } else {
        //             this.noticeService.noticeDocumentupd(item).then(docIsSuccess => {
        //                 if (!docIsSuccess) { IsSuccess = false; return };
        //             }, () => { IsSuccess = false; return; })
        //         }
        //     })
        }

        if (IsSuccess) {
            this.showSwal(Message.saveComplete, "success");
            this.onComplete();
        } else {
            this.showSwal(Message.saveFail, "error");
        }

        this.preloader.setShowPreloader(false);
    }

    private onDelete() {
        if (confirm(Message.confirmAction)) {
            // Set Preloader
            this.preloader.setShowPreloader(true);
            this.noticeService.updDelete(this.noticeCode).then(IsSuccess => {
                this.preloader.setShowPreloader(false);
                if (IsSuccess) {
                    this.showSwal(Message.delComplete, "success");
                    this.router.navigate(['/notice/list']);
                } else {
                    this.showSwal(Message.delFail, "error");
                }
            });
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

        this.getByCon(this.noticeCode);

    }

    getTransactionRunning(officeCode:any):void{
        this.transactionRunningService.TransactionRunninggetByCon("ops_notice", officeCode).then(res=>{
            if(res.length>0){
                const data = res[0];
                this.transactionRunningService.TransactionRunningupdByCon(data.RunningID).then(res=>{
                    let str = ""+data.RunningNo;
                    var pad = "00000"
                    var ans = pad.substring(0, pad.length - str.length) + str
                    this.noticeCode = "LS"+officeCode+""+data.RunningYear+ans;

                    this.noticeForm.patchValue({
                        NoticeCode: this.noticeCode
                    });
                });
            }else{
                this.transactionRunningService.TransactionRunninginsAll(officeCode, "ops_notice", "LS").then(res=>{
                    this.getTransactionRunning(officeCode);
                });
            }
        });
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
                this.showSwal(Message.checkDate, "warning");
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
                    MistreatNo: item.MistreatNo
                }
                this.NoticeSuspect.push(this.fb.group(noticeSuspect))
            });
        }
    }

    addDocument() {
        const lastIndex = this.NoticeDocument.length - 1;
        let document = new NoticeDocument();
        document.DocumentID = ""+(lastIndex + 1);
        document.DocumentName = "";
        document.FilePath = "";
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
                    .filter(v => (v.ProductDesc.toLowerCase().indexOf(term.toLowerCase()) > - 1)
                        // (v.SubBrandNameTH && v.SubBrandNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        // (v.BrandNameTH && v.BrandNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        // (v.ModelName && v.ModelName.toLowerCase().indexOf(term.toLowerCase()) > -1)
                    ).slice(0, 10));

    searchStaff = (text3$: Observable<string>) =>
        text3$
            .debounceTime(200)
            .distinctUntilChanged()
            .map(term => this.typeheadStaff
                    .filter(v => 
                        (`${v.TitleName || ''} ${v.FirstName || ''} ${v.LastName || ''}`
                            .toLowerCase().indexOf(term.toLowerCase()) > -1)
                        // (v.TitleName && v.TitleName.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        // (v.FirstName && v.FirstName.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        // (v.LastName && v.LastName.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        // (' '.indexOf(term) > -1)
                    ).slice(0, 10));

    serachOffice = (text3$: Observable<string>) =>
        text3$
            .debounceTime(200)
            .distinctUntilChanged()
            .map(term => term === '' ? []
                : this.typeheadOffice
                    .filter(v => 
                        (`${v.OfficeName || ''} ${v.OfficeShortName || ''}`.toLowerCase().indexOf(term.toLowerCase()) > -1)
                        // (v.OfficeName && v.OfficeName.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        // (v.OfficeShortName && v.OfficeShortName.toLowerCase().indexOf(term.toLowerCase()) > -1)
                    ).slice(0, 10));

    // formatterProduct = (x: { BrandNameTH: String, SubBrandNameTH: String, ModelName: String }) =>
    //     `${x.SubBrandNameTH || ''} ${x.BrandNameTH || ''} ${x.ModelName || ''}`;
    formatterProduct = (x: { ProductDesc: String }) =>
        `${x.ProductDesc || ''}`;

    formatterRegion = (x: { SubdistrictNameTH: string, DistrictNameTH: string, ProvinceNameTH: string }) =>
        `${x.SubdistrictNameTH || ''}/${x.DistrictNameTH || ''}/${x.ProvinceNameTH || ''}`;

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
    blurSelectItemInformmerRegion() {
        let obj = this.NoticeInformer.at(0).value;
        if(!obj.ProvinceCode){
            this.NoticeInformer.at(0).patchValue({
                Region: ""
            });
        }
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
    blurSelectItemLocaleRegion() {
        let obj = this.NoticeLocale.at(0).value;
        if(!obj.ProvinceCode){
            this.NoticeLocale.at(0).patchValue({
                Region: ""
            });
        }
    }

    selectItemProductItem(ele: any, index: number) {
        const productId = this.NoticeProduct.at(index).value.ProductID;
        if(productId){
            ele.item.ProductID = productId;
        }
        this.NoticeProduct.at(index).reset(ele.item);
        this.NoticeProduct.at(index).patchValue({
            IsActive: 1,
            IsNewItem: true,
            NoticeCode: this.noticeCode,
            GroupCode: ele.item.GroupCode || '1',
            IsDomestic: ele.item.IsDomestic || '1',
            NetVolume: ele.item.NetVolume || 0,
            NetVolumeUnit: ele.item.NetVolumeUnit || 0,
            BrandFullName: ele.item.ProductDesc
        });
    }
    blurSelectItemProductItem(index: number) {
        const productID = this.NoticeProduct.at(index).value.ProductID;
        if(!productID){
            this.NoticeProduct.at(index).patchValue({
                BrandFullName: ""
            });
        }
    }

    selectItemStaff(e, i) {
        this.NoticeStaff.at(i).reset(e.item);
        this.NoticeStaff.at(i).patchValue({
            ProgramCode: this.programSpect,
            ProcessCode: '0002',
            NoticeCode: this.noticeCode,
            IsActive: 1,
            StaffFullName: `${e.item.TitleName || ''} ${e.item.FirstName || ''} ${e.item.LastName || ''}`,
            PositionCode: e.item.OperationPosCode || e.item.OperationPosCode,
            PositionName: e.item.OperationPosName || e.item.OperationPosName,
            DepartmentLevel: e.item.DepartmentLevel || e.item.DeptLevel,
            DepartmentCode: e.item.DepartmentCode || e.item.OfficeCode,
            DepartmentName: `${e.item.DepartmentName || e.item.OfficeName}`,
            ContributorCode: e.item.ContributorCode || 2,
            ContributorID: e.item.ContributorID || 1
        });

        if(this.mode=="C"){
            this.getTransactionRunning(e.item.DepartmentCode||e.item.OfficeCode);
        }
    }
    blurSelectItemStaff(i){
        let noticeStaff = this.NoticeStaff.at(i).value;
        if(!noticeStaff.StaffCode){
            this.NoticeStaff.at(i).patchValue({
                StaffFullName: ""
            });
        }
    }

    selectItemOffice(e) {
        this.noticeForm.patchValue({
            NoticeStationCode: e.item.OfficeCode || '-',
            NoticeStation: e.item.OfficeName
        });
    }
    blurSelectItemOffice(){
        if(!this.noticeForm.value.NoticeStationCode){
            this.noticeForm.patchValue({NoticeStation:""});
        }
    }

    productId:any = "";
    productIndex:any = "";
    beforeDeleteProduct(id: string, index: number){
        this.productId = id;
        this.productIndex = index;
        if (this.mode === 'C') {
            this.NoticeProduct.removeAt(this.productIndex);
        } else if (this.mode === 'R') {
            if (this.NoticeProduct.at(this.productIndex).value.IsNewItem) {
                this.NoticeProduct.removeAt(this.productIndex);
                return;
            }
            this.deleteProduct.text = Message.confirmAction;
            this.deleteProduct.show();
        }
    }
    async onDeleteProduct() {
        if (this.mode === 'C') {
            // this.NoticeProduct.removeAt(this.productIndex);

        } else if (this.mode === 'R') {
            // if (this.NoticeProduct.at(this.productIndex).value.IsNewItem) {
            //     this.NoticeProduct.removeAt(this.productIndex);
            //     return;
            // }

            // if (confirm(Message.confirmAction)) {
                this.preloader.setShowPreloader(true);

                await this.noticeService.productupdDelete(this.productId).then(isSuccess => {
                    if (isSuccess === true) {
                        this.NoticeProduct.removeAt(this.productIndex);
                        this.showSwal(Message.delProductComplete, "success");
                    } else {
                        this.showSwal(Message.delProductFail, "error");
                    }
                })

                this.preloader.setShowPreloader(false);
            // }
        }
    }

    suspectId:any="";
    suspectIndex:any="";
    beforeDeleteSuspect(id: string, index: number){
        this.suspectId = id;
        this.suspectIndex = index;
        if (this.mode === 'C') {
            this.NoticeSuspect.removeAt(index);

        } else if (this.mode === 'R') {
            if (this.NoticeSuspect.at(index).value.IsNewItem) {
                this.NoticeSuspect.removeAt(index);
                return;
            }

            this.deleteSuspect.text = Message.confirmAction;
            this.deleteSuspect.show();
        }
    }
    async onDeleteSuspect() {
        if (this.mode === 'C') {
            // this.NoticeSuspect.removeAt(this.suspectIndex);

        } else if (this.mode === 'R') {

            this.preloader.setShowPreloader(true);

            await this.noticeService.suspectupdDelete(this.suspectId).then(isSuccess => {
                if (isSuccess === true) {
                    this.NoticeSuspect.removeAt(this.suspectIndex);
                    this.showSwal(Message.delSuspcetComplete, "success");
                } else {
                    this.showSwal(Message.delSuspectFail, "error");
                }
            })
            this.preloader.setShowPreloader(false);
        }
    }

    documentId:any = "";
    documentIndex:any = "";
    beforeDeleteDocument(id: string, index: number) {
        this.documentId = id;
        this.documentIndex = index;
        if (this.mode === 'C') {
            this.NoticeDocument.removeAt(index);
        } else if (this.mode === 'R') {
            if (this.NoticeDocument.at(index).value.IsNewItem) {
                this.NoticeDocument.removeAt(index);
                return;
            }

            this.deleteDocument.text = Message.confirmAction;
            this.deleteDocument.show();
        }
    }
    async onDeleteDocument() {
        if (this.mode === 'C') {
            // this.NoticeDocument.removeAt(index);

        } else if (this.mode === 'R') {
            this.preloader.setShowPreloader(true);

            await this.noticeService.noticeDocumentupdDelete(this.documentId).then(isSuccess => {
                if (isSuccess === true) {
                    this.NoticeDocument.removeAt(this.documentIndex);
                    this.showSwal(Message.delDocumentComplete, "success");
                } else {
                    this.showSwal(Message.delDocumentFail, "error");
                }
            })
            this.preloader.setShowPreloader(false);
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
        sessionStorage.setItem("notice_form_data", JSON.stringify(this.noticeForm.value));
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

    private showSwal(msg:string, iconType:any){
        this.alertSwal.text = msg;
        this.alertSwal.type = iconType;
        this.alertSwal.show();
    }
}
