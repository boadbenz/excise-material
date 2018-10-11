import { MasLawGuitBase } from "../models/mas_law_guitbase";
import { MasLawGroupSection } from "../models/mas_law_group_section";
import { MasOffice } from "../models/mas_office";
import { MasStaff } from "../models/mas_staff";
import { toLocalShort, toTimeShort } from "../../../config/dateFormat";
import { LawsuitService } from "../lawsuit.service";
import { Lawsuit } from "../models/lawsuit";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit ,ViewChild, ElementRef } from "@angular/core";
import { NavigationService } from "../../../shared/header-navigation/navigation.service";
import { Arrest } from "../../arrests/models/arrest";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder } from "@angular/forms";
import { PreloaderService } from "../../../shared/preloader/preloader.component";
import { SidebarService } from "../../../shared/sidebar/sidebar.component";
import { ArrestsService } from "../../arrests/arrests.service";
import { ProveService } from "../../prove/prove.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html"
})
export class ManageComponent implements OnInit {
  masOfficeList: MasOffice[] = [];
  masStaffList: MasStaff[] = [];
  lawsuitList: Lawsuit[] = [];
  masLawGroupSectionList: MasLawGroupSection[] = [];
  masLawGuitBaseList: MasLawGuitBase[] = [];
  arrestList: Arrest[] = [];
  errorShow: any;
  modal: any;
  lawsuitForm: FormGroup;
  private getDataFromListPage: any;
  private onPrintSubscribe: any;
  private onSaveSubscribe: any;
  @ViewChild('printDocModal') printDocModel: ElementRef;
  constructor(
    private activeRoute: ActivatedRoute,
    private suspectModalService: NgbModal,
    private router: Router,
    private fb: FormBuilder,
    private navService: NavigationService,
    private ngbModel: NgbModal,
    private sidebarService: SidebarService,
    private arrestService: ArrestsService,
    private proveService: ProveService,
    private preLoaderService: PreloaderService,
    private lawsuitService: LawsuitService
  ) {
    this.setShowButton();
    this.navService.setNewButton(false);
    this.navService.setSearchBar(false);
    // this.navService.setInnerTextNextPageButton('งานจับกุม')
  }

