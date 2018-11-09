import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { DropDown, RegionModel, VISATypes, BloodTypes, EntityTypes, GenderTypes, LawbreakerTypes, MaritalStatuType } from '../../../../models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Message } from 'app/config/message';
import { NavigationService } from 'app/shared/header-navigation/navigation.service';
import { MyDatePickerOptions, getDateMyDatepicker, convertDateForSave } from 'app/config/dateFormat';
import { ImageType } from 'app/config/imageType';
import { ArrestLawbreakerFormControl } from '../../models/arrest-lawbreaker';
import { MainMasterService } from 'app/services/main-master.service';
import { LoaderService } from 'app/core/loader/loader.service';
import * as fromServices from '../../services';
import * as fromModels from '../../models';
import * as fromMasterModel from 'app/models'
import { Subject } from 'rxjs/Subject';
import { SidebarService } from 'app/shared/sidebar/sidebar.component';
import 'rxjs/add/operator/takeUntil';
import { combineLatest } from 'rxjs/observable/combineLatest';


@Component({
    selector: 'app-lawbreaker',
    templateUrl: './lawbreaker.component.html',
    styleUrls: ['./lawbreaker.component.scss']
})
export class LawbreakerComponent implements OnInit, OnDestroy {
    constructor(
        private ngModalService: NgbModal,
        private router: Router,
        private s_mainMaster: MainMasterService,
        private s_lawbreaker: fromServices.ArrestLawbreakerService,
        private s_masLawbreaker: fromServices.ArrestMasLawbreakerService,
        private activatedRoute: ActivatedRoute,
        private navService: NavigationService,
        private fb: FormBuilder,
        private sidebarService: SidebarService,
        private loaderService: LoaderService
    ) {
        this.navService.setPrintButton(false);
        this.navService.setDeleteButton(false);
        this.navService.setPrevPageButton(false);
        this.navService.setInnerTextNextPageButton('ข้อกล่าวหา');
    }

    card1 = true;
    card2 = true;
    card3 = false;
    card4 = false;

    @ViewChild('imgNobody') imgNobody: ElementRef;
    @ViewChild('latitude') latitude: ElementRef;
    @ViewChild('longitude') longitude: ElementRef;

    // LawbreakerItem: Lawbreaker;
    LawbreakerFG: FormGroup;
    requiredPassport = false;
    requiredCompanyRegister = false;

    private destroy$: Subject<boolean> = new Subject<boolean>();
    // param: Params
    private mode: string;
    private arrestMode: string;
    private arrestCode: string;
    private indictmentDetailId: string;
    private indictmentId: string;
    private guiltbaseId: string;
    private allegationMode: string;
    private lawbreakerId: number;

    myDatePickerOptions = MyDatePickerOptions;
    modal: any;
    showEditField: any;
    isRequired = false;
    visaTypes: DropDown[] = VISATypes;
    bloodTypes: DropDown[] = BloodTypes;
    entityTypes: DropDown[] = EntityTypes;
    genderTypes: DropDown[] = GenderTypes;
    LawbreakerTypes: DropDown[] = LawbreakerTypes;
    materialStatus: DropDown[] = MaritalStatuType;

    typeheadTitleNames = new Array<fromMasterModel.MasTitleModel>();
    typeheadRaces = new Array<fromMasterModel.MasRaceModel>();
    typeheadReligions = new Array<fromMasterModel.MasReligionModel>();
    typeheadRegion = new Array<RegionModel>();
    typeheadCountry = new Array<fromMasterModel.MasCountryModel>();
    typeheadNationality = new Array<fromMasterModel.MasNationalityModel>();

    async ngOnInit() {
        this.LawbreakerFG = this.createForm();
        this.sidebarService.setVersion('0.0.0.28');

        await this.active_route();
        await this.navigate_service();
        await this.setRegionStore();
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
        this.LawbreakerFG.reset();
    }

    private createForm(): FormGroup {
        ArrestLawbreakerFormControl.LinkPhoto = new FormControl("C:\\Image");
        return new FormGroup(ArrestLawbreakerFormControl);
    }

