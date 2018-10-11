// import { FormControl; Validators } from '@angular/forms';

export class ArrestProduct {
    public ProductID = '';
    public ProductType = '';
    public ArrestCode = '';
    public GroupCode = '';
    public IsDomestic = '';
    public ProductCode = '';
    public BrandCode = '';
    public BrandNameTH = '';
    public BrandNameEN = '';
    public SubBrandCode = '';
    public SubBrandNameTH = '';
    public SubBrandNameEN = '';
    public ModelCode = '';
    public ModelName = '';
    public FixNo1 = '';
    public DegreeCode = '';
    public Degree = '';
    public SizeCode = '';
    public Size = '';
    public SizeUnitCode = '';
    public SizeUnitName = '';
    public FixNo2 = '';
    public SequenceNo = '';
    public ProductDesc = '';
    public CarNo = '';
    public Qty = '';
    public QtyUnit = '';
    public NetVolume = '';
    public NetVolumeUnit = '';
    public NetWeight = '';
    public NetWeightUnit = '';
    public IsActive: number;
    public IsNewItem: boolean;
    public ProductFullName = '';
    public IsModify: string;
    public RowId: number;
}

export class ArrestProductDetail {
    // ProductID: number;
    // IsProdcutCo: string;
    // Qty: string;
    // QtyUnit: string;
    // Size: string;
    // SizeUnit: string;
    // Weight: string;
    // WeightUnit: string;
    // MistreatRate: string;
    // Fine: string;
    // IndictmentDetailID: string;
   public ProductDetailID: number;
   public ProductID: number;
   public IsProdcutCo: string;
   public ProductDetailQty: number;
   public ProductDetailQtyUnit: string;
   public ProductDetailSize: number;
   public ProductDetailSizeUnit: string;
   public ProductDetailVolume: number;
   public ProductDetailVolumeUnit: string;
   public ProductDetailMistreatRate: string;
   public ProductDetailFine: string;
   public IndicmentDetailID: number;
   public ProductDetailIsActive: number;
   public ProductType: number;
   public ArrestCode: string;
   public ProductGroupCode: string;
   public ProductIsDomestic: number;
   public ProductCode: string;
   public ProductBrandCode: string;
   public ProductBrandNameTH: string;
   public ProductBrandNameEN: string;
   public ProductSubBrandCode: string;
   public ProductSubBrandNameTH: string;
   public ProductSubBrandNameEN: string;
   public ProductModelCode: string;
   public ProductModelName: string;
   public ProductFixNo1: number;
   public ProductDegreeCode: string;
   public ProductDegree: string;
   public ProductSizeCode: string;
   public ProductSize: string;
   public ProductSizeUnitCode: string;
   public ProductSizeUnitName: string;
   public ProductFixNo2: number;
   public ProductSequenceNo: string;
   public ProductDesc: string;
   public ProductCarNo: string;
   public ProductQty: string;
   public ProductQtyUnit: string;
   public ProductNetVolume: number;
   public ProductNetVolumeUnit: string;
   public ProductIsActive: number;
}

// export const ArrestProductFormControl = {
//     ProductID: new FormControl(null; Validators.required);
//     ProductType: new FormControl(null);
//     ArrestCode: new FormControl(null; Validators.required);
//     GroupCode: new FormControl(null);
//     IsDomestic: new FormControl(null);
//     ProductCode: new FormControl(null; Validators.required);
//     BrandCode: new FormControl(null; Validators.required);
//     BrandNameTH: new FormControl(null; Validators.required);
//     BrandNameEN: new FormControl(null);
//     SubBrandCode: new FormControl(null);
//     SubBrandNameTH: new FormControl(null);
//     SubBrandNameEN: new FormControl(null);
//     ModelCode: new FormControl(null);
//     ModelName: new FormControl(null);
//     FixNo1: new FormControl(null);
//     DegreeCode: new FormControl(null);
//     Degree: new FormControl(null);
//     SizeCode: new FormControl(null);
//     Size: new FormControl(null);
//     SizeUnitCode: new FormControl(null);
//     SizeUnitName: new FormControl(null);
//     FixNo2: new FormControl(null);
//     SequenceNo: new FormControl(null);
//     ProductDesc: new FormControl(null);
//     CarNo: new FormControl(null);
//     Qty: new FormControl(null; Validators.required);
//     QtyUnit: new FormControl(null; Validators.required);
//     NetVolume: new FormControl(null);
//     NetVolumeUnit: new FormControl(null);
//     NetWeight: new FormControl(null);
//     NetWeightUnit: new FormControl(null);
//     IsActive: new FormControl(1; Validators.required);
//     IsNewItem: new FormControl(null; Validators.required);
//     ProductFullName: new FormControl(null)
// }
