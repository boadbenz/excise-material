import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { NavigationService } from 'app/shared/header-navigation/navigation.service';
import { pagination } from '../../../../config/pagination';
import { Router } from '@angular/router';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Message } from '../../../../config/message';
import { Subject } from 'rxjs';
import { RoleListService } from './list.service';
import swal from 'sweetalert2'
import * as uacDataModel from '../../uac-user-datamodel';

@Component({
  selector: 'app-role-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class RoleListComponent {
  @ViewChild('advForm') advForm: NgForm;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  paginage = pagination;
  advSearch: any;
  roleList = new Array<uacDataModel.RoleListItem>();
  roles = new Array<uacDataModel.RoleListItem>();

  constructor(private router: Router,
    private navService: NavigationService,
    private roleListService: RoleListService) {
    // set button false
    this.navService.setEditButton(false);
    this.navService.setDeleteButton(false);
    this.navService.setPrintButton(false);
    this.navService.setSaveButton(false);
    this.navService.setCancelButton(false);
    this.navService.setNextPageButton(false);
    this.navService.setNewButton(false);
    // set button true
    this.navService.setSearchBar(true);
    this.advSearch = this.navService.showAdvSearch;

    this.navService.searchByKeyword
      .takeUntil(this.destroy$)
      .subscribe(async Textsearch => {
        console.log('Textsearch-> ', Textsearch);

        if (Textsearch) {
          await this.navService.setOnSearch('');
          this.onSearch(Textsearch);
        }
      })
  }

  onSearch(Textsearch: any) {
    let request: uacDataModel.RoleListgetByKeywordRequest = new uacDataModel.RoleListgetByKeywordRequest();
    request.TextSearch = Textsearch.Textsearch == null ? "" : Textsearch.Textsearch;
    this.roleListService.loadRoleListgetByKeyword(request).then(result => {
      console.log('onSearch()->');
      if (!this.roleListService.RoleList.length) {
        swal('', Message.noRecord, 'warning');
        this.paginage.TotalItems = 0;
      } else {      
        //this.roleList = this.roleListService.RoleList;
        //console.log('onSearch(roleListService.RoleList)-> ', this.roleList.length);
        this.roles = this.roleListService.RoleList;
        this.roleList= this.roles.slice(0, 5);
        //console.log('onSearch.roleList.slice(0, 5)-> ', this.roles.length);
        // set total record                           
        this.paginage.TotalItems = this.roles.length;
      }
    }).catch(error => {
      swal('', error, 'error');
    });
  }

  async pageChanges(event: any) {
    this.roleList = await this.roles.slice(event.startIndex - 1, event.endIndex);
  }

  clickManage(role: uacDataModel.RoleListItem) {
    localStorage.setItem('roleID', role.roleID.toString());
    this.router.navigate([`/uac/role/manage`]);
  }

  async onAdvSearch(form: any) {
    let request: uacDataModel.RoleListgetByConAdvRequest = new uacDataModel.RoleListgetByConAdvRequest()
    request.RoleCode = form.RoleCode;
    request.RoleName = form.RoleName;

    console.log(JSON.stringify(request));
    this.roleListService.loadRoleListgetByConAdv(request).then(result => {
      if (result == "OK") {
        if (!this.roleListService.RoleList.length) {
          swal('', Message.noRecord, 'warning');
          this.paginage.TotalItems = 0;
        } else {
          this.roleList = this.roleListService.RoleList;
          this.roles = this.roleList;
          this.roles.slice(0, 5);
          // set total record                           
          this.paginage.TotalItems = this.roleList.length;
        }
      }
    }).catch(error => {
      alert(error);
    });
  }

  ngOnDestroy() {
    this.paginage.TotalItems = 0;
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.advSearch.next(false);
  }
}