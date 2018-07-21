import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  viewMode: any;
  sub: any;

  detial_arrest: any = {};
  detial_money: any = [];
  detial_Compare: any=[];
  detial_Compare_h:any = {};
  detial_CompareDetailReceipt:any = [];
  detial_compare_staff:any =[];

  constructor(private router: Router, private navService: NavigationService, private httpClient: HttpClient) { }

  ngOnInit() {

    this.sub = this.navService.showFieldEdit.subscribe(status => {
      this.viewMode = status;
      if (!this.viewMode) {
        this.navService.setCancelButton(true);
        this.navService.setSaveButton(true);
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

    this.postComparegetByKeyword();

  }

  public postComparegetByKeyword() {
    this.httpClient.post('http://103.233.193.62:8881/XCS60/ComparegetByKeyword', {
      textSearch: 'mar'
    })
      .subscribe(
        (respond: any[]) => {
          //console.log(respond);
          //this.detial_arrest= respond;
          //console.log(this.respond[0].CompareStation);
          this.detial_arrest = {
            ArrestCode: respond[0].ArrestCode,
            LawsuiltCode: respond[0].LawsuiltCode,
            ProveReportNo: respond[0].ProveReportNo,
            LawsuiltDate: respond[0].LawsuiltDate,
            LawsuiltTime: respond[0].LawsuiltTime,
            arrest_name: respond[0].CompareStaff[0].TitleName + respond[0].CompareStaff[0].FirstName + ' ' + respond[0].CompareStaff[0].LastName,
            PositionName: respond[0].CompareStaff[0].PositionName,
            DepartmentName: respond[0].CompareStaff[0].DepartmentName,
            location: respond[0].SubDistrictName + ' ' + respond[0].DistictName + ' ' + respond[0].ProvinceName,
            SectionName: respond[0].SectionName,
            GuiltBaseName: respond[0].GuiltBaseName,
            SectionNo: respond[0].SectionNo,
            PenaltyDesc: respond[0].PenaltyDesc
          };

          this.detial_money = respond[0].CompareDetail;
          this.detial_Compare_h = {
            CompareDate: respond[0].CompareDate,
            CompareTime: "Comparetime",
            Station: respond[0].CompareStation,
            name: respond[0].CompareStaff[0].TitleName+respond[0].CompareStaff[0].FirstName+' '+respond[0].CompareStaff[0].LastName,
            PositionName: respond[0].CompareStaff[0].PositionName,
            DepartmentName: respond[0].CompareStaff[0].DepartmentName
          }
          this.detial_Compare = respond[0].CompareDetail;
          this.detial_CompareDetailReceipt = respond[0].CompareDetail[0].CompareDetailReceipt;
          this.detial_compare_staff = respond[0].CompareStaff[0];
          
        }
      )

  }

  viewData() {
    this.router.navigate(['fine/detail']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
