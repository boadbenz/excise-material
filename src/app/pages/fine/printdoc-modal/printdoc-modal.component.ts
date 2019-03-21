import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FineService } from '../fine.service';
import { ICompareCon } from '../condition-model';
import { Arrest } from '../../model/arrest';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { appConfig } from "app/app.config";
import { PreloaderService } from 'app/shared/preloader/preloader.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
// import { ManageComponent } from '../manage/manage.component';

@Component({
    selector: 'app-printdoc-modal',
    templateUrl: './printdoc-modal.component.html',
    styleUrls: ['./printdoc-modal.component.scss']
})

export class PrintDocModalComponent implements OnInit {

    printDoc: any[]
    sort = 'asc';
    public data: any
    CompareID: string;

    condtion: ICompareCon = {};

    TitleName: String;
    FirstName: String;
    LastName: String;

    @Input() dataForCompare: string;
    @Input() ArrestCode: string;

    @Output() d = new EventEmitter();
    @Output() c = new EventEmitter();
    check: any = {};
    constructor(
        private ActiveModal: NgbActiveModal,
        private fineService: FineService,
        private fb: FormBuilder,
        private _router: Router,
        private preloader: PreloaderService,
        private http: HttpClient,
        // private manageComponent: ManageComponent,
        private httpClient: HttpClient
    ) { }


    ngOnInit() {
        this.printDoc = this.data;
        console.log("fine printDoc : ", this.printDoc)
        this.getCompareByID();
        //this.getCompareDoc();
    }

    getCompareByID() {
        this.setCompareCondition();
        // this.fineService.getByCon(this.condtion).subscribe(list => {
        //   if (Array.isArray(list)) {
        //     this.getLawbreakerByArrest(list[0].ArrestCode);
        //   } 
        // });

        // this.fineService.getByCon(this.condtion).then(async res => {
        //     this.getLawbreakerByArrest(res[0].ArrestCode);
        // });
    }

    getLawbreakerByArrest(ArrestCode: string) {
        ArrestCode = "050100020";
        this.fineService.getByArrestCon(ArrestCode).then(async res => {
            this.TitleName = res.ArrestLawbreaker[0].LawbreakerTitleName;
            this.FirstName = res.ArrestLawbreaker[0].LawbreakerFirstName;
            this.LastName = res.ArrestLawbreaker[0].LawbreakerLastName;
        })
    }

    getCompareDoc() {
        debugger
        //this.pCompareID
        this.fineService.getByDoc("050100020").then(async res => {
            this.TitleName = res.ArrestLawbreaker[0].LawbreakerTitleName;
            this.FirstName = res.ArrestLawbreaker[0].LawbreakerFirstName;
            this.LastName = res.ArrestLawbreaker[0].LawbreakerLastName;
        })
    }


    setCompareCondition() {
        this.condtion = {};

        this.condtion = {
            CompareID: "22", //this.pCompareID
            CompareDetailID: "",
            CompareDetailReceiptID: "",
            FineType: "",
            CompareFineID: "",
            ReceiptFineType: "",
            StaffID: "",
            ProgramCode: "",
            ProcessCode: ""
        }
    }

    onSelect(index) {
        if (this.printDoc[index].checked == false) {
            this.printDoc[index].checked = true;
        } else if (this.printDoc[index].checked == true) {
            this.printDoc[index].checked = false;
        }
    }

