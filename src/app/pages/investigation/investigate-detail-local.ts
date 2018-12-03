import { FormControl, Validators } from '@angular/forms';
export class InvestigateDetailLocal {
    public LocalDetailID: number;
    public LocalID: number;
    public InvestigateCode: number;
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
    public Phone: string;
}

export const InvestigateLocalFormControl = {
    LocalDetailID: new FormControl(null),
    LocalID: new FormControl(null),
    InvestigateCode: new FormControl(null),
    IsActive: new FormControl(null),
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
    District: new FormControl(null),
    ProvinceCode: new FormControl(null),
    Province: new FormControl(null),
    ZipCode: new FormControl(null),
    Phone: new FormControl(null),
}

