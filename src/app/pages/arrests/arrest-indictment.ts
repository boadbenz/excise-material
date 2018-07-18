import { OpsArrestIndicmentDetailCollection } from './ops-arrest-indicment-detail-collection';

export class ArrestIndictment {
    public IndictmentID: number;
    public IsProve: number;
    public IsActive: number;
    public GuiltBaseID: number;
    public OpsArrestIndicmentDetailCollection: OpsArrestIndicmentDetailCollection[];
    
    SectionNo: string;
    LawbreakerID: string;
    LawbreakerName: string;
    ProductID: string;
    ProductName: string;
    SectionName: string;
    SectionDesc1: string;

    

    public IsNewItem: boolean;
}
