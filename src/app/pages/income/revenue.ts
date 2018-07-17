export class Revenue {
    public RevenueID : string;
    public RevenueCode  : string;
    public RevenueNo : string;
    public RevenueDate : Date;
    public StationCode : string;
    public StationName : string;
    public InformTo  : string;
    public ISACTIVE   : number;
    public RevenueDetail: RevenueDetail[];
    public RevenueStaff: RevenueStaff[];
}

export class RevenueStaff {
    public StaffID : string;
    public ProgramCode  : string;
    public ProcessCode : string;
    public RevenueID : string;
    public StaffCode : string;
    public TitleName : string;
    public FirstName  : string;
    public LastName : string;
    public PositionCode  : string;
    public PositionName : string;
    public PosLevel : string;
    public PosLevelName : string;
    public DepartmentCode : string;
    public DepartmentName  : string;
    public DepartmentLevel : string;
    public OfficeCode  : string;
    public OfficeName : string;
    public OfficeShortName : string;
    public ContributorCode : string;
    public ISACTIVE   : number;
}

export class RevenueDetail {
    public RevenueDetailID  : string;
    public ReceiptBookNo  : string;
    public ReceiptNo  : string;
    public RevenueStatus  : string;
    public RevenueID   : string;
    public CompareReceiptID    : number;
}