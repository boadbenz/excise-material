import { ManageConfig } from '../manage.config';
import { Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ColumnsInterface } from 'app/pages/reward/shared/interfaces/columns-interface';
import { ITableDataOptions } from 'app/pages/reward/shared/table-data/table-data.config';

export class CONFIG extends ManageConfig {
  @Input()
  public IndictmentID: number;

  @Input()
  public ArrestCode: string;

  public TableDataOptions: ITableDataOptions = {
    action: 'VIEW',
    actionUrl: '/reward/manage',
    actionFieldParams: ['IndictmentID']
  };

  public gridData$ = new BehaviorSubject<any>(null);

  public FormInput$ = new BehaviorSubject<any>(null);

  public FormInputDefault: ColumnsInterface[] = [
    {
      title: 'คำสั่งกรมเลขที่',
      field: 'CommandNo'
    },
    {
      title: 'วันที่ออกคำสั่ง',
      field: 'CommandDate',
      title2: 'เวลา',
      field2: 'CommandTime'
    }
  ];
  public columnsTableDefault: ColumnsInterface[] = [
    {
      title: 'เลขที่ใบแจ้งความนำจับ',
      field: 'NoticeCode'
    },
    {
      title: 'วันที่แจ้งความ',
      field: 'NoticeDate'
    },
    {
      title: 'ผู้แจ้งความ',
      field: 'CommandName'
    },
    {
      title: 'ผู้รับแจ้งความ',
      field: 'StaffName'
    },
    {
      title: 'ตำแหน่ง',
      field: 'PositionName'
    },
    {
      title: 'หน่วยงาน',
      field: 'OfficeName'
    },
    {
      title: 'จำนวนส่วน',
      field: 'PartMoney'
    }
  ];
  public columnsTable$ = new BehaviorSubject<any>(this.columnsTableDefault);
}
