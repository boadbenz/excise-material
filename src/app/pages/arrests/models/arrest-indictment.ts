import { ArrestProductDetail } from './arrest-product';
import { FormControl, Validators, FormArray } from '@angular/forms';
import { ArrestLawGuitbase } from "./arrest-law-guiltbase";
import { ArrestLawbreaker } from './arrest-lawbreaker';

// class OpsArrestIndicmentDetailCollection {
//     IndictmentDetailID: number;
//     LawsuitType: number;
//     IsActive: number;
//     IndictmentID: number;
//     LawbreakerID: number;
// }

export class IndictmentLawbreaker {    
    LawbreakerID: string;
    LawbreakerFullName: string;
    CompanyFullName: string;
    ProductID: string;
    ProductName: string;
    Qty: string;
    QtyUnit: string;
    Size: string;
    SizeUnit: string;
    Weight: string;
    WeightUnit: string;

    IsChecked: boolean;
    EntityType: number;
}

export class ArrestIndictment {
    // ArrestCode: string;
    // IndicmentID: number;
    // IsProve: number;
    // IsActive: number;
    // GuiltBaseID: number;
    // SectionNo: string;
    // SectionDesc1: string;    
    // SectionName: string;
    // IndictmentLawbreaker: IndictmentLawbreaker[];
    // ArrestIndictmentDetail: ArrestIndicmentDetail[];
    // OpsArrestIndicmentDetailCollection: OpsArrestIndicmentDetailCollection[];
    
    // IsNewItem: boolean;

    IndictmentID: number;
    ArrestCode: string;
    GuiltBaseID: number;
    IsProve: number;
    IsActive: number;
    IsLawsuitComplete:number;
    ArrestIndictmentDetail: ArrestIndictmentDetail[];
    ArrestLawGuitbase: ArrestLawGuitbase[];

    IsModify: string;
}

export class ArrestIndictmentDetail{
    IndictmentDetailID: number;
    LawsuitType: string;
    LawsuitEnd: number;
    IsActive: number;
    IndictmentID: number;
    LawbreakerID: number;
    ArrestLawbreaker: ArrestLawbreaker[]
    ArrestProductDetail: ArrestProductDetail[];
}