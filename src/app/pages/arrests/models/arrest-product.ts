import { Acceptability } from "./acceptability";

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
    
    public IsActive: number;
    public IsChecked: boolean;
    public IsNewItem: boolean;
    public ProductFullName = '';
    public IsModify: string;
    public RowId: number;
    ProductFrom: string;
}


export class ArrestProductDetail {
    ProductID: number;
    ProductDetailID?: number;
    IsProdcutCo?: string;
    Qty?: string;
    QtyUnit?: string;
    Size?: string;
    SizeUnit?: string;
    Volume?: string;
    VolumeUnit?: string;
    MistreatRate?: string;
    Fine?: string;
    IndictmentDetailID?: number;
    ProductDesc?: string;
    IsActive?: number;
    IsChecked: boolean;
}