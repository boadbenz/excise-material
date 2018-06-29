import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit {
  viewMode: any;
  sub: any;
  private getmode: any;

  constructor(private router: Router, private navService: NavigationService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {

    this.sub = this.navService.showFieldEdit.subscribe(status => {
      this.viewMode = status;
      if (!this.viewMode) {
        this.navService.setCancelButton(true);
        this.navService.setSaveButton(true);
        this.navService.setPrintButton(false);
        this.navService.setSearchBar(false);
        this.navService.setDeleteButton(false);
        this.navService.setEditButton(false);

      } else {
        this.navService.setPrintButton(true);
        this.navService.setDeleteButton(true);
        this.navService.setEditButton(true);
        this.navService.setSearchBar(false);
        this.navService.setCancelButton(false);
        this.navService.setSaveButton(false);
      }
    });

    this.getmode = this.activeRoute.params
      .subscribe(params => {
        // params.code
        console.log(params);
      });

  }

}
