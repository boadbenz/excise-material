import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { InvestigateService } from '../investigate.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Investigate } from '../investigate';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import * as formatDate from '../../../config/dateFormat';
import { InvestigateTeam } from '../investigate-team';
import { InvestigateDetail } from '../investigate-detail';
import { Message } from '../../../config/message';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
    'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
    'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
    'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
    'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
    'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];


@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit, OnDestroy {

    private sub: any;

    private mode: string;
    investCode: string;

    modal: any;

    model: any;

    showEditField: any;
    investigateForm: FormGroup;
    investigate = new Investigate();
    investigateDetail = new Array<InvestigateDetail>();

    @ViewChild('printDocModal') printDocModel: ElementRef;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private activeRoute: ActivatedRoute,
        private navService: NavigationService,
        private ngbModel: NgbModal,
        private invesService: InvestigateService
    ) {
        // set false
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);
        this.navService.setNextPageButton(false);
    }

    ngOnInit() {

        this.active_Route();

        this.navigate_Service();

        this.createForm();
    }

    createForm() {
        this.investigateForm = this.formBuilder.group({
            InvestigateCode: new FormControl({ value: '' }),
            InvestigateNo: new FormControl({ value: '' }),
            DateStart: new FormControl({ value: '' }),
            DateEnd: new FormControl({ value: '' }),
            Subject: new FormControl({ value: '' }),
            InvestigationTeam: this.formBuilder.array([])
        });
    }

    private active_Route() {
        this.sub = this.activeRoute.params.subscribe(p => {
            this.mode = p['mode'];
            if (p['mode'] === 'C') {
                // set false
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
            }

            if (p['code']) {
                this.investCode = p['code'];
                this.Investigate_GetByCon(p['code']);
            }
        });
    }

    private navigate_Service() {
        this.sub = this.navService.showFieldEdit.subscribe(p => {
            this.showEditField = p;
        });

        this.sub = this.navService.onSave.subscribe(async status => {
            if (status) {
                // set action save = false
                await this.navService.setOnSave(false);
                if (this.mode === 'C') {
                    this.onCreate();

                } else if (this.mode === 'R') {
                    this.onReviced();
                }
            }
        });

        this.sub = this.navService.onDelete.subscribe(async status => {
            if (status) {
                await this.navService.setOnDelete(false);
                this.onDelete();
            }
        });

        this.sub = this.navService.onPrint.subscribe(async status => {
            if (status) {
                await this.navService.setOnPrint(false);
                this.modal = this.ngbModel.open(this.printDocModel, { size: 'lg', centered: true });
            }
        })
    }

    private Investigate_GetByCon(InvestigateCode: string) {
        this.sub = this.invesService.getByCon(InvestigateCode).subscribe(item => {
            this.investigateForm.reset({
                InvestigateCode: item.InvestigateCode,
                InvestigateNo: item.InvestigateNo,
                DateStart: formatDate.toLocalNumeric(item.DateStart),
                DateEnd: formatDate.toLocalNumeric(item.DateEnd),
                Subject: item.Subject
            });

            this.setInvestTeam(item.InvestigationTeam);
            this.investigateDetail = item.InvestigationDetail;

        }, (err: HttpErrorResponse) => {
            alert(err.message);
        });
    }

    private onCreate() {
        if (this.investigateForm.valid) {
            this.invesService.insAll(this.investigateForm.value).subscribe(p => {
                this.onComplete();
            }, (err: HttpErrorResponse) => {
                alert(Message.saveError);
            });
        }
    }

    private onReviced() {
        if (this.investigateForm.valid) {
            this.invesService.updByCon(this.investigateForm.value).subscribe(p => {
                this.onComplete();
            }, (err: HttpErrorResponse) => {
                alert(Message.saveError);
            });
        }
    }

    private onComplete() {
        // set true
        this.navService.setEditField(true);
        this.navService.setEditButton(true);
        this.navService.setPrintButton(true);
        this.navService.setDeleteButton(true);
        // set false
        this.navService.setSaveButton(false);
        this.navService.setCancelButton(false);

        alert(Message.saveComplete);
    }

    private onDelete() {
        if (confirm(Message.confirmAction)) {
            this.invesService.updDelete(this.investCode).subscribe(result => {
                // tslint:disable-next-line:triple-equals
                if (result.IsSuccess == 'True') {
                    alert(Message.saveComplete);
                // tslint:disable-next-line:triple-equals
                } else if (result.IsSuccess == 'False') {
                    alert(Message.saveError);
                }
            }, (err: HttpErrorResponse) => {
                alert(err.message);
            })
        }
    }

    onDeleteStaff(indexForm: number, invesCode: string) {
        this.invesService.detailGetByCon(invesCode).subscribe(result => {
            if (result.length) {
                alert(Message.cannotDelete);
            } else {
                this.InvestigationTeam.removeAt(indexForm);
            }
        })
    }

    get InvestigationTeam(): FormArray {
        return this.investigateForm.get('InvestigationTeam') as FormArray;
    }

    setInvestTeam(investTeam: InvestigateTeam[]) {
        if (investTeam) {
            investTeam.map(team => team.FullName = `${team.TitleName} ${team.FirstName} ${team.LastName}`);
            const teamFGs = investTeam.map(team => this.formBuilder.group(team));
            const teamFormArray = this.formBuilder.array(teamFGs);
            this.investigateForm.setControl('InvestigationTeam', teamFormArray);
        }
    }

    addTeam() {
        this.InvestigationTeam.push(this.formBuilder.group(new InvestigateTeam()));
    }

    searchStaff = (text$: Observable<string>) =>
        text$
            .debounceTime(200)
            .distinctUntilChanged()
            .map(term => term.length < 2 ? []
                : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

    onCreateInvestDetail() {
        this.router.navigate([`/investigation/detail-manage/C/NEW`]);
    }

    onViewInvesDetail(invesCode: string) {
        this.router.navigate([`/investigation/detail-manage/R/${invesCode}`]);
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

}
