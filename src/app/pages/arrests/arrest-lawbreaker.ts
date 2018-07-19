import { ArrestLawbreakerAddress } from './arrest-lawbreaker-address';
import { FormControl } from '@angular/forms';

export class ArrestLawbreaker {
    public LawbreakerID: number;
    public ArrestCode: string;
    public LawbreakerRefID: number;
    public EntityType: number;
    public CompanyTitleCode: string;
    public CompanyTitle: string;
    public CompanyName: string;
    public CompanyOtherName: string;
    public CompanyRegistrationNo: string;
    public CompanyLicenseNo: string;
    public CompanyFullName: string;
    public FoundedDate: string;
    public LicenseDateForm: string;
    public LicenseDateTo: string;
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
    public LawbreakerFullName: string;
    public IDCard: string;
    public PassportNo: string;
    public VISAType: number;
    public PassportCountryCode: string;
    public PassportCountryName: string;
    public PassportDateIn: string;
    public PassportDateOut: string;
    public BirthDate: string;
    public GenderType: string;
    public BloodType: string;
    public NationalityCode: string;
    public NationalityNameTH: string;
    public RaceCode: string;
    public RaceName: string;
    public ReligionCode: string;
    public ReligionName: string;
    public MaritalStatus: number;
    public Career: string;
    public FatherName: string;
    public MotherName: string;
    public Remarks: string;
    public LinkPhoto: string;
    public PhotoDesc: string;
    public IsActive: number;

    EntityTypeName: string;
    LawbreakerTypeName: string;
    ProductID: string;
    ProductName: string;
    IsChecked: boolean;
    RowId: number;
    IsNewItem: boolean;
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
    IsChecked: new FormControl(false),
    IsNewItem: new FormControl(false)
}

class Types {
    public value: string;
    public text: string;
}

export const VISATypes: Types[] = [
    {
        value: '1',
        text: 'ประเภทคนเดินทางผ่านราชอาณาจักร (Transit Visa)'
    }, {
        value: '2',
        text: 'ประเภทนักท่องเที่ยว (Tourist Visa)'
    }
];

export const EntityTypes: Types[] = [
    {
        value: '1',
        text: 'บุคคลธรรมดา'
    }, {
        value: '2',
        text: 'นิติบุคคล'
    }
]

export const GenderTypes: Types[] = [
    {
        value: 'M',
        text: 'ชาย'
    }, {
        value: 'F',
        text: 'หญิง'
    }
]

export const LawbreakerTypes: Types[] = [
    {
        value: '0',
        text: 'ชาวต่างชาติ'
    }, {
        value: '1',
        text: 'ชาวไทย'
    }
]

export const MaritalStatus: Types[] = [
    {
        value: '1',
        text: 'โสด'
    }, {
        value: '2',
        text: 'สมรส'
    }, {
        value: '3',
        text: 'หย่าร้าง'
    }, {
        value: '4',
        text: 'หม้าย'
    },
]

