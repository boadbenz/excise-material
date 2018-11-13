import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MasStaffService } from '../../services/master/MasStaff.service';
import { BribeConfig } from './bribe.config';
import { MasOfficeService } from '../../services/master/MasOffice.service';
import { RequestCommandService } from '../../services/RequestCommand.service';
import {
  IRequestCommandgetByArrestCode,
  IRequestCommand
} from '../../interfaces/RequestCommand';
import { BribeService } from './bribe.service';
import { NavigationService } from 'app/shared/header-navigation/navigation.service';
import { RewardService } from '../../reward.service';
import { TransactionRunningService } from '../../services/TransactionRunning.service';
import {
  ITransactionRunning,
  ITransactionRunninginsAll
} from '../../interfaces/TransactionRunning';
import { RequestBribeRewardService } from '../../services/RequestBribeReward.service';
import { RequestBribeService } from '../../services/RequestBribe.service';
import {
  IRequestBribeinsAll,
  IRequestBribe,
  IRequestBribegetByCon
} from '../../interfaces/RequestBribe.interface';
import { MasDocumentMainService } from '../../services/master/MasDocumentMain.service';
import { MasDocumentModel } from 'app/models/mas-document.model';
import { MasStaffModel } from 'app/models';
import { MasOfficeModel } from 'app/models/mas-office.model';

