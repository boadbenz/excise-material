import { MasLawGuitBase } from "./../models/mas_law_guitbase";
import { MasLawGroupSection } from "./../models/mas_law_group_section";
import { toLocalShort } from "../../../config/dateFormat";
import { LawsuitService } from "../lawsuit.service";
import { Lawsuit } from "../models/lawsuit";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { NavigationService } from "../../../shared/header-navigation/navigation.service";
import { Arrest } from "../../arrests/arrest";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html"
})
export class ManageComponent implements OnInit {
  lawsuitList = new Array<Lawsuit>();
  masLawGroupSectionList = new Array<MasLawGroupSection>();
  masLawGuitBaseList = new Array<MasLawGuitBase>();
  arrestList = new Array<Arrest>();
  errorShow: any;
  private getDataFromListPage: any;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private navService: NavigationService,
    private lawsuitService: LawsuitService
  ) { }

  ngOnInit() {
    this.setShowButton();
    this.getParamFromActiveRoute();
  }

  private setShowButton() {
    this.navService.setPrintButton(true);
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
        // ArrestgetByCon
        await this.lawsuitService.ArrestgetByCon(params.code).then(res => {
          if (res.IsSuccess) {
            this.arrestList.push(res.ResponseData);
            this.arrestList.map(p => {
              p.ArrestDate = toLocalShort(p.ArrestDate);
              p.ArrestStaff.map(staff => {
                staff.FullName = `${staff.TitleName} ${staff.FirstName} ${
                  staff.LastName
                  }`;
              });
            });
          }
        });

        // LawsuitgetByCon
        await this.lawsuitService.LawsuitgetByCon(params.id).then(res => {
          if (res.IsSuccess) {
            this.lawsuitList.push(res.ResponseData);
            this.lawsuitList.map((data, index) => {
              data.RowsId = index + 1;
            });

            // Check IsOutSide
            if (
              res.ResponseData.IsOutside == 1 &&
              res.ResponseData.LawsuitNo != null
            ) {
              this.lawsuitList.map(law => {
                law.LawsuitNo = `น ${law.LawsuitNo}`;
              });
            }

            // Check status IsLawsuit
            if (res.ResponseData.IsLawsuit == 0) {
              this.lawsuitList.map(law => {
                law.IsLawsuitStatus = "ไม่รับคดี";
              });
            } else if (res.ResponseData.IsLawsuit == 1) {
              this.lawsuitList.map(law => {
                law.IsLawsuitStatus = "ดำเนินการรับคดีแล้ว";
              });
            } else {
              this.lawsuitList.map(law => {
                law.IsLawsuitStatus = "ยังไม่ดำเนินกำรรับคดี";
              });
            }
          }
        });

        // Find guiltbaseID with IndictmentID from Lawsuit
        this.arrestList[0].ArrestIndictment.forEach(value => {
          if (value.IndictmentID == this.lawsuitList[0].IndictmentID) {
            this.lawsuitService
              .CompareMasLawgetByCon(value.GuiltBaseID)
              .then(res => {
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
        });
      }
    );
  }

  viewData(item) {
    if (item.LawsuitNo) {
      this.router.navigate(["/lawsuit/detail", "R"], {
        queryParams: {
          code: this.arrestList[0].ArrestCode,
          id: item.IndictmentID,
          no: item.LawsuitID
        }
      });
    }
  }

  ngOnDestroy() {
    this.getDataFromListPage.unsubscribe();
  }
}
