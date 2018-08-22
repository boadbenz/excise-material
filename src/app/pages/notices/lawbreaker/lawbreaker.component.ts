import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { DropDown, VISATypes, BloodTypes, EntityTypes, GenderTypes, LawbreakerTypes, TitleNames, Nationalitys, Races, Religions, MaritalStatus, RegionModel } from '../../../models';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import { ArrestsService } from '../../arrests/arrests.service';
import { ILawbreaker, Lawbreaker } from './lawbreaker.interface';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NoticeService } from '../notice.service';
import { Message } from 'app/config/message';
import { MyDatePickerOptions, getDateMyDatepicker, setZeroHours, setDateMyDatepicker } from '../../../config/dateFormat';


@Component({
    selector: 'app-lawbreaker',
    templateUrl: './lawbreaker.component.html',
    styleUrls: ['./lawbreaker.component.scss']
})
export class LawbreakerComponent implements OnInit, OnDestroy {
    constructor(
        private ngModalService: NgbModal,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private preloader: PreloaderService,
        private navService: NavigationService,
        private fb: FormBuilder,
        private arrestService: ArrestsService,
        private noticeService: NoticeService
    ) {
        this.navService.setPrintButton(false);
        this.navService.setDeleteButton(false);
    }

    LawbreakerItem: Lawbreaker;
    LawbreakerFG: FormGroup;

    private subActivedRoute: any;
    private onSaveSubscribe: any;
    private mode: any;
    private lawbreakerId: number;

    myDatePickerOptions = MyDatePickerOptions;
    modal: any;
    showEditField: any;
    isRequired: boolean | false;
    visaTypes: DropDown[] = VISATypes;
    bloodTypes: DropDown[] = BloodTypes;
    entityTypes: DropDown[] = EntityTypes;
    genderTypes: DropDown[] = GenderTypes;
    LawbreakerTypes: DropDown[] = LawbreakerTypes;
    titleNames: DropDown[] = TitleNames;
    nationnalitys: DropDown[] = Nationalitys;
    races: DropDown[] = Races;
    religions: DropDown[] = Religions;
    materialStatus: DropDown[] = MaritalStatus;

    typeheadRegion: RegionModel[] = []

    async ngOnInit() {
        this.preloader.setShowPreloader(true);

        this.LawbreakerFG = this.createForm();

        await this.setRegionStore();
        await this.active_route();
        await this.navigate_service();

        this.preloader.setShowPreloader(false);
    }

    ngOnDestroy(): void {
        this.subActivedRoute.unsubscribe();
        this.onSaveSubscribe.unsubscribe();
    }

    private createForm(): FormGroup {
        return new FormGroup({
            LawbreakerID: new FormControl(null),
            EntityType: new FormControl(null),
            CompanyTitleCode: new FormControl(null),
            CompanyTitle: new FormControl(null),
            CompanyName: new FormControl(null),
            CompanyOtherName: new FormControl(null),
            CompanyRegistrationNo: new FormControl(null),
            CompanyLicenseNo: new FormControl(null),
            FoundedDate: new FormControl(null),
            LicenseDateForm: new FormControl(null),
            LicenseDateTo: new FormControl(null),
            TaxID: new FormControl(null),
            ExciseRegNo: new FormControl(null),
            LawbreakerType: new FormControl(null),
            LawbreakerTitleCode: new FormControl(null),
            LawbreakerTitleName: new FormControl(null),
            LawbreakerFirstName: new FormControl(null),
            LawbreakerMiddleName: new FormControl(null),
            LawbreakerLastName: new FormControl(null),
            LawbreakerOtherName: new FormControl(null),
            LawbreakerDesc: new FormControl(null),
            IDCard: new FormControl(null),
            PassportNo: new FormControl(null),
            VISAType: new FormControl(null),
            PassportCountryCode: new FormControl(null),
            PassportCountryName: new FormControl(null),
            PassportDateIn: new FormControl(null),
            PassportDateOut: new FormControl(null),
            BirthDate: new FormControl(null),
            GenderType: new FormControl(null),
            BloodType: new FormControl(null),
            NationalityCode: new FormControl(null),
            NationalityNameTH: new FormControl(null),
            RaceCode: new FormControl(null),
            RaceName: new FormControl(null),
            ReligionCode: new FormControl(null),
            ReligionName: new FormControl(null),
            MaritalStatus: new FormControl(null),
            Career: new FormControl(null),
            GPS: new FormControl(null),
            Location: new FormControl(null),
            Address: new FormControl(null),
            Village: new FormControl(null),
            Building: new FormControl(null),
            Floor: new FormControl(null),
            Room: new FormControl(null),
            Alley: new FormControl(null),
            Road: new FormControl(null),
            SubDistrictCode: new FormControl(null),
            SubDistrict: new FormControl(null),
            DistrictCode: new FormControl(null),
            District: new FormControl(null),
            ProvinceCode: new FormControl(null),
            Province: new FormControl(null),
            ZipCode: new FormControl(null),
            TelephoneNo: new FormControl(null),
            Email: new FormControl(null),
            FatherName: new FormControl(null),
            MotherName: new FormControl(null),
            Remarks: new FormControl(null),
            LinkPhoto: new FormControl(null),
            PhotoDesc: new FormControl(null),
            IsActive: new FormControl(null)
        });
    }

