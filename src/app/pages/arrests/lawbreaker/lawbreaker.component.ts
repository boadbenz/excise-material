import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';

@Component({
    selector: 'app-lawbreaker',
    templateUrl: './lawbreaker.component.html',
    styleUrls: ['./lawbreaker.component.scss']
})
export class LawbreakerComponent implements OnInit {

    modal: any;
    private mode: any;
    private sub: any;
    showEditField: any;

    constructor(
        private ngModalService: NgbModal,
        private activatedRoute: ActivatedRoute,
        private navService: NavigationService
    ) {         
        this.navService.setNextPageButton(false);
        this.navService.setDeleteButton(false);
        this.navService.setPrintButton(false);
    }

    ngOnInit() {
        this.sub = this.activatedRoute.params.subscribe(p => {
            this.mode = p['mode'];
            if (p['mode'] == 'c' || p['mode'] == 'u') {
                // set false
                this.navService.setEditButton(false);
                this.navService.setEditField(false);
                // set true
                this.navService.setSaveButton(true);
                this.navService.setCancelButton(true);

            } else if (p['mode'] == 'v') {
                // set false
                this.navService.setSaveButton(false);
                this.navService.setCancelButton(false);
                // set true
                this.navService.setEditButton(true);
                this.navService.setEditField(true);

            } else {
                // set false
                this.navService.setSaveButton(false);
                this.navService.setCancelButton(false);
                this.navService.setEditButton(false);
                // set true
                this.navService.setEditField(true);
            }
        });

        this.navService.showFieldEdit.subscribe(p => {
            this.showEditField = p;            
        });
    }

    openOffenseDetailModal(e: any) {
        this.modal = this.ngModalService.open(e, { size: 'lg', centered: true });
    }
}
