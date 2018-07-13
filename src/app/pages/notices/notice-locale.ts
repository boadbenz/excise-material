import { FormControl } from '@angular/forms';

export class NoticeLocale {
    public LocaleID: number;
    public NoticeCode: string;
    public CoordinateX: string;
    public CoordinateY: string;
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
    public Policestation: string;
    public IsActive: number;
}

export const NoticeLocaleFormControl = {
    LocaleID: new FormControl(null),
    NoticeCode: new FormControl(null),
    CoordinateX: new FormControl('CoordinateX'),
    CoordinateY: new FormControl('CoordinateY'),
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
    District: new FormControl(null),
    ProvinceCode: new FormControl(null),
    Province: new FormControl(null),
    ZipCode: new FormControl(null),
    Policestation: new FormControl('Policestation'),
    IsActive: new FormControl(1),
    Region: new FormControl(null)
}
