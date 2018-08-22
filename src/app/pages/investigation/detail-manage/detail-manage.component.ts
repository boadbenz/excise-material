import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { InvestigateService } from '../investigate.service';
import { HttpErrorResponse } from '@angular/common/http';
import { toLocalNumeric, setZero, resetLocalNumeric } from '../../../config/dateFormat';
import { InvestigateTeam, InvestigateTeamFormControl } from '../investigate-team';
import { InvestigateDetailStaff, InvestigateStaffFormControl } from '../investigate-detail-staff';
import { InvestigateDetailSuspect, InvestigateSuspectFormControl } from '../investigate-detail-suspect';
import { InvestigateDetailLocal, InvestigateLocalFormControl } from '../investigate-detail-local';
import { InvestigateDetailProduct, InvestigateProductFormControl } from '../investigate-detail-product';
import { InvestigateDetail } from '../investigate-detail';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MasProductModel } from '../../../models/mas-product.model';
import { MasDutyProductUnitModel } from '../../../models/mas-duty-product-unit.model';
import { DropDown, ValueofNews, CostofNews } from '../../../models';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
@Component({
    selector: 'app-investigate-detail-manage',
    templateUrl: './detail-manage.component.html',
    styleUrls: ['./detail-manage.component.scss']
})
export class DetailManageComponent implements OnInit, OnDestroy {

    private sub: any;
    modal: any;
    private mode: string;
    showEditField: any;
    investCode: string;
    investigateFG: FormGroup;
    typeheadStaff = new Array<InvestigateTeam>();
    typeaheadProduct = new Array<MasProductModel>();
    typeheadProductUnit = new Array<MasDutyProductUnitModel>();
    valofnews: DropDown[] = ValueofNews;
    costofnews: DropDown[] = CostofNews;
    investigateDetail = new Array<InvestigateDetail>();
    investigateDetailStaff = new Array<InvestigateDetailStaff>();
    investigateDetailSuspect = new Array<InvestigateDetailSuspect>();
    investigateDetailLocal = new Array<InvestigateDetailLocal>();
    investigateDetailProduct = new Array<InvestigateDetailProduct>();

    get InvestigateDetail(): FormArray {
        return this.investigateFG.get('InvestigateDetail') as FormArray;
    }

    get InvestigateDetailStaff(): FormArray {
        return this.investigateFG.get('InvestigateDetailStaff') as FormArray;
    }

    get InvestigateDetailSuspect(): FormArray {
        return this.investigateFG.get('InvestigateDetailSuspect') as FormArray;
    }

    get InvestigateDetailLocal(): FormArray {
        return this.investigateFG.get('InvestigateDetailLocal') as FormArray;
    }

    get InvestigateDetailProduct(): FormArray {
        return this.investigateFG.get('InvestigateDetailProduct') as FormArray;
    }

