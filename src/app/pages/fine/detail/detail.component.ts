import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  viewMode:boolean =true;
  // advSearch: any;


  constructor(
    private router: Router,
    private navservice: NavigationService
) {
//  true
    this.navservice.setNextPageButton(true);

// false
    this.navservice.setEditButton(false);
    this.navservice.setDeleteButton(false);
    this.navservice.setPrintButton(false);
    this.navservice.setSaveButton(false);
    this.navservice.setCancelButton(false);
    this.navservice.setSearchBar(false);
    this.navservice.setNewButton(false);
    // this.advSearch = this.navservice.showAdvSearch;

}
  ngOnInit() {
  }

}
