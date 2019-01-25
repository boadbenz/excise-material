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

    public GPS: string;
    public Location: string;
    public Address: string;
    public Village: string;
    public Building: string;
    public Floor: string;
    public Room: string;
    public Alley: string;
    public Road: string;
    public SubDistrictCode: string;
    public SubDistrict: string;
    public DistrictCode: string;
    public District: string;
    public ProvinceCode: string;
    public Province: string;
    public ZipCode: string;
    public TelephoneNo: string;
    public Email: string;
    // public LawbreakerAddress: ArrestLawbreakerAddress[]

    public Region: string;

    ArrestCode: string;
    LawbreakerRefID: number;
    LawbreakerFullName: string;
    CompanyFullName: string;
    EntityTypeName: string;
    LawbreakerTypeName: string;
    ReferenceID: string;
    ProductID: string;
    ProductName: string;
    IsChecked: Acceptability;
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
    LawbreakerID: new FormControl(''),
    ArrestCode: new FormControl(''),
    LawbreakerRefID: new FormControl(''),
    EntityType: new FormControl(''),
    CompanyTitleCode: new FormControl(''),
    CompanyTitle: new FormControl(''),
    CompanyName: new FormControl(''),
    CompanyOtherName: new FormControl(''),
    CompanyRegistrationNo: new FormControl(''),
    CompanyLicenseNo: new FormControl(''),
    CompanyFullName: new FormControl(''),
    FoundedDate: new FormControl(''),
    LicenseDateForm: new FormControl(''),
    LicenseDateTo: new FormControl(''),
    TaxID: new FormControl(''),
    ExciseRegNo: new FormControl(''),
    LawbreakerType: new FormControl(''),
    LawbreakerTitleCode: new FormControl(''),
    LawbreakerTitleName: new FormControl(''),
    LawbreakerFirstName: new FormControl(''),
    LawbreakerMiddleName: new FormControl(''),
    LawbreakerLastName: new FormControl(''),
    LawbreakerOtherName: new FormControl(''),
    LawbreakerDesc: new FormControl(''),
    LawbreakerFullName: new FormControl(''),
    IDCard: new FormControl(''),
    PassportNo: new FormControl(''),
    VISAType: new FormControl(''),
    PassportCountryCode: new FormControl(''),
    PassportCountryName: new FormControl(''),
    PassportDateIn: new FormControl(''),
    PassportDateOut: new FormControl(''),
    BirthDate: new FormControl(''),
    GenderType: new FormControl(''),
    BloodType: new FormControl(''),
    NationalityCode: new FormControl(''),
    NationalityNameTH: new FormControl(''),
    RaceCode: new FormControl(''),
    RaceName: new FormControl(''),
    ReligionCode: new FormControl(''),
    ReligionName: new FormControl(''),
    MaritalStatus: new FormControl(''),
    Career: new FormControl(''),
    GPS: new FormControl(''),
    Location: new FormControl(''),
    Address: new FormControl(''),
    Village: new FormControl(''),
    Building: new FormControl(''),
    Floor: new FormControl(''),
    Room: new FormControl(''),
    Alley: new FormControl(''),
    Road: new FormControl(''),
    SubDistrictCode: new FormControl(''),
    SubDistrict: new FormControl(''),
    DistrictCode: new FormControl(''),
    District: new FormControl(''),
    ProvinceCode: new FormControl(''),
    Province: new FormControl(''),
    ZipCode: new FormControl(''),
    TelephoneNo: new FormControl(''),
    Email: new FormControl(''),
    FatherName: new FormControl(''),
    MotherName: new FormControl(''),
    Remarks: new FormControl(''),
    LinkPhoto: new FormControl(),
    PhotoDesc: new FormControl(),
    IsActive: new FormControl(null),
    ResultCount: new FormControl(null),

    EntityTypeName: new FormControl(null),
    LawbreakerTypeName: new FormControl(null),
    Region: new FormControl(null),
    ProductID: new FormControl(null),
    ProductName: new FormControl(null),
    IsChecked: new FormControl(null),
    IsNewItem: new FormControl(null)
}



