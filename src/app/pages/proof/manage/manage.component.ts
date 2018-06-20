import { Component, OnInit, OnDestroy, Input, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationComponent } from '../../../shared/header-navigation/navigation.component';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html'
})
export class ManageComponent implements OnInit, OnDestroy {

  private sub: any;

  @Input() navigation: NavigationComponent;

  constructor(
    private activeRoute: ActivatedRoute
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
}