    async onPrint(form: any) {


        for (var i = 0; i < this.printDoc.length; i++) {
            if (this.printDoc[i].checked == true && this.printDoc[i].TypeName == '2/53') {
                this.preloader.setShowPreloader(true);
                console.log("onSelect : ",this.printDoc[i])
                this.ReportForm06_001(this.printDoc[i].CompareDetailID).subscribe(x => {
                    const file = new Blob([x], { type: 'application/pdf' });
                    const fileURL = URL.createObjectURL(file);
                    window.open(fileURL);
                    this.preloader.setShowPreloader(false);
                })
            }
            if (this.printDoc[i].checked == true && this.printDoc[i].TypeName == 'Receipt') {
                this.preloader.setShowPreloader(true);
                console.log("onSelect : ",this.printDoc[i])
                this.ReportForm06_002(this.printDoc[i].CompareDetailID, this.printDoc[i].CompareReceiptID).subscribe(x => {
                    const file = new Blob([x], { type: 'application/pdf' });
                    const fileURL = URL.createObjectURL(file);
                    window.open(fileURL);
                    this.preloader.setShowPreloader(false);
                })
            }
            if (this.printDoc[i].checked == true && this.printDoc[i].TypeName == '2/52') {
                this.preloader.setShowPreloader(true);
                console.log("onSelect : ",this.printDoc[i])
                this.ReportForm06_003(this.printDoc[i].CompareID, this.printDoc[i].IndictmentID, this.printDoc[i].ArrestCode).subscribe(x => {
                    const file = new Blob([x], { type: 'application/pdf' });
                    const fileURL = URL.createObjectURL(file);
                    window.open(fileURL);
                    this.preloader.setShowPreloader(false);
                })
            }
            if (this.printDoc[i].checked == true && this.printDoc[i].TypeName == 'KD2') {
                this.preloader.setShowPreloader(true);
                console.log("onSelect KD2 : ",this.printDoc[i])
                this.ReportForm06_005(this.printDoc[i].CompareID).subscribe(x => {
                    const file = new Blob([x], { type: 'application/pdf' });
                    const fileURL = URL.createObjectURL(file);
                    window.open(fileURL);
                    this.preloader.setShowPreloader(false);
                })
            }
            if (this.printDoc[i].checked == true && this.printDoc[i].TypeName == 'KD3') {
                this.preloader.setShowPreloader(true);
                console.log("onSelect : ",this.printDoc[i])
                this.ReportForm06_006(this.printDoc[i].CompareDetailID).subscribe(x => {
                    const file = new Blob([x], { type: 'application/pdf' });
                    const fileURL = URL.createObjectURL(file);
                    window.open(fileURL);
                    this.preloader.setShowPreloader(false);
                })
            }
            if (this.printDoc[i].checked == true && this.printDoc[i].TypeName == 'KD4') {
                this.preloader.setShowPreloader(true);
                console.log("onSelect : ",this.printDoc[i])
                this.ReportForm06_007(this.printDoc[i].CompareDetailID).subscribe(x => {
                    const file = new Blob([x], { type: 'application/pdf' });
                    const fileURL = URL.createObjectURL(file);
                    window.open(fileURL);
                    this.preloader.setShowPreloader(false);
                })
            }
            if (this.printDoc[i].checked == true && this.printDoc[i].TypeName == 'KD5') {
                this.preloader.setShowPreloader(true);
                console.log("onSelect : ",this.printDoc[i])
                this.ReportForm06_008(this.printDoc[i].CompareDetailID).subscribe(x => {
                    const file = new Blob([x], { type: 'application/pdf' });
                    const fileURL = URL.createObjectURL(file);
                    window.open(fileURL);
                    this.preloader.setShowPreloader(false);
                })
            }
            if (this.printDoc[i].checked == true && this.printDoc[i].TypeName == 'KD6') {
                this.preloader.setShowPreloader(true);
                console.log("onSelect : ",this.printDoc[i])
                this.ReportForm06_009(this.printDoc[i].CompareDetailID).subscribe(x => {
                    const file = new Blob([x], { type: 'application/pdf' });
                    const fileURL = URL.createObjectURL(file);
                    window.open(fileURL);
                    this.preloader.setShowPreloader(false);
                })
            }
        }
        // if (this.check.checkbox1) {
        // var mCompareID = this.manageComponent.params.CompareID;
        // console.log("+++ mCompareID : ",mCompareID)
        //     var mIndictmentID = this.manageComponent.params.IndictmentID;
        //     this.preloader.setShowPreloader(true);
        //     await this.ReportForm1(mCompareID, mIndictmentID)
        //         .subscribe(x => {
        //             const file = new Blob([x], { type: 'application/pdf' });
        //             const fileURL = URL.createObjectURL(file);
        //             window.open(fileURL);
        //             this.preloader.setShowPreloader(false);
        //         })
        // }
        // if (this.check.checkbox2) {
        //     console.log("Chk2")
        //     var mCompareID = this.manageComponent.params.CompareID;
        //     var mIndictmentID = this.manageComponent.params.IndictmentID;
        //     this.preloader.setShowPreloader(true);
        //     await this.ReportForm2(mCompareID, mIndictmentID)
        //         .subscribe(x => {
        //             const file = new Blob([x], { type: 'application/pdf' });
        //             const fileURL = URL.createObjectURL(file);
        //             window.open(fileURL);
        //             this.preloader.setShowPreloader(false);
        //         })
        // }
        // if (this.check.checkbox3) {
        //     console.log("Chk3")
        //     var mCompareID = this.manageComponent.params.CompareID;
        //     var mIndictmentID = this.manageComponent.params.IndictmentID;
        //     this.preloader.setShowPreloader(true);
        //     await this.ReportForm3(mCompareID, mIndictmentID, this.ArrestCode)
        //         .subscribe(x => {
        //             const file = new Blob([x], { type: 'application/pdf' });
        //             const fileURL = URL.createObjectURL(file);
        //             window.open(fileURL);
        //             this.preloader.setShowPreloader(false);
        //         })
        // }
        // if (this.check.checkbox4) {
        //     console.log("Chk4")
        //     // var mCompareID = this.manageComponent.params.CompareID;
        //     var LawsuitID = this.manageComponent.headerData.LawsuitID;
        //     console.log("LawsuitID+++ : ", LawsuitID)
        //     this.preloader.setShowPreloader(true);
        //     await this.ReportForm4(LawsuitID)
        //         .subscribe(x => {
        //             const file = new Blob([x], { type: 'application/pdf' });
        //             const fileURL = URL.createObjectURL(file);
        //             window.open(fileURL);
        //             this.preloader.setShowPreloader(false);
        //         })
        // }
        // if (this.check.checkbox5) {
        //     console.log("Chk5")
        //     var RequestBribeID = "";
        //     this.preloader.setShowPreloader(true);
        //     await this.ReportForm5(RequestBribeID)
        //         .subscribe(x => {
        //             const file = new Blob([x], { type: 'application/pdf' });
        //             const fileURL = URL.createObjectURL(file);
        //             window.open(fileURL);
        //             this.preloader.setShowPreloader(false);
        //         })
        // }
        // if (this.check.checkbox6) {
        //     console.log("Chk6")
        //     var CompareDetailID = this.manageComponent.params.CompareDetailID;
        //     // var CompareDetailID = this.manageComponent.headerData.CompareDetailID;
        //     console.log("CompareDetailID+++ : ", CompareDetailID)
        //     var RequestBribeID = "";
        //     this.preloader.setShowPreloader(true);
        //     await this.ReportForm6(CompareDetailID)
        //         .subscribe(x => {
        //             const file = new Blob([x], { type: 'application/pdf' });
        //             const fileURL = URL.createObjectURL(file);
        //             window.open(fileURL);
        //             this.preloader.setShowPreloader(false);
        //         })
        // }
        // if (this.check.checkbox7) {
        //     console.log("Chk7")
        //     var CompareDetailID = this.manageComponent.params.CompareDetailID;
        //     // var CompareDetailID = this.manageComponent.headerData.CompareDetailID;
        //     console.log("CompareDetailID+++ : ", CompareDetailID)
        //     var RequestBribeID = "";
        //     this.preloader.setShowPreloader(true);
        //     await this.ReportForm7(CompareDetailID)
        //         .subscribe(x => {
        //             const file = new Blob([x], { type: 'application/pdf' });
        //             const fileURL = URL.createObjectURL(file);
        //             window.open(fileURL);
        //             this.preloader.setShowPreloader(false);
        //         })
        // }
        // if (this.check.checkbox8) {
        //     console.log("Chk8")
        //     var CompareDetailID = this.manageComponent.params.CompareDetailID;
        //     // var CompareDetailID = this.manageComponent.headerData.CompareDetailID;
        //     console.log("CompareDetailID+++ : ", CompareDetailID)
        //     var RequestBribeID = "";
        //     this.preloader.setShowPreloader(true);
        //     await this.ReportForm8(CompareDetailID)
        //         .subscribe(x => {
        //             const file = new Blob([x], { type: 'application/pdf' });
        //             const fileURL = URL.createObjectURL(file);
        //             window.open(fileURL);
        //             this.preloader.setShowPreloader(false);
        //         })
        // }
        // if (this.check.checkbox9) {
        //     console.log("Chk9")
        //     var CompareDetailID = this.manageComponent.params.CompareDetailID;
        //     // var CompareDetailID = this.manageComponent.headerData.CompareDetailID;
        //     console.log("CompareDetailID+++ : ", CompareDetailID)
        //     var RequestBribeID = "";
        //     this.preloader.setShowPreloader(true);
        //     await this.ReportForm9(CompareDetailID)
        //         .subscribe(x => {
        //             const file = new Blob([x], { type: 'application/pdf' });
        //             const fileURL = URL.createObjectURL(file);
        //             window.open(fileURL);
        //             this.preloader.setShowPreloader(false);
        //         })
        // }

        // let _print = this.PrintDoc.value.filter(x => x.IsChecked == true && x.DocType == 0)
        // if (_print.length) {
        // if (this.check.checkbox3) {
        //     this.preloader.setShowPreloader(true);
        //     await this.ReportForm252(this.ArrestCode)
        //         .subscribe(x => {
        //         const file = new Blob([x], {type: 'application/pdf'});
        //         const fileURL = URL.createObjectURL(file);
        //         window.open(fileURL);
        //         this.preloader.setShowPreloader(false);
        //     })
        // }

        // this._router.navigate([`/fine/list`]);
    }
    // closeDialog() {
    //     this.ActiveModal.close();
    //   }
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    private onCatch(error: any, caught: Observable<any>): Observable<any> {
        return Observable.throw(error);
    }
    private onSuccess(res: Response): void {
        console.log('Request successful');
    }

