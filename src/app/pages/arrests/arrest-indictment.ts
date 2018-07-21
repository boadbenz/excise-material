import { ArrestProductDetail } from "./arrest-product";

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
    Lawbreaker: IndictmentLawbreaker[];
    ArrestIndictmentDetail: ArrestIndicmentDetail[];
    ArrestProductDetail: ArrestProductDetail[];
    IsNewItem: boolean;
}

export class ArrestIndicmentDetail{
    IndictmentDetailID: number;
    LawsuitType: string;
    IsActive: number;
    IndictmentID: number;
    LawbreakerID: number;
}