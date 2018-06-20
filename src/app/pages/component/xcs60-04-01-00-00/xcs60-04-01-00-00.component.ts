import { Xcs6004020000Service } from './../xcs60-04-02-00-00/xcs60-04-02-00-00.service';
import { NavigationService } from "./../../../shared/header-navigation/navigation.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms/src/directives";

@Component({
  selector: "app-xcs60-04-01-00-00",
  templateUrl: "./xcs60-04-01-00-00.component.html",
  styleUrls: ["./xcs60-04-01-00-00.component.css"]
})
export class Xcs6004010000Component implements OnInit {
  testData = [
    {
      arrestCode: "TN90806026000002",
      lawsuitNo: "001/2561",
      lawsuitDate: "10-ม.ค.-2560",
      lawsuitTime: "12.14",
      titleName: "นาย",
      firstName: "ธวัชชัย",
      lastName: "บิงขุนทด",
      departmentlawName: "สสท.ระนอง สาขาเมืองกระบุรี",
      positionLawName: "เจ้าพนักงานสรรพสามิตชำนาญงาน"
    },
    {
      arrestCode: "TN90806026000002",
      lawsuitNo: "น.001/2561",
      lawsuitDate: "19-ม.ค.-2560",
      lawsuitTime: "16.32",
      titleName: "นาย",
      firstName: "ธวัชชัย",
      lastName: "บิงขุนทด",
      departmentlawName: "สสท.ระนอง สาขาเมืองกระบุรี",
      positionLawName: "เจ้าพนักงานสรรพสามิตชำนาญงาน"
    },
    {
      arrestCode: "TN90806026000002",
      lawsuitNo: "00122561",
      lawsuitDate: "22-ม.ค.-2560",
      lawsuitTime: "09.48",
      titleName: "นาย",
      firstName: "ธวัชชัย",
      lastName: "บิงขุนทด",
      departmentlawName: "สสท.ระนอง สาขาเมืองกระบุรี",
      positionLawName: "เจ้าพนักงานสรรพสามิตชำนาญงาน"
    },
    {
      arrestCode: "TN90806026000002",
      lawsuitNo: "003/2561",
      lawsuitDate: "11-ม.ค.-2560",
      lawsuitTime: "11.00",
      titleName: "นาย",
      firstName: "ธวัชชัย",
      lastName: "บิงขุนทด",
      departmentlawName: "สสท.ระนอง สาขาเมืองกระบุรี",
      positionLawName: "เจ้าพนักงานสรรพสามิตชำนาญงาน"
    },
    {
      arrestCode: "TN90806026000002",
      lawsuitNo: "004/2561",
      lawsuitDate: "13-ม.ค.-2561",
      lawsuitTime: "15.13",
      titleName: "นาย",
      firstName: "ธวัชชัย",
      lastName: "บิงขุนทด",
      departmentlawName: "สสท.ระนอง สาขาเมืองกระบุรี",
      positionLawName: "เจ้าพนักงานสรรพสามิตชำนาญงาน"
    }
  ];
  arrestCode: String;
  lawsuitNo: String;
  lawsuitDateStart: Date;
  lawsuitDateEnd: Date;
  lawName: string;
  departmentlawName: string;
  advSearch: any;

  constructor(private router: Router, private navService: NavigationService, private xcs600402: Xcs6004020000Service) {
    this.advSearch = this.navService.showAdvSearch;

  }

  ngOnInit() {
    this.navService.setPrintButton(false);
    this.navService.setSearchBar(true);
    this.navService.setDeleteButton(false);
    this.navService.setCancelButton(false);
    this.navService.setEditButton(false);
    this.navService.setSaveButton(false);
    this.navService.setProofButton(false);
  }

  searchData(advSearchForm: NgForm){
    advSearchForm.resetForm();
  }

  viewData(data) {
    this.router.navigate(["ILG60-04-02-00"]);
    this.xcs600402.getData(data);
  }

  closeAdvSearch() {
    this.navService.showAdvSearch.next(false);
  }
}
