export class ReductionList {
    ArrestCode: string;
    LawsuitNo: string;
    ProveReportNo: string;
    CompareCode: string;
    AdjustCompareStaff: AdjustCompareStaffModel;
    CompareDate: string;
    DepartmentName: string;
    CompareID: number;
    //     arrestCode: "TN90806026000003",
    //     lawsuitNo: "002/2561",
    //     proofNo: "002/2561",
    //     caseNumber: "002/2561",
    //     titleName: "นาย",
    //     firstName: "ธวัชชัย",
    //     lastName: "บิงขุนทด",
    //     lawsuitDate: "22-ต.ค.-2560",
    //     departmentlawName: "สสท.ระนอง สาขาเมืองกระบุรี"
}

export class AdjustCompareStaffModel {
    TitleName: string;
    FirstName: string;
    LastName: string;
}

export class advSearchModel {
    ArrestCode: string;
    LawsuitCode: string;
    ProveReportNo: string;
    CompareCode: string;
    CompareDateFrom: string;
    CompareDateTo: string;
    ProgramCode: string;
    ProcessCode: string;
    Staff: string;
    Department: string;
}