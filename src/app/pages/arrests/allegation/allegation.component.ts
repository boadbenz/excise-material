import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NavigationService } from 'app/shared/header-navigation/navigation.service';

@Component({
  selector: 'app-allegation',
  templateUrl: './allegation.component.html',
  styleUrls: ['./allegation.component.scss']
})
export class AllegationComponent implements OnInit, OnDestroy {

  constructor(
    private modelService: NgbModal,
    private activeRoute: ActivatedRoute,
    private navService: NavigationService
  ) {
    this.navService.setPrintButton(false);
  }

  sub: Subscription;
  onSaveSub: Subscription;
  onDeleSub: Subscription;
  onEditSub: Subscription;

  card1: boolean = true;
  card2: boolean = true;

  mode: string;
  modal: any;
  showEditField: boolean;

  ngOnInit() {
    this.navService.showFieldEdit.subscribe(p => this.showEditField = p.valueOf())
    this.sub = this.activeRoute.params.subscribe(p => {
      this.mode = p['mode']
      if (p['mode'] == 'C') {
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
        this.navService.setEditButton(true);
        this.navService.setDeleteButton(true);
        this.navService.setEditField(true);
      }
    })
    this.onSaveSub = this.navService.onSave.subscribe(status => {
      if (status) {
        this.navService.setOnSave(false);
      }
    });
    this.onEditSub = this.navService.onEdit.subscribe(status => {
      if (status) {
        this.navService.setOnEdit(false);
      }
    })
    this.onDeleSub = this.navService.onDelete.subscribe(status => {
      if (status) {
        this.navService.setOnDelete(false);
      }
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.onSaveSub.unsubscribe();
    this.onEditSub.unsubscribe();
    this.onDeleSub.unsubscribe();
  }

  openModal(e) {
    this.modal = this.modelService.open(e, { size: 'lg', centered: true });
  }



}
