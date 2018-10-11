export class ArrestLawGuitbase {
    GuiltBaseID: number;
    GuiltBaseName: string;
    Fine: string;
    IsProve: number;
    Remark: string;
    IsActive: number;
    IsCompare: number;
    SubSectionRuleID: number;
    ArrestLawSubSectionRule: ArrestLawSubSectionRule[]
}

export class ArrestLawSubSectionRule {
    SubSectionRuleID: number;
    SubSectionID: number;
    SectionNo: number;
    IsActive: number;
    LawsuitLawSubSection: LawsuitLawSubSection[];
    LawsuitLawSection: LawsuitLawSection[];
}

export class LawsuitLawSubSection {
    SubSectionID: number;
    SubSectionNo: number;
    SubSectionType: string;
    SubSectionDesc: string;
    SectionNo: number;
    IsActive: number;
}

export class LawsuitLawSection {
    SectionNo: number;
    SectionName: string;
    SectionDesc1: string;
    LawGroupID: number;
    IsActive: number;
    SectionDesc2: string;
    SectionDesc3: string;
    LawsuitLawPenalty: LawsuitLawPenalty[]
}

export class LawsuitLawPenalty {
    PenaltyID: number;
    SectionNo: number;
    PenaltyDesc: string;
    IsFinePrison: number;
    IsFine: number;
    FineRateMin: number;
    FineRateMax: number;
    FineMin: number;
    FineMax: number;
    IsImprison: number;
    PrisonRateMin: string;
    IsActive: number;
    PrisonRateMax: number;
    IsTaxPaid: number
}