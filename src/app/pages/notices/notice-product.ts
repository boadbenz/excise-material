import { FormControl } from '@angular/forms';

export class NoticeProduct {
    public ProductID = '';
    public NoticeCode = '';
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
    public NetWeight = '';
    public NetWeightUnit = '';
    public Remarks = '';
    public IsActive = 1;
    public BrandFullName = '';
    public IsNewItem: boolean;
}

export const NoticeProductFormControl = {
    ProductID: new FormControl(null),
    NoticeCode: new FormControl(null),
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
    NetWeight: new FormControl(null),
    NetWeightUnit: new FormControl(null),
    Remarks: new FormControl(null),


    BrandFullName: new FormControl(null),
    IsNewItem: new FormControl(false)
}
