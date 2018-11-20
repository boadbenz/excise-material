import { Component, OnInit } from '@angular/core';
import { CONFIG } from './CONFIG';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestArrestLawsuitService } from 'app/pages/reward/services/RequestArrestLawsuit.service';
import {
  IRequestArrestLawsuitGetByIndictmentId,
  IRequestArrestLawsuit
} from 'app/pages/reward/interfaces/RequestArrestLawsuit.interface';
import { BribeService } from '../bribe.service';
import { DropdownInterface } from 'app/pages/reward/shared/interfaces/dropdown-interface';
import { IRequestCommand } from 'app/pages/reward/interfaces/RequestCommand';
import { IRequestBribe } from 'app/pages/reward/interfaces/RequestBribe.interface';
import { IRequestBribeDetail } from 'app/pages/reward/interfaces/RequestBribeDetail.interface';
import { RequestPaymentFineService } from 'app/pages/reward/services/RequestPaymentFine.service';
import { IRequestPaymentFine } from 'app/pages/reward/interfaces/RequestPaymentFine';
import { RequestPaymentFineDetailService } from 'app/pages/reward/services/RequestPaymentFineDetail.service';
import { IRequestPaymentFineDetail } from 'app/pages/reward/interfaces/RequestPaymentFineDetail';
import { MasOfficeService } from 'app/pages/reward/services/master/MasOffice.service';
import { MasOfficeModel } from 'app/models/mas-office.model';
import { Observable } from 'rxjs/Observable';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  filter
} from 'rxjs/operators';
import { MyDatePickerOptions } from 'app/config/dateFormat';
interface IDetailCustom {
  PaymentFineDetailID?: number;
  LawbreakerName: string;
  FineTypeName: string;
  PaymentDate: string;
  ReceiptBookNo: any;
  PaymentPeriodNo: any;
  Receipt: string;
  PaymentFine: number;
  BribeMoney: number;
  NetBribeMoney: number;
}
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ILG60-08-03-00-00-E08',
  templateUrl: './ILG60-08-03-00-00-E08.component.html',
  styleUrls: ['./ILG60-08-03-00-00-E08.component.scss']
})
export class ILG6008030000E08Component extends CONFIG implements OnInit {
  public myDatePickerOptions = MyDatePickerOptions;
  public RequestCommand_NoticeCode_list: DropdownInterface[] = [];
  public tableDetail: IDetailCustom[] = [];
  public totalPart = 0;
  public partMoney = 0;
  public checkList: boolean[] = [];
  public MasOfficeMainList: string[] = [];
  searchStation = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length < 2
          ? []
          : this.MasOfficeMainList.filter(
              v => v.toLowerCase().indexOf(term.toLowerCase()) > -1
            ).slice(0, 10)
      )
    );
  constructor(
    private fb: FormBuilder,
    private requestArrestLawsuitService: RequestArrestLawsuitService,
    private bribeService: BribeService,
    private requestPaymentFineDetailService: RequestPaymentFineDetailService,
    private masOfficeService: MasOfficeService
  ) {
    super();
    this.RequestCommand$.subscribe((resCom: IRequestCommand[]) => {
      if (resCom[0]) {
        const RequestCommand: IRequestCommand = resCom[0];
        this.totalPart = RequestCommand.TotalPart;
        this.partMoney = RequestCommand.RequestCommandDetail[0].PartMoney;

        this.checkList = RequestCommand.RequestCommandDetail.map(m => true);
        this.RequestCommand_NoticeCode_list = RequestCommand.RequestCommandDetail.map(
          m => ({
            text: `${m.NoticeCode || ''}/${m.TitleName || ''} ${m.FirstName ||
              ''} ${m.LastName || ''}`,
            value: m.NoticeCode,
            value2: m.CommandDetailID
          })
        );
        this.formGroup.controls['RequestBribeCode'].setValue('Auto Generate');
      }
    });
    this.RequestBribe$.subscribe((resBri: IRequestBribe[]) => {
      if (resBri[0]) {
        const RequestBribe: IRequestBribe = resBri[0];
        this.totalPart = RequestBribe.TotalPart;
        this.partMoney = RequestBribe.PartMoney;

        this.tableDetail = this.mapDetailData(RequestBribe.RequestBribeDetail);
      }
    });
    this.formGroup = this.fb.group({
      DetailIDs: [null],
      CommandDetailID: [null],
      NoticeCodeAndName: ['', Validators.required],
      RequestBribeCode: [''],
      Station: ['', Validators.required],
      RequestDate: [this.setDateNow, Validators.required],
      RequestTime: [this.setTimeNow],
      Informeracknowledge: ['', Validators.required]
    });
    this.formGroup.controls['NoticeCodeAndName'].valueChanges.subscribe(
      form => {
        const index = this.RequestCommand_NoticeCode_list.findIndex(
          m => m.value === form
        );
        // console.log('CommandDetailID', this.RequestCommand_NoticeCode_list[index].value2);
        this.formGroup.controls['CommandDetailID'].setValue(
          this.RequestCommand_NoticeCode_list[index].value2
        );
      }
    );
  }

  ngOnInit() {
    this.masOfficeService
      .MasOfficeMaingetAll()
      .subscribe((Office: MasOfficeModel[]) => {
        this.MasOfficeMainList = Office.map(m => m.OfficeName);
      });
  }
  public RequestArrestLawsuitgetByIndictmentID(
    param: IRequestArrestLawsuitGetByIndictmentId
  ) {
    this.requestArrestLawsuitService
      .RequestArrestLawsuitgetByIndictmentID(param)
      .subscribe((res: IRequestArrestLawsuit[]) => {
        this.RequestArrestLawsuit$.next(res);
      });
  }
  public total() {
    return {
      PaymentFine:
        this.tableDetail.length > 0
          ? this.tableDetail.map(m => m.PaymentFine).reduce((a, b) => (a += b))
          : 0,
      BribeMoney:
        this.tableDetail.length > 0
          ? this.tableDetail.map(m => m.BribeMoney).reduce((a, b) => (a += b))
          : 0,
      NetBribeMoney:
        this.tableDetail.length > 0
          ? this.tableDetail
              .map(m => m.NetBribeMoney)
              .reduce((a, b) => (a += b))
          : 0
    };
  }
  public selectChange(NoticeCode) {
    this.tableDetail = [];
    this.requestPaymentFineDetailService
      .RequestPaymentFineDetailgetByNoticeCode({
        NoticeCode: NoticeCode
      })
      .subscribe((PaymentFineDetail: IRequestPaymentFineDetail[]) => {
        if (PaymentFineDetail.length > 0) {
          this.tableDetail = this.mapDetailData(PaymentFineDetail);
          this.checkList = PaymentFineDetail.map(m => true);
        } else {
          alert('ไม่พบข้อมูลที่สามารถขอรับเงินสินบน');
        }
      });
  }
  public mapDetailData(detailData: any[]): IDetailCustom[] {
    return detailData.map(m => ({
      ...m,
      LawbreakerName: `${m.LawbreakerTitleName || ''}${m.LawbreakerFirstName ||
        ''} ${m.LawbreakerMiddleName || ''}
     ${m.LawbreakerLastName || ''}${m.LawbreakerOtherName || ''} `,
      FineTypeName: m.FineType === 0 ? 'เปรียบเทียบคดี' : 'ส่งฟ้องศาล',
      PaymentDate: m.FineType === 0 ? m.PaymentActualDate : m.PaymentDueDate,
      Receipt: m.FineType === 0 ? m.ReceiptNo : m.JudgementNo,
      BribeMoney: Number(m.PaymentFine * 0.2),
      NetBribeMoney:
        Number(Number(m.PaymentFine * 0.2) / Number(this.totalPart)) *
        Number(this.partMoney)
    }));
  }
  public changeForm($event: FormGroup) {
    const DetailIDs: number[] = this.tableDetail.map((m, index) =>
      this.checkList[index] ? m.PaymentFineDetailID : null
    );
    this.formGroup.controls['DetailIDs'].setValue(DetailIDs);

    this.formData.emit({ FormName: 'ILG60-08-03-00-00-E08', FormData: $event });
  }
}
