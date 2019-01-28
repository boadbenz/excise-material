export class Evidence_In {
    public EvidenceInID?: string;
    public ProveID?: string;
    public EvidenceInCode?: string;
    public EvidenceInDate?: string;
    public EvidenceInTime?: string;
    public IsReceive?: string;
    public DeliveryNo?: string;
    public DeliveryDate?: string;
    public DeliveryTime?: string;
    public EvidenceInType?: string;
    public EvidenceInTypeName?: string; 
    public DeptNameSent?: string; 
    public DeptNameRecv?: string; 
    public Remark?: string;
    public ReturnDate?: string;
    public IsActive?: number;
    public IsEdit?: number;
    public EvidenceInItem?: EvidenceInItem[];
    public EvidenceInStaff?: EvidenceInStaff[];
}

export class EvidenceInStaff {
    public EvidenceInStaffID?: string;
    public EvidenceInID?: string;
    public StaffCode?: string;
    public TitleName?: string;
    public FirstName?: string;
    public LastName?: string;
    public PositionCode?: string;
    public PositionName?: string;
    public PosLevel?: string;
    public PosLevelName?: string;
    public DepartmentCode?: string;
    public DepartmentName?: string;
    public DepartmentLevel?: string;
    public OfficeCode?: string;
    public OfficeName?: string;
    public OfficeShortName?: string;
    public ContributorID?: string;
    public IsActive?: string;
}

export class EvidenceInItem {
    public EvidenceInItemID?: string;
    public EvidenceInItemCode?: string;
    public EvidenceInID?: string;
    public GroupCode?: string;
    public IsDomestic?: string;
    public ProductCode?: string;
    public BrandCode ?: number;
    public BrandNameTH?: string;
    public BrandNameEN?: string;
    public SubBrandCode?: string;
    public SubBrandNameTH?: string;
    public SubBrandNameEN?: string;
    public ModelCode?: string;
    public ModelName?: number;
    public FixNo1?: string;
    public DegreeCode?: string;
    public Degree?: string;
    public FixNo2?: string;
    public SequenceNo?: string;
    public ProductDesc?: string;
    public CarNo?: string;
    public DeliveryQty?: string;
    public DeliveryQtyUnit?: string;
    public DeliverySize?: string;
    public DeliverySizeUnit?: string;
    public DeliveryNetVolumn?: string;
    public DeliveryNetVolumnUnit?: string;
    public DamageQty?: string;
    public DamageQtyUnit?: string;
    public DamageSize?: string;
    public DamageSizeUnit?: string;
    public DamageNetVolumn?: string;
    public DamageNetVolumnUnit?: string;
    public IsActive?: string;
    public Remark?: string;
    public ReceiveQty?: string;
    public ReceiveNetVolumn?: string;
    public IsNewItem?: boolean;
    public IsDelItem?: boolean;
    public EvidenceStockBalance?: EvidenceStockBalance[];
}

export class EvidenceStockBalance{
    public StockID?: string;
    public EvidenceInItemID?: string;
    public WarehouseID?: string;
    public ReceiveQty?: string;
    public ReceiveQtyUnit?: string;
    public ReceiveSize?: string;
    public ReceiveSizeUnit?: string;
    public ReceiveNetVolumn?: string;
    public ReceiveNetVolumnUnit?: string;
    public BalanceQty?: string;
    public BalanceQtyUnit?: string;
    public BalanceSize?: string;
    public BalanceSizeUnit?: string;
    public BalanceNetVolumn?: string;
    public BalanceNetVolumnUnit?: string;
    public IsFinish?: string;
    public IsReceive?: string;
}

export class Document {
    public DocumentSeq?: number;
    public DocumentID?: string;
    public ReferenceCode?: string;
    public FilePath?: string;
    public DataSource?: string;
    public DocumentType?: string;
    public DocumentName?: string;
    public IsActive?: string;
    public IsNewItem?: boolean;
    public IsDelItem?: boolean;
}