    private active_route() {

        combineLatest(this.activatedRoute.params, this.activatedRoute.queryParams)
            .map(results => ({ params: results[0], queryParams: results[1] }))
            .takeUntil(this.destroy$)
            .subscribe(async results => {
                this.mode = results.params.mode;
                this.arrestMode = results.queryParams.arrestMode;
                this.arrestCode = results.queryParams.arrestCode;
                this.indictmentId = results.queryParams.indictmentId;
                this.guiltbaseId = results.queryParams.guiltbaseId;
                this.allegationMode = results.queryParams.allegationMode;

                if (this.mode === 'C') {
                    // set false
                    this.navService.setEditButton(false);
                    this.navService.setEditField(false);
                    this.navService.setNextPageButton(false);
                    // set true
                    this.navService.setSaveButton(true);
                    this.navService.setCancelButton(true);
    
                } else if (this.mode === 'R') {
                    // set false
                    this.navService.setSaveButton(false);
                    this.navService.setCancelButton(false);
                    // set true
                    this.navService.setEditButton(true);
                    this.navService.setEditField(true);
                    this.navService.setNextPageButton(true);
                }
    
                this.pageLoad();
            });
    }

    private async pageLoad() {

        this.loaderService.show();
        const promises = [
            await this.s_mainMaster.MasTitleMaingetAll(),
            await this.s_mainMaster.MasNationalityMaingetAll(),
            await this.s_mainMaster.MasRaceMaingetAll(),
            await this.s_mainMaster.MasReligionMaingetAll(),
            await this.s_mainMaster.MasCountryMaingetAll(),
            await this.s_mainMaster.MasDistrictMaingetAll()
        ];
        Promise.all(promises)
            .then((x) => {
                this.typeheadTitleNames = x[0];
                this.typeheadNationality = x[1];
                this.typeheadRaces = x[2];
                this.typeheadReligions = x[3];
                this.typeheadCountry = x[4];
                x[5].map(prov =>
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
                );
            })
        this.loaderService.hide();

        switch (this.mode) {
            case 'C':
                break;

            case 'R':
                this.loaderService.show();
                this.ArrestLawbreakerGetByCon(this.lawbreakerId.toString());
                this.loaderService.hide();
                break;
        }
    }

    private navigate_service() {
        this.navService.showFieldEdit.takeUntil(this.destroy$).subscribe(p => {
            this.showEditField = p.valueOf();
        });

        this.navService.onSave.takeUntil(this.destroy$).subscribe(async status => {
            if (status) {
                await this.navService.setOnSave(false);

                if (this.LawbreakerFG.invalid) {
                    this.isRequired = true;
                    if (this.LawbreakerFG.controls.PassportNo.invalid) {
                        alert('กรุณาระบุ เลขหนังสือเดินทาง');
                    } else if (this.LawbreakerFG.controls.CompanyRegistrationNo.invalid) {
                        alert('กรุณาระบุ เลขทะเบียนนิติบุคคล')
                    } else {
                        alert(Message.checkData)
                    }
                    return;
                }

                let _Lfg = this.LawbreakerFG.value;
                const birthDay = this.isObject(_Lfg.BirthDate)
                    && getDateMyDatepicker(_Lfg.BirthDate)

                const passportDateIn = this.isObject(_Lfg.PassportDateIn)
                    && getDateMyDatepicker(_Lfg.PassportDateIn)

                const passportDateOut = this.isObject(_Lfg.PassportDateOut)
                    && getDateMyDatepicker(_Lfg.PassportDateOut)

                _Lfg.BirthDate = convertDateForSave(birthDay) || '';
                _Lfg.PassportDateIn = convertDateForSave(passportDateIn) || '';
                _Lfg.PassportDateOut = convertDateForSave(passportDateOut) || '';

                _Lfg.LawbreakerTitleName = _Lfg.LawbreakerTitleCode &&
                    this.typeheadTitleNames
                        .find(x => x.TitleCode == _Lfg.LawbreakerTitleCode).TitleShortNameTH;

                _Lfg.NationalityNameTH = _Lfg.ReligionCode &&
                    this.typeheadNationality
                        .find(x => x.NationalityCode == _Lfg.NationalityCode).NationalityNameTh;

                _Lfg.ReligionName = _Lfg.ReligionCode &&
                    this.typeheadReligions
                        .find(x => x.ReligionCode == _Lfg.ReligionCode).ReligionNameTH;

                _Lfg.RaceName = _Lfg.RaceCode &&
                    this.typeheadRaces
                        .find(x => x.RaceCode == _Lfg.RaceCode).RaceNameTH;

                this.LawbreakerFG.patchValue(_Lfg); 

                if (this.mode === 'C') {
                    // this.OnCreate();
                    console.log(this.LawbreakerFG.value);
                    

                } else if (this.mode === 'R') {
                    this.OnRevice();
                }
            }
        })

        this.navService.onCancel.takeUntil(this.destroy$).subscribe(async status => {
            if (status) {
                await this.navService.setOnCancel(false);
                this.onCancel();
            }
        })

        this.navService.onNextPage.takeUntil(this.destroy$).subscribe(async status => {
            if (status) {
                await this.navService.setOnNextPage(false);
                this.router.navigate(
                    [`arrest/allegation`, this.allegationMode],
                    {
                        queryParams: {
                            arrestCode: this.arrestCode,
                            indictmentId: this.indictmentId,
                            guiltbaseId: this.guiltbaseId
                        }
                    });
            }
        })
    }

