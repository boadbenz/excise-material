import { FormControl, Validators } from '@angular/forms';
export class InvestigateDetailSuspect {
    public SuspectID: '';
    public SuspectReferenceID: '';
    public InvestigateDetailID: '';
    public InvestigateCode: '';
    public SuspecTitleName: '';
    public SuspectFirstName: '';
    public SuspectLastName: '';
    public FullName = '';
    public CompanyTitleName: '';
    public CompanyName: '';
    public CompanyOtherName: '';
    public IsActive: '';
}

export const InvestigateSuspectFormControl = {
    SuspectID: new FormControl(null),
    SuspectReferenceID: new FormControl(null),
    InvestigateDetailID: new FormControl(null),
    InvestigateCode: new FormControl(null),
    SuspecTitleName: new FormControl(null),
    SuspectFirstName: new FormControl(null),
    SuspectLastName: new FormControl(null),
    CompanyTitleName: new FormControl(null),
    CompanyName: new FormControl(null),
    CompanyOtherName: new FormControl(null),
    IsActive: new FormControl(null),
    FullName: new FormControl(null),
}

