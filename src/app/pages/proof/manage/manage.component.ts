import { Component, OnInit, OnDestroy, Input, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationComponent } from '../../../shared/header-navigation/navigation.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
})
export class ManageComponent implements OnInit, OnDestroy {

  private sub: any;

  @Input() navigation: NavigationComponent;

  constructor(
    private activeRoute: ActivatedRoute,
    private modalService: NgbModal
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

  openWindowCustomClass(content) {
    this.modalService.open(content, { 
      size: 'lg'
    });
  }
}
