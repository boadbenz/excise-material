import { ManageConfig } from '../manage.config';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ColumnsInterface } from 'app/pages/reward/shared/interfaces/columns-interface';
import { Input } from '@angular/core';
import { ITableDataOptions } from 'app/pages/reward/shared/table-data/table-data.config';

export class CONFIG extends ManageConfig {
  @Input()
  public IndictmentID: number;

  @Input()
  public ArrestCode: string;
  @Input()
  public RequestBribeRewardID: number;

  public TableDataOptions: ITableDataOptions = {
    action: 'VIEW',
    actionUrl: '/reward/bribe',
    actionFieldParams: ['RequestBribeRewardID']
  };

  public gridData$ = new BehaviorSubject<any>(null);

  public FormInputDefault: ColumnsInterface[] = [
    {
      title: 'เงินสินบนที่ขอรับแล้ว',
      field: 'SumBribeTotal'
    }
  ];
  public FormInput$ = new BehaviorSubject<any>(this.FormInputDefault);
  public columnsTableDefault: ColumnsInterface[] = [
    {
      field: 'RequestBribeRewardID',
      inputType: 'hidden',
      primaryKey: true
    },
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
