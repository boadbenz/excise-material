import { FormControl, Validators } from '@angular/forms';
export class InvestigateDetailStaff {
    public StaffID = 0;
    public ProgramCode = '';
    public ProcessCode = '';
    public InvestigateCode = '';
    public StaffCode = '';
    public TitleName = '';
    public FirstName = '';
    public LastName = '';
    public FullName = '';
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
    public ContributorID = '';
    public IsActive = '';
}

export const InvestigateStaffFormControl = {
    StaffID: new FormControl(null),
    ProgramCode: new FormControl('XCS60-02-02'),
    ProcessCode: new FormControl('0001'),
    InvestigateCode: new FormControl(null, Validators.required),
    StaffCode: new FormControl(null, Validators.required),
    TitleName: new FormControl(null),
    FirstName: new FormControl(null, Validators.required),
    LastName: new FormControl(null),
    PositionCode: new FormControl(null, Validators.required),
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

    ContributorID: new FormControl(null, Validators.required),
    FullName: new FormControl(null),
    IsNewItem: new FormControl(false)
}
