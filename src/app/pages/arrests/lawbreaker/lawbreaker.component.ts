import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { DropDown, VISATypes, BloodTypes, EntityTypes, GenderTypes, LawbreakerTypes, TitleNames, Nationalitys, Races, Religions, MaritalStatus, RegionModel, MasDistrictModel } from '../../../models';
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
import { Message } from 'app/config/message';
import { MyDatePickerOptions, getDateMyDatepicker, setDateMyDatepicker, convertDateForSave } from '../../../config/dateFormat';
import { ImageType } from '../../../config/imageType';
import { MainMasterService } from '../../../services/main-master.service';
import { ArrestLawbreakerFormControl } from '../arrest-lawbreaker';


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
        private mainMasterService: MainMasterService
    ) {
        this.navService.setPrintButton(false);
        this.navService.setDeleteButton(false);
    }

    @ViewChild('imgNobody') imgNobody: ElementRef;

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

        await this.active_route();
        await this.navigate_service();
        await this.setRegionStore();

        this.preloader.setShowPreloader(false);
    }

    ngOnDestroy(): void {
        this.subActivedRoute.unsubscribe();
        this.onSaveSubscribe.unsubscribe();
    }

    private createForm(): FormGroup {
        return new FormGroup(ArrestLawbreakerFormControl);
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
                const passportDateOut = getDateMyDatepicker(this.LawbreakerFG.value.PassportDateOut);

                this.LawbreakerFG.value.BirthDate = convertDateForSave(birthDay);
                this.LawbreakerFG.value.PassportDateIn = convertDateForSave(passportDateIn);
                this.LawbreakerFG.value.passportDateOut = convertDateForSave(passportDateOut);

                if (this.mode === 'C') {
                    this.OnCreate();

                } else if (this.mode === 'R') {
                    this.OnRevice();
                }
            }
        })
    }

    async GetByCon(LawbreakerID: string) {

        await this.arrestService.ArrestLawbreakergetByCon(LawbreakerID).then(res => {
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

                // GPS: res.GPS,
                // Location: res.Location,
                // Address: res.Address,
                // Village: res.Village,
                // Building: res.Building,
                // Floor: res.Floor,
                // Room: res.Room,
                // Alley: res.Alley,
                // Road: res.Road,
                // SubDistrictCode: res.SubDistrictCode,
                // SubDistrict: res.SubDistrict,
                // DistrictCode: res.DistrictCode,
                // District: res.District,
                // ProvinceCode: res.ProvinceCode,
                // Province: res.Province,
                // ZipCode: res.ZipCode,
                // TelephoneNo: res.TelephoneNo,
                // Email: res.Email,

                FatherName: res.FatherName,
                MotherName: res.MotherName,
                Remarks: res.Remarks,
                LinkPhoto: res.LinkPhoto,
                PhotoDesc: res.PhotoDesc,
                IsActive: res.IsActive
            })

            if (res.LinkPhoto) {
                this.imgNobody.nativeElement.src = res.LinkPhoto;
            }
        })

    }

    OnCreate() {

    }

    async OnRevice() {
        // Set Preloader
        this.preloader.setShowPreloader(true);

        let IsSuccess: boolean | false;
        await this.arrestService
            .ArrestLawbreakerupdByCon(this.LawbreakerFG.value)
            .then(isSuccess => {
                IsSuccess = isSuccess;
            }, () => { IsSuccess = false; })

        if (IsSuccess) {
            alert(Message.saveComplete)
        } else {
            alert(Message.saveFail)
        }
        // Set Preloader
        this.preloader.setShowPreloader(false);
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
                        v.SubdistrictNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                        v.DistrictNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                        v.ProvinceNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1
                    ).slice(0, 10));

    formatterRegion = (x: { SubdistrictNameTH: string, DistrictNameTH: string, ProvinceNameTH: string }) =>
        `${x.SubdistrictNameTH} ${x.DistrictNameTH} ${x.ProvinceNameTH}`;

    selectItemRegion(ele: any) {
        this.LawbreakerFG.patchValue({
            SubDistrictCode: ele.item.SubdistrictCode,
            SubDistrict: ele.item.SubdistrictNameTH,
            DistrictCode: ele.item.DistrictCode,
            District: ele.item.DistrictNameTH,
            ProvinceCode: ele.item.ProvinceCode,
            Province: ele.item.ProvinceNameTH
        });
    }

    changeImage(e: any, img: any) {

        let file = e.target.files[0];
        let isMatch: boolean | false;

        ImageType.filter(item => file.type == item.type).map(() => isMatch = true);

        if (!isMatch) {
            alert(Message.checkImageType)
            return
        }

        let reader = new FileReader();
        reader.onload = () => {
            img.src = reader.result;
            this.LawbreakerFG.patchValue({
                LinkPhoto: reader.result,
                PhotoDesc: file.name
            })
        };

        reader.readAsDataURL(file);
    }
}
