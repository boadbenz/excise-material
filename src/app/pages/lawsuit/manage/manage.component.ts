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
import { Arrest } from "../../arrests/models/arrest";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
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
import { MatDialog, MatDialogRef } from '@angular/material';
import { async } from "q";
import { JudgmentModel } from "../models/judgment";
import { IMyDpOptions } from "mydatepicker";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html"
})

// export class ManageComponent implements OnInit {
//   private LawsuitID: number;
//   private IndictmentID: string;

//   LawsuitArrestIndictmentProduct: any = {};
//   lawsuitArrestForm: any = {};
//   lawsuitForm: any = {};
//   ArrestLawbreakerForm: any = [];
//   LawsuitLawGuiltbase: any = {};
//   SubSectionType: any = "";
//   SectionNo: any = "";
//   PenaltyDesc: any = "";

//   IsLawsuitComplete = 0;

//   today = new Date()
//   show = {
//     LawsuitArrestIndictmentProductTable: false,
//     lawsuitForm: false
//   }
//   disable = {
//     lawsuitArrestForm: false,
//     lawsuitForm: false,
//     LawsuitArrestIndicment: false,
//   }
//   checkbox = {
//     IsLawsuitCheck: false,
//     IsOutsideCheck: false
//   }
//   search = {
//     listMasStaff: [],
//     listMasOffice: []
//   }
//   mode = {
//     edit: false,
//     view: false
//   }
//   button = {
//     onSaveSubscribe: ''
//   }
//   lstype = [{
//     id: '0',
//     name: 'ส่งฟ้องศาล',
//   },
//   {
//     id: '1',
//     name: 'เปรียบเทียบปรับ',
//   },
//   {
//     id: '2',
//     name: 'ไม่มีตัวตน',
//   }];
//   lsend = [{
//     id: '0',
//     name: 'กรมสรรพสามิต',
//   },
//   {
//     id: '1',
//     name: 'ศาล',
//   },
//   {
//     id: '2',
//     name: 'พนักงานฝ่ายปกครอง/พนักงายอัยการ',
//   }];
//   listMasStaff = [];
//   listMasOffice = [];
//   modal: any;
//   masDocument = [];
//   lawsuitDocument = [];
//   @ViewChild('printDocModal') printDocModel: ElementRef;

//   public LawsuitDateOptions: IMyDpOptions = {
//     dateFormat: 'dd mmm yyyy',
//     disableSince: { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() + 1 },
//   };
//   constructor(
//     private activeRoute: ActivatedRoute,
//     private router: Router,
//     private formBuilder: FormBuilder,
//     private navService: NavigationService,
//     private ngbModel: NgbModal,
//     private sidebarService: SidebarService,
//     private preLoaderService: PreloaderService,
//     private lawsuitService: LawsuitService,
//     public dialog: MatDialog
//   ) {
//     this.setShowButton();
//     this.LawsuitArrestIndictmentProduct = this.modelLawsuitArrestIndictmentProduct();
//     this.lawsuitArrestForm = this.modelLawsuitArrest();
//   }
//   async ngOnInit() {
//     //load show
//     this.sidebarService.setVersion('0.0.0.6');
//     await this.loadLawsuit();

//     // constructure value
//     this.preLoaderService.setShowPreloader(true);
//     this.LawsuitArrestIndictmentProduct = await this.ArrestIndictmentProductgetByIndictmentID(this.IndictmentID)
//     this.lawsuitArrestForm = await this.ArrestgetByCon(this.IndictmentID)
//     this.setClickButton()
//     console.log("LawsuitArrestIndictmentProduct -> ", this.LawsuitArrestIndictmentProduct)
//     console.log("lawsuitArrestForm -> ", this.lawsuitArrestForm)

//     this.preLoaderService.setShowPreloader(false);
//   }
//   private loadLawsuit() {
//     this.activeRoute.queryParams.subscribe(params => {
//       this.preLoaderService.setShowPreloader(true);
//       this.LawsuitID = params.LawsuitID;
//       this.IndictmentID = params.IndictmentID;
//       this.preLoaderService.setShowPreloader(false);
//     }
//     );
//   }
//   modelLawsuitArrest() {
//     return {
//       ArrestCode: '',
//       OccurrenceDate: '',
//       OccurrenceTime: '',
//       ArrestStation: '',
//       SubSectionType: '',
//       GuiltBaseName: '',
//       SectionNo: '',
//       PenaltyDesc: '',
//       LawsuitArrestStaff: [],
//     };
//   }
//   modelLawsuitArrestIndictmentProduct() {
//     return {
//       ArrestCode: '',
//       OccurrenceDate: '',
//       OccurrenceTime: '',
//       ArrestStation: '',
//       SubSectionType: '',
//       GuiltBaseName: '',
//       SectionNo: '',
//       PenaltyDesc: '',
//       LawsuitArrestStaff: {}
//     };
//   }
//   private setShowButton() {
//     this.navService.setPrintButton(false);
//     this.navService.setNewButton(false);
//     this.navService.setSearchBar(false);
//     this.navService.setDeleteButton(false);
//     this.navService.setCancelButton(false);
//     this.navService.setEditButton(false);
//     this.navService.setSaveButton(false);
//   }
//   private setClickButton() {
//     // this.navService.showFieldEdit.subscribe(async p => {
//     //   this.disable.lawsuitArrestForm = p ? false : true;
//     // });
//      this.navService.onPrint.subscribe(async status => {
//       if (status) {
//         await this.navService.setOnPrint(false);
//         this.modal = this.ngbModel.open(this.printDocModel, { size: 'lg', centered: true });
//       }
//     })
//     this.navService.onSave.subscribe(async status => {
//       if (status) {
//         await this.navService.setOnSave(false);
//         if (!this.lawsuitForm.valid) {
//           alert(Message.checkData)
//           return false;
//         }
//         this.onSave();
//       }
//     });
//     this.navService.onEdit.subscribe(async status => {
//       if (status) {
//         await this.navService.setOnEdit(false);
//         this.onEdit();
//       }
//     });
//   }

//   // private createArrestStaffForm(): FormGroup {
//   //   return this.formBuilder.group({
//   //     ArrestCode: null,
//   //     ContributorID: null,
//   //     DepartmentCode: null,
//   //     DepartmentLevel: null,
//   //     DepartmentName: null,
//   //     FullName: null,
//   //     FirstName: null,
//   //     IsActive: null,
//   //     LastName: null,
//   //     OfficeCode: null,
//   //     OfficeName: null,
//   //     OfficeShortName: null,
//   //     PosLevel: null,
//   //     PosLevelName: null,
//   //     PositionCode: null,
//   //     PositionName: null,
//   //     ProcessCode: null,
//   //     ProgramCode: null,
//   //     StaffCode: null,
//   //     StaffID: null,
//   //     TitleName: null,
//   //   })
//   // }
//   ArrestIndictmentProductgetByIndictmentID(IndictmentID: string) {
//     return this.lawsuitService.LawsuitArrestIndictmentProductgetByIndictmentID(IndictmentID).then(response => {
//       this.show.LawsuitArrestIndictmentProductTable = true;
//       return response;
//     });
//   }
//   ArrestgetByCon(IndictmentID: string) {
//     return this.lawsuitService.LawsuitArrestGetByCon(IndictmentID).then(async response => {
//       if (response.length > 0) {
//         this.disable.lawsuitArrestForm = true;
//         let result = response[0] ? response[0] : {}
//         result ? this.fixFullName() : null
//         result === {} ? this.show.lawsuitForm = false : await this.checkComplete(result.LawsuitArrestIndicment[0])
//         if (this.lawsuitArrestForm.length > 0) {
//           this.LawsuitLawGuiltbase = this.lawsuitArrestForm.LawsuitArrestIndicment[0].LawsuitLawGuiltbase[0]
//           this.SubSectionType = this.lawsuitArrestForm.LawsuitArrestIndicment[0].LawsuitLawGuiltbase[0].LawsuitLawSubSectionRule[0].LawsuitLawSubSection[0].SubSectionType
//           this.SectionNo = this.lawsuitArrestForm.LawsuitArrestIndicment[0].LawsuitLawGuiltbase[0].LawsuitLawSubSectionRule[0].LawsuitLawSection[0].SectionNo
//           this.PenaltyDesc = this.lawsuitArrestForm.LawsuitArrestIndicment[0].LawsuitLawGuiltbase[0].LawsuitLawSubSectionRule[0].LawsuitLawSection[0].LawsuitLawPenalty[0].PenaltyDesc
//         } else {
//           this.LawsuitLawGuiltbase = ''
//           this.SubSectionType = ''
//           this.SectionNo = ''
//           this.PenaltyDesc = ''
//         }
//         return result;
//       }
//       else {
//         this.mode.view = true;
//         return {};
//       } 
//     })
//   }

