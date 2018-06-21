import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit, OnDestroy {

  private sub: any;
  mode: string;
  modal: any;

  // --------
  showEditField: any;

  constructor(
      private activeRoute: ActivatedRoute,
      private suspectModalService: NgbModal,
      private navService: NavigationService
  ) {
      // set false
      this.navService.setNewButton(false);
      this.navService.setSearchBar(false);
      // set true
      this.navService.setNextPageButton(true);
  }

  ngOnInit() {
      this.sub = this.activeRoute.params.subscribe(p => {
          this.mode = p['mode'];
          if (p['mode'] == 'c' || p['mode'] == 'u') {
              // set false
              this.navService.setEditButton(false);
              this.navService.setDeleteButton(false);
              this.navService.setEditField(false);
              // set true
              this.navService.setSaveButton(true);
              this.navService.setCancelButton(true);

          } else if (p['mode'] == 'v') {
              // set false
              this.navService.setSaveButton(false);
              this.navService.setCancelButton(false);
              // set true
              this.navService.setPrintButton(true);
              this.navService.setEditButton(true);
              this.navService.setDeleteButton(true);
              this.navService.setEditField(true);

          } else {
            // set false
            this.navService.setSaveButton(false);
            this.navService.setCancelButton(false);
            this.navService.setPrintButton(false);
            this.navService.setEditButton(false);
            this.navService.setDeleteButton(false);
            // set true
            this.navService.setEditField(true);
          }
      });
      this.navService.showFieldEdit.subscribe(p => {
          this.showEditField = p;
      });
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

  openModal(e) {
      this.modal = this.suspectModalService.open(e, { size: 'lg', centered: true });
  }

}
