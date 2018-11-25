import { Component, OnInit, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-step-wizard',
  templateUrl: './step-wizard.component.html',
  styleUrls: ['./step-wizard.component.scss']
})
export class StepWizardComponent implements OnInit {

  // steps: any;
  @Input() sectionId: EventEmitter<number>;
  @Input() disabledLine: EventEmitter<boolean>;

  section = [
    { id: 1, name: 'ใบแจ้งความนำจับ' },
    { id: 2, name: 'งานจับกุม', disabledLine: true },
    { id: 3, name: 'รับคำกล่าวโทษ' },
    { id: 4, name: 'งานตรวจรับและพิสูจน์ของกลาง' },
    { id: 5, name: 'งานเปรียบเทียบปรับและชำระค่าปรับ' },
    { id: 6, name: 'นำส่งเงินรายได้' },
    { id: 7, name: 'คำร้องขอรับเงินสินบนรางวัล' }
  ]

  constructor() { }


  ngOnInit() {
  }

}
