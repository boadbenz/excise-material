import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { NavigationService } from 'app/shared/header-navigation/navigation.service';
import { Subject } from 'rxjs';
import { Message } from 'app/config/message';

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
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private navService: NavigationService) {

    // set button false
    this.navService.setEditButton(false);
    this.navService.setDeleteButton(false);
    this.navService.setPrintButton(false);
    this.navService.setSaveButton(false);
    this.navService.setCancelButton(false);
    this.navService.setNextPageButton(false);
    this.navService.setSearchBar(false);
    // set button true
    this.navService.setSaveButton(true);
    this.navService.setCancelButton(true);

    this.Name = localStorage.getItem('Name');
    this.positionName = localStorage.getItem('positionName');
    this.officeName = localStorage.getItem('officeName');
  }

  List: any = [{ "name": "งานสืบสวน" },
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

  ListMaster: any = [{ "name": "งานสืบสวน" },
  { "name": "ข้อมูลผู้ต้องสงสัย" },
  { "name": "ข้อมูลผู้ต้องหา" },
  { "name": "ข้อมูลสินค้า" },
  { "name": "ข้อมูลบทลงโทษ" },
  { "name": "ข้อมูลการแบ่งส่วนเงินสินบนและเงินรางวัล" },
  { "name": "กำหนดสิทธิ์การเข้าถึงข้อมูล" }
  ];



  ngOnInit() {
    this.navigate_Service();
  }

  private navigate_Service() {

    this.navService.onSave.takeUntil(this.destroy$).subscribe(async status => {
      if (status) {
        console.log("onSave")
      }
    });
    this.navService.onCancel.takeUntil(this.destroy$).subscribe(async status => {
      if (status) {
        console.log("onCancel")
      }
    })
  }
}
