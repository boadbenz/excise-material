import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationService } from 'app/shared/header-navigation/navigation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  // encapsulation: ViewEncapsulation.Emulated
})
export class ListComponent implements OnInit {

  constructor(private router: Router,
    private navService: NavigationService, ) {
    // set button false
    this.navService.setEditButton(false);
    this.navService.setDeleteButton(false);
    this.navService.setPrintButton(false);
    this.navService.setSaveButton(false);
    this.navService.setCancelButton(false);
    this.navService.setNextPageButton(false);
    this.navService.setNewButton(false);
    // set button true
    this.navService.setSearchBar(false);

    // this.advSearch = this.navService.showAdvSearch;
  }

  ngOnInit() {
  }

  onClick() {
    this.router.navigate([`/report/manage`]);
  }

}
