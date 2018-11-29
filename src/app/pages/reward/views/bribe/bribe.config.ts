import { RewardHelper } from '../../reward.helper';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MasDocumentModel } from 'app/models/mas-document.model';
import { IRequestBribe } from '../../interfaces/RequestBribe.interface';
import { MasOfficeModel } from 'app/models/mas-office.model';
import { IRequestCommand } from '../../interfaces/RequestCommand';
import { MasStaffModel } from 'app/models';
import { IILG60_08_03_00_00_E08_DATA } from './ILG60-08-03-00-00-E08/CONFIG';
export class BribeConfig extends RewardHelper {
  public formGroup: FormGroup;
  public OfficeCode = '102546';
  public RequestBribeRewardID: number;

  public mode: string;
  public ArrestCode$ = new BehaviorSubject<string>('');
  public RequestBribeID$ = new BehaviorSubject<number>(null);
  public RequestBribeRewardID$ = new BehaviorSubject<number>(null);
  public RequestBribeCode$ = new BehaviorSubject<string>('');

  public CommandDetailID$ = new BehaviorSubject<number>(null);

  public MasDocument$ = new BehaviorSubject<any>(null);
  public RequestBribe$ = new BehaviorSubject<any>(null);
  public MasOfficeMain$ = new BehaviorSubject<any>(null);
  public RequestCommand$ = new BehaviorSubject<any>(null);
  public MasStaffMain$ = new BehaviorSubject<any>(null);

  // ส่วนคำร้องขอรับเงินสินบน
  // Icon
  public ILG60_08_03_00_00_E08_DISABLED$ = new BehaviorSubject<boolean>(false); // ปุ่ม ย่อขยาย Collapse Panel
  public ILG60_08_03_00_00_E08_EXPANDED = true; // ปุ่ม ย่อขยาย Collapse Panel
  public ILG60_08_03_00_00_E08_DATA$ = new BehaviorSubject<any>(null);
  public ILG60_08_03_00_00_E08_FORM_VALID: boolean;
  public ILG60_08_03_00_00_E08_FORM_DATA: any;
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
  public ILG60_08_03_00_00_E12_EXPANDED = true; // ปุ่ม ย่อขยาย Collapse Panel
  public ILG60_08_03_00_00_E12_FORM_VALID: boolean;
  public ILG60_08_03_00_00_E12_FORM_DATA: any;
  // Input Box
  public ILG60_08_03_00_00_E13_DISABLED$ = new BehaviorSubject<boolean>(false); // เขียนที่
  public ILG60_08_03_00_00_E14_DISABLED$ = new BehaviorSubject<boolean>(false); // ผู้รับมอบอำนาจ

  // ส่วนเอกสารแนบ
  // Icon
  public ILG60_08_03_00_00_E16_DISABLED$ = new BehaviorSubject<boolean>(false); // ปุ่ม ย่อขยาย Collapse Panel
  public ILG60_08_03_00_00_E16_EXPANDED = true; // ปุ่ม ย่อขยาย Collapse Panel
  public ILG60_08_03_00_00_E16_FORM_VALID: boolean;
  // Button
  public ILG60_08_03_00_00_E17_DISABLED$ = new BehaviorSubject<boolean>(false); // ปุ่ม เพิ่มเอกสารแนบ
  // Icon
  public ILG60_08_03_00_00_E18_DISABLED$ = new BehaviorSubject<boolean>(false); // Icon ค้นหาที่อยู่เอกสารแนบ […]
  public ILG60_08_03_00_00_E19_DISABLED$ = new BehaviorSubject<boolean>(false); // [ลบ]
}
