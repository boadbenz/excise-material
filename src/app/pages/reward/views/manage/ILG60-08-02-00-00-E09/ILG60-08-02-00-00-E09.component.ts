import { Component, OnInit } from '@angular/core';
import { CONFIG } from './CONFIG';
import { RequestBribeRewardService } from 'app/pages/reward/services/RequestBribeReward.service';
import {
  IRequestBribeRewardgetByIndictmentID,
  IRequestBribeReward
} from 'app/pages/reward/interfaces/RequestBribeReward.interface';
import { RequestRewardService } from 'app/pages/reward/services/RequestReward.service';
import { IRequestRewardgetByRequestBribeRewardID } from 'app/pages/reward/interfaces/RequestReward';
import { RequestCommandService } from 'app/pages/reward/services/RequestCommand.service';
import { RequestNoticeService } from 'app/pages/reward/services/RequestNotice.service';
import { RequestBribeService } from 'app/pages/reward/services/RequestBribe.service';
import { IRequestBribe } from 'app/pages/reward/interfaces/RequestBribe.interface';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ILG60-08-02-00-00-E09',
  templateUrl: './ILG60-08-02-00-00-E09.component.html',
  styleUrls: ['./ILG60-08-02-00-00-E09.component.scss']
})
export class ILG6008020000E09Component extends CONFIG implements OnInit {
  constructor(
    private requestBribeRewardService: RequestBribeRewardService,
    private requestBribeService: RequestBribeService,
    private requestRewardService: RequestRewardService,
    private requestCommandService: RequestCommandService,
    private requestNoticeService: RequestNoticeService
  ) {
    super();
  }

  ngOnInit() {
    this.fetchData({ IndictmentID: this.IndictmentID });
    this.FormInput$.next(this.FormInputDefault);
  }
  private fetchData(param: IRequestBribeRewardgetByIndictmentID) {
    this.requestBribeRewardService
      .RequestBribeRewardgetByIndictmentID(param)
      .subscribe((response: IRequestBribeReward[]) => {
        console.log('response', response);
        if (response.length > 0) {
          this.HaveNoticeCase(response);
        } else {
          // tslint:disable-next-line:max-line-length
         
        }
        // this.columns$.next(this.columnsDefault);
      });
  }
  private HaveNoticeCase(Data: IRequestBribeReward[]) {
    console.log('Data', Data);

    Data.forEach(e => {
      switch (e.HaveNotice) {
        case 0:
          break;
        case 1:
          this.requestBribeService
            .RequestBribegetByRequestBribeRewardID({
              RequestBribeRewardID: e.RequestBribeRewardID
            })
            .subscribe((ResponseRequestBribegetByRequestBribeRewardID: IRequestBribe[]) => {

             let newData: any[];
                ResponseRequestBribegetByRequestBribeRewardID.forEach(
                  element => {
                    newData = element.RequestBribeStaff.map(m => ({
                      ...element,
                      ...m,
                      CommandName: `${m.TitleName ||
                        ''}${m.FirstName ||
                        ''} ${m.LastName ||
                        ''}`,
                      StaffName: `${m.TitleName ||
                        ''}${m.FirstName ||
                        ''} ${m.LastName ||
                        ''}`,
                    }));
                  }
                );

                this.gridData$.next(newData);
            });

          break;
      }

      // this.RequestRewardgetByRequestBribeRewardID(
      //   { RequestBribeRewardID: e.RequestBribeRewardID },
      //   e
      // );
    });
  }
  // tslint:disable-next-line:max-line-length
  private RequestRewardgetByRequestBribeRewardID(
    RequestBribeRewardID: IRequestRewardgetByRequestBribeRewardID,
    RequestBribeReward: IRequestBribeReward
  ) {
    this.requestRewardService
      .RequestRewardgetByRequestBribeRewardID(RequestBribeRewardID)
      .subscribe(res => {
        switch (RequestBribeReward.HaveNotice) {
          case 0:
            console.log('res', res);

            if (res.length > 0) {
              // this.gridData$.next(res);
            }
            //  1.2.1) กรณีที่พบข้อมูล
            // (1) น ำข้อมูลที่ได้จำกข้อ 1.1) ไป Binding ในส่วนค ำ
            // ร้องขอรับเงินรำงวัล และส่วนรำยกำรค ำร้องขอรับ
            // 18
            // เงินรำงวัลตำมรำยละเอียดข้อ 1.2.2 กำรแสดง
            // ข้อมูล (Binding Data)
            // (2) ให้ด ำเนินกำรตำมขั้นตอนข้อ 1.3)

            //         กรณีที่ไม่พบข้อมูล
            // (1) ให้ด ำเนินกำรตำมขั้นตอนข้อ 1.3)
            break;

          case 1:
            break;
        }
      });
  }

  private Collapse() {
    //     ให้เปิดกำรแสดงทุก Collapse ยกเว้น
    // 1.3.1) ให้ซ่อน Collapse ส่วนค ำสั่งกรมฯ และส่วนตำรำง
    // รำยละเอียดค ำสั่งกรมฯจำกหน้ำจอ
    // 1.3.2) ให้ซ่อน Collapse ส่วนค ำร้องขอรับเงินสินบน และส่วน
    // รำยกำรค ำร้องขอรับเงินสินบนจำกหน้ำจอ
  }
}
