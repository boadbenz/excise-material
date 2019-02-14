import { LawsuitJudgement } from "./lawsuit_judgement";
import { LawsuiteStaff } from "./lawsuit_staff";
import { LawsuitArrestStaff } from "./lawsuit_arreststaff";
export class Lawsuit {
  public RowsId: number;
  public LawsuitID: number;
  public ArrestCode: string;
  public IndictmentID: number;
  public IsLawsuit: number;
  public IsLawsuitStatus: string;
  public ReasonDontLawsuit: string;
  public LawsuitNo: string;
  public LawsuitDate: string;
  public LawsuitTime: string;
  public LawsuitStationCode: string;
  public LawsuitStation: string;
  public IsOutside: number;
  public AccuserTestimony: string;
  public LawsuitResult: string;
  public DeliveryDocNo: string;
  public DeliveryDate: Date;
  public IsActive: number;
  public LawsuitType: number;
  public LawsuitEnd: number;
  public LawsuiteStaff: Array<LawsuiteStaff>;
  public LawsuitArrestStaff: Array<LawsuitArrestStaff>;
  public LawsuitJudgement: Array<LawsuitJudgement>;
  OccurrenceDate: string;
  OccurrenceTime: string;
  SubSectionType: string;
  GuiltBaseName: string;
  SectionNo: string;
  PenaltyDesc: string;
}

class Types {
  public value: number;
  public text: string;
}
