import { BribeConfig } from '../bribe.config';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ColumnsInterface } from 'app/pages/reward/shared/interfaces/columns-interface';
import { Input } from '@angular/core';

export class CONFIG extends BribeConfig {
  @Input()
  set inputData(val){
      this.inputData$.next(val)
  }
  get inputData() {
      return this.inputData$.asObservable();
  }
  public inputData$ = new BehaviorSubject<any>(null);
  public RequestArrestLawsuit$ = new BehaviorSubject<any>(null);


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
