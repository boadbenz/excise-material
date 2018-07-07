import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { ArrestsService } from '../arrests.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { toLocalNumeric } from 'app/config/dateFormat';
import { ArrestStaff, Contributor } from '../arrest-staff';
import { Message } from 'app/config/message';
import { ArrestProduct } from '../arrest-product';
import { ArrestDocument } from '../arrest-document';

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit, OnDestroy {

    private sub: any;
    private mode: string;
    modal: any;
    arrestCode: string;
    showEditField: any;

    arrestForm: FormGroup;

    get ArrestStaff(): FormArray {
        return this.arrestForm.get('ArrestStaff') as FormArray;
    }

    get ArrestLocale(): FormArray {
        return this.arrestForm.get('ArrestLocale') as FormArray;
    }

    get ArrestLawbreaker(): FormArray {
        return this.arrestForm.get('ArrestLawbreaker') as FormArray;
    }

    get ArrestProduct(): FormArray {
        return this.arrestForm.get('ArrestProduct') as FormArray;
    }

    get ArrestIndictment(): FormArray {
        return this.arrestForm.get('ArrestIndictment') as FormArray;
    }

    get ArrestDocument(): FormArray {
        return this.arrestForm.get('ArrestDocument') as FormArray;
    }

    @ViewChild('printDocModal') printDocModel: ElementRef;

    constructor(
        private fb: FormBuilder,
        private activeRoute: ActivatedRoute,
        private suspectModalService: NgbModal,
        private navService: NavigationService,
        private ngbModel: NgbModal,
        private arrestService: ArrestsService,
        private router: Router
    ) {
        // set false
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);
        // set true
        this.navService.setNextPageButton(true);
    }

    ngOnInit() {
        this.active_route();

        this.navigate_Service();

        this.createForm();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    private createForm() {
        this.arrestForm = this.fb.group({
            ArrestCode: [null],
            ArrestDate: [null],
            ArrestTime: [null],
            OccurrenceDate: [null],
            OccurrenceTime: [null],
            ArrestStationCode: [null],
            ArrestStation: [null],
            HaveCulprit: [null],
            Behaviour: [null],
            Testimony: [null],
            Prompt: [null],
            IsMatchNotice: [null],
            ArrestDesc: [null],
            NoticeCode: [null],
            InvestigationSurveyDocument: [null],
            InvestigationCode: [null],
            IsActive: [null],
            ArrestStaff: this.fb.array([this.createStaffForm()]),
            ArrestLocale: this.fb.array([this.createLocaleForm()]),
            ArrestLawbreaker: this.fb.array([this.createLawbreakerForm()]),
            ArrestProduct: this.fb.array([this.createProductForm()]),
            ArrestIndictment: this.fb.array([this.createIndicmentForm()]),
            ArrestDocument: this.fb.array([this.createDocumentForm()])
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
            FullName: [null]
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

    private createLawbreakerForm(): FormGroup {
        return this.fb.group({
            LawbreakerID: [null],
            ArrestCode: [null],
            LawbreakerRefID: [null],
            EntityType: [null],
            CompanyTitleCode: [null],
            CompanyTitle: [null],
            CompanyName: [null],
            CompanyOtherName: [null],
            CompanyRegistrationNo: [null],
            CompanyLicenseNo: [null],
            CompanyFullName: [null],
            FoundedDate: [null],
            LicenseDateForm: [null],
            LicenseDateTo: [null],
            TaxID: [null],
            ExciseRegNo: [null],
            LawbreakerType: [null],
            LawbreakerTitleCode: [null],
            LawbreakerTitleName: [null],
            LawbreakerFirstName: [null],
            LawbreakerMiddleName: [null],
            LawbreakerLastName: [null],
            LawbreakerOtherName: [null],
            LawbreakerDesc: [null],
            LawbreakerFullName: [null],
            IDCard: [null],
            PassportNo: [null],
            VISAType: [null],
            PassportCountryCode: [null],
            PassportCountryName: [null],
            PassportDateIn: [null],
            PassportDateOut: [null],
            BirthDate: [null],
            GenderType: [null],
            BloodType: [null],
            NationalityCode: [null],
            NationalityNameTH: [null],
            RaceCode: [null],
            RaceName: [null],
            ReligionCode: [null],
            ReligionName: [null],
            MaritalStatus: [null],
            Career: [null],
            FatherName: [null],
            MotherName: [null],
            Remarks: [null],
            LinkPhoto: [null],
            PhotoDesc: [null],
            IsActive: [null],
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
            IsActive: [null]
        })
    }

    private createIndicmentForm(): FormGroup {
        return this.fb.group({
            IndictmentID: [null],
            IsProve: [null],
            IsActive: [null],
            GuiltBaseID: [null],
        })
    }

    private createDocumentForm(): FormGroup {
        return this.fb.group({
            DocumentID: [null],
            ReferenceCode: [null],
            FilePath: [null],
            DataSource: [null],
            IsActive: [null],
        })
    }

    private setItemFormArray(array: any[], formControl: string) {
        if (array !== undefined && array.length) {
            const itemFGs = array.map(item => this.fb.group(item));
            const itemFormArray = this.fb.array(itemFGs);
            this.arrestForm.setControl(formControl, itemFormArray);
        }
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

            if (p['code']) {
                this.arrestCode = p['code'];
                this.getByCon(p['code']);
            }
        });
    }

    private navigate_Service() {
        this.sub = this.navService.showFieldEdit.subscribe(p => {
            this.showEditField = p;
        });

        this.sub = this.navService.onSave.subscribe(async status => {
            if (status) {
                // set action save = false
                await this.navService.setOnSave(false);
                if (this.mode === 'C') {
                    this.onCreate();

                } else if (this.mode === 'R') {
                    this.onReviced();
                }
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
    }

    private getByCon(code: string) {
        this.arrestService.getByCon(code).then(async res => {
            await this.arrestForm.reset({
                ArrestCode: res.ArrestCode,
                ArrestDate: toLocalNumeric(res.ArrestDate),
                ArrestTime: res.ArrestTime,
                OccurrenceDate: toLocalNumeric(res.OccurrenceDate),
                OccurrenceTime: res.OccurrenceTime,
                ArrestStationCode: res.ArrestStationCode,
                ArrestStation: res.ArrestStation,
                HaveCulprit: res.HaveCulprit,
                Behaviour: res.Behaviour,
                Testimony: res.Testimony,
                Prompt: res.Prompt,
                IsMatchNotice: res.IsMatchNotice,
                ArrestDesc: res.ArrestDesc,
                NoticeCode: res.NoticeCode,
                InvestigationSurveyDocument: res.InvestigationSurveyDocument,
                InvestigationCode: res.InvestigationCode,
                IsActive: res.IsActive,
            })

            await res.ArrestLocale.map(item => item.Region = `${item.SubDistrict} ${item.District} ${item.Province}`);
            await res.ArrestStaff.map(item => item.FullName = `${item.TitleName} ${item.FirstName} ${item.LastName}`);
            await res.ArrestLawbreaker.map(item => {
                item.LawbreakerFullName = `${item.LawbreakerTitleName} ${item.LawbreakerFirstName}`;
                item.LawbreakerFullName += ` ${item.LawbreakerMiddleName} ${item.LawbreakerLastName}`;
                item.CompanyFullName = `${item.CompanyTitle} ${item.CompanyName}`
            });

            this.setItemFormArray(res.ArrestStaff, 'ArrestStaff');
            this.setItemFormArray(res.ArrestLocale, 'ArrestLocale');
            this.setItemFormArray(res.ArrestLawbreaker, 'ArrestLawbreaker');
            this.setItemFormArray(res.ArrestProduct, 'ArrestProduct');
            this.setItemFormArray(res.ArrestDocument, 'ArrestDocument');
        })
    }

    private onCreate() {
        // set true
        this.navService.setEditField(true);
        this.navService.setEditButton(true);
        this.navService.setPrintButton(true);
        this.navService.setDeleteButton(true);
        // set false
        this.navService.setSaveButton(false);
        this.navService.setCancelButton(false);
    }

    private onReviced() {

    }

    private onDelete() {

    }

    private deleteTableRow(form: FormArray, indexForm: number) {
        if (this.mode === 'C') {
            form.removeAt(indexForm);

        } else if (this.mode === 'R') {
            if (confirm(Message.confirmAction)) {
                form.removeAt(indexForm);
            }
        }
    }

    openModal(e) {
        this.modal = this.suspectModalService.open(e, { size: 'lg', centered: true });
    }

    addStaff() {
        this.ArrestStaff.push(this.fb.group(new ArrestStaff()));
    }

    addProduct() {
        this.ArrestProduct.push(this.fb.group(new ArrestProduct()));
    }

    addDocument() {
        console.log(this.ArrestDocument.value);

        this.ArrestDocument.push(this.fb.group(new ArrestDocument()));
    }

    viewLawbreaker(id: number) {
        this.router.navigate([`/arrest/lawbreaker/R/${id}`]);
    }

    deleteStaff(indexForm: number) {
        this.deleteTableRow(this.ArrestStaff, indexForm);
    }

    deleteLawbreaker(indexForm: number) {
        this.deleteTableRow(this.ArrestLawbreaker, indexForm);
    }

    deleteProduct(indexForm: number) {
        this.deleteTableRow(this.ArrestProduct, indexForm);
    }

    deleteDocument(indexForm: number) {
        this.deleteTableRow(this.ArrestDocument, indexForm);
    }
}
