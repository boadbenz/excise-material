import { FormControl } from '@angular/forms';

export class NoticeStaff {
    public StaffID: number;
    public ProgramCode: string;
    public ProcessCode: string;
    public NoticeCode: string;
    public StaffCode: string;
    public TitleName: string;
    public FirstName: string;
    public LastName: string;
    public PositionCode: string;
    public PositionName: string;
    public PosLevel: string;
    public PosLevelName: string;
    public DepartmentCode: string;
    public DepartmentName: string;
    public DepartmentLevel: string;
    public OfficeCode: string;
    public OfficeName: string;
    public OfficeShortName: string;
    public ContributorCode: string;
<<<<<<< HEAD
    public IsActive: number;
=======
    public StaffFullName: string;
>>>>>>> origin/FL_J
}

export const NoticeStaffFormControl = {
    StaffID: new FormControl(2),
    ProgramCode: new FormControl('0001'),
    ProcessCode: new FormControl('0002'),
    NoticeCode: new FormControl(null),
    StaffCode: new FormControl('133455'),
    TitleName: new FormControl('นาย'),
    FirstName: new FormControl('ธวัชชัย'),
    LastName: new FormControl('บึ่งขุนทด'),
    PositionCode: new FormControl('521423'),
    PositionName: new FormControl('นักวิชาการสรรพสามิต'),
    PosLevel: new FormControl('k2'),
    PosLevelName: new FormControl('ประเภทวิชาการระดับชํานาญการ'),
    DepartmentCode: new FormControl('010700'),
    DepartmentName: new FormControl('ฝ่ายตรวจสอบ'),
    DepartmentLevel: new FormControl('00001'),
    OfficeCode: new FormControl('รหัสสํานักงาน'),
    OfficeName: new FormControl('ชื่อสํานักงาน'),
    OfficeShortName: new FormControl('ชื่อย่อสํานักงาน'),
    ContributorCode: new FormControl('1. ผู้แจ้ง 2. ผู้รับแจ้ง'),
    StaffFullName: new FormControl('นาย ธวัชชัย บึงขุนทด')
}
