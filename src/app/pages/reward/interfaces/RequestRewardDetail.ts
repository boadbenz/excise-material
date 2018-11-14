export interface IRequestRewardDetail {
    RequestRewardDetailID: number;
    RequestRewardID: number;
    PaymentFineID: number;
    LawbreakerTitleName: string;
    LawbreakerFirstName: string;
    LawbreakerMiddleName: string;
    LawbreakerLastName: string;
    LawbreakerOtherName: string;
    FineType: number;
    PaymentDueDate: Date;
    PaymentActualDate: Date;
    ReceiptBookNo: string;
    ReceiptNo: string;
    JudgementNo: string;
    PaymentPeriodNo: number;
    PaymentFine: number;
    IsActive: number;
}
