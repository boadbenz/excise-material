import { ArrestLawbreaker } from '../model/arrest-lawbreaker';
import { Time } from '@angular/common';

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
    public CompareDetailID?: string;
    public CompareID?: string;
    public IndictmentDetailID?: string;
    public CompareAction?: string;
    public LawbrakerTestimony?: string;
    public Fact?: string;
    public IsRequest?: string;
    public RequestForAction?: string;
    public CompareReason?: string;
    public IsProvisionalAcquittal?: string;
    public Bail?: string;
    public Guaruntee?: string;
    public CompareFine?: string;
    public PaymentFineDate?: string;
    public PaymentFineAppointDate?: string;
    public PaymentVatDate?: string;
    public TreasuryMoney?: string;
    public BribeMoney?: string;
    public RewardMoney?: string;
    public ApproveStationCode?: string;
    public ApproveStation?: string;
    public ApproveReportDate?: string;
    public CommandNo?: string;
    public CommandDate?: string;
    public CompareAuthority?: string;
    public ApproveReportType?: string;
    public MistreatNo?: string;
    public FineType?: string;
    public AdjustReason?: string;
    public Lawbreaker?: string;
    public LawbreakerID?: string;
    public FineRate?: string;
    public VatValue?: string;
    public ProductDesc?: string;
    public RewardRate?: string;
    public CompareDetailFine?: CompareDetailFine[];
    public CompareDetailReceipt?: CompareDetailReceipt[];
}

export class CompareDetailFine {
    public CompareFineID?: number;
    public CompareDetailID?: number;
    public ProductID?: number;
    public ProductFine?: number;
    public VatValue?: number;
    public FineRate?: number;
    public IsActive?: number;
}

export class CompareDetailReceipt  {
    public CompareReceiptID? : number;
    public ReceiptType? : string;
    public ReceiptBookNo? : string;
    public ReceiptNo? : string;
    public ReceiptDate? : Date;
    public ReceiptChanel? : number;
    public ReferenceNo? : string;
    public StationCode?  : string;
    public Station?  : string;
    public CompareAuthority?  : number;
    public CompareDetailID?  : number;
    public PaymentDate?   : Date;
    public FineType?   : number;
    public TotalFine?   : number;
    public RevernueStatus?   : number;
    public RevernueDate?    : Date;
    public Lawbreaker?: string;
    public ReceipStaff? : string;
    public ReceipPosition?: string;
    public ReceipDepartment?: string;
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


export class ICompareDetail
{
    public CompareDetailID?: number;
    public CompareID?: number;
    public IndictmentDetailID?: number;
    public Lawbreaker?: string;
    public CompareAction?: string;
    public LawbrakerTestimony?: string;
    public Fact?: string;
    public IsRequest?: number;
    public RequestForAction?: string;
    public IsProvisionalAcquittal?: number;
    public Bail?: string;
    public Guaruntee?: string;
    public CompareFine?: number;
    public PaymentFineDate?: Date;
    public PaymentFineAppointDate?: Date;
    public PaymentVatDate?: Date;
    public ApproveReportDate?: Date; 
    public ApproveReportType?: number;
    public CommandDate?: Date;
    
    public CompareReason?: string;
}

export class CompareStation
{
    public OfficeCode?: string;
    public OfficeName?: string;
}