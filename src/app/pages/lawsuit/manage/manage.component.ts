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

//   LawsuitArrestIndictmentProduct: FormGroup;
//   lawsuitArrestForm: FormGroup;
//   lawsuitForm: FormGroup;

//   show = {
//     LawsuitArrestIndictmentProductTable: false
//   }
//   @ViewChild('printDocModal') printDocModel: ElementRef;
//   constructor(
//     private activeRoute: ActivatedRoute,
//     private router: Router,
//     private fb: FormBuilder,
//     private navService: NavigationService,
//     private ngbModel: NgbModal,
//     private sidebarService: SidebarService,
//     private preLoaderService: PreloaderService,
//     private lawsuitService: LawsuitService,
//     public dialog: MatDialog
//   ) {
//     this.setShowButton();
//     this.modelLawsuitArrest()
//   }
//   async ngOnInit() {
//     this.sidebarService.setVersion('0.0.0.6');
//     await this.loadLawsuit();
//     await this.ArrestIndictmentProductgetByIndictmentID(this.IndictmentID)
//     await this.ArrestgetByCon(this.IndictmentID)

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
//     this.lawsuitArrestForm = new FormGroup({
//       ArrestCode: new FormControl(null, Validators.required),
//       OccurrenceDate: new FormControl(null),
//       OccurrenceTime: new FormControl(null, Validators.required),
//       ArrestStation: new FormControl(null, Validators.required),
//       SubSectionType: new FormControl(null, Validators.required),
//       GuiltBaseName: new FormControl(null, Validators.required),
//       SectionNo: new FormControl(null, Validators.required),
//       PenaltyDesc: new FormControl(null),
//       LawsuitArrestStaff: this.fb.array([this.createArrestStaffForm()]),
//     });
//   }
//   modellawsuit() {

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
//   private createArrestStaffForm(): FormGroup {
//     LawsuitArrestStaffFormControl.LawsuitID = new FormControl(this.LawsuitID);
//     return this.fb.group(LawsuitArrestStaffFormControl)
//   }
//   async ArrestIndictmentProductgetByIndictmentID(IndictmentID: string) {
//     await this.lawsuitService.LawsuitArrestIndictmentProductgetByIndictmentID(IndictmentID).then(async response => {
//       this.LawsuitArrestIndictmentProduct = response;

