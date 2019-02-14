import { Component, OnInit, OnDestroy, ElementRef, ChangeDetectorRef, ViewEncapsulation, ViewChild } from '@angular/core';
import { NavigationService } from 'app/shared/header-navigation/navigation.service';
import { pagination } from '../../../../config/pagination';
import { Router } from '@angular/router';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Message } from '../../../../config/message';
import { Subject } from 'rxjs';
import swal from 'sweetalert2'
import { UserListService } from './list.service';
import * as uacDataModel from '../../uac-user-datamodel';

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})

export class UserListComponent implements OnInit, OnDestroy {
  @ViewChild('advForm') advForm: NgForm;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  paginage = pagination;
  advSearch: any;
  userAccountList = new Array<uacDataModel.UserAccountListItem>();
  userAccounts = new Array<uacDataModel.UserAccountListItem>();

  constructor(private router: Router,
    private navService: NavigationService,
    private userListService: UserListService) {
  }

  async ngOnInit() {
    // set button false
    await this.navService.setEditButton(false);
    await this.navService.setDeleteButton(false);
    await this.navService.setPrintButton(false);
    await this.navService.setSaveButton(false);
    await this.navService.setCancelButton(false);
    await this.navService.setNextPageButton(false);
    await this.navService.setNewButton(false);
    // set button true
    await this.navService.setSearchBar(true);
    await this.navService.searchByKeyword.getValue

    this.advSearch = this.navService.showAdvSearch;

    this.navService.searchByKeyword
      .takeUntil(this.destroy$)
      .subscribe(async Textsearch => {
        if (Textsearch) {
          await this.navService.setOnSearch('');
          this.onSearch(Textsearch);
        }
      })
  }

  onSearch(Textsearch: any) {
    let request: uacDataModel.UserAccountListgetByKeywordRequest = new uacDataModel.UserAccountListgetByKeywordRequest();
    request.TextSearch = Textsearch.Textsearch == null ? "" : Textsearch.Textsearch;
    this.userListService.loadUserAccountListgetByKeyword(request).then(result => {
      if (!this.userListService.UserAccountList.length) {
        swal('', Message.noRecord, 'warning');
        this.paginage.TotalItems = 0;
      } else {
        this.userAccounts = this.userListService.UserAccountList;
        this.userAccountList = this.userAccounts.slice(0, 5);
        // set total record                           
        this.paginage.TotalItems = this.userAccounts.length;
      }
    }).catch(error => {
      swal('', error, 'error');
    });
  }

  async pageChanges(event: any) {
    this.userAccountList = await this.userAccounts.slice(event.startIndex - 1, event.endIndex);
  }

  clickManage(userAccount: uacDataModel.UserAccountListItem) {
    if (userAccount.roleID == null) {
      swal('', 'กรุณาติดต่อผู้ดูแลระบบเพื่อกำหนดบทบาท การเข้าใช้งานระบบ !', 'warning');
      return;
    }
    localStorage.setItem('userAccountID', userAccount.userAccountID.toString());
    this.router.navigate([`/uac/useraccount/manage`]);
  }

  async onAdvSearch(form: any) {
    let request: uacDataModel.UserAccountListgetByConAdvRequest = new uacDataModel.UserAccountListgetByConAdvRequest()

    request.StaffName = form.StaffName;
    request.OfficeName = form.OfficeName;
    request.OperationPosName = form.PositionName;
    //console.log(JSON.stringify(request));
    this.userListService.loadUserAccountListgetByConAdv(request).then(result => {
      if (result == "OK") {
        if (!this.userListService.UserAccountList.length) {
          swal('', Message.noRecord, 'warning');
          this.paginage.TotalItems = 0;
        } else {
          this.userAccounts = this.userListService.UserAccountList;
          this.userAccountList = this.userAccounts.slice(0, 5);
          // set total record                           
          this.paginage.TotalItems = this.userAccounts.length;
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