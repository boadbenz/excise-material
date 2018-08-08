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


@Component({
    selector: 'app-lawbreaker',
    templateUrl: './lawbreaker.component.html',
    styleUrls: ['./lawbreaker.component.scss']
})
export class LawbreakerComponent implements ILawbreaker, OnInit, OnDestroy {
    LawbreakerItem;
    LawbreakerFG;
    GetByCon(LawbreakerID: string) {
        throw new Error("Method not implemented.");
    }
    OnCreate(value: Lawbreaker){

    }
    OnRevice(value: Lawbreaker) {
        
    }

    modal: any;
    private mode: any;
    private subActivatedRoute: any;
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

    typeheadRegion: RegionModel[] = [];

    constructor(
        private ngModalService: NgbModal,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private navService: NavigationService,
        private arrestService: ArrestsService,
        private preLoader: PreloaderService
    ) {
        this.navService.setNextPageButton(false);
        this.navService.setDeleteButton(false);
        this.navService.setPrintButton(false);
    }

    ngOnInit() {
        this.preLoader.setShowPreloader(true);

        this.active_route();
        this.navigate_service()

        this.preLoader.setShowPreloader(false)

    }

    private active_route() {
        this.subActivatedRoute = this.activatedRoute.params.subscribe(p => {
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
        this.navService.showFieldEdit.subscribe(p => {
            this.showEditField = p;
        });
    }

    ngOnDestroy(): void {
        this.subActivatedRoute.unsubscribe();
    }

    openOffenseDetailModal(e: any) {
        this.modal = this.ngModalService.open(e, { size: 'lg', centered: true });
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
        // this.SuspectFG.patchValue({
        //     SubDistrictCode: ele.item.SubDistrictCode,
        //     SubDistrict: ele.item.SubDistrictNameTH,
        //     DistrictCode: ele.item.DistrictCode,
        //     District: ele.item.DistrictNameTH,
        //     ProvinceCode: ele.item.ProvinceCode,
        //     Province: ele.item.ProvinceNameTH
        // });
    }
}
