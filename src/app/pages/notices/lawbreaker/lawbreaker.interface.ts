import { FormGroup } from "@angular/forms";

export interface ILawbreaker {
    LawbreakerItem: Lawbreaker;
    LawbreakerFG: FormGroup;
    GetByCon(LawbreakerID: string);
    OnCreate(value: Lawbreaker);
    OnRevice(value: Lawbreaker);
}

export class Lawbreaker {
    LawbreakerID: string;
    EntityType: string;
    CompanyTitleCode: string;
    CompanyTitle: string;
    CompanyName: string;
    CompanyOtherName: string;
    CompanyRegistrationNo: string;
    CompanyLicenseNo: string;
    FoundedDate: Date;
    LicenseDateForm: Date;
    LicenseDateTo: Date;
    TaxID: string;
    ExciseRegNo: string;
    LawbreakerType: string;
    LawbreakerTitleCode: string;
    LawbreakerTitleName: string;
    LawbreakerFirstName: string;
    LawbreakerMiddleName: string;
    LawbreakerLastName: string;
    LawbreakerOtherName: string;
    LawbreakerDesc: string;
    IDCard: string;
    PassportNo: string;
    VISAType: string;
    PassportCountryCode: string;
    PassportCountryName: string;
    PassportDateIn: Date;
    PassportDateOut: Date;
    BirthDate: Date;
    GenderType: string;
    BloodType: string;
    NationalityCode: string;
    NationalityNameTH: string;
    RaceCode: string;
    RaceName: string;
    ReligionCode: string;
    ReligionName: string;
    MaritalStatus: string;
    Career: string;
    GPS: string;
    Location: string;
    Address: string;
    Village: string;
    Building: string;
    Floor: string;
    Room: string;
    Alley: string;
    Road: string;
    SubDistrictCode: string;
    SubDistrict: string;
    DistrictCode: string;
    District: string;
    ProvinceCode: string;
    Province: string;
    ZipCode: string;
    TelephoneNo: string;
    Email: string;
    FatherName: string;
    MotherName: string;
    Remarks: string;
    LinkPhoto: string;
    PhotoDesc: string;
    IsActive: string;

    //--- Custom ---//
    Region: string
}