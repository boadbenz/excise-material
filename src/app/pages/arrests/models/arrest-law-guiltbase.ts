
export class ArrestLawGuitbase {
    GuiltBaseID = 0;
    GuiltBaseName = '';
    Fine = '';
    IsProve = 0;
    Remark = '';
    IsActive = 0;
    IsCompare = 0;
    SubSectionRuleID = 0;
    ArrestLawSubSectionRule = new Array<ArrestLawSubSectionRule>()

    RowId = 0;
    IsChecked = false;
}

export class ArrestLawSubSectionRule {
    SubSectionRuleID = 0;
    SubSectionID = 0;
    SectionNo = 0;
    IsActive = 0;
    ArrestLawSubSection = new Array<ArrestLawSubSection>();
    ArrestLawSection = new Array<ArrestLawSection>();
}

export class ArrestLawSubSection {
    SubSectionID = 0;
    SubSectionNo = 0;
    SubSectionType = '';
    SubSectionDesc = '';
    SectionNo = 0;
    IsActive = 0;
}

export class ArrestLawSection {
    SectionNo = 0;
    SectionName = '';
    SectionDesc1 = '';
    LawGroupID = 0;
    IsActive = 0;
    SectionDesc2 = '';
    SectionDesc3 = '';
    ArrestLawPenalty = new Array<ArrestLawPenalty>()
}

export class ArrestLawPenalty {
    PenaltyID = 0;
    SectionNo = 0;
    PenaltyDesc = '';
    IsFinePrison = 0;
    IsFine = 0;
    FineRateMin = 0;
    FineRateMax = 0;
    FineMin = 0;
    FineMax = 0;
    IsImprison = 0;
    PrisonRateMin = '';
    IsActive = 0;
    PrisonRateMax = 0;
    IsTaxPaid = 0
}