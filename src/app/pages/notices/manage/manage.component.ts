import { Component, OnInit, OnDestroy, Input, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationComponent } from '../../../shared/header-navigation/navigation.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SuspectModalComponent } from '../../component/suspect-modal/suspect-modal.component';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html'
})
export class ManageComponent implements OnInit, OnDestroy {

  private sub: any;
  mode: string;
  modal: any;

  // ----- Model ------ //
  // @Input() suspectComponent: SuspectModalComponent;

  @Input() navigation: NavigationComponent;

  constructor(
    private activeRoute: ActivatedRoute,
    private suspectModalService: NgbModal
  ) {

  }

  ngOnInit() {
    this.sub = this.activeRoute.params.subscribe(p => {
      this.mode = p['mode'];
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  openSuspect(e) {
   this.modal = this.suspectModalService.open(e, { size: 'lg', centered: true });
  }

}
