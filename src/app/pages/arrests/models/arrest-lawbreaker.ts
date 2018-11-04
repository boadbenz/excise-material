import { ArrestLawbreakerAddress } from './arrest-lawbreaker-address';
import { FormControl, Validators } from '@angular/forms';
import { Acceptability } from './acceptability';

export class ArrestLawbreaker {
    public LawbreakerID: number;
    public EntityType: number;
    public CompanyTitleCode: string;
    public CompanyTitle: string;
    public CompanyName: string;
    public CompanyOtherName: string;
    public CompanyRegistrationNo: string;
    public CompanyLicenseNo: string;
    public FoundedDate: any;
    public LicenseDateForm: any;
    public LicenseDateTo: any;
    public TaxID: string;
    public ExciseRegNo: string;
    public LawbreakerType: number;
    public LawbreakerTitleCode: string;
    public LawbreakerTitleName: string;
    public LawbreakerFirstName: string;
    public LawbreakerMiddleName: string;
    public LawbreakerLastName: string;
    public LawbreakerOtherName: string;
    public LawbreakerDesc: string;
    public IDCard: string;
    public PassportNo: string;
    public VISAType: number;
    public PassportCountryCode: string;
    public PassportCountryName: string;
    public PassportDateIn: any;
    public PassportDateOut: any;
    public BirthDate: any;
    public GenderType: string;
    public BloodType: string;
    public NationalityCode: string;
    public NationalityNameTH: string;
    public RaceCode: string;
    public RaceName: string;
    public ReligionCode: string;
    public ReligionName: string;
    public MaritalStatus: string;
    public Career: string;
    public FatherName: string;
    public MotherName: string;
    public Remarks: string;
    public LinkPhoto: string;
    public PhotoDesc: string;
    public IsActive: number;
    public LawbreakerAddress: ArrestLawbreakerAddress[]

    ArrestCode: string;
    LawbreakerRefID: number;
    LawbreakerFullName: string;
    CompanyFullName: string;
    EntityTypeName: string;
    LawbreakerTypeName: string;
    ReferenceID: string;
    ProductID: string;
    ProductName: string;
    IsChecked:  Acceptability;
    RowId: number;
    IsNewItem: boolean;
    IsModify: string;
    ResultCount: any;
}

export class ArrestLawbreakerAllegation {
    public LawbreakerID: number;
    public EntityType: number;
    public EntityTypeName: string;
    public LawbreakerType: number;
    public LawbreakerTypeName: string;
    public ReferenceNo: string;
    public IDCard: string;
    public PassportNo: string;
    public CompanyName: string;
    public CompanyRegistrationNo: string;
    public LawbreakerTitleName: string;
    public LawbreakerFirstName: string;
    public LawbreakerLastName: string;
    public LawbreakerFullName: string;
    public ResultCount: any;

    public RowId: number;
    public IsChecked: Acceptability;
}

export const ArrestLawbreakerFormControl = {
    LawbreakerID: new FormControl(null),
    ArrestCode: new FormControl(null),
    LawbreakerRefID: new FormControl(null),
    EntityType: new FormControl(null),
    CompanyTitleCode: new FormControl(null),
    CompanyTitle: new FormControl(null),
    CompanyName: new FormControl(null),
    CompanyOtherName: new FormControl(null),
    CompanyRegistrationNo: new FormControl(null),
    CompanyLicenseNo: new FormControl(null),
    CompanyFullName: new FormControl(null),
    FoundedDate: new FormControl(null),
    LicenseDateForm: new FormControl(null),
    LicenseDateTo: new FormControl(null),
    TaxID: new FormControl(null),
    ExciseRegNo: new FormControl(null),
    LawbreakerType: new FormControl(null),
    LawbreakerTitleCode: new FormControl(null),
    LawbreakerTitleName: new FormControl(null),
    LawbreakerFirstName: new FormControl(null),
    LawbreakerMiddleName: new FormControl(null),
    LawbreakerLastName: new FormControl(null),
    LawbreakerOtherName: new FormControl(null),
    LawbreakerDesc: new FormControl(null),
    LawbreakerFullName: new FormControl(null),
    IDCard: new FormControl(null),
    PassportNo: new FormControl(null),
    VISAType: new FormControl(null),
    PassportCountryCode: new FormControl(null),
    PassportCountryName: new FormControl(null),
    PassportDateIn: new FormControl(null),
    PassportDateOut: new FormControl(null),
    BirthDate: new FormControl(null),
    GenderType: new FormControl(null),
    BloodType: new FormControl(null),
    NationalityCode: new FormControl(null),
    NationalityNameTH: new FormControl(null),
    RaceCode: new FormControl(null),
    RaceName: new FormControl(null),
    ReligionCode: new FormControl(null),
    ReligionName: new FormControl(null),
    MaritalStatus: new FormControl(null),
    Career: new FormControl(null),
    GPS: new FormControl(null),
    Location: new FormControl(null),
    Address: new FormControl(null),
    Village: new FormControl(null),
    Building: new FormControl(null),
    Floor: new FormControl(null),
    Room: new FormControl(null),
    Alley: new FormControl(null),
    Road: new FormControl(null),
    SubDistrictCode: new FormControl(null),
    SubDistrict: new FormControl(null),
    DistrictCode: new FormControl(null),
    ProvinceCode: new FormControl(null),
    Province: new FormControl(null),
    ZipCode: new FormControl(null),
    TelephoneNo: new FormControl(null),
    Email: new FormControl(null),
    FatherName: new FormControl(null),
    MotherName: new FormControl(null),
    Remarks: new FormControl(null),
    LinkPhoto: new FormControl(null),
    PhotoDesc: new FormControl(null),
    IsActive: new FormControl(null),


    EntityTypeName: new FormControl(null),
    LawbreakerTypeName: new FormControl(null),
    ProductID: new FormControl(null),
    ProductName: new FormControl(null),
    IsChecked: new FormControl(null),
    IsNewItem: new FormControl(null)
}