    private active_route() {
        this.subActivedRoute = this.activatedRoute.params.subscribe(p => {
            this.mode = p['mode'];
            if (p['mode'] === 'C') {
                // set false
                this.navService.setEditButton(false);
                this.navService.setEditField(false);
                this.navService.setNextPageButton(false);
                // set true
                this.navService.setSaveButton(true);
                this.navService.setCancelButton(true);

            } else if (p['mode'] === 'R') {
                // set false
                this.navService.setSaveButton(false);
                this.navService.setCancelButton(false);
                // set true
                // this.navService.setPrintButton(true);
                this.navService.setNextPageButton(false);
                this.navService.setEditButton(true);
                this.navService.setEditField(true);

                if (p['code']) {
                    this.lawbreakerId = p['code'];
                    this.GetByCon(p['code']);
                }
            }
        });
    }

    private navigate_service() {
        this.navService.showFieldEdit.subscribe(p => {
            this.showEditField = p.valueOf();
        });

        this.onSaveSubscribe = this.navService.onSave.subscribe(async status => {
            if (status) {
                await this.navService.setOnSave(false);

                const birthDay = getDateMyDatepicker(this.LawbreakerFG.value.BirthDate);
                const passportDateIn = getDateMyDatepicker(this.LawbreakerFG.value.PassportDateIn);
                const passportDateOut =  getDateMyDatepicker(this.LawbreakerFG.value.PassportDateOut);

                this.LawbreakerFG.value.BirthDate = setZeroHours(birthDay);
                this.LawbreakerFG.value.PassportDateIn = setZeroHours(passportDateIn);
                this.LawbreakerFG.value.passportDateOut = setZeroHours(passportDateOut);

                if (this.mode === 'C') {
                    this.OnCreate();

                } else if (this.mode === 'R') {
                    this.OnRevice();
                }
            }
        })
    }

