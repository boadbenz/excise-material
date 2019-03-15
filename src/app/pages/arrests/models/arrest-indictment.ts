import { ArrestProductDetail } from './arrest-product';
import { ArrestLawGuitbase, ArrestLawbreaker } from '.';

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
    EntityType: number;
}

export class ArrestIndictment {
    IndictmentID: number;
    ArrestCode: string;
    GuiltBaseID: number;
    IsProve: number;
    IsActive: number;
    IsLawsuitComplete: number;
    ArrestIndicmentDetail: Array<ArrestIndictmentDetail>;
    ArrestLawGuitbase: Array<ArrestLawGuitbase>;
    ArrestIndictmentProduct: Array<ArrestIndictmentProduct>;

    IsModify: string;
    SubSectionType: string;
    GuiltBaseName: string;
    SectionNo: string;
    PenaltyDesc: string;
    RowId: number;
}

export class ArrestIndictmentDetail {
    IndictmentDetailID?: number;
    LawsuitType?: string;
    LawsuitEnd?: number;
    IsActive?: number;
    IndictmentID?: number;
    LawbreakerID?: number;
    ArrestLawbreaker?: Array<ArrestLawbreaker>;
    ArrestProductDetail?: Array<ArrestProductDetail>;

    IsModify: string;
}



export class ArrestIndictmentProduct {
    IndictmentProductID: number;
    IndictmentID: number;
    ProductID: number;
    IsProdcutCo: string;
    IndictmentProductQty: number;
    IndictmentProductQtyUnit: string;
    IndictmentProductSize: string;
    IndictmentProductSizeUnit: string;
    IndictmentProductVolume: string;
    IndictmentProductVolumeUnit: string;
    IndictmentProductMistreatRate: string;
    IndictmentProductFine: string;
    IndictmentProductIsActive: number;
    ProductType: number;
    ArrestCode: string;
    ProductGroupCode: string;
    ProductIsDomestic: number;
    ProductCode: string;
    ProductBrandCode: string;
    ProductBrandNameTH: string;
    ProductBrandNameEN: string;
    ProductSubBrandCode: string;
    ProductSubBrandNameTH: string;
    ProductSubBrandNameEN: string;
    ProductModelCode: string;
    ProductModelName: string;
    ProductFixNo1: string;
    ProductDegreeCode: string;
    ProductDegree: number;
    ProductSizeCode: string;
    ProductSize: string;
    ProductSizeUnitCode: string;
    ProductSizeUnitName: string;
    ProductFixNo2: number;
    ProductSequenceNo: string;
    ProductDesc: string;
    ProductCarNo: string;
    ProductQty: number;
    ProductQtyUnit: string;
    ProductNetVolume: number;
    ProductNetVolumeUnit: string;
    ProductIsActive: number;

    IsChecked: boolean;
    IsModify: string;
    RowId: number;
}
