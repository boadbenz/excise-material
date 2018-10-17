import { Message } from '../../../config/message';
import {toLocalNumeric, toLocalShort, toTimeShort} from '../../../config/dateFormat';
import { MasLawGroupSection } from '../models/mas_law_group_section';
import { ArrestLawbreaker } from "../../arrests/models/arrest-lawbreaker";
import { MasLawPenalty } from "../models/mas_law_penalty";
import { Arrest } from "../../arrests/models/arrest";
import { MasLawGuitBase } from "../models/mas_law_guitbase";
import { LawsuitService } from "../lawsuit.service";
import { NavigationService } from "../../../shared/header-navigation/navigation.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Lawsuit } from "../models/lawsuit";
import { LawsuitDocument } from "../models/lawsuit_document";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {SidebarService} from "../../../shared/sidebar/sidebar.component";

@Component({
  selector: "app-detail",
  templateUrl: "./detail.component.html",
  styleUrls: ["./detail.component.scss"]
})
export class DetailComponent implements OnInit {

  showEditField: any;
  modal: any;
  fullName: any;
  masLawGroupSectionList = new Array<MasLawGroupSection>();
  masLawGuitBaseList = new Array<MasLawGuitBase>();
  masLawPenaltyList = new Array<MasLawPenalty>();
  arrestList = new Array<Arrest>();
  lawsuitList = new Array<Lawsuit>();
  fileList = new Array<Document>();
  lawBreakerList = new Array<ArrestLawbreaker>();

  private getDatafromManagePage: any;
  private lawbreakerID: number;
  private guiltBaseID: number;

