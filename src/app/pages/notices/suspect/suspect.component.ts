import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { DropDown, VISATypes, BloodTypes, EntityTypes, GenderTypes, LawbreakerTypes, RegionModel, MaritalStatus } from '../../../models';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
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
import { SwalComponent } from '@toverux/ngx-sweetalert2';

@Component({
    selector: 'app-suspect',
    templateUrl: './suspect.component.html',
    styleUrls: ['./suspect.component.scss']
})
export class SuspectComponent implements OnInit, OnDestroy {
    @ViewChild('alertSwal') private alertSwal: SwalComponent;
    
    months:any[];

    emailValid:boolean = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private preloader: PreloaderService,
        private navService: NavigationService,
        private noticeService: NoticeService,
        private mainMasterService: MainMasterService,
        private fb: FormBuilder,
        private router: Router
    ) {
        this.navService.setPrintButton(false);
        this.navService.setDeleteButton(false);
    }

    @ViewChild('imgNobody') imgNobody: ElementRef;

    SuspectItem: Suspect;
    SuspectFG: FormGroup;

    private subActivedRoute: any;
    private onSaveSubscribe: any;
    private onCancelSubscribe: any;
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
    materialStatus: DropDown[] = MaritalStatus;
    titleNames: any[] ;
    nationnalitys: any[];
    races: any[];
    religions: any[] ;
    countries: any[];
    suspectId:any;

    typeheadRegion: RegionModel[] = []

    async ngOnInit() {
        this.preloader.setShowPreloader(true);
        this.months = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
        this.myDatePickerOptions.showClearDateBtn = true;

        await this.createForm();

        await this.setRegionStore();
        await this.getTitleNames();
        await this.getNationality();
        await this.getRace();
        await this.getReligion();
        await this.getCountry();
        this.active_route();
        this.navigate_service();

        this.preloader.setShowPreloader(false);
    }

    private createForm(): void {
        this.SuspectFG = new FormGroup({
            SuspectID: new FormControl(null),
            EntityType: new FormControl(this.entityTypes[1].value, Validators.required),
            CompanyTitleCode: new FormControl(null),
            CompanyTitle: new FormControl(null),
            CompanyName: new FormControl(null),
            CompanyOtherName: new FormControl(null),
            CompanyRegistrationNo: new FormControl(null),
            CompanyLicenseNo: new FormControl(null),
            FoundedDate: new FormControl(""),
            LicenseDateForm: new FormControl(""),
            LicenseDateTo: new FormControl(""),
            TaxID: new FormControl(null),
            ExciseRegNo: new FormControl(null),
            SuspectType: new FormControl(this.suspectTypes[1].value, Validators.required),
            SuspectTitleCode: new FormControl(null),
            SuspectTitleName: new FormControl(null),
            SuspectFirstName: new FormControl(null, Validators.required),
            SuspectMiddleName: new FormControl(null),
            SuspectLastName: new FormControl(null, Validators.required),
            SuspectOtherName: new FormControl(null),
            SuspectDesc: new FormControl(null),
            IDCard: new FormControl(null, [Validators.required, Validators.maxLength(13), Validators.minLength(13)]),
            PassportNo: new FormControl(null),
            VISAType: new FormControl(null),
            PassportCountryCode: new FormControl(null),
            PassportCountryName: new FormControl(null),
            PassportDateIn: new FormControl(""),
            PassportDateOut: new FormControl(""),
            BirthDate: new FormControl(""),
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
            IsActive: new FormControl(1),
            Region: new FormControl(null),
            Latitude: new FormControl(null),
            Longtitude: new FormControl(null)
        });
    }

    ngOnDestroy(): void {
        this.onCancelSubscribe.unsubscribe();
        this.subActivedRoute.unsubscribe();
        this.onSaveSubscribe.unsubscribe();
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
                this.navService.setDeleteButton(false);

                if (p['code']) {
                    this.suspectId = p["code"];
                    this.GetByCon(p['code']);
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
                let url = sessionStorage.getItem("notice_current_page");
                this.router.navigateByUrl(url);
            }
        });

        this.onSaveSubscribe = this.navService.onSave.subscribe(async status => {
            if (status) {
                await this.navService.setOnSave(false);

                if (!this.SuspectFG.valid) {
                    this.isRequired = true;
                    this.showSwal(Message.checkData, "warning");
                    return false;
                }

                let email = this.SuspectFG.get("Email").value;
                if(email && !this.validateEmail(email)){
                    this.emailValid = true;
                    this.showSwal(Message.checkData, "warning");
                    return false;
                }

                this.emailValid = false;

                // let birthDay = getDateMyDatepicker(this.SuspectFG.value.BirthDate);
                let birthDay = this.SuspectFG.value.BirthDate;
                if(birthDay&&birthDay.date){
                    birthDay = birthDay.date.day+"-"+this.months[birthDay.date.month-1]+"-"+birthDay.date.year;
                }else{
                    birthDay = "";
                }
                let passportDateIn = this.SuspectFG.value.PassportDateIn;//getDateMyDatepicker(this.SuspectFG.value.PassportDateIn);
                if(passportDateIn && passportDateIn.date){
                    passportDateIn = passportDateIn.date.day+"-"+this.months[passportDateIn.date.month-1]+"-"+passportDateIn.date.year;
                }
                let passportDateOut = this.SuspectFG.value.PassportDateOut;//getDateMyDatepicker(this.SuspectFG.value.PassportDateOut);
                if(passportDateOut && passportDateOut.date){
                    passportDateOut = passportDateOut.date.day+"-"+this.months[passportDateOut.date.month-1]+"-"+passportDateOut.date.year;
                }

                this.SuspectFG.value.BirthDate = birthDay;//convertDateForSave(birthDay);
                this.SuspectFG.value.PassportDateIn = passportDateIn;//convertDateForSave(passportDateIn);
                this.SuspectFG.value.PassportDateOut = passportDateOut;//convertDateForSave(passportDateOut);

                if (this.mode === 'C') {
                    this.OnCreate();

                } else if (this.mode === 'R') {
                    this.OnRevice();
                }
            }
        });
    }

    GetByCon(SuspectID: string) {

        this.preloader.setShowPreloader(true);
        this.noticeService.noticeSuspectgetByCon(SuspectID).then(res => {
            let region = `${res.SubDistrict||''} ${res.District||''} ${res.Province||''}`;
            let gps = res.GPS;
            let tmps = gps.split(",");
            let lat = "";
            let lon = "";
            if(tmps.length>1){
                lat = tmps[0].trim();
                lon = tmps[1].trim();
            }
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
                IsActive: res.IsActive,
                Region: region,
                Latitude: lat,
                Longtitude: lon
            })

            if (res.LinkPhoto) {
                this.imgNobody.nativeElement.src = res.LinkPhoto;
            }
            this.navService.setDeleteButton(false);
            this.preloader.setShowPreloader(false);
        });

    }

    async OnCreate() {
        this.preloader.setShowPreloader(true);
        if(this.SuspectFG.value.Latitude&&this.SuspectFG.value.Longtitude){
            this.SuspectFG.value.GPS = this.SuspectFG.value.Latitude+","+this.SuspectFG.value.Longtitude;
        }

        let success: boolean = false;
        let suspectID = "";
        await this.noticeService.noticeMasSuspectinsAll(this.SuspectFG.value).then(item => {
            // let success = ""+item.IsSuccess;
            success = item.IsSuccess=="False"?false:true;
            suspectID = item.SuspectID;
        }, () => { success = false; });

        if (success) {
            this.showSwal(Message.saveComplete, "success");
            this.router.routeReuseStrategy.shouldReuseRoute = function() {
              return false;
            };
            this.router.navigateByUrl('/notice/suspect/R/'+suspectID);
        } else {
            this.showSwal(Message.saveFail, "error");
        }

        this.preloader.setShowPreloader(false);
    }

    async OnRevice() {
        if(this.SuspectFG.value.Latitude&&this.SuspectFG.value.Longtitude){
            this.SuspectFG.value.GPS = this.SuspectFG.value.Latitude+","+this.SuspectFG.value.Longtitude;
        }
        // Set Preloader
        this.preloader.setShowPreloader(true);

        let passportDateIn = this.SuspectFG.value.PassportDateIn;//convertDateForSave(passportDateIn);
        let passportDateOut = this.SuspectFG.value.PassportDateOut;//convertDateForSave(passportDateOut);
        if(!passportDateIn){
            this.SuspectFG.value.PassportDateIn = "";
        }
        if(!passportDateOut){
            this.SuspectFG.value.PassportDateOut = "";
        }

        let birthDate = this.SuspectFG.value.BirthDate;//convertDateForSave(passportDateOut);
        if(!birthDate){
            this.SuspectFG.value.BirthDate = "";
        }

        let IsSuccess: boolean = false;
        await this.noticeService.noticeMasSuspectupdByCon(this.SuspectFG.value).then(isSuccess => {
            IsSuccess = isSuccess;
        }, () => { IsSuccess = false; })

        if (IsSuccess) {
            this.onComplete();
            this.showSwal(Message.saveComplete, "success");
        } else {
            this.showSwal(Message.saveFail, "error");
        }
        // Set Preloader
        this.preloader.setShowPreloader(false);
    }

    private async onComplete() {
        // set true
        await this.navService.setEditField(true);
        await this.navService.setEditButton(true);
        await this.navService.setPrintButton(false);
        await this.navService.setDeleteButton(false);
        await this.navService.setNextPageButton(false);
        // set false
        await this.navService.setSaveButton(false);
        await this.navService.setCancelButton(false);

        this.GetByCon(this.suspectId);

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

    //Master
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
        let region = `${ele.item.SubdistrictNameTH||''} ${ele.item.DistrictNameTH||''} ${ele.item.ProvinceNameTH||''}`;
        this.SuspectFG.patchValue({
            SubDistrictCode: ele.item.SubdistrictCode,
            SubDistrict: ele.item.SubdistrictNameTH,
            DistrictCode: ele.item.DistrictCode,
            District: ele.item.DistrictNameTH,
            ProvinceCode: ele.item.ProvinceCode,
            Province: ele.item.ProvinceNameTH,
            Region: region
        });
    }
    blurItemRegion(ele: any) {
        let val = ele.value;
        if(!val){
            this.SuspectFG.patchValue({
                SubDistrictCode: "",
                SubDistrict: "",
                DistrictCode: "",
                District: "",
                ProvinceCode: "",
                Province: "",
                Region: ""
            });
        }
    }

    getTitleNames(){
        this.mainMasterService.MasTitleMaingetAll().then(res=>{this.titleNames = res;});
    }
    searchTitleName = (text3$: Observable<string>) =>
        text3$
            .debounceTime(300)
            .distinctUntilChanged()
            .map(term => term === '' ? []
                : this.titleNames
                    .filter(v =>
                        (v.TitleNameTH && v.TitleNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        (v.TitleNameEN && v.TitleNameEN.toLowerCase().indexOf(term.toLowerCase()) > -1)
                    ).slice(0, 10));
    formatterTitleName = (x: { TitleNameTH: string }) => `${x.TitleNameTH || ''}`
    selectItemTitleName() {
        let titleCode = this.SuspectFG.get("SuspectTitleCode").value;
        for(let l of this.titleNames){
            let _titleCode = l.TitleCode;
            if(titleCode==_titleCode){
                this.SuspectFG.patchValue({
                    SuspectTitleCode: l.TitleCode,
                    SuspectTitleName: l.TitleNameTH
                });
                break;
            }
        }
    }

    getNationality(){
        this.mainMasterService.MasNationalityMaingetAll().then(res=>{
            this.nationnalitys=res;
            for(let l of res){
                let code = l.NationalityCode;
                if(code==1){
                    this.SuspectFG.patchValue({NationalityCode: code});
                    break;
                }
            }
        });
    }
    searchNationality = (text3$: Observable<string>) =>
        text3$
            .debounceTime(300)
            .distinctUntilChanged()
            .map(term => term === '' ? []
                : this.nationnalitys
                    .filter(v =>
                        (v.NationalityNameTh && v.NationalityNameTh.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        (v.NationalityNameEn && v.NationalityNameEn.toLowerCase().indexOf(term.toLowerCase()) > -1)
                    ).slice(0, 10));
    formatterNationality = (x: { NationalityNameTh: string }) => `${x.NationalityNameTh || ''}`
    selectItemNationality() {
        let code = this.SuspectFG.get("NationalityCode").value;
        for(let l of this.nationnalitys){
            let _code = l.NationalityCode;
            if(code==_code){
                this.SuspectFG.patchValue({
                    NationalityCode: l.NationalityCode,
                    NationalityNameTH: l.NationalityNameTh
                });
                break;
            }
        }
    }
    getRace(){
        this.mainMasterService.MasRaceMaingetAll().then(res=>{
            this.races=res;
            for(let l of res){
                let code = l.RaceCode;
                if(code==1){
                    this.SuspectFG.patchValue({RaceCode: code});
                    break;
                }
            }
        });
    }
    searchRace = (text3$: Observable<string>) =>
        text3$
            .debounceTime(300)
            .distinctUntilChanged()
            .map(term => term === '' ? []
                : this.races
                    .filter(v =>
                        (v.RaceNameTH && v.RaceNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        (v.RaceNameEN && v.RaceNameEN.toLowerCase().indexOf(term.toLowerCase()) > -1)
                    ).slice(0, 10));
    formatterRace = (x: { RaceNameTH: string }) => `${x.RaceNameTH || ''}`
    selectItemRace() {
        let code = this.SuspectFG.get("RaceCode").value;
        for(let l of this.races){
            let _code = l.RaceCode;
            if(code==_code){
                this.SuspectFG.patchValue({
                    RaceCode: l.RaceCode,
                    RaceName: l.RaceNameTH
                });
                break;
            }
        }
    }
    getReligion(){
        this.mainMasterService.MasReligionMaingetAll().then(res=>this.religions=res);
    }
    searchReligion = (text3$: Observable<string>) =>
        text3$
            .debounceTime(300)
            .distinctUntilChanged()
            .map(term => term === '' ? []
                : this.religions
                    .filter(v =>
                        (v.ReligionNameTH && v.ReligionNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
                        (v.ReligionNameEN && v.ReligionNameEN.toLowerCase().indexOf(term.toLowerCase()) > -1)
                    ).slice(0, 10));
    formatterReligion = (x: { RaceNameTH: string }) => `${x.RaceNameTH || ''}`
    selectItemReligion(ele: any) {
        let code = this.SuspectFG.get("ReligionCode").value;
        for(let l of this.religions){
            let _code = l.ReligionCode;
            if(code==_code){
                this.SuspectFG.patchValue({
                    ReligionCode: l.ReligionCode,
                    ReligionName: l.ReligionNameTH
                });
                break;
            }
        }
    }
    getCountry(){
        this.mainMasterService.MasCountryMaingetAll().then(res=>this.countries=res);
    }

    changeImage(e: any, img: any) {

        let file = e.target.files[0];
        let isMatch: boolean | false;

        ImageType.filter(item => file.type == item.type).map(() => isMatch = true);

        if (!isMatch) {
            this.showSwal(Message.checkImageType, "warning");
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

    private showSwal(msg:string, iconType:any){
        this.alertSwal.text = msg;
        this.alertSwal.type = iconType;
        this.alertSwal.show();
    }

    private validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
}
