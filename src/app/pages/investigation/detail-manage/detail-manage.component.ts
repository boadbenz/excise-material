import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { InvestigateService } from '../investigate.service';
import { HttpErrorResponse } from '@angular/common/http';
import { InvestigateTeam, InvestigateTeamFormControl } from '../investigate-team';
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
    myGroup: FormGroup;
    investigateForm: FormGroup;
    typeheadStaff = new Array<InvestigateTeam>();

    get InvestigationTeam(): FormArray {
        return this.investigateForm.get('InvestigationTeam') as FormArray;
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

                this.getByCon(p['code']);
                this.createForm();
                this.setStaffStore(p['code'])

            } else if (p['mode'] === 'R') {
                // set false
                this.navService.setSaveButton(false);
                this.navService.setCancelButton(false);
                // set true
                this.navService.setPrintButton(true);
                this.navService.setEditButton(true);
                this.navService.setDeleteButton(true);
                this.navService.setEditField(true);
            }

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


    private setStaffStore(InvestigateCode: string) {
        this.invesService.teamgetByCon(InvestigateCode).subscribe(res =>
            this.typeheadStaff = res
        )
    }

    private getByCon(InvestigateCode: string) {
        // this.sub = this.invesService.teamgetByCon(InvestigateCode).subscribe(item => {
        //     this.setInvestTeam(item);
        // }, (err: HttpErrorResponse) => {
        //     alert(err.message);
        // });
    }
    setInvestTeam(investTeam: InvestigateTeam[]) {
        if (investTeam) {
            investTeam.map(team => team.FullName = `${team.TitleName} ${team.FirstName} ${team.LastName}`);
            const teamFGs = investTeam.map(team => this.fb.group(team));
            const teamFormArray = this.fb.array(teamFGs);
            this.investigateForm.setControl('InvestigationTeam', teamFormArray);
        }
    }

    private createForm() {
        this.investigateForm = this.fb.group({
            InvestigationTeam: this.fb.array([this.createTeam()])
        });
    }

    private createTeam(): FormGroup {
        InvestigateTeamFormControl.InvestigateCode = new FormControl(this.investCode);
        return this.fb.group(InvestigateTeamFormControl)
    }

    searchStaff = (text$: Observable<string>) => {
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
    }

    formatterStaff = (x: { TitleName: string, FirstName: string, LastName: string }) =>
        `${x.TitleName} ${x.FirstName} ${x.LastName}`

    selectItemStaff(e, i) {
        this.InvestigationTeam.at(i).reset(e.item);
        this.InvestigationTeam.at(i).patchValue({
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
