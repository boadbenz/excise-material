import { ReqRewardHelper } from '../req-reward.helper';
import { ColumnsInterface } from '../req-reward-shared/interfaces/columns-interface';
import { ITableDataOptions } from '../req-reward-shared/table-data/table-data.config';
import { IRequestList } from './request-list.interface';

export class RequestListConfig extends ReqRewardHelper {
  public advSearch: any;
  public TextSearch: string;
  public gridData: IRequestList[] = [];
  public TableDataOptions: ITableDataOptions = {
    action: 'VIEW',
    actionUrl: '/reward/request-arrest-lawsuit',
    actionFieldParams: 'IndictmentID'
  }
  public columns: ColumnsInterface[] = [
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
      field: 'LawsuitNo',
      inputType: 'text',
      default: '',
      class: 'col-md-6',
      isFilter: true,
    },
    {
      title: 'วันที่จับกุม',
      field: 'OccurrenceDate',
      inputType: 'text',
      default: '',
    },
    {
      title: 'วันที่จับกุม',
      field: 'OccurrenceDateFrom',
      inputType: 'date',
      title2: 'ถึง',
      field2: 'OccurrenceDateTo',
      inputType2: 'date',
      default: '',
      class: 'col-md-6',
      isFilter: true,
      isHiddenTable: true
    },
    {
      title: 'วันที่รับคดี',
      field: 'LawsuitDate',
      inputType: 'text',
      default: ''
    },
    {
      title: 'วันที่รับคดี',
      field: 'LawsuitDateFrom',
      inputType: 'date',
      title2: 'ถึง',
      field2: 'LawsuitDateTo',
      inputType2: 'date',
      default: '',
      class: 'col-md-6',
      isFilter: true,
      isHiddenTable: true,
    },
    // {
    //   title: 'ถึง',
    //   field: 'LawsuitDateTo',
    //   inputType: 'date',
    //   default: '',
    //   class: 'col-md-3',
    //   isFilter: true,
    //   isHiddenTable: true
    // },
    {
      title: 'ชื่อผู้กล่าวหา',
      field: 'StaffName',
      inputType: 'text',
      default: '',
      class: 'col-md-6',
      isFilter: true
    },
    {
      title: 'หน่วยงาน',
      field: 'OfficeName',
      inputType: 'text',
      default: '',
      class: 'col-md-6',
      isFilter: true
    }
  ];
}
