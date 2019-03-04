import { Component, OnInit, HostListener, Input, ElementRef, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NavigationService } from './navigation.service';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import { async } from '@angular/core/testing';

// declare var jQuery: any;

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'ma-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']

})
export class NavigationComponent implements OnInit, OnDestroy {

    newButton: any;
    printButton: any;
    editButton: any;
    deleteButton: any;
    cancelButton: any;
    saveButton: any;
    searchBar: any;
    nextPageButton: any;
    prevPageButton: any;
    sendInComeButton: any;

    nextPage: any = '';
    nextPageTitle: any;
    prevPageTitle: any;

    permisCheck: any
    perBeforReturn: any

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private navService: NavigationService
    ) {
        this.newButton = this.navService.showNewButton;
        this.printButton = this.navService.showPrintButton;
        this.editButton = this.navService.showEditButton;
        this.deleteButton = this.navService.showDeleteButton;
        this.cancelButton = this.navService.showCancelButton;
        this.saveButton = this.navService.showSaveButton;
        this.searchBar = this.navService.showSearchBar;
        this.nextPageButton = this.navService.showNextPageButton;
        this.nextPageTitle = this.navService.innerTextNextPageButton;
        this.sendInComeButton = this.navService.showSendIncomeButton;

        this.prevPageButton = this.navService.showPrevPageButton;
        this.prevPageTitle = this.navService.innerTextPrevPageButton;
    }

    ngOnInit() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }

            const scrollToTop = window.setInterval(function () {
                const pos = window.pageYOffset;
                if (pos > 0) {
                    window.scrollTo(0, pos - 20); // how far to scroll on each step
                } else {
                    window.clearInterval(scrollToTop);
                }
            }, 16); // how fast to scroll (this equals roughly 60 fps)
        });
    }

    ngOnDestroy(): void {
    }

    clickAdvSearch() {
        this.navService.setAdvSearch();
    }

    clickSearch(formSearch: NgForm) {
        this.navService.setOnSearch(formSearch.value);
        formSearch.reset();
    }

    async clickNew() {
        // console.log('clickNew')
        var pmCheck = this.permissionCheck('IsCreate')
        if (await pmCheck != 1) {
            // console.log('++++ clickNew IsCreate != 1 : ', pmCheck)
            swal('', 'ผู้ใช้งานไม่มีสิทธิ์สร้างข้อมูล กรุณาติดต่อผู้ดูแลระบบ', 'warning');
        } else if (await pmCheck == 1) {
            // console.log('++++ clickNew IsCreate == 1 : ', pmCheck)
            this.navService.setOnNextPage(true);
        }
        // this.navService.setOnNextPage(true);
    }

    async clickNextPage() {
        this.navService.setOnNextPage(true);
    }

    clickPrevPage() {
        this.navService.setOnPrevPage(true);
    }

    clickPrint() {
        this.navService.setOnPrint(true);
    }

    async clickEdit() {
        var pmCheck = this.permissionCheck('IsUpdate')
        if (await pmCheck != 1) {
            // console.log('clickEdit IsUpdate != 1 : ', pmCheck)
            swal('', 'ผู้ใช้งานไม่มีสิทธิ์แก้ไขข้อมูล กรุณาติดต่อผู้ดูแลระบบ', 'warning');
        } else if (await pmCheck == 1) {
            // console.log('clickEdit IsUpdate == 1 : ', pmCheck)
            this.navService.setEditField(false);
            this.navService.setEditButton(false);
            this.navService.setPrintButton(false);
            this.navService.setDeleteButton(false);
            this.navService.setSaveButton(true);
            this.navService.setCancelButton(true);
            this.navService.setOnEdit(true);
        }
        // // set false
        // this.navService.setEditField(false);
        // this.navService.setEditButton(false);
        // this.navService.setPrintButton(false);
        // this.navService.setDeleteButton(false);
        // // set true
        // this.navService.setSaveButton(true);
        // this.navService.setCancelButton(true);
        // // set event click edit
        // this.navService.setOnEdit(true);
    }

    clickCancel() {
        // // set true
        // this.navService.setEditField(true);
        // this.navService.setEditButton(true);
        // this.navService.setPrintButton(true);
        // this.navService.setDeleteButton(true);
        // // set false
        // this.navService.setSaveButton(false);
        // this.navService.setCancelButton(false);
        // set event click cancel
        this.navService.setOnCancel(true);
    }

    async clickSave() {
        var pmCheck = this.permissionCheck('IsUpdate')
        if (await pmCheck != 1) {
            // console.log('clickSave IsUpdate != 1 : ', pmCheck)
            swal('', 'ผู้ใช้งานไม่มีสิทธิ์บันทึก กรุณาติดต่อผู้ดูแลระบบ', 'warning');
        } else if (await pmCheck == 1) {
            // console.log('clickSave IsUpdate == 1 : ', pmCheck)
            this.navService.setOnSave(true);
        }
        // set event click save
        // this.navService.setOnSave(true);
    }

    async clickDelete() {
        // this.navService.setOnDelete(true);

        var pmCheck = this.permissionCheck('IsDelete')
        if (await pmCheck != 1) {
            // console.log('clickDelete IsDelete != 1 : ', pmCheck)
            swal('', 'ผู้ใช้งานไม่มีสิทธิ์ลบข้อมูล กรุณาติดต่อผู้ดูแลระบบ', 'warning');
        } else if (await pmCheck == 1) {
            // console.log('clickDelete IsDelete == 1 : ', pmCheck)
            this.navService.setOnDelete(true);
        }
    }

    clickSendIncome() {
        this.navService.setOnSendIncome(true);
    }

    async permissionCheck(subscribe) {
        var userAccountID = localStorage.getItem('UserAccountID')
        var programCode = localStorage.getItem('programcode')
        const params = {
            UserAccountID: userAccountID,
            ProgramCode: programCode
        };
        await this.navService.PermissionCheck(params).then(Res => {
            this.permisCheck = Res;
            console.log('subscribe : ', subscribe)
            console.log('params : ', params)
            console.log('PermisRes : ', this.permisCheck)
            if (subscribe == 'IsCreate') {
                this.perBeforReturn = !this.permisCheck ? this.permisCheck = { "IsCreate": 0 } : this.permisCheck.IsCreate;
                // this.perBeforReturn = this.permisCheck.IsCreate;
            } else if (subscribe == 'IsDelete') {
                this.perBeforReturn = !this.permisCheck ? this.permisCheck = { "IsDelete": 0 } : this.permisCheck.IsDelete;
            } else if (subscribe == 'IsRead') {
                this.perBeforReturn = !this.permisCheck ? this.permisCheck = { "IsRead": 0 } : this.permisCheck.IsRead;
            } else if (subscribe == 'IsUpdate') {
                this.perBeforReturn = !this.permisCheck ? this.permisCheck = { "IsUpdate": 0 } : this.permisCheck.IsUpdate;
            }

        }, (error) => { console.error('error : ', error); });

        return this.perBeforReturn
    }

}
