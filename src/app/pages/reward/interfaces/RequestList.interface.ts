// tslint:disable-next-line:no-empty-interface
export interface IRequestList {
  ArrestCode: string;
  IndictmentID: number;
  LawsuitID: number;
  LawsuitNo: string;
  OccurrenceDate: string;
  OccurrenceDateFrom?: string;
  OccurrenceDateTo?: string;
  LawsuitDate: string;
  LawsuitDateFrom: string;
  LawsuitDateTo: string;
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
  OccurrenceDateFrom: string;
  OccurrenceDateTo: string;
  LawsuitDateFrom: string;
  LawsuitDateTo: string;
  StaffName: string;
  OfficeName: string;
}
