import { ReqRewardHelper } from '../req-reward.helper';
import { ColumnsInterface } from '../req-reward-shared/interfaces/columns-interface';
import { ITableDataOptions } from '../req-reward-shared/table-data/table-data.config';

export class RequestListConfig extends ReqRewardHelper {
  public isShowAdvSearch = false;
  public TableDataOptions: ITableDataOptions = {
    action: 'VIEW',
    actionUrl: '/req-reward/request-arrest-lawsuit',
    actionFieldParams: 'IndictmentID'
  }
  public columns: ColumnsInterface[] = [
    {
      title: 'ลำดับ',
      field: 'RowsId',
      inputType: 'text',
      default: '',
    },
    {
      title: 'เลขที่ใบงาน',
      field: 'ArrestCode',
      inputType: 'text',
      default: '',
      class: 'col-md-6',
      isFilter: true,
    },
    {
      title: 'เลขที่คดีรับคำกล่าวโทษ',
      field: 'LawsuitID',
      inputType: 'text',
      default: '',
      class: 'col-md-6',
      isFilter: true,
    },
    {
      title: 'วันที่จับกุม',
      field: 'ArrestDate',
      inputType: 'text',
      default: '',
    },
    {
      title: 'วันที่จับกุม',
      field: 'ArrestDate_START',
      inputType: 'date',
      default: '',
      class: 'col-md-3',
      isFilter: true
    },
    {
      title: 'ถึง',
      field: 'ArrestDate_END',
      inputType: 'date',
      default: '',
      class: 'col-md-3',
      isFilter: true
    },
    {
      title: 'วันที่รับคดี',
      field: 'LawsuitDate',
      inputType: 'text',
      default: ''
    },
    {
      title: 'วันที่รับคดี',
      field: 'LawsuitDate_START',
      inputType: 'date',
      default: '',
      class: 'col-md-3',
      isFilter: true
    },
    {
      title: 'ถึง',
      field: 'LawsuitDate_END',
      inputType: 'date',
      default: '',
      class: 'col-md-3',
      isFilter: true
    },
    {
      title: 'ชื่อผู้กล่าวหา',
      field: 'Lawbreaker',
      inputType: 'text',
      default: '',
      class: 'col-md-6',
      isFilter: true
    },
    {
      title: 'หน่วยงาน',
      field: 'DepartmentName',
      inputType: 'text',
      default: '',
      class: 'col-md-6',
      isFilter: true
    }
  ];
}
