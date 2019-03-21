import { MasLawGuitBase } from "../models/mas_law_guitbase";
import { MasLawGroupSection } from "../models/mas_law_group_section";
import { MasOffice } from "../models/mas_office";
import { MasStaff } from "../models/mas_staff";
import { toLocalShort, toTimeShort } from "../../../config/dateFormat";
import { Observable } from 'rxjs/Observable';
import { LawsuitService } from "../lawsuit.service";
import { Lawsuit } from "../models/lawsuit";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from "@angular/core";
import { NavigationService } from "../../../shared/header-navigation/navigation.service";
import { Arrest } from "../../arrests/models/arrest";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from "@angular/forms";
import { PreloaderService } from "../../../shared/preloader/preloader.component";
import { SidebarService } from "../../../shared/sidebar/sidebar.component";
import { LawsuitStaffFormControl } from '../models/lawsuit_staff';
import { LawsuitDocument, LawsuitDocumentFormControl } from '../models/lawsuit_document';
import { LawsuitArrestStaffFormControl } from '../models/lawsuit_arreststaff';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Message } from '../../../config/message';
import { replaceFakePath } from 'app/config/dataString';
import { MatDialog } from '@angular/material';
import { IMyDpOptions } from "mydatepicker";

import Swal from 'sweetalert2'

