import { ManageConfig } from '../manage.config';
import { Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ColumnsInterface } from 'app/pages/reward/shared/interfaces/columns-interface';
import { ITableDataOptions } from 'app/pages/reward/shared/table-data/table-data.config';

export class CONFIG extends ManageConfig {
  public TableDataOptions: ITableDataOptions = {
    isSumFooter: true
  };
  @Input()
  set inputData(val) {
    this.inputData$.next(val);
  }
  get inputData() {
    return this.inputData$.asObservable();
  }
  public inputData$ = new BehaviorSubject<any>(null);
  public FormInput$ = new BehaviorSubject<any>(null);

  public FormInputDefault: ColumnsInterface[] = [
    {
      title: 'คำสั่งกรมเลขที่',
      field: 'CommandNo',
      default: ''
    },
    {
      title: 'วันที่ออกคำสั่ง',
      field: 'CommandDate',
      default: '',
      title2: 'เวลา',
      field2: 'CommandTime',
      default2: ''
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
      field: 'StaffPositionName'
    },
    {
      title: 'หน่วยงาน',
      field: 'StaffOfficeName'
    },
    {
      title: 'จำนวนส่วน',
      field: 'PartMoney',
      width: '50',
      showInput: true
    }
  ];
  public columnsTable$ = new BehaviorSubject<any>(this.columnsTableDefault);
}
