import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { DropDown, VISATypes, BloodTypes, EntityTypes, GenderTypes, LawbreakerTypes, RegionModel } from '../../../models';
import { FormGroup, FormControl } from '@angular/forms';
import { Suspect } from './suspect.interface';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import { NoticeService } from '../notice.service';
import { getDateMyDatepicker, setDateMyDatepicker, MyDatePickerOptions, convertDateForSave } from 'app/config/dateFormat';
import { Message } from 'app/config/message';
import { ImageType } from 'app/config/imageType';
import { MainMasterService } from '../../../services/main-master.service';

@Component({
    selector: 'app-suspect',
    templateUrl: './suspect.component.html',
    styleUrls: ['./suspect.component.scss']
})
export class SuspectComponent implements OnInit, OnDestroy {

    constructor(
        private activatedRoute: ActivatedRoute,
        private preloader: PreloaderService,
        private navService: NavigationService,
        private noticeService: NoticeService,
        private mainMasterService: MainMasterService
    ) {
        this.navService.setPrintButton(false);
        this.navService.setDeleteButton(false);
    }

    @ViewChild('imgNobody') imgNobody: ElementRef;

    SuspectItem: Suspect;
    SuspectFG: FormGroup;

    private subActivedRoute: any;
    private onSaveSubscribe: any;
    private mode: any;

    myDatePickerOptions = MyDatePickerOptions;

    modal: any;
    showEditField: any;
    isRequired: boolean | false;
    visaTypes: DropDown[] = VISATypes;
    bloodTypes: DropDown[] = BloodTypes;
    entityTypes: DropDown[] = EntityTypes;
    genderTypes: DropDown[] = GenderTypes;
    suspectTypes: DropDown[] = LawbreakerTypes;
    titleNames: DropDown[] ;
    nationnalitys: DropDown;
    races: DropDown[];
    religions: DropDown[] ;
    materialStatus: DropDown[] ;

    typeheadRegion: RegionModel[] = []

    async ngOnInit() {
        this.preloader.setShowPreloader(true);

        this.SuspectFG = this.createForm();

        await this.setRegionStore();
        this.active_route();
        this.navigate_service();

        this.preloader.setShowPreloader(false);
    }

    private createForm(): FormGroup {
        return new FormGroup({
            SuspectID: new FormControl(null),
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
            SuspectType: new FormControl(null),
            SuspectTitleCode: new FormControl(null),
            SuspectTitleName: new FormControl(null),
            SuspectFirstName: new FormControl(null),
            SuspectMiddleName: new FormControl(null),
            SuspectLastName: new FormControl(null),
            SuspectOtherName: new FormControl(null),
            SuspectDesc: new FormControl(null),
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
        })
    }

    ngOnDestroy(): void {
        this.subActivedRoute.unsubscribe();
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
                    this.GetByCon(p['code']);
                }
            }
        });
    }

    private navigate_service() {
        this.navService.showFieldEdit.subscribe(p => {
            this.showEditField = p;
        });

        this.onSaveSubscribe = this.navService.onSave.subscribe(async status => {
            if (status) {
                await this.navService.setOnSave(false);

                const birthDay = getDateMyDatepicker(this.SuspectFG.value.BirthDate);
                const passportDateIn = getDateMyDatepicker(this.SuspectFG.value.PassportDateIn);
                const passportDateOut = getDateMyDatepicker(this.SuspectFG.value.PassportDateOut);

                this.SuspectFG.value.BirthDate = convertDateForSave(birthDay);
                this.SuspectFG.value.PassportDateIn = convertDateForSave(passportDateIn);
                this.SuspectFG.value.PassportDateOut = convertDateForSave(passportDateOut);

                console.log(JSON.stringify(this.SuspectFG.value));
                

                if (this.mode === 'C') {
                    this.OnCreate();

                } else if (this.mode === 'R') {
                    this.OnRevice();
                }
            }
        })
    }

    async GetByCon(SuspectID: string) {

        await this.noticeService.noticeSuspectgetByCon(SuspectID).then(res => {
            this.SuspectFG.reset({
                SuspectID: res.SuspectID,
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
                SuspectType: res.SuspectType,
                SuspectTitleCode: res.SuspectTitleCode,
                SuspectTitleName: res.SuspectTitleName,
                SuspectFirstName: res.SuspectFirstName,
                SuspectMiddleName: res.SuspectMiddleName,
                SuspectLastName: res.SuspectLastName,
                SuspectOtherName: res.SuspectOtherName,
                SuspectDesc: res.SuspectDesc,
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

            if (res.LinkPhoto) {
                this.imgNobody.nativeElement.src = res.LinkPhoto;
            }
        })

    }

    async OnCreate() {
        this.preloader.setShowPreloader(true);

        let IsSuccess: boolean = false;
        await this.noticeService.noticeMasSuspectinsAll(this.SuspectFG.value).then(isSuccess => {
            IsSuccess = isSuccess;
        }, () => { IsSuccess = false; });

        if (IsSuccess) {
            alert(Message.saveComplete)
        } else {
            alert(Message.saveFail)
        }

        this.preloader.setShowPreloader(false);
    }

    async OnRevice() {
        // Set Preloader
        this.preloader.setShowPreloader(true);

        let IsSuccess: boolean = false;
        await this.noticeService.noticeMasSuspectupdByCon(this.SuspectFG.value).then(isSuccess => {
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
        this.SuspectFG.patchValue({
            SubDistrictCode: ele.item.SubdistrictCode,
            SubDistrict: ele.item.SubDistrictNameTH,
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
            this.SuspectFG.patchValue({
                // LinkPhoto: reader.result,
                PhotoDesc: file.name
            })
        };

        reader.readAsDataURL(file);
    }
}