    private onError(res: Response): void {
        console.log('Error, status code: ' + res.status);
    }
    private onEnd(): void {
        this.preloader.setShowPreloader(false);
    }
    // ReportForm252(ArrestCode: string) {
    //     const params = { ArrestCode: ArrestCode };
    //     const url = `${appConfig.apiReport}/ILG60_00_04_002.aspx`;

    //     return this.http.post(url, params, { ...this.httpOptions, responseType: 'blob' })
    //         .catch(this.onCatch)
    //         .do((res: Response) => {
    //             this.onSuccess(res);
    //         }, (error: any) => {
    //             this.onError(error);
    //         })
    //         .map(x => x)
    //         .finally(() => this.onEnd());
    // }


    ReportForm06_001(CompareDetailID: string) {
        const params = {
            CompareDetailID: CompareDetailID
        };
        const url = `${appConfig.apiReport}/ILG60_00_06_001.aspx`;

        return this.httpClient.post(url, params, { ...this.httpOptions, responseType: 'blob' })
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSuccess(res);
            }, (error: any) => {
                this.onError(error);
            })
            .map(x => x)
            .finally(() => this.onEnd());
    }
    ReportForm06_002(CompareDetailID: string, CompareReceiptID: string) {
        const params = {
            CompareDetailID: CompareDetailID,
            CompareReceiptID: CompareReceiptID
        };
        const url = `${appConfig.apiReport}/ILG60_00_06_002.aspx`;

        return this.http.post(url, params, { ...this.httpOptions, responseType: 'blob' })
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSuccess(res);
            }, (error: any) => {
                this.onError(error);
            })
            .map(x => x)
            .finally(() => this.onEnd());
    }
    ReportForm06_003(mCompareID: string, mIndictmentID: string, ArrestCode: string) {
        const params = {
            CompareID: mCompareID,
            IndictmentID: mIndictmentID,
            ArrestCode: ArrestCode
        };
        const url = `${appConfig.apiReport}/ILG60_00_06_003.aspx`;
        return this.http.post(url, params, { ...this.httpOptions, responseType: 'blob' })
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSuccess(res);
            }, (error: any) => {
                this.onError(error);
            })
            .map(x => x)
            .finally(() => this.onEnd());
    }

    ReportForm06_005(CompareID: string) {
        console.log(' ReportForm06_005 CompareID : ' ,CompareID)
        const params = {
            CompareID: CompareID
        };
        const url = `${appConfig.apiReport}/ILG60_00_06_005.aspx`;
        return this.http.post(url, params, { ...this.httpOptions, responseType: 'blob' })
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSuccess(res);
            }, (error: any) => {
                this.onError(error);
            })
            .map(x => x)
            .finally(() => this.onEnd());
    }
    ReportForm06_006(CompareDetailID: string) {
        const params = {
            CompareDetailID: CompareDetailID
        };
        const url = `${appConfig.apiReport}/ILG60_00_06_006.aspx`;
        return this.http.post(url, params, { ...this.httpOptions, responseType: 'blob' })
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSuccess(res);
            }, (error: any) => {
                this.onError(error);
            })
            .map(x => x)
            .finally(() => this.onEnd());
    }
    ReportForm06_007(CompareDetailID: string) {
        const params = {
            CompareDetailID: CompareDetailID
        };
        const url = `${appConfig.apiReport}/ILG60_00_06_007.aspx`;
        return this.http.post(url, params, { ...this.httpOptions, responseType: 'blob' })
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSuccess(res);
            }, (error: any) => {
                this.onError(error);
            })
            .map(x => x)
            .finally(() => this.onEnd());
    }
    ReportForm06_008(CompareDetailID: string) {
        const params = {
            CompareDetailID: CompareDetailID
        };
        const url = `${appConfig.apiReport}/ILG60_00_06_008.aspx`;
        return this.http.post(url, params, { ...this.httpOptions, responseType: 'blob' })
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSuccess(res);
            }, (error: any) => {
                this.onError(error);
            })
            .map(x => x)
            .finally(() => this.onEnd());
    }
    ReportForm06_009(CompareDetailID: string) {
        const params = {
            CompareDetailID: CompareDetailID
        };
        const url = `${appConfig.apiReport}/ILG60_00_06_009.aspx`;
        return this.http.post(url, params, { ...this.httpOptions, responseType: 'blob' })
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSuccess(res);
            }, (error: any) => {
                this.onError(error);
            })
            .map(x => x)
            .finally(() => this.onEnd());
    }


    dismiss(e: any) {
        console.log('dd');
        this.d.emit('esc');
        this.d.emit(e);
        this.ActiveModal.close();
    }

    close(e: any) {
        console.log('close');
        this.c.emit(e);
        this._router.navigate([`/fine/list`]);
    }
}
