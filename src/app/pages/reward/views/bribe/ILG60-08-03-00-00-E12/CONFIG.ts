import { BribeConfig } from '../bribe.config';
import { ColumnsInterface } from 'app/pages/reward/shared/interfaces/columns-interface';
import { Output, EventEmitter } from '@angular/core';
import { IFormChange } from 'app/pages/reward/interfaces/FormChange';

export class CONFIG extends BribeConfig {
  @Output()
  public emitChange: EventEmitter<IFormChange> = new EventEmitter();
  public columns: ColumnsInterface[] = [
    {
      title: 'เขียนที่',
      field: 'StationOfPOA'
    },
    {
      title: 'วันที่จัดทำ',
      field: 'POADate',
      default: this.setDateNow
    },
    {
      title: 'เวลา',
      field: 'POATime',
      default: this.setTimeNow
    },
    {
      title: 'ผู้รับมอบอำนาจ',
      field: 'StaffMainName'
    },
    {
      title: 'ตำแหน่ง',
      field: 'PositionName',
      // isDisabled: true // 1.1.5(2)
    },
    {
      title: 'หน่วยงาน',
      field: 'OfficeName',
      // isDisabled: true // 1.1.5(3)
    }
  ];
}
