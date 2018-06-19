import { Component, OnInit, OnDestroy, Input, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationComponent } from '../../../shared/header-navigation/navigation.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html'
})
export class ManageComponent implements OnInit, OnDestroy {

  private sub: any;

  @Input() navigation: NavigationComponent;

  constructor(
    private activeRoute: ActivatedRoute,
    private suspectModalService: NgbModal
  ) {

  }

  ngOnInit() {
    this.sub = this.activeRoute.params.subscribe(p => {
      // console.log(p['mode']);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  openSuspect(e) {
    this.suspectModalService.open(e, { size: 'lg', centered: true });
  }
}
