import { MasLawGuitBase } from "../models/mas_law_guitbase";
import { MasLawGroupSection } from "../models/mas_law_group_section";
import { MasOffice } from "../models/mas_office";
import { MasStaff } from "../models/mas_staff";
import { toLocalShort, toTimeShort } from "../../../config/dateFormat";
import { Observable } from 'rxjs/Observable';
import { LawsuitService } from "../lawsuit.service";
import { Lawsuit } from "../models/lawsuit";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { NavigationService } from "../../../shared/header-navigation/navigation.service";
import { Arrest } from "../../arrests/arrest";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder } from "@angular/forms";
import { PreloaderService } from "../../../shared/preloader/preloader.component";
import { SidebarService } from "../../../shared/sidebar/sidebar.component";
import { ArrestsService } from "../../arrests/arrests.service";
import { ProveService } from "../../prove/prove.service";
import { LawsuitStaffFormControl } from '../models/lawsuit_staff';
import { LawsuitDocument, LawsuitDocumentFormControl } from '../models/lawsuit_document';
import { LawsuitArrestStaffFormControl } from '../models/lawsuit_arreststaff';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Message } from '../../../config/message';
import { replaceFakePath } from 'app/config/dataString';
import { MatDialog } from '@angular/material';
import { async } from "q";
@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html"
})
export class ManageComponent implements OnInit {
  lawsuitDoc: LawsuitDocument[] = [];
  masOfficeList: MasOffice[] = [];
  masStaffList: MasStaff[] = [];
  lawsuitList: Lawsuit[] = [];
  masLawGroupSectionList: MasLawGroupSection[] = [];
  masLawGuitBaseList: MasLawGuitBase[] = [];
  arrestList: Arrest[] = [];
  errorShow: any;
  modal: any;
  lawBraker: any[] = [];
  lawsuitArrestForm: FormGroup;
  lawsuitForm: FormGroup;
  showEditField: Boolean;
  disabled: Boolean;
  isRequired: boolean;
  lawBrakerForm: FormArray;
  LawsuitArrestIndictmentProduct: any = [];
  LawsuitArrestIndictmentProductTableListShow = false;
  LawsuitTableListShow = false;
  private getDataFromListPage: any;
  private onPrintSubscribe: any;
  private onSaveSubscribe: any;
  private onCancelSubscribe: any;
  private onNextPageSubscribe: any;
  
  private LawsuitID: number;
  private IndictmentID: string;
  @ViewChild('printDocModal') printDocModel: ElementRef;
  MasStaff = new Array<MasStaff>();
  lstype = [{
    id: '0',
    name: 'ส่งฟ้องศาล',
  },
  {
    id: '1',
    name: 'เปรียบเทียบปรับ',
  },
  {
    id: '2',
    name: 'ไม่มีตัวตน',
  }];
  lsend = [{
    id: '0',
    name: 'กรมสรรพสามิต',
  },
  {
    id: '1',
    name: 'ศาล',
  },
  {
    id: '2',
    name: 'พนักงานฝ่ายปกครอบ/พนักงายอัยการ',
  }];

  lawsuitTypeSelected: number;
  constructor(
    private activeRoute: ActivatedRoute,

    private router: Router,
    private fb: FormBuilder,
    private navService: NavigationService,
    private ngbModel: NgbModal,
    private sidebarService: SidebarService,
    private preLoaderService: PreloaderService,
    private lawsuitService: LawsuitService,
    public dialog: MatDialog

  ) {
    this.setShowButton();
    this.navService.setNewButton(false);
    this.navService.setSearchBar(false);
    // this.navService.setInnerTextNextPageButton('งานจับกุม')
  }
  get LawsuitArrestStaff(): FormArray {
    return this.lawsuitArrestForm.get('LawsuitArrestStaff') as FormArray;
  }
  get LawsuitStaff(): FormArray {
    return this.lawsuitForm.get('LawsuitStaff') as FormArray;
  }
  get LawsuitTableList(): FormArray {
    return this.lawsuitForm.get('LawsuitTableList') as FormArray;
  }
  get LawsuitDocument(): FormArray {
    return this.lawsuitForm.get('LawsuitDocument') as FormArray;
  }

