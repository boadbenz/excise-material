import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { InvestigateService } from '../investigate.service';
import { HttpErrorResponse } from '@angular/common/http';
import { toLocalNumeric, setZero, resetLocalNumeric } from '../../../config/dateFormat';
import { InvestigateTeam, InvestigateTeamFormControl } from '../investigate-team';
import { InvestigateDetail } from '../investigate-detail';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
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
    investigateDetail = new Array<InvestigateDetail>();

    get InvestigateTeam(): FormArray {
        return this.investigateFG.get('InvestigateTeam') as FormArray;
    }

    get InvestigateDetail(): FormArray {
        return this.investigateFG.get('InvestigateDetail') as FormArray;
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

    private detailGetByCon(InvestigateCode: string) {
        this.sub = this.invesService.detailGetByCon(InvestigateCode).then(item => {
            console.log(item);
            this.investigateFG.reset({
                InvestigateCode: item.InvestigateCode,
                InvestigateSeq:item.InvestigateSeq,
                StationCode: item.StationCode,
                StationName: item.StationName,
                InvestigateDetail: item.InvestigateDetail,
                InvestigateDateStart: toLocalNumeric(item.InvestigateDateStart),
                InvestigateDateEnd: toLocalNumeric(item.InvestigateDateEnd),
                ConfidenceOfNews:  item.ConfidenceOfNews,
                ValueOfNews:  item.ValueOfNews,
            });
            this.investigateDetail = item;
        }, (err: HttpErrorResponse) => {
            alert(err.message);
        });
    }
    setInvestTeam(investTeam: InvestigateTeam[]) {
        if (investTeam) {
            investTeam.map(team => team.FullName = `${team.TitleName} ${team.FirstName} ${team.LastName}`);
            const teamFGs = investTeam.map(team => this.fb.group(team));
            const teamFormArray = this.fb.array(teamFGs);
            this.investigateFG.setControl('InvestigateTeam', teamFormArray);
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
            InvestigateTeam: this.fb.array([this.createTeam()]),
            InvestigateDetailStaff: this.fb.array([]),
            InvestigateDetailProduct: this.fb.array([]),
            InvestigateDetailLocal: this.fb.array([]),
            InvestigateDetailSuspect: this.fb.array([])
        });
    }

    private createTeam(): FormGroup {
        InvestigateTeamFormControl.InvestigateCode = new FormControl(this.investCode);
        return this.fb.group(InvestigateTeamFormControl)
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
        this.InvestigateTeam.at(i).reset(e.item);
        this.InvestigateTeam.at(i).patchValue({
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
