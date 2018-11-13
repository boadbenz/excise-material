import { BribeConfig } from '../bribe.config';
import { ColumnsInterface } from 'app/pages/reward/shared/interfaces/columns-interface';

export class CONFIG extends BribeConfig {
  public columns: ColumnsInterface[] = [
    {
      title: 'เขียนที่',
      field: 'StationOfPOA'
    },
    {
      title: 'วันที่จัดทำ',
      field: 'POADate',
      inputType: 'date',
      title2: 'เวลา',
      field2: 'POATime',
      inputType2: 'time'
    },
    {
      title: 'ผู้รับมอบอำนาจ',
      field: 'Name'
    },
    {
      title: 'ตำแหน่ง',
      field: 'PositionName',
      isDisabled: true // 1.1.5(2)
    },
    {
      title: 'หน่วยงาน',
      field: 'OfficeName',
      isDisabled: true // 1.1.5(3)
    }
  ];
}
