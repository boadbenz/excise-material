import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { LawsuitService } from "../lawsuit.service";
import { ActivatedRoute } from "@angular/router";
import { PreloaderService } from "../../../shared/preloader/preloader.component";
import { MatDialog, MatDialogRef } from '@angular/material';
import Swal from 'sweetalert2'

@Component({
    selector: 'dialog-notComplete',
    templateUrl: 'dialog-notComplete.html',

})
export class DialogNotComplete implements OnInit {
    public complete = []
    public radioCheck = null;
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private lawsuitService: LawsuitService,
        public dialog: MatDialog,
        private activatedRoute: ActivatedRoute,
        private preLoaderService: PreloaderService,
        private dialogRef: MatDialogRef<DialogNotComplete>
    ) { }
    async ngOnInit() {
        for (let i=0; i<this.data.checkComplete[0].LawsuitArrestIndicment.length; i++) {
            this.complete.push({
                IndictmentID: this.data.checkComplete[0].LawsuitArrestIndicment[i].IndictmentID,
                SubSectionType:  this.data.checkComplete[0].LawsuitArrestIndicment[i].LawsuitLawGuiltbase[0].LawsuitLawSubSectionRule[0].LawsuitLawSubSection[0].SubSectionType,
                GuiltBaseName: this.data.checkComplete[0].LawsuitArrestIndicment[i].LawsuitLawGuiltbase[0].GuiltBaseName
            })
        }        
    }
    onSelect() {
        this.dialogRef.close(this.radioCheck);
    }
}