import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { ArrestsService } from '../arrests.service';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { toLocalNumeric } from 'app/config/dateFormat';
import { ArrestLocale } from '../arrest-locale';
import { ArrestStaff } from '../arrest-staff';

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit, OnDestroy {

    private sub: any;
    mode: string;
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

    get ArrestLawbreaker(): FormArray{
        return this.arrestForm.get('ArrestLawbreaker') as FormArray;
    }

    @ViewChild('printDocModal') printDocModel: ElementRef;

    constructor(
        public fb: FormBuilder,
        private activeRoute: ActivatedRoute,
        private suspectModalService: NgbModal,
        private navService: NavigationService,
        private ngbModel: NgbModal,
        private arrestService: ArrestsService
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

    createForm() {
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
            ArrestStaff: this.fb.array([this.createArrestStaffForm()]),
            ArrestLocale: this.fb.array([this.createArrestLocaleForm()])
        })
    }

    createArrestStaffForm(): FormGroup {
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

    createArrestLocaleForm(): FormGroup {
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

    createArrestLawbreakerForm(): FormGroup {
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

    setArrestLocale(locale: ArrestLocale[]) {
        if (locale) {
            locale.map(item => item.Region = `${item.SubDistrict} ${item.District} ${item.Province}`);
            const itemFGs = locale.map(item => this.fb.group(item));
            const itemFormArray = this.fb.array(itemFGs);
            this.arrestForm.setControl('ArrestLocale', itemFormArray);
        }
    }

    setArrestStaff(locale: ArrestStaff[]) {
        if (locale) {
            locale.map(item => item.FullName = `${item.TitleName} ${item.FirstName} ${item.LastName}`);
            const itemFGs = locale.map(item => this.fb.group(item));
            const itemFormArray = this.fb.array(itemFGs);
            this.arrestForm.setControl('ArrestStaff', itemFormArray);
        }
    }

    active_route() {
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

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    private getByCon(code: string) {
        this.arrestService.getByCon(code).then(res => {
            this.arrestForm.reset({
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

            this.setArrestStaff(res.ArrestStaff);
            // this.setArrestLocale(res.ArrestLocale)
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

    openModal(e) {
        this.modal = this.suspectModalService.open(e, { size: 'lg', centered: true });
    }



}
