import { ManageConfig } from '../manage.config';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ColumnsInterface } from 'app/pages/reward/shared/interfaces/columns-interface';
import { ITableDataOptions } from 'app/pages/reward/shared/table-data/table-data.config';
import { Input } from '@angular/core';

export class CONFIG extends ManageConfig {
  @Input()
  set IndictmentID(val) {
    this.IndictmentID$.next(val);
  }
  get IndictmentID() {
    return this.IndictmentID$.asObservable();
  }
  public IndictmentID$ = new BehaviorSubject<any>(null);

  @Input()
  set mode(val) {
    this.mode$.next(val);
  }
  get mode() {
    return this.mode$.asObservable();
  }
  public mode$ = new BehaviorSubject<any>(null);

  @Input()
  set RequestBribeRewardID(val) {
    this.RequestBribeRewardID$.next(val);
  }
  get RequestBribeRewardID() {
    return this.RequestBribeRewardID$.asObservable();
  }
  public RequestBribeRewardID$ = new BehaviorSubject<any>(null);

  @Input()
  set inputData(val) {
    this.inputData$.next(val);
  }
  get inputData() {
    return this.inputData$.asObservable();
  }
  public inputData$ = new BehaviorSubject<any>(null);

  public TableDataOptions: ITableDataOptions = {
    action: 'VIEW',
    actionUrl: '/reward/bribe/R',
    actionFieldParams: ['RequestRewardID']
  };

  public FormInputDefault: ColumnsInterface[] = [
    {
      title: 'เงินสินบนที่ขอรับแล้ว',
      field: 'SumRewardTotal'
    }
  ];
  public FormInput$ = new BehaviorSubject<any>(this.FormInputDefault);
  public columnsTableDefault: ColumnsInterface[] = [
    {
      title: 'เลขที่คำร้องขอ',
      field: 'RequestRewardCode'
    },
    {
      title: 'วันที่จัดทำคำร้องขอ',
      field: 'RequestDate'
    },
    {
      title: 'ชื่อผู้ต้องหา',
      field: 'LawbreakerFullName'
    },
    {
      title: 'ลักษณะคดี',
      field: 'FineTypeName'
    },
    {
      title: 'วันที่ชำระเงิน',
      field: 'PaymentDueDate'
    },
    {
      title: 'งวดชำระ',
      field: 'PaymentPeriodNo'
    }
  ];
  public columnsTable$ = new BehaviorSubject<any>(this.columnsTableDefault);
}
