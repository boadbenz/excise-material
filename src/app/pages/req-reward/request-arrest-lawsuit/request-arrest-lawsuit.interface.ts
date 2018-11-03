// tslint:disable-next-line:no-empty-interface
export interface IRequestArrestLawsuit {
  ArrestCode: string;
  IndictmentID: number;
  OccurrenceDate: Date;
  OccurrenceTime: string;
  TitleName: string;
  FirstName: string;
  LastName: string;
  PositionName: string;
  OfficeName: string;
  SubDistrict: string;
  District: number;
  Province: number;
  LawsuitNo: string;
  LawsuitDate: Date;
  LawsuitTime: string;
  SubSectionType: string;
  GuiltBaseName: string;
  SectionNo: string;
  PenaltyDesc: string;
}