//   fixFullName() {
//     this.lawsuitArrestForm.LawsuitArrestStaff.map(name => {
//       name.FullName = `${name.TitleName} ${name.FirstName} ${name.LastName}`
//     });
//   }
//   async checkComplete(LawsuitArrestIndicment) {
//     this.IsLawsuitComplete = LawsuitArrestIndicment.IsLawsuitComplete;
//     this.show.lawsuitForm = true
//     this.mode.view = true
//     this.setFullname(this.listMasStaff)
//     console.log("IsLawsuitComplete -> ", this.IsLawsuitComplete)
//     if (this.IsLawsuitComplete === 1) {
//       this.masDocument = await this.lawsuitService.MasDocumentMaingetAll(4, this.LawsuitID)
//       this.ArrestLawbreakerForm = LawsuitArrestIndicment.LawsuitArrestIndicmentDetail[0].LawsuitArrestLawbreaker
//       console.log("ArrestLawbreakerForm -> ", this.ArrestLawbreakerForm)
//       if (LawsuitArrestIndicment.IsProve === 0) {
//         if (LawsuitArrestIndicment.LawsuitArrestIndicmentDetail[0].LawsuitType === 0) {
//           this.navService.setEditButton(true);
//           this.navService.setPrintButton(true);
//           this.navService.setDeleteButton(true);
//           this.navService.setNextPageButton(true);
//           this.navService.setInnerTextNextPageButton('เปรียบเทียบปรับ')
//         } else {
//           this.navService.setEditButton(true);
//           this.navService.setPrintButton(true);
//           this.navService.setDeleteButton(true);
//           this.navService.setNextPageButton(true);
//           this.navService.setInnerTextNextPageButton('งานพิสูจน์')
//         }
//       } else {
//         // this.mode.edit = true;
//         this.navService.setEditButton(true);
//         this.navService.setPrintButton(true);
//         this.navService.setDeleteButton(true);
//         this.navService.setNextPageButton(true);
//         this.navService.setInnerTextNextPageButton('งานพิสูจน์ >>')
//       }
//     } else {
//       this.disable.lawsuitForm = false;
//       this.navService.setCancelButton(true);
//       this.navService.setSaveButton(true);
//       this.listMasStaff = await this.lawsuitService.MasStaffMaingetAll();
//       this.listMasOffice = await this.lawsuitService.MasOfficeMaingetAll();
//       this.disable.LawsuitArrestIndicment = false;
//     }
//     // Setup checkbox
//     await this.setLawsuit(LawsuitArrestIndicment.Lawsuit[0])
//   }
//   async setFullname(list) {
//     await list.map(name => {
//       name.FullName = `${name.TitleName} ${name.FirstName} ${name.LastName}`
//     });
//     return list;
//   }
//   async setLawsuit(LawsuitArrestIndicment) {
//     if (LawsuitArrestIndicment) {
//       this.lawsuitForm = LawsuitArrestIndicment
//       this.lawsuitForm.ReasonDontLawsuit = this.lawsuitForm.ReasonDontLawsuit
//       this.lawsuitForm.LawsuitDate = this.lawsuitForm.LawsuitDate ? this.convertDate(this.lawsuitForm.LawsuitDate) : null;
//       this.lawsuitForm.LawsuitStaff.map(name => {
//         name.FullName = `${name.TitleName} ${name.FirstName} ${name.LastName}`
//       });
//       this.checkbox.IsLawsuitCheck = LawsuitArrestIndicment.IsLawsuit === 1 ? true : false;
//       if (this.lawsuitForm.LawsuitNo) {
//         let temp = this.lawsuitForm.LawsuitNo.split("/");
//         this.lawsuitForm.LawsuitNoCut = temp[0];
//         this.lawsuitForm.LawsuitNoSub = temp[1];
//       } else {
//         this.lawsuitForm.LawsuitNoCut = '';
//         this.lawsuitForm.LawsuitNoSub = '';
//       }
//     } else {
//       this.lawsuitForm = {
//         LawsuitNoCut: '',
//         LawsuitNoSub: ''
//       }
//     }

//     console.log("lawsuitForm -> ", this.lawsuitForm)

//     // this.checkbox.IsOutsideCheck = 
//   }
//   convertDate(date) {
//     if (date) {
//       let cutDate = date.split("-")
//       return { date: { year: (Number(cutDate[0])), month: Number(cutDate[1]) + 1, day: Number(cutDate[2].substr(0, 2)) } };
//     } else {
//       return null;
//     }
//   }
//   onChangeLaw() {
//     if (this.checkbox.IsLawsuitCheck && this.checkbox.IsOutsideCheck === true) { this.checkbox.IsOutsideCheck = false }

//   }
//   onChengeOut() {
//     if (this.checkbox.IsOutsideCheck && this.checkbox.IsLawsuitCheck === true) { this.checkbox.IsLawsuitCheck = false }
//   }
//   onBlurFullname() {
//     setTimeout(() => {
//       this.search.listMasStaff = [];
//     }, 500);
//   }
//   onBlurOfficename() {
//     setTimeout(() => {
//       this.search.listMasOffice = [];
//     }, 500);
//   }
//   onChangeFullname(textSearch) {
//     if (textSearch) {
//       let _listMasStaff = this.listMasStaff;

//       this.search.listMasStaff = _listMasStaff.filter(item => item.FullName.includes(textSearch)).slice(0, 10);
//       if (this.search.listMasStaff.length == 1) {
//         this.lawsuitForm.PositionName = this.search.listMasStaff[0].OperationPosName;
//         this.lawsuitForm.DepartmentName = this.search.listMasStaff[0].OfficeShortName;
//         this.lawsuitForm.officeCode = this.search.listMasStaff[0].OfficeCode;
//       } else {
//         this.lawsuitForm.PositionName = '';
//         this.lawsuitForm.DepartmentName = '';
//         this.lawsuitForm.officeCode = '';
//       }
//     } else {
//       this.lawsuitForm.PositionName = '';
//       this.lawsuitForm.DepartmentName = '';
//       this.lawsuitForm.officeCode = '';
//     }
//   }
//   onChangeStation(textSearch) {
//     let _listMasOffice = this.listMasOffice;
//     if (textSearch) {
//       let result = _listMasOffice.filter(item => (item.OfficeName.includes(textSearch))).slice(0, 10);
//       this.search.listMasOffice = result;
//     }
//   }
//   onChangeFullnameReslut(text) {
//     this.lawsuitForm.LawsuitStaff[0].FullName = text.FullName;
//     this.lawsuitForm.LawsuitStaff[0].PositionName = text.OperationPosName;
//     this.lawsuitForm.LawsuitStaff[0].DepartmentName = text.OfficeShortName;
//     this.lawsuitForm.LawsuitStaff[0].officeCode = text.OfficeCode;
//     this.search.listMasStaff = [];
//   }
//   onChangeStationReslut(text) {
//     this.lawsuitForm.LawsuitStaff[0].LawsuitStation = text.OfficeName;
//     this.search.listMasStaff = [];
//   }
//   changeNoticeDoc(e: any, index: number) {
//     let reader = new FileReader();
//     let file = e.target.files[0];
//     reader.readAsDataURL(file);
//     reader.onload = () => {
//       let dataSource = (<string>reader.result).split(',')[1];
//       if (dataSource && dataSource !== undefined) {
//         this.lawsuitForm.lawsuitDocument.at(index).patchValue({
//           ReferenceCode: this.LawsuitID,
//           FilePath: replaceFakePath(e.target.value),
//           DataSource: dataSource,
//           IsActive: 1
//         })
//       }
//     };
//   }
//   onDeleteDocument(index) {
//     this.lawsuitForm.LawsuitDocument.removeAt(index);
//   }
//   onSave() {
//     if (this.IsLawsuitComplete === 1)
//       console.log("IsLawsuitComplete = 1")
//   }
//   async onEdit() {
//     let IsProve = this.lawsuitArrestForm.LawsuitArrestIndicment[0] ? this.lawsuitArrestForm.LawsuitArrestIndicment[0].IsProve : null;
//     if (IsProve === 0) {
//       let LawsuitType = this.lawsuitArrestForm.LawsuitArrestIndicment[0].LawsuitArrestIndicmentDetail[0].LawsuitType
//       if (LawsuitType === 0) {
//         let JudgementID = this.lawsuitArrestForm.LawsuitArrestIndicment[0].LawsuitArrestIndicmentDetail[0].LawsuitJudgement[0].JudgementID;
//         let LawsuitPayment = await this.lawsuitService.LawsuitPaymentFinegetByJudgementID(JudgementID);
//         if (LawsuitPayment) {
//           console.log(LawsuitPayment)
//         }
//       }
//     } else {
//       if (await this.lawsuitService.LawsuitProvegetByLawsuitID(this.LawsuitID)) {
//         this.navService.setEditButton(true);
//         this.navService.setPrintButton(true);
//         this.navService.setDeleteButton(true);
//         this.navService.setCancelButton(false);
//         this.navService.setSaveButton(false);
//         this.navService.setInnerTextNextPageButton('เปรียบเทียบปรับ')
//         alert("ไม่สามารถแก้ไขรายการได้")
//       } else {
//         this.mode.edit = false;
//       }
//       console.log("mode.edit ->", this.mode.edit)
//     }

