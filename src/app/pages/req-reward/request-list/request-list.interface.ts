// tslint:disable-next-line:no-empty-interface
export interface IRequestList {
  ArrestCode: string;
  IndictmentID: number;
  LawsuitID: number;
  LawsuitNo: string;
  OccurrenceDate: Date;
  OccurrenceDateFrom?: Date;
  OccurrenceDateTo?: Date;
  LawsuitDate: Date;
  LawsuitDateFrom: Date;
  LawsuitDateTo: Date;
  TitleName: string;
  FirstName: string;
  LastName: string;
  OfficeName: string;
  StaffName?: string
}
export interface IRequestListgetByKeyword {
  Textsearch: string;
}
export interface IRequestListgetByConAdv {
  ArrestCode: string;
  LawsuitNo: string;
  OccurrenceDateFrom: Date;
  OccurrenceDateTo: Date;
  LawsuitDateFrom: Date;
  LawsuitDateTo: Date;
  StaffName: string;
  OfficeName: string;
}
