export class EvidenceOut {
    public EvidenceOutID?: string;
    public EvidenceOutDate?: string;
    public EvidenceOutTime?: string;
    public EvidenceOutType?: string;
    public EvidenceOutNo?: string;
    public EvidenceOutNoDate?: string;
    public EvidenceOutNoTime?: string;
    public BookNo?: string;
    public ReceiptNo?: string;
    public PayDate?: string;
    public PayTime?: string;
    public ApproveDate?: string;
    public ApproveTime?: string;
    public ReturnDate?: string;
    public Remark?: string;
    public WarehouseID?: string;
    public ApproveNo?: string;
    public EvidenceOutCode?: string;
    public IsActive?: string;
    public DeptName?: string;
    public EvidenceStaffName?: string;
    public EvidenceOutItem?: EvidenceOutItem[];
    public EvidenceOutStaff?: EvidenceOutStaff[];
}

export class EvidenceOutItem {
    public EvidenceOutItemID?: string;
    public StockID?: string;
    public Qty?: string;
    public QtyUnit?: string;
    public Size?: string;
    public SizeUnit?: string;
    public NetVolumn?: string;
    public NetVolumnUnit?: string;
    public EvidenceOutID?: string;
    public IsActive?: string;
    public IsReturn?: string;
    public EvidenceStock?: EvidenceStock[];
}

export class EvidenceStock {
    public StockID?: string;
    public WarehouseID?: string;
    public EvidenceInItemID?: string;
    public ReceiveQty?: string;
    public ReceiveQtyUnit?: string;
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
    public EvidenceInItem?: EvidenceInItem[];
}

export class EvidenceInItem {
    public EvidenceInItemID?: string;
    public EvidenceInItemCode?: string;
    public EvidenceInID?: string;
    public GroupCode?: string;
    public IsDomestic?: string;
    public ProductCode?: string;
    public BrandCode?: string;
    public BrandNameTH?: string;
    public BrandNameEN?: string;
    public SubBrandCode?: string;
    public SubBrandNameTH?: string;
    public SubBrandNameEN?: string;
    public ModelCode?: string;
    public ModelName?: string;
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
    public IsNewItem?: boolean;
    public IsDelItem?: boolean;

}

export class EvidenceOutStaff {
    public EvidenceOutStaffID?: string;
    public EvidenceOutID?: string;
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
