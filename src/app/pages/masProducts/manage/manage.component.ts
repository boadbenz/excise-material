import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ManageComponent implements OnInit {

  private sub: any;
  mode: string;
  constructor(private activeRoute: ActivatedRoute,
    private navService: NavigationService, ) { }

  ngOnInit() {
    this.active_route();
  }

  private active_route() {
    this.sub = this.activeRoute.params.subscribe(p => {
      this.mode = p['mode'];
      console.log('active route mode ; ',this.mode)
      //alert(this.mode);
      if (p['mode'] === 'C') {
        console.log('in mode C')
        // set false
        this.navService.setPrintButton(false);
        this.navService.setEditButton(false);
        this.navService.setDeleteButton(false);
        this.navService.setEditField(false);
        this.navService.setOnNextPage(false);
        this.navService.setNewButton(false);
        // set true
        this.navService.setSaveButton(true);
        this.navService.setCancelButton(true);
      } else if (p['mode'] === 'R') {
        console.log('in mode R')
        // set false
        this.navService.setSaveButton(false);
        this.navService.setCancelButton(false);
        this.navService.setNewButton(false);
        // set true
        this.navService.setPrintButton(true);
        this.navService.setEditButton(true);
        this.navService.setDeleteButton(true);
        this.navService.setEditField(true);
      }
    })
  }

}
