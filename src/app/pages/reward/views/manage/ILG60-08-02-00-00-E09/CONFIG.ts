import { ManageConfig } from '../manage.config';
import { Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ColumnsInterface } from 'app/pages/reward/shared/interfaces/columns-interface';

export class CONFIG extends ManageConfig {
  @Input()
  public IndictmentID: number;
  public columns$ = new BehaviorSubject<any>(null);
  public gridData$ = new BehaviorSubject<any>(null);

  public columnsDefault: ColumnsInterface[] = [
    {
      title: 'เลขที่ใบแจ้งความนำจับ',
      field: 'NoticeCode',
    },
    {
      title: 'วันที่แจ้งความ',
      field: 'NoticeDate',
    },
    {
      title: 'ผู้แจ้งความ',
      field: 'Name',
    },
    {
        title: 'ผู้รับแจ้งความ',
        field: 'StaffName',
    },
    {
      title: 'ตำแหน่ง',
      field: 'StaffPositionName',
    },
    {
      title: 'หน่วยงาน',
      field: 'StaffOfficeName'
    },
    {
      title: 'จำนวนส่วน',
      field: 'PartMoney',
    }
  ];
}
