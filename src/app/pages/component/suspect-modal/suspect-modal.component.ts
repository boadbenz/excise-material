import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-suspect-modal',
  templateUrl: './suspect-modal.component.html',
  styleUrls: ['./suspect-modal.component.scss']
})
export class SuspectModalComponent implements OnInit {

  isOpen = false;

  constructor() { }

  ngOnInit() {
  }

  toggle(e) {
    $(e).slideToggle();

  }
}
