import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { InvestigateService } from '../investigate.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Investigate } from '../investigate';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { toLocalNumeric, setZero, resetLocalNumeric } from '../../../config/dateFormat';
import { InvestigateTeam, InvestigateTeamFormControl } from '../investigate-team';
import { InvestigateDetail } from '../investigate-detail';
import { Message } from '../../../config/message';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { async } from '@angular/core/testing';
import { SidebarService } from '../../../shared/sidebar/sidebar.component';
import { PreloaderService } from '../../../shared/preloader/preloader.component';

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
    StaffId: any;
    modal: any;

    model: any;
    //typeheadStaff = new Array<InvestigateTeam>();
    showEditField: any;
    isRequired: boolean | false;
    investigateForm: FormGroup;
    investigate = new Investigate();
    investigateDetail = new Array<InvestigateDetail>();

    @ViewChild('printDocModal') printDocModel: ElementRef;

    get InvestigationTeam(): FormArray {
        return this.investigateForm.get('InvestigationTeam') as FormArray;
    }

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private activeRoute: ActivatedRoute,
        private navService: NavigationService,
        private ngbModel: NgbModal,
        private invesService: InvestigateService,
        private sidebarService: SidebarService,
        private preloader: PreloaderService
    ) {
        // set false
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);
        this.navService.setNextPageButton(false);
    }

    ngOnInit() {
        this.preloader.setShowPreloader(true);
        this.sidebarService.setVersion('1.02');

        this.active_Route();
        this.navigate_Service();
        this.createForm();
        //this.setStaffStore()

        this.preloader.setShowPreloader(false);
    }

    private createForm() {
        this.investigateForm = this.fb.group({
            InvestigateCode: new FormControl(this.investCode, Validators.required),
            InvestigateNo: new FormControl(null),
            DateStart: new FormControl(null),
            DateEnd: new FormControl(null),
            Subject: new FormControl(null),
            InvestigationTeam: this.fb.array([this.createTeam()])
        });
    }

    private createTeam(): FormGroup {
        InvestigateTeamFormControl.InvestigateCode = new FormControl(this.investCode);
        return this.fb.group(InvestigateTeamFormControl)
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

                if (p['code']) {
                    this.investCode = p['code'];
                    this.getByCon(p['code']);
                }
            }
        });
    }

    private navigate_Service() {
        this.sub = this.navService.showFieldEdit.subscribe(p => {
            this.showEditField = p;
        });

        this.sub = this.navService.onCancel.subscribe(async status => {
            if (status) {
                await this.navService.setOnCancel(false);
                this.router.navigate(['/investigation/list']);
            }
        })

        this.sub = this.navService.onSave.subscribe(async status => {
            if (status) {
                // set action save = false
                await this.navService.setOnSave(false);

                if (!this.investigateForm.valid) {
                    this.isRequired = true;
                    alert(Message.checkData)
                    return false;
                }

                const sDateCompare = new Date(resetLocalNumeric(this.investigateForm.value.DateStart));
                const eDateCompare = new Date(resetLocalNumeric(this.investigateForm.value.DateEnd));

                if (sDateCompare.valueOf() > eDateCompare.valueOf()) {
                    alert(Message.checkDate);
                    return false;
                }

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
    //waiting service InvestigateMasStaffgetByKeyword for typeahead

    // private async setStaffStore() {
    //     await this.invesService.masStaffgetAll().subscribe(res =>
    //         this.typeheadStaff = res
    //     )
    // }

    private getByCon(InvestigateCode: string) {
        this.sub = this.invesService.getByCon(InvestigateCode).subscribe(item => {
            this.investigateForm.reset({
                InvestigateCode: item.InvestigateCode,
                InvestigateNo: item.InvestigateNo,
                DateStart: toLocalNumeric(item.DateStart),
                DateEnd: toLocalNumeric(item.DateEnd),
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

            this.invesService.updByCon(this.investigateForm.value).subscribe(p => {
                this.onComplete();
            }, (err: HttpErrorResponse) => {
                alert(Message.saveFail);
            });

            this.invesService.teaminsAll(this.investigateForm.value.InvestigationTeam).subscribe(p => {
                this.onComplete();
            }, (err: HttpErrorResponse) => {
                alert(Message.saveFail);
            });

            this.invesService.teamudpDelete(this.StaffId).subscribe(p => {
                this.onComplete();
            }, (err: HttpErrorResponse) => {
                alert(Message.saveFail);
            });

        }
    }

    private onReviced() {
        if (this.investigateForm.valid) {

            this.invesService.updByCon(this.investigateForm.value).subscribe(p => {
                this.onComplete();
            }, (err: HttpErrorResponse) => {
                alert(Message.saveFail);
            });

            this.invesService.teaminsAll(this.investigateForm.value.InvestigationTeam).subscribe(p => {
                this.onComplete();
            }, (err: HttpErrorResponse) => {
                alert(Message.saveFail);
            });

            this.invesService.teamudpDelete(this.StaffId).subscribe(p => {
                this.onComplete();
            }, (err: HttpErrorResponse) => {
                alert(Message.saveFail);
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

    private async onDelete() {
        if (confirm(Message.confirmAction)) {
            await this.invesService.updDelete(this.investCode).subscribe(result => {
                // tslint:disable-next-line:triple-equals
                if (result.IsSuccess == 'True') {
                    alert(Message.saveComplete);
                    this.router.navigate([`/investigation/list`]);
                    // tslint:disable-next-line:triple-equals
                } else if (result.IsSuccess == 'False') {
                    alert(Message.delFail);
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

    setInvestTeam(investTeam: InvestigateTeam[]) {
        if (investTeam) {
            investTeam.map(team => team.FullName = `${team.TitleName} ${team.FirstName} ${team.LastName}`);
            const teamFGs = investTeam.map(team => this.fb.group(team));
            const teamFormArray = this.fb.array(teamFGs);
            this.investigateForm.setControl('InvestigationTeam', teamFormArray);
        }
    }

    addTeam() {
        this.InvestigationTeam.push(this.fb.group(new InvestigateTeam()));
    }

    //waiting service InvestigateMasStaffgetByKeyword for typeahead

    // searchStaff = (text3$: Observable<string>) =>
    //     text3$
    //         .debounceTime(200)
    //         .distinctUntilChanged()
    //         .map(term => term === '' ? []
    //             : this.typeheadStaff
    //                 .filter(v =>
    //                     v.TitleName.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
    //                     v.FirstName.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
    //                     v.LastName.toLowerCase().indexOf(term.toLowerCase()) > -1
    //                 ).slice(0, 10));

    // formatterStaff = (x: { TitleName: string, FirstName: string, LastName: string }) =>
    //     `${x.TitleName} ${x.FirstName} ${x.LastName}`

    // selectItemStaff(e, i) {
    //     this.InvestigationTeam.at(i).reset(e.item);
    //     this.InvestigationTeam.at(i).patchValue({
    //         ProgramCode: this.programSpect,
    //         ProcessCode: '0002',
    //         PositionCode: e.item.OperationPosCode,
    //         PositionName: e.item.OperationPosName.trim(),
    //     })
    // }

    onCreateInvestDetail() {
        if (this.investCode) {
            this.invesService.insAll(this.investigateForm.value).subscribe(p => {
                alert(Message.saveComplete);
                //this.onComplete();
                this.router.navigate([`/investigation/detail-manage/C/${this.investCode}`]);
                //this.router.navigate([`/investigation/detail-manage/C/NEW`]);
            }, (err: HttpErrorResponse) => {
                alert(Message.saveFail);
            });
        }
        this.router.navigate([`/investigation/detail-manage/C/NEW`]);
    }

    onViewInvesDetail(invesCode: string) {
        this.router.navigate([`/investigation/detail-manage/R/${invesCode}`]);
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

}