  async ngOnInit() {
    this.sidebarService.setVersion('0.0.0.5');
    // this.preLoaderService.setShowPreloader(true);
    await this.getParamFromActiveRoute();
    this.navigate_service();
    this.createForm();
    this.createLawsuitForm();
    this.ArrestgetByCon(this.IndictmentID, this.LawsuitID);
    // this.preLoaderService.setShowPreloader(false);
  }
  private navigate_service() {
    this.navService.showFieldEdit.subscribe(async p => {
      this.showEditField = p;
    });
    this.onPrintSubscribe = this.navService.onPrint.subscribe(async status => {
      if (status) {
        await this.navService.setOnPrint(false);
        this.modal = this.ngbModel.open(this.printDocModel, { size: 'lg', centered: true });
      }
    })
    this.onSaveSubscribe = this.navService.onSave.subscribe(async status => {
      if (status) {
        await this.navService.setOnSave(false);
        this.onSave();
      }
    });
    this.onCancelSubscribe = this.navService.onCancel.subscribe(async status => {
      if(status){
        await this.navService.setOnCancel(false);
        this.onCancel();
      }
    });
    this.onNextPageSubscribe = this.navService.onNextPage.subscribe(async status => {
      if(status){
        await this.navService.setOnNextPage(false);
        this.onNextPage();
      }
    });



  }
  private setShowButton() {
    this.navService.setPrintButton(false);
    this.navService.setNewButton(false);
    this.navService.setSearchBar(false);
    this.navService.setDeleteButton(false);
    this.navService.setCancelButton(false);
    this.navService.setEditButton(false);
    this.navService.setSaveButton(false);
  }

  private getParamFromActiveRoute() {
    this.getDataFromListPage = this.activeRoute.queryParams.subscribe(
      async params => {
        this.preLoaderService.setShowPreloader(true);

        this.LawsuitID = params.LawsuitID;
        this.IndictmentID = params.IndictmentID;

        this.preLoaderService.setShowPreloader(false);
      }
    );
  }

  viewData(item) {
    if (item.LawsuitNo) {
      this.router.navigate(["/lawsuit/detail", "R"], {
        queryParams: {
          ArrestCode: this.arrestList[0].ArrestCode,
          IndictmentID: item.IndictmentID,
          LawsuitID: item.LawsuitID
        }
      });
    }
  }

  ngOnDestroy() {
    this.getDataFromListPage.unsubscribe();
    this.onPrintSubscribe.unsubscribe();
    this.onSaveSubscribe.unsubscribe();
    this.onCancelSubscribe.unsubscribe();
  }

  private async onNextPage(){
    console.log(this.lawsuitList[0]['LawsuitArrestIndicment'][0]['IsProve']);

    if(this.lawsuitList[0]['LawsuitArrestIndicment'][0]['IsProve'] == 0){/// IdProve = 0 (goto ILG60-06-02-00-00)
      await this.lawsuitService.LawsuitComparegetByLawsuitID(this.lawsuitList[0]['LawsuitArrestIndicment'][0]['IsProve']).then(res => {
        if(res.length == 0){ /// if not found data

        }else{ ///if found data 

        }
        console.log(res);
      })
    } else { /// IdProve = 1 (goto ILG60-05-02-00-00)
      await this.lawsuitService.LawsuitProvegetByLawsuitID(this.lawsuitList[0]['LawsuitArrestIndicment'][0]['IsProve']).then(res => {
        if(res.length == 0){ /// if not found data

        }else{ ///if found data 

        }
        console.log(res);
      })
    }
  }

  private async onCancel(){
    if(!confirm("ยืนยันการทำรายการหรือไม่")) {
      return;
    }
    if(this.lawsuitList[0]['IsLawsuitComplete'] == 1){
      this.ngOnInit();
    } else {

    }
  }