    async ArrestLawbreakerGetByCon(LawbreakerID: string) {
        await this.s_lawbreaker.ArrestMasLawbreakergetByCon(LawbreakerID)
            .then((x: fromModels.ArrestLawbreaker[]) => {
                let law = x[0];
                this.LawbreakerFG.patchValue(law);
                if (law.LinkPhoto) {
                    this.imgNobody.nativeElement.src = law.LinkPhoto;
                }
                if (law.EntityType == 1 && law.LawbreakerType == 1) {
                    this.card3 = false;
                    this.card4 = false;
                } else if (law.EntityType == 1 && law.LawbreakerType == 0) {
                    this.card4 = false;
                } else if (law.EntityType == 0) {
                    this.card3 = false;
                }
            })
    }

    onChangeGps() {
       let t =  this.latitude.nativeElement.value;
       let g = this.longitude.nativeElement.value;
        this.LawbreakerFG.patchValue({
            GPS: `${t},${g}`
        })
    }

    toggleCard() {
        const e = this.LawbreakerFG.value.EntityType;
        const l = this.LawbreakerFG.value.LawbreakerType;

        this.requiredCompanyRegister = false;
        this.requiredPassport = false;

        if (e == '1' && l == '0') {
            this.requiredPassport = true;
            this.card3 = true;
        } else if (e == '2') {
            this.requiredCompanyRegister = true;
            this.card4 = true;
        }
    }