  @ViewChild('printLawsuitModal') printDocModel: ElementRef;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private navService: NavigationService,
    private lawsuitService: LawsuitService,
    private ngbModel: NgbModal,
    private sidebarService: SidebarService
  ) { }

  ngOnInit() {
    this.sidebarService.setVersion('0.0.0.2');
    this.setShowButton();
    this.subNavService();
    this.getParamFromActiveRoute();
  }

  private setShowButton() {
    this.navService.setPrintButton(true);
    this.navService.setDeleteButton(true);
    this.navService.setEditButton(true);
    this.navService.setSearchBar(false);
    this.navService.setCancelButton(false);
    this.navService.setSaveButton(false);
  }

  private subNavService() {

    // Print Modal
    this.navService.onPrint.subscribe(async status => {
      if (status) {
        await this.navService.setOnPrint(false);
        this.modal = this.ngbModel.open(this.printDocModel, { size: 'lg', centered: true });
      }
    });

    // Save Button
    this.navService.onSave.subscribe(async status => {
      if (status) {
        await this.navService.setOnSave(false);
        this.lawsuitService.LawsuitupdByCon(this.lawsuitList[0]).then(res => {
          if (res.IsSuccess) {
            this.navService.setEditField(true);
            alert(Message.saveComplete);
          } else {
            alert(Message.saveFail);
          }
        })

      }
    });

    // Delete Button
    this.navService.onDelete.subscribe(async status => {
      if (status) {
        await this.navService.setOnDelete(false);
        if (confirm(Message.confirmAction)) {
          this.lawsuitService.LawsuitupdDelete(this.lawsuitList[0].LawsuitID).then(res => {
            if (res.IsSuccess) {
              alert(Message.saveComplete);
              this.router.navigate(["/lawsuit/manage", "R"], {
                queryParams: { id: this.lawsuitList[0].LawsuitID, code: "050100020" }
              });
            } else {
              alert(Message.cannotDelete);
            }
          })
        }
      }
    });

    // Edit Button
    this.navService.showFieldEdit.subscribe(status => {
      this.showEditField = status;
      if (!this.showEditField) {
        this.navService.setSaveButton(true);
        this.navService.setCancelButton(true);
        this.navService.setPrintButton(false);
        this.navService.setSearchBar(false);
        this.navService.setDeleteButton(false);
        this.navService.setEditButton(false);
      } else {
        this.navService.setPrintButton(true);
        this.navService.setDeleteButton(true);
        this.navService.setEditButton(true);
        this.navService.setSearchBar(false);
        this.navService.setCancelButton(false);
        this.navService.setSaveButton(false);
      }
    });
  }

  private getParamFromActiveRoute() {
    this.getDatafromManagePage = this.activeRoute.queryParams.subscribe(
      async params => {

        // ArrestgetByCon
        await this.lawsuitService.ArrestgetByCon(params.ArrestCode).then(res => {
          this.arrestList.push(res);
          this.arrestList.map(p => {
            p.OccurrenceDate = toLocalShort(p.OccurrenceDate);
            p.OccurrenceTime = toTimeShort(p.OccurrenceTime);
            p.ArrestStaff.map(staff => {
              staff.FullName = `${staff.TitleName}${staff.FirstName} ${staff.LastName}`;
            });
          });
        });
        // await this.lawsuitService.ArrestgetByCon(params.code).then(res => {
        //   console.log(res);
        //   // if (res.IsSuccess) {
        //     this.arrestList.push(res.ResponseData);
        //   // }
        // });

        // LawsuitgetByCon
        await this.lawsuitService.LawsuitgetByCon(params.LawsuitID).then(res => {
          // if (res.IsSuccess) {
            this.lawsuitList.push(res);
            this.lawsuitList.map(data => {
              data.LawsuitDate = toLocalNumeric(data.LawsuitDate);
              data.LawsuitTime = toTimeShort(data.LawsuitTime);
              data.LawsuiteStaff.map(staff => {
                staff.FullName = `${staff.TitleName} ${staff.FirstName} ${
                  staff.LastName
                  }`;
              });
            });
          // }
        });

        // this.arrestList[0].ArrestIndictment.forEach(value => {
        //   // // Find lawbreakerID
        //   // value.OpsArrestIndicmentDetailCollection.forEach(data => {
        //   //   this.lawbreakerID = data.LawbreakerID;
        //   // });
        //   // // Find guiltbaseID
        //   // if (value.IndicmentID == params.IndictmentID) {
        //   //   this.guiltBaseID = value.GuiltBaseID;
        //   // }
        // });

        // ArrestLawbreakergetByCon on Table
        this.lawsuitService
          .ArrestLawbreakergetByCon(this.lawbreakerID)
          .then(res => {
            // if (res.IsSuccess) {
              this.lawBreakerList.push(res);
              // Check Entity Type
              if (res.EntityType == 0) {
                this.lawBreakerList.map(list => {
                  list.LawbreakerFullName = `${res.ResponseData.CompanyTitle} ${res.ResponseData.CompanyName}`;
                });
              } else {
                this.lawBreakerList.map(list => {
                  list.LawbreakerFullName = `${
                    res.ResponseData.LawbreakerTitleName}${res.ResponseData.LawbreakerFirstName}
                  ${res.ResponseData.LawbreakerMiddleName} ${res.ResponseData.LawbreakerLastName}`;
                });
              }
            // }
          });

        this.lawsuitService
          .CompareMasLawgetByCon(this.guiltBaseID)
          .then(res => {
            if (res) {
              for (let key in res) {
                if (key == "CompareMasLawSection") {
                  this.masLawGroupSectionList.push(res[key]);
                } else if (key == "CompareMasLawGuiltBase") {
                  this.masLawGuitBaseList.push(res[key]);
                } else if (key == "CompareMasLawPenalty") {
                  this.masLawPenaltyList.push(res[key]);
                }
              }
            }
          });
      })
  }
  //
  // isLawSuitChecked(IsLawSuit) {
  //   if (IsLawSuit == 1) {
  //     this.lawsuitList.map(data => {
  //       data.IsLawsuit = 0;
  //     });
  //   } else {
  //     this.lawsuitList.map(data => {
  //       data.IsLawsuit = 1;
  //     });
  //   }
  // }
  //
  // isOutSideChecked(IsOutside) {
  //   if (IsOutside == 1) {
  //     this.lawsuitList.map(data => {
  //       data.IsOutside = 0;
  //     });
  //   } else {
  //     this.lawsuitList.map(data => {
  //       data.IsOutside = 1;
  //     });
  //   }
  // }

  attachFile(file) { }

  // ngOnDestroy() {
  //   this.getDatafromManagePage.unsubscribe();
  //   this.navServiceSub.unsubscribe();
  // }
}
