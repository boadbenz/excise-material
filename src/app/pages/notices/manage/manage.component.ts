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

<<<<<<< HEAD
    setNoticeinFormer(informer: NoticeInformer[]) {
        if (informer) {
            // informer.map(item => item.FullName = `${item.TitleName} ${item.FirstName} ${item.LastName}`);
            const itemFGs = informer.map(item => this.fb.group(item));
            const itemFormArray = this.fb.array(itemFGs);
            this.noticeForm.setControl('Noticeinformer', itemFormArray);
=======
    addProduct() {
        let product = new NoticeProduct();
        product.IsNewItem = true;
        this.NoticeProductForm.push(this.fb.group(product));
    }

    // addSuspect(){
    //     let suspect = new NoticeSuspect();
    //     suspect.IsNewItem = true;
    //     this.NoticeSuspectForm.push(this.fb.group(suspect));
    // }

    addDocument() {
        let document = new NoticeDocument();
        document.IsNewItem = true;
        this.NoticeDocumentForm.push(this.fb.group(document));
    }

    public objInformmerRegion: any;
    public objLocaleRegion: any;
    searchRegion = (text3$: Observable<string>) =>
        text3$
            .debounceTime(300)
            .map(term => term === '' ? []
                : this.regionModel
                    .filter(v =>
                        v.SubDistrict.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                        v.District.toLowerCase().indexOf(term.toLowerCase()) > -1 ||
                        v.Province.toLowerCase().indexOf(term.toLowerCase()) > -1
                    ).slice(0, 10));

    formatterRegion = (x: { SubDistrict: string, District: string, Province: string }) => `${x.SubDistrict} ${x.District} ${x.Province}`;

    // public objProduct: any;
    // searchProduct = (text$: Observable<string>) => {
    //     text$
    //         .debounceTime(200)
    //         .distinctUntilChanged()
    //         .map(term =>
    //             this.productModel
    //                 .map(item => `${item.BrandNameTH} ${item.SubBrandNameTH} ${item.ModelName}`)
    //                 .filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
    //         );
    // }


    onInformmerRegionChange(ele: any) {
        const subDistinct = (ele.target.value).split(' ')[0];
        const r = this.regionModel.filter(item => item.SubDistrict == subDistinct)
        // .map(item => {
        //     this.NoticeInformerForm.at(0).patchValue({
        //         SubDistrictCode: item.SubDistrictCode,
        //         SubDistrict: item.SubDistrict,
        //         DistrictCode: item.DistrictCode,
        //         District: item.District,
        //         ProvinceCode: item.ProvinceCode,
        //         Province: item.Province,
        //         ZipCode: item.ZipCode
        //     });
        // });

        console.log(r);
    }

    onLocaleRegionChange() {

    }

    onProductChange() {

    }

    onDeleteProduct(id: string, index: number) {
        if (this.mode === 'C') {
            this.NoticeProductForm.removeAt(index);

        } else if (this.mode === 'R') {
            if (!this.NoticeProductForm.at(index).get('ProductID').value) {
                this.NoticeProductForm.removeAt(index);
                return false;
            }

            if (confirm(Message.confirmAction)) {
                this.noticeService.productupdDelete(id).then(isSuccess => {
                    if (isSuccess == true) {
                        this.NoticeProductForm.removeAt(index);
                    } else {
                        alert(Message.saveError);
                    }
                })
            }
        }
    }

    onDeleteSuspect(id: string, index: number) {
        if (this.mode === 'C') {
            this.NoticeSuspectForm.removeAt(index);

        } else if (this.mode === 'R') {
            if (!this.NoticeSuspectForm.at(index).get('SuspectID').value) {
                this.NoticeSuspectForm.removeAt(index);
                return false;
            }

            if (confirm(Message.confirmAction)) {
                this.noticeService.suspectupdDelete(id).then(isSuccess => {
                    if (isSuccess == true) {
                        this.NoticeSuspectForm.removeAt(index);
                    } else {
                        alert(Message.saveError);
                    }
                })
            }
>>>>>>> parent of 72cc74f... commit
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
