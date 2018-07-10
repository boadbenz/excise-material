import { Component, OnInit, OnDestroy, Input, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { NoticeInformer } from '../notice-informer';
import { NoticeStaff } from '../notice-staff';
import { NoticeService } from '../notice.service';
import { regions } from '../../../models/region';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import { toLocalNumeric } from 'app/config/dateFormat';

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html'
})
export class ManageComponent implements OnInit, OnDestroy {

    private sub: any;
    mode: string;
    modal: any;
    noticeCode: string;
    noticeForm: FormGroup;
    showEditField: any;
    searching = false;

    region = regions

    get NoticeStaffForm(): FormArray {
        return this.noticeForm.get('NoticeStaffForm') as FormArray;
    }

    get NoticeInformerForm(): FormArray {
        return this.noticeForm.get('NoticeInformerForm') as FormArray;
    }

    get NoticeLocaleForm(): FormArray {
        return this.noticeForm.get('NoticeLocaleForm') as FormArray;
    }

    get NoticeProductForm(): FormArray {
        return this.noticeForm.get('NoticeProductForm') as FormArray;
    }

    get NoticeSuspectForm(): FormArray {
        return this.noticeForm.get('NoticeSuspectForm') as FormArray;
    }

    constructor(
        private activeRoute: ActivatedRoute,
        private suspectModalService: NgbModal,
        private fb: FormBuilder,
        private navService: NavigationService,
        private noticeService: NoticeService
    ) {
        // set false
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);
        // set true
        this.navService.setNextPageButton(true);
    }

    ngOnInit() {
        this.active_route();

        this.navigate_service();

        this.createForm();
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

                this.noticeForm.reset({ NoticeCode: `NT-${(new Date).getTime}` })

            } else if (p['mode'] === 'R') {
                // set false
                this.navService.setSaveButton(false);
                this.navService.setCancelButton(false);
                // set true
                this.navService.setPrintButton(true);
                this.navService.setEditButton(true);
                this.navService.setDeleteButton(true);
                this.navService.setEditField(true);

                if (p['code']) {
                    this.noticeCode = p['code'];
                    this.getByCon(p['code']);
                }
            }
        });
    }

    private navigate_service() {
        this.sub = this.navService.showFieldEdit.subscribe(p => {
            this.showEditField = p;
        });

        this.sub = this.navService.onSave.subscribe(status => {
            if (status) {
                // set true
                this.navService.setEditField(true);
                this.navService.setEditButton(true);
                this.navService.setPrintButton(true);
                this.navService.setDeleteButton(true);
                // set false
                this.navService.setSaveButton(false);
                this.navService.setCancelButton(false);
            }
        });
    }

    private createForm() {
        this.noticeForm = this.fb.group({
            NoticeCode: [null],
            NoticeStationCode: [null],
            NoticeStation: [null],
            NoticeDate: [null],
            NoticeTime: [null],
            NoticeDue: [null],
            NoticeDueDate: [null],
            GroupNameDesc: [null],
            CommunicationChanelID: [null],
            DataSource: [null],
            FilePath: [null],
            ArrestCode: [null],
            IsActive: [null],
            NoticeStaffForm: this.fb.array([this.createStaffForm()]),
            NoticeInformerForm: this.fb.array([this.createInformerForm()]),
            NoticeLocaleForm: this.fb.array([this.createLocaleForm()]),
            NoticeProductForm: this.fb.array([this.createProductForm()]),
            NoticeSuspectForm: this.fb.array([this.createSuspectForm()])
        })
    }

    private createStaffForm(): FormGroup {
        return this.fb.group({
            StaffID: [null],
            ProgramCode: [null],
            ProcessCode: [null],
            ArrestCode: [null],
            StaffCode: [null],
            TitleName: [null],
            FirstName: [null],
            LastName: [null],
            PositionCode: [null],
            PositionName: [null],
            PosLevel: [null],
            PosLevelName: [null],
            DepartmentCode: [null],
            DepartmentName: [null],
            DepartmentLevel: [null],
            OfficeCode: [null],
            OfficeName: [null],
            OfficeShortName: [null],
            ContributorID: [null],
            IsActive: [null],
            StaffFullName: [null]
        })
    }

    private createInformerForm(): FormGroup {
        return this.fb.group({
            InformerID: [null],
            InformerType: [null],
            NoticeCode: [null],
            TitleCode: [null],
            TitleName: [null],
            FirstName: [null],
            LastName: [null],
            FullName: [null],
            IDCard: [null],
            Age: [null],
            GenderType: [null],
            Location: [null],
            Address: [null],
            Village: [null],
            Building: [null],
            Floor: [null],
            Room: [null],
            Alley: [null],
            Road: [null],
            SubDistrictCode: [null],
            SubDistrict: [null],
            DistrictCode: [null],
            District: [null],
            ProvinceCode: [null],
            Province: [null],
            ZipCode: [null],
            TelephoneNo: [null],
            InformerInfo: [null],
            IsActive: [null],
            Region: [null]
        })
    }

    private createLocaleForm(): FormGroup {
        return this.fb.group({
            LocaleID: [null],
            IsArrest: [null],
            ArrestCode: [null],
            GPS: [null],
            Location: [null],
            Address: [null],
            Village: [null],
            Building: [null],
            Floor: [null],
            Room: [null],
            Alley: [null],
            Road: [null],
            SubDistrictCode: [null],
            SubDistrict: [null],
            DistrictCode: [null],
            District: [null],
            ProvinceCode: [null],
            Province: [null],
            ZipCode: [null],
            Policestation: [null],
            IsActive: [null],
            Region: [null]
        })
    }

    private createProductForm(): FormGroup {
        return this.fb.group({
            ProductID: [null],
            ProductType: [null],
            ArrestCode: [null],
            GroupCode: [null],
            IsDomestic: [null],
            ProductCode: [null],
            BrandCode: [null],
            BrandNameTH: [null],
            BrandNameEN: [null],
            SubBrandCode: [null],
            SubBrandNameTH: [null],
            SubBrandNameEN: [null],
            ModelCode: [null],
            ModelName: [null],
            FixNo1: [null],
            DegreeCode: [null],
            Degree: [null],
            SizeCode: [null],
            Size: [null],
            SizeUnitCode: [null],
            SizeUnitName: [null],
            FixNo2: [null],
            SequenceNo: [null],
            ProductDesc: [null],
            CarNo: [null],
            Qty: [null],
            QtyUnit: [null],
            NetVolume: [null],
            NetVolumeUnit: [null],
            IsActive: [null],
            BrandFullName: [null]
        })
    }

    private createSuspectForm(): FormGroup {
        return this.fb.group({
            SuspectID: [null],
            SuspectReferenceID: [null],
            NoticeCode: [null],
            SuspectTitleName: [null],
            SuspectFirstName: [null],
            SuspectLastName: [null],
            CompanyTitleName: [null],
            CompanyName: [null],
            CompanyOtherName: [null],
            IsActive: [null],
            SuspectFullName: [null],
        })
    }

    private setItemFormArray(array: any[], formControl: string) {
        if (array !== undefined && array.length) {
            const itemFGs = array.map(item => this.fb.group(item));
            const itemFormArray = this.fb.array(itemFGs);
            this.noticeForm.setControl(formControl, itemFormArray);
        }
    }

    private getByCon(code: string) {
        this.noticeService.getByCon(code).then(async res => {
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

            await res.NoticeInformer.map(item =>
                item.FullName = `${item.TitleName} ${item.FirstName} ${item.LastName}`
            );

            await res.NoticeSuspect.map(item =>
                item.SuspectFullName = `${item.SuspectTitleName} ${item.SuspectFirstName} ${item.SuspectLastName}`
            )

            await res.NoticeProduct.map(item =>
                item.BrandFullName = `${item.BrandNameTH} ${item.SubBrandNameTH} ${item.ModelName}`
            )

            this.setItemFormArray(res.NoticeStaff, 'NoticeStaffForm');
            this.setItemFormArray(res.NoticeInformer, 'NoticeInformerForm');
            this.setItemFormArray(res.NoticeLocale, 'NoticeLocaleForm');
            this.setItemFormArray(res.NoticeProduct, 'NoticeProductForm');
            this.setItemFormArray(res.NoticeSuspect, 'NoticeSuspectForm');
        })
    }

    searchRegion = (text$: Observable<string>) =>
        text$
            .debounceTime(200)
            .distinctUntilChanged()
            .map(term =>
                this.region
                    .map(item => `${item.SubDistrict} / ${item.District} / ${item.Province}`)
                    .filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
            );

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    openSuspect(e) {
        this.modal = this.suspectModalService.open(e, { size: 'lg', centered: true });
    }

}