  private async onSave() {
    this.preLoaderService.setShowPreloader(true);
    let IsLawsuitComplete = this.lawsuitList[0]['IsLawsuitComplete'];
    /// save IsLawsuitComplete = 1
    if (IsLawsuitComplete == 1) {
      /// check LawsuitNo on exite
      await this.lawsuitService.LawsuitVerifyLawsuitNo(this.lawsuitForm.controls['LawsuitNo'].value, 
      this.lawsuitForm.controls['officeCode'].value,
      this.lawsuitForm.controls['IsOutsideCheck'].value).then(async res=> {
        if(res.length != 0 ){
          alert("เลขคดีรับคำกล่าวโทษซ้ำ กรุณา กรอกใหม่");
          this.preLoaderService.setShowPreloader(false);
          return;
        }
      });

      /// check LawsuitDate
      if(!this.lawsuitForm.get('LawsuitDate').valid){
        alert("กรุณากรอกวันที่รับคดีใหม่");
        this.preLoaderService.setShowPreloader(false);
        return;
      }
      /// check LawsuitTime
      if(!this.lawsuitForm.get('LawsuitTime').valid){
        alert("กรุณากรอกเวลาที่รับคดีใหม่");
        this.preLoaderService.setShowPreloader(false);
        return;
      }

      /// check StaffID on exite in this.masStaffList)
      ///### if( this.lawsuitForm.get('FullName').value in this.masStaffList)

      /// check PositionName
      if(!this.lawsuitForm.get('PositionName').valid){
        alert("กรุณากรอกตำแหน่งใหม่");
        this.preLoaderService.setShowPreloader(false);
        return;
      }
      /// check DepartmentName
      if(!this.lawsuitForm.get('DepartmentName').valid){
        alert("กรุณากรอกหน่วยงานใหม่");
        this.preLoaderService.setShowPreloader(false);
        return;
      }
      /// check LawsuitStation
      if(!this.lawsuitForm.get('LawsuitStation').valid){
        alert("กรุณากรอกสถานที่เขียนใหม่");
        this.preLoaderService.setShowPreloader(false);
        return;
      }
      /// check AccuserTestimony
      if(!this.lawsuitForm.get('AccuserTestimony').valid){
        alert("กรุณากรอกคำให้การใหม่");
        this.preLoaderService.setShowPreloader(false);
        return;
      }
      ///edit LawsuitNo
      await this.lawsuitService.LawsuitupdByCon(this.LawsuitID, this.lawsuitForm.controls['LawsuitNo'].value).then(async res=>{
        console.log(res);
      })


    /// save IsLawsuitComplete = 0
    } else {
      
    }
    this.preLoaderService.setShowPreloader(false);
  }

  private createForm() {
    this.lawsuitArrestForm = this.fb.group({
      ArrestCode: new FormControl(null, Validators.required),
      OccurrenceDate: new FormControl(null),
      OccurrenceTime: new FormControl(null, Validators.required),
      ArrestStation: new FormControl(null, Validators.required),
      SubSectionType: new FormControl(null, Validators.required),
      GuiltBaseName: new FormControl(null, Validators.required),
      SectionNo: new FormControl(null, Validators.required),
      PenaltyDesc: new FormControl(null),
      LawsuitArrestStaff: this.fb.array([this.createArrestStaffForm()]),

    });
  }
  private createStaffForm(): FormGroup {
    LawsuitStaffFormControl.LawsuitID = new FormControl(this.LawsuitID);
    return this.fb.group(LawsuitStaffFormControl)
  }
  private createArrestStaffForm(): FormGroup {
    LawsuitArrestStaffFormControl.LawsuitID = new FormControl(this.LawsuitID);
    return this.fb.group(LawsuitArrestStaffFormControl)
  }
  private createTableListForm(): FormGroup {
    return this.fb.group({
      EntityType: new FormControl(null, Validators.required),
      LawbreakerType: new FormControl(null, Validators.required),
      LawsuitNoRef: new FormControl(null, Validators.required),
      LawBrakerFullName: new FormControl(null, Validators.required),
      LawsuitType: new FormControl(null, Validators.required),
      LawsuitEnd: new FormControl(null, Validators.required),
      ProductDesc: new FormControl(null, Validators.required),
    })

  }
  private setItemFormArray(array: any[], formControl: string, formGroup: FormGroup) {
    if (array !== undefined && array.length) {
      const itemFGs = array.map(item => this.fb.group(item));
      //console.log("ITEMFGS" + itemFGs.values);
      const itemFormArray = this.fb.array(itemFGs);
      formGroup.setControl(formControl, itemFormArray);
    }
  }