    private async setRegionStore() {
        // await this.mainMasterService.masDistrictMaingetAll().then(res => {
        //     res.map(prov =>
        //         prov.MasDistrict.map(dis =>
        //             dis.MasSubDistrict.map(subdis => {
        //                 this.typeheadRegion.push({
        //                     SubdistrictCode: subdis.SubdistrictCode,
        //                     SubdistrictNameTH: subdis.SubdistrictNameTH,
        //                     DistrictCode: dis.DistrictCode,
        //                     DistrictNameTH: dis.DistrictNameTH,
        //                     ProvinceCode: prov.ProvinceCode,
        //                     ProvinceNameTH: prov.ProvinceNameTH,
        //                     ZipCode: null
        //                 })
        //             })
        //         )
        //     )

        // })
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

    searchTitleName = (text$: Observable<string>) =>
        text$
            .debounceTime(300)
            .distinctUntilChanged()
            .map(term => term == '' ? []
                : this.typeheadTitleNames
                    .filter(v =>
                        v.TitleShortNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                        v.TitleNameTH.toLowerCase().indexOf(term.toLowerCase()) > -1
                    ).slice(0, 10));

    searchNationality = (text$: Observable<string>) =>
        text$
            .debounceTime(300)
            .distinctUntilChanged()
            .map(term => term == '' ? []
                : this.typeheadNationality.filter(v => v.NationalityNameTh.indexOf(term) > -1).slice(0, 10))

    searchRace = (text$: Observable<string>) =>
        text$
            .debounceTime(300)
            .distinctUntilChanged()
            .map(term => term == '' ? []
                : this.typeheadRaces.filter(v => v.RaceNameTH.indexOf(term) > -1).slice(0, 10));

    searchReligion = (text$: Observable<string>) =>
        text$
            .debounceTime(300)
            .distinctUntilChanged()
            .map(term => term == '' ? []
                : this.typeheadReligions.filter(v => v.ReligionNameTH.indexOf(term) > -1).slice(0, 10));

    searchCountry = (text$: Observable<string>) =>
        text$
            .debounceTime(300)
            .distinctUntilChanged()
            .map(term => term == '' ? []
                : this.typeheadCountry.filter(v => v.CountryNameEN.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

    formatterRegion = (x: { SubdistrictNameTH: string, DistrictNameTH: string, ProvinceNameTH: string }) =>
        `${x.SubdistrictNameTH} ${x.DistrictNameTH} ${x.ProvinceNameTH}`;

    formatterTitleName = (x: { TitleNameTH: string }) => x.TitleNameTH;

    formatterNationality = (x: { NationalityNameTh: string }) => x.NationalityNameTh;

    formatterRace = (x: { RaceNameTH: string }) => x.RaceNameTH;

    formatterReligion = (x: { ReligionNameTH: string }) => x.ReligionNameTH;

    formatterCountry = (CountryNameTH: string) => CountryNameTH;

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

    selectItemTitleName = (e: any) => this.LawbreakerFG.patchValue({
        LawbreakerTitleCode: e.item.TitleCode,
        LawbreakerTitleName: e.item.TitleNameTH
    });

    selectItemNationality = (e: any) => this.LawbreakerFG.patchValue({
        NationalityCode: e.item.NationalityCode,
        NationalityNameTH: e.item.NationalityNameTh
    })

    selectItemRace = (e: any) => this.LawbreakerFG.patchValue({
        RaceCode: e.item.RaceCode,
        RaceName: e.item.RaceNameTH
    })

    selectItemReligion = (e: any) => this.LawbreakerFG.patchValue({
        ReligionCode: e.item.ReligionCode,
        ReligionName: e.item.ReligionNameTH
    })

    selectItemCountry = (e: any) => this.LawbreakerFG.patchValue({
        PassportCountryCode: e.item.CountryCode,
        PassportCountryName: e.item.CountryNameEN
    })

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

    catchError(error: any) {
        console.log(error);
        this.endLoader();
    }

    endLoader = () => this.loaderService.hide();

    isObject = (obj) => obj === Object(obj);

    checkResponse(res: any) {
        switch (res.IsSuccess) {
            case 'True':
            case true:
                return true;
            default:
                return false;
        }
    }

    OnCreate() {
        console.log(JSON.stringify(this.LawbreakerFG.value));

        this.s_masLawbreaker.ArrestMasLawbreakerinsAll(this.LawbreakerFG.value)
            .takeUntil(this.destroy$)
            .subscribe(res => {
                if (!this.checkResponse(res)) {
                    alert(Message.saveFail);
                    return;
                }
                alert(Message.saveComplete);
                this.router.navigate([`/arrest/lawbreaker/R/${res.LawbreakerID}`])
            });
    }

    async OnRevice() {
        this.s_masLawbreaker.ArrestMasLawbreakerupdByCon(this.LawbreakerFG.value)
            .takeUntil(this.destroy$)
            .subscribe(res => {
                if (!this.checkResponse(res)) {
                    alert(Message.saveFail);
                    return;
                }
                alert(Message.saveComplete);
            })
    }

    onCancel() {
        if (!confirm(Message.confirmAction))
            return

        switch (this.mode) {
            case 'C':
                this.router.navigate(
                    [`arrest/allegation`, 'C'],
                    {
                        queryParams: {
                            arrestMode: this.arrestMode,
                            arrestCode: this.arrestCode,
                            indictmentId: this.indictmentId,
                            guiltbaseId: this.guiltbaseId
                        }
                    });
                break;

            case 'R':
                this.pageLoad();
                break;
        }
    }
}
