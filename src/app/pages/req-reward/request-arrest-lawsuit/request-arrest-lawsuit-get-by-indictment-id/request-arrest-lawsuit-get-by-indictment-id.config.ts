import { RequestArrestLawsuitConfig } from '../request-arrest-lawsuit.config';
import { ColumnsInterface } from '../../req-reward-shared/interfaces/columns-interface';
import { Input } from '@angular/core';

export class RequestArrestLawsuitGetByIndictmentIdConfig extends RequestArrestLawsuitConfig {
  @Input()
  public IndictmentID: number;
  public columns: ColumnsInterface[] = [
    {
      title: 'เลขที่ใบงาน',
      field: 'ArrestCode',
      isDisabled: true
    },
    {
      title: 'วันที่จับกุม',
      field: 'OccurrenceDate',
      title2: 'เวลา',
      field2: 'OccurrenceTime',
      isDisabled: true,
      isDisabled2: true
    },
    {
      title: 'ผู้กล่าวหา',
      field: 'staffName',
      mergeField: ['TitleName', '&nbsp;', 'FirstName', 'LastName'],
      isDisabled: true
    },
    {
      title: 'ตำแหน่ง',
      field: 'PositionName',
      isDisabled: true
    },
    {
      title: 'หน่วยงาน',
      field: 'OfficeName',
      isDisabled: true
    },
    {
      title: 'สถานที่จับกุม',
      field: 'location',
      mergeField: ['SubDistrict', '&frasl;', 'District', '&frasl;', 'Province'],
      isDisabled: true
    },
    {
      title: 'เลขที่คดีรับคำกล่าวโทษ',
      field: 'LawsuitNo',
      isDisabled: true
    },
    {
      title: 'วันที่รับคดี',
      field: 'LawsuitDate',
      title2: 'เวลา',
      field2: 'LawsuitTime',
      isDisabled: true,
      isDisabled2: true
    },
    {
      title: 'ฐานความผิดมาตรา',
      field: 'SubSectionType',
      isDisabled: true
    },
    {
      title: 'ฐานความผิด',
      field: 'GuiltBaseName',
      isDisabled: true
    },
    {
      title: 'บทกำหนดโทษ',
      field: 'SectionNo',
      isDisabled: true
    },
    {
      title: 'อัตราโทษ',
      field: 'PenaltyDesc',
      isDisabled: true
    }
  ];
}
