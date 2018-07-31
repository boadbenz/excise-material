import { FormControl, Validators } from "@angular/forms";

export class ArrestLocale {
    public LocaleID: string;
    public IsArrest: string;
    public ArrestCode: string;
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
    public Policestation: string;
    public IsActive: number;
    public Region: string;
}

export const ArrestLocaleFormControl = {
    IsArrest: new FormControl(null),
    ArrestCode: new FormControl(null, Validators.required),
    GPS: new FormControl(null),
    Location: new FormControl("N/A"),
    Address: new FormControl(null, Validators.required),
    Village: new FormControl(null, Validators.required),
    Building: new FormControl(null, Validators.required),
    Floor: new FormControl(null, Validators.required),
    Room: new FormControl(null, Validators.required),
    Alley: new FormControl(null, Validators.required),
    Road: new FormControl(null, Validators.required),
    SubDistrictCode: new FormControl(null, Validators.required),
    SubDistrict: new FormControl(null, Validators.required),
    DistrictCode: new FormControl(null, Validators.required),
    District: new FormControl(null, Validators.required),
    ProvinceCode: new FormControl(null, Validators.required),
    Province: new FormControl(null, Validators.required),
    ZipCode: new FormControl(null, Validators.required),
    Policestation: new FormControl(null, Validators.required),
    IsActive: new FormControl(1, Validators.required),
    Region: new FormControl(null, Validators.required)
}