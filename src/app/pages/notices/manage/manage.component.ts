import { Component, OnInit, OnDestroy, Input, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { NoticeInformer } from '../notice-informer';
import { NoticeStaff } from '../notice-staff';

@Component({
    selector: 'app-manage',
    templateUrl: './manage.component.html'
})
export class ManageComponent implements OnInit, OnDestroy {

    private sub: any;
    mode: string;
    modal: any;

    noticeForm: FormGroup;

    showEditField: any;

    constructor(
        private activeRoute: ActivatedRoute,
        private suspectModalService: NgbModal,
        private fb: FormBuilder,
        private navService: NavigationService
    ) {
        // set false
        this.navService.setNewButton(false);
        this.navService.setSearchBar(false);
        // set true
        this.navService.setNextPageButton(true);
    }

    ngOnInit() {
        this.active_route();

        this.navigate_service();

        this.createForm();

        this.setNoticeinFormer(new Array<NoticeInformer>());

        this.setNoticestaff(new Array<NoticeStaff>());
    }

    private active_route() {
        this.sub = this.activeRoute.params.subscribe(p => {
            this.mode = p['mode'];
            if (p['mode'] === 'C') {
                // set false
                this.navService.setEditButton(false);
                this.navService.setDeleteButton(false);
                this.navService.setEditField(false);
                // set true
                this.navService.setSaveButton(true);
                this.navService.setCancelButton(true);

            } else if (p['mode'] === 'R') {
                // set false
                this.navService.setSaveButton(false);
                this.navService.setCancelButton(false);
                // set true
                this.navService.setPrintButton(true);
                this.navService.setEditButton(true);
                this.navService.setDeleteButton(true);
                this.navService.setEditField(true);
            }
        });
    }

    private navigate_service() {
        this.navService.showFieldEdit.subscribe(p => {
            this.showEditField = p;
        });

        this.navService.onSave.subscribe(status => {
            if (status) {
                // set true
                this.navService.setEditField(true);
                this.navService.setEditButton(true);
                this.navService.setPrintButton(true);
                this.navService.setDeleteButton(true);
                // set false
                this.navService.setSaveButton(false);
                this.navService.setCancelButton(false);
            }
        });
    }

    private createForm() {
        this.noticeForm = this.fb.group({
            NoticeCode: new FormControl(''),
            NoticeStationCode: new FormControl(''),
            NoticeStation: new FormControl(''),
            NoticeDate: new FormControl(''),
            NoticeTime: new FormControl(''),
            NoticeDue: new FormControl(''),
            NoticeDueDate: new FormControl(''),
            GroupNameDesc: new FormControl(''),
            CommunicationChannelID: new FormControl(''),
            ArrestCode: new FormControl(''),
            StaffFullName: new FormControl(''),
            IsActive: new FormControl(''),
            Noticestaff: this.fb.array([]),
            Noticeinformer: this.fb.array([]),
            Noticelocale: this.fb.array([]),
            NoticeProduct: this.fb.array([]),
            NoticeSuspect: this.fb.array([])
        })
    }

    get Noticestaff(): FormArray {
        return this.noticeForm.get('Noticestaff') as FormArray;
    }

    setNoticestaff(staff: NoticeStaff[]) {
        if (staff) {
            // informer.map(item => item.FullName = `${item.TitleName} ${item.FirstName} ${item.LastName}`);
            const itemFGs = staff.map(item => this.fb.group(item));
            const itemFormArray = this.fb.array(itemFGs);
            this.noticeForm.setControl('Noticestaff', itemFormArray);
        }
    }

    get Noticeinformer(): FormArray {
        return this.noticeForm.get('Noticeinformer') as FormArray;
    }

    setNoticeinFormer(informer: NoticeInformer[]) {
        if (informer) {
            // informer.map(item => item.FullName = `${item.TitleName} ${item.FirstName} ${item.LastName}`);
            const itemFGs = informer.map(item => this.fb.group(item));
            const itemFormArray = this.fb.array(itemFGs);
            this.noticeForm.setControl('Noticeinformer', itemFormArray);
        }
    }

    get Noticelocale(): FormArray {
        return this.noticeForm.get('Noticelocale') as FormArray;
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    openSuspect(e) {
        this.modal = this.suspectModalService.open(e, { size: 'lg', centered: true });
    }

}
