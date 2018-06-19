import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html'
})
export class ManageComponent implements OnInit, OnDestroy {

  private sub: any;

  constructor(
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.sub = this.activeRoute.params.subscribe(p => {
      // console.log(p['mode']);
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
