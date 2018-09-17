import { LawsuitJudgement } from "./lawsuit_judgement";
import { LawsuiteStaff } from "./lawsuit_staff";
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
  public LawsuitStaff: Array<LawsuiteStaff>;
  public LawsuitJudgement: Array<LawsuitJudgement>;
}

class Types {
  public value: number;
  public text: string;
}
