export class InvestigateModel {
    InvestigateCode: string;
    InvestigateNo: string;
    DateStart: any;
    DateEnd: any;
    Subject: string;
    IsActive: number;
    InvestigateDetail: InvestigateDetail[];
}

export class InvestigateDetail {
    InvestigateDetailID: number;
    InvestigateCode: string;
    InvestigateSeq: string;
    StationCode: string;
    StationName: string;
    InvestigateDateStart: any;
    InvestigateDateEnd: any;
    InvestigateDetail: string;
    ConfidenceOfNews: string;
    ValueOfNews: string;
    IsActive: number;
    InvestigateDetailStaff: InvestigateDetailStaff[];
    InvestigateDetailSuspect: InvestigateDetailSuspect[];
    InvestigateDetailLocal: InvestigateDetailLocal[];
    InvestigateDetailProduct: InvestigateDetailProduct[];
}

export class InvestigateDetailStaff {
    StaffID: number;
    ProgramCode: number;
    ProcessCode: string;
    InvestigateDetailID: number;
    StaffCode: string;
    TitleName: string;
    FirstName: string;
    LastName: string;
    PositionCode: string;
    PositionName: string;
    PosLevel: string;
    PosLevelName: string;
    DepartmentCode: string;
    DepartmentName: string;
    DepartmentLevel: string;
    OfficeCode: string;
    OfficeName: string;
    OfficeShortName: string;
    ContributorID: string;
    IsActive: number;

    RowId: number;
    FullName: string;
    IsModify: string;

    Commander: string;
    Investigator: string;
}

export class InvestigateDetailSuspect {
    SuspectID: number;
    SuspectReferenceID: number;
    EntityType: number;
    CompanyTitleCode: string;
    CompanyTitle: string;
    CompanyName: string;
    CompanyOtherName: string;
    CompanyRegistrationNo: string;
    TaxID: string;
    ExciseRegNo: string;
    SuspectType: number;
    SuspectTitleName: string;
    SuspectFirstName: string;
    SuspectMiddleName: string;
    SuspectLastName: string;
    SuspectOtherName: string;
    IDCard: string;
    PassportNo: string;
    IsActive: number;
    InvestigateDetailID: number;

    SuspectTypeName: string;
    EntityTypeName: string;
    LawbreakerRefID: string;
    ReferenceID: string;
    FullName: string;
    IsModify: string;
    RowId: number;
}

export class InvestigateDetailLocal {
    LocalID: number;
    InvestigateDetailID: string;
    GPS: string;
    Location: string;
    Address: string;
    Village: string;
    Building: string;
    Room: string;
    Alley: string;
    Road: string;
    Floor: string;
    SubDistrictCode: string;
    SubDistrict: string;
    DistrictCode: string;
    District: string;
    ProvinceCode: string;
    Province: string;
    ZipCode: string;
    IsActive: number;

    RowId: number;
    IsModify: string;
    Region: string;
}

export class InvestigateDetailProduct {
    ProductID: number;
    InvestigateDetailID: number;
    GroupName: string;
    GroupCode: string;
    IsDomestic: number;
    ProductCode: string;
    BrandCode: string;
    BrandNameTH: string;
    BrandNameEN: string;
    SubBrandCode: string;
    SubBrandNameTH: string;
    SubBrandNameEN: string;
    ModelCode: string;
    ModelName: string;
    FixNo1: number;
    DegreeCode: string;
    Degree: number;
    SizeCode: string;
    Size: string;
    SizeUnitCode: string;
    SizeUnitName: string;
    FixNo2: number;
    SequenceNo: string;
    ProductDesc: string;
    CarNo: string;
    Qty: number;
    QtyUnit: string;
    NetVolume: number;
    NetVolumeUnit: string;
    IsActive: number;

    RowId: number;
    IsModify: string;
}