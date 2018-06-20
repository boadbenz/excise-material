import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

declare var $: any;

@Component({
  selector: 'app-suspect-modal',
  templateUrl: './suspect-modal.component.html',
  styleUrls: ['./suspect-modal.component.scss']
})
export class SuspectModalComponent implements OnInit {

  isOpen = false;

  constructor(private activeModel: NgbActiveModal) { }

  ngOnInit() {
  }

  toggle(e) {
    $(e).slideToggle();
  }

  d(e: any) {
    this.activeModel.dismiss();
  }

  c(e: any) {
    this.activeModel.close();
  }
}
