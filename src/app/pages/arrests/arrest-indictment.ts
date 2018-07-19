
class OpsArrestIndicmentDetailCollection {
    IndictmentDetailID: number;
    LawsuitType: number;
    IsActive: number;
    IndictmentID: number;
    LawbreakerID: number;
}

export class ArrestIndictment {
    IndictmentID: number;
    IsProve: number;
    IsActive: number;
    GuiltBaseID: number;
    OpsArrestIndicmentDetailCollection: OpsArrestIndicmentDetailCollection[];

    SectionNo: string;
    LawbreakerID: string;
    LawbreakerName: string;
    ProductID: string;
    ProductName: string;
    SectionName: string;
    SectionDesc1: string;

    IsNewItem: boolean;
}
