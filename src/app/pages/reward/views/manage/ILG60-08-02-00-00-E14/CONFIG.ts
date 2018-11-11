import { ManageConfig } from '../manage.config';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ColumnsInterface } from 'app/pages/reward/shared/interfaces/columns-interface';
import { ITableDataOptions } from 'app/pages/reward/shared/table-data/table-data.config';
import { Input } from '@angular/core';

export class CONFIG extends ManageConfig {
  @Input()
  public IndictmentID: number;

  @Input()
  public ArrestCode: string;

  @Input()
  public mode: string;

  @Input()
  public RequestBribeRewardID: number;

  @Input()
  set gridData(val) {
    this.gridData$.next(val);
  }
  get gridData() {
    return this.gridData$.asObservable();
  }
  public gridData$ = new BehaviorSubject<any>(null);

  public TableDataOptions: ITableDataOptions = {
    action: 'VIEW',
    actionUrl: '/reward/reward',
    actionFieldParams: ['IndictmentID']
  };
  public gridData$ = new BehaviorSubject<any>(null);

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
      field: 'RequestBribeCode'
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
      field: 'FineType'
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