    async GetByCon(LawbreakerID: string) {

        await this.noticeService.getLawbreakerByCon(LawbreakerID).then(res => {
            this.LawbreakerFG.reset({
                LawbreakerID: res.LawbreakerID,
                EntityType: res.EntityType,
                CompanyTitleCode: res.CompanyTitleCode,
                CompanyTitle: res.CompanyTitle,
                CompanyName: res.CompanyName,
                CompanyOtherName: res.CompanyOtherName,
                CompanyRegistrationNo: res.CompanyRegistrationNo,
                CompanyLicenseNo: res.CompanyLicenseNo,
                FoundedDate: res.FoundedDate,
                LicenseDateForm: res.LicenseDateForm,
                LicenseDateTo: res.LicenseDateTo,
                TaxID: res.TaxID,
                ExciseRegNo: res.ExciseRegNo,
                LawbreakerType: res.LawbreakerType,
                LawbreakerTitleCode: res.LawbreakerTitleCode,
                LawbreakerTitleName: res.LawbreakerTitleName,
                LawbreakerFirstName: res.LawbreakerFirstName,
                LawbreakerMiddleName: res.LawbreakerMiddleName,
                LawbreakerLastName: res.LawbreakerLastName,
                LawbreakerOtherName: res.LawbreakerOtherName,
                LawbreakerDesc: res.LawbreakerDesc,
                IDCard: res.IDCard,
                PassportNo: res.PassportNo,
                VISAType: res.VISAType,
                PassportCountryCode: res.PassportCountryCode,
                PassportCountryName: res.PassportCountryName,
                PassportDateIn: setDateMyDatepicker(res.PassportDateIn),
                PassportDateOut: setDateMyDatepicker(res.PassportDateOut),
                BirthDate: setDateMyDatepicker(res.BirthDate),
                GenderType: res.GenderType,
                BloodType: res.BloodType,
                NationalityCode: res.NationalityCode,
                NationalityNameTH: res.NationalityNameTH,
                RaceCode: res.RaceCode,
                RaceName: res.RaceName,
                ReligionCode: res.ReligionCode,
                ReligionName: res.ReligionName,
                MaritalStatus: res.MaritalStatus,
                Career: res.Career,
                GPS: res.GPS,
                Location: res.Location,
                Address: res.Address,
                Village: res.Village,
                Building: res.Building,
                Floor: res.Floor,
                Room: res.Room,
                Alley: res.Alley,
                Road: res.Road,
                SubDistrictCode: res.SubDistrictCode,
                SubDistrict: res.SubDistrict,
                DistrictCode: res.DistrictCode,
                District: res.District,
                ProvinceCode: res.ProvinceCode,
                Province: res.Province,
                ZipCode: res.ZipCode,
                TelephoneNo: res.TelephoneNo,
                Email: res.Email,
                FatherName: res.FatherName,
                MotherName: res.MotherName,
                Remarks: res.Remarks,
                LinkPhoto: res.LinkPhoto,
                PhotoDesc: res.PhotoDesc,
                IsActive: res.IsActive
            })
        })

    }

    OnCreate() {

    }

    async OnRevice() {
        // // Set Preloader
        // this.preloader.setShowPreloader(true);

        // let IsSuccess: boolean | false;
        // await this.noticeService.updLawbreaker(this.LawbreakerFG.value).then(isSuccess => {
        //     IsSuccess = isSuccess;
        // })

        // if (IsSuccess) {
        //     alert(Message.saveComplete)
        // } else {
        //     alert(Message.saveFail)
        // }
        // // Set Preloader
        // this.preloader.setShowPreloader(false);
        console.log(this.LawbreakerFG.value);

    }

    private async setRegionStore() {

        let subdistrict: any[];
        let district: any[];
        let province: any[];

        await this.arrestService.masSubdistrictgetAll().then(res =>
            subdistrict = res
        )
        await this.arrestService.masDistrictgetAll().then(res =>
            district = res
        )
        await this.arrestService.masProvincegetAll().then(res =>
            province = res
        )

        await subdistrict
            .map(subdis => district.filter(dis => dis.DistrictCode == subdis.districtCode)
                .map(dis => province.filter(pro => pro.ProvinceCode == dis.ProvinceCode)
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

    openOffenseDetailModal(e: any) {
        this.modal = this.ngModalService.open(e, { size: 'lg', centered: true });
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

    formatterRegion = (x: { SubDistrictNameTH: string, DistrictNameTH: string, ProvinceNameTH: string }) =>
        `${x.SubDistrictNameTH} ${x.DistrictNameTH} ${x.ProvinceNameTH}`;

    selectItemRegion(ele: any) {
        this.LawbreakerFG.patchValue({
            SubDistrictCode: ele.item.SubDistrictCode,
            SubDistrict: ele.item.SubDistrictNameTH,
            DistrictCode: ele.item.DistrictCode,
            District: ele.item.DistrictNameTH,
            ProvinceCode: ele.item.ProvinceCode,
            Province: ele.item.ProvinceNameTH
        });
    }
}
