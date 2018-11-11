import { BribeConfig } from '../bribe.config';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ColumnsInterface } from 'app/pages/reward/shared/interfaces/columns-interface';
import { IRequestCommand } from 'app/pages/reward/interfaces/RequestCommand';
import { Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

export class CONFIG extends BribeConfig {
  @Input()
  set RequestCommand(val){
      this.RequestCommand$.next(val)
  }
  get RequestCommand() {
      return this.RequestCommand$.asObservable();
  }
  public RequestCommand$ = new BehaviorSubject<any>(null);
  public RequestArrestLawsuit$ = new BehaviorSubject<any>(null);
  public columns: ColumnsInterface[] = [
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
