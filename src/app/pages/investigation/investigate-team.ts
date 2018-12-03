import { FormControl, Validators } from '@angular/forms';
export class InvestigateTeam {
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

export const InvestigateTeamFormControl = {
    StaffID: new FormControl(null),
    ProgramCode: new FormControl(null),
    ProcessCode: new FormControl(null),
    InvestigateCode: new FormControl(null),
    StaffCode: new FormControl(null),
    TitleName: new FormControl(null),
    FirstName: new FormControl(null),
    LastName: new FormControl(null),
    FullName: new FormControl(null),
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
    ContributorID: new FormControl(null),
    IsActive: new FormControl(1, Validators.required),
}