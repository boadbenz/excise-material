export class Compare {
    public CompareID: number;
    public CompareCode: string;
    public CompareDate: Date;
    public CompareStationCode: string;
    public CompareStation: string;
    public CompareSubdistrictCode: string;
    public CompareSubdistrict: string;
    public CompareDistrictCode: string;
    public CompareDistrict: string;
    public CompareProvinceCode: string;
    public CompareProvince: string;
    public AccuserSubdistrictCode: string;
    public AccuserSubdistrict: string;
    public AccuserDistrictCode: string;
    public AccuserDistrict: string;
    public AccuserProvinceCode: string;
    public AccuserProvince: string;
    public IsOutside: number;
    public LawsuitID: number;
    public IsActive: number;
    public Lawsuilt: string;
    public ArrestCode: string;
    public ProveReportNo: string;
    public CompareDetail: CompareDetail[];
    public CompareStaff: CompareStaff[];
}

export class CompareDetail {
    public CompareDetailID: number;
    public CompareID: number;
    public IndictmentDetailID: number;
    public CompareAction: string;
    public LawbrakerTestimony: string;
    public Fact: string;
    public IsRequest: number;
    public RequestForAction: string;
    public CompareReason: string;
    public IsProvisionalAcquittal: number;
    public Bail: string;
    public Guaruntee: string;
    public CompareFine: number;
    public PaymentFineDate: Date;
    public PaymentFineAppointDate: Date;
    public PaymentVatDate: Date;
    public TreasuryMoney: number;
    public BribeMoney: number;
    public RewardMoney: number;
    public ApproveStationCode: string;
    public ApproveStation: string;
    public ApproveReportDate: Date;
    public CommandNo: string;
    public CommandDate: Date;
    public CompareAuthority: number;
    public ApproveReportType: number;
    public MistreatNo: number;
    public FineType: number;
    public AdjustReason: string;
    public CompareDetailFine: CompareDetailFine[];
}

export class CompareDetailFine {
    public CompareFineID: number;
    public CompareDetailID: number;
    public ProductID: number;
    public ProductFine: number;
    public VatValue: number;
    public FineRate: number;
    public IsActive: number;
}

export class CompareStaff {
    public StaffID: number;
    public ProgramCode: string;
    public ProcessCode: string;
    public CompareCode: string;
    public StaffCode: string;
    public TitleName: string;
    public FirstName: string;
    public LastName: string;
    public PositionCode: string;
    public PositionName: string;
    public PosLevel: string;
    public PosLevelName: string;
    public DepartmentCode: string;
    public DepartmentName: string;
    public DepartmentLevel: string;
    public OfficeCode: string;
    public OfficeName: string;
    public OfficeShortName: string;
    public ContributorID: number;
    public IsActive: number;
}

