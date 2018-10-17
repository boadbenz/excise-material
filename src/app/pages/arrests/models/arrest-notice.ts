import { FormControl, FormGroup, FormBuilder } from "@angular/forms";

export class ArrestNotice {
    NoticeCode: string;
    NoticeStationCode: string;
    NoticeStation: string;
    NoticeDate: string;
    NoticeTime: string;
    NoticeDue: number;
    NoticeDueDate: string;
    CommunicationChannelID: string;
    ArrestCode: string;
    IsArrest: number;
    IsActive: number;
    ArrestNoticeSuspect: ArrestNoticeSuspect[];
    ArrestNoticeStaff: ArrestNoticeStaff[];

    RowId: number;
    IsChecked: boolean;
    IsModify: string;
}

export class ArrestNoticeSuspect {
    SuspectID: number;
    SuspectReferenceID: number;
    NoticeCode: string;
    SuspectTitleName: string;
    SuspectFirstName: string;
    SuspectLastName: string;
    CompanyTitleName: string;
    CompanyName: string;
    CompanyOtherName: string;
    IsActive: number;
    EntityType: string;
    SuspectType: string;
    MistreatNo: string;
    CompanyRegistrationNo: string;
    SuspectMiddleName: string;
    IDCard: string;
    PassportNo: string;

    // Custom
    FullName: string;
}

export class ArrestNoticeStaff {
    StaffID: number;
    ProgramCode: string;
    ProcessCode: string;
    NoticeCode: string;
    StaffCode: string;
    TitleName: string;
    FirstName: string;
    LastName: string;
    PositionCode: string;
    PositionName: string;
    PosLevel: string;
    PosLevelName: string;
    DepartmentCode: string;
    DepartmentName: string;
    DepartmentLevel: string;
    OfficeCode: string;
    OfficeName: string;
    OfficeShortName: string;
    ContributorID: string;
    IsActive: number;
    
    // Custom
    FullName: string;
}

// let fb: FormBuilder;

// export const ArrestNoticeFormControl = {
//     NoticeCode: new FormControl(null),
//     NoticeStationCode: new FormControl(null),
//     NoticeStation: new FormControl(null),
//     NoticeDate: new FormControl(null),
//     NoticeTime: new FormControl(null),
//     NoticeDue: new FormControl(null),
//     NoticeDueDate: new FormControl(null),
//     CommunicationChannelID: new FormControl(null),
//     ArrestCode: new FormControl(null),
//     IsArrest: new FormControl(null),
//     IsActive: new FormControl(null),
//     ArrestNoticeSuspect: fb.array([]),
//     ArrestNoticeStaff: fb.array([])
// }