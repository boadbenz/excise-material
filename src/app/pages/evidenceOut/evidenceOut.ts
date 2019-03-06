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
    public OfficeCode?: string;
    public EvidenceInID?: string;
    public EvidenceStaffName?: string;
    public EvidenceOutItem?: EvidenceOutItem[];
    public EvidenceOutStaff?: EvidenceOutStaff[];
}

export class EvidenceOutItem {
    public EvidenceOutID?: string;
    public ProductSeq?: number;
    public EvidenceOutItemID?: string;
    public DeliveryNo?: string;
    public EvidenceInItemCode?: string;
    public ProductDesc?: string;
    public StockID?: string;
    public NetVolumn?: string;
    public NetVolumnUnit?: string;
    public Qty?: string;
    public QtyUnit?: string;
    public Size?: string;
    public SizeUnit?: string;
    public ReceiveQty?: string;
    public ReceiveQtyUnit?: string;
    public InitBalanceQty?: string;
    public BalanceQty?: string;
    public BalanceQtyUnit?: string;
    public IsActive?: string;
    public IsReturn?: string;
    public IsNewItem?: boolean;
    public IsDelItem?: boolean;
    public EvidenceOutStockBalance?: EvidenceOutStockBalance[];
}

export class EvidenceOutStockBalance{
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