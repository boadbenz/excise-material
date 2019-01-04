import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import swal from 'sweetalert2';

@Component({
    selector: 'app-evidencetype-modal',
    templateUrl: './evidencetype-modal.component.html',
    styleUrls: ['./evidencetype-modal.component.scss']
})

export class EvidenceTypeModalComponent implements OnInit {
    printDoc = [
        {
            IsChecked: false,
            DocName: 'รายงานนำส่งรายได้',
            DocType: 0,
            DocTypeName: 'แบบฟอร์ม'
        }
    ]

    @Input() RevenueID: string;

    @Output() d = new EventEmitter();
    @Output() c = new EventEmitter();

    constructor(
        private preloader: PreloaderService,
        private _router: Router
    ) { }

    ngOnInit() {
    }

    onExternal() {
        this._router.navigate(['/evidenceOut/manage', 'E', 'C', 'NEW']);
        this.close('');
    }

    onInternal() {
        this._router.navigate(['/evidenceOut/manage', 'I', 'C', 'NEW']);
        this.close('');
    }

    dismiss(e: any) {
        this.d.emit(e);
    }

    close(e: any) {
        this.c.emit(e);
    }
}