@Component({
  selector: 'app-bribe',
  templateUrl: './bribe.component.html',
  styleUrls: ['./bribe.component.scss'],
  providers: [BribeService]
})
export class BribeComponent extends BribeConfig implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private masStaffService: MasStaffService,
    private masOfficeService: MasOfficeService,
    private masDocumentMainService: MasDocumentMainService,
    private requestCommandService: RequestCommandService,
    private bribeService: BribeService,
    private navService: NavigationService,
    private rewardService: RewardService,
    private transactionRunningService: TransactionRunningService,
    private requestBribeService: RequestBribeService
  ) {
    super();
    this.activatedRoute.params.subscribe(param => {
      this.bribeService.mode$.next(param['mode']);
      this.bribeService.ArrestCode$.next(param['ArrestCode']);
      this.bribeService.RequestBribeID$.next(param['RequestBribeID']);
      this.bribeService.RequestBribeRewardID$.next(
        param['RequestBribeRewardID']
      );
    });
  }

  ngOnInit() {
    // ILG60-08-03-00-00-E01 (Page Load)
    this.pageLoad();

    this.setShowButton();
    this.navService.onPrevPage.subscribe(res => {
      this.rewardService.bribeState$.next({
        mode: 'B',
        RequestBribeRewardID: this.RequestBribeRewardID
      });
    });
  }
  private pageLoad() {
    // 1 START
    switch (this.bribeService.mode$.getValue()) {
      case 'C':
        // 1.1
        this.MasStaffMaingetAll(); // 1.1.1
        this.MasOfficeMaingetAll(); // 1.1.2

        this.RequestCommandgetByArrestCode({
          ArrestCode: this.bribeService.ArrestCode$.getValue()
        }); // 1.1.3

        // 1.1.5
        this.controlEnableAll();

        // 1.1.6
        this.navService.setSaveButton(true); // 1.1.6(1)
        this.navService.setCancelButton(true); // 1.1.6(2)
        this.navService.setPrintButton(false);
        this.navService.setEditButton(false);
        this.navService.setDeleteButton(false);
        this.navService.setSearchBar(false);

        break;
      case 'R':
        // 1.2
        this.RequestBribegetByCon({
          RequestBribeID: this.bribeService.RequestBribeID$.getValue()
        });

        this.MasDocumentMaingetAll();

        // 1.2.4
        // ส่วนคำร้องขอรับเงินสินบน
        // Icon
        this.ILG60_08_03_00_00_E08_DISABLED$.next(false); // ปุ่ม ย่อขยาย Collapse Panel
        // Drop Down List
        this.ILG60_08_03_00_00_E09_DISABLED$.next(true); // เลขที่ใบแจ้งความนำจับ
        // Input Box
        this.ILG60_08_03_00_00_E10_DISABLED$.next(true); // เขียนที่

        // ส่วนรายละเอียดคำร้องขอรับเงินสินบน
        // Check Box
        this.ILG60_08_03_00_00_E11_DISABLED$.next(true); // [Check Box] เลือกรายการคำร้องขอรับเงินสินบน

        // ส่วนหนังสือมอบอำนาจ
        // Icon
        this.ILG60_08_03_00_00_E12_DISABLED$.next(false); // ปุ่ม ย่อขยาย Collapse Panel
        // Input Box
        this.ILG60_08_03_00_00_E13_DISABLED$.next(true); // เขียนที่
        this.ILG60_08_03_00_00_E14_DISABLED$.next(true); // ผู้รับมอบอำนาจ

        // ส่วนเอกสารแนบ
        // Icon
        this.ILG60_08_03_00_00_E16_DISABLED$.next(false); // ปุ่ม ย่อขยาย Collapse Panel
        // Button
        this.ILG60_08_03_00_00_E17_DISABLED$.next(true); // ปุ่ม เพิ่มเอกสารแนบ
        // Icon
        this.ILG60_08_03_00_00_E18_DISABLED$.next(true); // Icon ค้นหาที่อยู่เอกสารแนบ […]
        this.ILG60_08_03_00_00_E19_DISABLED$.next(true); // [ลบ]

        // 1.2.5
        this.navService.setSaveButton(false);
        this.navService.setCancelButton(false);
        this.navService.setPrintButton(true); // 1.2.5(1)
        this.navService.setEditButton(true); // 1.2.5(2)
        this.navService.setDeleteButton(true); // 1.2.5(3)
        this.navService.setPrevPageButton(true); // 1.2.5(4)
        this.navService.setSearchBar(false);
        break;
    }
    // 2 END
  }

  private RequestBribegetByCon(param: IRequestBribegetByCon) {
    // 1.2.1
    this.requestBribeService
      .RequestBribegetByCon(param)
      .subscribe((res: IRequestBribe[]) => {
        // 1.2.3
        this.bribeService.RequestBribe$.next(res);
      });
  }
  private MasDocumentMaingetAll() {
    // 1.2.2
    this.masDocumentMainService
      .MasDocumentMaingetAll({
        DocumentType: 8,
        ReferenceCode: this.bribeService.RequestBribeID$.getValue()
      })
      .subscribe((res: MasDocumentModel[]) => {
        // 1.2.3
        this.bribeService.MasDocument$.next(res);
      });
  }

  private controlEnableAll() {
    // ส่วนคำร้องขอรับเงินสินบน
    // Icon
    this.ILG60_08_03_00_00_E08_DISABLED$.next(false); // ปุ่ม ย่อขยาย Collapse Panel
    // Drop Down List
    this.ILG60_08_03_00_00_E09_DISABLED$.next(false); // เลขที่ใบแจ้งความนำจับ
    // Input Box
    this.ILG60_08_03_00_00_E10_DISABLED$.next(false); // เขียนที่

    // ส่วนรายละเอียดคำร้องขอรับเงินสินบน
    // Check Box
    this.ILG60_08_03_00_00_E11_DISABLED$.next(false); // [Check Box] เลือกรายการคำร้องขอรับเงินสินบน

    // ส่วนหนังสือมอบอำนาจ
    // Icon
    this.ILG60_08_03_00_00_E12_DISABLED$.next(false); // ปุ่ม ย่อขยาย Collapse Panel
    // Input Box
    this.ILG60_08_03_00_00_E13_DISABLED$.next(false); // เขียนที่
    this.ILG60_08_03_00_00_E14_DISABLED$.next(false); // ผู้รับมอบอำนาจ

    // ส่วนเอกสารแนบ
    // Icon
    this.ILG60_08_03_00_00_E16_DISABLED$.next(false); // ปุ่ม ย่อขยาย Collapse Panel
    // Button
    this.ILG60_08_03_00_00_E17_DISABLED$.next(false); // ปุ่ม เพิ่มเอกสารแนบ
    // Icon
    this.ILG60_08_03_00_00_E18_DISABLED$.next(false); // Icon ค้นหาที่อยู่เอกสารแนบ […]
    this.ILG60_08_03_00_00_E19_DISABLED$.next(false); // [ลบ]
  }
  private RequestCommandgetByArrestCode(param: IRequestCommandgetByArrestCode) {
    this.requestCommandService
      .RequestCommandgetByArrestCode(param)
      .subscribe((res: IRequestCommand[]) => {
        // 1.1.4
        this.bribeService.RequestCommand$.next(res);
      });
  }
  private MasStaffMaingetAll() {
    this.masStaffService
      .MasStaffMaingetAll()
      .subscribe((res: MasStaffModel[]) => {
        this.bribeService.MasStaffMain$.next(res);
      });
  }
  private MasOfficeMaingetAll() {
    this.masOfficeService
      .MasOfficeMaingetAll()
      .subscribe((res: MasOfficeModel[]) => {
        this.bribeService.MasOfficeMain$.next(res);
      });
  }
  private setShowButton() {
    this.navService.setSearchBar(false);
    this.navService.setPrintButton(false);
    this.navService.setDeleteButton(false);
    this.navService.setCancelButton(false);
    this.navService.setEditButton(false);
    this.navService.setSaveButton(false);
    this.navService.setPrevPageButton(true);
  }
}
