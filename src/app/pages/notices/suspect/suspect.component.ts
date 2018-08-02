import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { NavigationService } from 'app/shared/header-navigation/navigation.service';
import { PreloaderService } from 'app/shared/preloader/preloader.component';

@Component({
  selector: 'app-suspect',
  templateUrl: './suspect.component.html',
  styleUrls: ['./suspect.component.scss']
})
export class SuspectComponent implements OnInit, OnDestroy {

  private subActivedRoute: any;
  private mode: any;
  modal: any;
  showEditField: any;

  constructor(
    private ngModalService: NgbModal,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private preloader: PreloaderService,
    private navService: NavigationService
  ) { }

  ngOnInit() {
    this.preloader.setShowPreloader(true);
    this.active_route();

    this.navigate_service();

    this.createForm();
    this.preloader.setShowPreloader(false);
  }

  ngOnDestroy(): void {
    this.subActivedRoute.unsubscribe();
  }

  private active_route() {
    this.subActivedRoute = this.activatedRoute.params.subscribe(p => {
      this.mode = p['mode'];
      if (p['mode'] === 'C') {
        // set false
        this.navService.setEditButton(false);
        this.navService.setDeleteButton(false);
        this.navService.setEditField(false);
        this.navService.setNextPageButton(false);
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
        this.navService.setNextPageButton(true);

        if (p['code']) {
          // this.noticeCode = p['code'];
          // this.getByCon(p['code']);
        }
      }
    });
  }

  private navigate_service() {

  }

  private createForm() {

  }

}
