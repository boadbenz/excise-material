import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { InvestigateService } from '../investigate.service';
import { HttpErrorResponse } from '@angular/common/http';
import { InvestigateList } from '../investigate-list';

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html',
    styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit, OnDestroy {

    private sub: any;

    showEditField: any;

    investigate = new InvestigateList();

    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private navService: NavigationService,
        private invesService: InvestigateService
    ) {
        // set false
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);
        this.navService.setNextPageButton(false);
    }

    ngOnInit() {
        this.sub = this.activeRoute.params.subscribe(p => {
            if (p['mode'] === 'C' || p['mode'] === 'U') {
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
                this.onLoadInvestigate(p['code']);
            }
        });
        this.sub = this.navService.showFieldEdit.subscribe(p => {
            this.showEditField = p;
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

    private onLoadInvestigate(Textsearch: any) {
        this.sub = this.invesService.getByInvestigateCode(Textsearch)
            .subscribe(item => {
                this.investigate = item;
                console.log(this.investigate);

            }, (err: HttpErrorResponse) => {
                alert(err.message);
            });
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
        // set action save = false
        this.navService.setOnSave(false);
    }

    private onEdit() {
        // this.router.navigate(['/investigation/detail-manage', 'u', 'xxx-xxx']);
        // set action edit = false
        // this.navService.setOnEdit(false);
    }

    onDeleteStaff(StaffId: number) {

    }

    onViewInvesDetail(invesCode: string) {
        this.router.navigate([`/investigation/detail-manage/R/${invesCode}`]);
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

}
