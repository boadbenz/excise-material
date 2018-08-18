import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { IncomeService } from '../income.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Revenue } from '../Revenue';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import * as formatDate from '../../../config/dateFormat';
import { Message } from '../../../config/message';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html'
})
export class ManageComponent implements OnInit, OnDestroy {
 
    private sub: any;
    mode: string;
    modal: any;
    revenueCode: string;
    // rawOptions = [];
    // options = [];

    // --------
    showEditField: any;
    revenueForm: FormGroup;
   
    // ----- Model ------ //
    @ViewChild('printDocModal') printDocModel: ElementRef;

    constructor(
        private activeRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private ngbModel: NgbModal,
        private navService: NavigationService,
        private incomeService: IncomeService
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
        this.revenueForm = this.formBuilder.group({
            RevenueDate: new FormControl({ value: '' }),
            RevenueTime: new FormControl({ value: '' }),
            RevenueCode: new FormControl({ value: '' }),
            InformTo: new FormControl({ value: '' }),
            StationName: new FormControl({ value: '' }),
            StaffName: new  FormControl({ value: '' }),
            PositionName: new  FormControl({ value: '' }),
            DepartmentName: new  FormControl({ value: '' }),
            OfficeName: new  FormControl({ value: '' }),
            OfficeShortName: new  FormControl({ value: '' }),
            RevenueStatus: new  FormControl({ value: '' })
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
                this.revenueCode = p['code'];
                this.Revenue_GetByCon(p['code']);
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
                debugger
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

    private Revenue_GetByCon(revenueCode: string) {
        this.sub = this.incomeService.getByCon(revenueCode).subscribe(item => {
            this.revenueForm.reset({
                RevenueCode: item[0].RevenueCode,
                RevenueDate: item[0].RevenueDate,
                InformTo: item[0].InformTo,
                StationName: item[0].StationName,
                StaffName: item[0].RevenueStaff[0].TitleName + item[0].RevenueStaff[0].FirstName + ' ' + item[0].RevenueStaff[0].LastName,
                PositionName: item[0].RevenueStaff[0].PositionName,
                DepartmentName: item[0].RevenueStaff[0].DepartmentName,
                OfficeName: item[0].RevenueStaff[0].OfficeName,
                OfficeShortName: item[0].RevenueStaff[0].OfficeShortName,
                RevenueStatus: item[0].RevenueDetail[0].RevenueStatus
            });
            debugger
            // this.setInvestTeam(item.InvestigationTeam);
            // this.investigateDetail = item.InvestigationDetail;

        }, (err: HttpErrorResponse) => {
            alert(err.message);
        });
    }

    private onCreate() {
        if (this.revenueForm.valid) {
            this.incomeService.InsAll(this.revenueForm.value).subscribe(p => {
                this.onComplete();
            }, (err: HttpErrorResponse) => {
                alert(Message.saveFail);
            });
        }
    }

    private onReviced() {
        debugger
        if (this.revenueForm.valid) {
            this.incomeService.updByCon(this.revenueForm.value).subscribe(p => {
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

    private onDelete() {
        // if (confirm(Message.confirmAction)) {
        //     this.invesService.updDelete(this.investCode).subscribe(result => {
        //         // tslint:disable-next-line:triple-equals
        //         if (result.IsSuccess == 'True') {
        //             alert(Message.saveComplete);
        //         // tslint:disable-next-line:triple-equals
        //         } else if (result.IsSuccess == 'False') {
        //             alert(Message.saveError);
        //         }
        //     }, (err: HttpErrorResponse) => {
        //         alert(err.message);
        //     })
        // }
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    // onAutoChange(value: string) {
    //     if (value == '') {
    //       this.options = [];
    //     } else {
    //       this.options = this.rawOptions.filter(f => f.name.toLowerCase().indexOf(value.toLowerCase()) > -1);
    //     }
    //   }

}
