import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ColumnsInterface } from 'app/pages/reward/shared/interfaces/columns-interface';
import { ManageConfig } from '../manage.config';
import { Input } from '@angular/core';
import { IRequestArrestLawsuit } from 'app/pages/reward/interfaces/RequestArrestLawsuit.interface';

export class CONFIG extends ManageConfig {
  @Input()
  public IndictmentID: number;

  public defaultData: IRequestArrestLawsuit;

  public columnsDefault: ColumnsInterface[] = [
    {
      field: 'TitleName',
      inputType: 'hidden'
    },
    {
      field: 'FirstName',
      inputType: 'hidden'
    },
    {
      field: 'LastName',
      inputType: 'hidden'
    },

    {
      field: 'SubDistrict',
      inputType: 'hidden'
    },
    {
      field: 'District',
      inputType: 'hidden'
    },
    {
      field: 'Province',
      inputType: 'hidden'
    },
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
  public columns$ = new BehaviorSubject<any>(null);
}
