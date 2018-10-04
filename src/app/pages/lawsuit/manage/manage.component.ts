import { MasLawGuitBase } from "../models/mas_law_guitbase";
import { MasLawGroupSection } from "../models/mas_law_group_section";
import { MasOffice } from "../models/mas_office";
import { MasStaff } from "../models/mas_staff";
import { toLocalShort, toTimeShort } from "../../../config/dateFormat";
import { Observable } from 'rxjs/Observable';
import { LawsuitService } from "../lawsuit.service";
import { Lawsuit } from "../models/lawsuit";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit ,ViewChild, ElementRef } from "@angular/core";
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
import { FormGroup,FormArray, FormControl, Validators } from '@angular/forms';
import { Message } from '../../../config/message';
import { replaceFakePath } from 'app/config/dataString';
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
  private getDataFromListPage: any;
  private onPrintSubscribe: any;
  private onSaveSubscribe: any;
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

   lawsuitTypeSelected:number;
  constructor(
    private activeRoute: ActivatedRoute,

    private router: Router,
    private fb: FormBuilder,
    private navService: NavigationService,
    private ngbModel: NgbModal,
    private sidebarService: SidebarService,
    private preLoaderService: PreloaderService,
    private lawsuitService: LawsuitService
 
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
    this.disabled = true;
    await this.getParamFromActiveRoute();
    this.navigate_service();
    this.createForm();
    this.createLawsuitForm();
    this.ArrestgetByCon(this.IndictmentID,this.LawsuitID);
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
      if(status) {
        await this.navService.setOnSave(false);
        if (!this.lawsuitForm.valid) {
          this.isRequired = true;
          alert(Message.checkData)
          return false;
      }
        this.onSave();
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
  }
  
  
  private async onSave() {
    console.log("ONSAVE CLICK");
    this.preLoaderService.setShowPreloader(true);
    let IsLawsuitComplete = this.lawsuitList[0]['IsLawsuitComplete'];
    if(IsLawsuitComplete == 1) {
      this.lawsuitService.LawsuitupdByCon(this.lawsuitForm.value);
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
      LawBrakerFullName: new FormControl(null,Validators.required),
      LawsuitType: new FormControl(null, Validators.required),
      LawsuitEnd: new FormControl(null, Validators.required),
      ProductDesc: new FormControl(null, Validators.required),
    })
      
  }
  private setItemFormArray(array: any[], formControl: string,formGroup: FormGroup) {
    if (array !== undefined && array.length) {
        const itemFGs = array.map(item => this.fb.group(item));
        console.log("ITEMFGS"+itemFGs.values);
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
      Fullname: new FormControl(null,Validators.required),
      PositionName: new FormControl(null, Validators.required),
      DepartmentName: new FormControl(null, Validators.required),
      LawsuitStation: new FormControl(null, Validators.required),
      AccuserTestimony: new FormControl(null, Validators.required),
      LawsuitNo: new FormControl(null,Validators.required),
      LawsuitStaff: this.fb.array([this.createStaffForm()]),
      LawsuitTableList: this.fb.array([this.createTableListForm()]),
      LawsuitDocument: this.fb.array([]),
      
    });
    }
    private async ArrestgetByCon(IndictmentID: string,LawsuitID: number) {
      await this.lawsuitService.LawsuitArrestGetByCon(IndictmentID).then(async res => {
        this.lawsuitList = res || [];
        console.log("params"+IndictmentID);
       
        
          await this.lawsuitArrestForm.reset({
            ArrestCode: res[0]['ArrestCode'],
            OccurrenceDate: res[0]['OccurrenceDate'],
            OccurrenceTime: res[0]['OccurrenceTime'],
            ArrestStation: res[0]['ArrestStation'],
            SubSectionType: res[0]['LawsuitArrestIndicment'][0]['LawsuitLawGuiltbase'][0]['LawsuitLawSubSectionRule'][0]['LawsuitLawSubSection'][0]['SubSectionType'],
            GuiltBaseName: res[0]['LawsuitArrestIndicment'][0]['LawsuitLawGuiltbase'][0]['GuiltBaseName'],
            SectionNo: res[0]['LawsuitArrestIndicment'][0]['LawsuitLawGuiltbase'][0]['LawsuitLawSubSectionRule'][0]['SectionNo'],
            PenaltyDesc: res[0]['LawsuitArrestIndicment'][0]['LawsuitLawGuiltbase'][0]['LawsuitLawSubSectionRule'][0]['LawsuitLawSection'][0]['LawsuitLawPenalty'][0]['PenaltyDesc'] ,
     
          });
          const arreststaff = res[0]['LawsuitArrestStaff'].filter(item => item.IsActive == 1);
          await arreststaff.map(item => {
              item.FullName = `${item.TitleName} ${item.FirstName} ${item.LastName}`
          });
          console.log("arreststaff"+JSON.stringify(arreststaff));
          this.setItemFormArray(arreststaff, 'LawsuitArrestStaff',this.lawsuitArrestForm);
          
        if(res) {
          let IsLawsuitComplete = res[0]['IsLawsuitComplete'];
          console.log("ISLAWSUIT:"+res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['IsLawsuit']);
          console.log("ISOUTSIDE:"+res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['IsOutside']);
          console.log("LAWSUIT NO:"+res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitNo']);
          if(IsLawsuitComplete == 1) {
            console.log("LAWSUIT COMPLETE = 1");
            this.lawsuitService.MasDocumentMaingetAll(4,LawsuitID).then(masdoc => {
              //this.masDocList = masdoc || [];
            });
          let islaw = res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['IsLawsuit'];
          let IsLawsuitCheck;
          if(islaw==0) {
            IsLawsuitCheck = 'true';
          } else {
            IsLawsuitCheck = '';
          }
          let isout = res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['IsOutside'];
          let IsOutsideCheck;
          if(isout==1) {
            IsOutsideCheck = 'true';
          } else {
            IsOutsideCheck = '';
          }
        
          console.log("ISLAWSUIT========"+IsLawsuitCheck);
          console.log("IsOutside========"+IsOutsideCheck);
          await this.lawsuitForm.reset({
            IsLawsuitCheck: IsLawsuitCheck,
            ReasonDontLawsuit: res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['ReasonDontLawsuit'],
            IsOutsideCheck: IsOutsideCheck,
            LawsuitNo: res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitNo'],
            LawsuitDate: res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitDate'],
            LawsuitTime: res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitTime'],
            LawsuitStation: res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitStation'],
            AccuserTestimony: res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['AccuserTestimony'] ,
          });
          //console.log("LAWSUIT STAFF"+JSON.stringify(res[0]['LawsuitArrestIndicment'][0]['Lawsuit']));
          const staff = res[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitStaff'].filter(item => item.IsActive == 1);
          staff.map(item => {
              item.FullName = `${item.TitleName} ${item.FirstName} ${item.LastName}`
          });
          this.setItemFormArray(staff, 'LawsuitStaff',this.lawsuitForm);
          let arrList = [];
          
          await res[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'].map(item => {
            console.log("ITEM IN LAW BRAKER"+item);
            res[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'][0]['LawsuitArrestLawbreaker'].map(arrestLaw => {
              item.lawBrakerFullName = `${arrestLaw.LawbreakerTitleName} ${arrestLaw.LawbreakerFirstName} ${arrestLaw.LawbreakerLastName}`
            });
            console.log("LAW BRAKER FULL NAME:"+item.lawBrakerFullName);
            let lt = item.LawsuitType;
            let ln = item.LawsuitEnd;
            console.log("LAWSUIT TYPE"+lt);
            console.log("LAWSUIT END"+ln);
            /*if(lt == 0) {
              item.LawsuitType = "ส่งฟ้องศาล";
            } else if(lt == 1) {
              item.LawsuitType = "เปรียบเทียบปรับ";
            } else if(lt == 2) {
              item.LawsuitType = "ไม่มีตัวตน";
            }
            if(ln == 0) {
              item.LawsuitEnd = "กรมสรรพสามิต";
            } else if(ln == 1) {
              item.LawsuitEnd = "ศาล";
            } else if(ln == 2) {
              item.LawsuitEnd = "พนักงานฝ่ายปกครอง/พนักงำนอัยการ";
            }*/
            //this.lawsuitTypeSelected = item.LawsuitType;
            console.log("LAWSUIT TYPE"+item.LawsuitType);
            console.log("LAWSUIT END"+item.LawsuitEnd);
            if(item.LawsuitArrestProductDetail != null && item.LawsuitArrestProductDetail.length) {
              item.ProductDesc = item.LawsuitArrestProductDetail.ProductDesc;
            } else {
              item.ProductDesc = '';
            }
            console.log("Prod DESC"+item.ProductDesc);
            let a = {
              'LawBrakerFullName':item.lawBrakerFullName,
              'LawsuitType':item.LawsuitType,
              'LawsuitEnd':item.LawsuitEnd,
              'ProductDesc':item.ProductDesc,
            };
            arrList.push(a)
          });
        
          console.log("LAWBRAKER:"+JSON.stringify(arrList));
          this.setItemFormArray(arrList, 'LawsuitTableList',this.lawsuitForm);
          
       

        
        
          let isProve = res[0]['LawsuitArrestIndicment'][0]['IsProve'];
          let lawsuitType = res[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'][0]['LawsuitType'];
            console.log("isProve"+isProve);
            console.log("lawsuitType"+lawsuitType);
          if(isProve == 0) {
            if(lawsuitType == 1) {
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
              this.navService.setInnerTextNextPageButton('เปรียบเทียบปรับ')
            }
          //islawsuitcomplete!=1
          } else {
            console.log("LAWSUIT COMPLETE = 0");
            this.lawsuitService.MasStaffMaingetAll().then(masstaff => {
              console.log(JSON.stringify(masstaff));
              this.masStaffList = masstaff || [];
            });
            this.lawsuitService.MasOfficeMaingetAll().then(masoffice => {
              console.log(JSON.stringify(masoffice));
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
        let dataSource = reader.result.split(',')[1];
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
    editTable(item:any,index: number) {
      alert((item.get('LawsuitType').value));
    }



    
}


