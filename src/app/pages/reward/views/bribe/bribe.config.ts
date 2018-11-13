import { RewardHelper } from '../../reward.helper';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class BribeConfig extends RewardHelper {
  public formGroup: FormGroup;
  public OfficeCode = '102546';
  public RequestBribeRewardID: number;

  // ส่วนคำร้องขอรับเงินสินบน
  // Icon
  public ILG60_08_03_00_00_E08_DISABLED$ = new BehaviorSubject<boolean>(false); // ปุ่ม ย่อขยาย Collapse Panel
  public ILG60_08_03_00_00_E08_EXPANDED$ = new BehaviorSubject<boolean>(true); // ปุ่ม ย่อขยาย Collapse Panel
  // Drop Down List
  public ILG60_08_03_00_00_E09_DISABLED$ = new BehaviorSubject<boolean>(false); // เลขที่ใบแจ้งความนำจับ
  // Input Box
  public ILG60_08_03_00_00_E10_DISABLED$ = new BehaviorSubject<boolean>(false); // เขียนที่

  // ส่วนรายละเอียดคำร้องขอรับเงินสินบน
  // Check Box
  public ILG60_08_03_00_00_E11_DISABLED$ = new BehaviorSubject<boolean>(false); // [Check Box] เลือกรายการคำร้องขอรับเงินสินบน

  // ส่วนหนังสือมอบอำนาจ
  // Icon
  public ILG60_08_03_00_00_E12_DISABLED$ = new BehaviorSubject<boolean>(false); // ปุ่ม ย่อขยาย Collapse Panel
  public ILG60_08_03_00_00_E12_EXPANDED$ = new BehaviorSubject<boolean>(true); // ปุ่ม ย่อขยาย Collapse Panel
  // Input Box
  public ILG60_08_03_00_00_E13_DISABLED$ = new BehaviorSubject<boolean>(false); // เขียนที่
  public ILG60_08_03_00_00_E14_DISABLED$ = new BehaviorSubject<boolean>(false); // ผู้รับมอบอำนาจ

  // ส่วนเอกสารแนบ
  // Icon
  public ILG60_08_03_00_00_E16_DISABLED$ = new BehaviorSubject<boolean>(false); // ปุ่ม ย่อขยาย Collapse Panel
  public ILG60_08_03_00_00_E16_EXPANDED$ = new BehaviorSubject<boolean>(true); // ปุ่ม ย่อขยาย Collapse Panel
  // Button
  public ILG60_08_03_00_00_E17_DISABLED$ = new BehaviorSubject<boolean>(false); // ปุ่ม เพิ่มเอกสารแนบ
  // Icon
  public ILG60_08_03_00_00_E18_DISABLED$ = new BehaviorSubject<boolean>(false); // Icon ค้นหาที่อยู่เอกสารแนบ […]
  public ILG60_08_03_00_00_E19_DISABLED$ = new BehaviorSubject<boolean>(false); // [ลบ]

  public leftPad(str: string, len: number, ch= '0'): string {
    len = len - str.length + 1;
    return len > 0 ?
      new Array(len).join(ch) + str : str;
  }
}
