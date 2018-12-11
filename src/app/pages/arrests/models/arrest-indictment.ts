import { ArrestProductDetail } from './arrest-product';
import { ArrestLawGuitbase, ArrestLawbreaker } from '.';

export class IndictmentLawbreaker {
    LawbreakerID = '';
    LawbreakerFullName = '';
    CompanyFullName = '';
    ProductID = '';
    ProductName = '';
    Qty = '';
    QtyUnit = '';
    Size = '';
    SizeUnit = '';
    Weight = '';
    WeightUnit = '';

    EntityType = 0;
}

export class ArrestIndictment {
    IndictmentID = 0;
    ArrestCode = '';
    GuiltBaseID = 0;
    IsProve = 0;
    IsActive = 0;
    IsLawsuitComplete = 0;
    ArrestIndicmentDetail = new Array<ArrestIndictmentDetail>();
    ArrestLawGuitbase = new Array<ArrestLawGuitbase>();

    IsModify = '';
    SubSectionType = '';
    GuiltBaseName = '';
    SectionNo = '';
    PenaltyDesc = '';
    RowId = 0;
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
}

export class ArrestIndictmentProduct {
    IndictmentProductID = 0;
    IndictmentID = 0;
    ProductID = 0;
    IsProdcutCo = '';
    IndictmentProductQty = '';
    IndictmentProductQtyUnit = '';
    IndictmentProductSize = '';
    IndictmentProductSizeUnit = '';
    IndictmentProductVolume = '';
    IndictmentProductVolumeUnit = '';
    IndictmentProductMistreatRate = '';
    IndictmentProductFine = '';
    IndictmentProductIsActive = 0;
    ProductType = 0;
    ArrestCode = '';
    ProductGroupCode = '';
    ProductIsDomestic = 0;
    ProductCode = '';
    ProductBrandCode = '';
    ProductBrandNameTH = '';
    ProductBrandNameEN = '';
    ProductSubBrandCode = '';
    ProductSubBrandNameTH = '';
    ProductSubBrandNameEN = '';
    ProductModelCode = '';
    ProductModelName = '';
    ProductFixNo1 = '';
    ProductDegreeCode = '';
    ProductDegree = 0;
    ProductSizeCode = '';
    ProductSize = '';
    ProductSizeUnitCode = '';
    ProductSizeUnitName = '';
    ProductFixNo2 = 0;
    ProductSequenceNo = '';
    ProductDesc = '';
    ProductCarNo = '';
    ProductQty = 0;
    ProductQtyUnit = '';
    ProductNetVolume = 0;
    ProductNetVolumeUnit = '';
    ProductIsActive = 0
}