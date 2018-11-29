import { Component,ViewEncapsulation, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { LawsuitService } from "../lawsuit.service";
import { ActivatedRoute } from "@angular/router";
import { PreloaderService } from "../../../shared/preloader/preloader.component";
import { MatDialog, MatDialogRef } from '@angular/material';


@Component({
    selector: 'dialog-judgment',
    templateUrl: 'dialog-judgment.html',
    styleUrls: ['./dialog-judgment.scss'],
    encapsulation: ViewEncapsulation.None 
})
export class DialogJudgment {

    // private indictmentID: string;
    // private lawsuitID: number;
    public editMode = false;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private lawsuitService: LawsuitService,
        public dialog: MatDialog,
        private activatedRoute: ActivatedRoute,
        private dialogRef: MatDialogRef<DialogJudgment>,
        private preLoaderService: PreloaderService,
    ) { }
    public validStatus = false;
    public isPayAll = null;
    public arrestData = [];
    public MasCourtList = []
    public SearchMasCourtList = []
    public lawsuitArrestFormDialog: any = {}
    public LawsuitArrest: any = [];
    async ngOnInit() {
        if (this.data.mode == 'U') {
            this.editMode = true;
        }else{
            this.editMode = false;
        }
        this.preLoaderService.setShowPreloader(true);
        this.arrestData = await this.lawsuitService.LawsuitArrestIndicmentDetailgetByCon(this.data.lawsuitArrest.IndictmentDetailID)
        this.MasCourtList = await this.lawsuitService.MasCourtMaingetAll()
        this.LawsuitArrest = await this.lawsuitService.LawsuitArrestGetByCon(this.data.indicmentID)
        

        this.lawsuitArrestFormDialog = this.arrestData['LawsuitJudgement'].length > 0 ? await this.newForm() : await this.newFormNull();
        console.log(this.arrestData['LawsuitJudgement'])
        console.log(this.arrestData)
        console.log(this.lawsuitArrestFormDialog)
        this.paymentChange()
        this.preLoaderService.setShowPreloader(false);
    }

    async newForm() {
        const _JudgementDate = new Date(this.arrestData['LawsuitJudgement'][0]['JudgementDate']);
        const _PaymentDate = new Date(this.arrestData['LawsuitJudgement'][0]['PaymentDate']);
        const _PaymentPeroidStartDate = new Date(this.arrestData['LawsuitJudgement'][0]['PaymentPeroidStartDate']);

        return {
            ArrestName: await this.formatName(this.arrestData['LawsuitArrestLawbreaker'][0]) || "",
            CourtName: this.arrestData['LawsuitJudgement'][0]['CourtName'] || "",
            UndecidedCaseNo: this.arrestData['LawsuitJudgement'][0]['UndecidedCaseNo'] || "",
            DecidedCaseNo: this.arrestData['LawsuitJudgement'][0]['DecidedCaseNo'] || "",
            JudgementNo: this.arrestData['LawsuitJudgement'][0]['JudgementNo'] || "",
            JudgementDate: {
                date: {
                    day: _JudgementDate.getDate(),
                    month: _JudgementDate.getMonth() + 1,
                    year: _JudgementDate.getFullYear(),
                }
            } || "",
            IsFine: this.arrestData['LawsuitJudgement'][0]['IsFine'] || 0,
            CourtFine: this.arrestData['LawsuitJudgement'][0]['CourtFine'] || "",
            IsImprison: this.arrestData['LawsuitJudgement'][0]['IsImprison'] || "",
            ImprisonTime: this.arrestData['LawsuitJudgement'][0]['ImprisonTime'] || "",
            ImprisonUnit: this.arrestData['LawsuitJudgement'][0]['ImprisonUnit'] || "",
            IsPayOnce: this.arrestData['LawsuitJudgement'][0]['IsPayOnce'] + "",
            PaymentDate: {
                date: {
                    day: _PaymentDate.getDate(),
                    month: _PaymentDate.getMonth() + 1,
                    year: _PaymentDate.getFullYear(),
                }
            } || "",
            PaymentPeroid: this.arrestData['LawsuitJudgement'][0]['PaymentPeroid'] || "",
            PaymentPeroidStartDate: {
                date: {
                    day: _PaymentPeroidStartDate.getDate(),
                    month: _PaymentPeroidStartDate.getMonth() + 1,
                    year: _PaymentPeroidStartDate.getFullYear(),
                }
            } || "",
            PaymentPeroidRound: this.arrestData['LawsuitJudgement'][0]['PaymentPeroidRound'] || "",
            PaymentUnit: this.arrestData['PaymentUnit'] || "",
        }
    }

    async newFormNull() {
        return {
            ArrestName: await this.formatName(this.arrestData['LawsuitArrestLawbreaker'][0]) || "",
            CourtName: "",
            UndecidedCaseNo: "",
            DecidedCaseNo: "",
            JudgementNo: "",
            JudgementDate: "",
            IsFine: "",
            CourtFine: "",
            IsImprison: "",
            ImprisonTime: "",
            ImprisonUnit: "",
            IsPayOnce: "",
            PaymentDate: "",
            PaymentPeroid: "",
            PaymentPeroidStartDate: "",
            PaymentPeroidRound: "",
            PaymentUnit: "",
        }
    }


    paymentChange() {
        if (this.lawsuitArrestFormDialog.IsPayOnce == 1) {
            this.isPayAll = true
            this.lawsuitArrestFormDialog.PaymentPeroid = null
            this.lawsuitArrestFormDialog.PaymentPeroidStartDate = null
            this.lawsuitArrestFormDialog.PaymentPeroidRound = null
            this.lawsuitArrestFormDialog.PaymentUnit = null
        } else {
            this.isPayAll = false
            this.lawsuitArrestFormDialog.PaymentDate = null
        }
    }

    formatName = (name) => {
        let title = name.LawbreakerTitleName ? name.LawbreakerTitleName + " " : "";
        let firstname = name.LawbreakerFirstName ? name.LawbreakerFirstName + " " : "";
        let lastname = name.LawbreakerLastName ? name.LawbreakerLastName : "";
        return title + firstname + lastname;
    }

    onChangeCourt = function (data) {
        let _MasCourtList = this.MasCourtList;
        if (data) {
            let result = _MasCourtList.filter(item => (item.CourtName.includes(data))).slice(0, 10);
            this.SearchMasCourtList = result;
        }
    }

    selectCourt = function (data) {
        this.lawsuitArrestFormDialog.CourtName = data.CourtName
        this.SearchMasCourtList = [];
    }

    public Submit = async () => {
        let countNoticeCode = this.LawsuitArrest[0].LawsuitNotice.length
        if (this.arrestData['LawsuitJudgement'].length > 0) {
            let submit = {
                "JudgementID": this.arrestData['LawsuitJudgement'][0]['JudgementID'],
                "IndictmentDetailID": this.data.lawsuitArrest.IndictmentDetailID,
                "IsCourtFine": this.lawsuitArrestFormDialog.IsFine ? 1 : 0,
                "CourtName": this.lawsuitArrestFormDialog.CourtName,
                "UndecidedCaseNo": this.lawsuitArrestFormDialog.UndecidedCaseNo,
                "DecidedCaseNo": this.lawsuitArrestFormDialog.DecidedCaseNo,
                "JudgementNo": this.lawsuitArrestFormDialog.JudgementNo,
                "JudgementDate": this.lawsuitArrestFormDialog.JudgementDate ? this.convertTime((this.lawsuitArrestFormDialog.JudgementDate).date) : "",
                "IsFine": this.lawsuitArrestFormDialog.IsFine ? 1 : 0,
                "CourtFine": this.lawsuitArrestFormDialog.CourtFine,
                "CourtFineDate": this.lawsuitArrestFormDialog.CourtFineDate ? this.convertTime((this.lawsuitArrestFormDialog.CourtFineDate).date) : "",
                "IsImprison": this.lawsuitArrestFormDialog.IsImprison ? 1 : 0,
                "ImprisonTime": this.lawsuitArrestFormDialog.ImprisonTime,
                "ImprisonUnit": this.lawsuitArrestFormDialog.ImprisonUnit,
                "IsPayOnce": this.lawsuitArrestFormDialog.IsPayOnce ? 1 : 0,
                "PaymentDate": this.lawsuitArrestFormDialog.PaymentDate ? this.convertTime((this.lawsuitArrestFormDialog.PaymentDate).date) : "",
                "PaymentPeroid": this.lawsuitArrestFormDialog.PaymentPeroid,
                "PaymentPeroidRound": this.lawsuitArrestFormDialog.PaymentPeroidRound,
                "PaymentUnit": this.lawsuitArrestFormDialog.PaymentUnit,
                "PaymentPeroidStartDate": this.lawsuitArrestFormDialog.PaymentPeroidStartDate ? this.convertTime((this.lawsuitArrestFormDialog.PaymentPeroidStartDate).date) : "",
                "IsActive": this.arrestData['IsActive'],
                "LawsuitPaymentFine": [
                    {
                        "FineType": 1,
                        "PaymentPeriodNo": 1,
                        "PaymentFine": 8888888,
                        "PaymentDueDate": this.lawsuitArrestFormDialog.PaymentDueDate ? this.convertTime((this.lawsuitArrestFormDialog.PaymentDueDate).date) : "",
                        "PaymentActualDate": this.lawsuitArrestFormDialog.PaymentActualDate ? this.convertTime((this.lawsuitArrestFormDialog.PaymentActualDate).date) : "",
                        "ReceiveFinRate": this.lawsuitArrestFormDialog.ReceiveFinRate ? this.convertTime((this.lawsuitArrestFormDialog.ReceiveFinRate).date) : "",
                        "IsActive": 1,
                        "IsRequestReward": 0,
                        "LawsuitPaymentFineDetail": [
                            {
                                "NoticeCode": "Tara",
                                "IsRequestBribe": 1,
                                "IsActive": 1
                            }
                        ]
                    }
                ]
            }

            console.log("Case have JudgementID", this.arrestData['LawsuitJudgement'][0]['JudgementID'])
            let updateByCon = await this.lawsuitService.LawsuitJudgementupdByCon(submit)
            await this.lawsuitService.LawsuitPaymentFineDetailupdDelete(updateByCon.PaymentFineID)
            
            console.log(updateByCon)
            if (this.lawsuitArrestFormDialog.IsFine == true) {
                for (let i = 0; i < countNoticeCode * this.lawsuitArrestFormDialog.PaymentPeroid; i++) {
                    let payment = {
                        PaymentFineDetailID: '',
                        PaymentFineID: updateByCon.PaymentFineID,
                        NoticeCode: this.LawsuitArrest[0].LawsuitNotice[i].NoticeCode,
                        IsRequestBribe: this.LawsuitArrest[0].LawsuitNotice[i].IsRequestBribe,
                        IsActive: this.LawsuitArrest[0].LawsuitNotice[i].IsActive || 1
                    }
                    console.log(payment)
                    let status = await this.lawsuitService.LawsuitPaymentFineDetailinsAll(payment)
                    console.log(status)
                }
            }
            if (updateByCon.IsSuccess) {
               
                alert("บันทึกสำเร็จ")
                this.dialogRef.close();
            } else {
                alert("บันทึกไม่สำเร็จ")
                this.dialogRef.close();
            }


        } else {
            let PaymentFine = await this.insert()
            console.log(PaymentFine)
            if (PaymentFine.IsSuccess) {
                await this.lawsuitService.LawsuitPaymentFineDetailupdDelete(PaymentFine.PaymentFineID)
                alert("บันทึกสำเร็จ")
                this.dialogRef.close();
            }
            await this.lawsuitService.LawsuitJudgementupdDelete(this.arrestData['LawsuitJudgement'][0]['JudgementID'])
            if (this.lawsuitArrestFormDialog.IsFine == true) {
                console.log("Case first insert")
                for (let i = 0; i < countNoticeCode * this.lawsuitArrestFormDialog.PaymentPeroid; i++) {
                    let payment = {
                        PaymentFineDetailID: '',
                        PaymentFineID: PaymentFine['PaymentFineID'],
                        NoticeCode: this.LawsuitArrest[0].LawsuitNotice[i].NoticeCode,
                        IsRequestBribe: this.LawsuitArrest[0].LawsuitNotice[i].IsRequestBribe,
                        IsActive: this.LawsuitArrest[0].LawsuitNotice[i].IsActive || 1
                    }
                    await this.lawsuitService.LawsuitPaymentFineDetailinsAll(payment)
                }
            } else {
                this.dialogRef.close();
            }
            
        }

    }

    convertTime(date) {
        return date ? date.year + '-' + date.month + '-' + date.day + "T00:00:00.0" : null;
    }
    async insert() {
        let countNoticeCode = this.LawsuitArrest[0].LawsuitNotice.length
        // let payment = [];
        // // for (let i = 0; i < countNoticeCode * this.lawsuitArrestFormDialog.PaymentPeroid; i++) {
        // for (let i = 0; i < countNoticeCode; i++) {
        //   await payment.push({
        //     "PaymentFineID": '',
        //     "FineType": this.lawsuitArrestFormDialog.IsFine ? 1 : 0,
        //     "ReferenceID": '',
        //     "PaymentPeriodNo": this.lawsuitArrestFormDialog.PaymentPeroid,
        //     "PaymentFine": this.lawsuitArrestFormDialog.CourtFine,
        //     "PaymentDueDate": this.lawsuitArrestFormDialog.PaymentDueDate ? this.convertTime((this.lawsuitArrestFormDialog.PaymentDueDate).date) : "",
        //     "PaymentActualDate": this.lawsuitArrestFormDialog.PaymentDueDate ? this.convertTime((this.lawsuitArrestFormDialog.PaymentDueDate).date) : "",
        //     "ReceiveFinRate": '',
        //     "IsActive": 1,
        //     "IsRequestReward": '0',
        //     "LawsuitPaymentFineDetail": [
        //       {
        //         "NoticeCode": this.LawsuitArrest[0].LawsuitNotice[i].NoticeCode,
        //         "IsRequestBribe": 1,
        //         "IsActive": 1
        //       }
        //     ]
        //   })
        // }

        let submit = {
            // "JudgementID": '',
            "IndictmentDetailID": this.data.lawsuitArrest.IndictmentDetailID,
            "IsCourtFine": this.lawsuitArrestFormDialog.IsFine ? 1 : 0,
            "CourtName": this.lawsuitArrestFormDialog.CourtName,
            "UndecidedCaseNo": this.lawsuitArrestFormDialog.UndecidedCaseNo,
            "DecidedCaseNo": this.lawsuitArrestFormDialog.DecidedCaseNo,
            "JudgementNo": this.lawsuitArrestFormDialog.JudgementNo,
            "JudgementDate": this.lawsuitArrestFormDialog.JudgementDate ? this.convertTime((this.lawsuitArrestFormDialog.JudgementDate).date) : "",
            "IsFine": this.lawsuitArrestFormDialog.IsFine ? 1 : 0,
            "CourtFine": this.lawsuitArrestFormDialog.CourtFine,
            "CourtFineDate": this.lawsuitArrestFormDialog.CourtFineDate ? this.convertTime((this.lawsuitArrestFormDialog.CourtFineDate).date) : "",
            "IsImprison": this.lawsuitArrestFormDialog.IsImprison ? 1 : 0,
            "ImprisonTime": this.lawsuitArrestFormDialog.ImprisonTime,
            "ImprisonUnit": this.lawsuitArrestFormDialog.ImprisonUnit,
            "IsPayOnce": this.lawsuitArrestFormDialog.IsPayOnce ? 1 : 0,
            "PaymentDate": this.lawsuitArrestFormDialog.PaymentDate ? this.convertTime((this.lawsuitArrestFormDialog.PaymentDate).date) : "",
            "PaymentPeroid": this.lawsuitArrestFormDialog.PaymentPeroid,
            "PaymentPeroidRound": this.lawsuitArrestFormDialog.PaymentPeroidRound,
            "PaymentUnit": this.lawsuitArrestFormDialog.PaymentUnit,
            "PaymentPeroidStartDate": this.lawsuitArrestFormDialog.PaymentPeroidStartDate ? this.convertTime((this.lawsuitArrestFormDialog.PaymentPeroidStartDate).date) : "",
            "IsActive": this.arrestData['IsActive'],
            "LawsuitPaymentFine": [
                {
                    "FineType": 1,
                    "PaymentPeriodNo": 1,
                    "PaymentFine": 8888888,
                    "PaymentDueDate": this.lawsuitArrestFormDialog.PaymentDueDate ? this.convertTime((this.lawsuitArrestFormDialog.PaymentDueDate).date) : "",
                    "PaymentActualDate": this.lawsuitArrestFormDialog.PaymentActualDate ? this.convertTime((this.lawsuitArrestFormDialog.PaymentActualDate).date) : "",
                    "ReceiveFinRate": this.lawsuitArrestFormDialog.ReceiveFinRate ? this.convertTime((this.lawsuitArrestFormDialog.ReceiveFinRate).date) : "",
                    "IsActive": 1,
                    "IsRequestReward": 0,
                    "LawsuitPaymentFineDetail": [
                        {
                            "NoticeCode": "Tara",
                            "IsRequestBribe": 1,
                            "IsActive": 1
                        }
                    ]
                }
            ]
        }
        return await this.lawsuitService.LawsuitJudgementinsAll(submit)

    }
    closePopup() {
        this.dialogRef.close();
    }
    public validateData = function (data) {
        if (data) {
            return data;
        }
        return '';
    }

}
