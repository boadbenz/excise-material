import { FormControl, Validators } from '@angular/forms';

export class NoticeInformer {
    public InformerID: string;
    public InformerType: number;
    public NoticeCode: string;
    public TitleCode: string;
    public TitleName: string;
    public FirstName: string;
    public LastName: string;
    public FullName: string;
    public IDCard: string;
    public Age: string;
    public GenderType: string;
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
    public InformerInfo: string;
    public IsActive: string;

    public Region: string;
}

export const NoticeInformerFormControl = {
    InformerID: new FormControl('22'),
    InformerType: new FormControl(0),
    NoticeCode: new FormControl(null, Validators.required),
    TitleCode: new FormControl('N/A'),
    TitleName: new FormControl('N/A'),
    FirstName: new FormControl('N/A', Validators.required),
    LastName: new FormControl('N/A'),
    IDCard: new FormControl('N/A'),
    Age: new FormControl(null),
    GenderType: new FormControl('-'),
    Location: new FormControl('N/A'),
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
    ZipCode: new FormControl('N/A', Validators.required),
    TelephoneNo: new FormControl('N/A'),
    InformerInfo: new FormControl('N/A'),
    IsActive: new FormControl(1),
    FullName: new FormControl(null),
    Region: new FormControl(null)
}
