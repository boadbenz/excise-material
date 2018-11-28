
export class AdjustList {
    public ArrestCode?: string;
    public LawsuitNo?: string;
    public IndictmentID?: number;
    public ProveReportNo?: string;
    public CompareCode?: string;
    public CompareStaff?: AdjustStaff;
    public CompareID?:number;
    public CompareDate?:string;
}

export class AdjustArrest {
    public ArrestCode?: string;
    public ArrestDate?: string;
    public ArrestTime?: string;
    public LawsuitNo?: string;
    public OccurrenceDate?: string;
    public OccurrenceTime?: string;
    public Behaviour?: string;
    public Testimony?: string;
    public Prompt?: string;
    public IsMatchNotice?: string;
    public CompareCode?: string;
    public CompareID?: number;
    public LawsuitName?: string;
    public LawsuitPositionName?: string;
    public LawsuitOfficeShortName?: string;
    public CompareName?: string;
    public ComparePositionName?: string;
    public CompareOfficeShortName?: string;
}

export class AdjustDetail {
    public CompareDetailID?: number;
    public CompareID?: number;
    public IndictmentDetailID?: number;
    public CompareAction?: string;
    public LawbrakerTestimony?: string;
    public Fact?: string;
    public IsRequest?: number;
    public RequestForAction?: string;
    public CompareReason?: string;
    public IsProvisionalAcquittal?: number;
    public Bail?: string;
    public Guaruntee?: string;
    public CompareFine?: number;
    public PaymentFineDate?: string;
    public PaymentFineAppointDate?: string;
    public PaymentVatDate?: string;
    public TreasuryMoney?: number;
    public BribeMoney?: number;
    public RewardMoney?: number;
    public IsActive?: number;
    public ApproveStationCode?: string;
    public ApproveStation?: string;
    public ApproveReportDate?: string;
    public CommandNo?: string;
    public CommandDate?: string;
    public CompareAuthority?: number;
    public ApproveReportType?: number;
    public MistreatNo?: number;
    public FineType?: number;
    public AdjustReason?: string;
    public LawbreakerName?: string;
    public ReceiptChanel?: string;
    public ReceiptBookNo?: string;
    public ReceiptNo?: string;
    public IsLawsuitComplete?: string;
    public UndecidedCaseNo?: string;
    public PaymentPeriodNo?: string;
    public RevenueStatus?: number;
}

export class AdjustReceipt {
    public ReceiptType?: string;
    public ReceiptBookNo?: string;
    public ReceiptNo?: string;
    public ReceiptDate?: string;
    public StationCode?: string;
    public Station?: string;
    public CompareDetailID?: number;
    public PaymentDate?: string;
    public TotalFine?: number;
    public RevenueStatus?: number;
    public RevenueDate?: string;
    public IsActive?: number;
    public ReceiptChanel?: number;
    public ReferenceNo?: string;
    public CompareAuthority?: number;
    public FineType?: number;
    public LawbreakerName?: string;
    public IsLawsuitComplete?: number;
    public UndecidedCaseNo?: string;
    public PaymentFineDate?: string;
    public PaymentPeriodNo?: string;
    public ops_compare_detail?:Array<any>;
    public ops_compare_staff?:Array<any>;
}

export class AdjustFine {
    public CompareFineID?: number;
    public CompareDetailID?: number;
    public ProductID?: number;
    public ProductFine?: number;
    public VatValue?: number;
    public FineRate?: number;
    public IsActive?: number;
    public FineType?: number;
    public TotalFine?: number;
    public ops_compare_detail?: Array<any>;
    public ops_arrest_indicment_detail?: Array<any>;
    public mas_product?: Array<any>;
    public ops_compare_staff?: Array<any>;
    public ops_arrest_lawbreaker?: Array<any>;
}

export class AdjustStaff {
    public ProgramCode?: string;
    public ProcessCode?: string;
    public CompareID?: number;
    public StaffCode?: string;
    public TitleName?: string;
    public FirstName?: string;
    public LastName?: string;
    public PositionCode?: string;
    public PositionName?: string;
    public PosLevel?: string;
    public PosLevelName?: string;
    public DepartmentCode?: string;
    public OfficeShortName?: string;
    public DepartmentLevel?: string;
    public OfficeCode?: string;
    public OfficeName?: string;
    public ContributorID?: number;
    public IsActive?: number;
}