import { Router } from '@angular/router';
import { NavigationComponent } from './../../../shared/header-navigation/navigation.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  listData = [
    {
      arrestCode: "TN90806026000001",
      lawsuitNo: "001/2561",
      lawsuitDate: "10-ม.ค.-2560",
      lawsuitTime: "12.14",
      titleName: "นาย",
      firstName: "ธวัชชัย",
      lastName: "บิงขุนทด",
      departmentlawName: "สสท.ระนอง สาขาเมืองกระบุรี",
      positionLawName: "เจ้าพนักงานสรรพสามิตชำนาญงาน",
      
      
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
      arrestCode: "TN90806026000003",
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
      arrestCode: "TN90806026000004",
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
      arrestCode: "TN90806026000005",
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

  constructor(private navbar: NavigationComponent, private router: Router) { }

  ngOnInit() {
  }

  advSearch() {
    this.navbar.advSearch();
  }

  viewData(arrestCode: string) {
    this.router.navigate(['/accusations/manage', 'R'], { queryParams: { code: arrestCode } });
  }

}
