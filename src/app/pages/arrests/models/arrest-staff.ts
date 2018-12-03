import { FormControl, Validators } from '@angular/forms';

export class ArrestStaff {
    public StaffID = '';
    public ProgramCode = '';
    public ProcessCode = '';
    public ArrestCode = '';
    public StaffCode = '';
    public TitleName = '';
    public FirstName = '';
    public LastName = '';
    public PositionCode = '';
    public PositionName = '';
    public PosLevel = '';
    public PosLevelName = '';
    public DepartmentCode = '';
    public DepartmentName = '';
    public DepartmentLevel = '';
    public OfficeCode = '';
    public OfficeName = '';
    public OfficeShortName = '';
    public ContributorCode = '';
    public IsActive: number;

    public ContributorID = '';
    public FullName = '';
    public IsNewItem: boolean;
    public IsModify: string;
    public RowId: number;
}

class Types {
    public value: string;
    public text: string;
}

export const ArrestStaffFormControl = {
    StaffId: new FormControl(null),
    ProgramCode: new FormControl('XCS60-02-02'),
    ProcessCode: new FormControl('0001'),
    ArrestCode: new FormControl(null),
    StaffCode: new FormControl(null),
    TitleName: new FormControl(null),
    FirstName: new FormControl(null, Validators.required),
    LastName: new FormControl(null),    
    PositionCode: new FormControl(null),
    PositionName: new FormControl(null),
    PosLevel: new FormControl(null),
    PosLevelName: new FormControl(null),
    DepartmentCode: new FormControl(null),
    DepartmentName: new FormControl(null),
    DepartmentLevel: new FormControl(null),
    OfficeCode: new FormControl(null),
    OfficeName: new FormControl(null),
    OfficeShortName: new FormControl(null),
    ContributorCode: new FormControl(null),
    IsActive: new FormControl(null),

    ContributorID: new FormControl(null),
    FullName: new FormControl(null),
    IsNewItem: new FormControl(false)
}
