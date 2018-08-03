import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { DropDown, VISATypes, BloodTypes, EntityTypes, GenderTypes, LawbreakerTypes, TitleNames, Nationalitys, Races, Religions, MaritalStatus, RegionModel } from '../../../models';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ISuspect, Suspect } from './suspect.interface';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import { ArrestsService } from '../../arrests/arrests.service';

@Component({
    selector: 'app-suspect',
    templateUrl: './suspect.component.html',
    styleUrls: ['./suspect.component.scss']
})
export class SuspectComponent implements OnInit, OnDestroy {

    constructor(
        private ngModalService: NgbModal,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private preloader: PreloaderService,
        private navService: NavigationService,
        private fb: FormBuilder,
        private arrestService: ArrestsService
    ) {
        this.navService.setPrintButton(false);
        this.navService.setDeleteButton(false);
    }

    SuspectItem: Suspect;
    SuspectFG: FormGroup = this.fb.group({
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
        GenderType: new FormControl(null, Validators.required),
        BloodType: new FormControl(null, Validators.required),
        NationalityCode: new FormControl(null, Validators.required),
        NationalityNameTH: new FormControl(null, Validators.required),
        RaceCode: new FormControl(null, Validators.required),
        RaceName: new FormControl(null, Validators.required),
        ReligionCode: new FormControl(null, Validators.required),
        ReligionName: new FormControl(null, Validators.required),
        MaritalStatus: new FormControl(null),
        Career: new FormControl(null),
        GPS: new FormControl(null),
        Location: new FormControl(null),
        Address: new FormControl(null, Validators.required),
        Village: new FormControl(null, Validators.required),
        Building: new FormControl(null),
        Floor: new FormControl(null),
        Room: new FormControl(null),
        Alley: new FormControl(null),
        Road: new FormControl(null, Validators.required),
        SubDistrictCode: new FormControl(null, Validators.required),
        SubDistrict: new FormControl(null, Validators.required),
        DistrictCode: new FormControl(null, Validators.required),
        District: new FormControl(null, Validators.required),
        ProvinceCode: new FormControl(null, Validators.required),
        Province: new FormControl(null, Validators.required),
        ZipCode: new FormControl(null, Validators.required),
        TelephoneNo: new FormControl(null),
        Email: new FormControl(null),
        FatherName: new FormControl(null),
        MotherName: new FormControl(null),
        Remarks: new FormControl(null),
        LinkPhoto: new FormControl(null),
        PhotoDesc: new FormControl(null),
        IsActive: new FormControl(null),
    });

    private subActivedRoute: any;
    private mode: any;

    modal: any;
    showEditField: any;
    visaTypes: DropDown[] = VISATypes;
    bloodTypes: DropDown[] = BloodTypes;
    entityTypes: DropDown[] = EntityTypes;
    genderTypes: DropDown[] = GenderTypes;
    suspectTypes: DropDown[] = LawbreakerTypes;
    titleNames: DropDown[] = TitleNames;
    nationnalitys: DropDown[] = Nationalitys;
    races: DropDown[] = Races;
    religions: DropDown[] = Religions;
    materialStatus: DropDown[] = MaritalStatus;

    typeheadRegion: RegionModel[]

    async ngOnInit() {
        this.preloader.setShowPreloader(true);
        // await this.setRegionStore();
        
        this.active_route();
        this.navigate_service();
        // this.createForm();
        this.preloader.setShowPreloader(false);
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
                    // this.noticeCode = p['code'];
                    // this.getByCon(p['code']);
                }
            }
        });
    }

    private navigate_service() {

    }

    GetByCon(SuspectID: string) {
        throw new Error("Method not implemented.");
    }

    OnCreate(value: Suspect) {

    }

    OnRevice(value: Suspect) {

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
        this.SuspectFG.patchValue({
            SubDistrictCode: ele.item.SubDistrictCode,
            SubDistrict: ele.item.SubDistrictNameTH,
            DistrictCode: ele.item.DistrictCode,
            District: ele.item.DistrictNameTH,
            ProvinceCode: ele.item.ProvinceCode,
            Province: ele.item.ProvinceNameTH
        });
    }
}
