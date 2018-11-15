import { BribeConfig } from '../bribe.config';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ColumnsInterface } from 'app/pages/reward/shared/interfaces/columns-interface';
import { Input } from '@angular/core';

export class CONFIG extends BribeConfig {
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

  public columnsForm: ColumnsInterface[] = [
    {
      title: 'เลขที่ใบแจ้งความนำจับ',
    },
    {
      title: 'เลขที่คำร้องขอ',
      field: 'RequestBribeCode'
    },
    {
      title: 'เขียนที่',
      field: 'Station',
    },
    {
      title: 'วันที่จัดทำ',
      field: 'RequestDate',
      title2: 'เวลา',
      field2: 'RequestTime'
    },
    {
      title: 'ผู้แจ้งความได้ทราบว่า',
      field: 'Informeracknowledge'
    },
  ];

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
      field: 'PaymentDate'
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
