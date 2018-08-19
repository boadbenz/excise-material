import { MasLawGuitBase } from "../models/mas_law_guitbase";
import { MasLawGroupSection } from "../models/mas_law_group_section";
import { toLocalShort, toTimeShort } from "../../../config/dateFormat";
import { LawsuitService } from "../lawsuit.service";
import { Lawsuit } from "../models/lawsuit";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { NavigationService } from "../../../shared/header-navigation/navigation.service";
import { Arrest } from "../../arrests/arrest";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder } from "@angular/forms";
import { NoticeService } from "../../notices/notice.service";
import { PreloaderService } from "../../../shared/preloader/preloader.component";
import { SidebarService } from "../../../shared/sidebar/sidebar.component";
import { ArrestsService } from "../../arrests/arrests.service";
import { ProveService } from "../../prove/prove.service";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html"
})
export class ManageComponent implements OnInit {
  lawsuitList: Lawsuit[] = [];
  masLawGroupSectionList: MasLawGroupSection[] = [];
  masLawGuitBaseList: MasLawGuitBase[] = [];
  arrestList: Arrest[] = [];
  errorShow: any;
  private getDataFromListPage: any;

  constructor(
    private activeRoute: ActivatedRoute,
    private suspectModalService: NgbModal,
    private router: Router,
    private fb: FormBuilder,
    private navService: NavigationService,
    // private noticeService: NoticeService,
    private ngbModel: NgbModal,
    private preloader: PreloaderService,
    private sidebarService: SidebarService,
    private arrestService: ArrestsService,
    private proveService: ProveService,


    // private router: Router,
    // private activeRoute: ActivatedRoute,
    // private navService: NavigationService,
    private lawsuitService: LawsuitService
  ) {
    this.navService.setNewButton(false);
    this.navService.setSearchBar(false);
    this.navService.setInnerTextNextPageButton('งานจับกุม')
  }

  ngOnInit() {
    this.setShowButton();
    // this.active_route();
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

  private active_route() {
    // this.activeRoute.params.subscribe(p => {
    //   this.mode = p['mode'];
    //   if (p['mode'] === 'C') {
    //     // set false
    //     this.navService.setEditButton(false);
    //     this.navService.setDeleteButton(false);
    //     this.navService.setEditField(false);
    //     // set true
    //     this.navService.setSaveButton(true);
    //     this.navService.setCancelButton(true);
    //     this.navService.setNextPageButton(true);
    //     this.noticeCode = `LS-${(new Date).getTime()}`;
    //     this.arrestCode = `TN-${(new Date).getTime()}`;
    //
    //   } else if (p['mode'] === 'R') {
    //     // set false
    //     this.navService.setSaveButton(false);
    //     this.navService.setCancelButton(false);
    //     // set true
    //     this.navService.setPrintButton(true);
    //     this.navService.setEditButton(true);
    //     this.navService.setDeleteButton(true);
    //     this.navService.setEditField(true);
    //     this.navService.setNextPageButton(true);
    //
    //     if (p['code']) {
    //       this.noticeCode = p['code'];
    //       this.getByCon(p['code']);
    //     }
    //   }
    // });
  }

  private getParamFromActiveRoute() {
    this.getDataFromListPage = this.activeRoute.queryParams.subscribe(
      async params => {
        // ArrestgetByCon
        await this.lawsuitService.ArrestgetByCon('050100020'/*params.code*/).then(res => {
          this.arrestList.push(res);
          this.arrestList.map(p => {
            p.OccurrenceDate = toLocalShort(p.OccurrenceDate);
            p.OccurrenceTime = toTimeShort(p.OccurrenceTime);
            p.ArrestStaff.map(staff => {
              staff.FullName = `${staff.TitleName}${staff.FirstName} ${staff.LastName}`;
            });
          });
        });

        // LawsuitgetByCon
        await this.lawsuitService.LawsuitgetByCon(params.id).then(res => {
          this.lawsuitList.push(res);
          this.lawsuitList.map((data, index) => {
            data.RowsId = index + 1;
          });

          // Check IsOutSide
          if (
            res.IsOutside == 1 &&
            res.LawsuitNo != null
          ) {
            this.lawsuitList.map(law => {
              law.LawsuitNo = `น ${law.LawsuitNo}`;
            });
          }

          // Check status IsLawsuit
          if (res.IsLawsuit == 0) {
            this.lawsuitList.map(law => {
              law.IsLawsuitStatus = "ไม่รับคดี";
            });
          } else if (res.IsLawsuit == 1) {
            this.lawsuitList.map(law => {
              law.IsLawsuitStatus = "ดำเนินการรับคดีแล้ว";
            });
          } else {
            this.lawsuitList.map(law => {
              law.IsLawsuitStatus = "ยังไม่ดำเนินกำรรับคดี";
            });
          }
        });

        // Find guiltbaseID with IndictmentID from Lawsuit
        await this.arrestList[0].ArrestIndictment.forEach(value => {
          if (value.IndictmentID == this.lawsuitList[0].IndictmentID) {
            this.lawsuitService
              .CompareMasLawgetByCon(value.GuiltBaseID).then(res => {
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
