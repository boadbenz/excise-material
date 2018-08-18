import { FormControl, Validators } from '@angular/forms';

export class NoticeLocale {
    public LocaleID: number;
    public NoticeCode: string;
    // public CoordinateX: string;
    // public CoordinateY: string;
    public Location: string;
    public Address: string;
    public Village: string;
    public Building: string;
    public Floor: string;
    public Room: string;
    public Alley: string;
    public Road: string;
    public SubdistrictCode: string;
    public SubDistrict: string;
    public DistrictCode: string;
    public District: string;
    public ProvinceCode: string;
    public Province: string;
    public ZipCode: string;
    public Policestation: string;
    public IsActive: number;
    public Region: string;
}

export const NoticeLocaleFormControl = {
    LocaleID: new FormControl(null),
    NoticeCode: new FormControl(null, Validators.required),
    // CoordinateX: new FormControl('CoordinateX'),
    // CoordinateY: new FormControl('CoordinateY'),
    Location: new FormControl(null),
    Address: new FormControl(null, Validators.required),
    Village: new FormControl(null, Validators.required),
    Building: new FormControl(null, Validators.required),
    Floor: new FormControl(null, Validators.required),
    Room: new FormControl(null, Validators.required),
    Alley: new FormControl(null, Validators.required),
    Road: new FormControl(null, Validators.required),
    SubdistrictCode: new FormControl(null, Validators.required),
    SubDistrict: new FormControl(null, Validators.required),
    DistrictCode: new FormControl(null, Validators.required),
    District: new FormControl(null, Validators.required),
    ProvinceCode: new FormControl(null, Validators.required),
    Province: new FormControl(null, Validators.required),
    ZipCode: new FormControl('N/A', Validators.required),
    Policestation: new FormControl('N/A', Validators.required),
    IsActive: new FormControl(1),
    Region: new FormControl(null)
}
