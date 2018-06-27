import { Router } from '@angular/router';
import { NavigationService } from './../../../shared/header-navigation/navigation.service';
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
      proofNo: "001/2561",
      caseNumber: "001/2561",
      titleName: "นาย",
      firstName: "ธวัชชัย",
      lastName: "บิงขุนทด",
      lawsuitDate: "10-ม.ค.-2560",
      departmentlawName: "สสท.ระนอง สาขาเมืองกระบุรี"
    },
    {
      arrestCode: "TN90806026000002",
      lawsuitNo: "น.001/2561",
      proofNo: "น.001/2561",
      caseNumber: "001/2561",
      titleName: "นาย",
      firstName: "ธวัชชัย",
      lastName: "บิงขุนทด",
      lawsuitDate: "19-มี.ค.-2560",
      departmentlawName: "สสท.ระนอง สาขาเมืองกระบุรี"
    },
    {
      arrestCode: "TN90806026000003",
      lawsuitNo: "002/2561",
      proofNo: "002/2561",
      caseNumber: "002/2561",
      titleName: "นาย",
      firstName: "ธวัชชัย",
      lastName: "บิงขุนทด",
      lawsuitDate: "22-ต.ค.-2560",
      departmentlawName: "สสท.ระนอง สาขาเมืองกระบุรี"
    },
    {
      arrestCode: "TN90806026000004",
      lawsuitNo: "003/2561",
      proofNo: "003/2561",
      caseNumber: "003/2561",
      titleName: "นาย",
      firstName: "ธวัชชัย",
      lastName: "บิงขุนทด",
      lawsuitDate: "11-ธ.ค.-2560",
      departmentlawName: "สสท.ระนอง สาขาเมืองกระบุรี"
    },
    {
      arrestCode: "TN90806026000005",
      lawsuitNo: "004/2561",
      proofNo: "004/2561",
      caseNumber: "004/2561",
      titleName: "นาย",
      firstName: "ธวัชชัย",
      lastName: "บิงขุนทด",
      lawsuitDate: "03-มี.ค.-2561",
      departmentlawName: "สสท.ระนอง สาขาเมืองกระบุรี",
    }
  ];

  arrestCode: string;
  lawsuitNo: string;
  proofNo: string;
  caseNumber: string;
  lawsuitDateStart: Date;
  lawsuitDateEnd: Date;
  lawName: string;
  departmentlawName: string;
  advSearch: any;
  allPageCount: number = 0;
  numberPage: number = 5;
  numberSelectPage;


  constructor(private navService: NavigationService, private router: Router) {
    this.advSearch = this.navService.showAdvSearch;

  }

  ngOnInit() {
    this.navService.setSearchBar(true);
    this.navService.setPrintButton(false);
    this.navService.setDeleteButton(false);
    this.navService.setCancelButton(false);
    this.navService.setEditButton(false);
    this.navService.setSaveButton(false);

    this.allPageCount = this.listData.length / this.numberPage;
    this.numberSelectPage = Array(this.allPageCount).fill(0).map((x, i) => i + 1);
  }

  viewData(arrestCode: string) {
    this.router.navigate(['/reduction/manage', 'R'], { queryParams: { code: arrestCode } });
  }

  closeAdvSearch() {
    this.navService.showAdvSearch.next(false);
  }

  changeNumPage(numPage: number) {
    this.numberPage = numPage;
    this.allPageCount = Math.ceil(this.listData.length / this.numberPage);
    this.numberSelectPage = Array(this.allPageCount).fill(0).map((x, i) => i + 1);
  }


}
