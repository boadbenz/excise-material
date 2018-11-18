import { Component, OnInit, OnDestroy, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NavigationService } from '../../../shared/header-navigation/navigation.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FineService } from '../fine.service';
import { ArrestService } from '../../model/arrest.service';
import { LawsuitService } from '../../model/lawsuit.service';
import { MasterService } from '../../model/master.service';
import { Arrest } from '../../model/arrest';
import { Compare } from '../compare';
import { CompareDetail } from '../compareDetail';
import { CompareDetailReceipt } from '../compareReceipt';
import { CompareStaff } from '../compareStaff';
import { ICompareDetail } from '../fine-model';
import { MatAutocomplete, _MatListItemMixinBase } from '@angular/material';
// import { ProveStaff } from '../proveStaff';
// import { ProveScience } from '../proveScience';
// import { ProveProduct } from '../proveProduct';
import { Message } from '../../../config/message';
// import { ProveDocument } from '../proveDoc';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { ArrestStaff } from '../../model/arrest-staff';
import { isNgTemplate } from '@angular/compiler';
import { async } from 'q';
import { isArray } from 'jquery';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { IMyDpOptions, IMyDate } from 'mydatepicker';
import { SidebarService } from 'app/shared/sidebar/sidebar.component';
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit, OnDestroy {
  private sub: any;
  mode: string;
  modal: any;
  param: any;
  programSpect = 'ILG60-06-02-00';

  // --------
  showEditField: any;
  @ViewChild('advForm') advForm: NgForm;
  @ViewChild('Form2') form2: NgForm; // คำให้การผู้ต้องหา
  @ViewChild('Form3') form3: NgForm; // บันทึกการเปรียบเทียบและชำระคเีค่าปรับ
  @ViewChild('Form4') form4: NgForm; // รายงานขออนุมัติการเปรียบเทียบคดีและแบบอนุมัติ
  // -- Parameter ---
  LawsuitID: string;
  ArrestCode: string;
  CompareID: string;
  LawsuitList: any;

  // --- Array ---
  rawOptions = [];
  options = [];
  optionsStation = [];
  rawStaffOptions = [];
  Staffoptions = [];
  ReportOptions = [];
  ListCompareDetail = [];
  ListCompareDetailReceipt = [];
  ListCompareStaff = [];
  ArrestIndictment = [];
  editUser: any = {};
  compareUserDetail: any = [];
  AllAddFiles: any = [];
  // ---- Varible ---
  CompareNo: string = '';   // เลขที่เปรียบเทียบ  (ไม่รวม /ปี พ.ศ.)
  CompareYear: string;      // ปี พ.ศ.
  LawsuiltCode: string;   // เลขที่คดีรับคำกล่าวโทษ
  LawsuiltDate: string;   // วันที่รับทำคดี
  LawsuiltTime: string;
  SectionName: string;    // ฐานความผิดมาตรา
  GuiltBaseName: string;  // ฐานความผิด
  SectionNo: string;      // บทกำหนดโทษ
  PenaltyDesc: string;    // อัตราโทษ
  IndictmentID: string;
  ArrestStaffName: string;  // ผู้กล่าวหา
  PositionName: string;     // ตำแหน่ง
  DepartmentName: string;   // หน่วยงาน
  ArrestLocation: string;   // สถานที่จับกุม
  AccuserSubdistrictCode: string;   // รหัสสถานที่จับกลุ่ม
  AccuserSubdistrict: string;   // สถานที่จับกลุ่ม
  ProveReportNo: string;

  CompareDate: string;      // วันที่จัดทำ
  CompareTime: string;      // เวลาจัดทำ
  StationName: string;      // เขียนที่ (คำให้การของผู้ต้องหา)
  CompareStaffName: string; // ชื่อผู้เปรียบเทียบ (คำให้การของผู้ต้องหา)
  OperationPosName: string; // ตำแหน่งผู้เปรียบเทียบ (คำให้การของผู้ต้องหา)
  OperationDeptName: string; // แผนกผู้เปรียบเทียบ (คำให้การของผู้ต้องหา)
  CompareStaffID: string;   // รหัสผู้เปรียบเทียบ (คำให้การของผู้ต้องหา)
  IsOutside: number;        // flg คดีเปรียบเทียบนอกสถานที่ทำการ
  AccusedTable: any; // ส่วนข้อมูลคาให้การของผู้ต้องหา ส่วนตาราง
  // --- Object ---
  oArrest: Arrest;
  oCompare: Compare;
  oCompareDetail: CompareDetail = {};
  fileData: any = {};
  oCompareStaff: CompareStaff;
  OnSubscribe: any = {};
  fileToUpload: File = null;
  // ----- Model ------ //
  @ViewChild('printDocModal') printDocModel: ElementRef;
  private today = new Date();
  compareData: any = {}; // ฟิลด์ค่าปรับ
  compareDataAllSum: any = {}; // ฟิลด์ค่าปรับ
  compareCount: any = 1; // จำนวนเท่า
  selDate: IMyDate = {year: 0, month: 0, day: 0};
  receiptCompareDate: IMyDate = {year: 0, month: 0, day: 0};
  userCompareReceiptDetail: any = {};
  compareUserDetailPopup: any = {};
  filePath: any = [];
  dataToSave: any = {};
  PaymentFineAppointDateOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mmm/yyyy'
  };
  PaymentVatDateOptionsOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mmm/yyyy'
  };
  CompareDateOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mmm/yyyy'
  };
  receiptCompareDateOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'dd/mmm/yyyy'
  };
  constructor(private navService: NavigationService,
    private ngbModel: NgbModal,
    private activeRoute: ActivatedRoute,
    private fineService: FineService,
    private ArrestSV: ArrestService,
    private LawsuitSV: LawsuitService,
    private MasterSV: MasterService,
    private router: Router,
    private preloader: PreloaderService,
    private sidebarService: SidebarService
  ) {
    this.sidebarService.setVersion('0.0.0.4');
    // set false
    this.navService.setNewButton(false);
    this.navService.setSearchBar(false);
    // set true
    this.navService.setNextPageButton(true);
    this.navService.setInnerTextNextPageButton('ส่งเงินรายได้');
    this.IsOutside = 0;
  }

  async ngOnInit() {
    this.preloader.setShowPreloader(true);
    await this.setDataObjectToSave();
    this.MasStaffMaingetAll();
    this.MasDepartmentMaingetAll();
    // this.preloader.setShowPreloader(true);
    // console.log(1234);
    this.active_Route();
    await this.navigate_Service();
    await this.getStation();
    await this.getCompareStaff();
    this.CreateObject();
    await this.getAresstData();
    // this.getLawsuitByID(this.LawsuitID);
    await this.getArrestByID(this.ArrestCode);
    const date = new Date();
    // this.CompareYear = (date.getFullYear() + 543).toString();
    // this.CompareDate = this.getCurrentDate();
    // this.CompareTime = this.getCurrentTime();

    // if (this.CompareID !== '0') {
    //   await this.getCompareByID();
    //   await this.ShowData();
    // }
    this.preloader.setShowPreloader(false);

    // this.navigate_Service();
  }
  async CompareCountMistreatgetByCon(LawBreakerID: number, SectionNo: number) {
    try {
      const data: any = {
        LawBreakerID: LawBreakerID,
        SectionNo: SectionNo
      };
      return await this.fineService.postMethod('/CompareCountMistreatgetByCon', data, '8881');
    } catch (err) {
    }
  }
  setDataObjectToSave() {
    const compare: any = {
      'CompareCode': '-',
      'CompareDate': '-',
      'IsOutside': 0,
      'LawsuitID': 0,
      'IsActive': 0,
      'CompareDetail': [
        {
          'CompareDetailID': 0,
          'CompareID': 0,
          'IndictmentDetailID': 0,
          'CompareAction': '-',
          'LawbrakerTestimony': '-',
          'Fact': '-',
          'IsRequest': 1,
          'RequestForAction': '-',
          'CompareReason': '-',
          'IsProvisionalAcquittal': 1,
          'Bail': '-',
          'Guaruntee': '-',
          'CompareFine': 0,
          'PaymentFineDate': '-',
          'PaymentFineAppointDate': '-',
          'PaymentVatDate': '-',
          'TreasuryMoney': 0,
          'BribeMoney': 0,
          'RewardMoney': 0,
          'IsActive': 0,
          'ApproveStationCode': '-',
          'ApproveStation': '-',
          'ApproveReportDate': '-',
          'CommandNo': '-',
          'CommandDate': '-',
          'CompareAuthority': 0,
          'ApproveReportType': 0,
          'MistreatNo': 0,
          'FineType': 0,
          'AdjustReason': '-',
          'CompareDetailFine': [
            {
              'CompareFineID': 0,
              'CompareDetailID': 0,
              'ProductID': 0,
              'ProductFine': 0,
              'VatValue': 0,
              'FineRate': 0,
              'IsActive': 0,
              'FineType': 0
            }
          ]
        }
      ],
      'CompareStaff': []
    };
    this.dataToSave.compare = compare;
  }
  async CompareArrestgetByCon() {
    const d: Date = new Date();
    this.selDate = {year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate()};
    this.ListCompareDetailReceipt = [];
    this.AccusedTable = [];
    this.compareUserDetail = [];
    try {
      const resp: any = await this.fineService.postMethod('/CompareArrestgetByCon', { 'IndictmentID': this.IndictmentID }, '8881');
      console.log(resp);
      const sectionNo: number = resp[0].CompareArrestIndictment[0].CompareGuiltBase[0].CompareSubSectionRules[0].SectionNo;
      this.SectionName = resp[0].CompareArrestIndictment[0].CompareGuiltBase[0].CompareSubSectionRules[0].SectionNo;
      this.GuiltBaseName = resp[0].CompareArrestIndictment[0].CompareGuiltBase[0].GuiltBaseName;
      this.SectionNo = resp[0].CompareArrestIndictment[0].CompareGuiltBase[0].CompareSubSectionRules[0].SectionNo;
      this.PenaltyDesc = resp[0].CompareArrestIndictment[0].CompareGuiltBase[0].Fine;
      // this.compareUserDetail =  resp[0].CompareArrestIndictment[0].CompareIndicmentDetail;
      // this.dataToSave.compare.CompareStaff = resp[0].CompareArrestIndictment[0].CompareLawsuit[0].CompareLawsuitStaff;
      const ListCompareDetailTmp: any = resp[0].CompareArrestIndictment[0].CompareIndicmentDetail;
      const ListCompareDetailTmpData: any =  [];
      console.log(ListCompareDetailTmp);
      let count_user = 0;
      let count_field = 0;
      this.compareDataAllSum.sum = 0;
      this.compareDataAllSum.sum1 = 0;
      this.compareDataAllSum.sum2 = 0;
      this.compareDataAllSum.sum3 = 0;
      for (const compare of ListCompareDetailTmp) {
        const compareTmp: any = {};
        this.compareData[`user${count_user}`] = {};
        const arrest: any = this.jsonCopy(compare.CompareArrestLawbreaker[0]);
        if (arrest.EntityType === 1) {
          compareTmp.name = `${arrest.LawbreakerTitleName}${arrest.LawbreakerFirstName} ${arrest.LawbreakerMiddleName} ${arrest.LawbreakerLastName}`;
        } else {
          compareTmp.name = `${arrest.CompanyTitle}${arrest.CompanyName}`;
        }
        // ข้อมูล
        const ListCompareDetailReceiptTmp: any = {};
        ListCompareDetailReceiptTmp.LawBrakerName = compareTmp.name;
        this.ListCompareDetail.push(ListCompareDetailReceiptTmp);
        this.ListCompareDetailReceipt.push(ListCompareDetailReceiptTmp);
        ListCompareDetailReceiptTmp.test = 'test';
        this.compareUserDetail.push(ListCompareDetailReceiptTmp);
        console.log(this.compareUserDetail);
        // ข้อมูลคำให้การ
        const AccusedTableTmp: any = {};
        AccusedTableTmp.LawBrakerName = compareTmp.name;
        this.AccusedTable.push(AccusedTableTmp);
        console.log(compareTmp);
        // const this_product: any = product.CompareArrestProduct[0];
        // const product_search: any = this.serchCompareProductByID(this_product.ProductID, resp[0].CompareArrestIndictment[0].CompareProve[0].CompareProveProduct);
        compareTmp.Mistreat = (await this.CompareCountMistreatgetByCon(arrest.LawbreakerID, sectionNo)).Mistreat;
        let count = 0;
        const sumData = {
          fineSum: true,
          sumPayment: 0,
          sum1: 0,
          sum2: 0,
          sum3: 0
        };
        if (resp[0].CompareArrestIndictment[0].CompareProve[0]) {
          for (const product of this.jsonCopy(resp[0].CompareArrestIndictment[0].CompareProve[0].CompareProveProduct)) {
            const compareWithProduct: any = this.jsonCopy(compareTmp);
            compareWithProduct.isFirstRow = true;
            if (count > 0) {
              compareWithProduct.isFirstRow = false;
            }
            this.compareData[`user${count_user}`][`field${count_field}`] = 0;
            count_field++;
            count++;
            compareWithProduct.product = {};
            compareWithProduct.fineSum = false;
            compareWithProduct.userNo = count_user;
            compareWithProduct.countCompare = this.compareCount;
            compareWithProduct.sumPayment = 0;
            compareWithProduct.fine = product.Fine;
            compareWithProduct.product.name = product.BrandNameTH;
            compareWithProduct.product.VatProve = product.VatProve;
            compareWithProduct.allComparePerArrest = this.compareCount * product.VatProve;
            compareWithProduct.sum1 = compareWithProduct.allComparePerArrest * 0.2;
            compareWithProduct.sum2 = compareWithProduct.allComparePerArrest * 0.2;
            compareWithProduct.sum3 = compareWithProduct.allComparePerArrest * 0.6;
            ListCompareDetailTmpData.push(compareWithProduct);
            sumData.sum1 = (+compareWithProduct.sum1) + (+sumData.sum1);
            sumData.sum2 = (+compareWithProduct.sum2) + (+sumData.sum2);
            sumData.sum3 = (+compareWithProduct.sum3) + (+sumData.sum3);
          }
        }
        this.compareDataAllSum.sum1 = (+sumData.sum1) + (+this.compareDataAllSum.sum1);
        this.compareDataAllSum.sum2 = (+sumData.sum2) + (+this.compareDataAllSum.sum2);
        this.compareDataAllSum.sum3 = (+sumData.sum3) + (+this.compareDataAllSum.sum3);
        ListCompareDetailTmpData.push(sumData);
        count_user++;
        count_field++;
      }
      this.ListCompareDetail = ListCompareDetailTmpData;
      console.log(ListCompareDetailTmpData);
    } catch (err) {
      console.log(err);
    }
  }
  serchCompareProductByID(id: any, products: any) {
    for (const product of products) {
      console.log('product');
      console.log(product);
      if (product.ProductID === id) {
        return product;
      }
    }
    return null;
  }
  async CompareListgetByConAdv() {
    try {
      const res: any = await this.fineService.postMethod('/CompareListgetByConAdv', {'ArrestCode': this.ArrestCode});
      const resp: any = res[0];
      if (resp) {
        this.LawsuiltCode = resp.IsOutside === 1 ? `น${resp.LawsuitNo}` : resp.LawsuitNo;
        this.dataToSave.compare.CompareCode = resp.CompareCode;
        this.ArrestStaffName = `${resp.TitleName}${resp.FirstName} ${resp.LastName}`;
      }
      // this.IndictmentID = resp[0].IndictmentID;
    } catch (err) {
      console.log(err);
    }
  }
  async MasStaffMaingetAll () {
      try {
          const resp: any = await this.fineService.postMethod('/MasStaffMaingetAll', {});
          console.log(resp);
          this.rawStaffOptions = resp;
      } catch (err) {
        console.log(err);
      }
  }
  async MasDepartmentMaingetAll () {
    try {
        const resp: any = await this.fineService.postMethod('/MasDepartmentMaingetAll', {});
        console.log(resp);
        this.rawOptions = resp;
    } catch (err) {
      console.log(err);
    }
}
  // private navigate_service() {
  //   this.navService.showFieldEdit.subscribe(async p => {
  //     this.showEditField = p;
  //   });
  //   this.OnSubscribe.edit = this.navService.onEdit.subscribe(async status => {
  //     if (status) {
  //       await this.navService.setOnEdit(false);
  //     }
  //   });
  // }
  async getAresstData() {
    try {
      console.log(this.dataToSave);
      const resp: any = await this.fineService.compareArrestGetByCon(this.ArrestCode);
      console.log(resp);
      console.log(resp[0].CompareDate);
      this.IndictmentID = resp[0].IndictmentID;
      this.LawsuiltCode = resp[0].IsOutside === 1 ? `น${resp[0].LawsuitNo}` : resp[0].LawsuitNo;
      this.ProveReportNo = resp[0].ProveReportNo;
      this.LawsuiltDate = resp[0].CompareDate.split(' ')[0];
      this.LawsuiltTime = resp[0].CompareDate.split(' ')[1];
      this.IsOutside = resp[0].IsOutside;
      this.CompareNo = resp[0].CompareCode.split('/')[0];
      this.dataToSave.compare.CompareCode = resp[0].CompareCode;
      this.dataToSave.compare.IsOutside = resp[0].CompareCode;
      // this.dataToSave.compare.compareDate = resp[0].CompareDate;
      // this.CompareArrestgetByCon();
      // get
    } catch (err) {
      console.log(err);
    }
  }
  private active_Route() {
    // this.sub = this.navService.showFieldEdit.subscribe(status => {
    //   if (!status) {
    //     this.navService.setCancelButton(true);
    //     this.navService.setSaveButton(true);
    //     this.navService.setPrintButton(false);
    //     this.navService.setSearchBar(false);
    //     this.navService.setDeleteButton(false);
    //     this.navService.setEditButton(false);

    //   } else {
    //     this.navService.setPrintButton(true);
    //     this.navService.setDeleteButton(true);
    //     this.navService.setEditButton(true);
    //     this.navService.setSearchBar(false);
    //     this.navService.setCancelButton(false);
    //     this.navService.setSaveButton(false);
    //   }

    //   this.navService.setNextPageButton(true);
    // });


    this.param = this.activeRoute.params.subscribe(p => {
      this.navService.setPrintButton(true);
      this.navService.setDeleteButton(true);
      this.navService.setEditButton(true);
      this.navService.setSearchBar(false);
      this.navService.setCancelButton(false);
      this.navService.setSaveButton(false);

      this.navService.setNextPageButton(true);

      console.log(this.param);

      if (p['code1']) {
        this.LawsuiltCode = p['code2'].replace('-', '/');
      }

      if (p['code2']) {
        this.ArrestCode = p['code3'];
      }

      if (p['code3']) {
        this.CompareID = p['code1'];
      }
    });
  }

  private navigate_Service() {
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
    this.OnSubscribe.cancel = this.navService.onCancel.subscribe(async status => {
      if (status) {
        await this.navService.setOnCancel(false);
        this.showEditField = status;
        this.navService.setPrintButton(true);
          this.navService.setDeleteButton(true);
          this.navService.setEditButton(true);
          this.navService.setSearchBar(false);
          this.navService.setCancelButton(false);
          this.navService.setSaveButton(false);
      }
    });
    this.OnSubscribe.save = this.navService.onSave.subscribe(async status => {
      if (status) {
        await this.navService.setOnSave(false);
        if (this.CompareID == '0') {
          console.log(this.dataToSave);
          if (await this.onInsCompare()) {
            this.router.navigate(['/fine/list']);
          }
        } else {
          await this.onUpdCompare();
          await this.onComplete();
        }
        await this.navService.setOnCancel(false);
        this.navService.setPrintButton(true);
        this.navService.setDeleteButton(true);
        this.navService.setEditButton(true);
        this.navService.setSearchBar(false);
        this.navService.setCancelButton(false);
        this.navService.setSaveButton(false);
      }
    });
    // this.sub = this.navService.showFieldEdit.subscribe(p => {
    //   this.showEditField = p;
    // });

    // this.sub = this.navService.onSave.subscribe(async status => {
    //   if (status) {
    //     await this.navService.setOnSave(false);
    //
    //     if (this.CompareID == '0') {
    //       await this.onInsCompare();
    //       this.router.navigate(['/fine/list']);
    //     } else {
    //       await this.onUpdCompare();
    //       await this.onComplete();
    //     }
    //   }
    // });

    // this.sub =  this.navService.onDelete.subscribe(async status => {
    //     if (status) {
    //         await this.navService.setOnDelete(false);
    //         this.onDelete();
    //     }
    // });

    this.sub = this.navService.onPrint.subscribe(async status => {
      if (status) {
        await this.navService.setOnPrint(false);
        this.modal = this.ngbModel.open(this.printDocModel, { size: 'lg', centered: true });
      }
    })

    // this.sub = this.navService.onCancel.subscribe(async status => {
    //     if (status) {
    //         if (confirm(Message.confirmAction)) {
    //             await this.navService.setOnCancel(false);
    //             this.router.navigate(['/prove/list']);
    //         }
    //     }
    // })
  }
  async CompareinsAll() {
    try {
      const resp: any = await this.fineService.postMethod('/CompareinsAll', {});
    } catch (err) {

    }
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.param.unsubscribe();
  }

  onComplete() {
    this.navService.setPrintButton(true);
    this.navService.setDeleteButton(true);
    this.navService.setEditButton(true);
    this.navService.setSearchBar(false);
    this.navService.setCancelButton(false);
    this.navService.setSaveButton(false);

    this.showEditField = true;
  }

  CreateObject() {
    this.oCompare = {
      CompareID: '',
      CompareCode: '',
      CompareDate: new Date(),
      CompareStationCode: '',
      CompareStation: '',
      CompareSubdistrictCode: '',
      CompareSubdistrict: '',
      CompareDistrictCode: '',
      CompareDistrict: '',
      CompareProvinceCode: '',
      CompareProvince: '',
      AccuserSubdistrictCode: '',
      AccuserSubdistrict: '',
      AccuserDistrictCode: '',
      AccuserDistrict: '',
      AccuserProvinceCode: '',
      AccuserProvince: '',
      IsOutside: 0,
      LawsuitID: ''
    }
  }
  async getLawsuitByID(LawsuitID: string) {
    // this.preloader.setShowPreloader(true);

    try {
      const res: any = await this.LawsuitSV.LawsuitegetByCon2(LawsuitID);
      console.log(res);
      // --- รายละเอียดคดี ----
      let tmplawsuit: any;
      tmplawsuit = res;

      // for (let index = 0; index < tmplawsuit.length; index++) {

      //   if (this.LawsuitID === tmplawsuit.ArrestIndicment[index].Lawsuit[0].LawsuitID) {

      //     // this.LawsuitList =
      //   }

      // }

      // if (res[0].ArrestIndicment[0].Lawsuit[0].IsOutside == '1') {
      //   this.LawsuiltCode = 'น ' + res[0].ArrestIndicment[0].Lawsuit[0].LawsuitNo;
      // }
      // else {
      //   this.LawsuiltCode = res[0].ArrestIndicment[0].Lawsuit[0].LawsuitNo;
      // }

      if (res.IsOutside == '1') {
        this.LawsuiltCode = 'น ' + res.LawsuitNo;
      }
      else {
        this.LawsuiltCode = res.LawsuitNo;
      }

      // this.LawsuiltDate = new Date(res.LawsuitDate).toISOString().substring(0, 10);
      // this.LawsuiltTime = new Date(res.LawsuitTime).toISOString().substring(0, 10);
      // this.IndictmentID = res.IndictmentID.toString();

      // this.LawsuiltDate = new Date(res[0].ArrestIndicment[0].Lawsuit[0].LawsuitDate).toISOString().substring(0, 10);
      // this.LawsuiltTime = new Date(res[0].ArrestIndicment[0].Lawsuit[0].LawsuitTime).toISOString().substring(15, 20);
      // this.IndictmentID = res[0].ArrestIndicment[0].IndictmentID.toString();
      this.preloader.setShowPreloader(false);
    } catch (err) {
      console.log(err.message);
    }
  }
  jsonCopy(src) {
    return JSON.parse(JSON.stringify(src));
  }
  async getArrestByID(ArrestCode: string) {
    // this.preloader.setShowPreloader(true);

    await this.ArrestSV.getByArrestCon(ArrestCode).then(async res => {
      try {
        console.log(res);
        const tmp: any = [];
        this.IndictmentID = res[0].ArrestIndictment[0].IndictmentID;
        await this.CompareArrestgetByCon();
        // this.ListCompareDetail = res[0].ArrestIndictment[0].ArrestIndictmentDetail;
        // const name: any = [];
        // console.log(this.ListCompareDetail);
        // for (const item of this.ListCompareDetail) {
        //   if (item.ArrestLawbreaker[0].EntityType === 0) {
        //     name.push({ 'AccusedName' : `${item.ArrestLawbreaker[0].CompanyTitle}${item.ArrestLawbreaker[0].CompanyName}`});
        //   } else {
        //     name.push({ 'AccusedName' : `${item.ArrestLawbreaker[0].LawbreakerTitleName}${item.ArrestLawbreaker[0].LawbreakerFirstName} ${item.ArrestLawbreaker[0].LawbreakerMiddleName} ${item.ArrestLawbreaker[0].LawbreakerLastName}`});
        //   }
        //   let count = 0;
        //   const tmpItem: any = this.jsonCopy(item);
        //   tmpItem.isTmp = false;
        //   tmp.push(tmpItem);
        //   for (const t of res[0].ArrestIndictment[0].ArrestIndictmentDetail[0].ArrestProductDetail) {
        //     if (count > 0) {
        //       const newItem: any = this.jsonCopy(item);
        //       newItem.isTmp = true;
        //       newItem.ArrestProductDetail[0] = this.jsonCopy(t);
        //       tmp.push(newItem);
        //     }
        //     count++;
        //   }
        //   tmp.push({ sum: true});
        // }
        // console.log(tmp);
        // this.ListCompareDetail = tmp;
        // this.AccusedTable = name;
        const staff: any = res[0].ArrestStaff[0];
        // console.log(res[0].ArrestStaff[0]);
        // this.ArrestStaffName = `${staff.TitleName}${staff.FirstName} ${staff.LastName}`;
        // this.PositionName = staff.PositionName;
        // this.DepartmentName = staff.OfficeName;
        // this.ArrestLocation = res[0].ArrestStation;
        // this.rawStaffOptions = res[0].ArrestStaff;
        // const local = res[0].ArrestLocale[0];
        // this.ArrestLocation = `${local.Building} ${local.District} ${local.DistrictCode}`;
        res[0].ArrestStaff.map(async item => {

          if (item.ContributorCode === '6') {
            item.FullName = `${item.TitleName == null ? '' : item.TitleName}`;
            item.FullName += `${item.FirstName == null ? '' : item.FirstName}`;
            item.FullName += ` ${item.LastName == null ? '' : item.LastName}`;
          }

        });

        // res[0].ArrestLawbreaker.forEach(item => {

        //   if (item.EntityType === '0') {
        //     item.AccusedName = `${item.CompanyTitle == null ? '' : item.CompanyTitle}`;
        //     item.AccusedName += `${item.CompanyName == null ? '' : item.CompanyName}`;
        //     // item.AccusedName += ` ${item.LastName == null ? '' : item.LastName}`;
        //   } else {
        //     let tpmname = {
        //       AccusedName : item.AccusedName = item.LawbreakerTitleName + ' '
        //         + item.LawbreakerFirstName + ' '
        //         + item.LawbreakerMiddleName + ' '
        //         + item.LawbreakerLastName

        //     }
        //     if (this.AccusedTable === undefined) {
        //       this.AccusedTable = new Array();
        //     }
        //     this.AccusedTable.push(tpmname);
        //     // item.AccusedName = `${item.LawbreakerTitleName == null ? '' : item.LawbreakerTitleName}`;
        //     // item.AccusedName += `${item.LawbreakerFirstName == null ? '' : item.LawbreakerFirstName}`;
        //     // item.AccusedName += ` ${item.LawbreakerMiddleName == null ? '' : item.LawbreakerMiddleName}`;
        //     // item.AccusedName += ` ${item.LawbreakerLastName == null ? '' : item.LawbreakerLastName}`;
        //   }

        // });



        this.ArrestLocation = `${res[0].ArrestLocale[0].SubDistrict == null ? '' : res[0].ArrestLocale[0].SubDistrict}`;
        this.ArrestLocation += ` ${res[0].ArrestLocale[0].District == null ? '' : res[0].ArrestLocale[0].District}`;
        this.ArrestLocation += ` ${res[0].ArrestLocale[0].Province == null ? '' : res[0].ArrestLocale[0].Province}`;
        this.AccuserSubdistrictCode = `${res[0].ArrestLocale[0].SubDistrictCode == null ? '' : res[0].ArrestLocale[0].SubDistrictCode}`;
        this.AccuserSubdistrict = `${res[0].ArrestLocale[0].SubDistrict == null ? '' : res[0].ArrestLocale[0].SubDistrict}`;

        // res.ArrestStaff.filter(item => item.ContributorID === '11').map(async item => {
        res[0].ArrestStaff.map(async item => {
          if (item.ContributorCode === '6') {
            this.ArrestStaffName = item.FullName;   // ผู้กล่าวหา
            this.PositionName = item.PositionName;  // ตำแหน่งผู้กล่าวหา
            this.DepartmentName = item.DepartmentName;  // แผนกผู้กล่าวหา
          }

        });

        // res[0].ArrestLawbreaker.map(async item => {

        //   this.AccusedTable = item.AccusedName;
        //   if (isArray(this.AccusedTable)) {
        //     this.AccusedTable = [this.AccusedTable];
        //   }
        // });

        this.oArrest = res[0];

        // this.oArrest.ArrestLawbreaker.map(async item => {
        //   if (item.EntityType == 0) {
        //     item.LawbreakerFullName = `${item.CompanyTitle == null ? '' : item.CompanyTitle}`;
        //     item.LawbreakerFullName += ` ${item.CompanyName == null ? '' : item.CompanyName}`;
        //   } else {
        //     item.LawbreakerFullName = `${item.LawbreakerTitleName == null ? '' : item.LawbreakerTitleName}`;
        //     item.LawbreakerFullName += `${item.LawbreakerFirstName == null ? '' : item.LawbreakerFirstName}`;
        //     item.LawbreakerFullName += ` ${item.LawbreakerLastName == null ? '' : item.LawbreakerLastName}`;
        //   }
        // });
        console.log('ArrestLawbreaker');
        console.log(this.oArrest);
        // await this.getGuiltBaseByID();

        this.preloader.setShowPreloader(false);
      } catch (err) {
        console.log(err);
      }

    }, (err: HttpErrorResponse) => {
      console.log(err.message);
    });


  }

  async CompareMasLawgetByCon () {
  //  await this.LawsuitSV.CompareMasLawgetByCon(value.GuiltBaseID).then(res => {
  //     if (res) {
  //       for (let key in res) {
  //         if (key == 'CompareMasLawSection') {
  //           this.masLawGroupSectionList.push(res[key]);
  //         }
  //         if (key == 'CompareMasLawGuiltBase') {
  //           this.masLawGuitBaseList.push(res[key]);
  //         }
  //       }
  //     }
  //   });
  }


  async getGuiltBaseByID() {
    // this.preloader.setShowPreloader(true);

    // const aIndex;
    // const arrestIndex;

    if (this.oArrest.ArrestIndictment.length > 0) {
      this.ArrestIndictment = this.oArrest.ArrestIndictment.filter(item => item.IndictmentID == +this.IndictmentID)

      await this.LawsuitSV.getGuiltBaseByCon(this.oArrest.ArrestIndictment[0].GuiltBaseID.toString()).then(async res => {
        console.log(res);
        this.SectionName = res.CompareMasLawSection.SectionName;
        this.GuiltBaseName = res.CompareMasLawGuiltBase.GuiltBaseName;
        this.SectionNo = res.CompareMasLawPenalty.SectionNo.toString();
        this.PenaltyDesc = res.CompareMasLawPenalty.PenaltyDesc;

        /*
        if (this.ArrestIndictment[0].OpsArrestIndicmentDetailCollection.length > 0) {
          let ArrestLawbreaker = [];
          let ArrestName = '';


          ArrestLawbreaker = this.oArrest.ArrestLawbreaker;
          ArrestLawbreaker.map(async item => {
            if (item.EntityType == 0) {
              item.ArrestName = `${item.CompanyTitle == null ? '' : item.CompanyTitle}`;
              item.ArrestName += `${item.CompanyName == null ? '' : item.CompanyName}`;
            }
            else {
              item.ArrestName = `${item.LawbreakerTitleName == null ? '' : item.LawbreakerTitleName}`;
              item.ArrestName += `${item.LawbreakerFirstName == null ? '' : item.LawbreakerFirstName}`;
              item.ArrestName += ` ${item.LawbreakerLastName == null ? '' : item.LawbreakerLastName}`;
            }
          });


          // ถ้ามี CompareID แต่ไม่มี CompareDetail => get from  Arrest
          if (this.CompareID == '-') {
            for (var i = 0; i < ArrestIndictment[0].OpsArrestIndicmentDetailCollection.length; i += 1) {
              let ArrestList = [];
              let Product = '';

              ArrestList = ArrestLawbreaker.filter(item => item.LawbreakerID === ArrestIndictment[0].OpsArrestIndicmentDetailCollection[i].LawbreakerID);

              if (ArrestList.length > 0) {
                for (var j = 0; j < this.oArrest.ArrestProduct.length; j++) {
                  if (Product == '') {
                    Product += this.oArrest.ArrestProduct[j].ProductDesc;
                  }
                  else {
                    Product += '<br>' + this.oArrest.ArrestProduct[j].ProductDesc;
                  }
                }

                // ----- คำให้การผู้ต้องหา && รายงานการอนุมัติ ---//
                this.oCompareDetail = {
                  CompareDetailID: '',
                  CompareID: this.CompareID,
                  IndictmentDetailID: ArrestIndictment[0].OpsArrestIndicmentDetailCollection[i].IndictmentDetailID.toString(),
                  CompareAction: '',
                  LawbrakerTestimony: '',
                  Fact: '',
                  IsRequest: '0',
                  RequestForAction: '',
                  CompareReason: '',
                  IsProvisionalAcquittal: '',
                  Bail: null,
                  Guaruntee: null,
                  CompareFine: '',
                  PaymentFineDate: '',
                  PaymentFineAppointDate: '',
                  PaymentVatDate: '',
                  TreasuryMoney: '',
                  BribeMoney: '',
                  RewardMoney: '',
                  ApproveStationCode: '',
                  ApproveStation: '',
                  ApproveReportDate: '',
                  CommandNo: '',
                  CommandDate: '',
                  CompareAuthority: '',
                  ApproveReportType: '',
                  MistreatNo: '', //+ MistreatNo
                  FineType: '',
                  AdjustReason: '',
                  Lawbreaker: ArrestList[0].ArrestName,
                  LawbreakerID: ArrestList[0].LawbreakerID,
                  ProductDesc: Product,
                  FineRate: '',
                  VatValue: '',
                  RewardRate: '', //RewardRate
                  CompareDetailFine: [],
                  CompareDetailReceipt: [],
                }

                this.ListCompareDetail.push(this.oCompareDetail);
              }

            }
          }

        }
        */
      }, (err: HttpErrorResponse) => {
        console.log(err.message);
      });
    }

    this.preloader.setShowPreloader(false);
  }

  async getCompareByID() {
    // this.preloader.setShowPreloader(true);

    await this.fineService.getByCon(this.CompareID).then(async res => {
      console.log('getCompareByID');
      console.log(res);
      if (res != null) {
        this.oCompare = res[0];
        const CompareStaff = res[0].CompareStaff[0];
        this.CompareStaffName = CompareStaff.TitleName + ' ' + CompareStaff.FirstName + ' ' + CompareStaff.LastName;
        this.OperationPosName = CompareStaff.PositionName;
        this.OperationDeptName = CompareStaff.DepartmentName;
        this.preloader.setShowPreloader(false);
      }
    }, (err: HttpErrorResponse) => {
      console.log(err.message);
    });
  }

  ShowData() {
    // debugger
    if (this.CompareID !== '0') {
      const CRN = this.oCompare.CompareCode.split('/');

      if (CRN.length > 1) {
        this.CompareNo = CRN[0];
        this.CompareYear = CRN[1];
      }

      const CDate = this.oCompare.CompareDate.toString().split(' ');
      this.CompareDate = CDate[0];
      this.CompareTime = CDate[1] + '.000';

      this.IsOutside = this.oCompare.IsOutside;
      this.StationName = this.oCompare.CompareStation;
      this.ListCompareDetail = this.oCompare.CompareDetail;
      this.ListCompareStaff = this.oCompare.CompareStaff;

      this.ListCompareStaff.filter(f => f.ContributorCode == '18').map(async item => {
        // this.CompareStaffName = `${item.TitleName == null ? '' : item.TitleName}`;
        // this.CompareStaffName += `${item.FirstName == null ? '' : item.FirstName}`;
        // this.CompareStaffName += ` ${item.LastName == null ? '' : item.LastName}`;

        this.OperationPosName = `${item.PositionName == null ? '' : item.PositionName}`;
        this.OperationDeptName = `${item.DepartmentName == null ? '' : item.DepartmentName}`;
        this.CompareStaffID = `${item.StaffID == null ? '' : item.StaffID}`;
        this.oCompareStaff = item;
        this.oCompareStaff.IsNewItem = false;
      });

      // for (var i = 0; this.ListCompareDetail.length; i++) {
      //   this.ListCompareDetail[i].LawBrakerName = '';
      //   this.ListCompareDetailReceipt.push(this.oCompare.CompareDetail[i].CompareDetailReceipt);
      //   this.ListCompareDetail[i].IsNewItem = false;
      //   this.ListCompareDetailReceipt[i].IsNewItem = false;

      //   if (this.ListCompareDetail[i].IndictmentDetailID != null && this.ListCompareDetail[i].IndictmentDetailID || '') {
      //     let LawbreakerID = this.oArrest.ArrestIndictment
      //       .filter(item => item.IndictmentID === +this.IndictmentID)[0].OpsArrestIndicmentDetailCollection
      //       .filter(item => item.IndictmentDetailID === this.ListCompareDetail[i].IndictmentDetailID);

      //     let result = this.oArrest.ArrestLawbreaker.filter(item => item.LawbreakerID === +LawbreakerID[0].LawbreakerID);

      //     if (result.length > 0) {
      //       this.ListCompareDetail[i].LawBrakerName = result[0].LawbreakerFullName;
      //       this.ListCompareDetailReceipt[i].LawBrakerName = result[0].LawbreakerFullName;
      //     }
      //   }
      // }
    }
  }

  getIndexOf(arr, val, prop) {
    var l = arr.length,
      k = 0;
    for (k = 0; k < l; k = k + 1) {
      if (arr[k][prop] == val) {
        return k;
      }
    }
    return false;
  }

  convertDatepickerToNormal(datepicker: any) {
    return `${datepicker.year}-${datepicker.month}-${datepicker.day}`;
  }
  async onInsCompare() {
    let PaymentFineAppointDate: any = '';
    let PaymentVatDate: any = '';
    try {
      if (this.advForm.controls.PaymentFineAppointDate.value) {
        PaymentFineAppointDate = `${this.convertDatepickerToNormal(this.advForm.controls.PaymentFineAppointDate.value.date)} 00:00:00 +07:00`;
      }
      if (this.advForm.controls.PaymentVatDate.value) {
        PaymentVatDate = `${this.convertDatepickerToNormal(this.advForm.controls.PaymentVatDate.value.date)} 00:00:00 +07:00`;
      }
    } catch (err) {
      console.log(err);
    }
 
    try {
      const compareDetail: any = {
        'LawbrakerTestimony': this.editUser.LawbrakerTestimony,
        'Fact': this.compareUserDetailPopup.detailFact,
        'IsRequest': this.editUser.request,
        'RequestForAction': '-',
        'CompareReason': '-',
        'IsProvisionalAcquittal': 1,
        'Bail': this.editUser.Bail,
        'Guaruntee': this.editUser.Guaruntee,
        'CompareFine': 0,
        'PaymentFineAppointDate': PaymentFineAppointDate,
        'PaymentVatDate': PaymentVatDate,
        'TreasuryMoney': this.compareDataAllSum.sum3,
        'BribeMoney': this.compareDataAllSum.sum1,
        'RewardMoney': this.compareDataAllSum.sum2,
        'ApproveStationCode': this.dataToSave.compare.CompareStationCode,
        'ApproveStation': this.dataToSave.compare.CompareStation
      };
      const val3: any = Object.assign(this.dataToSave.compare.CompareDetail, compareDetail);
      console.log(val3);
      this.dataToSave.compare.IsOutside = this.IsOutside;
      console.log(this.selDate);
      this.dataToSave.compare.CompareDetail = val3;
      this.dataToSave.compare.CompareDate = `${this.selDate.year}-${this.selDate.month}-${this.selDate.day} ${this.CompareTime.toString()} +07.00`;
      this.dataToSave.compare.LawSuitID = this.LawsuitID;
      console.log(this.dataToSave);
      const resp: any = await this.fineService.postMethod('/CompareinsAll', this.dataToSave.compare, '8881');
      alert('บันทึกข้อมูลเสร็จสิ้น');
      return true

    } catch (err) {
      alert('บันทึกข้อมูลไม่สำเร็จ');
      console.log(err.message);
      return false
    }

  }

  async onUpdCompare() {
    // this.preloader.setShowPreloader(true);

    // this.oCompare.CompareCode = this.CompareNo + '/' + this.CompareYear;
    // this.oCompare.CompareDate = new Date(this.CompareDate + ' ' + this.CompareTime);
    //
    // this.oCompare.AccuserSubdistrictCode = this.AccuserSubdistrictCode;
    // this.oCompare.AccuserSubdistrict = this.AccuserSubdistrict;
    //
    // var aIndex;
    // aIndex = this.getIndexOf(this.ListCompareStaff, '18', 'ContributorCode');
    // this.ListCompareStaff[aIndex] = this.oCompareStaff;
    // this.oCompare.IsOutside = 1;
    // // debugger
    // // if (this.IsOutside == 'true') {
    // //   this.oCompare.IsOutside = '1';
    // // }
    // // else {
    // //   this.oCompare.IsOutside = '0';
    // // }
    //
    // let isSuccess: boolean = true;
    // debugger
    // // Update compare
    // await this.fineService.CompareupdByCon(this.oCompare).then(IsSuccess => {
    //   if (!IsSuccess) {
    //     isSuccess = IsSuccess;
    //     return false;
    //   }
    // }, (error) => { isSuccess = false; console.error(error); return false; });
    //
    // if (!isSuccess) return false;
    //
    // if (isSuccess) {
    //   alert(Message.saveComplete);
    // } else {
    //   alert(Message.saveFail);
    // }

    this.preloader.setShowPreloader(false);
  }

  // --- เขียนที่ (คำให้การของผู้ต้องหา) ---
  getStation() {
    // this.preloader.setShowPreloader(true);
    this.MasterSV.getStation().then(async res => {
      if (res) {
        this.rawOptions = res;
      }

    }, (err: HttpErrorResponse) => {
      console.log(err.message);
    });
    // this.preloader.setShowPreloader(false);
  }

  onAutoChange(value: string) {
    //
    if (value == '') {
      this.options = [];
      this.optionsStation = [];
      this.oCompare.CompareStationCode = '';
      this.oCompare.CompareStation = '';
    } else {
      this.options = this.rawOptions.filter(f => f.DepartmentNameTH.toLowerCase().indexOf(value.toLowerCase()) > -1);
      this.optionsStation = this.options;
      console.log(this.options);
      console.log('this');
    }
  }
  getWord(str: any) {
    console.log(str);
    return JSON.stringify(str);
  }
  onAutoFocus(value: string) {
    if (value == '') {
      this.options = [];
    }
  }

  onAutoSelecteWord(event) {
    this.oCompare.CompareStationCode = event.DepartmentCode;
    this.oCompare.CompareStation = event.DepartmentNameTH;
    this.dataToSave.compare.CompareStationCode = event.DepartmentCode;
    this.dataToSave.compare.CompareStation = event.DepartmentNameTH;
    console.log(event);
  }
  // ----- End เขียนที่ (คำให้การของผู้ต้องหา) ---


  // --- เขียนที่ (รายงานขออนุมัติการเปรียบเทียบคดีและแบบอนุมัติ) ---
  ReportonAutoChange(value: string) {
    //
    console.log(value);
    if (value == '') {
      this.ReportOptions = [];
    } else {
      this.ReportOptions = this.rawOptions.filter(f => f.DepartmentNameTH.toLowerCase().indexOf(value.toLowerCase()) > -1);
    }
    console.log(this.ReportOptions);
  }

  ReportonAutoFocus(value: string) {
    if (value == '') {
      this.ReportOptions = [];
    }
  }

  ReportonAutoSelecteWord(event) {
    // this.oProve.ProveStationCode = event.OfficeCode;
    // this.oProve.ProveStation = event.OfficeName;
    console.log('this');
    this.dataToSave.compare.CompareDetail.ApproveStation = event.event.DepartmentNameTH;
    this.dataToSave.compare.CompareDetail.ApproveStationCode = event.event.DepartmentCode;
  }
  // ----- End เขียนที่ (รายงานขออนุมัติการเปรียบเทียบคดีและแบบอนุมัติ) ---


  // ----- Format Datetime ---
  getCurrentDate() {
    let date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1).toISOString().substring(0, 10);
  }

  getCurrentTime() {
    let date = new Date();
    //
    return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '.' + date.getMilliseconds();
  }
  // ----- End DateTime -----


  // ----- ผู้เปรียบเทียบ ---
  async getCompareStaff() {
    // this.preloader.setShowPreloader(true);
    await this.MasterSV.getStaff().then(async res => {
      if (res) {
        this.rawStaffOptions = res;
      }
    }, (err: HttpErrorResponse) => {
      console.log(err.message);
    });
    // this.preloader.setShowPreloader(false);
  }


  StaffonAutoChange(value: string) {
    //
    if (value == '') {
      this.Staffoptions = [];
      this.ClearStaffData();
    } else {
      if (this.rawStaffOptions.length == 0) {
        this.getCompareStaff();
      }
      this.Staffoptions = this.rawStaffOptions.filter(f => f.FirstName.toLowerCase().indexOf(value.toLowerCase()) > -1);

    }
  }

  StaffonAutoFocus(value: string) {
    if (value == '') {
      this.Staffoptions = [];
      this.ClearStaffData();
    }
  }

  StaffonAutoSelecteWord(event) {
  
    this.oCompareStaff = {
      StaffID: this.CompareStaffID,
      ProgramCode: 'XCS-60',
      ProcessCode: 'XCS-60-06',
      // LawsuitID: this.LawsuitID,
      StaffCode: event.StaffCode,
      TitleName: event.TitleName,
      FirstName: event.FirstName,
      LastName: event.LastName,
      PositionCode: event.OperationPosCode,
      PositionName: event.OperationPosName,
      PosLevel: event.PosLevel,
      PosLevelName: event.PosLevelName,
      DepartmentCode: event.OperationDeptCode,
      DepartmentName: event.OperationDeptName,
      DepartmentLevel: event.DeptLevel,
      OfficeCode: event.OfficeCode,
      OfficeName: event.OfficeName,
      OfficeShortName: event.OfficeShortName,
      ContributorID: '18',
      IsActive: '1'
    };
    console.log(event);
    if (this.CompareStaffID == '' || this.CompareStaffID == undefined) {
      this.oCompareStaff.IsNewItem = true;
    }

    this.OperationPosName = event.OperationPosName;
    this.OperationDeptName = event.OperationDeptName;
  }
  onClickEditF3(item: any) {
    this.editUser = item;
  }
  ClearStaffData() {
    this.OperationPosName = '';
    this.OperationDeptName = '';

    this.oCompareStaff = {
      ProgramCode: 'XCS-60',
      ProcessCode: 'XCS-60-05',
      StaffID: this.CompareStaffID,
      // LawsuitID: this.LawsuitID,
      StaffCode: '',
      TitleName: '',
      FirstName: '',
      LastName: '',
      PositionCode: '',
      PositionName: '',
      PosLevel: '',
      PosLevelName: '',
      DepartmentCode: '',
      DepartmentName: '',
      DepartmentLevel: '',
      OfficeCode: '',
      OfficeName: '',
      OfficeShortName: '',
      ContributorID: '18'
    }

    if (this.CompareStaffID == '' || this.CompareStaffID == undefined) {
      this.oCompareStaff.IsNewItem = true;
    }
  }
  onSaveF3(item) {
    const data: any = {
      'name' : this.editUser.AccusedName,
    };
    console.log('Data for save');
    console.log(this.advForm.controls);
    this.editUser.PaymentVatDate = this.advForm.controls.PaymentVatDate.value ? this.advForm.controls.PaymentVatDate.value.formatted : null;
    this.editUser.PaymentFineAppointDate = this.advForm.controls.PaymentFineAppointDate.value ? this.advForm.controls.PaymentFineAppointDate.value.formatted : null;
    if (this.advForm.controls.PaymentFineAppointDate.value && this.CompareID == '0') {
      const dateObj = new Date();
      const month = dateObj.getUTCMonth() + 1;
      // months from 1-12
      const day = dateObj.getUTCDate();
      const year = dateObj.getUTCFullYear();
      this.editUser.IsProvisionalAcquittal = this.compareDate(this.advForm.controls.PaymentFineAppointDate.value.date , {day: day, month: month, year: year});
    } else if (this.advForm.controls.PaymentFineAppointDate.value) {
      this.editUser.IsProvisionalAcquittal = this.compareDate(this.advForm.controls.PaymentFineAppointDate.value.date , item.PaymentVatDate);
    }
    console.log(this.editUser);
  }
  onDateFromChanged(event) {
    // console.log(this.advForm.controls['PaymentFineAppointDate'].value.formatted);
    // setTimeout(() => {
    //   try {
    //     this.advForm.controls['LawsuitDateFrom'].setValue({
    //       date: this.advForm.value.LawsuitDateFrom.date,
    //       epoc: this.advForm.value.LawsuitDateFrom.epoc,
    //       formatted: this.advForm.value.LawsuitDateFrom.formatted,
    //       jsdate: this.advForm.value.LawsuitDateFrom.jsdate,
    //     });
    //   } catch (err) {
    //     console.log(err);
    //   }
    //
    // }, 100);
  }
  handleFileInput(files: any) {
    // this.fileToUpload = files.item(0);
    console.log(files);
    this.AllAddFiles.push(files.target.files.item(0));
    this.filePath.push({path: files.target.value, name: files.target.files.item(0).name });
  }
  async uploadFile() {
    try {
      const formData: FormData = new FormData();
      formData.append('fileAdd', this.AllAddFiles);
    } catch (err) {
      console.log(err);
    }
  }
  // ----- End ผู้เปรียบเทียบ ---
  calculateComparePayment() {
    let i = 0;
    let j = 0;
    let allSum = 0;
    console.log( this.compareData);
    for (const compare of Object.keys(this.compareData)) {
      let sum = 0;
      console.log(compare);
      console.log(Object.keys(this.compareData[compare]));
      for (const user of Object.keys(this.compareData[compare])) {
        console.log(this.compareData[compare][user]);
        sum = (+sum) + (+this.compareData[compare][user]);
        console.log(sum);
        this.ListCompareDetail[j].sumPayment = sum;
        j++;
      }
      allSum = (+allSum) + (+sum);
      this.ListCompareDetail[j].sumPayment = sum;
      j++;
      i++;
    }
    this.compareDataAllSum.sum = allSum;
  }
  getRound(num: any) {
    return parseFloat((Math.round(num * 100) / 100).toString()).toFixed(2);
  }
  compareDate(date1: any, date2: any) {
    const dateFirst = new Date(date1.year, date1.month, date1.day);
    const dateSecond = new Date(date2.year, date2.month, date2.day);
    console.log(dateFirst);
    console.log(dateSecond);
    return dateFirst <= dateSecond;
  }
  onClickEditF4(item: any) {
    this.userCompareReceiptDetail = item;
    console.log(item);
  }
  onClickEditF5(item: any, index: any) {
    console.log(index);
    console.log(item);
    if (index || index === 0) {
      this.compareUserDetailPopup = item;
      this.compareUserDetailPopup.index = index;
    }
    console.log(this.compareUserDetailPopup);
  }
  onSaveF5() {
    console.log(this.compareUserDetailPopup);
    if (this.compareUserDetailPopup.index || this.compareUserDetailPopup.index === 0 ) {
      console.log(this.form4);
      this.compareUserDetail[this.compareUserDetailPopup.index].ApproveReportDate = this.form4.controls.ApproveReportDate.value.formatted;
    }
    console.log(this.compareUserDetailPopup);
  }
  onSaveF4() {
    // i = i - 1;
    // console.log(this.ListCompareDetailReceipt);
    this.userCompareReceiptDetail.PaymentDate = this.form3.controls.PaymentDate.value.formatted;
    // this.ListCompareDetailReceipt[i].ReceiptChanel = this.userCompareReceiptDetail.ReceiptChanel;
    // this.ListCompareDetailReceipt[i].ReceiptNo = this.userCompareReceiptDetail.ReceiptNo;
    // this.ListCompareDetailReceipt[i].Refference = this.userCompareReceiptDetail.ReferenceNo;
    // this.ListCompareDetailReceipt[i].RevernueStatus = this.userCompareReceiptDetail.RevernueStatus;
    // this.ListCompareDetailReceipt[i].PaymentDate = this.form3.controls.PaymentDate.value.formatted;
  }
  confirmDelF4() {

  }
}



