import { ReqRewardHelper } from '../req-reward.helper';
import { ColumnsInterface } from '../req-reward-shared/interfaces/columns-interface';

export class RequestListConfig extends ReqRewardHelper {
  public columns: ColumnsInterface[] = [
    {
      title: 'ลำดับ',
      field: 'RowsId',
      inputType: 'text',
      default: ''
    },
    {
      title: 'เลขที่ใบงาน',
      field: 'ArrestCode',
      inputType: 'text',
      default: ''
    },
    {
      title: 'เลขที่คดีรับคำกล่าวโทษ',
      field: 'LawsuitID',
      inputType: 'text',
      default: ''
    },
    {
      title: 'วันที่จับกุม',
      field: 'ArrestDate',
      inputType: 'text',
      default: ''
    },
    {
      title: 'วันที่รับคดี',
      field: 'LawsuitDate',
      inputType: 'text',
      default: ''
    },
    {
      title: 'ชื่อผู้กล่าวหา',
      field: 'Lawbreaker',
      inputType: 'text',
      default: ''
    },
    {
      title: 'หน่วยงาน',
      field: 'DepartmentName',
      inputType: 'text',
      default: ''
    }
  ];
}