    constructor(
        private fb: FormBuilder,
        private activeRoute: ActivatedRoute,
        private invesService: InvestigateService,
        private ngModal: NgbModal,
        private navService: NavigationService,
        private elem: ElementRef
    ) {
        // set false
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);
        this.navService.setNextPageButton(false);
    }

    ngOnInit() {
        this.sub = this.activeRoute.params.subscribe(p => {
            this.mode = p['mode'];

            if (p['mode'] === 'C' && p['code']) {
                // set false
                this.navService.setPrintButton(false);
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

                this.detailGetByCon(p['code']);
            }

            this.createForm();
            this.setStaffStore(p['code'])

        });
        this.sub = this.navService.showFieldEdit.subscribe(status => {
            this.showEditField = status;
        });

        this.sub = this.navService.onSave.subscribe(status => {
            if (status) {
                this.onSave();
            }
        });

        this.sub = this.navService.onEdit.subscribe(status => {
            if (status) {
                this.onEdit();
            }
        })
    }
    // show first panel
    ngAfterViewInit() {
        let elements = this.elem.nativeElement.querySelectorAll('.card-body');
        elements.forEach(element => {
            if (element.id != "0") {
                element.style.display = "none";
            }
        });
    }

    private async setStaffStore(InvestigateCode: string) {
        await this.invesService.teamgetByCon(InvestigateCode).subscribe(res =>
            this.typeheadStaff = res
        )
    }

    // private async setProductStore() {
    //     await this.invesService.masProductgetAll().then(res => {
    //         this.typeheadProduct = res;
    //     })
    // }

    // private async setProductUnitStore() {
    //     await this.invesService.getProveProductUnit('').then(res => {
    //         this.typeheadProductUnit = res;
    //     })
    // }

    private detailGetByCon(InvestigateCode: string) {
        this.sub = this.invesService.detailGetByCon(InvestigateCode).then(item => {
            this.investigateFG.reset({
                InvestigateCode: item.InvestigateCode,
                InvestigateSeq: item.InvestigateSeq,
                StationCode: item.StationCode,
                StationName: item.StationName,
                InvestigateDetail: item.InvestigateDetail,
                InvestigateDateStart: toLocalNumeric(item.InvestigateDateStart),
                InvestigateDateEnd: toLocalNumeric(item.InvestigateDateEnd),
                ConfidenceOfNews: item.ConfidenceOfNews,
                ValueOfNews: item.ValueOfNews,
            });
            this.investigateDetail = item;
            this.setInvestTeam(item['InvestigateDetailStaff']);
            this.setInvestLocal(item['InvestigateDetailLocal'], item.InvestigateCode);
            this.setInvestSuspect(item['InvestigateDetailSuspect']);
            this.setInvestProduct(item['InvestigateDetailProduct']);
        }, (err: HttpErrorResponse) => {
            alert(err.message);
        });
    }

    private setInvestTeam(investStaff: InvestigateDetailStaff[]) {
        if (investStaff) {
            investStaff.map(team => team.FullName = `${team.TitleName} ${team.FirstName} ${team.LastName}`);
            const teamFGs = investStaff.map(team => this.fb.group(team));
            const teamFormArray = this.fb.array(teamFGs);
            this.investigateFG.setControl('InvestigateDetailStaff', teamFormArray);
        }
    }

    private setInvestSuspect(investSuspect: InvestigateDetailSuspect[]) {
        if (investSuspect) {
            investSuspect.map(team => team.FullName = `${team.SuspecTitleName} ${team.SuspectFirstName} ${team.SuspectLastName}`);
            const teamFGs = investSuspect.map(team => this.fb.group(team));
            const teamFormArray = this.fb.array(teamFGs);
            this.investigateFG.setControl('InvestigateDetailSuspect', teamFormArray);
        }
    }

    private setInvestLocal(investLocal: InvestigateDetailLocal[], investCode: string) {
        if (investLocal) {
            this.invesService.localgetByCon(investCode).subscribe(item => {
                const teamFGs = item.map(team => this.fb.group(team));
                const teamFormArray = this.fb.array(teamFGs);
                this.investigateFG.setControl('InvestigateDetailLocal', teamFormArray);
            })
        }
    }

    private setInvestProduct(investProduct: InvestigateDetailProduct[]) {
        if (investProduct) {
            const teamFGs = investProduct.map(team => this.fb.group(team));
            const teamFormArray = this.fb.array(teamFGs);
            this.investigateFG.setControl('InvestigateDetailProduct', teamFormArray);
        }
    }

    private createForm() {
        this.investigateFG = this.fb.group({
            InvestigateCode: new FormControl(this.investCode, Validators.required),
            InvestigateSeq: new FormControl(null),
            StationCode: new FormControl(null),
            StationName: new FormControl(null),
            InvestigateDateStart: new FormControl(null),
            InvestigateDateEnd: new FormControl(null),
            ConfidenceOfNews: new FormControl(null),
            ValueOfNews: new FormControl(null),
            InvestigateDetail: new FormControl(null),
            InvestigateDetailStaff: this.fb.array([this.createStaffForm()]),
            InvestigateDetailProduct: this.fb.array([this.createProductForm()]),
            InvestigateDetailLocal: this.fb.array([this.createLocalForm()]),
            InvestigateDetailSuspect: this.fb.array([this.createSuspectForm()])
        });
    }

    private createStaffForm(): FormGroup {
        InvestigateStaffFormControl.InvestigateCode = new FormControl(this.investCode);
        return this.fb.group(InvestigateStaffFormControl)
    }

    private createSuspectForm(): FormGroup {
        InvestigateSuspectFormControl.InvestigateCode = new FormControl(this.investCode);
        return this.fb.group(InvestigateSuspectFormControl)
    }

    private createProductForm(): FormGroup {
        InvestigateProductFormControl.InvestigateCode = new FormControl(this.investCode);
        return this.fb.group(InvestigateSuspectFormControl)
    }

    private createLocalForm(): FormGroup {
        InvestigateLocalFormControl.InvestigateCode = new FormControl(this.investCode);
        return this.fb.group(InvestigateSuspectFormControl)
    }

    searchStaff = (text$: Observable<string>) =>
        text$
            .debounceTime(200)
            .distinctUntilChanged()
            .map(term => term === '' ? []
                : this.typeheadStaff
                    .filter(v =>
                        v.TitleName.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                        v.FirstName.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                        v.LastName.toLowerCase().indexOf(term.toLowerCase()) > -1
                    ).slice(0, 10));

    formatterStaff = (x: { TitleName: string, FirstName: string, LastName: string }) =>
        `${x.TitleName} ${x.FirstName} ${x.LastName}`

    selectItemStaff(e, i) {
        this.InvestigateDetailStaff.at(i).reset(e.item);
        this.InvestigateDetailStaff.at(i).patchValue({
            DepartmentName: e.item.DepartmentName,
            PositionName: e.item.PositionName.trim(),
        })
    }

    private onSave() {
        // set true
        this.navService.setEditField(true);
        this.navService.setEditButton(true);
        this.navService.setPrintButton(true);
        this.navService.setDeleteButton(true);
        // set false
        this.navService.setSaveButton(false);
        this.navService.setCancelButton(false);
    }

    private onEdit() {

    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    openModal(e) {
        this.modal = this.ngModal.open(e, { size: 'lg', centered: true });
    }

}
