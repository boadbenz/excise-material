import { Router } from '@angular/router';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { Component, OnInit } from '@angular/core';
import { ReductionService } from '../reduction.service';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { HttpErrorResponse } from '@angular/common/http';
import { Message } from '../../../config/message';
import { toLocalShort, convertDateForSave, compareDate, setZeroHours } from '../../../config/dateFormat';
import { ReductionList, advSearchModel } from '../reductionModel';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {


  // listData = [
  //   {
  //     arrestCode: "TN90806026000001",
  //     lawsuitNo: "001/2561",
  //     proofNo: "001/2561",
  //     caseNumber: "001/2561",
  //     titleName: "นาย",
  //     firstName: "ธวัชชัย",
  //     lastName: "บิงขุนทด",
  //     lawsuitDate: "10-ม.ค.-2560",
  //     departmentlawName: "สสท.ระนอง สาขาเมืองกระบุรี"
  //   },
  //   {
  //     arrestCode: "TN90806026000002",
  //     lawsuitNo: "น.001/2561",
  //     proofNo: "น.001/2561",
  //     caseNumber: "001/2561",
  //     titleName: "นาย",
  //     firstName: "ธวัชชัย",
  //     lastName: "บิงขุนทด",
  //     lawsuitDate: "19-มี.ค.-2560",
  //     departmentlawName: "สสท.ระนอง สาขาเมืองกระบุรี"
  //   },
  //   {
  //     arrestCode: "TN90806026000003",
  //     lawsuitNo: "002/2561",
  //     proofNo: "002/2561",
  //     caseNumber: "002/2561",
  //     titleName: "นาย",
  //     firstName: "ธวัชชัย",
  //     lastName: "บิงขุนทด",
  //     lawsuitDate: "22-ต.ค.-2560",
  //     departmentlawName: "สสท.ระนอง สาขาเมืองกระบุรี"
  //   },
  //   {
  //     arrestCode: "TN90806026000004",
  //     lawsuitNo: "003/2561",
  //     proofNo: "003/2561",
  //     caseNumber: "003/2561",
  //     titleName: "นาย",
  //     firstName: "ธวัชชัย",
  //     lastName: "บิงขุนทด",
  //     lawsuitDate: "11-ธ.ค.-2560",
  //     departmentlawName: "สสท.ระนอง สาขาเมืองกระบุรี"
  //   },
  //   {
  //     arrestCode: "TN90806026000005",
  //     lawsuitNo: "004/2561",
  //     proofNo: "004/2561",
  //     caseNumber: "004/2561",
  //     titleName: "นาย",
  //     firstName: "ธวัชชัย",
  //     lastName: "บิงขุนทด",
  //     lawsuitDate: "03-มี.ค.-2561",
  //     departmentlawName: "สสท.ระนอง สาขาเมืองกระบุรี",
  //   }
  // ];

  listData: Array<ReductionList> = [];

  arrestCode: string;
  lawsuitNo: string;
  proofNo: string;
  caseNumber: string;
  lawsuitDateStart: Date;
  lawsuitDateEnd: Date;
  lawName: string;
  departmentlawName: string;

  advSearchModel: advSearchModel = {
    ArrestCode: '',
    LawsuitCode: '',
    ProveReportNo: '',
    CompareCode: '',
    CompareDateFrom: '',
    CompareDateTo: '',
    ProgramCode: '',
    ProcessCode: '',
    Staff: '',
    Department: ''
  }


  advSearch: any;
  allPageCount: number = 0;
  numberPage: number = 5;
  numberSelectPage;


  constructor(
    private navService: NavigationService,
    private router: Router,
    private reductionService: ReductionService,
    private preLoaderService: PreloaderService
  ) {
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
    this.getReductionList(false);
    this.navService.searchByKeyword.subscribe(async Textsearch => {
      if (Textsearch) {
        await this.navService.setOnSearch('');
        this.onSearch(Textsearch);
      }
    });
    this.advSearch.subscribe(data => {
      if (!data) {
        this.clearData();
      }
    });
  }

  viewData(CompareID: number) {
    this.router.navigate(['/reduction/manage', 'R'], { queryParams: { code: CompareID } });
  }

  async onSearch(Textsearch: any) {
    this.preLoaderService.setShowPreloader(true);
    await this.reductionService.getReductionBySearch(Textsearch).then(list => this.loadDataComplete(list));
    this.preLoaderService.setShowPreloader(false);
  }

  closeAdvSearch() {
    this.navService.showAdvSearch.next(false);
  }

  onAdvSearch() {

    let model = this.modelToSave();
    if (model.CompareDateFrom && model.CompareDateTo) {
      let dateFrom = new Date(model.CompareDateFrom);
      let dateTo = new Date(model.CompareDateTo);
      if (!compareDate(dateFrom, dateTo)) {
        alert(Message.checkDate);
        return false;
      }

      model.CompareDateFrom = setZeroHours(dateFrom);
      model.CompareDateTo = setZeroHours(dateTo);
    }
    this.getReductionList(model);
  }

  changeNumPage(numPage: number) {
    this.numberPage = numPage;
    this.allPageCount = Math.ceil(this.listData.length / this.numberPage);
    this.numberSelectPage = Array(this.allPageCount).fill(0).map((x, i) => i + 1);
  }

  async getReductionList(param) {
    this.preLoaderService.setShowPreloader(true);
    this.reductionService.getReductionList(param).then((data) => {
      this.preLoaderService.setShowPreloader(false);
      this.loadDataComplete(data);
    }, (err: HttpErrorResponse) => {
      alert(Message.noRecord + " (API Disconnected)");
    });
  }

  private loadDataComplete(data) {
    if (!data.length) {
      alert(Message.noRecord)
      return false;
    }
    data.forEach(itm => {
      // toLocalShort
      itm.CompareDate = toLocalShort(itm.CompareDate)

    });
    this.listData = data;
  }

  private clearData() {
    this.advSearchModel = {
      ArrestCode: '',
      LawsuitCode: '',
      ProveReportNo: '',
      CompareCode: '',
      CompareDateFrom: '',
      CompareDateTo: '',
      ProgramCode: '',
      ProcessCode: '',
      Staff: '',
      Department: ''
    };
  }

  private modelToSave() {
    return {
      ArrestCode: this.advSearchModel.ArrestCode,
      LawsuitCode: this.advSearchModel.LawsuitCode,
      ProveReportNo: this.advSearchModel.ProveReportNo,
      CompareCode: this.advSearchModel.CompareCode,
      CompareDateFrom: this.advSearchModel.CompareDateFrom,
      CompareDateTo: this.advSearchModel.CompareDateTo,
      ProgramCode: this.advSearchModel.ProgramCode,
      ProcessCode: this.advSearchModel.ProcessCode,
      Staff: this.advSearchModel.Staff,
      Department: this.advSearchModel.Department
    };
  }

}
