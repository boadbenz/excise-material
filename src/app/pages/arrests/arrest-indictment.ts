
class OpsArrestIndicmentDetailCollection {
    IndictmentDetailID: number;
    LawsuitType: number;
    IsActive: number;
    IndictmentID: number;
    LawbreakerID: number;
}

export class IndictmentLawbreaker {
    LawbreakerID: string;
    LawbreakerName: string;
    ProductID: string;
    ProductName: string;
}

export class ArrestIndictment {
    ArrestCode: string;
    IndictmentID: number;
    IsProve: number;
    IsActive: number;
    GuiltBaseID: number;
    SectionNo: string;
    SectionDesc1: string;    
    SectionName: string;
    Lawbreaker: IndictmentLawbreaker[]
    IsNewItem: boolean;
}
