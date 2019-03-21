
export class ArrestLawGuitbase {
    GuiltBaseID: number;
    GuiltBaseName: string;
    Fine: string;
    IsProve: number;
    Remark: string;
    IsActive: number;
    IsCompare: number;
    SubSectionRuleID: number;
    ArrestLawSubSectionRule: Array<ArrestLawSubSectionRule>

    RowId: number;
    IsChecked: boolean;
}

export class ArrestLawSubSectionRule {
    SubSectionRuleID: number;
    SubSectionID: number;
    SectionNo: number;
    IsActive: number;
    ArrestLawSubSection: Array<ArrestLawSubSection>;
    ArrestLawSection: Array<ArrestLawSection>;
}

export class ArrestLawSubSection {
    SubSectionID: number;
    SubSectionNo: number;
    SubSectionType: string;
    SubSectionDesc: string;
    SectionNo: number;
    IsActive: number;
}

export class ArrestLawSection {
    SectionNo: number;
    SectionName: string;
    SectionDesc1: string;
    LawGroupID: number;
    IsActive: number;
    SectionDesc2: string;
    SectionDesc3: string;
    ArrestLawPenalty: Array<ArrestLawPenalty>
}

export class ArrestLawPenalty {
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