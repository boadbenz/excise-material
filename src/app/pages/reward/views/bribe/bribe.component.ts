import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MasStaffService } from '../../services/master/MasStaff.service';
import { BribeConfig } from './bribe.config';
import { MasOfficeService } from '../../services/master/MasOffice.service';
import { RequestCommandService } from '../../services/RequestCommand.service';
import {
  IRequestCommandgetByArrestCode,
  IRequestCommand
} from '../../interfaces/RequestCommand';
import { BribeService } from './bribe.service';
import { NavigationService } from 'app/shared/header-navigation/navigation.service';
import { RewardService } from '../../reward.service';
import { TransactionRunningService } from '../../services/TransactionRunning.service';
import {
  ITransactionRunning,
  ITransactionRunninginsAll
} from '../../interfaces/TransactionRunning';
import { RequestBribeRewardService } from '../../services/RequestBribeReward.service';
import { RequestBribeService } from '../../services/RequestBribe.service';
import {
  IRequestBribeinsAll,
  IRequestBribe,
  IRequestBribegetByCon,
  IRequestBribeupdDeleteResponse
} from '../../interfaces/RequestBribe.interface';
import { MasDocumentMainService } from '../../services/master/MasDocumentMain.service';
import { MasDocumentModel } from 'app/models/mas-document.model';
import { MasStaffModel } from 'app/models';
import { MasOfficeModel } from 'app/models/mas-office.model';
import { RequestPaymentFineDetailService } from '../../services/RequestPaymentFineDetail.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { IFormChange } from '../../interfaces/FormChange';
import { RequestBribeDetailService } from '../../services/RequestBribeDetail.service';
import { PrintDialogComponent } from '../../shared/print-dialog/print-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SidebarService } from 'app/shared/sidebar/sidebar.component';
import { convertDateForSave, getDateMyDatepicker } from 'app/config/dateFormat';
import {
  RequestBribeinsAllModel,
  RequestBribeStaffModel,
  RequestBribeDetailModel
} from '../../models/RequestBribeinsAll.model';
import { Location } from '@angular/common';
import { DropdownInterface } from '../../shared/interfaces/dropdown-interface';
import { Observable } from 'rxjs/Observable';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap
} from 'rxjs/operators';
import { IRequestPaymentFineDetail } from '../../interfaces/RequestPaymentFineDetail';
import { replaceFakePath } from 'app/config/dataString';
import { RequestBribeupdByConModel } from '../../models/RequestBribeupdByCon.Model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
@Component({
  selector: 'app-bribe',
  templateUrl: './bribe.component.html',
  styleUrls: ['./bribe.component.scss'],
  providers: [BribeService]
})
export class BribeComponent extends BribeConfig implements OnInit, OnDestroy {
  public BribeFormGroup: FormGroup;
  public StaffFormGroup: FormGroup;
  public TotalPart: number;
  public PartMoney: number;
  public isEdit = false;
  public RequestCommand_NoticeCode_list: DropdownInterface[];
  public MasStaffMaingetAllList: any[];
  public MasOfficeMainAllList: any[];
  public StaffMainName: any[];
  public PositionName: string;
  public OfficeName: string;
  public aggregate = {
    PaymentFine: 0,
    BribeMoney: 0,
    NetBribeMoney: 0
  };
  get RequestBribeDetail() {
    return this.BribeFormGroup.get('RequestBribeDetail') as FormArray;
  }
  get RequestBribeStaff() {
    return this.BribeFormGroup.get('RequestBribeStaff') as FormArray;
  }
  get Document(): FormArray {
    return this.BribeFormGroup.get('Document') as FormArray;
  }
  searchStation = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length < 1
          ? []
          : this.MasOfficeMainAllList.filter(
            v => v.OfficeName.toLowerCase().indexOf(term.toLowerCase()) > -1
          )
            .slice(0, 10)
            .map(m => m.OfficeName)
      )
    );
  searchStationOfPOA = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length < 1
          ? []
          : this.MasOfficeMainAllList.filter(
            v => v.OfficeName.toLowerCase().indexOf(term.toLowerCase()) > -1
          )
            .slice(0, 10)
            .map(m => m.OfficeName)
      )
    );
  searchStaffMainName = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length < 1
          ? []
          : this.MasStaffMaingetAllList.filter(
            v => v.FullName.toLowerCase().indexOf(term.toLowerCase()) > -1
          )
            .slice(0, 10)
            .map(m => m.FullName)
      )
    );
  constructor(
    private activatedRoute: ActivatedRoute,
    private masStaffService: MasStaffService,
    private masOfficeService: MasOfficeService,
    private masDocumentMainService: MasDocumentMainService,
    private requestCommandService: RequestCommandService,
    private bribeService: BribeService,
    private navService: NavigationService,
    private rewardService: RewardService,
    private transactionRunningService: TransactionRunningService,
    private requestBribeService: RequestBribeService,
    private requestPaymentFineDetailService: RequestPaymentFineDetailService,
    private requestBribeDetailService: RequestBribeDetailService,
    private router: Router,
    private sidebarService: SidebarService,
    public dialog: NgbModal,
    private _location: Location,
    private fb: FormBuilder,
    private ref: ChangeDetectorRef
  ) {
    super();
    this.activatedRoute.params.subscribe(param => {
      this.mode = param['mode'];
      this.ArrestCode$.next(param['ArrestCode']);
      this.RequestBribeID$.next(param['RequestBribeID']);
      this.RequestBribeRewardID$.next(param['RequestBribeRewardID']);
    });
    this.navService.setInnerTextNextPageButton('กลับ');
    this.BribeFormGroup = this.fb.group({
      check: [true],
      RequestBribeID: [null],
      RequestBribeRewardID: [null],
      RequestBribeCode: [null],
      CommandDetailID: [null, Validators.required],
      RequestDate: [this.setDateNow, Validators.required],
      RequestTime: [this.setTimeNow],
      StationCode: [''],
      Station: ['', Validators.required],
      BribeTotal: [0],
      BribeRemainder: [0],
      Informeracknowledge: ['', Validators.required],
      StationOfPOA: [''],
      POADate: [this.setDateNow],
      POATime: [this.setTimeNow],
      POANo: [''],
      StationCodeOfPOA: [''],
      IsActive: [1],
      StaffName: [''],
      PositionName: [''],
      OfficeName: [''],
      RequestBribeDetail: this.fb.array([]),
      RequestBribeStaff: this.fb.array([]),
      Document: this.fb.array([])
    });
    this.StaffFormGroup = this.fb.group({
      StaffID: [''],
      ProgramCode: [''],
      ProcessCode: [''],
      RequestBribeID: [''],
      StaffCode: [''],
      TitleName: [''],
      FirstName: [''],
      LastName: [''],
      PositionCode: [''],
      PositionName: [''],
      PosLevel: [''],
      PosLevelName: [''],
      DepartmentCode: [''],
      DepartmentName: [''],
      DepartmentLevel: [''],
      OfficeCode: [''],
      OfficeName: [''],
      OfficeShortName: [''],
      ContributorID: [''],
      IsActive: '1'
    });
    this.navService.onSave.takeUntil(this.destroy$).subscribe(save => {
      if (save === true) {
        this.navService.onSave.next(false);
        this.buttonSave();
      }
    });
    this.navService.onCancel.takeUntil(this.destroy$).subscribe(cancel => {
      if (cancel === true) {
        this.navService.onCancel.next(false);
        swal({
          title: '',
          text: 'ยืนยันการทำรายการหรือไม่',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirm!'
        }).then(result => {
          if (result.value) {
            this.buttonCancel();
          }
        });
      }
    });
    this.navService.onPrint.takeUntil(this.destroy$).subscribe(save => {
      if (save === true) {
        this.navService.onPrint.next(false);
        this.buttonPrint();
      }
    });
    this.navService.onEdit.takeUntil(this.destroy$).subscribe(cancel => {
      if (cancel === true) {
        this.navService.onEdit.next(false);
        this.buttonEdit();
      }
    });
    this.navService.onDelete.takeUntil(this.destroy$).subscribe(save => {
      if (save === true) {
        this.navService.onDelete.next(false);
        swal({
          title: '',
          text: 'ยืนยันการทำรายการหรือไม่',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirm!'
        }).then(result => {
          if (result.value) {
            this.buttonDelete();
          }
        });
      }
    });
    this.navService.onNextPage.takeUntil(this.destroy$).subscribe(save => {
      if (save === true) {
        this.navService.onNextPage.next(false);
        this.buttonPrevPage();
      }
    });
    this.RequestBribeDetail.valueChanges.subscribe(value => {
      this.aggregate = {
        BribeMoney: 0,
        NetBribeMoney: 0,
        PaymentFine: 0
      };
      const formValAll: any[] = this.RequestBribeDetail.value;
      if (formValAll.length > 0) {
        const formValChecked: any[] = formValAll.filter(f => f.check === true);
        if (formValChecked.length > 0) {
          this.aggregate = {
            PaymentFine:
              formValChecked
                .map(m => Number(m.PaymentFine))
                .reduce((a, b) => (a += b)) || 0,
            BribeMoney:
              formValChecked
                .map(m => Number(m.BribeMoney))
                .reduce((a, b) => (a += b)) || 0,
            NetBribeMoney:
              formValChecked
                .map(m => Number(m.NetBribeMoney))
                .reduce((a, b) => (a += b)) || 0
          };
        }
      }
      this.ref.detectChanges();
    });
    this.BribeFormGroup.get('StationOfPOA')
      .valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(values => {
        if (!(this.mode === 'R' && this.isEdit === false)) {
          const mapStation = this.MasOfficeMainAllList.filter(
            f => f.OfficeName === values
          ).shift();
          if (mapStation) {
            this.StaffFormGroup.get('OfficeCode').patchValue(
              mapStation.OfficeCode
            );
            this.StaffFormGroup.get('OfficeName').patchValue(
              mapStation.OfficeName
            );
            this.StaffFormGroup.get('OfficeShortName').patchValue(
              mapStation.OfficeShortName
            );
          }
        }

        this.ref.detectChanges();
      });
    this.BribeFormGroup.get('StaffName')
      .valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(values => {
        if (!(this.mode === 'R' && this.isEdit === false)) {
          const mapStaff = this.MasStaffMaingetAllList.filter(
            f => f.FullName === values
          ).shift();
          if (mapStaff) {
            const newMap = this.StaffFormGroup.value;
            for (const key in this.StaffFormGroup.value) {
              if (this.StaffFormGroup.value.hasOwnProperty(key)) {
                const element = this.StaffFormGroup.value[key];
                newMap[key] = mapStaff[key] || '';
                this.StaffFormGroup.get(key).patchValue(newMap[key]);
              }
            }
            // console.log('mapStaff', mapStaff);

            this.BribeFormGroup.get('PositionName').patchValue(
              mapStaff.OperationPosName
            );
            this.StaffFormGroup.get('PositionName').patchValue(
              mapStaff.OperationPosName
            );
            this.StaffFormGroup.get('PositionName').patchValue(
              mapStaff.OperationPosName
            );
            this.BribeFormGroup.get('OfficeName').patchValue(
              mapStaff.OfficeName
            );
          } else {
            this.BribeFormGroup.get('PositionName').patchValue('');
            this.BribeFormGroup.get('OfficeName').patchValue('');
          }
        }
        this.ref.detectChanges();
      });
  }
  ngOnInit() {
    this.sidebarService.setVersion('0.0.1.12');

    // ILG60-08-03-00-00-E01 (Page Load)
    this.pageLoad();
    this.navService.onNextPage.takeUntil(this.destroy$).subscribe(res => {
      this.rewardService.bribeState$.next({
        mode: 'B',
        RequestBribeRewardID: this.RequestBribeRewardID
      });
    });
  }

  private async pageLoad() {
    // 1 START
    switch (this.mode) {
      case 'C':
        // 1.1
        this.MasStaffMaingetAllList = (await this.masStaffService
          .MasStaffMaingetAll()
          .toPromise()).map(m => ({
            ...m,
            FullName: `${m.TitleName || ''}${m.FirstName || ''} ${m.LastName || ''}`
          })); // 1.1.1
          
        this.MasOfficeMainAllList = await this.masOfficeService
          .MasOfficeMaingetAll()
          .toPromise(); // 1.1.2

        // 1.1.3
        const RequestCommands: IRequestCommand[] = await this.requestCommandService
          .RequestCommandgetByArrestCode({
            ArrestCode: this.ArrestCode$.getValue()
          })
          .toPromise();
        // 1.1.4
        if (RequestCommands.length > 0) {
          const RequestCommand: IRequestCommand = RequestCommands[0];
          this.TotalPart = RequestCommand.TotalPart;

          this.PartMoney = RequestCommand.RequestCommandDetail.map(
            m => m.PartMoney
          ).reduce((a, b) => (a += b));

          // this.checkList = RequestCommand.RequestCommandDetail.map(m => true);
          this.RequestCommand_NoticeCode_list = RequestCommand.RequestCommandDetail.map(
            m => ({
              text: `${m.NoticeCode || ''}/${m.TitleName || ''} ${m.FirstName ||
                ''} ${m.LastName || ''}`,
              value: m.CommandDetailID,
              value2: m.NoticeCode
            })
          );
          this.BribeFormGroup.get('RequestBribeCode').patchValue(
            'Auto Generate'
          );
        }
        // this.RequestCommand$.next(RequestCommand);

        // 1.1.5
        this.controlEnableAll();

        // 1.1.6
        this.navService.setSaveButton(true); // 1.1.6(1)
        this.navService.setCancelButton(true); // 1.1.6(2)
        this.navService.setPrintButton(false);
        this.navService.setEditButton(false);
        this.navService.setDeleteButton(false);
        this.navService.setSearchBar(false);
        this.navService.setNewButton(false);
        this.navService.setEditField(false);
        this.navService.setNextPageButton(false);
        this.navService.setPrevPageButton(false);

        break;
      case 'R':
        // 1.2
        // 1.2.1
        const RequestBribes: IRequestBribe[] = await this.requestBribeService
          .RequestBribegetByCon({
            RequestBribeID: this.RequestBribeID$.getValue()
          })
          .toPromise();
        this.RequestBribeRewardID$.next(RequestBribes[0].RequestBribeRewardID);
        // 1.2.3

        if (RequestBribes.length > 0) {
          const RequestBribe: IRequestBribe = RequestBribes[0];
          this.RequestCommand_NoticeCode_list = RequestBribes.map(m => ({
            text: `${m.NoticeCode || ''}/${m.TitleName || ''} ${m.FirstName ||
              ''} ${m.LastName || ''}`,
            value: m.CommandDetailID,
            value2: m.NoticeCode
          }));

          const mapBribeR = this.BribeFormGroup.value;
          for (const key in mapBribeR) {
            if (mapBribeR.hasOwnProperty(key)) {
              if (
                key !== 'RequestBribeDetail' &&
                key !== 'RequestBribeStaff' &&
                key !== 'Document'
              ) {
                this.BribeFormGroup.get(key).patchValue(
                  RequestBribe[key] || ''
                );
              }
            }
          }

          RequestBribe.RequestBribeDetail.forEach(f => {
            const newMap = {
              check: [true],
              // tslint:disable-next-line:max-line-length
              LawbreakerName: [
                `${f.LawbreakerTitleName || ''}${f.LawbreakerFirstName ||
                ''} ${f.LawbreakerMiddleName || ''} ${f.LawbreakerLastName ||
                ''}${f.LawbreakerOtherName || ''}`
              ],
              FineTypeName: [
                f.FineType === 0 ? 'เปรียบเทียบคดี' : 'ส่งฟ้องศาล'
              ],
              PaymentDate: [
                f.FineType === 0 ? f.PaymentActualDate : f.PaymentDueDate
              ],
              ReceiptBookNo: [f.ReceiptBookNo],
              Receipt: [f.FineType === 0 ? f.ReceiptNo : f.JudgementNo],
              PaymentPeriodNo: [f.PaymentPeriodNo],
              PaymentFine: [f.PaymentFine],
              BribeMoney: [Number(f.PaymentFine * 0.2)],
              NetBribeMoney: [
                Number(Number(f.PaymentFine * 0.2) / Number(this.TotalPart)) *
                Number(this.PartMoney)
              ]
            };

            this.RequestBribeDetail.push(this.fb.group(newMap));
          });
          RequestBribe.RequestBribeStaff.forEach(f => {
            // this.RequestBribeStaff.push(this.fb.group(f));
            const valStaff = this.StaffFormGroup.value;
            for (const key in valStaff) {
              if (valStaff.hasOwnProperty(key)) {
                this.StaffFormGroup.get(key).patchValue(f[key] || '');
              }
            }

            this.BribeFormGroup.get('StaffName').patchValue(
              `${f.TitleName || ''}${f.FirstName || ''} ${f.LastName || ''}`
            );
            this.BribeFormGroup.get('PositionName').patchValue(
              `${f.PositionName || ''}`
            );
            this.BribeFormGroup.get('OfficeName').patchValue(`${f.OfficeName || ''}`);
          });

          this.TotalPart = RequestBribe.TotalPart;
          this.PartMoney = RequestBribe.PartMoney;
        }
        // this.RequestBribe$.next(RequestBribe);
        // 1.2.2
        const MasDocument: MasDocumentModel[] = await this.masDocumentMainService
          .MasDocumentMaingetAll({
            DocumentType: 8,
            ReferenceCode: this.RequestBribeID$.getValue()
          })
          .toPromise();
        MasDocument.forEach(f => {
          this.Document.push(
            this.fb.group({
              DocumentID: [f.DocumentID || ''],
              DataSource: [f.DataSource || '', Validators.required],
              FilePath: [f.FilePath || '', Validators.required],
              DocumentName: [f.DocumentName || ''],
              DocumentType: [f.DocumentType || ''],
              IsActive: [f.IsActive || ''],
              ReferenceCode: [f.ReferenceCode || ''],
              isDelete: [false]
            })
          );
        });

        // this.MasDocument$.next(MasDocument); // 1.2.3

        // 1.2.4
        // ส่วนคำร้องขอรับเงินสินบน
        // Icon
        this.ILG60_08_03_00_00_E08_DISABLED$.next(false); // ปุ่ม ย่อขยาย Collapse Panel
        // Drop Down List
        this.ILG60_08_03_00_00_E09_DISABLED$.next(true); // เลขที่ใบแจ้งความนำจับ
        // Input Box
        this.ILG60_08_03_00_00_E10_DISABLED$.next(true); // เขียนที่

        // ส่วนรายละเอียดคำร้องขอรับเงินสินบน
        // Check Box
        this.ILG60_08_03_00_00_E11_DISABLED$.next(true); // [Check Box] เลือกรายการคำร้องขอรับเงินสินบน

        // ส่วนหนังสือมอบอำนาจ
        // Icon
        this.ILG60_08_03_00_00_E12_DISABLED$.next(false); // ปุ่ม ย่อขยาย Collapse Panel
        // Input Box
        this.ILG60_08_03_00_00_E13_DISABLED$.next(true); // เขียนที่
        this.ILG60_08_03_00_00_E14_DISABLED$.next(true); // ผู้รับมอบอำนาจ

        // ส่วนเอกสารแนบ
        // Icon
        this.ILG60_08_03_00_00_E16_DISABLED$.next(false); // ปุ่ม ย่อขยาย Collapse Panel
        // Button
        this.ILG60_08_03_00_00_E17_DISABLED$.next(true); // ปุ่ม เพิ่มเอกสารแนบ
        // Icon
        this.ILG60_08_03_00_00_E18_DISABLED$.next(true); // Icon ค้นหาที่อยู่เอกสารแนบ […]
        this.ILG60_08_03_00_00_E19_DISABLED$.next(true); // [ลบ]

        // 1.2.5
        this.navService.setPrintButton(true); // 1.2.5(1)
        this.navService.setEditButton(true); // 1.2.5(2)
        this.navService.setDeleteButton(true); // 1.2.5(3)
        this.navService.setNextPageButton(true); // 1.2.5(4)
        this.navService.setSaveButton(false);
        this.navService.setCancelButton(false);
        this.navService.setSearchBar(false);
        this.navService.setNewButton(false);
        this.navService.setEditField(false);
        this.navService.setPrevPageButton(false);
        break;
    }
    // 2 END
  }

  private async buttonSave() {
    // 1 START
    // 1.1
    // 1.2
    // 1.3
    // 1.4
    // 1.5
    if (this.BribeFormGroup.valid) {
      const checkLengthDetail =
        this.RequestBribeDetail.value.filter(f => f.check === true).length || 0;
      if (!(checkLengthDetail > 0)) {
        swal('', 'ต้องมีรายการในส่วนรายละเอียดคำร้องขอรับเงินสินบนอย่างน้อย 1 รายการที่ CheckBox.Check =  True',
          'warning'
        );

      } else {
        // 2
        switch (this.mode) {
          case 'C':
            // 2.1
            // 2.1.1
            const ITransactionRunning: ITransactionRunning[] = await this.transactionRunningService
              .TransactionRunninggetByCon({
                RunningTable: 'ops_requestbribe',
                RunningOfficeCode: this.OfficeCode
              })
              .toPromise();
            // 2.1.2
            if (ITransactionRunning.length > 0) {
              // 2.1.2(1)
              const TransactionRunning: ITransactionRunning =
                ITransactionRunning[0];

              // 2.1.2(1.1)
              await this.transactionRunningService
                .TransactionRunningupdByCon({
                  RunningID: TransactionRunning.RunningID
                })
                .toPromise();

              // 2.1.2(1.2)
              const RunningPrefix: string = this.leftPad(
                TransactionRunning.RunningPrefix,
                2
              ); // 2.1.2(1.2(1))
              const RunningOfficeCode: string = this.leftPad(
                TransactionRunning.RunningOfficeCode,
                6
              ); // 2.1.2(1.2(2))
              const RunningYear: string = this.leftPad(
                TransactionRunning.RunningYear,
                2
              ); // 2.1.2(1.2(3))
              const RunningNo: string = this.leftPad(
                (Number(TransactionRunning.RunningNo) + 1).toString(),
                5
              ); // 2.1.2(1.2(4))
              const RequestBribeCode = `${RunningPrefix}${RunningOfficeCode}${RunningYear}${RunningNo}`;
              this.RequestBribeCode$.next(RequestBribeCode);
            } else {
              // 2.1.2(2)
              // 2.1.2(2.1)
              await this.transactionRunningService
                .TransactionRunninginsAll({
                  RunningOfficeCode: this.OfficeCode, // 2.1.2(2.1.1)
                  RunningTable: 'ops_requestbribe', // 2.1.2(2.1.2)
                  RunningPrefix: 'BR' // 2.1.2(2.1.3)
                })
                .toPromise();

              // 2.1.2(2.2)
              const RunningOfficeCode = this.leftPad(this.OfficeCode, 6);
              const yy_thaibuddha = (new Date().getFullYear() + 543)
                .toString()
                .substr(2, 1);
              const RequestBribeCode = `BR${RunningOfficeCode}${yy_thaibuddha}00001`;
              this.RequestBribeCode$.next(RequestBribeCode);
            }

            // 2.1.3
            if (this.RequestBribeStaff.value.length > 0) {
              const staffForm = this.StaffFormGroup.value[0];

              for (const key in staffForm) {
                if (staffForm.hasOwnProperty(key)) {
                  this.RequestBribeStaff.at(0)
                    .get(key)
                    .patchValue(staffForm[key]);
                }
              }
            } else {
              const staffpush = this.StaffFormGroup.value;
              const newStaff = {};
              for (const key in staffpush) {
                if (staffpush.hasOwnProperty(key)) {
                  const element = staffpush[key];
                  newStaff[key] = [staffpush[key] || ''];
                }
              }
              this.RequestBribeStaff.push(this.fb.group(newStaff));
            }

            const mapForSave = RequestBribeinsAllModel;
            const valueForSave = this.BribeFormGroup.value;
            for (const key in mapForSave) {
              if (mapForSave.hasOwnProperty(key)) {
                mapForSave[key] = valueForSave[key] || '';
              }
            }

            const mapDetailForSave: any[] = [];
            this.RequestBribeDetail.value
              .filter(f => f.check === true)
              .forEach(f => {
                const mapDetail = RequestBribeDetailModel;
                for (const key in mapDetail) {
                  if (mapDetail.hasOwnProperty(key)) {
                    mapDetail[key] = f[key] || '';
                  }
                }
                mapDetailForSave.push(mapDetail);
              });
            mapForSave['RequestBribeDetail'] = mapDetailForSave;

            const mapStaffForSave: any[] = [];
            this.RequestBribeStaff.value.forEach(f => {
              const mapStaff = RequestBribeStaffModel;
              for (const key in mapStaff) {
                if (mapStaff.hasOwnProperty(key)) {
                  mapStaff[key] = f[key] || '';
                }
              }
              mapStaffForSave.push(mapStaff);
            });
            mapForSave['RequestBribeStaff'] = mapStaffForSave;
            mapForSave['BribeTotal'] = this.aggregate.NetBribeMoney.toFixed(2);
            mapForSave['BribeRemainder'] = (0).toFixed(2);
            mapForSave[
              'RequestBribeRewardID'
            ] = this.RequestBribeRewardID$.getValue().toString();
            mapForSave[
              'RequestBribeCode'
            ] = this.RequestBribeCode$.getValue().toString();
            mapForSave['RequestDate'] = this.ConvDateTimeToDate(
              convertDateForSave(getDateMyDatepicker(mapForSave['RequestDate']))
            );
            mapForSave['POADate'] = this.BribeFormGroup.get('StaffName').value ? this.ConvDateTimeToDate(
              convertDateForSave(getDateMyDatepicker(mapForSave['POADate']))
            ) : '';
            mapForSave['POATime'] = this.BribeFormGroup.get('StaffName').value ? mapForSave['POATime'] : '';
            const requestBribe = await this.requestBribeService
              .RequestBribeinsAll(mapForSave)
              .toPromise();

            this.RequestBribeID$.next(requestBribe.RequestBribeID);
            // 2.1.4
            mapDetailForSave.forEach(async PaymentFineDetailID => {
              await this.requestPaymentFineDetailService
                .RequestPaymentFineDetailupdByCon({
                  PaymentFineDetailID: PaymentFineDetailID.PaymentFineDetailID
                })
                .toPromise();
            });

            this.Document.value.forEach(async element => {
              await this.masDocumentMainService
                .MasDocumentMaininsAll({
                  DocumentID: '',
                  ReferenceCode: this.RequestBribeID$.getValue(),
                  DataSource: element.DataSource || '',
                  FilePath: element.FilePath || '',
                  DocumentName: element.DocumentName || '',
                  DocumentType: 8,
                  IsActive: 1
                })
                .toPromise();
            });

            break;
          case 'R':
            // 2.2
            // 2.2.1(1)
            if (this.RequestBribeStaff.value.length > 0) {
              const staffForm = this.StaffFormGroup.value[0];

              for (const key in staffForm) {
                if (staffForm.hasOwnProperty(key)) {
                  this.RequestBribeStaff.at(0)
                    .get(key)
                    .patchValue(staffForm[key]);
                }
              }
            } else {
              const staffpush = this.StaffFormGroup.value;
              const newStaff = {};
              for (const key in staffpush) {
                if (staffpush.hasOwnProperty(key)) {
                  const element = staffpush[key];
                  newStaff[key] = [staffpush[key] || ''];
                }
              }
              this.RequestBribeStaff.push(this.fb.group(newStaff));
            }

            const mapForUpdate = RequestBribeupdByConModel;
            const valueForUpdate = this.BribeFormGroup.value;
            for (const key in mapForUpdate) {
              if (mapForUpdate.hasOwnProperty(key)) {
                mapForUpdate[key] = valueForUpdate[key] || '';
              }
            }

            const mapStaffForUpdate: any[] = [];
            this.RequestBribeStaff.value.forEach(f => {
              const mapStaff = RequestBribeStaffModel;
              for (const key in mapStaff) {
                if (mapStaff.hasOwnProperty(key)) {
                  mapStaff[key] = f[key] || '';
                }
              }
              mapStaffForUpdate.push(mapStaff);
            });
            mapForUpdate['RequestBribeStaff'] = mapStaffForUpdate;
            mapForUpdate['BribeTotal'] = this.aggregate.NetBribeMoney.toFixed(
              2
            );
            mapForUpdate['BribeRemainder'] = (0).toFixed(2);
            mapForUpdate[
              'RequestBribeRewardID'
            ] = this.RequestBribeRewardID$.getValue().toString();
            mapForUpdate['RequestDate'] = (typeof mapForUpdate['RequestDate'] === 'object') ? this.ConvDateTimeToDate(
              convertDateForSave(
                getDateMyDatepicker(mapForUpdate['RequestDate'])
              )
            ) : mapForUpdate['RequestDate'];
            // tslint:disable-next-line:max-line-length
            mapForUpdate['POADate'] = this.BribeFormGroup.get('StaffName').value ? ((typeof mapForUpdate['POADate'] === 'object') ? this.ConvDateTimeToDate(
              convertDateForSave(getDateMyDatepicker(mapForUpdate['POADate']))
            ) : mapForUpdate['POADate']) : '';
            mapForUpdate['POATime'] = this.BribeFormGroup.get('StaffName').value ? mapForUpdate['POATime'] : '';

            mapForUpdate[
              'RequestBribeID'
            ] = `${this.RequestBribeID$.getValue()}`;
            this.requestBribeService
              .RequestBribeupdByCon(mapForUpdate)
              .toPromise();

            // 2.2.2(1)
            const mapDetailForUpdate: any[] = [];
            this.RequestBribeDetail.value
              .filter(f => f.check === false)
              .forEach(f => {
                const mapDetail = RequestBribeDetailModel;
                for (const key in mapDetail) {
                  if (mapDetail.hasOwnProperty(key)) {
                    mapDetail[key] = f[key] || '';
                  }
                }
                mapDetailForUpdate.push(mapDetail);
              });
            mapDetailForUpdate.forEach(async detail => {
              this.requestBribeDetailService
                .RequestBribeDetailupdDelete({
                  RequestBribeDetailID: detail.RequestBribeDetailID
                })
                .toPromise();
            });

            // 2.2.3(1)
            this.Document.value
              .filter(f => !f.DocumentID)
              .forEach(async element => {
                await this.masDocumentMainService
                  .MasDocumentMaininsAll({
                    DocumentID: '',
                    ReferenceCode: this.RequestBribeID$.getValue(),
                    DataSource: element.DataSource || '',
                    FilePath: element.FilePath || '',
                    DocumentName: element.DocumentName || '',
                    DocumentType: 8,
                    IsActive: 1
                  })
                  .toPromise();
              });

            // 2.2.3(2)
            this.Document.value
              .filter(f => f.isDelete === true && f.DocumentID)
              .forEach(async element => {
                await this.masDocumentMainService
                  .MasDocumentMainupdDelete({
                    DocumentID: element.DocumentID
                  })
                  .toPromise();
              });

            break;
        }
        // tslint:disable-next-line:curly
        if (!this.RequestBribeID$.getValue()) {
          swal('', 'บันทึกไม่สำเร็จ', 'error');
        } else {
          swal('', 'บันทึกสำเร็จ', 'success');
          this.isEdit = false;
          this.router.navigate([
            '/reward/bribe/R',
            this.RequestBribeID$.getValue()
          ]);
        }
      }
    } else {
      swal('', 'กรุณาตรวจสอบและระบุข้อมูลให้ครบถ้วน', 'warning');

      // show invalid input
      const controls = this.BribeFormGroup.controls;
      for (const key in controls) {
        if (controls.hasOwnProperty(key)) {
          this.BribeFormGroup.get(key).markAsTouched();

        }
      }

    }
  }

  private buttonCancel() {
    // if (confirm('ยืนยันการทำรายการหรือไม่')) {
    this.router.navigate([
      '/reward/manage/',
      localStorage.getItem('IndictmentID'),
      localStorage.getItem('ArrestCode'),
    ]);
    // switch (this.mode) {
    //   case 'C':
    //     this.router.navigate([
    //       '/reward/manage/',
    //       localStorage.getItem('IndictmentID'),
    //       localStorage.getItem('ArrestCode'),
    //     ]);
    //     break;
    //   case 'R':
    //     this.pageLoad();
    //     break;
    // }
    // } else {
    // }
  }

  private async buttonPrint() {
    // ILG60-08-03-00-00-E03 (ปุ่ม “ยกเลิก”)
    // 1 START

    let RequestBribe: IRequestBribe[];
    await this.requestBribeService
      .RequestBribegetByCon({
        RequestBribeID: this.RequestBribeID$.getValue()
      })
      .toPromise()
      .then((res: IRequestBribe[]) => {
        RequestBribe = res;
      });

    // 1.3.2
    let MasDocument: MasDocumentModel[];
    MasDocument = await this.masDocumentMainService
      .MasDocumentMaingetAll({
        ReferenceCode: this.RequestBribeID$.getValue(),
        DocumentType: 8
      })
      .toPromise();

    const printDoc: any[] = RequestBribe.map(m => ({
      DocName: `${m.RequestBribeCode}: คำร้องขอรับเงินสินบน`,
      DocType: 'แบบฟอร์ม'
    }));

    printDoc.concat(
      MasDocument.map(m => ({
        DocName: `${m.DocumentName}`,
        DocType: 'เอกสารแนบภายใน'
      }))
    );

    const dialogRef = this.dialog.open(PrintDialogComponent, {
      backdrop: 'static'
    });
    dialogRef.componentInstance.data = printDoc;
    dialogRef.result.then(r => { });
    // 2 END
  }
  private async buttonEdit() {
    // ILG60-08-03-00-00-E05 (ปุ่ม “แก้ไข”)
    // 1.1
    this.MasStaffMaingetAllList = (await this.masStaffService
      .MasStaffMaingetAll()
      .toPromise()).map(m => ({
        ...m,
        FullName: m.TitleName + m.FirstName + ' ' + m.LastName
      })); // 1.1.1
    this.MasOfficeMainAllList = await this.masOfficeService
      .MasOfficeMaingetAll()
      .toPromise(); // 1.1.2
    this.isEdit = true;
    // 1 START
  }
  private async buttonDelete() {
    // ILG60-08-03-00-00-E06 (ปุ่ม “ลบ”)
    // 1 START
    // if (confirm('ยืนยันการทำรายการหรือไม่')) {
    // 1.1
    // 1.1.1
    const RequestBribeupdDeleteResponse: IRequestBribeupdDeleteResponse = await this.requestBribeService
      .RequestBribeupdDelete({
        RequestBribeID: this.RequestBribeID$.getValue()
      })
      .toPromise();
    // 1.1.2
    if (RequestBribeupdDeleteResponse.IsSuccess) {
      // 1.1.2(1)
      // 1.1.2(1.1)
      swal('', 'ลบข้อมูลสำเร็จ', 'success');
      this.router.navigate([
        '/reward/manage/',
        localStorage.getItem('IndictmentID'),
        localStorage.getItem('ArrestCode'),
      ]);
      // this._location.back();
      // 1.1.2(1.2) 'WAIT'
    } else {
      // 1.1.2(2)
      // 1.1.2(2.1)
      swal('', 'ลบข้อมูลไม่สำเร็จ', 'error');
    }
    // } else {
    //   // 1.2.1
    // }
    // 2 END
  }
  private buttonPrevPage() {
    // : ILG60-08-03-00-00-E07 (ปุ่ม “กลับ >>”)
    // 1 START
    // this._location.back();
    this.router.navigate([
      '/reward/manage/',
      localStorage.getItem('IndictmentID'),
      localStorage.getItem('ArrestCode'),
    ]);
    // 2 END
  }

  private controlEnableAll() {
    // ส่วนคำร้องขอรับเงินสินบน
    // Icon
    this.ILG60_08_03_00_00_E08_DISABLED$.next(false); // ปุ่ม ย่อขยาย Collapse Panel
    // Drop Down List
    this.ILG60_08_03_00_00_E09_DISABLED$.next(false); // เลขที่ใบแจ้งความนำจับ
    // Input Box
    this.ILG60_08_03_00_00_E10_DISABLED$.next(false); // เขียนที่

    // ส่วนรายละเอียดคำร้องขอรับเงินสินบน
    // Check Box
    this.ILG60_08_03_00_00_E11_DISABLED$.next(false); // [Check Box] เลือกรายการคำร้องขอรับเงินสินบน

    // ส่วนหนังสือมอบอำนาจ
    // Icon
    this.ILG60_08_03_00_00_E12_DISABLED$.next(false); // ปุ่ม ย่อขยาย Collapse Panel
    // Input Box
    this.ILG60_08_03_00_00_E13_DISABLED$.next(false); // เขียนที่
    this.ILG60_08_03_00_00_E14_DISABLED$.next(false); // ผู้รับมอบอำนาจ

    // ส่วนเอกสารแนบ
    // Icon
    this.ILG60_08_03_00_00_E16_DISABLED$.next(false); // ปุ่ม ย่อขยาย Collapse Panel
    // Button
    this.ILG60_08_03_00_00_E17_DISABLED$.next(false); // ปุ่ม เพิ่มเอกสารแนบ
    // Icon
    this.ILG60_08_03_00_00_E18_DISABLED$.next(false); // Icon ค้นหาที่อยู่เอกสารแนบ […]
    this.ILG60_08_03_00_00_E19_DISABLED$.next(false); // [ลบ]
  }
  public StationOfPOAChange($event) {
    const inputValue = $event.target.value;
    const mapStation = this.MasOfficeMainAllList.filter(
      f => f.OfficeName === inputValue
    ).shift();
    this.StaffFormGroup.get('OfficeCode').patchValue(mapStation.OfficeCode);
    this.StaffFormGroup.get('OfficeName').patchValue(mapStation.OfficeName);
    this.StaffFormGroup.get('OfficeShortName').patchValue(
      mapStation.OfficeShortName
    );
  }
  public StaffMainNameChange($event) {
    console.log('$event', $event);
    const mapStaff = this.MasStaffMaingetAllList.filter(
      f => f.FullName === $event.target.value
    ).shift();

    console.log('BeforemapStaff', mapStaff);
    const newMap = this.StaffFormGroup.value;
    for (const key in this.StaffFormGroup.value) {
      if (this.StaffFormGroup.value.hasOwnProperty(key)) {
        const element = this.StaffFormGroup.value[key];
        newMap[key] = mapStaff[key] || '';
        this.StaffFormGroup.get(key).patchValue(newMap[key]);
      }
    }
    console.log('AftermapStaff', newMap);

    this.PositionName = mapStaff.PositionName;
    this.OfficeName = mapStaff.OfficeName;
  }
  public async selectChange(event) {
    // console.log('CommandDetailID', event);
    const CommandDetailID = event.target.value;
    const PaymentFineDetail: IRequestPaymentFineDetail[] = await this.requestPaymentFineDetailService
      .RequestPaymentFineDetailgetByNoticeCode({
        NoticeCode: this.RequestCommand_NoticeCode_list.filter(
          f => Number(f.value) === Number(CommandDetailID)
        )
          .map(m => m.value2)
          .shift()
      })
      .toPromise();

    if (PaymentFineDetail.length > 0) {
      PaymentFineDetail.forEach(f => {
        // const newMap = RequestBribeDetailModel;

        const newMap = {
          check: [true],
          // tslint:disable-next-line:max-line-length
          LawbreakerName: [
            `${f.LawbreakerTitleName || ''}${f.LawbreakerFirstName ||
            ''} ${f.LawbreakerMiddleName || ''} ${f.LawbreakerLastName ||
            ''}${f.LawbreakerOtherName || ''}`
          ],
          FineTypeName: [f.FineType === 0 ? 'เปรียบเทียบคดี' : 'ส่งฟ้องศาล'],
          PaymentDate: [
            f.FineType === 0 ? f.PaymentActualDate : f.PaymentDueDate
          ],
          ReceiptBookNo: [f.ReceiptBookNo],
          Receipt: [f.FineType === 0 ? f.ReceiptNo : f.JudgementNo],
          PaymentPeriodNo: [f.PaymentPeriodNo],
          PaymentFine: [f.PaymentFine],
          BribeMoney: [Number(f.PaymentFine * 0.2)],
          NetBribeMoney: [
            Number(Number(f.PaymentFine * 0.2) / Number(this.TotalPart)) *
            Number(this.PartMoney)
          ]
        };
        // tslint:disable-next-line:max-line-length

        this.RequestBribeDetail.push(this.fb.group(newMap));
      });
    } else {
      swal('', 'ไม่พบข้อมูลที่สามารถขอรับเงินสินบน', 'error');
    }
  }

  public changeForm(form: IFormChange) {
    const { FormName, FormData } = form;

    switch (FormName) {
      case 'ILG60-08-03-00-00-E08':
        this.ILG60_08_03_00_00_E08_FORM_VALID = FormData.valid;
        const dataE08 = FormData.value;
        console.log(
          'ILG60-08-03-00-00-E08',
          this.ILG60_08_03_00_00_E08_FORM_DATA
        );
        const newDataE08 = RequestBribeinsAllModel;
        Object.keys(RequestBribeinsAllModel).forEach(f => {
          newDataE08[f] = dataE08[f] || '';
        });
        this.ILG60_08_03_00_00_E08_FORM_DATA = this.ConvObjectValue(newDataE08);
        break;
      case 'ILG60-08-03-00-00-E12':
        this.ILG60_08_03_00_00_E12_FORM_VALID = FormData.valid;
        const dataE12 = FormData.value;
        const newDataE12 = RequestBribeStaffModel;
        Object.keys(RequestBribeStaffModel).forEach(f => {
          newDataE12[f] = dataE12[f] || '';
        });
        this.ILG60_08_03_00_00_E12_FORM_DATA = this.ConvObjectValue(newDataE12);
        this.ILG60_08_03_00_00_E08_FORM_DATA['RequestBribeStaff'] = [
          this.ConvObjectValue(this.ILG60_08_03_00_00_E12_FORM_DATA)
        ];
        this.ILG60_08_03_00_00_E08_FORM_DATA['StationOfPOA'] = `${dataE12[
          'StationOfPOA'
        ] || ''}`;
        this.ILG60_08_03_00_00_E08_FORM_DATA[
          'POADate'
        ] = `${this.ConvDateTimeToDate(
          convertDateForSave(getDateMyDatepicker(dataE12['POADate']))
        ) || ''}`;
        this.ILG60_08_03_00_00_E08_FORM_DATA['POATime'] = `${dataE12[
          'POATime'
        ] || ''}`;

        break;
    }
  }
  public addDocument() {
    this.Document.push(
      this.fb.group({
        DocumentID: [null],
        DataSource: ['', Validators.required],
        FilePath: ['', Validators.required],
        DocumentName: [''],
        DocumentType: [8],
        IsActive: [1],
        ReferenceCode: [''],
        isDelete: [false]
      })
    );
  }
  public changeDocument(e: any, index: number) {
    // let file = e.target.files[0];
    this.Document.at(index).patchValue({
      FilePath: replaceFakePath(e.target.value),
      IsActive: 1
    });
  }
  public deleteDocument(i: number) {
    this.Document.at(i)
      .get('isDelete')
      .patchValue(true);
    // this.Document.removeAt(i);
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
