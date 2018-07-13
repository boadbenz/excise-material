import { FormControl } from '@angular/forms';

export class NoticeInformer {
    public InformerID: number;
    public InformerType: number;
    public NoticeCode: string;
    public TitleCode: string;
    public TitleName: string;
    public FirstName: string;
    public LastName: string;
    public FullName: string;
    public IDCard: string;
    public Age: number;
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
    public IsActive: number;
}

export const NoticeInformerFormControl = {
    InformerID: new FormControl(22),
    InformerType: new FormControl(0),
    NoticeCode: new FormControl(null),
    TitleCode: new FormControl('k2'),
    TitleName: new FormControl('นาง'),
    FirstName: new FormControl('สุภาภรณ'),
    LastName: new FormControl('ตะวันแดง'),
    IDCard: new FormControl('1524478458520'),
    Age: new FormControl(null),
    GenderType: new FormControl('F'),
    Location: new FormControl('สระบุรี'),
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
    TelephoneNo: new FormControl('0899595119'),
    InformerInfo: new FormControl('บุคคลจํานวน3คนทําการขายเหลาเถื่อนที่บานเชาหลัง'),
    FullName: new FormControl(null)
}
