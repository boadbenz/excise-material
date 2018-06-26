import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { ArrestList } from './arrest-list';
import { ArrestsService } from '../arrests.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent implements OnInit {

  dataTable: any;
  advSearch: any;

  arrestList = new Array<ArrestList>();

  constructor(
    private navservice: NavigationService,
    private arrestService: ArrestsService
  ) {
    // set false
    this.navservice.setEditButton(false);
    this.navservice.setDeleteButton(false);
    this.navservice.setPrintButton(false);
    this.navservice.setSaveButton(false);
    this.navservice.setCancelButton(false);
    this.navservice.setNextPageButton(false);
    // set true
    this.navservice.setSearchBar(true);
    this.navservice.setNewButton(true);
    this.advSearch = this.navservice.showAdvSearch;

  }

  ngOnInit() {
    this.arrestList = this.arrestService.getList;
  }

  onDetactTable() {
    // const table: any = $('table');

    // if ($.fn.dataTable.isDataTable('table')) {

    //   this.dataTable = table.DataTable();
    //   this.dataTable.destroy();
    // }

    // this._chRef.detectChanges();

    // this.dataTable = table.DataTable(dataTableOptions);

  }

}
