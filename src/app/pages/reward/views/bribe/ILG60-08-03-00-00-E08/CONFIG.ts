import { BribeConfig } from '../bribe.config';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ColumnsInterface } from 'app/pages/reward/shared/interfaces/columns-interface';
import { Input, Output, EventEmitter } from '@angular/core';
import { IFormChange } from 'app/pages/reward/interfaces/FormChange';

export class CONFIG extends BribeConfig {
  @Output() public formData: EventEmitter<IFormChange> = new EventEmitter();
  @Input()
  set inputData(val) {
    this.inputData$.next(val);
  }
  get inputData() {
    return this.inputData$.asObservable();
  }
  public inputData$ = new BehaviorSubject<any>(null);

  @Input()
  set RequestCommand(val) {
    this.RequestCommand$.next(val);
  }
  get RequestCommand() {
    return this.RequestCommand$.asObservable();
  }
  public RequestCommand$ = new BehaviorSubject<any>(null);

  @Input()
  set RequestBribe(val) {
    this.RequestBribe$.next(val);
  }
  get RequestBribe() {
    return this.RequestBribe$.asObservable();
  }
  public RequestBribe$ = new BehaviorSubject<any>(null);

  @Input()
  set mode(val) {
    this.mode$.next(val);
  }
  get mode() {
    return this.mode$.asObservable();
  }
  public mode$ = new BehaviorSubject<any>(null);
  public RequestArrestLawsuit$ = new BehaviorSubject<any>(null);

  // public columnsForm: ColumnsInterface[] = [
  //   {
  //     field: 'DetailIDs'
  //   },
  //   {
  //     field: 'CommandDetailID',
  //     isRequired: true
  //   },
  //   {
  //     title: 'เลขที่ใบแจ้งความนำจับ',
  //     field: 'NoticeCodeAndName',
  //     isRequired: true
  //   },
  //   {
  //     title: 'เลขที่คำร้องขอ',
  //     field: 'RequestBribeCode'
  //   },
  //   {
  //     title: 'เขียนที่',
  //     field: 'Station',
  //     isRequired: true
  //   },
  //   {
  //     title: 'วันที่จัดทำ',
  //     field: 'RequestDate',
  //     default: `${this.setZero((new Date).getHours())}.${this.setZero((new Date).getMinutes())} น.`,
  //     isRequired: true,
  //     title2: 'เวลา',
  //     field2: 'RequestTime'
  //   },
  //   {
  //     title: 'ผู้แจ้งความได้ทราบว่า',
  //     isRequired: true,
  //     field: 'Informeracknowledge'
  //   }
  // ];

  public columnsTable: ColumnsInterface[] = [
    {
      title: 'ชื่อผู้ต้องหา',
      field: 'LawbreakerName'
    },
    {
      title: 'ลักษณะคดี',
      field: 'FineType'
    },
    {
      title: 'วันที่ชำระ',
      field: 'PaymentDate',
      default: `${this.setZero((new Date).getHours())}.${this.setZero((new Date).getMinutes())} น.`
    },
    {
      title: 'ใบเสร็จเล่มที่',
      field: 'ReceiptBookNo'
    },
    {
      title: 'เลขที่อ้างอิง',
      field: 'ReceiptNo'
    },
    {
      title: 'งวดชำระ',
      field: 'PaymentPeriodNo'
    },
    {
      title: 'ค่าปรับตามงวด',
      field: 'PaymentFine'
    },
    {
      title: 'เงินสินบน',
      field: 'BribeMoney'
    },
    {
      title: 'เงินสินบนสุทธิ',
      field: 'NetBribeMoney'
    }
  ];
}
