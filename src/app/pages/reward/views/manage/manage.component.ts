import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManageConfig } from './manage.config';
import { NavigationService } from 'app/shared/header-navigation/navigation.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent extends ManageConfig implements OnInit {

  constructor(
    private navService: NavigationService,
    private activatedRoute: ActivatedRoute
  ) {
    super();
    this.activatedRoute.params.subscribe(param => {
      this.IndictmentID = param['IndictmentID'];
      this.ArrestCode = param['ArrestCode'];
    });
  }

  ngOnInit() {
    this.setShowButton();
  }
  private setShowButton() {
    this.navService.setSearchBar(false);
    this.navService.setPrintButton(false);
    this.navService.setDeleteButton(false);
    this.navService.setCancelButton(false);
    this.navService.setEditButton(false);
    this.navService.setSaveButton(false);
  }
}
