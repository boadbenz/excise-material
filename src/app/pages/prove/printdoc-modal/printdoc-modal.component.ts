import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProveService } from '../prove.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import swal from 'sweetalert2';


@Component({
    selector: 'app-printdoc-modal',
    templateUrl: './printdoc-modal.component.html',
    styleUrls: ['./printdoc-modal.component.scss']
})

export class PrintDocModalComponent implements OnInit {
    printDoc = [];

    isOpen = false;
    isCheckAll = false;
    document = new Array<Document>();

    @Input() ProveID: string;
    @Input() ArrestCode: string;
    @Input() IndictmentID: string;

    @Output() d = new EventEmitter();
    @Output() c = new EventEmitter();

    constructor(
        private proveService: ProveService,
        private preloader: PreloaderService
    ) { }

    ngOnInit() {
        this.printDoc = [
            {
                IsChecked: false,
                DocName: 'บันทึกการตรวจรับของกลาง',
                DocType: 0,
                DocTypeName: 'แบบฟอร์ม'
            },
            {
                IsChecked: false,
                DocName: 'บัญชีของกลางและรายการการตรวจพิสูจน์ของกลาง ส.ส 2/4',
                DocType: 0,
                DocTypeName: 'แบบฟอร์ม'
            },
            {
                IsChecked: false,
                DocName: 'บันทึกการตรวจพิสูจน์นอกสถานที่ทำการ',
                DocType: 0,
                DocTypeName: 'แบบฟอร์ม'
            }
        ];

        this.proveService.MasDocumentMaingetAll(this.ProveID, "5").then(result => {
            let pValue = {
                "IsChecked": false,
                "DocName": result[0].DocumentName,
                "DocType": result[0].DocumentType,
                "DocTypeName": "เอกสารแนบภายใน"
            };

            this.printDoc.push(pValue);
        })
    }

    checkAll() {
        this.isCheckAll = !this.isCheckAll;
    }

    onPrint(f: any) {
        let _print = this.printDoc.filter(x => x.IsChecked == true && x.DocType == 0)
        if (_print.length) {
            _print.filter(x => x.DocName == "บัญชีของกลางและรายการการตรวจพิสูจน์ของกลาง ส.ส 2/4").map(item => {
                this.preloader.setShowPreloader(true);
                this.proveService.ProveReport2getByCon(this.ArrestCode, this.ProveID, this.IndictmentID)
                    .subscribe(x => {
                        // const blob = new Blob([x], { type: "application/pdf" });
                        // const link = document.createElement('a');
                        // link.href = window.URL.createObjectURL(blob);
                        // link.download = `${this.ProveID}.pdf`;
                        // link.click();

                        const file = new Blob([x], { type: 'application/pdf' });
                        const fileURL = URL.createObjectURL(file);
                        window.open(fileURL);

                        this.preloader.setShowPreloader(false);
                    }, (error) => {
                        console.error(error);

                        swal({
                            title: '',
                            text: "พบปัญหาในการพิมพ์รายงาน",
                            type: 'error',
                            confirmButtonText: 'ตกลง'
                        });

                        this.preloader.setShowPreloader(false);
                        return false;
                    });
            });

            _print.filter(x => x.DocName == "บันทึกการตรวจรับของกลาง").map(item => {
                console.log("this.ProveID : ",this.ProveID)
                this.preloader.setShowPreloader(true);
                this.proveService.ProveReport2(this.ProveID)                
                    .subscribe(x => {
                        const file = new Blob([x], { type: 'application/pdf' });
                        const fileURL = URL.createObjectURL(file);
                        window.open(fileURL);

                        this.preloader.setShowPreloader(false);
                    }, (error) => {
                        console.error(error);

                        swal({
                            title: '',
                            text: "พบปัญหาในการพิมพ์รายงาน",
                            type: 'error',
                            confirmButtonText: 'ตกลง'
                        });

                        this.preloader.setShowPreloader(false);
                        return false;
                    });
            });

            _print.filter(x => x.DocName == "บันทึกการตรวจพิสูจน์นอกสถานที่ทำการ").map(item => {
                console.log("this.ProveID : ",this.ProveID)
                this.preloader.setShowPreloader(true);
                this.proveService.ProveReport3(this.ProveID)                
                    .subscribe(x => {
                        const file = new Blob([x], { type: 'application/pdf' });
                        const fileURL = URL.createObjectURL(file);
                        window.open(fileURL);

                        this.preloader.setShowPreloader(false);
                    }, (error) => {
                        console.error(error);

                        swal({
                            title: '',
                            text: "พบปัญหาในการพิมพ์รายงาน",
                            type: 'error',
                            confirmButtonText: 'ตกลง'
                        });

                        this.preloader.setShowPreloader(false);
                        return false;
                    });
            });
        }
        else {
            swal({
                title: '',
                text: "กรุณาเลือกเอกสารที่ต้องการพิมพ์ !!!",
                type: 'warning',
                confirmButtonText: 'ตกลง'
            });
            //alert("กรุณาเลือกเอกสารที่ต้องการพิมพ์ !!!");
        }
    }

    dismiss(e: any) {
        this.d.emit(e);
    }

    close(e: any) {
        this.c.emit(e);
    }

}