import { DialogJudgment } from './dialog-judgment'
import { DialogNotComplete } from './dialog-notComplete';

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
  isRequired2: boolean;
  lawBrakerForm: FormArray;
  LawsuitArrestIndictmentProduct: any = [];
  LawsuitArrestIndictmentProductTableListShow = false;
  LawsuitTableListShow = false;
  fileToUpload: File = null;
  fileToUploadList: File[] = [];
  lawsuitFormNoData: boolean;
  LawsuitStaffOnsave: any = [];
  LawsuitLocationOnSave: any = [];
  IsLawsuitType: any;
  prove: any;
  staff: any = {};
  judmentIdList: any = [];
  private getDataFromListPage: any;
  private onPrintSubscribe: any;
  private onSaveSubscribe: any;
  private onCancelSubscribe: any;
  private onEditSubscribe: any;
  private onNextPageSubscribe: any;
  private onDeleteSubscribe: any;
  private IsLawsuitComplete: Number;
  private LawsuitID: any;
  private IndictmentID: string;
  private ArrestCode: string;
  @ViewChild('printDocModalLaw') printDocModel: ElementRef;
  @ViewChild('indicmetModal') indicmetModal: ElementRef;

  MasStaff = new Array<MasStaff>();
  lstype = [{ id: '0', name: 'ส่งฟ้องศาล' }, { id: '1', name: 'เปรียบเทียบปรับ', }, { id: '2', name: 'ไม่มีตัวตน', }];
  staffState: any[] = []
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
    this.createForm();
    this.navService.setNewButton(false);
    this.navService.setSearchBar(false);
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
    this.sidebarService.setVersion('0.0.0.52');
    localStorage.setItem('programcode', 'ILG60-04-00')
    this.preLoaderService.setShowPreloader(true);
    await this.getParamFromActiveRoute();
    await this.navigate_service();
    await this.createForm();
    await this.createLawsuitForm();
    await this.tools_bar(this.LawsuitID)
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
    this.onDeleteSubscribe = this.navService.onDelete.subscribe(async status => {
      if (status) {
        await this.navService.setOnDelete(false);
        this.onDelete();
      }
    })
    this.onPrintSubscribe = this.navService.onPrint.subscribe(async status => {
      if (status && localStorage.programcode == "ILG60-04-00") {
        await this.navService.setOnPrint(false);
        this.modal = this.ngbModel.open(this.printDocModel, { size: 'lg', centered: true });
      }
    })
    this.onSaveSubscribe = this.navService.onSave.subscribe(async status => {
      if (status) {
        await this.navService.setOnSave(false);
        if (this.findInvalidControls().length > 0 && this.lawsuitForm.controls['IsLawsuitCheck'].value == false) {
          this.isRequired = true;
          Swal({
            text: Message.checkData,
            type: 'warning',
          })

          return false;
        }
        else if (this.lawsuitForm.controls['IsLawsuitCheck'].value == true &&
          this.lawsuitForm.controls['ReasonDontLawsuit'].value == "" ||
          this.lawsuitForm.controls['IsLawsuitCheck'].value == true && this.lawsuitForm.controls['ReasonDontLawsuit'].value == null) {
          this.isRequired2 = true;

          Swal({
            text: Message.checkData,
            type: 'warning',
          })
          return false;
        }
        console.log(localStorage.programcode)
        localStorage.programcode == "ILG60-04-00" ? this.onSaveLawsuit() : false
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
      if (controls[name].invalid && name != "LawsuitTableList") {
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
    this.navService.setNextPageButton(false);
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
     this.setShowButton()
  }
  private async onEdit() {
    this.navService.setNextPageButton(false);
    this.preLoaderService.setShowPreloader(true);
    if (this.lawsuitList[0]['LawsuitArrestIndicment'][0]['IsProve'] == 0) {/// IdProve = 0
      this.lawsuitList[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'].forEach(async element => {
        if (element['LawsuitType'] == 0) {
          let PaymentFine = await this.lawsuitService.LawsuitPaymentFinegetByJudgementID(element['LawsuitJudgement'][0]['JudgementID']) || ""
          if (PaymentFine != 0) {
            if (PaymentFine[0].IsRequestBribe == 1) {
              Swal({
                text: "ไม่สามารถทำรายการได้",
                type: 'warning',
              })
              this.preLoaderService.setShowPreloader(false);
              return;
            } else {
              if (element['LawsuitType'] != 0) {
                let compare = await this.lawsuitService.LawsuitComparegetByLawsuitID(this.LawsuitID)
                if (compare != 0) {
                  Swal({
                    text: "ไม่สามารถทำรายการได้",
                    type: 'warning',
                  })
                  this.preLoaderService.setShowPreloader(false);
                  return;
                } else {
                  this.navService.setEditField(false);
                  this.navService.setEditButton(false);
                  this.navService.setPrintButton(false);
                  this.navService.setDeleteButton(false);
                  this.navService.setSaveButton(true);
                  this.navService.setCancelButton(true);
                  this.showEditField = false;
                }
              } else {
                await this.lawsuitService.LawsuitProvegetByLawsuitID(this.lawsuitList[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitID']).then(res => {
                  if (res.length == 0) {
                    this.navService.setEditField(false);
                    this.navService.setEditButton(false);
                    this.navService.setPrintButton(false);
                    this.navService.setDeleteButton(false);
                    this.navService.setSaveButton(true);
                    this.navService.setCancelButton(true);
                    this.showEditField = false;
                    return;
                  } else {
                    Swal({
                      text: "ไม่สามารถทำรายการได้",
                      type: 'warning',
                    })
                    this.navService.setEditField(true);
                    this.navService.setEditButton(true);
                    this.navService.setPrintButton(true);
                    this.navService.setDeleteButton(true);
                    this.navService.setSaveButton(false);
                    this.navService.setCancelButton(false);
                    return;
                  }
                })
              }
            }
          }
        }
      });
    } else { /// IdProve
      await this.lawsuitService.LawsuitProvegetByLawsuitID(this.lawsuitList[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitID']).then(res => {
        if (res.length == 0) {
          this.navService.setEditField(false);
          this.navService.setEditButton(false);
          this.navService.setPrintButton(false);
          this.navService.setDeleteButton(false);
          this.navService.setSaveButton(true);
          this.navService.setCancelButton(true);
          this.showEditField = false;
          return;
        } else {
          Swal({
            text: "ไม่สามารถทำรายการได้",
            type: 'warning',
          })
          this.navService.setEditField(true);
          this.navService.setEditButton(true);
          this.navService.setPrintButton(true);
          this.navService.setDeleteButton(true);
          this.navService.setSaveButton(false);
          this.navService.setCancelButton(false);
          return;
        }
      })
    }
    this.preLoaderService.setShowPreloader(false);
  }

  private async onNextPage() {
    let lawsuitID = this.LawsuitID;
    let indictmentID = this.IndictmentID;
    let IsProve = 0;
    IsProve = await this.lawsuitService.LawsuitArrestGetByCon(indictmentID).then(res => {
      return res[0].LawsuitArrestIndicment[0].IsProve;
    });
    if (IsProve == 0) {/// IdProve = 0 (goto ILG60-06-02-00-00)
      await this.lawsuitService.LawsuitComparegetByLawsuitID(lawsuitID).then(res => {
        if (res.length == 0) { /// if not found data
          this.router.navigate(['/fine/manage/C/' + 0 + '/' + indictmentID + "/TN0412006200015"]);
        } else { ///if found data
          this.router.navigate(['/fine/manage/R/' + res[0].FineID + '/' + indictmentID + "/TN0006036200001"]);
        }
      })
    } else { /// IdProve = 1 (goto ILG60-05-02-00-00)
      await this.lawsuitService.LawsuitProvegetByLawsuitID(lawsuitID).then(res => {
        if (res.length == 0) { /// if not found data
          this.router.navigate(['/prove/manage/C/' + 0 + '/' + indictmentID]);
        } else { ///if found data
          this.router.navigate(['/prove/manage/R/' + res[0].ProveID + '/' + indictmentID]);
        }
      })
    }
  }

  private async onCancel() {
    let indictmentID = this.IndictmentID;
    let IsLawsuitComplete = await this.lawsuitService.LawsuitArrestGetByCon(indictmentID).then(res => {
      return res[0].LawsuitArrestIndicment[0].IsLawsuitComplete;
    });
    Swal({
      title: '',
      text: "ยืนยันการทำรายการหรือไม่",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm!'
    }).then(async (result) => {
      if (result.value) {
        let IndictmentDetailID = this.lawsuitList[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'][0].IndictmentDetailID
        this.lawsuitService.LawsuitArrestIndicmentDetailgetByCon(IndictmentDetailID).then(results => {
          if (results) {
            if (this.lawsuitList[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'][0]['LawsuitType'] == 1) {
              this.lawsuitService.LawsuitJudgementupdDelete(results['LawsuitJudgement'][0]['JudgementID'])
              if (results['LawsuitJudgement'][0]['IsFine'] == 1) {
                results['LawsuitJudgement'][0]['LawsuitPaymentFine'].forEach(element => {
                  this.lawsuitService.LawsuitPaymentFineDetailupdDelete(element.PaymentFineID)
                });
              }
            }
            // case 2.1.1
          }
        });

        if (IsLawsuitComplete == 1) {
          this.navService.setCancelButton(false);
          this.navService.setSaveButton(false);
          this.navService.setEditField(true);
        } else {
          this.navService.setEditButton(false);
          this.navService.setPrintButton(false);
          this.navService.setDeleteButton(false);
          this.navService.setCancelButton(false);
          this.navService.setSaveButton(false);
        }
        return this.router.navigate(['/lawsuit/list']);
      }
    })
  }

  private async onDelete() {
    Swal({
      title: '',
      text: "ยืนยันการทำรายการหรือไม่",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm!'
    }).then(async (result) => {
      if (result.value) {
        this.preLoaderService.setShowPreloader(true);
        let IndictmentID = Number(this.IndictmentID)
        let updDel = await this.lawsuitService.LawsuitArrestupdDeleteLawsuit(this.lawsuitArrestForm.value.ArrestCode, IndictmentID)
        if (updDel.IsSuccess == "True") {
          Swal({
            text: "ลบข้อมูลสำเร็จ",
            type: 'success',
          })
          this.preLoaderService.setShowPreloader(false);
          this.router.navigate(['/lawsuit/list']);
        } else {
          Swal({
            text: "ลบข้อมูลไม่สำเร็จ",
            type: 'warning',
          })
          this.preLoaderService.setShowPreloader(false);
          return;
        }
      } else {
        return;
      }
    })

  }
  async setButtonCase() {
    this.preLoaderService.setShowPreloader(true);
    await this.ngOnInit();
    // await this.ArrestgetByCon(this.IndictmentID, this.LawsuitID);
    this.preLoaderService.setShowPreloader(false);
    this.showEditField = false;
    this.navService.setEditField(true);
    this.navService.setEditButton(true);
    this.navService.setPrintButton(true);
    this.navService.setDeleteButton(true);
    this.navService.setSaveButton(false);
    this.navService.setCancelButton(false);
    console.log(this.prove)
    if (this.prove == 1) {
      this.navService.setNextPageButton(true);
      this.navService.setInnerTextNextPageButton('งานพิสูจน์')
    } else if (this.prove == 0) {
      this.navService.setNextPageButton(true);
      this.navService.setInnerTextNextPageButton('งานเปรียบเทียบ')
    }
  }

  async setButtonCaseIslaw() {

    this.preLoaderService.setShowPreloader(true);
    await this.ngOnInit();
    // await this.ArrestgetByCon(this.IndictmentID, this.LawsuitID);
    this.preLoaderService.setShowPreloader(false);
    this.showEditField = false;
    this.navService.setEditField(true);
    this.navService.setEditButton(true);
    this.navService.setPrintButton(true);
    this.navService.setDeleteButton(true);
    this.navService.setSaveButton(false);
    this.navService.setCancelButton(false);
    this.navService.setNextPageButton(false);
  }
  private async onSaveLawsuit() {
    this.preLoaderService.setShowPreloader(true);
    let IsLawsuitComplete = this.lawsuitList[0]['IsLawsuitComplete'];
    if (IsLawsuitComplete == 1 || IsLawsuitComplete == 0 && Number(this.LawsuitID) > 0) {
      let lawsuitNo = this.lawsuitForm.controls['LawsuitNo'].value + '/' + this.lawsuitForm.controls['LawsuitNoSub'].value;

      let dateNow = this.lawsuitForm.controls['LawsuitDate'].value ? (this.lawsuitForm.controls['LawsuitDate'].value).date : null
      let _lawDate = dateNow ? dateNow.year + '-' + dateNow.month + '-' + dateNow.day + "T00:00:00.0" : "";


      let tempLawsuitStaff = [];
      let isOut = this.lawsuitForm.controls['IsOutsideCheck'].value ? 1 : 0;
      let isLaw = this.lawsuitForm.controls['IsLawsuitCheck'].value ? 0 : 1;

      let verify = await this.lawsuitService.LawsuitVerifyLawsuitNo(lawsuitNo, this.lawsuitForm.controls['officeCode'].value, isOut)
      if (verify.length != 0) {
        Swal({
          text: "เลขคดีรับคำกล่าวโทษซ้ำ กรุณา กรอกใหม่",
          type: 'warning',
        });
        this.preLoaderService.setShowPreloader(false);
        return;
      }
      tempLawsuitStaff.push({
        "StaffID": this.staff.StaffID,
        "ProgramCode": "XCS-60",
        "ProcessCode": "XCS-60-001",
        "LawsuitID": this.LawsuitID,
        "StaffCode": this.staff.StaffCode,
        "TitleName": this.staff.TitleName,
        "FirstName": this.staff.FirstName,
        "LastName": this.staff.LastName,
        "PositionCode": "",
        "PositionName": this.lawsuitForm.controls['PositionName'].value,
        "PosLevel": this.staff.PosLevel ? this.staff.PosLevel : "",
        "PosLevelName": this.staff.PosLevelName ? this.staff.PosLevelName : "",
        "DepartmentCode": "",
        "DepartmentName": "",
        "DepartmentLevel": this.staff.DeptLevel ? this.staff.DeptLevel : "",
        "OfficeCode": this.staff.OfficeCode,
        "OfficeName": this.staff.OfficeName,
        "OfficeShortName": this.staff.OfficeShortName,
        "ContributorID": 12,
        "IsActive": 1
      })

      let json = {
        "LawsuitID": this.LawsuitID,
        "ArrestCode": this.lawsuitArrestForm.value.ArrestCode,
        "IndictmentID": Number(this.IndictmentID),
        "IsLawsuit": isLaw,
        "ReasonDontLawsuit": this.lawsuitForm.controls['ReasonDontLawsuit'].value ? this.lawsuitForm.controls['ReasonDontLawsuit'].value : "",
        "LawsuitNo": lawsuitNo,
        "LawsuitDate": _lawDate,
        "LawsuitTime": this.lawsuitForm.controls['LawsuitTime'].value,
        "LawsuitStationCode": this.staff.LawsuitStationCode,
        "LawsuitStation": this.staff.LawsuitStation,
        "IsOutside": isOut,
        "AccuserTestimony": this.lawsuitForm.controls['AccuserTestimony'].value,
        "LawsuitResult": '',
        "DeliveryDocNo": '',
        "DeliveryDate": _lawDate,
        "IsActive": 1,
        "LawsuitType": Number(this.LawsuitTableList.value[0].LawsuitType),
        "LawsuitEnd": Number(this.LawsuitTableList.value[0].LawsuitEnd),
        "LawsuitStaff": tempLawsuitStaff
      }

      if (isLaw == 0) {
        json = {
          "LawsuitID": this.LawsuitID,
          "ArrestCode": this.lawsuitArrestForm.value.ArrestCode,
          "IndictmentID": Number(this.IndictmentID),
          "IsLawsuit": isLaw,
          "ReasonDontLawsuit": this.lawsuitForm.controls['ReasonDontLawsuit'].value ? this.lawsuitForm.controls['ReasonDontLawsuit'].value : "",
          "LawsuitNo": "",
          "LawsuitDate": "",
          "LawsuitTime": "",
          "LawsuitStationCode": "",
          "LawsuitStation": "",
          "IsOutside": null,
          "AccuserTestimony": "",
          "LawsuitResult": '',
          "DeliveryDocNo": '',
          "DeliveryDate": "",
          "IsActive": 1,
          "LawsuitType": null,
          "LawsuitEnd": null,
          "LawsuitStaff": []
        }
      }

      let update = await this.lawsuitService.LawsuitformupdByCon(json)
      let LawsuitArrestIndicmentDetail = this.lawsuitList[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'] || []
      if (LawsuitArrestIndicmentDetail.length != 0) {
        await this.LawsuitTableList.value.forEach(async element => {
          let ArrestIndicmentDetail = await this.lawsuitService.LawsuitArrestIndicmentDetailgetByCon(element.IndictmentDetailID)
          if (isLaw != 0) {
            await this.lawsuitService.LawsuitArrestIndicmentDetailupdByCon(element.IndictmentDetailID, Number(element.LawsuitType), Number(element.LawsuitEnd))
          }
          if (element.LawsuitType != 0) {
            if (ArrestIndicmentDetail['LawsuitJudgement'].length > 0) {
              await this.lawsuitService.LawsuitJudgementupdDelete(ArrestIndicmentDetail['LawsuitJudgement'][0]['JudgementID'])
            }
          }
        });
        if (update.IsSuccess == "True") {
          Swal({
            text: "บันทึกสำเร็จ",
            type: 'success',
          }).then(async result => {
            let checkComplete = await this.lawsuitService.LawsuitArrestCheckNotComplete(this.lawsuitArrestForm.controls['ArrestCode'].value)
            if (isLaw != 0) {
              this.setButtonCase()
            } else {
              this.setButtonCaseIslaw()
            }
            let popup = {
              checkComplete: checkComplete
            }
            this.preLoaderService.setShowPreloader(false);
            this.viewNotComplete(popup)
          })
        } else {
          Swal({
            text: "บันทึกไม่สำเร็จ",
            type: 'warning',
          })
          this.preLoaderService.setShowPreloader(false);
        }
      } else {
        if (update.IsSuccess == "True") {
          Swal({
            text: "บันทึกสำเร็จ",
            type: 'success',
          }).then(async result => {
            let checkComplete = await this.lawsuitService.LawsuitArrestCheckNotComplete(this.lawsuitArrestForm.controls['ArrestCode'].value)
            if (isLaw != 0) {
              this.setButtonCase()
            } else {
              this.setButtonCaseIslaw()
            }
            let popup = {
              checkComplete: checkComplete
            }
            this.preLoaderService.setShowPreloader(false);
            this.viewNotComplete(popup)
          })
        } else {
          Swal({
            text: "บันทึกไม่สำเร็จ",
            type: 'warning',
          })
          this.preLoaderService.setShowPreloader(false);
        }
      }
    }
    /// save IsLawsuitComplete = 0
    else {
      let lawsuitNo = "";

      let isOut = this.lawsuitForm.controls['IsOutsideCheck'].value ? 1 : 0;
      let isLaw = this.lawsuitForm.controls['IsLawsuitCheck'].value ? 0 : 1;
      if (this.lawsuitForm.controls['LawsuitNo'].value && this.lawsuitForm.controls['LawsuitNoSub'].value > 0) {
        lawsuitNo = this.lawsuitForm.controls['LawsuitNo'].value + '/' + this.lawsuitForm.controls['LawsuitNoSub'].value;
      } else {
        if (isLaw != 0) {
          Swal({
            text: "กรุณากรอกเลขที่คดีรับคำกล่าวโทษไม่ถูกต้อง",
            type: 'warning',
          });
          this.preLoaderService.setShowPreloader(false);
          return;
        }

      }
      let verify = await this.lawsuitService.LawsuitVerifyLawsuitNo(lawsuitNo, this.lawsuitForm.controls['officeCode'].value, isOut)
      if (verify.length != 0) {
        Swal({
          text: "เลขคดีรับคำกล่าวโทษซ้ำ กรุณา กรอกใหม่",
          type: 'warning',
        });
        this.preLoaderService.setShowPreloader(false);
        return;
      }

      let dateNow = (this.lawsuitForm.controls['LawsuitDate'].value).date
      let _lawDate = dateNow.year + '-' + dateNow.month + '-' + dateNow.day + "T00:00:00.0";
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
        "DepartmentLevel": this.LawsuitStaffOnsave.DeptLevel ? this.LawsuitStaffOnsave.DeptLevel : "",
        "OfficeCode": this.LawsuitStaffOnsave.OfficeCode,
        "OfficeName": this.LawsuitStaffOnsave.OfficeName,
        "OfficeShortName": this.LawsuitStaffOnsave.OfficeShortName,
        "ContributorID": 12,
        "IsActive": this.LawsuitStaffOnsave.IsActive
      })


      let json = {
        "LawsuitID": this.LawsuitID,
        "IndictmentID": this.IndictmentID,
        "IsLawsuit": isLaw,
        "ReasonDontLawsuit": this.lawsuitForm.controls['ReasonDontLawsuit'].value ? this.lawsuitForm.controls['ReasonDontLawsuit'].value : "",
        "LawsuitNo": lawsuitNo,
        "LawsuitDate": _lawDate,
        "LawsuitTime": this.lawsuitForm.controls['LawsuitTime'].value,
        "LawsuitStationCode": this.lawsuitForm.controls['LawsuitStationCode'].value,
        "LawsuitStation": this.staff.LawsuitStation,
        "IsOutside": isOut,
        "AccuserTestimony": this.lawsuitForm.controls['AccuserTestimony'].value,
        "LawsuitResult": '',
        "DeliveryDocNo": '',
        "DeliveryDate": _lawDate,
        "IsActive": 1,
        "LawsuitType": Number(this.LawsuitTableList.value[0].LawsuitType),
        "LawsuitEnd": Number(this.LawsuitTableList.value[0].LawsuitEnd),
        "LawsuitStaff": tempLawsuitStaff
      }

      if (isLaw == 0) {
        json = {
          "LawsuitID": this.LawsuitID,
          "IndictmentID": this.IndictmentID,
          "IsLawsuit": isLaw,
          "ReasonDontLawsuit": this.lawsuitForm.controls['ReasonDontLawsuit'].value ? this.lawsuitForm.controls['ReasonDontLawsuit'].value : "",
          "LawsuitNo": "",
          "LawsuitDate": "",
          "LawsuitTime": "",
          "LawsuitStationCode": "",
          "LawsuitStation": "",
          "IsOutside": null,
          "AccuserTestimony": "",
          "LawsuitResult": '',
          "DeliveryDocNo": '',
          "DeliveryDate": "",
          "IsActive": 1,
          "LawsuitType": null,
          "LawsuitEnd": null,
          "LawsuitStaff": []
        }
      }
      console.log(json)
      if (this.lawsuitForm.controls['LawsuitTableList'].value.length == 0) {
        json.LawsuitType = 3
        json.LawsuitEnd = 4
      }
      await this.lawsuitService.LawsuitinsAll(json).then(async result => {
        if (result.IsSuccess == "True") {
          Swal({
            text: "บันทึกสำเร็จ",
            type: 'success',
          })
          await this.lawsuitService.LawsuitArrestIndicmentupdByCon(this.IndictmentID)
          let checkComplete = await this.lawsuitService.LawsuitArrestCheckNotComplete(this.lawsuitArrestForm.controls['ArrestCode'].value)
          let LawsuitArrestIndicmentDetail = this.lawsuitList[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'] || []
          if (LawsuitArrestIndicmentDetail.length != 0) {
            await this.LawsuitTableList.value.forEach(async element => {
              let ArrestIndicmentDetail = await this.lawsuitService.LawsuitArrestIndicmentDetailgetByCon(element.IndictmentDetailID)
              if (isLaw != 0) {
                await this.lawsuitService.LawsuitArrestIndicmentDetailupdByCon(element.IndictmentDetailID, Number(element.LawsuitType), Number(element.LawsuitEnd))
              }
              if (element.LawsuitType != 0) {
                if (ArrestIndicmentDetail['LawsuitJudgement'].length > 0) {
                  await this.lawsuitService.LawsuitJudgementupdDelete(ArrestIndicmentDetail['LawsuitJudgement'][0]['JudgementID'])
                }
                // if (ArrestIndicmentDetail.IsFine == 1) {
                //   await this.lawsuitService.LawsuitPaymentFineDetailupdDelete(ArrestIndicmentDetail.PaymentFineID)
                // }
              }
            });
            if (checkComplete.length != 0) {
              let popup = {
                checkComplete: checkComplete
              }
              this.viewNotComplete(popup)
              // ให้เด้งป๊อบอัพ
              if (isLaw != 0) {
                this.setButtonCase()
              } else {
                this.setButtonCaseIslaw()
              }
              this.preLoaderService.setShowPreloader(false);
              this.router.navigate(['/lawsuit/manage', 'R'], {
                queryParams: { IndictmentID: this.IndictmentID, LawsuitID: result.LawsuitID }
              });
            } else {
              await this.lawsuitService.LawsuitArrestupdByCon(this.lawsuitArrestForm.value.ArrestCode)
              if (isLaw != 0) {
                this.setButtonCase()
              } else {
                this.setButtonCaseIslaw()
              }
              this.preLoaderService.setShowPreloader(false);
              this.router.navigate(['/lawsuit/manage', 'R'], {
                queryParams: { IndictmentID: this.IndictmentID, LawsuitID: result.LawsuitID }
              });
            }

          } else {
            this.preLoaderService.setShowPreloader(false);
          }
        }
      })
      this.preLoaderService.setShowPreloader(false);
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
  getNowTime() {
    let hours = "000" + (new Date()).getHours()
    let min = "000" + (new Date()).getMinutes()
    return hours.substr(hours.length - 2, hours.length) + ":" + min.substr(min.length - 2, min.length)
  }
  getNowDate() {
    let now = new Date()
    return {
      date: {
        day: now.getDate(),
        month: now.getMonth() + 1,
        year: now.getFullYear(),
      }
    }
  }
  private createLawsuitForm() {

    this.lawsuitForm = this.fb.group({
      IsLawsuitCheck: new FormControl(null),
      ReasonDontLawsuit: new FormControl(null),
      IsOutsideCheck: new FormControl(false),
      LawsuitDate: new FormControl(this.getNowDate() || null, Validators.required),
      LawsuitTime: new FormControl(this.getNowTime() + " น." || null, Validators.required),
      FullName: new FormControl(null, Validators.required),
      PositionName: new FormControl(null, Validators.required),
      DepartmentName: new FormControl(null, Validators.required),
      LawsuitStation: new FormControl(null, Validators.required),
      LawsuitStationCode: new FormControl(null),
      AccuserTestimony: new FormControl(null, Validators.required),
      LawsuitNo: new FormControl(null, Validators.required),
      LawsuitNoSub: new FormControl(this.getNowDate().date.year + 543, Validators.required),
      LawsuitStaff: this.fb.array([this.createStaffForm()]),
      LawsuitTableList: this.fb.array([this.createTableListForm()]),
      LawsuitDocument: this.fb.array([]),
      officeCode: new FormControl(null),
    });
  }
  private async ArrestgetByCon(IndictmentID: string, LawsuitID: string) {

    this.preLoaderService.setShowPreloader(true);
    let ArrestIndictmentProduct = await this.lawsuitService.LawsuitArrestIndictmentProductgetByIndictmentID(IndictmentID)
    if (ArrestIndictmentProduct.length != 0) {
      console.log('ArrestIndictmentProduct page reload step 1 in line 976 ===>', ArrestIndictmentProduct)
      this.LawsuitArrestIndictmentProduct = ArrestIndictmentProduct;
      this.LawsuitArrestIndictmentProductTableListShow = true;
    }
    await this.lawsuitService.LawsuitArrestGetByCon(IndictmentID).then(async res => {
      this.IsLawsuitComplete = res[0]['IsLawsuitComplete'];
      this.lawsuitList = res ? res : [];
      this.lawsuitFormNoData = true;
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
        this.ArrestCode = res[0]['ArrestCode'];
        await this.lawsuitArrestForm.reset({
          ArrestCode: res[0]['ArrestCode'],
          OccurrenceDate: toLocalShort(res[0]['OccurrenceDate']),
          OccurrenceTime: res[0]['OccurrenceTime'],
          ArrestStation: res[0]['ArrestStation'],
          SubSectionType: res[0]['LawsuitArrestIndicment'].length > 0 ? res[0]['LawsuitArrestIndicment'][0]['LawsuitLawGuiltbase'][0]['LawsuitLawSubSectionRule'][0]['LawsuitLawSubSection'][0]['SubSectionType'] : "",
          GuiltBaseName: res[0]['LawsuitArrestIndicment'].length > 0 ? res[0]['LawsuitArrestIndicment'][0]['LawsuitLawGuiltbase'][0]['GuiltBaseName'] : "",
          SectionNo: res[0]['LawsuitArrestIndicment'].length > 0 ? res[0]['LawsuitArrestIndicment'][0]['LawsuitLawGuiltbase'][0]['LawsuitLawSubSectionRule'][0]['SectionNo'] : "",
          PenaltyDesc: res[0]['LawsuitArrestIndicment'].length > 0 ? res[0]['LawsuitArrestIndicment'][0]['LawsuitLawGuiltbase'][0]['LawsuitLawSubSectionRule'][0]['LawsuitLawSection'][0]['LawsuitLawPenalty'][0]['PenaltyDesc'] : "",
        });
        console.log('lawsuitArrestForm show ===> ', this.lawsuitArrestForm.value)

        const arreststaff = res[0]['LawsuitArrestStaff'].filter(item => item.IsActive == 1 && item.ContributorID == 6);
        await arreststaff.map(item => { item.FullName = `${item.TitleName} ${item.FirstName} ${item.LastName}` });
        console.log("arreststaff ==> ", arreststaff);
        /// set LawsuitArrestStaff to lawsuitArrestForm
        this.setItemFormArray(arreststaff, 'LawsuitArrestStaff', this.lawsuitArrestForm);
        this.LawsuitStaffOnsave = {
          "StaffID": '',
          "ProgramCode": "XCS-60",
          "ProcessCode": "XCS-60-001",
          "LawsuitID": this.LawsuitID,
          "StaffCode": arreststaff.StaffCode,
          "TitleName": arreststaff.TitleName,
          "FirstName": arreststaff.FirstName,
          "LastName": arreststaff.LastName,
          "PositionCode": "",
          "PositionName": this.lawsuitForm.controls['PositionName'].value,
          "PosLevel": arreststaff.PosLevel ? arreststaff.PosLevel : "",
          "PosLevelName": arreststaff.PosLevelName ? arreststaff.PosLevelName : "",
          "DepartmentCode": "",
          "DepartmentName": "",
          "DepartmentLevel": arreststaff.DeptLevel ? arreststaff.DeptLevel : "",
          "OfficeCode": arreststaff.OfficeCode,
          "OfficeName": arreststaff.OfficeName,
          "OfficeShortName": arreststaff.OfficeShortName,
          "ContributorID": 12,
          "IsActive": arreststaff.IsActive
        }
        /// Check LawsuitComplete status
        this.disabled = true;
        let IsLawsuitComplete = res[0]['IsLawsuitComplete'];
        console.log('IsLawsuitComplete==>', IsLawsuitComplete)
        /// LawsuitComplete status = 1
        if (IsLawsuitComplete == 1 || IsLawsuitComplete == 0 && Number(this.LawsuitID) > 0) {

          if (res[0]['LawsuitArrestIndicment'][0]['Lawsuit'].length != 0 && res[0]['LawsuitArrestIndicment'].length > 0) {
            this.lawsuitForm.controls['LawsuitDocument'].setValue(await this.lawsuitService.MasDocumentMaingetAll(4, res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitID']))
            let islaw = res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['IsLawsuit'];
            let IsLawsuitCheck = true;

            let isout = res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['IsOutside'];
            let IsOutsideCheck = false;
            if (isout == 1) {
              this.IsLawsuitType = " น. ";
              IsOutsideCheck = true;
            }

            const staff = res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitStaff'].filter(item => item.IsActive == 1);
            await staff.map(item => { item.FullName = `${item.TitleName} ${item.FirstName} ${item.LastName}` });
            const lawsuitNoArr = res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitNo'] ? res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitNo'].split('/') : ['', ''];
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
                LawsuitStationCode: res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitStation'],
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
            console.log(res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0])
            if (islaw == 1) {
              let lawsuitDetail = res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]
              this.staff = lawsuitDetail['LawsuitStaff'][0] ? lawsuitDetail['LawsuitStaff'][0] : {}
              this.staff.LawsuitStation = lawsuitDetail.LawsuitStation
              this.staff.LawsuitStationCode = lawsuitDetail.LawsuitStationCode
              this.staff.StaffID = lawsuitDetail['LawsuitStaff'][0] ? lawsuitDetail['LawsuitStaff'][0].StaffID : ""
              IsLawsuitCheck = false;
              this.lawsuitForm.controls['IsLawsuitCheck'].setValue(false);
              this.lawsuitForm.controls['ReasonDontLawsuit'].setValue('');
              this.lawsuitForm.controls['ReasonDontLawsuit'].clearValidators()
            } else {
              this.lawsuitForm.controls['ReasonDontLawsuit'].setValue(res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['ReasonDontLawsuit']);
              this.lawsuitForm.controls['LawsuitDate'].setValue('');
              this.lawsuitForm.controls['LawsuitTime'].setValue('');
              this.lawsuitForm.controls['LawsuitNo'].setValue('');
              this.lawsuitForm.controls['LawsuitNoSub'].setValue('')
              this.lawsuitForm.controls['FullName'].setValue('');
              this.lawsuitForm.controls['PositionName'].setValue('');
              this.lawsuitForm.controls['DepartmentName'].setValue('');
              this.lawsuitForm.controls['IsLawsuitCheck'].setValue(true);
              this.navService.setNextPageButton(false);
            }
          }
          let IsProve = res[0]['LawsuitArrestIndicment'][0].IsProve;
          this.prove = IsProve
          if (res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['IsLawsuit'] != 0) {
            var countType = 0;
            await res[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'].forEach(item => {
              if (item.LawsuitType == 1) { countType++; }
            })
            
            if (countType > 0) {
              if (this.prove == 1) {
                this.navService.setNextPageButton(true);
                this.navService.setInnerTextNextPageButton('งานพิสูจน์')
              } else if (this.prove == 0) {
                this.navService.setNextPageButton(true);
                this.navService.setInnerTextNextPageButton('งานเปรียบเทียบ')
              }
            } else {
              this.navService.setNextPageButton(false);
            }
          } else {
            this.navService.setNextPageButton(false);
          }

          let IsLawsuitComplete = res[0]['LawsuitArrestIndicment'][0].IsLawsuitComplete;
          let arrList = [];
          await res[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'].map(item => {
            if (item.LawsuitArrestLawbreaker.length > 0) {
              this.LawsuitTableListShow = true;
              item['LawsuitArrestLawbreaker'].map(arrestLaw => {
                const middleName = (arrestLaw.LawbreakerMiddleName) ? arrestLaw.LawbreakerMiddleName : "";
                let title = arrestLaw.LawbreakerTitleName ? arrestLaw.LawbreakerTitleName + " " : "";
                let first = arrestLaw.LawbreakerFirstName ? arrestLaw.LawbreakerFirstName + " " : ""
                let middle = middleName ? middleName + " " : "";
                let last = arrestLaw.LawbreakerLastName ? arrestLaw.LawbreakerLastName : "";
                item.lawBrakerFullName = title + first + middle + last
              });

              /// add LawsuitTableList
              if (item.LawsuitArrestProductDetail != null && item.LawsuitArrestProductDetail.length) {
                item.ProductDesc = item.LawsuitArrestProductDetail.ProductProductDesc;
              } else {
                item.ProductDesc = '';
              }
              if (item.LawbreakerID > 0) {
                this.lstype = [{ id: '0', name: 'ส่งฟ้องศาล' }, { id: '1', name: 'เปรียบเทียบปรับ', }];
              } else {
                this.lstype = [{ id: '0', name: 'ส่งฟ้องศาล' }, { id: '1', name: 'เปรียบเทียบปรับ', }, { id: '2', name: 'ไม่มีตัวตน', }];
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
            }
          });
          this.setItemFormArray(arrList, 'LawsuitTableList', this.lawsuitForm);
        } else {
          this.setlawsuitForm(res)
          let IsProve = res[0]['LawsuitArrestIndicment'][0].IsProve;
          let IsLawsuitComplete = res[0]['LawsuitArrestIndicment'][0].IsLawsuitComplete;
          let arrList = [];
          let textLawbreak = ""
          let check = 0;
          await res[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'].map(item => {
            if (item.LawsuitArrestLawbreaker.length > 0) {
              this.LawsuitTableListShow = true;
              item['LawsuitArrestLawbreaker'].map(arrestLaw => {
                const middleName = (arrestLaw.LawbreakerMiddleName) ? arrestLaw.LawbreakerMiddleName : '';
                let title = arrestLaw.LawbreakerTitleName ? arrestLaw.LawbreakerTitleName + " " : "";
                let first = arrestLaw.LawbreakerFirstName ? arrestLaw.LawbreakerFirstName + " " : ""
                let middle = middleName ? middleName + " " : "";
                let last = arrestLaw.LawbreakerLastName ? arrestLaw.LawbreakerLastName : "";
                item.lawBrakerFullName = title + first + middle + last
                textLawbreak = textLawbreak + item.lawBrakerFullName
                if (textLawbreak != "" && check != arrestLaw.length) {
                  textLawbreak = textLawbreak + " และ "
                }
                check++;
              });
              /// add LawsuitTableList
              if (item.LawsuitArrestProductDetail != null && item.LawsuitArrestProductDetail.length) {
                item.ProductDesc = item.LawsuitArrestProductDetail.ProductProductDesc;
              } else {
                item.ProductDesc = '';
              }
              if (item.LawbreakerID > 0) {
                item.LawsuitType = 1
                item.LawsuitEnd = 0
                this.lstype = [{ id: '0', name: 'ส่งฟ้องศาล' }, { id: '1', name: 'เปรียบเทียบปรับ', }];
              } else {
                item.LawsuitType = 2
                item.LawsuitEnd = 2
                this.lstype = [{ id: '0', name: 'ส่งฟ้องศาล' }, { id: '1', name: 'เปรียบเทียบปรับ', }, { id: '2', name: 'ไม่มีตัวตน', }];
              }

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
            }
          });
          await this.oninitFullname(localStorage)
          this.lawsuitForm.controls['AccuserTestimony'].setValue(
            "วันนี้ เวลา " + this.lawsuitForm.controls['LawsuitTime'].value + " ข้าฯ พร้อมด้วยพวกได้ดำเนินการจับกุม" +
            textLawbreak + "พร้อมของกลาง ตามบัญชีของกลาง ส.ส.2/4 โดยแจ้งข้อกล่าวหา " + this.lawsuitArrestForm.controls['GuiltBaseName'].value +
            "ให้ทราบ และ นำตัวผู้ต้องหาพร้อมของกลางส่งพนักงานสอบสวน  เพื่อดำเนินคดี แต่ผู้ต้องหายินยอมชำระค่าปรับ ในความผิดที่ถูกกล่าวหา จึงได้นำตัวส่ง"
            // (OfficeName ของบัญชีที่ Login) 
            + "เพื่อดำเนินการต่อไป"
          )
          // Staff Default
          this.setItemFormArray(arrList, 'LawsuitTableList', this.lawsuitForm);
          console.log(this.lawsuitForm.value)
        }
      } else {
        this.lawsuitFormNoData = false
      }
    });

    this.preLoaderService.setShowPreloader(false);
  }
  async setlawsuitForm(res) {
    /// get IsLawsuit check box (IsLawsuitCheck)
    let islaw = res[0]['LawsuitArrestIndicment'][0]['Lawsuit'].length > 0 ? res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['IsLawsuit'] : null;
    let IsLawsuitCheck = true;
    if (islaw == 1) {
      IsLawsuitCheck = false;
      this.lawsuitForm.controls['ReasonDontLawsuit'].setValue('');
    } else {
      IsLawsuitCheck = true;
    }

    let isout = res[0]['LawsuitArrestIndicment'][0]['Lawsuit'].length > 0 ? res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['IsOutside'] : null;
    let IsOutsideCheck = true;
    if (isout == 1) {
      IsOutsideCheck = true;
      this.IsLawsuitType = " น. ";
    } else {
      IsOutsideCheck = false
      this.IsLawsuitType = "";

    }

    ///set lawsuitForm
    if (res[0]['LawsuitArrestIndicment'][0]['Lawsuit'].length > 0) {
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
  oninitFullname(text) {
    if (text) {
      let initName = this.masStaffList.filter(item => (item.FullName.includes(text.fullName)));
      if (initName.length == 1) {
        let value = initName[0]
        this.LawsuitStaffOnsave = value
        this.staff.FirstName = value.FirstName
        this.staff.LastName = value.LastName
        this.staff.TitleName = value.TitleName
        this.staff.FullName = value.FullName
        this.staff.OperationPosName = value.OperationPosName
        this.staff.OfficeShortName = value.OfficeShortName
        this.staff.OfficeCode = value.OfficeCode
        this.lawsuitForm.controls['FullName'].setValue(this.validateData(value.FullName));
        this.lawsuitForm.controls['PositionName'].setValue(this.validateData(value.OperationPosName));
        this.lawsuitForm.controls['DepartmentName'].setValue(this.validateData(value.OfficeShortName));
        this.lawsuitForm.controls['officeCode'].setValue(value.OfficeCode);
        this.suggestions = [];
        let initOffice = this.masOfficeList.filter(item => (item.OfficeName.includes(value.OfficeName)));
        if (initOffice.length > 0) {
          let office = initOffice[0]
          this.LawsuitStaffOnsave.LawsuitStation = office.OfficeName
          this.LawsuitStaffOnsave.LawsuitStationCode = office.OfficeCode
          this.staff.LawsuitStation = office.OfficeName
          this.staff.LawsuitStationCode = office.OfficeCode

          this.lawsuitForm.controls['LawsuitStation'].setValue(this.validateData(office.OfficeName));
          this.lawsuitForm.controls["LawsuitStationCode"].setValue(office.OfficeCode);
          this.suggestionsStation = [];
        }
      }
    }
  }

  onChangeFullnameReslut(text) {
    this.LawsuitStaffOnsave = text
    this.staff.FirstName = text.FirstName
    this.staff.LastName = text.LastName
    this.staff.TitleName = text.TitleName
    this.staff.FullName = text.FullName
    this.staff.OperationPosName = text.OperationPosName
    this.staff.OfficeShortName = text.OfficeShortName
    this.staff.OfficeCode = text.OfficeCode
    this.lawsuitForm.controls['FullName'].setValue(this.validateData(text.FullName));
    this.lawsuitForm.controls['PositionName'].setValue(this.validateData(text.OperationPosName));
    this.lawsuitForm.controls['DepartmentName'].setValue(this.validateData(text.OfficeShortName));
    this.lawsuitForm.controls['officeCode'].setValue(text.OfficeCode);
    this.suggestions = [];
  }
  onChangeStation(textSearch) {
    this.LawsuitLocationOnSave = textSearch
    let _masOfficeList = this.masOfficeList;
    if (textSearch) {
      let result = _masOfficeList.filter(item => (item.OfficeName.includes(textSearch))).slice(0, 10);
      this.suggestionsStation = result;
    }
  }
  onChangeStationReslut(text) {
    this.staff.LawsuitStation = text.OfficeName
    this.staff.LawsuitStationCode = text.OfficeCode
    this.lawsuitForm.controls['LawsuitStation'].setValue(text.OfficeName);
    this.suggestionsStation = [];
  }
  isLawsuitCheckReq() {
    if (this.lawsuitForm.controls['IsLawsuitCheck'].value === true) {
      this.lawsuitForm.controls['ReasonDontLawsuit'].setValidators([Validators.required]);
      this.lawsuitForm.controls['IsOutsideCheck'].setValue(false);
    } else {
      this.lawsuitForm.controls['ReasonDontLawsuit'].clearValidators();
    }
    this.lawsuitForm.clearValidators();
    // this.form.controls["firstName"].setValidators([Validators.minLength(1), Validators.maxLength(30)]);
  }
  changeLawsuitEnd(value, index) {
    let array = this.lawsuitForm.get('LawsuitTableList') as FormArray;
    value == 0 ? array.controls[index].get('LawsuitEnd').setValue(1) : array.controls[index].get('LawsuitEnd').setValue(0);
  }
  IsOutsideCheckReq() {
    if (this.lawsuitForm.controls['IsOutsideCheck'].value === true) {
      this.IsLawsuitType = " น. ";
      this.lawsuitForm.controls['ReasonDontLawsuit'].clearValidators();
      this.lawsuitForm.controls['IsLawsuitCheck'].setValue(false);
    } else {
      this.IsLawsuitType = "";
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
    const dialogRef = this.dialog.open(DialogJudgment, {
      width: '80%',
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

  viewNotComplete(item) {
    const dialogRef = this.dialog.open(DialogNotComplete, {
      width: '80%',
      maxWidth: 'none',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/lawsuit/manage', 'C'], {
          queryParams: { IndictmentID: result, LawsuitID: "" }
        });
        location.reload();
      }

    });
  }



  editTable(item: any, index: number) {
    ///####use this value to get api
    // /item.controls['IndictmentDetailID'].value
    const dialogRef = this.dialog.open(DialogJudgment, {
      width: '1250px',
      // maxWidth: 'none',
      // height: '750px',
      // maxHeight: 'none',
      data: {
        lawsuitArrest: item,
        index: index,
        indicmentID: this.IndictmentID,
        LawsuitID: this.LawsuitID
      },

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.judmentIdList.push(result)
      }
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


// import { MasLawGuitBase } from "../models/mas_law_guitbase";
// import { MasLawGroupSection } from "../models/mas_law_group_section";
// import { MasOffice } from "../models/mas_office";
// import { MasStaff } from "../models/mas_staff";
// import { toLocalShort, toTimeShort } from "../../../config/dateFormat";
// import { Observable } from 'rxjs/Observable';
// import { LawsuitService } from "../lawsuit.service";
// import { Lawsuit } from "../models/lawsuit";
// import { Router, ActivatedRoute } from "@angular/router";
// import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
// import { NavigationService } from "../../../shared/header-navigation/navigation.service";
// import { Arrest } from "../../arrests/models/arrest";
// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// import { FormBuilder } from "@angular/forms";
// import { PreloaderService } from "../../../shared/preloader/preloader.component";
// import { SidebarService } from "../../../shared/sidebar/sidebar.component";
// import { ArrestsService } from "../../arrests/arrests.service";
// import { ProveService } from "../../prove/prove.service";
// import { LawsuitStaffFormControl } from '../models/lawsuit_staff';
// import { LawsuitDocument, LawsuitDocumentFormControl } from '../models/lawsuit_document';
// import { LawsuitArrestStaffFormControl } from '../models/lawsuit_arreststaff';
// import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
// import { Message } from '../../../config/message';
// import { replaceFakePath } from 'app/config/dataString';
// import { MatDialog, MatDialogRef } from '@angular/material';
// import { JudgmentModel } from "../models/judgment";
// import { IMyDpOptions } from "mydatepicker";
// import { MatAutocomplete } from '@angular/material';
// import { map, startWith } from 'rxjs/operators';
// import Swal from 'sweetalert2'

// import { DialogJudgment } from './dialog-judgment'
// import { DialogNotComplete } from './dialog-notComplete';
// import { Lawbreaker } from "app/pages/arrests/components/lawbreaker/lawbreaker.interface";

// @Component({
//   selector: "app-manage",
//   templateUrl: "./manage.component.html"
// })

// export class ManageComponent implements OnInit {

//   LawsuitID: any
//   IndictmentID: any
//   IsLawsuitComplete: number

//   modal: any;
//   showEditField: Boolean;
//   disabled: Boolean = true;

//   lawsuitArrestForm: FormGroup;
//   lawsuitForm: FormGroup;

//   filteredSuggestions: Observable<any[]>;
//   filteredSuggestionsStation: Observable<any[]>;

//   lawsuit: any
//   arrestList: any
//   LawsuitArrestIndictmentProductList: any

//   suggestions: any[] = [];
//   suggestionsStation: any[] = [];
//   lawsuitStaff: any = {};

//   LawsuitArrestIndicmentDetail: any;

//   private onPrintSubscribe: any;
//   private onSaveSubscribe: any;
//   private onCancelSubscribe: any;
//   private onEditSubscribe: any;
//   private onNextPageSubscribe: any;
//   private onDeleteSubscribe: any;

//   @ViewChild('printDocModal') printDocModel: ElementRef;
//   @ViewChild('indicmetModal') indicmetModal: ElementRef;

//   lstype = [{ id: '0', name: 'ส่งฟ้องศาล' }, { id: '1', name: 'เปรียบเทียบปรับ', }, { id: '2', name: 'ไม่มีตัวตน', }];

//   public LawsuitDateOptions: IMyDpOptions = {
//     dateFormat: 'dd mmm yyyy',
//     showClearDateBtn: true,
//     height: '30px',
//     alignSelectorRight: true,
//     openSelectorOnInputClick: true,
//     editableDateField: false
//     // disableSince: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() + 1 },
//   };

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
//     this.setLawsuitArrestForm();
//     this.setLawbreakerListForm()
//     this.setLawsuitForm();

//     this.navService.setNewButton(false);
//     this.navService.setSearchBar(false);

//   }

//   async ngOnInit() {
//     this.sidebarService.setVersion('0.0.0.32');
//     this.preLoaderService.setShowPreloader(true);
//     await this.navigate_service();
//     await this.getParamFromActiveRoute();
//     await this.toolsBar(this.LawsuitID)
//     await this.suggestionsState();

//     this.LawsuitArrestIndictmentProductList = await this.ArrestgetByCon(this.IndictmentID);

//     let lawsuit = await this.LawsuitArrestGetByCon(this.IndictmentID)
//     this.lawsuitArrestForm = await this.createLawsuitArrestForm(lawsuit)
//     this.lawsuit = lawsuit;
//     this.LawsuitArrestIndicmentDetail = lawsuit[0].LawsuitArrestIndicment[0].LawsuitArrestIndicmentDetail[0]
//     await this.setItemFormArray(this.lawsuitArrestForm.value.LawsuitArrestStaff, 'LawsuitArrestStaff', this.lawsuitArrestForm)

//     let createLawsuitTableList = await this.setLawsuitArrestIndicmentDetailList(lawsuit[0].LawsuitArrestIndicment[0].LawsuitArrestIndicmentDetail)


//     await this.setDefult(lawsuit)
//     await this.setItemFormArray(createLawsuitTableList, 'LawsuitTableList', this.lawsuitForm)
//     await this.setButtonCase()
//     await this.filterState()

//     this.preLoaderService.setShowPreloader(false);
//   }

//   private filterState() {
//     this.filteredSuggestions = this.lawsuitForm.controls['FullName'].valueChanges.pipe(
//       startWith(''), map(state => state ? this._filterStatesSuggestions(state) : null)
//     );

//     this.filteredSuggestionsStation = this.lawsuitForm.controls['LawsuitStation'].valueChanges.pipe(
//       startWith(''), map(state => state ? this._filterStatesSuggestionsStation(state) : null)
//     );
//   }

//   private _filterStatesSuggestions(value: string): any[] {
//     if (value.length > 0) {
//       return this.suggestions.filter((state) => state.FullName.includes(value)).slice(0, 10)
//     }
//   }

//   private _filterStatesSuggestionsStation(value: string): any[] {
//     if (value.length > 0) {
//       return this.suggestionsStation.filter(item => (item.OfficeName.includes(value))).slice(0, 10);
//     }
//   }

//   private navigate_service() {
//     this.navService.showFieldEdit.subscribe(async action => {
//       this.showEditField = action;
//     });

//     this.onDeleteSubscribe = this.navService.onDelete.subscribe(async status => {
//       if (status) {
//         await this.navService.setOnDelete(false);
//         this.onDelete();
//       }
//     })

//     this.onPrintSubscribe = this.navService.onPrint.subscribe(async status => {
//       if (status) {
//         await this.navService.setOnPrint(false);
//         this.modal = this.ngbModel.open(this.printDocModel, { size: 'lg', centered: true });
//       }
//     })

//     this.onSaveSubscribe = this.navService.onSave.subscribe(async status => {
//       if (status) {
//         await this.navService.setOnSave(false);
//         this.onSave();
//       }
//     });
//     this.onCancelSubscribe = this.navService.onCancel.subscribe(async status => {
//       if (status) {
//         await this.navService.setOnCancel(false);
//         this.onCancel();
//       }
//     });
//     this.onNextPageSubscribe = this.navService.onNextPage.subscribe(async status => {
//       if (status) {
//         await this.navService.setOnNextPage(false);
//         this.onNextPage();
//       }
//     });
//     this.onEditSubscribe = this.navService.onEdit.subscribe(async status => {
//       if (status) {
//         await this.navService.setOnEdit(false);
//         this.onEdit();
//       }
//     });
//   }

//   get LawsuitDocument(): FormArray {
//     return this.lawsuitForm.get('LawsuitDocument') as FormArray;
//   }

//   get LawsuitTableList(): FormArray {
//     return this.lawsuitForm.get('LawsuitTableList') as FormArray;
//   }

//   private getParamFromActiveRoute() {
//     this.activeRoute.queryParams.subscribe(async params => {
//       this.LawsuitID = params.LawsuitID;
//       this.IndictmentID = params.IndictmentID;
//     });
//   }

//   private setShowButton() {
//     this.navService.setPrintButton(false);
//     this.navService.setNewButton(false);
//     this.navService.setSearchBar(false);
//     this.navService.setDeleteButton(false);
//     this.navService.setCancelButton(false);
//     this.navService.setEditButton(false);
//     this.navService.setSaveButton(false);
//     this.navService.setNextPageButton(false);
//   }

//   private async setButtonCase() {
//     let IsProve = this.lawsuit[0]['LawsuitArrestIndicment'][0]['IsProve']
//     if (IsProve == 0) {
//       var countType = 0;
//       await this.lawsuit[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'].forEach(item => {
//         if (item.LawsuitType == 1) { countType++; }
//       })
//       if (countType > 0) {
//         this.navService.setNextPageButton(true);
//         this.navService.setInnerTextNextPageButton('เปรียบเทียบปรับ')
//       } else {
//         this.navService.setNextPageButton(false);
//       }
//     } else {
//       this.navService.setNextPageButton(true);
//       this.navService.setInnerTextNextPageButton('งานพิสูจน์')
//     }
//   }


//   private setLawsuitArrestForm() {
//     this.lawsuitArrestForm = this.fb.group({
//       ArrestCode: new FormControl(null, Validators.required),
//       OccurrenceDate: new FormControl(null),
//       OccurrenceTime: new FormControl(null, Validators.required),
//       ArrestStation: new FormControl(null, Validators.required),
//       SubSectionType: new FormControl(null, Validators.required),
//       GuiltBaseName: new FormControl(null, Validators.required),
//       SectionNo: new FormControl(null, Validators.required),
//       PenaltyDesc: new FormControl(null),
//       LawsuitArrestStaff: this.fb.array([this.setArrestStaffForm()]),
//     });
//   }

//   private async setLawsuitArrestIndicmentDetailList(LawsuitArrestIndicmentDetail) {
//     let result = [];

//     let LawsuitArrestLawbreaker = LawsuitArrestIndicmentDetail

//     await LawsuitArrestLawbreaker.forEach(Lawbreaker => {
//       let ltempLawbreaker = Lawbreaker.LawsuitArrestLawbreaker[0]
//       let temp: any = {}
//       temp.EntityType = ltempLawbreaker.EntityType == 2 ? "นิติบุคคล" : "บุคคลธรรมดา";
//       temp.LawbreakerType = ltempLawbreaker.LawbreakerType == 0 ? "ต่างชาติ" : "คนไทย";
//       temp.LawsuitNoRef = ltempLawbreaker.LawbreakerType == 1 ? ltempLawbreaker.IDCard : ltempLawbreaker.LawbreakerType == 0 ? ltempLawbreaker.PassportNo : ltempLawbreaker.CompanyRegistrationNo

//       let LawbreakerTitleName = ltempLawbreaker.LawbreakerTitleName ? ltempLawbreaker.LawbreakerTitleName : ""
//       let LawbreakerFirstName = ltempLawbreaker.LawbreakerFirstName ? ltempLawbreaker.LawbreakerFirstName : ""
//       let LawbreakerMiddleName = ltempLawbreaker.LawbreakerMiddleName ? ltempLawbreaker.LawbreakerMiddleName + " " : ""
//       let LawbreakerLastName = ltempLawbreaker.LawbreakerLastName ? ltempLawbreaker.LawbreakerLastName : ""
//       temp.LawBrakerFullName = LawbreakerTitleName + " " + LawbreakerFirstName + " " + LawbreakerMiddleName + LawbreakerLastName
//       temp.IndictmentDetailID = Lawbreaker.IndictmentDetailID
//       temp.LawsuitType = Lawbreaker.LawsuitType
//       temp.LawsuitEnd = Lawbreaker.LawsuitEnd

//       result.push(temp)
//     })

//     return result;
//   }

//   private createLawsuitArrestForm(value) {

//     let arrest = value[0]
//     let guiltbase = value[0].LawsuitArrestIndicment[0].LawsuitLawGuiltbase[0]
//     let penalty = value[0].LawsuitArrestIndicment[0].LawsuitLawGuiltbase[0].LawsuitLawSubSectionRule[0].LawsuitLawSection[0].LawsuitLawPenalty[0]
//     let subsec = value[0].LawsuitArrestIndicment[0].LawsuitLawGuiltbase[0].LawsuitLawSubSectionRule[0].LawsuitLawSubSection[0]

//     return this.fb.group({
//       ArrestCode: new FormControl(arrest.ArrestCode, Validators.required),
//       OccurrenceDate: new FormControl(this.convertDateFormat(arrest.OccurrenceDate)),
//       OccurrenceTime: new FormControl(arrest.OccurrenceTime, Validators.required),
//       ArrestStation: new FormControl(arrest.ArrestStation, Validators.required),
//       SubSectionType: new FormControl(subsec.SubSectionType, Validators.required),
//       GuiltBaseName: new FormControl(guiltbase.GuiltBaseName, Validators.required),
//       SectionNo: new FormControl(guiltbase.LawsuitLawSubSectionRule[0].SectionNo, Validators.required),
//       PenaltyDesc: new FormControl(penalty.PenaltyDesc),
//       LawsuitArrestStaff: this.fb.array([this.createArrestStaffForm(arrest.LawsuitArrestStaff)]),
//     });

//   }

//   private setLawsuitForm() {
//     this.lawsuitForm = this.fb.group({
//       IsLawsuit: new FormControl(false),
//       ReasonDontLawsuit: new FormControl(null),
//       IsOutside: new FormControl(false),
//       LawsuitDate: new FormControl(this.getNowDate() || null, Validators.required),
//       LawsuitTime: new FormControl(this.getNowTime() || null, Validators.required),
//       FullName: new FormControl(null, Validators.required),
//       PositionName: new FormControl(null, Validators.required),
//       DepartmentName: new FormControl(null, Validators.required),
//       LawsuitStation: new FormControl(null, Validators.required),
//       AccuserTestimony: new FormControl(null, Validators.required),
//       LawsuitNo: new FormControl(null, Validators.required),
//       LawsuitNoSub: new FormControl(this.getNowDate().date.year + 543, Validators.required),
//       LawsuitStaff: this.fb.array([this.setStaffForm()]),
//       LawsuitTableList: this.fb.array([this.setLawbreakerListForm()]),
//       LawsuitDocument: this.fb.array([]),
//       officeCode: new FormControl(null)
//     });
//   }

//   private async createLawsuitForm(lawsuit) {

//     let splitLawsuitNo = lawsuit.LawsuitNo ? lawsuit.LawsuitNo.split('/') : ["", ""]

//     this.lawsuitForm = this.fb.group({
//       IsLawsuit: new FormControl(lawsuit.IsLawsuit == 1 ? false : true),
//       ReasonDontLawsuit: new FormControl(lawsuit.ReasonDontLawsuit),
//       IsOutside: new FormControl(lawsuit.IsOutside == 1 ? true : false),
//       LawsuitDate: new FormControl(await this.convertDateStringtoObject(lawsuit.LawsuitDate), Validators.required),
//       LawsuitTime: new FormControl(lawsuit.LawsuitTime ? lawsuit.LawsuitTime : "" || null, Validators.required),
//       FullName: new FormControl(null, Validators.required),
//       PositionName: new FormControl(null, Validators.required),
//       DepartmentName: new FormControl(null, Validators.required),
//       LawsuitStation: new FormControl(lawsuit.LawsuitStation, Validators.required),
//       AccuserTestimony: new FormControl(lawsuit.AccuserTestimony, Validators.required),
//       LawsuitNo: new FormControl(splitLawsuitNo[0], Validators.required),
//       LawsuitNoSub: new FormControl(splitLawsuitNo[1], Validators.required),
//       LawsuitStaff: this.fb.array(lawsuit.LawsuitStaff),
//       LawsuitTableList: this.fb.array([this.setLawbreakerListForm()]),
//       LawsuitDocument: this.fb.array([]),
//       officeCode: new FormControl(lawsuit.officeCode),
//       LawsuitStationCode: new FormControl(lawsuit.LawsuitStationCode),
//     });

//     // this.lawsuitForm.controls['LawsuitDate'].setValue("");
//     let staff = lawsuit.IsLawsuit == 0 ? null : await this.setFullname(lawsuit.LawsuitStaff)
//     lawsuit.IsLawsuit == 0 ? null : await this.onSelectFullname(staff[0] || {})
//     lawsuit.IsLawsuit == 0 ? null : await this.setAccuserTestimony()
//   }
//   async setFullname(staff) {
//     await staff.map(item => {
//       item.FullName = `${item.TitleName} ${item.FirstName} ${item.LastName}`
//     })
//     return staff
//   }
//   async setDefult(lawsuit) {
//     let status = this.IndictmentID > 0 && this.LawsuitID > 0;
//     this.IsLawsuitComplete = lawsuit[0].IsLawsuitComplete
//     this.showEditField = status ? true : false
//     await this.createLawsuitForm(lawsuit[0].LawsuitArrestIndicment[0].Lawsuit[0])
//   }

//   private async suggestionsState() {
//     this.suggestions = await this.lawsuitService.MasStaffMaingetAll()
//     this.suggestions.map(item => {
//       item.FullName = `${item.TitleName} ${item.FirstName} ${item.LastName}`
//     });
//     this.suggestionsStation = await this.lawsuitService.MasOfficeMaingetAll()
//   }

//   private setStaffForm(): FormGroup {
//     LawsuitStaffFormControl.LawsuitID = new FormControl(this.LawsuitID);
//     return this.fb.group(LawsuitStaffFormControl)
//   }
//   private setArrestStaffForm(): FormGroup {
//     LawsuitArrestStaffFormControl.LawsuitID = new FormControl(this.LawsuitID);
//     return this.fb.group(LawsuitArrestStaffFormControl)
//   }
//   private createArrestStaffForm(arrestStaff): FormGroup {
//     arrestStaff.map(staff => {
//       staff.FullName = staff.TitleName + " " + staff.FirstName + " " + staff.LastName
//     })
//     return arrestStaff
//   }

//   private setLawbreakerListForm(): FormGroup {
//     return this.fb.group({
//       EntityType: new FormControl(null),
//       LawbreakerType: new FormControl(null),
//       LawsuitNoRef: new FormControl(null),
//       LawBrakerFullName: new FormControl(null),
//       LawsuitType: new FormControl(null, Validators.required),
//       LawsuitEnd: new FormControl(null, Validators.required),
//       ProductDesc: new FormControl(null),
//     })
//   }

//   private async setAccuserTestimony() {
//     let textLawbreak = ""
//     let check = 0;
//     await this.LawsuitTableList.value.forEach(lawbreak => {
//       textLawbreak = textLawbreak + lawbreak.LawBrakerFullName
//       if (textLawbreak != "" && check != this.LawsuitTableList.length) {
//         textLawbreak = textLawbreak + " และ "
//       }
//       check++;
//     });
//     this.lawsuitForm.controls['AccuserTestimony'].setValue(
//       "วันนี้ เวลา " + this.lawsuitForm.controls['LawsuitTime'].value + " ข้าฯ พร้อมด้วยพวกได้ดำเนินการจับกุม " +
//       textLawbreak + "พร้อมของกลาง ตามบัญชีของกลาง ส.ส.2/4 โดยแจ้งข้อกล่าวหา " + this.lawsuitArrestForm.controls['GuiltBaseName'].value +
//       "ให้ทราบ และ นำตัวผู้ต้องหาพร้อมของกลางส่งพนักงานสอบสวน  เพื่อดำเนินคดี แต่ผู้ต้องหายินยอมชำระค่าปรับ ในความผิดที่ถูกกล่าวหา จึงได้นำตัวส่ง"
//       // (OfficeName ของบัญชีที่ Login) 
//       + "เพื่อดำเนินการต่อไป")
//   }

//   private toolsBar(LawsuitID) {
//     if (LawsuitID > 0) {
//       this.navService.setSaveButton(false);
//       this.navService.setCancelButton(false);
//       this.navService.setPrintButton(true);
//       this.navService.setDeleteButton(true);
//       this.navService.setEditButton(true);
//       this.showEditField = true;
//     } else {
//       this.navService.setSaveButton(true);
//       this.navService.setCancelButton(true);
//       this.showEditField = false;
//     }
//   }

//   public onPrint = (content) => {
//     this.modal = this.ngbModel.open(content, { size: 'lg', centered: true });
//   }

//   public getNowTime() {
//     let hours = "000" + (new Date()).getHours()
//     let min = "000" + (new Date()).getMinutes()
//     return hours.substr(hours.length - 2, hours.length) + ":" + min.substr(min.length - 2, min.length)
//   }

//   public getNowDate() {
//     let now = {
//       day: new Date().getDate(),
//       month: new Date().getMonth() + 1,
//       year: new Date().getFullYear(),
//     }
//     return { date: now };
//   }

//   public convertDateStringtoObject(date) {
//     let now = {
//       day: new Date(date).getDate(),
//       month: new Date(date).getMonth() + 1,
//       year: new Date(date).getFullYear(),
//     }
//     return { date: now };
//   }

//   public convertDateFormat(date) {
//     let convert = new Date(date)
//     let day = "000" + convert.getDate();
//     let month = "000" + convert.getMonth() + 1;
//     let year = convert.getFullYear();
//     return day.substr(day.length - 2, day.length) + "/" + month.substr(month.length - 2, month.length) + "/" + year
//   }

//   public convertDateObjecttoFormat(now) {
//     let day = "000" + now.date.day;
//     let month = "000" + now.date.month;
//     let year = now.date.year;
//     return year + '-' + month.substr(month.length - 2, month.length) + '-' + day.substr(day.length - 2, day.length) + "T00:00:00.0";
//   }

//   private async ArrestgetByCon(indictmentID) {
//     let ArrestIndictmentProduct = await this.lawsuitService.LawsuitArrestIndictmentProductgetByIndictmentID(indictmentID)
//     return ArrestIndictmentProduct.length != 0 ? ArrestIndictmentProduct : []
//   }

//   private async LawsuitArrestGetByCon(indictmentID) {
//     return await this.lawsuitService.LawsuitArrestGetByCon(indictmentID).then(async response => {
//       return await response
//     })
//   }

//   private setItemFormArray(array: any[], formControl: string, formGroup: FormGroup) {
//     if (array !== undefined && array.length) {
//       const itemFGs = array.map(item => this.fb.group(item));
//       const itemFormArray = this.fb.array(itemFGs);
//       formGroup.setControl(formControl, itemFormArray);
//     }
//   }

//   isLawsuitType() {
//     return this.lawsuitForm.value.IsOutside ? " น. " : "   "
//   }

//   isLawsuitStatus() {
//     if (this.lawsuitForm.value.IsLawsuit) {
//       this.lawsuitForm.controls['ReasonDontLawsuit'].setValidators([Validators.required]);
//       this.lawsuitForm.controls['IsOutside'].setValue(false);
//     } else {
//       this.lawsuitForm.controls['ReasonDontLawsuit'].clearValidators();
//     }
//   }

//   isOutsideStatus() {
//     if (this.lawsuitForm.value.IsOutside) {
//       this.lawsuitForm.controls['IsLawsuit'].setValue(false);
//     }
//   }

//   onSelectFullname(select) {
//     let result = this.suggestions.filter(item => (item.FullName.includes(select.FullName))).slice(0, 10);
//     if (result.length == 1) {
//       this.lawsuitForm.controls['PositionName'].setValue(result[0].OperationPosName);
//       this.lawsuitForm.controls['DepartmentName'].setValue(result[0].OfficeShortName);
//       this.lawsuitForm.controls['officeCode'].setValue(result[0].OfficeCode);
//       this.lawsuitForm.controls['LawsuitStation'].setValue(result[0].OfficeName);
//       this.lawsuitForm.controls['LawsuitStationCode'].setValue(result[0].OfficeCode);
//       this.lawsuitForm.controls['FullName'].setValue(result[0].FullName);
//       this.lawsuitForm.controls['LawsuitStaff'].value[0] = result[0];

//       this.lawsuitStaff.LawsuitStation = select.OfficeName
//       this.lawsuitStaff.LawsuitStationCode = select.OfficeCode

//     } else {
//       this.lawsuitForm.controls['PositionName'].setValue('');
//       this.lawsuitForm.controls['DepartmentName'].setValue('');
//       this.lawsuitForm.controls['officeCode'].setValue('');
//     }
//   }

//   onSelectStation(select) {

//     this.lawsuitStaff.LawsuitStationn = select.OfficeName
//     this.lawsuitStaff.LawsuitStationCode = select.OfficeCode

//     this.lawsuitForm.controls['LawsuitStation'].setValue(select.OfficeName);
//     this.lawsuitForm.controls['LawsuitStationCode'].setValue(select.OfficeCode);
//   }

//   changeLawsuitEnd(value, index) {
//     let array = this.lawsuitForm.get('LawsuitTableList') as FormArray;
//     value == 0 ? array.controls[index].get('LawsuitEnd').setValue(1) : array.controls[index].get('LawsuitEnd').setValue(0);
//   }

//   editTable(item: any, index: number) {
//     const dialogRef = this.dialog.open(DialogJudgment, {
//       width: '90%',
//       data: {
//         lawsuitArrest: item,
//         index: index,
//         indicmentID: this.IndictmentID,
//         LawsuitID: this.LawsuitID
//       },

//     });
//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         // this.judmentIdList.push(result)
//       }
//     });
//   }

//   viewNotComplete(item) {
//     const dialogRef = this.dialog.open(DialogNotComplete, {
//       width: '80%',
//       maxWidth: 'none',
//       data: item
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.router.navigate(['/lawsuit/manage', 'C'], {
//           queryParams: { IndictmentID: result, LawsuitID: "" }
//         });
//         location.reload();
//       }

//     });
//   }

//   addDocument() {
//     const lastIndex = this.LawsuitDocument.length - 1;
//     let document = new LawsuitDocument();
//     document.IsNewItem = true;
//     document.DocumentName = "";
//     document.FilePath = "";
//     if (lastIndex < 0) {
//       this.LawsuitDocument.push(this.fb.group(document));
//     } else {
//       const lastDoc = this.LawsuitDocument.at(lastIndex).value;
//       if (lastDoc.DocumentName && lastDoc.FilePath) {
//         this.LawsuitDocument.push(this.fb.group(document));
//       }
//     }
//   }

//   private restartPage() {
//     this.constructor
//     this.ngOnInit()
//   }

//   private onEdit() {
//     this.showEditField = false
//     this.navService.setNextPageButton(false);
//   }

//   private onCancel() {
//     Swal({
//       title: '',
//       text: "ยืนยันการทำรายการหรือไม่",
//       type: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Confirm!'
//     }).then(async (result) => {
//       if (this.IsLawsuitComplete != 1) {
//         let IndictmentDetailID = this.LawsuitArrestIndicmentDetail.IndictmentDetailID
//         this.lawsuitService.LawsuitArrestIndicmentDetailgetByCon(IndictmentDetailID).then(results => {
//           if (results.LawsuitJudgement > 0) {
//             if (this.lawsuitForm.value.LawsuitTableList[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'][0]['LawsuitType'] == 0) {
//               this.router.navigate(['/lawsuit/list']);
//             } else {
//               this.lawsuitService.LawsuitJudgementupdDelete(this.lawsuitArrestForm.value.LawsuitArrestIndicment[0].LawsuitArrestIndicmentDetail[0].LawsuitJudgement[0].JudgementID)
//               this.router.navigate(['/lawsuit/list']);
//             }
//             // case 2.1.1
//           } else {
//             this.router.navigate(['/lawsuit/list']);
//           }
//         });
//       }
//       else {
//         this.restartPage()
//       }
//     })
//   }

//   private async onDelete() {
//     Swal({
//       title: '',
//       text: "ยืนยันการทำรายการหรือไม่",
//       type: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Confirm!'
//     }).then(async (result) => {
//       if (result.value) {
//         this.preLoaderService.setShowPreloader(true);
//         let updDel = await this.lawsuitService.LawsuitArrestupdDeleteLawsuit(this.lawsuitArrestForm.value.ArrestCode, this.IndictmentID)
//         if (updDel.IsSuccess == "True") {
//           Swal({
//             text: "ลบข้อมูลสำเร็จ",
//             type: 'success',
//           })
//           this.preLoaderService.setShowPreloader(false);
//           this.router.navigate(['/lawsuit/list']);
//         } else {
//           Swal({
//             text: "ลบข้อมูลไม่สำเร็จ",
//             type: 'warning',
//           })
//           this.preLoaderService.setShowPreloader(false);
//           return;
//         }
//       } else {
//         this.restartPage()
//       }
//     })
//   }

//   private async onNextPage() {
//     let IsProve = this.lawsuit[0]['LawsuitArrestIndicment'][0]['IsProve']
//     IsProve = await this.lawsuitService.LawsuitArrestGetByCon(this.IndictmentID).then(res => {
//       return res[0].LawsuitArrestIndicment[0].IsProve;
//     });

//     if (IsProve == 0) {/// IdProve = 0 (goto ILG60-06-02-00-00)
//       await this.lawsuitService.LawsuitComparegetByLawsuitID(this.LawsuitID).then(res => {
//         if (res.length == 0) { /// if not found data
//           this.router.navigate(['/fine/manage/R/' + 0 + '/' + this.IndictmentID + "/TN0006036200001"]);

//         } else { ///if found data
//           this.router.navigate(['/fine/manage/R/' + res[0].FineID + '/' + this.IndictmentID + "/TN0006036200001"]);
//         }
//       })
//     } else { /// IdProve = 1 (goto ILG60-05-02-00-00)
//       await this.lawsuitService.LawsuitProvegetByLawsuitID(this.LawsuitID).then(res => {
//         if (res.length == 0) { /// if not found data
//           this.router.navigate(['/prove/manage/C/' + 0 + '/' + this.IndictmentID]);
//         } else { ///if found data
//           this.router.navigate(['/prove/manage/R/' + res[0].ProveID + '/' + this.IndictmentID]);
//         }
//       })
//     }
//   }

//   private async onSave() {
//     let lawsuit = this.lawsuitForm.value;
//     let lawsuitNo = lawsuit.LawsuitNo + "/" + lawsuit.LawsuitNoSub
//     let isOut = lawsuit.IsOutside ? 1 : 0
//     let verify = await this.lawsuitService.LawsuitVerifyLawsuitNo(lawsuitNo, this.lawsuitForm.controls['officeCode'].value, isOut)
//     if (verify.length != 0) {
//       Swal({
//         text: "เลขคดีรับคำกล่าวโทษซ้ำ กรุณา กรอกใหม่",
//         type: 'warning',
//       });
//       this.preLoaderService.setShowPreloader(false);
//       return;
//     } else {
//       if (this.IsLawsuitComplete == 1 || this.IsLawsuitComplete == 0 && this.LawsuitID > 0 && this.IndictmentID > 0) {
//         this.saveEdit()
//       } else {
//         // this.saveFirst()
//       }
//     }

//   }

//   setValueSave(value) {
//     let islaw = value.IsLawsuit ? 0 : 1
//     let tempLawsuitStaff = []
//     console.log(value)

//     tempLawsuitStaff.push({
//       "StaffID": value.LawsuitStaff[0].StaffID ? value.LawsuitStaff[0].StaffID : "",
//       "ProgramCode": "XCS-60",
//       "ProcessCode": "XCS-60-001",
//       "LawsuitID": this.LawsuitID,
//       "StaffCode": value.LawsuitStaff[0].StaffCode,
//       "TitleName": value.LawsuitStaff[0].TitleName,
//       "FirstName": value.LawsuitStaff[0].FirstName,
//       "LastName": value.LawsuitStaff[0].LastName,
//       "PositionCode": "",
//       "PositionName": this.lawsuitForm.controls['PositionName'].value,
//       "PosLevel": value.LawsuitStaff[0].PosLevel ? value.LawsuitStaff[0].PosLevel : "",
//       "PosLevelName": value.LawsuitStaff[0].PosLevelName ? value.LawsuitStaff[0].PosLevelName : "",
//       "DepartmentCode": "",
//       "DepartmentName": "",
//       "DepartmentLevel": value.LawsuitStaff[0].DeptLevel ? value.LawsuitStaff[0].DeptLevel : "",
//       "OfficeCode": value.LawsuitStaff[0].OfficeCode,
//       "OfficeName": value.LawsuitStaff[0].OfficeName,
//       "OfficeShortName": value.LawsuitStaff[0].OfficeShortName,
//       "ContributorID": 12,
//       "IsActive": value.LawsuitStaff[0].IsActive
//     })

//     return {
//       "LawsuitID": this.LawsuitID,
//       "ArrestCode": this.lawsuitArrestForm.value.ArrestCode,
//       "IndictmentID": this.IndictmentID,
//       "IsLawsuit": islaw,
//       "ReasonDontLawsuit": "",
//       "LawsuitNo": islaw == 0 ? "" : value.LawsuitNo + "/" + value.LawsuitNoSub,
//       "LawsuitDate": islaw == 0 ? "" : typeof value.LawsuitDate == "string" ? value.LawsuitDate : this.convertDateObjecttoFormat(value.LawsuitDate),
//       "LawsuitTime": islaw == 0 ? "" : this.lawsuitForm.controls['LawsuitTime'].value,
//       "LawsuitStationCode": islaw == 0 ? "" : this.lawsuitForm.controls['LawsuitStationCode'].value,
//       "LawsuitStation": islaw == 0 ? "" : this.lawsuitForm.controls['LawsuitStation'].value,
//       "IsOutside": islaw == 0 ? null : value.IsOutside ? 1 : 0,
//       "AccuserTestimony": islaw == 0 ? "" : this.lawsuitForm.controls['AccuserTestimony'].value,
//       "LawsuitResult": '',
//       "DeliveryDocNo": '',
//       "DeliveryDate": islaw == 0 ? "" : typeof value.LawsuitDate == "string" ? value.LawsuitDate : this.convertDateObjecttoFormat(value.LawsuitDate),
//       "IsActive": 1,
//       "LawsuitType": islaw == 0 ? null : Number(this.LawsuitTableList.value[0].LawsuitType),
//       "LawsuitEnd": islaw == 0 ? null : Number(this.LawsuitTableList.value[0].LawsuitEnd),
//       "LawsuitStaff": islaw == 0 ? [] : tempLawsuitStaff
//     }
//   }
//   setValueSaveLawsuitCase(value) {
//     let islaw = value.IsLawsuit ? 0 : 1

//     return {
//       "LawsuitID": this.LawsuitID,
//       "ArrestCode": this.lawsuitArrestForm.value.ArrestCode,
//       "IndictmentID": Number(this.IndictmentID),
//       "IsLawsuit": islaw,
//       "ReasonDontLawsuit": value.ReasonDontLawsuit ? value.ReasonDontLawsuit : "",
//       "LawsuitNo": "",
//       "LawsuitDate": "",
//       "LawsuitTime": "",
//       "LawsuitStationCode": "",
//       "LawsuitStation": "",
//       "IsOutside": null,
//       "AccuserTestimony": "",
//       "LawsuitResult": '',
//       "DeliveryDocNo": '',
//       "DeliveryDate": "",
//       "IsActive": 1,
//       "LawsuitType": null,
//       "LawsuitEnd": null,
//       "LawsuitStaff": []
//     }
//   }
//   async saveEdit() {
//     let value = this.lawsuitForm.value
//     let result = value.IsLawsuit ? this.setValueSaveLawsuitCase(value) : this.setValueSave(value)

//     console.log(result)

//     // let service = await this.lawsuitService.LawsuitinsAll(result)
//     let service = await this.lawsuitService.LawsuitformupdByCon(result)
//     if (service.IsSuccess) {

//       await this.lawsuitService.LawsuitArrestIndicmentupdByCon(this.IndictmentID)
//       let complete = await this.lawsuitService.LawsuitArrestCheckNotComplete(this.lawsuitArrestForm.controls['ArrestCode'].value)
//       let LawsuitArrestIndicmentDetail = this.lawsuit[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'] || []
//       if (LawsuitArrestIndicmentDetail.length != 0) {
//         await this.LawsuitTableList.value.forEach(async element => {
//           let ArrestIndicmentDetail = await this.lawsuitService.LawsuitArrestIndicmentDetailgetByCon(element.IndictmentDetailID)
//           await this.lawsuitService.LawsuitArrestIndicmentDetailupdByCon(element.IndictmentDetailID, Number(element.LawsuitType), Number(element.LawsuitEnd))
//           if (element.LawsuitType != 0) {
//             if (ArrestIndicmentDetail['LawsuitJudgement'].length > 0) {
//               await this.lawsuitService.LawsuitJudgementupdDelete(ArrestIndicmentDetail['LawsuitJudgement'][0]['JudgementID'])
//             }
//           }
//         })
//         await this.restartPage()
//         Swal({
//           text: "บันทึกสำเร็จ",
//           type: 'success',
//         })
//         if (complete.length != 0) {
//           let popup = {
//             checkComplete: complete
//           }
//           this.viewNotComplete(popup)
//         }
//       }
//       else {
//         await this.restartPage()
//         if (service.IsSuccess == "True") {
//           Swal({
//             text: "บันทึกสำเร็จ",
//             type: 'success',
//           })

//           if (complete.length != 0) {
//             let popup = {
//               checkComplete: complete
//             }
//             this.viewNotComplete(popup)
//           }
//         }
//       }
//     }

//   }
//   saveFirst() {

//   }
// }