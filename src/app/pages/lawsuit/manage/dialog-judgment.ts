import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { LawsuitService } from "../lawsuit.service";
import { ActivatedRoute } from "@angular/router";
import { PreloaderService } from "../../../shared/preloader/preloader.component";
import { MatDialog, MatDialogRef } from '@angular/material';
import { Message } from '../../../config/message';
import { map, startWith } from 'rxjs/operators';
import Swal from 'sweetalert2'

@Component({
    selector: 'dialog-judgment',
    templateUrl: 'dialog-judgment.html',
    styleUrls: ['./dialog-judgment.scss']
})
export class DialogJudgment {
    public editMode = false;

    public validStatus = false;
    public isPayAll = null;
    public arrestData = [];
    public MasCourtList: any = []
    public SearchMasCourtList = []
    public lawsuitArrestFormDialog: any = {}
    public LawsuitArrest: any = [];

    public isRequired = {
        CourtName: false,
    }
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private lawsuitService: LawsuitService,
        public dialog: MatDialog,
        private activatedRoute: ActivatedRoute,
        private dialogRef: MatDialogRef<DialogJudgment>,
        private preLoaderService: PreloaderService,
    ) { }

    async ngOnInit() {
        this.preLoaderService.setShowPreloader(true);
        this.arrestData = await this.lawsuitService.LawsuitArrestIndicmentDetailgetByCon(this.data.lawsuitArrest.IndictmentDetailID)
        this.MasCourtList = await this.lawsuitService.MasCourtMaingetAll()
        this.LawsuitArrest = await this.lawsuitService.LawsuitArrestGetByCon(this.data.indicmentID)
        if (this.data.LawsuitID) {
            this.editMode = true;
        }
        console.log(this.arrestData['LawsuitJudgement'].length > 0)
        this.lawsuitArrestFormDialog = this.arrestData['LawsuitJudgement'].length > 0 ? await this.newForm() : await this.newFormNull();


        console.log(this.lawsuitArrestFormDialog)
        console.log(this.lawsuitArrestFormDialog.PaymentUnit)
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
            CourtFine: this.arrestData['LawsuitJudgement'][0]['CourtFine'],
            IsImprison: this.arrestData['LawsuitJudgement'][0]['IsImprison'],
            ImprisonTime: this.arrestData['LawsuitJudgement'][0]['ImprisonTime'],
            ImprisonUnit: this.arrestData['LawsuitJudgement'][0]['ImprisonUnit'],
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
            PaymentPeroidRound: this.arrestData['LawsuitJudgement'][0]['PaymentPeroidRound'],
            PaymentUnit: this.arrestData['LawsuitJudgement'][0]['PaymentUnit'],
            LawsuitPaymentFine: this.arrestData['LawsuitJudgement'][0]['LawsuitPaymentFine']
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
            IsPayOnce: 1,
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

    validValue() {
        console.log(this.lawsuitArrestFormDialog.CourtName)
        if (this.lawsuitArrestFormDialog.CourtName == "" || this.lawsuitArrestFormDialog.CourtName == null) {
            this.isRequired.CourtName = true;
            Swal({
                text: Message.checkData,
                type: 'warning',
            })
            return false;
        }
        return true;
    }

    Submit = async () => {
        if (this.validValue() == false) { return; }
        else if (this.validValue() == true) {
            Swal({
                title: '',
                text: "ยืนยันการทำรายการหรือไม่",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirm!'
            }).then(async (result) => {
                if (result.value) {
                    if (this.arrestData['LawsuitJudgement'].length > 0) {
                        let countNoticeCode = this.LawsuitArrest[0].LawsuitNotice.length
                        console.log(this.lawsuitArrestFormDialog.LawsuitPaymentFine)
                        let payment = [];
                        for (let i = 0; i < this.lawsuitArrestFormDialog.LawsuitPaymentFine.length; i++) {
                            await this.lawsuitService.LawsuitPaymentFineDetailupdDelete(this.lawsuitArrestFormDialog.LawsuitPaymentFine[i].PaymentFineID)
                        }

                        if (Number(this.lawsuitArrestFormDialog.IsPayOnce) == 0) {
                            let day = (this.lawsuitArrestFormDialog.PaymentPeroidStartDate).date
                            let dateNow = new Date(day.year, day.month - 1, day.day)
                            let unit = Number(this.lawsuitArrestFormDialog.PaymentUnit)
                            for (let i = 0; i < Number(this.lawsuitArrestFormDialog.PaymentPeroid); i++) {
                                let PaymentDueDate = null;

                                if (i > 0) {
                                    if (unit == 0) {
                                        dateNow.setDate(dateNow.getDate() + Number(this.lawsuitArrestFormDialog.PaymentPeroidRound))
                                    } else if (unit == 1) {
                                        dateNow.setMonth(dateNow.getMonth() + Number(this.lawsuitArrestFormDialog.PaymentPeroidRound))
                                    } else if (unit == 2) {
                                        dateNow.setFullYear(dateNow.getFullYear() + Number(this.lawsuitArrestFormDialog.PaymentPeroidRound))
                                    }
                                }

                                let dueDate = {
                                    year: String(dateNow.getFullYear()),
                                    month: String(dateNow.getMonth() + 1),
                                    day: String(dateNow.getDate())
                                }

                                PaymentDueDate = this.convertTime(dueDate)

                                await payment.push({
                                    "PaymentFineID": '',
                                    "FineType": this.lawsuitArrestFormDialog.IsFine ? 1 : 0,
                                    "ReferenceID": '',
                                    "PaymentPeriodNo": i + 1,
                                    "PaymentFine": Number(this.lawsuitArrestFormDialog.CourtFine) / Number(this.lawsuitArrestFormDialog.PaymentPeroid) || 0,
                                    "PaymentDueDate": PaymentDueDate,
                                    "PaymentActualDate": null,
                                    "ReceiveFinRate": this.lawsuitArrestFormDialog.ReceiveFinRate ? this.convertTime((this.lawsuitArrestFormDialog.ReceiveFinRate).date) : "",
                                    "IsActive": 1,
                                    "IsRequestReward": 0,
                                })
                            }
                        } else {
                            payment = [{
                                "PaymentFineID": '',
                                "FineType": this.lawsuitArrestFormDialog.IsFine ? 1 : 0,
                                "ReferenceID": '',
                                "PaymentPeriodNo": 1,
                                "PaymentFine": Number(this.lawsuitArrestFormDialog.CourtFine),
                                "PaymentDueDate": this.lawsuitArrestFormDialog.PaymentDate ? this.convertTime((this.lawsuitArrestFormDialog.PaymentDate).date) : "",
                                "PaymentActualDate": null,
                                "ReceiveFinRate": this.lawsuitArrestFormDialog.ReceiveFinRate ? this.convertTime((this.lawsuitArrestFormDialog.ReceiveFinRate).date) : "",
                                "IsActive": 1,
                                "IsRequestReward": 0,
                            }]
                        }

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
                            "LawsuitPaymentFine": payment
                        }

                        let updateByCon = await this.lawsuitService.LawsuitJudgementupdByCon(submit)
                        if (this.lawsuitArrestFormDialog.IsFine == 1 && updateByCon.IsSuccess == true) {
                            let payment = []
                            for (let i = 0; i < updateByCon.LawsuitPaymentFine.length; i++) {
                                for (let j = 0; j < this.LawsuitArrest[0].LawsuitNotice.length; j++) {
                                    payment.push({
                                        PaymentFineDetailID: '',
                                        PaymentFineID: updateByCon.LawsuitPaymentFine[i].PaymentFineID,
                                        NoticeCode: this.LawsuitArrest[0].LawsuitNotice[j].NoticeCode,
                                        IsRequestBribe: 0,
                                        IsActive: this.LawsuitArrest[0].LawsuitNotice[j].IsActive || 1
                                    })
                                }
                            }
                            await this.lawsuitService.LawsuitPaymentFineDetailinsAll(payment)
                        }

                        if (updateByCon.IsSuccess) {
                            Swal({
                                text: "บันทึกสำเร็จ",
                                type: 'success',
                            })
                            this.dialogRef.close();
                        } else {
                            Swal({
                                text: "บันทึกไม่สำเร็จ",
                                type: 'warning',
                            })
                            this.dialogRef.close();
                        }


                    } else {
                        let PaymentFine = await this.insert()
                        if (PaymentFine.IsSuccess) {
                            Swal({
                                text: "บันทึกสำเร็จ",
                                type: 'success',
                            })
                            if (this.lawsuitArrestFormDialog.IsFine == true) {
                                let payment = []
                                for (let i = 0; i < PaymentFine.LawsuitPaymentFine.length; i++) {
                                    for (let j = 0; j < this.LawsuitArrest[0].LawsuitNotice.length; j++) {
                                        payment.push({
                                            PaymentFineDetailID: '',
                                            PaymentFineID: PaymentFine.LawsuitPaymentFine[i].PaymentFineID,
                                            NoticeCode: this.LawsuitArrest[0].LawsuitNotice[j].NoticeCode,
                                            IsRequestBribe: 0,
                                            IsActive: this.LawsuitArrest[0].LawsuitNotice[j].IsActive || 1
                                        })
                                    }
                                }
                                await this.lawsuitService.LawsuitPaymentFineDetailinsAll(payment)
                                this.dialogRef.close({
                                    IndictmentDetailID: this.data.lawsuitArrest.IndictmentDetailID,
                                    JudgementID: PaymentFine.JudgementID
                                });
                            }
                        }
                    }
                    this.closePopup()
                } else {
                    this.closePopup()
                }
            })
        }
    }

    convertTime(date) {
        return date ? date.year + '-' + date.month + '-' + date.day + "T00:00:00.0" : null;
    }

    async insert() {
        let payment = [];
        if (this.lawsuitArrestFormDialog.IsFine == true) {
            if (Number(this.lawsuitArrestFormDialog.IsPayOnce) == 0) {
                let day = (this.lawsuitArrestFormDialog.PaymentPeroidStartDate).date
                let dateNow = new Date(day.year, day.month - 1, day.day)
                let unit = Number(this.lawsuitArrestFormDialog.PaymentUnit)
                for (let i = 0; i < Number(this.lawsuitArrestFormDialog.PaymentPeroid); i++) {
                    let PaymentDueDate = null;

                    if (i > 0) {
                        if (unit == 0) {
                            dateNow.setDate(dateNow.getDate() + Number(this.lawsuitArrestFormDialog.PaymentPeroidRound))
                        } else if (unit == 1) {
                            dateNow.setMonth(dateNow.getMonth() + Number(this.lawsuitArrestFormDialog.PaymentPeroidRound))
                        } else if (unit == 2) {
                            dateNow.setFullYear(dateNow.getFullYear() + Number(this.lawsuitArrestFormDialog.PaymentPeroidRound))
                        }
                    }

                    let dueDate = {
                        year: String(dateNow.getFullYear()),
                        month: String(dateNow.getMonth() + 1),
                        day: String(dateNow.getDate())
                    }

                    PaymentDueDate = this.convertTime(dueDate)

                    await payment.push({
                        "PaymentFineID": '',
                        "FineType": this.lawsuitArrestFormDialog.IsFine ? 1 : 0,
                        "ReferenceID": '',
                        "PaymentPeriodNo": i + 1,
                        "PaymentFine": Number(this.lawsuitArrestFormDialog.CourtFine) / Number(this.lawsuitArrestFormDialog.PaymentPeroid) || 0,
                        "PaymentDueDate": PaymentDueDate,
                        "PaymentActualDate": null,
                        "ReceiveFinRate": this.lawsuitArrestFormDialog.ReceiveFinRate ? this.convertTime((this.lawsuitArrestFormDialog.ReceiveFinRate).date) : "",
                        "IsActive": 1,
                        "IsRequestReward": 0,
                    })
                }
            } else {
                payment = [{
                    "PaymentFineID": '',
                    "FineType": this.lawsuitArrestFormDialog.IsFine ? 1 : 0,
                    "ReferenceID": '',
                    "PaymentPeriodNo": 1,
                    "PaymentFine": Number(this.lawsuitArrestFormDialog.CourtFine),
                    "PaymentDueDate": this.lawsuitArrestFormDialog.PaymentDate ? this.convertTime((this.lawsuitArrestFormDialog.PaymentDate).date) : "",
                    "PaymentActualDate": null,
                    "ReceiveFinRate": this.lawsuitArrestFormDialog.ReceiveFinRate ? this.convertTime((this.lawsuitArrestFormDialog.ReceiveFinRate).date) : "",
                    "IsActive": 1,
                    "IsRequestReward": 0,
                }]
            }
        }

        let submit = {
            "JudgementID": '',
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
            "IsPayOnce": Number(this.lawsuitArrestFormDialog.IsPayOnce),
            "PaymentDate": this.lawsuitArrestFormDialog.PaymentDate ? this.convertTime((this.lawsuitArrestFormDialog.PaymentDate).date) : "",
            "PaymentPeroid": this.lawsuitArrestFormDialog.PaymentPeroid,
            "PaymentPeroidRound": this.lawsuitArrestFormDialog.PaymentPeroidRound,
            "PaymentUnit": this.lawsuitArrestFormDialog.PaymentUnit,
            "PaymentPeroidStartDate": this.lawsuitArrestFormDialog.PaymentPeroidStartDate ? this.convertTime((this.lawsuitArrestFormDialog.PaymentPeroidStartDate).date) : "",
            "IsActive": this.arrestData['IsActive'],
            "LawsuitPaymentFine": payment
        }
        return await this.lawsuitService.LawsuitJudgementinsAll(submit)
    }
    closePopup() {
        this.dialogRef.close();
    }

    public setValidPayment(value) {
        if (value) {
            this.lawsuitArrestFormDialog.IsPayOnce = "1";
            this.lawsuitArrestFormDialog.PaymentDate = "";
            this.lawsuitArrestFormDialog.PaymentPeroid = "";
            this.lawsuitArrestFormDialog.PaymentPeroidStartDate = "";
            this.lawsuitArrestFormDialog.PaymentPeroidRound = "";
            this.lawsuitArrestFormDialog.PaymentUnit = "";
        }
    }
    public validateData = function (data) {
        if (data) {
            return data;
        }
        return '';
    }

}
