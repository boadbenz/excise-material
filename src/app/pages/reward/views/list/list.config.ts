import { RewardHelper } from '../../reward.helper';
import { IRequestList } from '../../interfaces/RequestList.interface';
import { ITableDataOptions } from '../../shared/table-data/table-data.config';
import { ColumnsInterface } from '../../shared/interfaces/columns-interface';

export class ListConfig extends RewardHelper {
  public advSearch: any;
  public TextSearch: string;
  public gridData: IRequestList[] = [];
  public TableDataOptions: ITableDataOptions = {
    action: 'VIEW',
    actionUrl: '/reward/manage',
    actionFieldParams: ['IndictmentID', 'ArrestCode']
  };
  public columns: ColumnsInterface[] = [
    {
      title: 'เลขที่ใบงาน',
      field: 'ArrestCode',
      inputType: 'text',
      default: '',
      class: 'col-md-6',
      isFilter: true
    },
    {
      title: 'เลขที่คดีรับคำกล่าวโทษ',
      field: 'LawsuitNo',
      inputType: 'text',
      default: '',
      class: 'col-md-6',
      isFilter: true
    },
    {
      title: 'วันที่จับกุม',
      field: 'OccurrenceDate',
      inputType: 'date',
      default: this.setDateNow
    },
    {
      title: 'วันที่จับกุม',
      field: 'OccurrenceDateFrom',
      inputType: 'date',
      default: this.setDateNow,
      title2: 'ถึง',
      field2: 'OccurrenceDateTo',
      inputType2: 'date',
      default2: this.setDateNow,
      class: 'col-md-6',
      isFilter: true,
      isHiddenTable: true
    },
    {
      title: 'วันที่รับคดี',
      field: 'LawsuitDate',
      inputType: 'date',
      default: this.setDateNow
    },
    {
      title: 'วันที่รับคดี',
      field: 'LawsuitDateFrom',
      inputType: 'date',
      default: this.setDateNow,
      title2: 'ถึง',
      field2: 'LawsuitDateTo',
      inputType2: 'date',
      default2: this.setDateNow,
      class: 'col-md-6',
      isFilter: true,
      isHiddenTable: true
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