//   }
// }



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
  lawsuitArrestForm: FormGroup = new FormGroup({
    ArrestCode: new FormControl(),
    OccurrenceDate: new FormControl(),
    OccurrenceTime: new FormControl(),
    ArrestStation: new FormControl(),
    FullName: new FormControl(),
    PositionName: new FormControl(),
    DepartmentName: new FormControl(),
    SubSectionType: new FormControl(),
    GuiltBaseName: new FormControl(),
    SectionNo: new FormControl(),
    PenaltyDesc: new FormControl(),
    LawsuitArrestStaff: new FormControl()
  });
  lawsuitForm: FormGroup = new FormGroup({
    IsLawsuitCheck: new FormControl(),
    ReasonDontLawsuit: new FormControl(),
    IsOutsideCheck: new FormControl(),
    LawsuitNo: new FormControl(),
    LawsuitNoSub: new FormControl(),
    LawsuitDate: new FormControl(),
    LawsuitTime: new FormControl(),
    FullName: new FormControl(),
    PositionName: new FormControl(),
    DepartmentName: new FormControl(),
    LawsuitStation: new FormControl(),
    LawsuitType: new FormControl(),
    LawsuitEnd: new FormControl(),
    DocumentName: new FormControl(),
    FilePath: new FormControl()
  });
  showEditField: Boolean;
  disabled: Boolean;
  isRequired: boolean;
  lawBrakerForm: FormArray;
  LawsuitArrestIndictmentProduct: any = [];
  LawsuitArrestIndictmentProductTableListShow = false;
  LawsuitTableListShow = false;
  fileToUpload: File = null;
  fileToUploadList: File[] = [];
  lawsuitFormNoData: boolean;
  LawsuitStaffOnsave: any = [];
  LawsuitLocationOnSave: any = [];
  private getDataFromListPage: any;
  private onPrintSubscribe: any;
  private onSaveSubscribe: any;
  private onCancelSubscribe: any;
  private onEditSubscribe: any;
  private onDeleteSubscribe: any;
  private onNextPageSubscribe: any;

  private LawsuitID: number;
  private IndictmentID: string;
  @ViewChild('printDocModal') printDocModel: ElementRef;

  MasStaff = new Array<MasStaff>();
  lstype = [{ id: '0', name: 'ส่งฟ้องศาล' }, { id: '1', name: 'เปรียบเทียบปรับ', }, { id: '2', name: 'ไม่มีตัวตน', }];
  lsend = [{ id: '0', name: 'กรมสรรพสามิต', }, { id: '1', name: 'ศาล', }, { id: '2', name: 'พนักงานฝ่ายปกครอง/พนักงายอัยการ', }];

  lawsuitTypeSelected: number;
  suggestions: any[] = [];
  suggestionsStation: any[] = [];
  private today = new Date();
  public LawsuitDateOptions: IMyDpOptions = {
    dateFormat: 'dd mmm yyyy',
    disableSince: { year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() + 1 },
  };
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
  public onPrint = (content) => {
    this.modal = this.ngbModel.open(content, { size: 'lg', centered: true });
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
    this.sidebarService.setVersion('0.0.0.11');
    this.preLoaderService.setShowPreloader(true);
    await this.getParamFromActiveRoute();
    this.navigate_service();
    this.createForm();
    this.createLawsuitForm();
    this.tools_bar(this.LawsuitID)
    await this.ArrestgetByCon(this.IndictmentID, this.LawsuitID);
    this.preLoaderService.setShowPreloader(false);
  }
  private tools_bar(LawsuitID) {
    if (LawsuitID > 0) {
      this.navService.setSaveButton(false);
      this.navService.setCancelButton(false);
      this.navService.setPrintButton(true);
      this.navService.setDeleteButton(true);
      this.navService.setEditButton(true);
      this.showEditField = true;
    } else {
      this.navService.setSaveButton(true);
      this.navService.setCancelButton(true);
      this.showEditField = false;
    }
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
        console.log('this.lawsuitForm.valid===>', this.findInvalidControls())
        if (!this.lawsuitForm.valid) {
          this.isRequired = true;
          alert(Message.checkData)
          return false;
        }
        this.onSave();
      }
    });
    this.onCancelSubscribe = this.navService.onCancel.subscribe(async status => {
      if (status) {
        await this.navService.setOnCancel(false);
        this.onCancel();
      }
    });
    this.onNextPageSubscribe = this.navService.onNextPage.subscribe(async status => {
      if (status) {
        await this.navService.setOnNextPage(false);
        this.onNextPage();
      }
    });
    this.onEditSubscribe = this.navService.onEdit.subscribe(async status => {
      if (status) {
        await this.navService.setOnEdit(false);
        this.onEdit();
      }
    });
    this.onDeleteSubscribe = this.navService.onDelete.subscribe(async status=>{
      if (status)
      {
        this.onDelete();
      }
    })

  }
  public findInvalidControls() {
    const invalid = [];
    const controls = this.lawsuitForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
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

  ngOnDestroy() {
    this.getDataFromListPage.unsubscribe();
    this.onPrintSubscribe.unsubscribe();
    this.onSaveSubscribe.unsubscribe();
    this.onCancelSubscribe.unsubscribe();
    this.onDeleteSubscribe.unsubscribe();
    this.onEditSubscribe.unsubscribe();
  }
  private async onDelete(){
    this.preLoaderService.setShowPreloader(true);
    let indictmentID:string
    let lawsuitID:string
    this.getDataFromListPage = this.activeRoute.queryParams.subscribe(
      params => {
        indictmentID = params.IndictmentID;
        lawsuitID = params.LawsuitID;
      }
    );
    await this.lawsuitService.LawsuitArrestGetByCon(indictmentID).then(async (res)=>{
      res[0].LawsuitArrestIndicment.forEach(inc => {
        let IsProve = inc.IsProve;
        if(IsProve == 0){
          let LawsuitArrestIndicmentDetail = this.lawsuitList[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail']
          LawsuitArrestIndicmentDetail.forEach(detail => {
            if(detail.LawsuitType == 0){
              this.lawsuitService.LawsuitPaymentFinegetByJudgementID(detail.JudgementID).then(jugderes=>{
                if(jugderes.IsRequestBribe==1||jugderes.IsRequestReward ==1){
                  alert('ไม่สามารถทำรายการได้')
                  return;
                }else{
                  this.DeleteConfirm(indictmentID,res[0].ArrestCode)
                }
                this.preLoaderService.setShowPreloader(false);
              }).catch((error)=>{
                this.preLoaderService.setShowPreloader(false);
                console.log(error)
              })
            }else{
              this.lawsuitService.LawsuitComparegetByLawsuitID(lawsuitID).then(async (compareres)=>{
                if(compareres){
                  alert('ไม่สามารถทำรายการได้')
                  this.preLoaderService.setShowPreloader(false);
                  return;
                }else{
                  this.preLoaderService.setShowPreloader(false);
                  this.DeleteConfirm(indictmentID,res[0].ArrestCode)
                }
              })
            }
          });
        }else{
          this.lawsuitService.LawsuitProvegetByLawsuitID(lawsuitID).then((proveres)=>{
            if(proveres){
              alert('ไม่สามารถทำรายการได้')
              this.preLoaderService.setShowPreloader(false);
              return;
            }else{
              this.preLoaderService.setShowPreloader(false);
              this.DeleteConfirm(indictmentID,res[0].ArrestCode)
            }
          }).catch((error)=>{
            this.preLoaderService.setShowPreloader(false);
            console.log(error)
          })
        }
      });
      
    })
  }

  DeleteConfirm(indictmentID,ArrestCode){
    if(confirm('ยืนยันกำรทำรายการหรือไม่')){
      this.lawsuitService.LawsuitArrestupDeleteLawsuit(indictmentID,ArrestCode).then((deleteres)=>{
        if(deleteres.Msg == 'Complete'){
          alert('ลบข้อมูลสำเร็จ')
          this.router.navigate(["/lawsuit/list"])
        }
        this.preLoaderService.setShowPreloader(false);
      }).catch(error=>{
        this.preLoaderService.setShowPreloader(false);
        alert('ลบข้อมูลไม่สำเร็จ '+error)
      })
    } else {
      return 
    }
  }

  private async onEdit() {
    console.log("this.lawsuitList===?", this.lawsuitList)
    if (this.lawsuitList[0]['LawsuitArrestIndicment'][0]['IsProve'] == 0) {/// IdProve = 0
      if (this.lawsuitList[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'][0]['LawsuitType'] == 0) {/// LawsuitType = 0
        await this.lawsuitService.LawsuitPaymentFinegetByJudgementID(this.lawsuitList[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'][0]['LawsuitJudgement'][0]['JudgementID']).then(res => {
          console.log('res judgment===>', res)
        })
        //JudgementID
      } else {

      }
    } else { /// IdProve
      if(this.lawsuitList[0]['LawsuitArrestIndicment'][0]['Lawsuit'].length > 0){
        await this.lawsuitService.LawsuitProvegetByLawsuitID(this.lawsuitList[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitID']).then(res => {
          // console.log(res);
          if (res.length == 0) { /// if not found data
            /// load  MasStaffMaingetAll and  MasOfficeMaingetAll for full text search
            this.lawsuitService.MasStaffMaingetAll().then(masstaff => {
              const _masstaff = masstaff;
              _masstaff.map(item => {
                item.FullName = `${item.TitleName} ${item.FirstName} ${item.LastName}`
              });
              this.masStaffList = _masstaff || [];
            });
            this.lawsuitService.MasOfficeMaingetAll().then(masoffice => {
              this.masOfficeList = masoffice || [];
            });
            this.navService.setEditField(false);
            this.navService.setEditButton(false);
            this.navService.setPrintButton(false);
            this.navService.setDeleteButton(false);
            // set true
            this.navService.setSaveButton(true);
            this.navService.setCancelButton(true);
            return;
            // console.log("_masstaff",this.masStaffList);
          } else { ///if found data
            alert('ไม่สามารถทำรายการได้');
            // // set false
            this.navService.setEditField(true);
            this.navService.setEditButton(true);
            this.navService.setPrintButton(true);
            this.navService.setDeleteButton(true);
            // set true
            this.navService.setSaveButton(false);
            this.navService.setCancelButton(false);
            return;
          }
        })
      }else{
          this.navService.setEditField(false);
          this.navService.setEditButton(false);
          this.navService.setPrintButton(false);
          this.navService.setDeleteButton(false);
          // set true
          this.navService.setSaveButton(true);
          this.navService.setCancelButton(true);
          return;
      }
      
    }
  }

  private async onNextPage() {
    let indictmentID: string;
    let lawsuitID: string;
    this.getDataFromListPage = this.activeRoute.queryParams.subscribe(
      params => {
        lawsuitID = params.LawsuitID;
        indictmentID = params.IndictmentID;
      }
    );

    let IsProve = 0;
    this.lawsuitService.LawsuitArrestGetByCon(indictmentID).then(res => {

      IsProve = res[0].LawsuitArrestIndicment[0].IsProve;
      console.log('result====>', res);
    });
    if (IsProve == 0) {/// IdProve = 0 (goto ILG60-06-02-00-00)
      await this.lawsuitService.LawsuitComparegetByLawsuitID(lawsuitID).then(res => {
        console.log('IsProve ===0 ', res)
        if (res.length == 0) { /// if not found data

        } else { ///if found data

        }
      })
    } else { /// IdProve = 1 (goto ILG60-05-02-00-00)
      await this.lawsuitService.LawsuitProvegetByLawsuitID(lawsuitID).then(res => {
        console.log('IsProve ===1 ', res)
        if (res.length == 0) { /// if not found data

        } else { ///if found data

        }
      })
    }
  }

  private async onCancel() {
    
    let IsLawsuitComplete = this.lawsuitList[0]['IsLawsuitComplete'];
    console.log(this.lawsuitList[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail']);
    let LawsuitArrestIndicmentDetail = this.lawsuitList[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail']
    // let indictmentID: string;
    // if (IsLawsuitComplete == 0) {
    //   // this.lawsuitService.LawsuitArrestIndicmentupdByCon(IndictmentDetailID).then((res:any)=>{
    //   //   console.log('cancel',res)
    //   // })
    // }else {
    // // let IsLawsuitComplete = 1;
    //   this.activeRoute.queryParams.subscribe(
    //     params => { this.LawsuitID = params.LawsuitID;  indictmentID = params.IndictmentID; }
    //   );
    //   let ArrestIndicmentDetail = await this.lawsuitService.GetArrestIndicmentDetailgetByCon(IndictmentDetailID)
    //   console.log(ArrestIndicmentDetail)
    // }
    

    // let IsLawsuitComplete = 0;
    // this.lawsuitService.LawsuitArrestGetByCon(IndictmentDetailID).then(res => {
    //   console.log(res);
    //   IsLawsuitComplete = res[0].LawsuitArrestIndicment[0].IsLawsuitComplete;
    // });
    
    if (confirm("ยืนยันการทำรายการหรือไม่")) {
      this.preLoaderService.setShowPreloader(true);
      if (IsLawsuitComplete == 1) {
        // // set false
        this.navService.setEditField(true);
        this.navService.setEditButton(true);
        this.navService.setPrintButton(true);
        this.navService.setDeleteButton(true);
        // set true
        this.navService.setSaveButton(false);
        this.navService.setCancelButton(false);
        
        await this.ArrestgetByCon(this.IndictmentID, this.LawsuitID);
      } else {
        let round = 1;
        LawsuitArrestIndicmentDetail.forEach(detail => {
          this.lawsuitService.GetArrestIndicmentDetailgetByCon(detail.IndictmentDetailID).then(result => {
            console.log('result====>', result);
            if (result.LawsuitJudgement) {
              result.LawsuitJudgement.forEach(judge => {
                if(judge.LawsuitType != 0){
                  this.lawsuitService.LawsuitJudgementupdDelete(judge.JudgementID).then((deleteres)=>{
                    console.log(deleteres)
                  }).catch((error)=>{
                    console.log(error)
                  })
                }else{
                  this.preLoaderService.setShowPreloader(false);
                  this.router.navigate(['/lawsuit/list']);
                }
                if(judge.isFine == 1){
                  judge.LawsuitPaymentFine.forEach(paymentres => {
                    this.lawsuitService.LawsuitPaymentFineDetailupdDelete(paymentres.PaymentFineID).then((deleteres)=>{
                      console.log(deleteres)
                    }).catch((error)=>{
                      console.log(error)
                    })
                  });
                  
                }else{
                  this.preLoaderService.setShowPreloader(false);
                  this.router.navigate(['/lawsuit/list']);
                }
              });
            }
          });
        })
        if(round >= LawsuitArrestIndicmentDetail.length){
          // this.ngOnInit();
          
          this.preLoaderService.setShowPreloader(false);
          // // set false
          this.navService.setEditField(true);
          this.navService.setEditButton(true);
          this.navService.setPrintButton(true);
          this.navService.setDeleteButton(true);
          // set true
          this.navService.setSaveButton(false);
          this.navService.setCancelButton(false);
        }
      }
      
    } else {
      return
    }
  }

  private async onSave() {
    this.preLoaderService.setShowPreloader(true);
    let IsLawsuitComplete = this.lawsuitList[0]['IsLawsuitComplete'];
    console.log("IsLawsuitComplete -> ", this.lawsuitList[0]['IsLawsuitComplete'])
    /// save IsLawsuitComplete = 1
    if (IsLawsuitComplete == 1) {
      const lawsuitNo = this.lawsuitForm.controls['LawsuitNo'].value + '/' + this.lawsuitForm.controls['LawsuitNoSub'].value;
      const isOut = this.lawsuitForm.controls['IsOutsideCheck'].value === true ? 1 : 0;
      let VerifyLawsuitNo = await this.lawsuitService.LawsuitVerifyLawsuitNo(lawsuitNo, this.lawsuitForm.controls['officeCode'].value, isOut)
      if (VerifyLawsuitNo.length != 0) {
        alert("เลขคดีรับคำกล่าวโทษซ้ำ กรุณา กรอกใหม่");
        this.preLoaderService.setShowPreloader(false);
        return;
      } else {
        !this.lawsuitForm.get('LawsuitDate').valid ? alert("กรุณากรอกวันที่รับคดีใหม่") : null;
        !this.lawsuitForm.get('LawsuitTime').valid ? alert("กรุณากรอกเวลาที่รับคดีใหม่") : null;
        let _masStaffList = this.masStaffList;
        let result = _masStaffList.filter(item => (item.FullName == this.lawsuitForm.get('FullName').value));
        !result ? alert("กรุณากรอกผู้รับคดีใหม่") : null;
        !this.lawsuitForm.get('PositionName').valid ? alert("กรุณากรอกตำแหน่งใหม่") : null;
        !this.lawsuitForm.get('DepartmentName').valid ? alert("กรุณากรอกหน่วยงานใหม่") : null;
        !this.lawsuitForm.get('LawsuitStation').valid ? alert("กรุณากรอกสถานที่เขียนใหม่") : null;
        !this.lawsuitForm.get('AccuserTestimony').valid ? alert("กรุณากรอกคำให้การใหม่") : null;
        await this.lawsuitService.LawsuitArrestIndicmentDetailupdByCon(this.lawsuitList[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'][0].IndictmentDetailID, this.LawsuitTableList.value[0].LawsuitType, this.LawsuitTableList.value[0].LawsuitEnd)
        if(this.lawsuitList[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'][0]['LawsuitType'] == 0) {
          let updByCon = await this.lawsuitService.LawsuitupdByCon(this.LawsuitID, lawsuitNo)
          if(updByCon.IsSuccess == "True") {
            alert("บันทึกสำเร็จ")
            let checkComplete = await this.lawsuitService.LawsuitArrestCheckNotComplete(this.lawsuitArrestForm.controls['ArrestCode'].value)
            checkComplete ? console.log("ILG60-04-02-03-00") : console.log("none")
          }
        } else {
          await this.lawsuitService.LawsuitArrestupdByCon(this.lawsuitArrestForm.value.ArrestCode)
          let lawsuitID = await this.lawsuitService.LawsuitArrestgetByCon(this.IndictmentID)
          if (lawsuitID[0].LawsuitArrestIndicment[0].Lawsuit[0].LawsuitID > 0) {
            this.router.navigate(['/lawsuit/manage', 'R'], {
              queryParams: { IndictmentID: this.IndictmentID, LawsuitID: lawsuitID[0].LawsuitArrestIndicment[0].Lawsuit[0].LawsuitID }
            });
          }

        }
        this.preLoaderService.setShowPreloader(false);
      }
    }
    /// save IsLawsuitComplete = 0
    else {
      let lawsuitNo = this.lawsuitForm.controls['LawsuitNo'].value + '/' + this.lawsuitForm.controls['LawsuitNoSub'].value;
      let isOut = this.lawsuitForm.controls['IsOutsideCheck'].value ? 1 : 0;
      let isLaw = this.lawsuitForm.controls['IsLawsuitCheck'].value ? 0 : 1;
      return await this.lawsuitService.LawsuitVerifyLawsuitNo(lawsuitNo, this.lawsuitForm.controls['officeCode'].value, isOut).then(async res => {
        if (res.length != 0) {
          alert("เลขคดีรับคำกล่าวโทษซ้ำ กรุณา กรอกใหม่");
          this.preLoaderService.setShowPreloader(false);
          return;
        } else {
          let _lawDate = (this.lawsuitForm.controls['LawsuitDate'].value)
          let tempLawsuitStaff = [];
          tempLawsuitStaff.push({
            "StaffID": '',
            "ProgramCode": "XCS-60",
            "ProcessCode": "XCS-60-001",
            "LawsuitID": this.LawsuitID,
            "StaffCode": this.LawsuitStaffOnsave.StaffCode,
            "TitleName": this.LawsuitStaffOnsave.TitleName,
            "FirstName": this.LawsuitStaffOnsave.FirstName,
            "LastName": this.LawsuitStaffOnsave.LastName,
            "PositionCode": "",
            "PositionName": this.lawsuitForm.controls['PositionName'].value,
            "PosLevel": this.LawsuitStaffOnsave.PosLevel,
            "PosLevelName": this.LawsuitStaffOnsave.PosLevelName,
            "DepartmentCode": "",
            "DepartmentName": "",
            "DepartmentLevel": this.LawsuitStaffOnsave.DeptLevel,
            "OfficeCode": this.LawsuitStaffOnsave.OfficeCode,
            "OfficeName": this.LawsuitStaffOnsave.OfficeName,
            "OfficeShortName": this.LawsuitStaffOnsave.OfficeShortName,
            "ContributorID": 12,
            "IsActive": this.LawsuitStaffOnsave.IsActive
          })

          const json = {
            "LawsuitID": this.LawsuitID,
            "IndictmentID": this.IndictmentID,
            "IsLawsuit": isLaw ,
            "ReasonDontLawsuit": this.lawsuitForm.controls['ReasonDontLawsuit'].value ? this.lawsuitForm.controls['ReasonDontLawsuit'].value : null,
            "LawsuitNo": lawsuitNo,
            "LawsuitDate": _lawDate.jsdate,
            "LawsuitTime": this.lawsuitForm.controls['LawsuitTime'].value,
            "LawsuitStationCode": '',
            "LawsuitStation": this.lawsuitForm.controls['LawsuitStation'].value,
            "IsOutside": isOut,
            "AccuserTestimony": this.lawsuitForm.controls['AccuserTestimony'].value,
            "LawsuitResult": '',
            "DeliveryDocNo": '',
            "DeliveryDate": _lawDate.jsdate,
            "IsActive": 1,
            "LawsuitType": this.LawsuitTableList.value[0].LawsuitType,
            "LawsuitEnd": this.LawsuitTableList.value[0].LawsuitEnd,
            "LawsuitStaff": tempLawsuitStaff
          }
          console.log(json)
          if (this.lawsuitForm.controls['LawsuitTableList'].value.length == 0) {
            json.LawsuitType = 2
            json.LawsuitEnd = 2
            await this.lawsuitService.LawsuitinsAll(json).then(async response => {
              if (response.IsSuccess == "True") {
                alert("บันทึกสำเร็จ");
                console.log('response', response);
              }
            });
          } else {
            // await this.lawsuitService.LawsuitArrestIndicmentDetailupdByCon(this.lawsuitList[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'][0].IndictmentDetailID, this.LawsuitTableList.value[0].LawsuitType, this.LawsuitTableList.value[0].LawsuitEnd)
            await this.lawsuitService.GetArrestIndicmentDetailgetByCon(this.lawsuitList[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'].IndictmentDetailID).then(async response => {
              if (response.LawsuitJudgement.length != 0) {
                console.log(response)
              } else {
                await this.lawsuitService.LawsuitinsAll(json).then(async result => {
                  if (result.IsSuccess == "True") {
                    alert("บันทึกสำเร็จ");
                    await this.lawsuitService.LawsuitArrestIndicmentupdByCon(this.IndictmentID)
                    await this.lawsuitService.LawsuitArrestIndicmentDetailupdByCon(this.lawsuitList[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'][0].IndictmentDetailID, this.LawsuitTableList.value[0].LawsuitType, this.LawsuitTableList.value[0].LawsuitEnd)
                    let checkComplete = await this.lawsuitService.LawsuitArrestCheckNotComplete(this.lawsuitArrestForm.controls['ArrestCode'].value)
                    console.log(checkComplete)
                    if (checkComplete.length != 0) {
                      // ให้เด้งป๊อบอัพ
                    } else {
                      await this.lawsuitService.LawsuitArrestupdByCon(this.lawsuitArrestForm.value.ArrestCode)
                      this.showEditField = false;
                      let lawsuitID = await this.lawsuitService.LawsuitArrestgetByCon(this.IndictmentID)
                      if (lawsuitID[0].LawsuitArrestIndicment[0].Lawsuit[0].LawsuitID > 0) {
                        this.router.navigate(['/lawsuit/manage', 'R'], {
                          queryParams: { IndictmentID: this.IndictmentID, LawsuitID: lawsuitID[0].LawsuitArrestIndicment[0].Lawsuit[0].LawsuitID }
                        });
                      }

                      location.reload();
                    }
                    this.preLoaderService.setShowPreloader(false);
                    // location.reload();
                  } else {
                    console.log("not success")
                    this.preLoaderService.setShowPreloader(false);

                  }
                });
              }
            })

          }
          this.preLoaderService.setShowPreloader(false);
        }

      });
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
      EntityType: new FormControl(null),
      LawbreakerType: new FormControl(null),
      LawsuitNoRef: new FormControl(null),
      LawBrakerFullName: new FormControl(null),
      LawsuitType: new FormControl(null, Validators.required),
      LawsuitEnd: new FormControl(null, Validators.required),
      ProductDesc: new FormControl(null),
    })

  }
  private setItemFormArray(array: any[], formControl: string, formGroup: FormGroup) {
    if (array !== undefined && array.length) {
      const itemFGs = array.map(item => this.fb.group(item));
      console.log("ITEMFGS" + array);
      const itemFormArray = this.fb.array(itemFGs);
      formGroup.setControl(formControl, itemFormArray);
    }
  }

  private createLawsuitForm() {

    this.lawsuitForm = this.fb.group({
      IsLawsuitCheck: new FormControl(null),
      ReasonDontLawsuit: new FormControl(null),
      IsOutsideCheck: new FormControl(false),
      LawsuitDate: new FormControl(null, Validators.required),
      LawsuitTime: new FormControl(null, Validators.required),
      FullName: new FormControl(null, Validators.required),
      PositionName: new FormControl(null, Validators.required),
      DepartmentName: new FormControl(null, Validators.required),
      LawsuitStation: new FormControl(null, Validators.required),
      AccuserTestimony: new FormControl(null, Validators.required),
      LawsuitNo: new FormControl(null, Validators.required),
      LawsuitNoSub: new FormControl(null, Validators.required),
      LawsuitStaff: this.fb.array([this.createStaffForm()]),
      LawsuitTableList: this.fb.array([this.createTableListForm()]),
      LawsuitDocument: this.fb.array([]),
      officeCode: new FormControl(null),
    });
  }
  private async ArrestgetByCon(IndictmentID: string, LawsuitID: number) {
    this.preLoaderService.setShowPreloader(true);
    let ArrestIndictmentProduct = await this.lawsuitService.LawsuitArrestIndictmentProductgetByIndictmentID(IndictmentID)
    if (ArrestIndictmentProduct.length != 0) {
      console.log('ArrestIndictmentProduct page reload step 1 in line 976 ===>', ArrestIndictmentProduct)
      this.LawsuitArrestIndictmentProduct = ArrestIndictmentProduct;
      this.LawsuitArrestIndictmentProductTableListShow = true;
    }
    await this.lawsuitService.LawsuitArrestGetByCon(IndictmentID).then(async res => {
      this.lawsuitList = res ? res : [];
      this.lawsuitFormNoData = true;
      console.log('LawsuitArrestGetByCon page reload step 2 in line 983 ', res);
      if (res.length != 0) {
        await this.lawsuitService.MasStaffMaingetAll().then(masstaff => {
          const _masstaff = masstaff;
          _masstaff.map(item => {
            item.FullName = `${item.TitleName} ${item.FirstName} ${item.LastName}`
          });
          this.masStaffList = _masstaff || [];
        });
        await this.lawsuitService.MasOfficeMaingetAll().then(masoffice => {
          this.masOfficeList = masoffice || [];
        });
        /// set form lawsuitArrest
        await this.lawsuitArrestForm.reset({
          ArrestCode: res[0]['ArrestCode'],
          OccurrenceDate: toLocalShort(res[0]['OccurrenceDate']),
          OccurrenceTime: res[0]['OccurrenceTime'],
          ArrestStation: res[0]['ArrestStation'],
          SubSectionType: res[0]['LawsuitArrestIndicment'][0]['LawsuitLawGuiltbase'][0]['LawsuitLawSubSectionRule'][0]['LawsuitLawSubSection'][0]['SubSectionType'],
          GuiltBaseName: res[0]['LawsuitArrestIndicment'][0]['LawsuitLawGuiltbase'][0]['GuiltBaseName'],
          SectionNo: res[0]['LawsuitArrestIndicment'][0]['LawsuitLawGuiltbase'][0]['LawsuitLawSubSectionRule'][0]['SectionNo'],
          PenaltyDesc: res[0]['LawsuitArrestIndicment'][0]['LawsuitLawGuiltbase'][0]['LawsuitLawSubSectionRule'][0]['LawsuitLawSection'][0]['LawsuitLawPenalty'][0]['PenaltyDesc'],
        });
        console.log('lawsuitArrestForm show ===> ', this.lawsuitArrestForm.value)

        const arreststaff = res[0]['LawsuitArrestStaff'].filter(item => item.IsActive == 1 && item.ContributorID == 6);
        await arreststaff.map(item => { item.FullName = `${item.TitleName} ${item.FirstName} ${item.LastName}` });

        console.log("arreststaff ==> ", arreststaff);
        /// set LawsuitArrestStaff to lawsuitArrestForm
        this.setItemFormArray(arreststaff, 'LawsuitArrestStaff', this.lawsuitArrestForm);
        /// Check LawsuitComplete status
        this.disabled = true;
        let IsLawsuitComplete = res[0]['IsLawsuitComplete'];
        console.log('IsLawsuitComplete==>', IsLawsuitComplete)

        /// LawsuitComplete status = 1
        if (IsLawsuitComplete == 1) {
          if (res[0]['LawsuitArrestIndicment'][0]['Lawsuit'].length != 0) {
            await this.lawsuitService.MasDocumentMaingetAll(4, res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitID'])
            let islaw = res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['IsLawsuit'] ? 1 : 0;
            let IsLawsuitCheck = true;
            if (islaw == 1) {
              IsLawsuitCheck = false;
              this.lawsuitForm.controls['ReasonDontLawsuit'].setValue('');
            }
            let isout = res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['IsOutside'];
            let IsOutsideCheck = false;
            if (isout == 1) {
              IsOutsideCheck = true;
            }

            const staff = res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitStaff'].filter(item => item.IsActive == 1);
            await staff.map(item => { item.FullName = `${item.TitleName} ${item.FirstName} ${item.LastName}` });
            const lawsuitNoArr = res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitNo'].split('/');
            const _lawsuitDate = new Date(res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitDate']);
            try {
              await this.lawsuitForm.reset({
                IsLawsuitCheck: IsLawsuitCheck,
                ReasonDontLawsuit: res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['ReasonDontLawsuit'],
                IsOutsideCheck: IsOutsideCheck,
                LawsuitNo: lawsuitNoArr[0],
                LawsuitNoSub: lawsuitNoArr[1],
                LawsuitDate: {
                  date: {
                    day: _lawsuitDate.getDate(),
                    month: _lawsuitDate.getMonth() + 1,
                    year: _lawsuitDate.getFullYear(),
                  }
                },
                LawsuitTime: res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitTime'],
                LawsuitStation: res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitStation'],
                AccuserTestimony: res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['AccuserTestimony'],
                FullName: staff[0].FullName,
                PositionName: staff[0].PositionName,
                DepartmentName: staff[0].OfficeShortName,
                officeCode: staff[0].officeCode,
              });
            }
            catch (e) {
              console.log('error==>', e)
            }
            if (islaw == 1) {
              this.lawsuitForm.controls['ReasonDontLawsuit'].setValue('');
              this.lawsuitForm.controls['ReasonDontLawsuit'].clearValidators()
            }
            //this.setItemFormArray(staff, 'LawsuitStaff', this.lawsuitForm);
          }
          let IsProve = res[0]['LawsuitArrestIndicment'][0].IsProve;
          let IsLawsuitComplete = res[0]['LawsuitArrestIndicment'][0].IsLawsuitComplete;
          let arrList = [];
          console.log('resposne ise=====>', res[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'])
          await res[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'].map(item => {
            this.LawsuitTableListShow = true;
            item['LawsuitArrestLawbreaker'].map(arrestLaw => {
              const middleName = (arrestLaw.LawbreakerMiddleName) ? arrestLaw.LawbreakerMiddleName : '';
              console.log('middleName', middleName)
              item.lawBrakerFullName = `${arrestLaw.LawbreakerTitleName} ${arrestLaw.LawbreakerFirstName} ${middleName} ${arrestLaw.LawbreakerLastName}`
            });

            /// add LawsuitTableList
            if (item.LawsuitArrestProductDetail != null && item.LawsuitArrestProductDetail.length) {
              item.ProductDesc = item.LawsuitArrestProductDetail.ProductProductDesc;
            } else {
              item.ProductDesc = '';
            }

            let a = {
              'EntityType': "",
              'LawbreakerType': "",
              'LawsuitNoRef': "",
              'IndictmentDetailID': item.IndictmentDetailID,
              'LawBrakerFullName': item.lawBrakerFullName,
              'LawsuitType': item.LawsuitType,
              'LawsuitEnd': item.LawsuitEnd,
              'ProductDesc': item.ProductProductDesc,
              'IsProve': IsProve,
              'IsLawsuitComplete': IsLawsuitComplete,
            };
            /// add EntityType
            console.log('item EntityType===>', item)

            if (item.LawsuitArrestLawbreaker[0] && item.LawsuitArrestLawbreaker[0].EntityType == 1) {
              a.EntityType = 'บุคคลธรรมดา';
            } else if (item.LawsuitArrestLawbreaker[0] && item.LawsuitArrestLawbreaker[0].EntityType == 2) {
              a.EntityType = 'นิติบุคคล';
            }
            /// add LawbreakerType
            if (item.LawsuitArrestLawbreaker[0] && item.LawsuitArrestLawbreaker[0].LawbreakerType == 1) {
              a.LawbreakerType = 'คนไทย';
            } else if (item.LawsuitArrestLawbreaker[0] && item.LawsuitArrestLawbreaker[0].LawbreakerType == 0) {
              a.LawbreakerType = 'ต่างชาติ';
            }
            /// add LawsuitNoRef
            console.log('item.LawsuitArrestLawbreaker[0]===>', item.LawsuitArrestLawbreaker[0])
            if (item.LawsuitArrestLawbreaker[0] && item.LawsuitArrestLawbreaker[0].LawbreakerType == 1) {
              a.LawsuitNoRef = item.LawsuitArrestLawbreaker[0].IDCard;
            } else if (item.LawsuitArrestLawbreaker[0] == 1 && item.LawsuitArrestLawbreaker[0].LawbreakerType == 0) {
              a.LawsuitNoRef = item.LawsuitArrestLawbreaker[0].PassportNo;
            } else {
              if (item.LawsuitArrestLawbreaker[0]) {
                a.LawsuitNoRef = item.LawsuitArrestLawbreaker[0].CompanyRegistrationNo;
              }
            }
            arrList.push(a)
          });

          console.log('LawsuitTableList===>', arrList)

          this.setItemFormArray(arrList, 'LawsuitTableList', this.lawsuitForm);
          /// create data management button
          let isProve = res[0]['LawsuitArrestIndicment'][0]['IsProve'];
          let lawsuitType = res[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'][0]['LawsuitType'];
          console.log('+++IsLawsuitComplete', IsLawsuitComplete);
          console.log(arrList)

          /// LawsuitComplete status = 0
        } else {
          if (res[0]['LawsuitArrestIndicment'][0]['Lawsuit'].length != 0) {
            this.setlawsuitForm(res)
          }
          
          let IsProve = res[0]['LawsuitArrestIndicment'][0].IsProve;
          let IsLawsuitComplete = res[0]['LawsuitArrestIndicment'][0].IsLawsuitComplete;
          let arrList = [];
          console.log('LawsuitArrestIndicment', res[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'])
          await res[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'].map(item => {

            this.LawsuitTableListShow = true;
            item['LawsuitArrestLawbreaker'].map(arrestLaw => {
              const middleName = (arrestLaw.LawbreakerMiddleName) ? arrestLaw.LawbreakerMiddleName : '';
              console.log('middleName', middleName)
              item.lawBrakerFullName = `${arrestLaw.LawbreakerTitleName ? arrestLaw.LawbreakerTitleName : ""} ${arrestLaw.LawbreakerFirstName} ${middleName} ${arrestLaw.LawbreakerLastName}`
              console.log(item.lawBrakerFullName)
            });

            /// add LawsuitTableList
            if (item.LawsuitArrestProductDetail != null && item.LawsuitArrestProductDetail.length) {
              item.ProductDesc = item.LawsuitArrestProductDetail.ProductProductDesc;
            } else {
              item.ProductDesc = '';
            }
            console.log(item.LawsuitType)
            console.log(item.LawsuitEnd)

            let a = {
              'EntityType': "",
              'LawbreakerType': "",
              'LawsuitNoRef': "",
              'IndictmentDetailID': item.IndictmentDetailID,
              'LawBrakerFullName': item.lawBrakerFullName,
              'LawsuitType': item.LawsuitArrestLawbreaker[0] ? item.LawsuitType : 2,
              'LawsuitEnd': item.LawsuitArrestLawbreaker[0] ? item.LawsuitEnd : 2,
              'ProductDesc': item.ProductProductDesc,
              'IsProve': IsProve,
              'IsLawsuitComplete': IsLawsuitComplete,
            };
            /// add EntityType
            console.log('item EntityType===>', item.LawsuitArrestLawbreaker[0])

            if (item.LawsuitArrestLawbreaker[0] && item.LawsuitArrestLawbreaker[0].EntityType == 1) {
              a.EntityType = 'บุคคลธรรมดา';
            } else if (item.LawsuitArrestLawbreaker[0] && item.LawsuitArrestLawbreaker[0].EntityType == 2) {
              a.EntityType = 'นิติบุคคล';
            }
            /// add LawbreakerType
            if (item.LawsuitArrestLawbreaker[0] && item.LawsuitArrestLawbreaker[0].LawbreakerType == 1) {
              a.LawbreakerType = 'คนไทย';
            } else if (item.LawsuitArrestLawbreaker[0] && item.LawsuitArrestLawbreaker[0].LawbreakerType == 0) {
              a.LawbreakerType = 'ต่างชาติ';
            }
            /// add LawsuitNoRef
            console.log('item.LawsuitArrestLawbreaker[0]===>', item.LawsuitArrestLawbreaker[0])
            if (item.LawsuitArrestLawbreaker[0] && item.LawsuitArrestLawbreaker[0].LawbreakerType == 1) {
              a.LawsuitNoRef = item.LawsuitArrestLawbreaker[0].IDCard;
            } else if (item.LawsuitArrestLawbreaker[0] && item.LawsuitArrestLawbreaker[0].LawbreakerType == 0) {
              a.LawsuitNoRef = item.LawsuitArrestLawbreaker[0].PassportNo;
            } else {
              if (item.LawsuitArrestLawbreaker[0]) {
                a.LawsuitNoRef = item.LawsuitArrestLawbreaker[0].CompanyRegistrationNo;
              }
            }
            arrList.push(a)
          });

          this.setItemFormArray(arrList, 'LawsuitTableList', this.lawsuitForm);
          /// load  MasStaffMaingetAll and  MasOfficeMaingetAll for full text search

          console.log('IsLawsuitComplete ==== 0')
        }

      } else {
        console.log(res.length)
        this.lawsuitFormNoData = false
      }
    });

    this.preLoaderService.setShowPreloader(false);
  }
  async setlawsuitForm(res) {
    /// get IsLawsuit check box (IsLawsuitCheck)
    // console.log('setlawsuitForm',res)
    let islaw = res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['IsLawsuit'] ? 1 : 0;
    let IsLawsuitCheck = true;
    if (islaw == 1) {
      IsLawsuitCheck = false;
      this.lawsuitForm.controls['ReasonDontLawsuit'].setValue('');
    } else {
      IsLawsuitCheck = true;
    }

    let isout = res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['IsOutside'];
    let IsOutsideCheck = true;
    if (isout == 1) {
      IsOutsideCheck = true;
    } else {
      IsOutsideCheck = false
    }

    ///set lawsuitForm
    const staff = res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitStaff'].filter(item => item.IsActive == 1);
    await staff.map(item => { item.FullName = `${item.TitleName} ${item.FirstName} ${item.LastName}` });
    const lawsuitNoArr = res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitNo'].split('/');
    const _lawsuitDate = new Date(res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitDate']);
    try {
      await this.lawsuitForm.reset({
        IsLawsuitCheck: IsLawsuitCheck,
        ReasonDontLawsuit: res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['ReasonDontLawsuit'],
        IsOutsideCheck: IsOutsideCheck,
        LawsuitNo: lawsuitNoArr[0],
        LawsuitNoSub: lawsuitNoArr[1],
        LawsuitDate: {
          date: {
            day: _lawsuitDate.getDate(),
            month: _lawsuitDate.getMonth() + 1,
            year: _lawsuitDate.getFullYear(),
          }
        },
        LawsuitTime: res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitTime'],
        LawsuitStation: res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitStation'],
        AccuserTestimony: res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['AccuserTestimony'],
        FullName: staff[0].FullName,
        PositionName: staff[0].PositionName,
        DepartmentName: staff[0].OfficeShortName,
        officeCode: staff[0].officeCode,
      });
    }
    catch (e) {
      console.log('error==>', e)
    }
    if (islaw == 1) {
      this.lawsuitForm.controls['ReasonDontLawsuit'].setValue('');
      this.lawsuitForm.controls['ReasonDontLawsuit'].clearValidators()
    }
  }

  onChangeFullname(textSearch) {
    let _masStaffList = this.masStaffList;
    if (textSearch) {
      let result = _masStaffList.filter(item => (item.FullName.includes(textSearch))).slice(0, 10);
      this.suggestions = result;
      if (result.length == 1) {
        this.lawsuitForm.controls['PositionName'].setValue(this.validateData(result[0].OperationPosName));
        this.lawsuitForm.controls['DepartmentName'].setValue(this.validateData(result[0].OfficeShortName));
        this.lawsuitForm.controls['officeCode'].setValue(this.validateData(result[0].OfficeCode));
      } else {
        this.lawsuitForm.controls['PositionName'].setValue('');
        this.lawsuitForm.controls['DepartmentName'].setValue('');
        this.lawsuitForm.controls['officeCode'].setValue('');
      }
    } else {
      this.lawsuitForm.controls['PositionName'].setValue('');
      this.lawsuitForm.controls['DepartmentName'].setValue('');
      this.lawsuitForm.controls['officeCode'].setValue('');
    }
  }
  onChangeFullnameReslut(text) {
    this.LawsuitStaffOnsave = text
    this.lawsuitForm.controls['FullName'].setValue(this.validateData(text.FullName));
    this.lawsuitForm.controls['PositionName'].setValue(this.validateData(text.OperationPosName));
    this.lawsuitForm.controls['DepartmentName'].setValue(this.validateData(text.OfficeShortName));
    this.lawsuitForm.controls['officeCode'].setValue(text.OfficeCode);
    this.suggestions = [];
  }
  onChangeStation(textSearch) {
    this.LawsuitLocationOnSave = textSearch
    let _masOfficeList = this.masOfficeList;
    console.log('masOfficeList==>', this.masOfficeList);
    if (textSearch) {
      let result = _masOfficeList.filter(item => (item.OfficeName.includes(textSearch))).slice(0, 10);
      console.log('result', result);
      this.suggestionsStation = result;
    }
  }
  onChangeStationReslut(text) {
    this.lawsuitForm.controls['LawsuitStation'].setValue(this.validateData(text.OfficeName));
    this.suggestionsStation = [];
  }
  isLawsuitCheckReq() {
    if (this.lawsuitForm.controls['IsLawsuitCheck'].value === true) {
      this.lawsuitForm.controls['ReasonDontLawsuit'].setValidators([Validators.required]);
      this.lawsuitForm.controls['IsOutsideCheck'].setValue(false);
    } else {
      this.lawsuitForm.controls['ReasonDontLawsuit'].clearValidators();
    }
    // this.form.controls["firstName"].setValidators([Validators.minLength(1), Validators.maxLength(30)]);
  }
  IsOutsideCheckReq() {
    if (this.lawsuitForm.controls['IsOutsideCheck'].value === true) {
      this.lawsuitForm.controls['ReasonDontLawsuit'].clearValidators();
      this.lawsuitForm.controls['IsLawsuitCheck'].setValue(false);
    }
  }
  public validateData = function (data) {
    if (data) {
      return data;
    }
    return '';
  }
  onBlurFullname() {
    console.log('blur')
    setTimeout(() => {

      this.suggestions = [];
    }, 500);

  }
  onBlurOfficename() {
    console.log('blur')
    setTimeout(() => {

      this.suggestionsStation = [];
    }, 500);

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
      DepartmentName: `${e.item.OfficeShortName || e.item.OfficeName}`,
      ContributorCode: e.item.ContributorCode || 2,
      ContributorID: e.item.ContributorID || 1
    })
  }

  addDocument() {
    const lastIndex = this.LawsuitDocument.length - 1;
    let document = new LawsuitDocument();
    document.IsNewItem = true;
    document.DocumentName = "";
    document.FilePath = "";
    if (lastIndex < 0) {
      this.LawsuitDocument.push(this.fb.group(document));
    } else {
      const lastDoc = this.LawsuitDocument.at(lastIndex).value;
      if (lastDoc.DocumentName && lastDoc.FilePath) {
        this.LawsuitDocument.push(this.fb.group(document));
      }
    }
  }

  onDeleteDocument(index) {
    this.LawsuitDocument.removeAt(index);
  }

  changeNoticeDoc(e: any, index: number) {
    let reader = new FileReader();
    let file = e.target.files[0];
    console.log(file);
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

  viewData(item) {
    ///###change path to lawsuit detail
    console.log('viewData===>', item);
    const dialogRef = this.dialog.open(DialogJudgment, {
      width: '90%',
      maxWidth: 'none',
    });

    dialogRef.afterClosed().subscribe(async result => {

        await this.ArrestgetByCon(this.IndictmentID, this.LawsuitID);
    });
    // this.router.navigate(["/lawsuit/detail", "R"], {
    //   queryParams: {
    //     ArrestCode: this.lawsuitList[0].ArrestCode,
    //     IndictmentDetailID: item.controls['IndictmentDetailID'].value,
    //     IndictmentID: this.IndictmentID,
    //   }
    // });
  }



 async editTable(item: any, index: number) {
    ///####use this value to get api
    // /item.controls['IndictmentDetailID'].value
    


    const dialogRef = this.dialog.open(DialogJudgment, {
      width: '90%',
      height: '95%',
      data: {
        lawsuitArrest: item,
        indicmentID: this.IndictmentID,
        dialogtype:'U'
      },

    });
    
    dialogRef.afterClosed().subscribe(result => {
      
    });
    // this.router.navigate(["/lawsuit/detail", "R"], {
    //   queryParams: {
    //     ArrestCode: this.lawsuitList[0].ArrestCode,
    //     IndictmentDetailID: item.controls['IndictmentDetailID'].value,
    //     IndictmentID: this.IndictmentID,
    //   }
    // });
  }


}


import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'dialog-judgment',
  templateUrl: 'dialog-judgment.html',
})
export class DialogJudgment {

  private indictmentID: string;
  private lawsuitID: number;
  public judgmentModel = new JudgmentModel();
  private disabled:boolean=false;
  private MasCourtListsuggestions = []
  private IsPayOnce:boolean=null;
  private LawsuitArrest:any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private lawsuitService: LawsuitService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private dialogRef: MatDialogRef<DialogJudgment>
  ) { }
  public validStatus = false;
  public isPayAll = null;
  public arrestData = [];
  public MasCourtList = []
  public lawsuitArrestFormDialog: FormGroup = new FormGroup({
      arrestName: new FormControl(Validators.required),
      CourtName: new FormControl(Validators.required),
      UndecidedCaseNo: new FormControl(Validators.required),
      DecidedCaseNo: new FormControl(Validators.required),
      JudgementNo: new FormControl(Validators.required),
      JudgementID: new FormControl(),
      JudgementDate: new FormControl(Validators.required),
      IsFine: new FormControl(),
      CourtFine: new FormControl(),
      IsImprison: new FormControl(),
      ImprisonTime: new FormControl(),
      ImprisonUnit: new FormControl(),
      IsPayOnce: new FormControl(),
      IsPayPeroid: new FormControl(),
      PaymentDate: new FormControl(),
      PaymentPeroid: new FormControl(),
      PaymentPeroidStartDate: new FormControl(),
      PaymentPeroidRound: new FormControl(),
      PaymentUnit: new FormControl(),
      
  });

  async ngOnInit() {
    console.log(this.data)
    this.arrestData = await this.lawsuitService.GetArrestIndicmentDetailgetByCon(this.data.lawsuitArrest.IndictmentDetailID)
    if(this.data.dialogtype == "U") {
      this.MasCourtList = await this.lawsuitService.MasCourtMaingetAll()
      
    }else{
      this.disabled = true;
    }
    await this.newForm();
    
    
    
    this.LawsuitArrest = await this.lawsuitService.LawsuitArrestGetByCon(this.data.indicmentID)
    
    // this.MasCourtList = await this.lawsuitService.MasCourtMaingetAll()
    console.log(this.MasCourtList)

    console.log(this.arrestData)
    console.log(this.LawsuitArrest)
  }

  newForm() {
    this.IsPayOnce = this.arrestData['IsPayOnce']
    
    if(this.arrestData['IsImprison']){
      this.lawsuitArrestFormDialog.get('ImprisonTime').enable() 
      this.lawsuitArrestFormDialog.get('ImprisonUnit').enable() 
    }else{
      this.lawsuitArrestFormDialog.get('ImprisonTime').disable() 
      this.lawsuitArrestFormDialog.get('ImprisonUnit').disable() 
    }
    if(this.arrestData['IsFine']){
      this.lawsuitArrestFormDialog.get('CourtFine').enable() 
    }else{
      this.lawsuitArrestFormDialog.get('CourtFine').disable()
    }
    let Fullname = this.arrestData['LawsuitArrestLawbreaker'][0].LawbreakerTitleName || '' + this.arrestData['LawsuitArrestLawbreaker'][0].LawbreakerFirstName + ' ' + this.arrestData['LawsuitArrestLawbreaker'][0].LawbreakerLastName
      
    this.lawsuitArrestFormDialog.controls['arrestName'].setValue(Fullname,Validators.required);
    this.lawsuitArrestFormDialog.controls['CourtName'].setValue(this.arrestData['CourtName'],Validators.required);
    this.lawsuitArrestFormDialog.controls['UndecidedCaseNo'].setValue(this.arrestData['UndecidedCaseNo'],Validators.required);
    this.lawsuitArrestFormDialog.controls['DecidedCaseNo'].setValue(this.arrestData['DecidedCaseNo'],Validators.required);
    this.lawsuitArrestFormDialog.controls['JudgementNo'].setValue(this.arrestData['JudgementNo'],Validators.required);
    this.lawsuitArrestFormDialog.controls['JudgementID'].setValue(this.arrestData['JudgementID']);
    this.lawsuitArrestFormDialog.controls['JudgementDate'].setValue(this.arrestData['JudgementDate'],Validators.required);
    this.lawsuitArrestFormDialog.controls['IsFine'].setValue(this.arrestData['IsFine']);
    this.lawsuitArrestFormDialog.controls['CourtFine'].setValue(this.arrestData['CourtFine']);
    this.lawsuitArrestFormDialog.controls['IsImprison'].setValue(this.arrestData['IsImprison']);
    this.lawsuitArrestFormDialog.controls['ImprisonTime'].setValue(this.arrestData['ImprisonTime']);
    this.lawsuitArrestFormDialog.controls['ImprisonUnit'].setValue(this.arrestData['ImprisonUnit']);
    this.lawsuitArrestFormDialog.controls['IsPayOnce'].setValue(this.arrestData['IsPayOnce']);
    this.lawsuitArrestFormDialog.controls['IsPayPeroid'].setValue(this.arrestData['IsPayPeroid']);
    this.lawsuitArrestFormDialog.controls['PaymentDate'].setValue(this.arrestData['PaymentDate']);
    this.lawsuitArrestFormDialog.controls['PaymentPeroid'].setValue(this.arrestData['PaymentPeroid']);
    this.lawsuitArrestFormDialog.controls['PaymentPeroidStartDate'].setValue(this.arrestData['PaymentPeroidStartDate']);
    this.lawsuitArrestFormDialog.controls['PaymentPeroidRound'].setValue(this.arrestData['PaymentPeroidRound']);
    this.lawsuitArrestFormDialog.controls['PaymentUnit'].setValue(this.arrestData['PaymentUnit']);
    return this.lawsuitArrestFormDialog
  }


  public closePopup = function () {
    this.dialogRef.close(DialogJudgment);
  }

  onChangeCourtName(textSearch) {
    let _MasCourtList = this.MasCourtList;
    if (textSearch) {
      let result = _MasCourtList.filter(item => (item.CourtName.includes(textSearch))).slice(0, 10);
      this.MasCourtListsuggestions = result;
      console.log(result)
      // if (result.length == 1) {
      //   this.lawsuitForm.controls['PositionName'].setValue(this.validateData(result[0].OperationPosName));
      //   this.lawsuitForm.controls['DepartmentName'].setValue(this.validateData(result[0].OfficeShortName));
      //   this.lawsuitForm.controls['officeCode'].setValue(this.validateData(result[0].OfficeCode));
      // } else {
      //   this.lawsuitForm.controls['PositionName'].setValue('');
      //   this.lawsuitForm.controls['DepartmentName'].setValue('');
      //   this.lawsuitForm.controls['officeCode'].setValue('');
      // }
    } else {
      // this.lawsuitForm.controls['PositionName'].setValue('');
      // this.lawsuitForm.controls['DepartmentName'].setValue('');
      // this.lawsuitForm.controls['officeCode'].setValue('');
    }
  }

  onChangeCourtNameResult(result){
    console.log(result)
    this.lawsuitArrestFormDialog.controls['CourtName'].setValue(this.validateData(result.CourtName))
    this.MasCourtListsuggestions = []
  }
  public validateData = function (data) {
    if (data) {
      return data;
    }
    return '';
  }

  onChangeFine(){
    let status = this.lawsuitArrestFormDialog.controls['IsFine'].value
    if(status){
      this.lawsuitArrestFormDialog.get('CourtFine').enable()
    }else{
      this.lawsuitArrestFormDialog.get('CourtFine').disable()
    }
  }

  onChangeImprison(){
    let status = this.lawsuitArrestFormDialog.controls['IsImprison'].value
    if(status){
      this.lawsuitArrestFormDialog.get('ImprisonTime').enable()
      this.lawsuitArrestFormDialog.get('ImprisonUnit').enable()
    }else{
      this.lawsuitArrestFormDialog.get('ImprisonTime').disable()
      this.lawsuitArrestFormDialog.get('ImprisonUnit').disable()
    }
  }

  

  onChangePayOnce(status){
    
    this.IsPayOnce = status
    if(!status){
      this.lawsuitArrestFormDialog.controls['PaymentDate'].setValue('')
      this.lawsuitArrestFormDialog.controls['IsPayOnce'].setValue(0)
    }else{
      this.lawsuitArrestFormDialog.controls['IsPayPeroid'].setValue(0)
      this.lawsuitArrestFormDialog.controls['PaymentPeroid'].setValue('')
      this.lawsuitArrestFormDialog.controls['PaymentPeroidStartDate'].setValue('')
      this.lawsuitArrestFormDialog.controls['PaymentPeroidRound'].setValue('')
      this.lawsuitArrestFormDialog.controls['PaymentUnit'].setValue('')
    }
  }

  validator(){

    !this.lawsuitArrestFormDialog.get('arrestName').valid ? alert("กรุณาเช็คชื่อผู้ต้องหาใหม่") : null;
    !this.lawsuitArrestFormDialog.get('UndecidedCaseNo').valid ? alert("กรุณากรอกหมายเลขคดีดำใหม่") : null;
    !this.lawsuitArrestFormDialog.get('DecidedCaseNo').valid ? alert("กรุณากรอกหมายเลขคดีแดงใหม่") : null;
    !this.lawsuitArrestFormDialog.get('JudgementNo').valid ? alert("กรุณากรอกคำพิพากษาฎีกาที่ใหม่") : null;
    !this.lawsuitArrestFormDialog.get('JudgementDate').valid ? alert("กรุณากรอกวันที่อ่านคดีพิพากษาใหม่") : null;
    let _MasCourtList = this.MasCourtList;
    let result = _MasCourtList.filter(item => (item.CourtName == this.lawsuitArrestFormDialog.get('CourtName').value));
    !result ? alert("กรุณาชื่อศาลใหม่") : null;
    
    if(this.lawsuitArrestFormDialog.valid){
      if(this.lawsuitArrestFormDialog.controls['IsFine'].value){
        this.lawsuitArrestFormDialog.controls['IsFine'].setValue(1);
      }else{
        this.lawsuitArrestFormDialog.controls['IsFine'].setValue(0);
      }
      if(this.lawsuitArrestFormDialog.controls['IsImprison'].value){
        this.lawsuitArrestFormDialog.controls['IsImprison'].setValue(1);
      }else{
        this.lawsuitArrestFormDialog.controls['IsImprison'].setValue(0);
      }
      return true
    }else{
      return false
    }
    
  }

  OnSave(){
    if(this.validator()){
      if(confirm('ยืนยันการทำรายการหรือไม่')){
        if(this.arrestData['JudgementID']){
          this.lawsuitService.LawsuitJudgementupdByCon(this.lawsuitArrestFormDialog.value)
          if(this.arrestData['PaymentFineID']){
            this.lawsuitService.LawsuitPaymentFineDetailupdDelete(this.arrestData['PaymentFineID'])
          }
          if(this.lawsuitArrestFormDialog.controls['IsFine'].value == 1){
            let count = this.LawsuitArrest[0].NoticeCode.length * (this.lawsuitArrestFormDialog.controls['IsPayOnce'].value == 1 ? 1 : this.lawsuitArrestFormDialog.controls['PaymentPeroid'].value);
            for (let index = 0; index < count; index++) {
              this.LawsuitArrest[0].LawsuitNotice.forEach(notice => {
                this.lawsuitService.LawsuitPaymentFineDetailinsAll(notice)
              });
              
            }
          }else{
            this.closePopup()
          }
        }else{
          this.lawsuitService.LawsuitJudgementinsAll(this.lawsuitArrestFormDialog.value).then((res)=>{
            if(res.Msg =='Complete'){
              if(this.lawsuitArrestFormDialog.controls['IsFine'].value == 1){
                let count = this.LawsuitArrest[0].LawsuitNotice.length * (this.lawsuitArrestFormDialog.controls['IsPayOnce'].value == 1 ? 1 : this.lawsuitArrestFormDialog.controls['PaymentPeroid'].value);
                for (let index = 0; index < count; index++) {
                  this.LawsuitArrest[0].LawsuitNotice.forEach(notice => {
                    this.lawsuitService.LawsuitPaymentFineDetailinsAll(notice)
                  });
                }
              }else{
                this.closePopup()
              }
            }else{
              alert(res.Msg)
            }
          }).catch((error)=>{
            alert(error)
          })
        }
        
        
      }
    }
    
  }

}
