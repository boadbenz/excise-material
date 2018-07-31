import { ArrestProductDetail } from "./arrest-product";
import { FormControl, Validators, FormArray } from "../../../../node_modules/@angular/forms";

class OpsArrestIndicmentDetailCollection {
    IndictmentDetailID: number;
    LawsuitType: number;
    IsActive: number;
    IndictmentID: number;
    LawbreakerID: number;
}

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
    ArrestCode: string;
    IndictmentID: number;
    IsProve: number;
    IsActive: number;
    GuiltBaseID: number;
    SectionNo: string;
    SectionDesc1: string;    
    SectionName: string;
    IndictmentLawbreaker: IndictmentLawbreaker[];
    ArrestIndictmentDetail: ArrestIndicmentDetail[];
    OpsArrestIndicmentDetailCollection: OpsArrestIndicmentDetailCollection[];
    
    IsNewItem: boolean;
}

export class ArrestIndicmentDetail{
    IndictmentDetailID: number;
    LawsuitType: string;
    IsActive: number;
    IndictmentID: number;
    LawbreakerID: number;
    ArrestProductDetail: ArrestProductDetail[];
}

export const ArrestIndictmentFormControl = {
    ArrestCode: new FormControl(null, Validators.required),
    IndictmentID: new FormControl(null),
    IsProve: new FormControl(null),
    IsActive: new FormControl(null),
    GuiltBaseID: new FormControl(null, Validators.required),
    SectionNo: new FormControl(null),
    SectionDesc1: new FormControl(null),    
    SectionName: new FormControl(null),
    IndictmentLawbreaker: new FormControl(null),
    ArrestIndictmentDetail: new FormControl(null),
    OpsArrestIndicmentDetailCollection: new FormControl(null),
    
    IsNewItem: new FormControl(null),
}