  private createLawsuitForm() {
    this.lawsuitForm = this.fb.group({
      IsLawsuitCheck: new FormControl(null, Validators.required),
      ReasonDontLawsuit: new FormControl(null, Validators.required),
      IsOutsideCheck: new FormControl(null, Validators.required),
      LawsuitDate: new FormControl(null, Validators.required),
      LawsuitTime: new FormControl(null, Validators.required),
      Fullname: new FormControl(null, Validators.required),
      PositionName: new FormControl(null, Validators.required),
      DepartmentName: new FormControl(null, Validators.required),
      LawsuitStation: new FormControl(null, Validators.required),
      AccuserTestimony: new FormControl(null, Validators.required),
      LawsuitNo: new FormControl(null, Validators.required),
      LawsuitStaff: this.fb.array([this.createStaffForm()]),
      LawsuitTableList: this.fb.array([this.createTableListForm()]),
      LawsuitDocument: this.fb.array([]),
      officeCode: new FormControl(null, Validators.required),
    });
  }
  private async ArrestgetByCon(IndictmentID: string, LawsuitID: number) {
    /// get LawsuitArrestIndictmentProduct
    await this.lawsuitService.LawsuitArrestIndictmentProductgetByIndictmentID(IndictmentID).then(async res=> {
      if(res.length != 0 ){
        this.LawsuitArrestIndictmentProduct = res;  
        this.LawsuitArrestIndictmentProductTableListShow = true;
      }
    });

    ///get  LawsuitArrest
    await this.lawsuitService.LawsuitArrestGetByCon(IndictmentID).then(async res => {
      this.lawsuitList = res || [];
      /// set form lawsuitArrest
      await this.lawsuitArrestForm.reset({
        ArrestCode: res[0]['ArrestCode'],
        OccurrenceDate: res[0]['OccurrenceDate'],
        OccurrenceTime: res[0]['OccurrenceTime'],
        ArrestStation: res[0]['ArrestStation'],
        SubSectionType: res[0]['LawsuitArrestIndicment'][0]['LawsuitLawGuiltbase'][0]['LawsuitLawSubSectionRule'][0]['LawsuitLawSubSection'][0]['SubSectionType'],
        GuiltBaseName: res[0]['LawsuitArrestIndicment'][0]['LawsuitLawGuiltbase'][0]['GuiltBaseName'],
        SectionNo: res[0]['LawsuitArrestIndicment'][0]['LawsuitLawGuiltbase'][0]['LawsuitLawSubSectionRule'][0]['SectionNo'],
        PenaltyDesc: res[0]['LawsuitArrestIndicment'][0]['LawsuitLawGuiltbase'][0]['LawsuitLawSubSectionRule'][0]['LawsuitLawSection'][0]['LawsuitLawPenalty'][0]['PenaltyDesc'],

      });

      /// concat name
      const arreststaff = res[0]['LawsuitArrestStaff'].filter(item => item.IsActive == 1);
      await arreststaff.map(item => {
        item.FullName = `${item.TitleName} ${item.FirstName} ${item.LastName}`
      });
      /// set LawsuitArrestStaff to lawsuitArrestForm
      this.setItemFormArray(arreststaff, 'LawsuitArrestStaff', this.lawsuitArrestForm);
      
      console.log(res);
      /// Check LawsuitComplete status
      if (res.length != 0) {
        this.disabled = true;
        let IsLawsuitComplete = res[0]['IsLawsuitComplete'];
        /// LawsuitComplete status = 1
        if (IsLawsuitComplete == 1) {
          /// get MasDocumentMaingetAll
          if(res[0]['LawsuitArrestIndicment'][0]['Lawsuit'].length !=0 ){
            await this.lawsuitService.MasDocumentMaingetAll(4, res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitID']).then(res => {
              //insert doc to dosMacList
  
            });
          /// get IsLawsuit check box (IsLawsuitCheck)
          let islaw = res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['IsLawsuit'];
          let IsLawsuitCheck = false;
          if (islaw == 0) {
            IsLawsuitCheck = true;
          }

          /// get IsOutside check box (IsOutsidetCheck)
          let isout = res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['IsOutside'];
          let IsOutsideCheck = false;
          if (isout == 1) {
            IsOutsideCheck = true;
          }

          ///set lawsuitForm
          const staff = res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitStaff'].filter(item => item.IsActive == 1);
          staff.map(item => {
            item.FullName = `${item.TitleName} ${item.FirstName} ${item.LastName}`
          });
          await this.lawsuitForm.reset({
            IsLawsuitCheck: IsLawsuitCheck,
            ReasonDontLawsuit: res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['ReasonDontLawsuit'],
            IsOutsideCheck: IsOutsideCheck,
            LawsuitNo: res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitNo'],
            LawsuitDate: res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitDate'],
            LawsuitTime: res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitTime'],
            LawsuitStation: res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitStation'],
            AccuserTestimony: res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['AccuserTestimony'],
            FullName: staff[0].FullName,
            PositionName: staff[0].PositionName,
            DepartmentName: staff[0].DepartmentName,
            officeCode: staff[0].officeCode,
          });
          //this.setItemFormArray(staff, 'LawsuitStaff', this.lawsuitForm);
          }
          let arrList = [];
          await res[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'].map(item => {
            this.LawsuitTableListShow = true;
            res[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'][0]['LawsuitArrestLawbreaker'].map(arrestLaw => {
              item.lawBrakerFullName = `${arrestLaw.LawbreakerTitleName} ${arrestLaw.LawbreakerFirstName} ${arrestLaw.LawbreakerLastName}`
            });
            
            /// add LawsuitTableList
            if (item.LawsuitArrestProductDetail != null && item.LawsuitArrestProductDetail.length) {
              item.ProductDesc = item.LawsuitArrestProductDetail.ProductDesc;
            } else {
              item.ProductDesc = '';
            }
            let a = {
              'EntityType': "",
              'LawbreakerType': "",
              'LawsuitNoRef': "",
              'LawBrakerFullName': item.lawBrakerFullName,
              'LawsuitType': item.LawsuitType,
              'LawsuitEnd': item.LawsuitEnd,
              'ProductDesc': item.ProductDesc,
            };
            /// add EntityType
            if(item.ArrestLawbreaker == 1){
              a.EntityType = 'บุคคลธรรมดา';
            }else{
              a.EntityType = 'นิติบุคคล';
            }
            /// add LawbreakerType
            if(item.ArrestLawbreaker == 1){
              a.LawbreakerType = 'คนไทย';
            }else{
              a.LawbreakerType = 'ต่างชำติ';
            }
            /// add LawsuitNoRef
            if(item.ArrestLawbreaker == 1 && item.ArrestLawbreaker == 1){
              a.LawsuitNoRef = a.LawsuitNoRef = item.LawsuitArrestLawbreaker[0].IDCard;
            }else if(item.ArrestLawbreaker == 1 && item.ArrestLawbreaker == 0){
              a.LawsuitNoRef = a.LawsuitNoRef = item.LawsuitArrestLawbreaker[0].PassportNo;
            }else{
              a.LawsuitNoRef = a.LawsuitNoRef = item.LawsuitArrestLawbreaker[0].CompanyRegistrationNo;
            }
            arrList.push(a)
          });
          this.setItemFormArray(arrList, 'LawsuitTableList', this.lawsuitForm);

          /// create data management button
          let isProve = res[0]['LawsuitArrestIndicment'][0]['IsProve'];
          let lawsuitType = res[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'][0]['LawsuitType'];

          if (isProve == 0) {
            if (lawsuitType == 1) {
              this.navService.setPrintButton(true);
              this.navService.setDeleteButton(true);
              this.navService.setEditButton(true);
              this.navService.setNextPageButton(true);
              this.navService.setInnerTextNextPageButton('เปรียบเทียบปรับ')
            } else {
              this.navService.setPrintButton(true);
              this.navService.setDeleteButton(true);
              this.navService.setEditButton(true);

            }
          } else {
            this.navService.setPrintButton(true);
            this.navService.setDeleteButton(true);
            this.navService.setEditButton(true);
            this.navService.setNextPageButton(true);
            this.navService.setInnerTextNextPageButton('งานพิสูจน์')
          }
        
        /// LawsuitComplete status = 0
        } else {
          //console.log("LAWSUIT COMPLETE = 0");
          this.lawsuitService.MasStaffMaingetAll().then(masstaff => {
            console.log(masstaff);
            this.masStaffList = masstaff || [];
          });
          this.lawsuitService.MasOfficeMaingetAll().then(masoffice => {
            console.log(masoffice);
            this.masOfficeList = masoffice || [];
          });
          this.navService.setSaveButton(true);
          this.navService.setCancelButton(true);
        }

      }
    });
  }

  formatterStaff = (x: { TitleName: string, FirstName: string, LastName: string }) =>
    `${x.TitleName || ''} ${x.FirstName || ''} ${x.LastName || ''}`

  searchStaff = (text3$: Observable<string>) =>
    text3$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term === '' ? []
        : this.MasStaff
          .filter(v =>
            (v.TitleName && v.TitleName.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
            (v.FirstName && v.FirstName.toLowerCase().indexOf(term.toLowerCase()) > -1) ||
            (v.LastName && v.LastName.toLowerCase().indexOf(term.toLowerCase()) > -1)
          ).slice(0, 10));

  selectItemStaff(e, i) {
    this.LawsuitArrestStaff.at(i).reset(e.item);
    this.LawsuitArrestStaff.at(i).patchValue({
      //ProgramCode: this.programSpect,
      ProcessCode: '0002',
      LawsuitID: this.LawsuitID,
      IsActive: 1,
      FullName: `${e.item.TitleName || ''} ${e.item.FirstName || ''} ${e.item.LastName || ''}`,
      PositionCode: e.item.PositionCode || e.item.ManagementPosCode,
      PositionName: e.item.PositionName || e.item.ManagementPosName,
      DepartmentLevel: e.item.DepartmentLevel || e.item.DeptLevel,
      DepartmentCode: e.item.DepartmentCode || e.item.OfficeCode,
      DepartmentName: `${e.item.DepartmentName || e.item.OfficeName}`,
      ContributorCode: e.item.ContributorCode || 2,
      ContributorID: e.item.ContributorID || 1
    })
  }

  addDocument() {
    const lastIndex = this.LawsuitDocument.length - 1;
    let document = new LawsuitDocument();
    document.IsNewItem = true;
    if (lastIndex < 0) {
      this.LawsuitDocument.push(this.fb.group(document));
    } else {
      const lastDoc = this.LawsuitDocument.at(lastIndex).value;
      if (lastDoc.DocumentName && lastDoc.FilePath) {
        this.LawsuitDocument.push(this.fb.group(document));
      }
    }
  }
  changeNoticeDoc(e: any, index: number) {
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.readAsDataURL(file);
    reader.onload = () => {
      let dataSource = (<string>reader.result).split(',')[1];
      if (dataSource && dataSource !== undefined) {
        this.LawsuitDocument.at(index).patchValue({
          ReferenceCode: this.LawsuitID,
          FilePath: replaceFakePath(e.target.value),
          DataSource: dataSource,
          IsActive: 1
        })
      }
    };
  }
  editTable(item: any, index: number) {
    //console.log('item', item, index)
    // alert((item.get('LawsuitType').value));
    const dialogRef = this.dialog.open(DialogJudgment, {
      width: '90%',
      maxWidth: 'none',
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'dialog-judgment',
  templateUrl: 'dialog-judgment.html',
})
export class DialogJudgment {
  lawsuitArrestForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private navService: NavigationService,
    private ngbModel: NgbModal,
    private sidebarService: SidebarService,
    private preLoaderService: PreloaderService,
    private lawsuitService: LawsuitService,
    public dialog: MatDialog

  ) {

  }
  public isPayAll = null;

  ngOnInit() {
    this.lawsuitService.GetArrestIndicmentDetailgetByCon('2').then(result => {
      //console.log('result====>', result);
    });
    this.lawsuitArrestForm = this.fb.group({
      arrestName: new FormControl(null, Validators.required),
      justicName: new FormControl(null, Validators.required),
      numberBlackList: new FormControl(null, Validators.required),
      numberRedList: new FormControl(null, Validators.required),
      location: new FormControl(null, Validators.required),
      dateJustic: new FormControl(null, Validators.required),
      fine: new FormControl(null),
      fineRate: new FormControl(null),
      isPrison: new FormControl(null),
      prisonDay: new FormControl(null),
      unit: new FormControl(null),
      payRadio1: new FormControl(null),
      payRadio2: new FormControl(null),
      payDate: new FormControl(null),
      quantityPay: new FormControl(null),
      startPayDate: new FormControl(null),
      roundPay: new FormControl(null),
      payUnit: new FormControl(null),

    });
  }


}