  async ngOnInit() {
    this.sidebarService.setVersion('0.0.0.4');
    // this.preLoaderService.setShowPreloader(true);
    await this.getParamFromActiveRoute();
    this.navigate_service();

    // this.preLoaderService.setShowPreloader(false);
  }
  private navigate_service() {
    this.onPrintSubscribe = this.navService.onPrint.subscribe(async status => {
        if (status) {
            await this.navService.setOnPrint(false);
            this.modal = this.ngbModel.open(this.printDocModel, { size: 'lg', centered: true });
        }
    })
    this.onSaveSubscribe = this.navService.onSave.subscribe(async status => {
      if(status) {
        await this.navService.setOnSave(false);
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
        

        // LawsuitArrestgetByCon
        await this.lawsuitService.LawsuitArrestGetByCon(params.IndictmentID).then(res => {
          //console.log("params"+params.IndictmentID);
          //console.log("RES"+(res.LawsuitArrestIndicment[0]));
          this.lawsuitList = res || [ ];
          this.lawsuitList.map(p => {
            //lawsuitList[0]['LawsuitArrestIndicment']['LawsuitLawGuiltbase']['LawsuitLawSubSectionRule']['LawsuitLawSubSection']['SubSectionType']
            p.SubSectionType = (this.lawsuitList[0]['LawsuitArrestIndicment'][0]['LawsuitLawGuiltbase'][0]['LawsuitLawSubSectionRule'][0]['LawsuitLawSubSection'][0]['SubSectionType']);
            //console.log("P:"+p.SubSectionType);
            p.GuiltBaseName = (this.lawsuitList[0]['LawsuitArrestIndicment'][0]['LawsuitLawGuiltbase'][0]['GuiltBaseName']);
            p.SectionNo = (this.lawsuitList[0]['LawsuitArrestIndicment'][0]['LawsuitLawGuiltbase'][0]['LawsuitLawSubSectionRule'][0]['LawsuitLawSection'][0]['SectionNo']);
            p.PenaltyDesc = this.lawsuitList[0]['LawsuitArrestIndicment'][0]['LawsuitLawGuiltbase'][0]['LawsuitLawSubSectionRule'][0]['LawsuitLawSection'][0]['LawsuitLawPenalty'][0]['PenaltyID'];
            p.OccurrenceDate = toLocalShort(p.OccurrenceDate);
            p.OccurrenceTime = toTimeShort(p.OccurrenceTime);
            p.LawsuitArrestStaff.map(staff => {
              //console.log("STAFF++++"+JSON.stringify(staff));
              staff.FullName = `${staff.TitleName}${staff.FirstName} ${staff.LastName}`;
            });
          });
          
          
          if(res) {
            this.lawsuitList.map((data, index) => {
              data.RowsId = index + 1;
            });
            let IsLawsuitComplete = res[0]['IsLawsuitComplete'];
            console.log("ISLAWSUIT:"+this.lawsuitList[0].IsLawsuit);
            if(IsLawsuitComplete == 1) {
              console.log("LAWSUIT COMPLETE = 1");
              this.lawsuitService.MasDocumentMaingetAll(4,params.LawsuitID).then(docall => {
                console.log(JSON.stringify(docall));
              });
              let IsLawsuit = this.lawsuitList[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['IsLawsuit'];
              this.lawsuitList[0].IsLawsuit = IsLawsuit;
              let ReasonDontLawsuit = this.lawsuitList[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['ReasonDontLawsuit'];
              this.lawsuitList[0].ReasonDontLawsuit = ReasonDontLawsuit;
              let IsOutside = this.lawsuitList[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['IsOutside'];
              this.lawsuitList[0].IsOutside = IsOutside;
              let LawsuitNo = this.lawsuitList[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitNo'];
              this.lawsuitList[0].LawsuitNo = LawsuitNo;
              let LawsuitDate = this.lawsuitList[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitDate'];
              this.lawsuitList[0].LawsuitDate = LawsuitDate;
              let LawsuitTime = this.lawsuitList[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitTime'];
              this.lawsuitList[0].LawsuitTime = LawsuitTime;
              let LawsuitStation = this.lawsuitList[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['LawsuitStation'];
              this.lawsuitList[0].LawsuitStation = LawsuitStation;
              let AccuserTestimony = this.lawsuitList[0]['LawsuitArrestIndicment'][0]['Lawsuit'][0]['AccuserTestimony'];
              this.lawsuitList[0].AccuserTestimony = AccuserTestimony;
              let isProve = this.lawsuitList[0]['LawsuitArrestIndicment'][0]['IsProve'];
              let lawsuitType = this.lawsuitList[0]['LawsuitArrestIndicment'][0]['LawsuitArrestIndicmentDetail'][0]['LawsuitType'];
              
              if(isProve == 0) {
                if(lawsuitType == 1) {
                  this.navService.setPrintButton(true);
                  this.navService.setDeleteButton(true);
                  this.navService.setEditButton(true);
                } else {
                  this.navService.setPrintButton(true);
                  this.navService.setDeleteButton(true);
                  this.navService.setEditButton(true);
                }
              } else {
                this.navService.setPrintButton(true);
                this.navService.setDeleteButton(true);
                this.navService.setEditButton(true);
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
      
          /*if (res) {
            this.lawsuitList.map((data, index) => {
              data.RowsId = index + 1;
            });
           
            if (res && res.IsOutside == 1 && res.LawsuitNo != null) {
              this.lawsuitList.map(law => {
                law.LawsuitNo = `น ${law.LawsuitNo}`;
              });
            }
           
            if (res && res.IsLawsuit == 0) {
              this.lawsuitList.map(law => {
                law.IsLawsuitStatus = "ไม่รับคดี";
              });
            } else if (res && res.IsLawsuitComplete == 1) {
              this.lawsuitList.map(law => {
                law.IsLawsuitStatus = "ดำเนินการรับคดีแล้ว";
              });
            } else {
              this.lawsuitList.map(law => {
                law.IsLawsuitStatus = "ยังไม่ดำเนินกำรรับคดี";
              });
            }
          }*/ 
        });
        /*
        // Find guiltbaseID with IndictmentID from Lawsuit
        await this.arrestList[0].ArrestIndictment.forEach(value => {
          if (this.lawsuitList.length && value.IndicmentID == this.lawsuitList[0].IndictmentID) {
            this.lawsuitService.CompareMasLawgetByCon(value.GuiltBaseID).then(res => {
              if (res) {
                for (let key in res) {
                  if (key == "CompareMasLawSection") {
                    this.masLawGroupSectionList.push(res[key]);
                  }
                  if (key == "CompareMasLawGuiltBase") {
                    this.masLawGuitBaseList.push(res[key]);
                  }
                }
              }
            });
          }
        });*/

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
  private async createLawsuitForm() {
    
    this.lawsuitForm = new FormGroup({
      //'LawsuitNo': new FormControl(null, Validators.required),
      //'LawsuitDate': new FormControl(null, Validators.required),
      //'LawsuitTime': new FormControl(null, Validators.required),
      'Fullname': new FormControl(),
      //'PositionName': new FormControl(null, Validators.required),
      //'DepartmentName': new FormControl(null, Validators.required),
      //'LawsuitStation': new FormControl(null, Validators.required),
      //'AccuserTestimony': new FormControl(null, Validators.required)
  });
  }
  private async onSave() {
    console.log("ONSAVE CLICK");
    this.preLoaderService.setShowPreloader(true);
    let IsLawsuitComplete = this.lawsuitList[0]['IsLawsuitComplete'];
    if(IsLawsuitComplete == 1) {
      //this.onSaveValidate();
    }
    this.preLoaderService.setShowPreloader(false);
  }
}
