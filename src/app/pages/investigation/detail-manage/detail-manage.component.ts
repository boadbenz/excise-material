import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';

@Component({
    selector: 'app-investigate-detail-manage',
    templateUrl: './detail-manage.component.html',
    styleUrls: ['./detail-manage.component.scss']
})
export class DetailManageComponent implements OnInit, OnDestroy {

    modal: any;
    showEditField: any;
    mode: string;
    private sub: any;

    constructor(
        private activeRoute: ActivatedRoute,
        private ngModal: NgbModal,
        private navService: NavigationService
    ) {
        // set false
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);
        this.navService.setNextPageButton(false);
    }

    ngOnInit() {
        this.sub = this.activeRoute.params.subscribe(p => {
            // this.mode = p['mode'];

            if (p['mode'] === 'c' || p['mode'] === 'u') {
                // set false
                this.navService.setPrintButton(false);
                this.navService.setEditButton(false);
                this.navService.setDeleteButton(false);
                this.navService.setEditField(false);
                // set true
                this.navService.setSaveButton(true);
                this.navService.setCancelButton(true);

            } else if (p['mode'] === 'v') {
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
