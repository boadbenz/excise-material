import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'app-step-wizard',
  templateUrl: './step-wizard.component.html',
  styleUrls: ['./step-wizard.component.scss']
})
export class StepWizardComponent implements OnInit {

  // steps: any;

  section = [
    {name: 'ใบแจ้งความนำจับ'},
    {name: 'งานจับกุม'},
    {name: 'รับคำกล่าวโทษ'},
    {name: 'งานตรวจรับและพิสูจน์ของกลาง'},
    {name: 'งานเปรียบเทียบปรับและชำระค่าปรับ'},
    {name: 'นำส่งเงินรายได้'},
    {name: 'คำร้องขอรับเงินสินบนรางวัล'}
  ]

  constructor() { }


  ngOnInit() {

  }

}
