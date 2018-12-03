import { FormControl, Validators } from '@angular/forms';
export class InvestigateDetailProduct {
    public ProductID: number;
    public InvestigateCode: number;
    public GroupName: string;
    public GroupCode: string;
    public IsDomestic: string;
    public ProductCode: string;
    public BrandCode: string;
    public BrandNameTH: string;
    public BrandNameEN: string;
    public SubBrandCode: string;
    public SubBrandNameTH: string;
    public SubBrandNameEN: string;
    public ModelCode: string;
    public ModelName: string;
    public FixNo1: number;
    public DegreeCode: string;
    public Degree: string;
    public SizeCode: string;
    public Size: string;
    public SizeUnitCode: string;
    public SizeUnitName: string;
    public FixNo2: string;
    public SequenceNo: string;
    public ProductDesc: string;
    public CarNo: string;
    public Qty: number;
    public QtyUnit: string;
    public NetVolume: number;
    public NetVolumeUnit: string;
    public IsActive: number;
}

export const InvestigateProductFormControl = {
    SuspectID: new FormControl(null),
    ProductID: new FormControl(null),
    InvestigateCode: new FormControl(null),
    GroupName: new FormControl(null),
    GroupCode: new FormControl(null),
    IsDomestic: new FormControl(null),
    ProductCode: new FormControl(null),
    BrandCode: new FormControl(null),
    BrandNameTH: new FormControl(null),
    BrandNameEN: new FormControl(null),
    SubBrandCode: new FormControl(null),
    SubBrandNameTH: new FormControl(null),
    SubBrandNameEN: new FormControl(null),
    ModelCode: new FormControl(null),
    ModelName: new FormControl(null),
    FixNo1: new FormControl(null),
    DegreeCode: new FormControl(null),
    Degree: new FormControl(null),
    SizeCode: new FormControl(null),
    Size: new FormControl(null),
    SizeUnitCode: new FormControl(null),
    SizeUnitName: new FormControl(null),
    FixNo2: new FormControl(null),
    SequenceNo: new FormControl(null),
    ProductDesc: new FormControl(null),
    CarNo: new FormControl(null),
    Qty: new FormControl(null),
    QtyUnit: new FormControl(null),
    NetVolume: new FormControl(null),
    NetVolumeUnit: new FormControl(null),
    IsActive: new FormControl(null),
}
