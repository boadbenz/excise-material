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
import { JudgmentModel } from "../models/judgment";
import { IMyDpOptions } from "mydatepicker";
import { MatAutocomplete } from '@angular/material';

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
  @ViewChild('printDocModal') printDocModel: ElementRef;
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
    this.sidebarService.setVersion('0.0.0.31');
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
      if (status) {
        await this.navService.setOnPrint(false);
        this.modal = this.ngbModel.open(this.printDocModel, { size: 'lg', centered: true });
      }
    })
    this.onSaveSubscribe = this.navService.onSave.subscribe(async status => {
      if (status) {
        await this.navService.setOnSave(false);
        console.log('this.lawsuitForm.valid===>', this.findInvalidControls())

        if (this.findInvalidControls().length > 0 && this.lawsuitForm.controls['IsLawsuitCheck'].value == false) {
          this.isRequired = true;
          console.log(this.lawsuitForm.controls['IsLawsuitCheck'].value)
          Swal({
            text: Message.checkData,
            type: 'warning',
          })

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

  async ngOnDestroy() {
    await this.getDataFromListPage.unsubscribe();
    await this.onPrintSubscribe.unsubscribe();
    await this.onSaveSubscribe.unsubscribe();
    await this.onCancelSubscribe.unsubscribe();
    await this.setShowButton()
  }
  private async onEdit() {
    this.navService.setNextPageButton(false);
    this.preLoaderService.setShowPreloader(true);
    if (this.lawsuitList[0]['LawsuitArrestIndicment'][0]['IsProve'] == 0) {/// IdProve = 0
      this.lawsuitList[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'].forEach(async element => {
        if (element['LawsuitType'] == 0) {
          let PaymentFine = await this.lawsuitService.LawsuitPaymentFinegetByJudgementID(element['LawsuitJudgement'][0]['JudgementID'])
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
        } else { ///if found data

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
        if (IsLawsuitComplete == 1) {
          this.navService.setCancelButton(false);
          this.navService.setSaveButton(false);
          this.navService.setEditField(true);
        } else {
          let IndictmentDetailID = this.lawsuitList[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'][0].IndictmentDetailID
          this.lawsuitService.LawsuitArrestIndicmentDetailgetByCon(IndictmentDetailID).then(result => {
            if (result.LawsuitJudgement > 0) {
              if (this.lawsuitList[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'][0]['LawsuitType'] == 0) {
                this.router.navigate(['/lawsuit/list']);
              } else {
                this.lawsuitService.LawsuitJudgementupdDelete(this.lawsuitArrestForm.value.LawsuitArrestIndicment[0].LawsuitArrestIndicmentDetail[0].LawsuitJudgement[0].JudgementID)
                this.router.navigate(['/lawsuit/list']);
              }
              // case 2.1.1
            } else {
              this.router.navigate(['/lawsuit/list']);
            }
          });
          this.navService.setEditField(true);
          this.navService.setCancelButton(false);
          this.navService.setSaveButton(false);
        }
        this.navService.setPrintButton(true);
        this.navService.setDeleteButton(true);
        this.navService.setEditButton(true);
        if (this.prove == 1) {
          this.navService.setNextPageButton(true);
          this.navService.setInnerTextNextPageButton('งานพิสูจน์')
        } else if (this.prove == 0) {
          this.navService.setNextPageButton(true);
          this.navService.setInnerTextNextPageButton('งานเปรียบเทียบ')
        }
      } else {
        return;
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

  private async onSave() {
    this.preLoaderService.setShowPreloader(true);
    let IsLawsuitComplete = this.lawsuitList[0]['IsLawsuitComplete'];
    if (IsLawsuitComplete == 1 || IsLawsuitComplete == 0 && Number(this.LawsuitID) > 0) {
      let lawsuitNo = this.lawsuitForm.controls['LawsuitNo'].value + '/' + this.lawsuitForm.controls['LawsuitNoSub'].value;

      let dateNow = this.lawsuitForm.controls['LawsuitDate'].value ? (this.lawsuitForm.controls['LawsuitDate'].value).date : null
      let _lawDate = dateNow ? dateNow.year + '-' + dateNow.month + '-' + dateNow.day + "T00:00:00.0" : "";


      let tempLawsuitStaff = [];
      let isOut = this.lawsuitForm.controls['IsOutsideCheck'].value ? 1 : 0;
      let isLaw = this.lawsuitForm.controls['IsLawsuitCheck'].value ? 0 : 1;
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
        "IsActive": this.staff.IsActive
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
          await this.lawsuitService.LawsuitArrestIndicmentDetailupdByCon(element.IndictmentDetailID, Number(element.LawsuitType), Number(element.LawsuitEnd))
          if (element.LawsuitType != 0) {
            if (ArrestIndicmentDetail['LawsuitJudgement'].length > 0) {
              await this.lawsuitService.LawsuitJudgementupdDelete(ArrestIndicmentDetail['LawsuitJudgement'][0]['JudgementID'])
            }
            // if (ArrestIndicmentDetail.IsFine == 1) {
            //   await this.lawsuitService.LawsuitPaymentFineDetailupdDelete(ArrestIndicmentDetail.PaymentFineID)
            // }
          }
        });
        if (update.IsSuccess == "True") {
          Swal({
            text: "บันทึกสำเร็จ",
            type: 'success',
          })

          let checkComplete = await this.lawsuitService.LawsuitArrestCheckNotComplete(this.lawsuitArrestForm.controls['ArrestCode'].value)
          if (checkComplete.length != 0) {
            let popup = {
              checkComplete: checkComplete
            }
            this.viewNotComplete(popup)
            this.showEditField = false;
            this.navService.setEditField(true);
            this.navService.setEditButton(true);
            this.navService.setPrintButton(true);
            this.navService.setDeleteButton(true);
            this.navService.setSaveButton(false);
            this.navService.setCancelButton(false);
            if (this.prove == 1) {
              this.navService.setNextPageButton(true);
              this.navService.setInnerTextNextPageButton('งานพิสูจน์')
            } else if (this.prove == 0) {
              this.navService.setNextPageButton(true);
              this.navService.setInnerTextNextPageButton('งานเปรียบเทียบ')
            }
            this.preLoaderService.setShowPreloader(false);
          } else {
            this.showEditField = false;
            this.navService.setEditField(true);
            this.navService.setEditButton(true);
            this.navService.setPrintButton(true);
            this.navService.setDeleteButton(true);
            this.navService.setSaveButton(false);
            this.navService.setCancelButton(false);
            if (this.prove == 1) {
              this.navService.setNextPageButton(true);
              this.navService.setInnerTextNextPageButton('งานพิสูจน์')
            } else if (this.prove == 0) {
              this.navService.setNextPageButton(true);
              this.navService.setInnerTextNextPageButton('งานเปรียบเทียบ')
            }
            this.preLoaderService.setShowPreloader(false);
          }
        } else {
          Swal({
            text: "บันทึกไม่สำเร็จ",
            type: 'warning',
          })
        }
      } else {
        if (update.IsSuccess == "True") {
          Swal({
            text: "บันทึกสำเร็จ",
            type: 'success',
          })
          let checkComplete = await this.lawsuitService.LawsuitArrestCheckNotComplete(this.lawsuitArrestForm.controls['ArrestCode'].value)
          if (checkComplete.length != 0) {
            let popup = {
              checkComplete: checkComplete
            }
            this.viewNotComplete(popup)
            this.showEditField = false;
            this.navService.setEditField(true);
            this.navService.setEditButton(true);
            this.navService.setPrintButton(true);
            this.navService.setDeleteButton(true);
            this.navService.setSaveButton(false);
            this.navService.setCancelButton(false);
            if (this.prove == 1) {
              this.navService.setNextPageButton(true);
              this.navService.setInnerTextNextPageButton('งานพิสูจน์')
            } else if (this.prove == 0) {
              this.navService.setNextPageButton(true);
              this.navService.setInnerTextNextPageButton('งานเปรียบเทียบ')
            }
            this.preLoaderService.setShowPreloader(false);
          } else {
            this.showEditField = false;
            this.navService.setEditField(true);
            this.navService.setEditButton(true);
            this.navService.setPrintButton(true);
            this.navService.setDeleteButton(true);
            this.navService.setSaveButton(false);
            this.navService.setCancelButton(false);
            if (this.prove == 1) {
              this.navService.setNextPageButton(true);
              this.navService.setInnerTextNextPageButton('งานพิสูจน์')
            } else if (this.prove == 0) {
              this.navService.setNextPageButton(true);
              this.navService.setInnerTextNextPageButton('งานเปรียบเทียบ')
            }
            this.preLoaderService.setShowPreloader(false);
          }
        } else {
          Swal({
            text: "บันทึกไม่สำเร็จ",
            type: 'warning',
          })
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
      return await this.lawsuitService.LawsuitVerifyLawsuitNo(lawsuitNo, this.lawsuitForm.controls['officeCode'].value, isOut).then(async res => {
        console.log(res)
        if (res.length != 0) {
          Swal({
            text: "เลขคดีรับคำกล่าวโทษซ้ำ กรุณา กรอกใหม่",
            type: 'warning',
          });
          this.preLoaderService.setShowPreloader(false);
          return;
        } else {
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
            "LawsuitStationCode": (this.lawsuitForm.controls['LawsuitStation'].value).OfficeCode,
            "LawsuitStation": (this.lawsuitForm.controls['LawsuitStation'].value).OfficeName,
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
              // await this.lawsuitService.LawsuitArrestIndicmentDetailupdByCon(this.lawsuitList[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'][0].IndictmentDetailID, this.LawsuitTableList.value[0].LawsuitType, this.LawsuitTableList.value[0].LawsuitEnd)
              let checkComplete = await this.lawsuitService.LawsuitArrestCheckNotComplete(this.lawsuitArrestForm.controls['ArrestCode'].value)
              let LawsuitArrestIndicmentDetail = this.lawsuitList[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'] || []
              if (LawsuitArrestIndicmentDetail.length != 0) {
                await this.LawsuitTableList.value.forEach(async element => {
                  let ArrestIndicmentDetail = await this.lawsuitService.LawsuitArrestIndicmentDetailgetByCon(element.IndictmentDetailID)
                  await this.lawsuitService.LawsuitArrestIndicmentDetailupdByCon(element.IndictmentDetailID, Number(element.LawsuitType), Number(element.LawsuitEnd))
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
                  this.showEditField = false;
                  this.navService.setEditField(true);
                  this.navService.setEditButton(true);
                  this.navService.setPrintButton(true);
                  this.navService.setDeleteButton(true);
                  this.navService.setSaveButton(false);
                  this.navService.setCancelButton(false);
                  if (this.prove == 1) {
                    this.navService.setNextPageButton(true);
                    this.navService.setInnerTextNextPageButton('งานพิสูจน์')
                  } else if (this.prove == 0) {
                    this.navService.setNextPageButton(true);
                    this.navService.setInnerTextNextPageButton('งานเปรียบเทียบ')
                  }
                  this.preLoaderService.setShowPreloader(false);
                  this.router.navigate(['/lawsuit/manage', 'R'], {
                    queryParams: { IndictmentID: this.IndictmentID, LawsuitID: result.LawsuitID }
                  });
                } else {
                  await this.lawsuitService.LawsuitArrestupdByCon(this.lawsuitArrestForm.value.ArrestCode)
                  this.showEditField = false;
                  this.navService.setEditField(true);
                  this.navService.setEditButton(true);
                  this.navService.setPrintButton(true);
                  this.navService.setDeleteButton(true);
                  this.navService.setSaveButton(false);
                  this.navService.setCancelButton(false);
                  if (this.prove == 1) {
                    this.navService.setNextPageButton(true);
                    this.navService.setInnerTextNextPageButton('งานพิสูจน์')
                  } else if (this.prove == 0) {
                    this.navService.setNextPageButton(true);
                    this.navService.setInnerTextNextPageButton('งานเปรียบเทียบ')
                  }
                  this.preLoaderService.setShowPreloader(false);
                  this.router.navigate(['/lawsuit/manage', 'R'], {
                    queryParams: { IndictmentID: this.IndictmentID, LawsuitID: result.LawsuitID }
                  });
                }

              } else {
                console.log("not success")
                this.preLoaderService.setShowPreloader(false);
              }
            }
          })

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
      LawsuitTime: new FormControl(this.getNowTime() || null, Validators.required),
      FullName: new FormControl(null, Validators.required),
      PositionName: new FormControl(null, Validators.required),
      DepartmentName: new FormControl(null, Validators.required),
      LawsuitStation: new FormControl(null, Validators.required),
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
    console.log(IndictmentID)
    this.preLoaderService.setShowPreloader(true);
    let ArrestIndictmentProduct = await this.lawsuitService.LawsuitArrestIndictmentProductgetByIndictmentID(IndictmentID)
    if (ArrestIndictmentProduct.length != 0) {
      console.log('ArrestIndictmentProduct page reload step 1 in line 976 ===>', ArrestIndictmentProduct)
      this.LawsuitArrestIndictmentProduct = ArrestIndictmentProduct;
      this.LawsuitArrestIndictmentProductTableListShow = true;
    }
    await this.lawsuitService.LawsuitArrestGetByCon(IndictmentID).then(async res => {
      console.log(res)
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
            console.log(islaw)
            if (islaw == 1) {
              this.staff = res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitStaff'][0]
              this.staff.LawsuitStation = res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0].LawsuitStation
              this.staff.LawsuitStationCode = res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0].LawsuitStationCode
              this.staff.StaffID = res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitStaff'][0].StaffID
              IsLawsuitCheck = false;
              this.lawsuitForm.controls['IsLawsuitCheck'].setValue(false);
              this.lawsuitForm.controls['ReasonDontLawsuit'].setValue('');
              this.lawsuitForm.controls['ReasonDontLawsuit'].clearValidators()
            } else {
              this.lawsuitForm.controls['ReasonDontLawsuit'].setValue(res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['ReasonDontLawsuit']);
              this.lawsuitForm.controls['LawsuitDate'].setValue('');
              this.lawsuitForm.controls['LawsuitTime'].setValue('');
              this.lawsuitForm.controls['LawsuitNo'].setValue('');
              this.lawsuitForm.controls['LawsuitNoSub'].setValue('');
              this.lawsuitForm.controls['IsLawsuitCheck'].setValue(true);
            }
          }
          let IsProve = res[0]['LawsuitArrestIndicment'][0].IsProve;
          this.prove = IsProve
          if (IsProve == 0) {
            var countType = 0;
            await res[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'].forEach(item => {
              if (item.LawsuitType == 1) { countType++; }
            })
            if (countType > 0) {
              this.navService.setNextPageButton(true);
              this.navService.setInnerTextNextPageButton('เปรียบเทียบปรับ')
            } else {
              this.navService.setNextPageButton(false);
            }
          } else {
            this.navService.setNextPageButton(true);
            this.navService.setInnerTextNextPageButton('งานพิสูจน์')
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
          console.log(localStorage)
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
        if (initOffice.length == 1) {
          let office = initOffice[0]
          this.lawsuitForm.controls['LawsuitStation'].setValue(this.validateData(office.OfficeName));
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
    ///###change path to lawsuit detail
    console.log('viewData===>', item);
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
      width: '90%',
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
