import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { DropDown, RegionModel } from '../../../../models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import { FormBuilder, FormGroup } from '@angular/forms';
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
        private activatedRoute: ActivatedRoute,
        private navService: NavigationService,
        private fb: FormBuilder,
        private loaderService: LoaderService
    ) {
        this.navService.setPrintButton(false);
        this.navService.setDeleteButton(false);
    }

    card1 = true;
    card2 = true;
    card3 = true;
    card4 = true;

    @ViewChild('imgNobody') imgNobody: ElementRef;

    // LawbreakerItem: Lawbreaker;
    LawbreakerFG: FormGroup;

    private subActivedRoute: any;
    private onSaveSubscribe: any;
    private mode: any;
    private lawbreakerId: string;

    myDatePickerOptions = MyDatePickerOptions;
    modal: any;
    showEditField: any;
    isRequired: boolean | false;
    visaTypes: DropDown[];
    bloodTypes: DropDown[];
    entityTypes: DropDown[];
    genderTypes: DropDown[];
    LawbreakerTypes: DropDown[];
    materialStatus: DropDown[];

    typeheadNationnalitys: DropDown[];
    typeheadTitleNames = new Array<fromMasterModel.MasTitleModel>();
    typeheadRaces = new Array<fromMasterModel.MasRaceModel>();
    typeheadReligions = new Array<fromMasterModel.MasReligionModel>();
    typeheadRegion = new Array<RegionModel>();
    typeheadCountry = new Array<fromMasterModel.MasCountryModel>();
    typeheadNationality = new Array<fromMasterModel.MasNationalityModel>();

    async ngOnInit() {
        // this.preloader.setShowPreloader(true);

        this.LawbreakerFG = this.createForm();

        await this.active_route();
        await this.navigate_service();
        await this.setRegionStore();

        // this.preloader.setShowPreloader(false);
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
            this.lawbreakerId = p['code'];

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

                // if (p['code']) {
                //     this.lawbreakerId = p['code'];
                //     this.GetByCon(p['code']);
                // }
            }

            this.pageLoad();
        });
    }

    private async pageLoad() {
        switch (this.mode) {
            case 'C':

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
                break;

            case 'R':
                this.loaderService.show();
                this.ArrestLawbreakerGetByCon(this.lawbreakerId);
                this.loaderService.hide();
                break;
        }
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

    async ArrestLawbreakerGetByCon(LawbreakerID: string) {
        await this.s_lawbreaker.ArrestMasLawbreakergetByCon(LawbreakerID)
            .then((x: fromModels.ArrestLawbreaker) => {
                if (x.LinkPhoto) {
                    this.imgNobody.nativeElement.src = x.LinkPhoto;
                }
                if (x.EntityType == 1 && x.LawbreakerType == 1) {
                    this.card3 = false;
                    this.card4 = false;
                } else if (x.EntityType == 1 && x.LawbreakerType == 0) {
                    this.card4 = false;
                } else if (x.EntityType == 0) {
                    this.card3 = false;
                }
            })


    }

    OnCreate() {

    }

    async OnRevice() {
        // Set Preloader
        // this.preloader.setShowPreloader(true);

        // let IsSuccess: boolean | false;
        // await this.arrestService
        //     .ArrestLawbreakerupdByCon(this.LawbreakerFG.value)
        //     .then(isSuccess => {
        //         IsSuccess = isSuccess;
        //     }, () => { IsSuccess = false; })

        // if (IsSuccess) {
        //     alert(Message.saveComplete)
        // } else {
        //     alert(Message.saveFail)
        // }
        // // Set Preloader
        // this.preloader.setShowPreloader(false);
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

    formatterRegion = (x: { SubdistrictNameTH: string, DistrictNameTH: string, ProvinceNameTH: string }) =>
        `${x.SubdistrictNameTH} ${x.DistrictNameTH} ${x.ProvinceNameTH}`;

    formatterTitleName = (x: { TitleNameTH: string }) => x.TitleNameTH;

    formatterNationality = (x: { NationalityNameTh: string }) => x.NationalityNameTh;

    formatterRace = (x: { RaceNameTH: string }) => x.RaceNameTH;

    formatterReligion = (x: { ReligionNameTH: string }) => x.ReligionNameTH;

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
