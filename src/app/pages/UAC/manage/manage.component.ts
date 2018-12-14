import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ManageComponent implements OnInit {

  form: FormGroup;
  Name: string;
  positionName: string;
  officeName: string;
  constructor() { 
    this.Name = localStorage.getItem('Name');
    this.positionName = localStorage.getItem('positionName');
    this.officeName = localStorage.getItem('officeName');
  }

  List: any = [ { "name": "งานสืบสวน" },
                { "name": "ใบแจ้งความนำจับ" },
                { "name": "งานจับคุม" },
                { "name": "บันทึกรับคำกล่าวโทษ" },
                { "name": "งานตรวจรับและพิสูจน์ของกลาง" },
                { "name": "งานเปรียบเทียบและชำระค่าปรับ" },
                { "name": "งานนำส่งรายได้" },
                { "name": "คำร้องขอรับเงินสินบน" },
                { "name": "คำร้องขอรับสินบน" },
                { "name": "คำร้องขอรับเงินรางวัล" },
                { "name": "งานปรับเพิ่ม-ลดค่าปรับ" },
                { "name": "งานตรวจรับของกลางเพื่อจัดเก็บ" },
                { "name": "งานโอนย้ายของกลาง" },
                { "name": "งานทำลายของกลาง" },
                { "name": "งานจัดเก็บของกลางเข้าพิพิธภัณท์" },
                { "name": "งานขายทอดตลาดของกลาง" }              
              ];
    ListMaster: any = [ {"name":"ข้อมูลผู้ต้องสงสัย"},
                        {"name":"ข้อมูลผู้ต้องหา"},
                        {"name":"ข้อมูลสินค้า"},
                        {"name":"ข้อมูลบทลงโทษ"},
                        {"name":"ข้อมูลการแบ่งส่วนเงินสินบนและเงินรางวัล"},
                        {"name":"กำหนดสิทธิ์การเข้าถึงข้อมูล"}]


 

  ngOnInit() {}

}