//       this.show.LawsuitArrestIndictmentProductTable = true;
//     });
//   }
//   async ArrestgetByCon(IndictmentID: string) {
//     await this.lawsuitService.LawsuitArrestGetByCon(IndictmentID).then(async response => {
//       if (response) this.lawsuitArrestForm = this.fb.group(response[0]);
//       // else this.lawsuitArrestForm = {};
//       console.log(response)
//     })
//   }
//   get LawsuitArrestStaff(): FormArray {
//     return (this.lawsuitArrestForm.get('LawsuitArrestStaff') as FormArray);
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
  lawsuitArrestForm: FormGroup;
  lawsuitForm: FormGroup;
  showEditField: Boolean;
  disabled: Boolean;
  isRequired: boolean;
  lawBrakerForm: FormArray;
  LawsuitArrestIndictmentProduct: any = [];
  LawsuitArrestIndictmentProductTableListShow = false;
  LawsuitTableListShow = false;
  fileToUpload: File = null;
  fileToUploadList: File[] = [];
  IsProve = 0;
  date_disabled = "disabled"
  private getDataFromListPage: any;
  private onPrintSubscribe: any;
  private onSaveSubscribe: any;
  private onCancelSubscribe: any;
  private onEditSubscribe: any;
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
    name: 'พนักงานฝ่ายปกครอง/พนักงายอัยการ',
  }];

  lawsuitTypeSelected: number;
  suggestions: any[] = [];
  suggestionsStation: any[] = [];
  private today = new Date();
  public LawsuitDateOptions: IMyDpOptions = {
    // other options...
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
    // console.log('lawsuitForm',this.lawsuitForm.get('LawsuitTableList'))
    return this.lawsuitForm.get('LawsuitTableList') as FormArray;
  }
  get LawsuitDocument(): FormArray {
    return this.lawsuitForm.get('LawsuitDocument') as FormArray;
  }

  async ngOnInit() {
    this.sidebarService.setVersion('0.0.0.6');
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
        // console.log('this.lawsuitForm.valid===>', this.findInvalidControls())
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
      this.IsProve = IsProve;
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
    let indictmentID: string;
    this.getDataFromListPage = this.activeRoute.queryParams.subscribe(
      params => {
        this.LawsuitID = params.LawsuitID;
        indictmentID = params.IndictmentID;
      }
    );

    let IsLawsuitComplete = 0;
    this.lawsuitService.LawsuitArrestGetByCon(indictmentID).then(res => {

      IsLawsuitComplete = res[0].LawsuitArrestIndicment[0].IsLawsuitComplete;
    });

    if (!confirm("ยืนยันการทำรายการหรือไม่")) {
      return;
    }
    if (IsLawsuitComplete == 1) {
      // this.ngOnInit();
      this.navService.setCancelButton(false);
      this.navService.setSaveButton(false);
      this.navService.setEditField(true);
      this.navService.showFieldEdit.subscribe(async p => {
        this.showEditField = true;
        this.ngOnInit();
      });
    } else {
      return;
      // wait for logical IsLawsuitComplete == 0
      this.lawsuitService.GetArrestIndicmentDetailgetByCon(indictmentID).then(result => {
        console.log('result====>', result);
        if (result.LawsuitJudgement) {

        } else {
          // this.ngOnInit();
          this.navService.setEditField(true);
          this.navService.showFieldEdit.subscribe(async p => {
            this.showEditField = true;

            // this.ngOnInit();
          });
        }
      });
      this.navService.setEditField(true);
      this.navService.setCancelButton(false);
      this.navService.setSaveButton(false);

    }
    this.navService.setPrintButton(true);
    this.navService.setDeleteButton(true);
    this.navService.setEditButton(true);
  }

  private async onSave() {
    this.preLoaderService.setShowPreloader(true);
    let IsLawsuitComplete = this.lawsuitList[0]['IsLawsuitComplete'];
    /// save IsLawsuitComplete = 1
    if (IsLawsuitComplete == 1) {
      /// check LawsuitNo on exite
      const lawsuitNo = this.lawsuitForm.controls['LawsuitNo'].value + '/' + this.lawsuitForm.controls['LawsuitNoSub'].value;
      // await this.lawsuitService.LawsuitVerifyLawsuitNo(this.lawsuitForm.controls['LawsuitNo'].value,
      await this.lawsuitService.LawsuitVerifyLawsuitNo(lawsuitNo,
        this.lawsuitForm.controls['officeCode'].value,
        this.lawsuitForm.controls['IsOutsideCheck'].value).then(async res => {
          if (res.length != 0) {
            alert("เลขคดีรับคำกล่าวโทษซ้ำ กรุณา กรอกใหม่");
            this.preLoaderService.setShowPreloader(false);
            return;
          }
        });

      /// check LawsuitDate
      if (!this.lawsuitForm.get('LawsuitDate').valid) {
        alert("กรุณากรอกวันที่รับคดีใหม่");
        this.preLoaderService.setShowPreloader(false);
        return;
      }
      /// check LawsuitTime
      if (!this.lawsuitForm.get('LawsuitTime').valid) {
        alert("กรุณากรอกเวลาที่รับคดีใหม่");
        this.preLoaderService.setShowPreloader(false);
        return;
      }

      /// check StaffID on exite in this.masStaffList)
      // if( this.lawsuitForm.get('FullName').value in this.masStaffList)
      let _masStaffList = this.masStaffList;
      let result = _masStaffList.filter(item => (item.FullName == this.lawsuitForm.get('FullName').value));
      if (!result) {
        alert("กรุณากรอกผู้รับคดีใหม่");
        this.preLoaderService.setShowPreloader(false);
        return;
      }

      /// check PositionName
      if (!this.lawsuitForm.get('PositionName').valid) {
        alert("กรุณากรอกตำแหน่งใหม่");
        this.preLoaderService.setShowPreloader(false);
        return;
      }
      /// check DepartmentName
      if (!this.lawsuitForm.get('DepartmentName').valid) {
        alert("กรุณากรอกหน่วยงานใหม่");
        this.preLoaderService.setShowPreloader(false);
        return;
      }
      /// check LawsuitStation
      if (!this.lawsuitForm.get('LawsuitStation').valid) {
        alert("กรุณากรอกสถานที่เขียนใหม่");
        this.preLoaderService.setShowPreloader(false);
        return;
      }
      /// check AccuserTestimony
      if (!this.lawsuitForm.get('AccuserTestimony').valid) {
        alert("กรุณากรอกคำให้การใหม่");
        this.preLoaderService.setShowPreloader(false);
        return;
      }
      ///edit LawsuitNo
      // await this.lawsuitService.LawsuitupdByCon(this.LawsuitID, this.lawsuitForm.controls['LawsuitNo'].value).then(async res=>{
      //   console.log(res);
      // })


      /// save IsLawsuitComplete = 0
    } else {
      const lawsuitNo = this.lawsuitForm.controls['LawsuitNo'].value + '/' + this.lawsuitForm.controls['LawsuitNoSub'].value;
      let isOut = 0;
      if (this.lawsuitForm.controls['IsOutsideCheck'].value) {
        isOut = 1;
      } else {
        isOut = 0;
      }
      // isOut => (isOut) ? '1' : '0';

      console.log('lawsuitNo==>', lawsuitNo);
      console.log('isOut==>', isOut)
      await this.lawsuitService.LawsuitVerifyLawsuitNo(lawsuitNo,
        this.lawsuitForm.controls['officeCode'].value,
        isOut).then(async res => {
          if (res.length != 0) {
            alert("เลขคดีรับคำกล่าวโทษซ้ำ กรุณา กรอกใหม่");
            this.preLoaderService.setShowPreloader(false);
            return;
          }
          // console.log('LawsuitDate', toLocalShort(this.lawsuitForm.controls['LawsuitDate'].value))
          const _lawDate = (this.lawsuitForm.controls['LawsuitDate'].value)
          const json =
          {
            "LawsuitID": this.LawsuitID,
            "IndictmentID": this.IndictmentID,
            "IsLawsuit": this.lawsuitForm.controls['IsLawsuitCheck'].value,
            "ReasonDontLawsuit": this.lawsuitForm.controls['ReasonDontLawsuit'].value,
            "LawsuitNo": this.lawsuitForm.controls['LawsuitNo'].value,
            "LawsuitDate": (_lawDate.date) + '/' + _lawDate.month + '/' + _lawDate.year,
            "LawsuitTime": this.lawsuitForm.controls['LawsuitTime'].value,
            "LawsuitStationCode": '',
            "LawsuitStation": this.lawsuitForm.controls['LawsuitStation'].value,
            "IsOutside": isOut,
            "AccuserTestimony": this.lawsuitForm.controls['AccuserTestimony'].value,
            "LawsuitResult": '',
            "DeliveryDocNo": '',
            "DeliveryDate": (_lawDate.date) + '/' + _lawDate.month + '/' + _lawDate.year,
            "IsActive": 1,
            "LawsuitType": this.LawsuitTableList.controls['LawsuitType'],
            "LawsuitEnd": this.LawsuitTableList.controls['LawsuitEnd'],
            // "LawsuiteStaff": [{
            //   "StaffID": '1',
            //   "ProgramCode": "XCS-60",
            //   "ProcessCode": "XCS-60-001",
            //   "LawsuitID": '',
            //   "StaffCode": "S000",
            //   "TitleName": "นาย",
            //   "FirstName": "ธวัชชัย", "LastName": "บิงขุนทด",
            //   "PositionCode": "P001", "PositionName": "ผู้ช านาญการ",
            //   "PosLevel": "01", "PosLevelName": "ระดับสูง",
            //   "DepartmentCode": "V001",
            //   "DepartmentName": "สตป",
            //   "DepartmentLevel": "1",
            //   "OfficeCode": "T001",
            //   "OfficeName": "สตป",
            //   "OfficeShortName": "สตป",
            //   "ContributorCode": "001",
            //   "IsActive": ''
            // }]
          }
          await this.lawsuitService.LawsuitinsAll(json).then(async response => {
            console.log('response', response);
          });
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
      //console.log("ITEMFGS" + itemFGs.values);
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
    /// get LawsuitArrestIndictmentProduct
    await this.lawsuitService.LawsuitArrestIndictmentProductgetByIndictmentID(IndictmentID).then(async res => {
      if (res.length != 0) {
        console.log(res)
        this.LawsuitArrestIndictmentProduct = res;
        this.LawsuitArrestIndictmentProductTableListShow = true;
      }
    });

    ///get  LawsuitArrest
    await this.lawsuitService.LawsuitArrestGetByCon(IndictmentID).then(async res => {
      this.lawsuitList = res || [];
      console.log('denden', res);

      if (res.length != 0) {
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
        /// concat name
        const arreststaff = res[0]['LawsuitArrestStaff'].filter(item => item.IsActive == 1 && item.ContributorID == 6);
        await arreststaff.map(item => {
          // if (item.ContributorID == 6 && item.IsActive == 1) {
          item.FullName = `${item.TitleName} ${item.FirstName} ${item.LastName}`
          // }
        });
        console.log("_masstaff", arreststaff);
        /// set LawsuitArrestStaff to lawsuitArrestForm
        this.setItemFormArray(arreststaff, 'LawsuitArrestStaff', this.lawsuitArrestForm);
        /// Check LawsuitComplete status
        this.disabled = true;
        let IsLawsuitComplete = res[0]['IsLawsuitComplete'];
        console.log('IsLawsuitComplete==>', IsLawsuitComplete)
        /// LawsuitComplete status = 1
        if (IsLawsuitComplete == 1) {
          /// get MasDocumentMaingetAll
          if (res[0]['LawsuitArrestIndicment'][0]['Lawsuit'].length != 0) {
            await this.lawsuitService.MasDocumentMaingetAll(4, res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitID']).then(res => {
              //insert doc to dosMacList

            });
            /// get IsLawsuit check box (IsLawsuitCheck)
            let islaw = res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['IsLawsuit'];
            let IsLawsuitCheck = true;
            if (islaw == 1) {
              IsLawsuitCheck = false;
              this.lawsuitForm.controls['ReasonDontLawsuit'].setValue('');
            }

            /// get IsOutside check box (IsOutsidetCheck)
            let isout = res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['IsOutside'];
            let IsOutsideCheck = false;
            if (isout == 1) {
              IsOutsideCheck = true;
            }

            ///set lawsuitForm
            const staff = res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitStaff'].filter(item => item.IsActive == 1);
            await staff.map(item => {
              item.FullName = `${item.TitleName} ${item.FirstName} ${item.LastName}`
            });
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
          // console.log('resposne ise=====>', res[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'])
          await res[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'].map(item => {
            this.LawsuitTableListShow = true;
            res[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'][0]['LawsuitArrestLawbreaker'].map(arrestLaw => {
              const middleName = (arrestLaw.LawbreakerMiddleName) ? arrestLaw.LawbreakerMiddleName : '';
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
          // console.log('+++IsLawsuitComplete', IsLawsuitComplete);

          if (IsLawsuitComplete == 0) {
            this.navService.setSaveButton(true);
            this.navService.setCancelButton(true);
            this.showEditField = true;
            // this.navService.showFieldEdit.subscribe(async p => {
            //   this.showEditField = true;

            //   this.ngOnInit();
            // });
          } else if (isProve == 0) {
            if (lawsuitType == 1) {
              this.navService.setPrintButton(true);
              this.navService.setDeleteButton(true);
              this.navService.setEditButton(true);
              this.navService.setNextPageButton(true);
              this.navService.setInnerTextNextPageButton('เปรียบเทียบปรับ')
            }
            else {
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
          let IsProve = res[0]['LawsuitArrestIndicment'][0].IsProve;
          let IsLawsuitComplete = res[0]['LawsuitArrestIndicment'][0].IsLawsuitComplete;
          let arrList = [];
          console.log('LawsuitArrestIndicment', res[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'])
          await res[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'].map(item => {
            this.LawsuitTableListShow = true;
            res[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'][0]['LawsuitArrestLawbreaker'].map(arrestLaw => {
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
              // 'LawsuitType': 1,
              'LawsuitEnd': item.LawsuitEnd,
              'ProductDesc': item.ProductProductDesc,
              'IsProve': IsProve,
              'IsLawsuitComplete': IsLawsuitComplete,
            };

            /// add EntityType
            // console.log('item EntityType===>', item)
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
          console.log('IsLawsuitComplete ==== 0')
          this.navService.setSaveButton(true);
          this.navService.setCancelButton(true);
          this.showEditField = false;
        }

      }
    });

    this.preLoaderService.setShowPreloader(false);
  }


  onChangeFullname(textSearch) {
    console.log(event);
    let _masStaffList = this.masStaffList;
    if (textSearch) {
      let result = _masStaffList.filter(item => (item.FullName.includes(textSearch))).slice(0, 10);
      console.log('result', result);
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
    this.lawsuitForm.controls['FullName'].setValue(this.validateData(text.FullName));
    this.lawsuitForm.controls['PositionName'].setValue(this.validateData(text.OperationPosName));
    this.lawsuitForm.controls['DepartmentName'].setValue(this.validateData(text.OfficeShortName));
    this.lawsuitForm.controls['officeCode'].setValue(text.OfficeCode);
    this.suggestions = [];
  }
  onChangeStation(textSearch) {
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
    if (this.lawsuitForm.controls['IsLawsuitCheck'].value) {
      this.lawsuitForm.controls['ReasonDontLawsuit'].setValidators([Validators.required]);
    } else {
      this.lawsuitForm.controls['ReasonDontLawsuit'].clearValidators();
    }
    // this.form.controls["firstName"].setValidators([Validators.minLength(1), Validators.maxLength(30)]);
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

    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
    // this.router.navigate(["/lawsuit/detail", "R"], {
    //   queryParams: {
    //     ArrestCode: this.lawsuitList[0].ArrestCode,
    //     IndictmentDetailID: item.controls['IndictmentDetailID'].value,
    //     IndictmentID: this.IndictmentID,
    //   }
    // });
  }

  editTable(item: any, index: number) {
    // if (this.LawsuitTableList.controls[0].controls.IsProve.value === 1) {
    //   this.lawsuitService.LawsuitProvegetByLawsuitID(this.LawsuitID).then(async result => {
    //     if(result.length === 0) {
    //       let MasStaff_All = await this.lawsuitService.MasStaffMaingetAll();
    //       let MasOffice_All = await this.lawsuitService.MasOfficeMaingetAll();
    //       let controls_status = true;
    //       const dialogRef = this.dialog.open(DialogJudgment, {
    //         width: '90%',
    //         maxWidth: 'none',
    //         data: {
    //           index: index,
    //           indictmentID: this.IndictmentID,
    //           MasStaff_All: MasStaff_All,
    //           MasOffice_All: MasOffice_All,
    //           controls_status: controls_status
    //         }
    //       });
    

    //       console.log(MasStaff_All)
    //       console.log(MasOffice_All)
    //     } else {
    //       alert("ไม่สามารถแก้ไขรายการได้")
    //     }
    //   })
    // }
    
    const dialogRef = this.dialog.open(DialogJudgment, {
      width: '90%',
      maxWidth: 'none',
    });
    
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private lawsuitService: LawsuitService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private dialogRef: MatDialogRef<DialogJudgment>
  ) {
    this.indictmentID = this.indictmentID;
    // this.lawsuitID = params['LawsuitID'];
  }
  public validStatus = false;
  public isPayAll = null;
  public arrestData = [];
  lawsuitArrestFormDialog: FormGroup;
  ngOnInit() {
    this.lawsuitService.GetArrestIndicmentDetailgetByCon(this.indictmentID).then(async result => {
      this.arrestData = await result;
      console.log(this.data)
      this.lawsuitArrestFormDialog = this.fb.group({
        arrestName: new FormControl(null, Validators.required),
        justicName: new FormControl(null, Validators.required),
        numberBlackList: new FormControl(null, Validators.required),
        numberRedList: new FormControl(null, Validators.required),
        judgementNo: new FormControl(null, Validators.required),
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
      this.judgmentModel.arrestName = this.validateData(this.arrestData['LawsuitArrestLawbreaker'].LawbreakerTitleName +
        this.arrestData['LawsuitArrestLawbreaker'].LawbreakerFirstName + this.arrestData['LawsuitArrestLawbreaker'].LawbreakerLastName);
      this.judgmentModel.justicName = this.validateData(this.arrestData['LawsuitArrestLawbreaker'].CourtName);
      this.judgmentModel.numberBlackList = this.validateData(this.arrestData['LawsuitArrestLawbreaker'].UndecidedCaseNo);
      this.judgmentModel.numberRedList = this.validateData(this.arrestData['LawsuitArrestLawbreaker'].DecidedCaseNo);
      this.judgmentModel.judgementNo = this.validateData(this.arrestData['LawsuitArrestLawbreaker'].JudgementNo);
      this.judgmentModel.dateJustic = this.validateData(this.arrestData['LawsuitArrestLawbreaker'].JudgementDate);
      this.judgmentModel.fine = this.validateData(this.arrestData['LawsuitArrestLawbreaker'].IsFine);
      this.judgmentModel.fineRate = this.validateData(this.arrestData['LawsuitArrestLawbreaker'].CourtFire);
      this.judgmentModel.isPrison = this.validateData(this.arrestData['LawsuitArrestLawbreaker'].IsImPrison);
      this.judgmentModel.prisonDay = this.validateData(this.arrestData['LawsuitArrestLawbreaker'].ImPrisonTime);
      this.judgmentModel.unit = this.validateData(this.arrestData['LawsuitArrestLawbreaker'].ImPrisonUnit);
      this.judgmentModel.payDate = this.validateData(this.arrestData['LawsuitArrestLawbreaker'].PaymentPeroid);
      this.judgmentModel.payRadio1 = this.validateData(this.arrestData['LawsuitArrestLawbreaker'].IsPayOnce);
      this.judgmentModel.startPayDate = this.validateData(this.arrestData['LawsuitArrestLawbreaker'].PaymentPeroidStartDate);
      this.judgmentModel.roundPay = this.validateData(this.arrestData['LawsuitArrestLawbreaker'].PaymentPeroidRound);
      this.judgmentModel.payUnit = this.validateData(this.arrestData['LawsuitArrestLawbreaker'].PaymentUnit);

    });

  }


  public closePopup = function () {
    this.dialogRef.close(DialogJudgment);
  }
  public validateData = function (data) {
    if (data) {
      return data;
    }
    return '';
  }

}