import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { RewardConfig, IRewardBinding } from './reward.config';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestCompareService } from '../../services/RequestCompare.service';
import { RequstLawsuitJudgementService } from '../../services/RequstLawsuitJudgement.service';
import { IRequestCompare } from '../../interfaces/RequestCompare';
import { IRequestLawsuitJudgement } from '../../interfaces/RequestLawsuitJudgement';
import { NonRequestRewardStaffService } from '../../services/NonRequestRewardStaff.service';
import { INonRequestRewardStaff } from '../../interfaces/NonRequestRewardStaff';
import { RequestBribeRewardService } from '../../services/RequestBribeReward.service';
import { NavigationService } from 'app/shared/header-navigation/navigation.service';
import { RequestRewardService } from '../../services/RequestReward.service';
import {
  IRequestReward,
  IRequestRewardinsAllRespone
} from '../../interfaces/RequestReward';
import { MasDocumentMainService } from '../../services/master/MasDocumentMain.service';
import { MasDocumentModel } from 'app/models/mas-document.model';
import { TransactionRunningService } from '../../services/TransactionRunning.service';
import { ITransactionRunning } from '../../interfaces/TransactionRunning';
import { RequestPaymentFineService } from '../../services/RequestPaymentFine.service';
import { IRequestBribeReward } from '../../interfaces/RequestBribeReward.interface';
import { IFormChange } from '../../interfaces/FormChange';
import { getDateMyDatepicker, convertDateForSave } from 'app/config/dateFormat';
import { SidebarService } from 'app/shared/sidebar/sidebar.component';
import { MatDialog } from '@angular/material';
import { PrintDialogComponent } from '../../shared/print-dialog/print-dialog.component';
import { RequestRewardDetailService } from '../../services/RequestRewardDetail.service';
import { RequestRewardStaffService } from '../../services/RequestRewardStaff.service';
import { RequestRewardStaffModel } from '../../models/RequestRewardStaff.Model';
import { RequestRewardinsAllModel } from '../../models/RequestRewardinsAll.Model';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import {
  distinctUntilChanged,
  debounceTime,
  map,
  switchMap
} from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { MasOfficeModel } from 'app/models/mas-office.model';
import { MasOfficeService } from '../../services/master/MasOffice.service';
import { MasStaffService } from '../../services/master/MasStaff.service';
import { MasStaffModel, MasTitleModel } from 'app/models';
import { DropdownInterface } from '../../shared/interfaces/dropdown-interface';
import { MasTitleService } from '../../services/master/MasTitle.service';
import { RequestRewardupdByConModel } from '../../models/RequestRewardupdByCon.Model';
import { replaceFakePath } from 'app/config/dataString';
import { MasDocumentMaininsAllModel } from '../../models/MasDocumentMaininsAll.Model';
import { Config } from '../../config/config';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IResponseCommon } from '../../interfaces/ResponseCommon.interface';
import swal from 'sweetalert2';
@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent extends RewardConfig implements OnInit, OnDestroy {
  public ILG60_08_04_00_00_E12_DATA: IRewardBinding[] = [];
  public listData: any[] = [];
  public RewardFormGroup: FormGroup;
  public MasOfficeMainList: any[];
  public checkList: boolean[];
  public ReferenceNoList: any[] = [];
  public staffAll: MasStaffModel[] = [];
  public TitleList: string[] = [];
  public StaffList: string[] = [];
  public Staff_StaffCode_List: DropdownInterface[] = [];
  public FirstMoneyTotal = 0;
  public SecondMoneyTotal = 0;
  public isEdit = false;
  public aggregate = {
    PaymentFine: {
      sum: 0
    },
    BribeMoney: {
      sum: 0
    },
    RewardMoney: {
      sum: 0
    },
    FirstMoney: {
      sum: 0
    },
    SecondMoney: {
      sum: 0
    },
    FirstPart: {
      sum: 0
    },
    SecondPart: {
      sum: 0
    },
    MoneySort1: {
      sum: 0
    },
    ToTalMoney: {
      sum: 0
    }
  };
  SumTotalMoney = () => this.FirstMoneyTotal + this.SecondMoneyTotal;
  SumMoney = () =>
    this.aggregate.BribeMoney.sum + this.aggregate.RewardMoney.sum;
  SumFirstMoney = () =>
    Number(((this.aggregate.RewardMoney.sum || 0) / 3).toFixed(2));
  SumFirstMoneyPerPart = () =>
    Number(
      (
        (this.SumFirstMoney() || 0) / (this.aggregate.FirstPart.sum || 0)
      ).toFixed(2)
    ) || 0;
  FirstRemainder = () =>
    (this.SumFirstMoney() || 0) - this.aggregate.FirstMoney.sum;
  SumSecondMoney = () =>
    Number(((this.aggregate.BribeMoney.sum / 3) * 2).toFixed(2));
  SumSecondMoneyPerPart = () =>
    Number(
      (this.SumSecondMoney() / (this.aggregate.SecondPart.sum || 0)).toFixed(2)
    ) || 0;
  SecondRemainder = () =>
    this.SumSecondMoney() - this.aggregate.SecondMoney.sum;
  searchStation = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length < 1
          ? []
          : this.MasOfficeMainList.filter(
              v => v.toLowerCase().indexOf(term.toLowerCase()) > -1
            ).slice(0, 10)
      )
    );
  searchTitleName = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length < 1
          ? []
          : this.TitleList.filter(
              v => v.toLowerCase().indexOf(term.toLowerCase()) > -1
            ).slice(0, 10)
      )
    ); // ยศ	Column	Key Press	ILG60-08-04-00-00-E15
  searchFullName = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length < 1
          ? []
          : this.Staff_StaffCode_List.filter(
              v => v.text.toLowerCase().indexOf(term.toLowerCase()) > -1
            )
              .slice(0, 10)
              .map(m => m.text)
      )
    ); // ชื่อ-สกุล	Column	Key Press	ILG60-08-04-00-00-E16

  get RequestRewardDetail(): FormArray {
    return this.RewardFormGroup.get('RequestRewardDetail') as FormArray;
  }
  get RequestRewardStaff(): FormArray {
    return this.RewardFormGroup.get('RequestRewardStaff') as FormArray;
  }
  get Document(): FormArray {
    return this.RewardFormGroup.get('Document') as FormArray;
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private requestCompareService: RequestCompareService,
    private requstLawsuitJudgementService: RequstLawsuitJudgementService,
    private nonRequestRewardStaffService: NonRequestRewardStaffService,
    private requestBribeReward: RequestBribeRewardService,
    private navService: NavigationService,
    private requestRewardService: RequestRewardService,
    private masDocumentMainService: MasDocumentMainService,
    private transactionRunningService: TransactionRunningService,
    private sidebarService: SidebarService,
    public dialog: NgbModal,
    private _location: Location,
    private requestPaymentFineService: RequestPaymentFineService,
    private requestRewardDetailService: RequestRewardDetailService,
    private requestRewardStaffService: RequestRewardStaffService,
    private router: Router,
    private fb: FormBuilder,
    private masOfficeService: MasOfficeService,
    private masStaffService: MasStaffService,
    private masTitleService: MasTitleService
  ) {
    super();
    this.navService.setInnerTextNextPageButton('กลับ');
    this.RewardFormGroup = this.fb.group({
      ReferenceNo: ['', Validators.required],
      RequestRewardCode: ['Auto Generate'],
      RequestDate: [this.setDateNow],
      RequestTime: [this.setTimeNow],
      FineType: ['1'],
      StationCode: [''],
      Station: ['', Validators.required],
      FirstPartTotal: [''],
      FirstMoneyTotal: [''],
      FirstMoneyPerPart: [''],
      FirstRemainder: [''],
      SecondPartTotal: [''],
      SecondMoneyTotal: [''],
      SecondMoneyPerPart: [''],
      SecondRemainder: [''],
      RewardTotal: [''],
      BribeTotal: [''],
      IsActive: ['1'],
      RequestRewardDetail: this.fb.array([]),
      RequestRewardStaff: this.fb.array([]),
      Document: this.fb.array([])
    });

    this.RequestRewardStaff.valueChanges
      .takeUntil(this.destroy$)
      .subscribe(selectedValue => {
        const sumFirstPart =
          selectedValue.filter(f => f.check === true).map(m => m.FirstPart)
            .length > 0
            ? selectedValue
                .filter(f => f.check === true)
                .map(m => m.FirstPart)
                .reduce((a, b) => (a += b))
            : 0;

        // tslint:disable-next-line:max-line-length
        this.aggregate.FirstPart.sum = sumFirstPart;
        const sumSecondPart =
          selectedValue.filter(f => f.check === true).map(m => m.SecondPart)
            .length > 0
            ? selectedValue
                .filter(f => f.check === true)
                .map(m => m.SecondPart)
                .reduce((a, b) => (a += b))
            : 0;

        // tslint:disable-next-line:max-line-length
        this.aggregate.SecondPart.sum = sumSecondPart;

        const sumFirst =
          selectedValue.filter(f => f.check === true).map(m => m.FirstMoney)
            .length > 0
            ? selectedValue
                .filter(f => f.check === true)
                .map(m => m.FirstMoney)
                .reduce((a, b) => (a += b))
            : 0;

        // tslint:disable-next-line:max-line-length
        this.aggregate.FirstMoney.sum = sumFirst;

        const sumSecond =
          selectedValue.filter(f => f.check === true).map(m => m.SecondMoney)
            .length > 0
            ? selectedValue
                .filter(f => f.check === true)
                .map(m => m.SecondMoney)
                .reduce((a, b) => (a += b))
            : 0;

        this.aggregate.SecondMoney.sum = Number(sumSecond.toFixed(2));

        const sumTotal =
          selectedValue.filter(f => f.check === true).map(m => m.ToTalMoney)
            .length > 0
            ? selectedValue
                .filter(f => f.check === true)
                .map(m => m.ToTalMoney)
                .reduce((a, b) => (a += b))
            : 0;

        this.aggregate.ToTalMoney.sum = sumTotal;
      });
    this.activatedRoute.params.subscribe(param => {
      this.mode = param['mode'];
      this.IndictmentID$.next(param['IndictmentID']);
      this.RequestRewardID$.next(param['RequestRewardID']);
      this.RequestBribeRewardID$.next(param['RequestBribeRewardID']);
    });

    this.navService.onCancel.takeUntil(this.destroy$).subscribe(command => {
      if (command === true) {
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
    this.navService.onSave.takeUntil(this.destroy$).subscribe(command => {
      if (command === true) {
        this.navService.onSave.next(false);
        this.buttonSave();
      }
    });
    this.navService.onEdit.takeUntil(this.destroy$).subscribe(command => {
      if (command === true) {
        this.navService.onEdit.next(false);
        this.buttonEdit();
      }
    });

    this.navService.onDelete.takeUntil(this.destroy$).subscribe(command => {
      if (command === true) {
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
    this.navService.onPrint.takeUntil(this.destroy$).subscribe(command => {
      if (command === true) {
        this.navService.onPrint.next(false);
        this.buttonPrint();
      }
    });
    this.navService.onNextPage.takeUntil(this.destroy$).subscribe(save => {
      if (save === true) {
        this.navService.onNextPage.next(false);
        this.buttonPrevPage();
      }
    });
  }

  ngOnInit() {
    this.sidebarService.setVersion('0.0.1.10');
    this.pageLoad();
  }
  public changeFullName(text, index) {
    const StaffCodeMap = this.Staff_StaffCode_List.filter(f => f.text === text)
      .map(m => m.value)
      .shift();

    const PositionName =
      this.staffAll
        .filter(f => f.StaffCode === StaffCodeMap)
        .map(m => m.OperationPosName)
        .shift() || '';
    const PosLevelName =
      this.staffAll
        .filter(f => f.StaffCode === StaffCodeMap)
        .map(m => m.PosLevelName)
        .shift() || '';

    this.RequestRewardStaff.at(index)
      .get('PositionName')
      .patchValue(PositionName);
    this.RequestRewardStaff.at(index)
      .get('PosLevelName')
      .patchValue(PosLevelName);

    const FirstName =
      this.staffAll
        .filter(f => f.StaffCode === StaffCodeMap)
        .map(m => m.FirstName)
        .shift() || '';

    const LastName =
      this.staffAll
        .filter(f => f.StaffCode === StaffCodeMap)
        .map(m => m.LastName)
        .shift() || '';
    this.RequestRewardStaff.at(index)
      .get('LastName')
      .patchValue(LastName);

    this.RequestRewardStaff.at(index)
      .get('FirstName')
      .patchValue(FirstName);

    this.RequestRewardStaff.at(index)
      .get('StaffCode')
      .patchValue(StaffCodeMap);
  }
  public onSelectContributor(id, index: number) {
    if (index > -1) {
      // tslint:disable-next-line:max-line-length
      this.RequestRewardStaff.at(index)
        .get('ContributorName')
        .patchValue(
          this.ContributorList.filter(f => f.value === id)
            .map(m => m.text)
            .shift() || ' '
        );
    }
  }
  public calChangeAll() {
    const formArr: any[] = this.RequestRewardStaff.value;
    formArr.forEach((element, index) => {
      const FirstPart: number = this.RequestRewardStaff.at(index).get(
        'FirstPart'
      ).value;
      this.RequestRewardStaff.at(index)
        .get('FirstMoney')
        .patchValue(this.SumFirstMoneyPerPart() * FirstPart || 0);

      const SecondPart: number = this.RequestRewardStaff.at(index).get(
        'SecondPart'
      ).value;
      this.RequestRewardStaff.at(index)
        .get('SecondMoney')
        .patchValue(this.SumSecondMoneyPerPart() * SecondPart || 0);
      this.setTotal(this.RequestRewardStaff, index);
    });

    this.aggregate.FirstPart.sum = formArr
      .map(m => Number(m.FirstPart))
      .reduce((a, b) => (a += b));
    this.aggregate.SecondPart.sum = formArr
      .map(m => Number(m.SecondPart))
      .reduce((a, b) => (a += b));
    this.aggregate.FirstMoney.sum = formArr
      .map(m => Number(m.FirstMoney))
      .reduce((a, b) => (a += b));
    this.aggregate.SecondMoney.sum = formArr
      .map(m => Number(m.SecondMoney))
      .reduce((a, b) => (a += b));
    this.aggregate.ToTalMoney.sum =
      this.aggregate.FirstMoney.sum +
      this.aggregate.SecondMoney.sum +
      this.aggregate.MoneySort1.sum;
  }
  public setTotal(controls: FormArray, index) {
    const FirstMoney: number = controls.at(index).get('FirstMoney').value;
    const SecondMoney: number = controls.at(index).get('SecondMoney').value;
    const MoneySort1: number = controls.at(index).get('MoneySort1').value;
    controls
      .at(index)
      .get('ToTalMoney')
      .patchValue(
        Number(FirstMoney) + Number(SecondMoney) + Number(MoneySort1)
      );
  }
  public addRow() {
    // This function instantiates a FormGroup for each day
    // and pushes it to our FormArray

    // We get our FormArray
    // instantiate a new day FormGroup;
    const newDayGroup: FormGroup = this.initItems();
    // this.ILG60_08_04_00_00_E13_BUTTON$.next({ DISABLED: true });
    // Add it to our formArray
    this.RequestRewardStaff.push(newDayGroup);
  }
  public initItems(): FormGroup {
    // Here, we make the form for each day
    const objForm = {};
    Object.keys(this.formObject).forEach(f => {
      objForm[f] = this.formObject[f];
    });

    return this.fb.group(objForm);
  }
  public sumTotal() {
    return {
      SumMoney:
        Number(this.aggregate.BribeMoney.sum) +
        Number(this.aggregate.RewardMoney.sum),
      SumFirstMoney: Number(this.aggregate.RewardMoney.sum) / 3,
      SumFirstMoneyPerPart:
        Number(this.SumFirstMoney) /
        Number(this.RewardFormGroup.get('FirstPartTotal').value),
      FirstRemainder: Number(this.SumFirstMoney) - Number(this.FirstMoneyTotal),
      SumSecondMoney: (Number(this.aggregate.RewardMoney.sum) / 3) * 2,
      SumSecondMoneyPerPart:
        Number(this.SumSecondMoney) /
        Number(this.RewardFormGroup.get('SecondPartTotal').value),
      SecondRemainder:
        Number(this.SumSecondMoney) - Number(this.SecondMoneyTotal)
    };
  }
  private buttonPrevPage() {
    this._location.back();
  }
  public checkboxHandle(PaymentFineID, i, checked) {
    if (checked) {
      this.RequestRewardDetail.push(
        this.fb.group({
          RequestRewardDetailID: '',
          RequestRewardID: '',
          PaymentFineID: `${PaymentFineID || ''}`,
          IsActive: '1'
        })
      );
    } else {
      this.RequestRewardDetail.removeAt(i);
    }
    this.checkboxCal();
  }
  public deleteHandle(rowItem) {
    // remove the chosen row
    this.RequestRewardStaff.removeAt(rowItem);
  }
  public checkboxCal() {
    // this.aggregate.BribeMoney.sum =
    this.aggregate.BribeMoney.sum = Number(
      this.listData
        .map((m, index) => (this.checkList[index] ? m.BribeMoney : 0))
        .reduce((a, b) => (a += b))
    );
    this.aggregate.PaymentFine.sum = Number(
      this.listData
        .map((m, index) => (this.checkList[index] ? m.PaymentFine : 0))
        .reduce((a, b) => (a += b))
    );
    this.aggregate.RewardMoney.sum = Number(
      this.listData
        .map((m, index) => (this.checkList[index] ? m.RewardMoney : 0))
        .reduce((a, b) => (a += b))
    );

    this.RequestRewardStaff.value.forEach((element, index) => {
      if (Number(element['sort']) === 1) {
        this.RequestRewardStaff.at(index)
          .get('MoneySort1')
          .patchValue(this.aggregate.BribeMoney.sum);
      }
    });

    this.RewardFormGroup.get('RewardTotal').patchValue(
      this.aggregate.RewardMoney.sum
    );
    this.RewardFormGroup.get('BribeTotal').patchValue(
      this.aggregate.BribeMoney.sum
    );

    // this.aggregateHandle.emit({
    //   BribeMoney: this.aggregate.BribeMoney.sum,
    //   PaymentFine: this.aggregate.PaymentFine.sum,
    //   RewardMoney: this.aggregate.RewardMoney.sum
    // });
  }
  private async pageLoad() {
    // 1 START
    switch (this.mode) {
      case 'C':
        // 1.1

        this.masTitleService
          .MasTitleMaingetAll()
          .subscribe((title: MasTitleModel[]) => {
            this.TitleList = title.map(m => m.TitleNameTH);
          }); // 1.1.1
        this.masStaffService
          .MasStaffMaingetAll()
          .subscribe((staff: MasStaffModel[]) => {
            this.staffAll = staff;
            this.Staff_StaffCode_List = staff.map(m => ({
              text: `${m.TitleName}${m.FirstName} ${m.LastName}`,
              value: m.StaffCode
            }));
            this.StaffList = staff.map(
              m => `${m.TitleName}${m.FirstName} ${m.LastName}`
            );
          }); // 1.1.2

        this.masOfficeService
          .MasOfficeMaingetAll()
          .subscribe((Office: MasOfficeModel[]) => {
            this.MasOfficeMainList = Office.map(m => m.OfficeName);
          }); // 1.1.3

        const RequestCompare: IRequestCompare[] = await this.requestCompareService
          .RequestComparegetByIndictmentID({
            IndictmentID: this.IndictmentID$.getValue()
          })
          .toPromise();

        if (RequestCompare.length > 0) {
          const RequestCompareMapName = `เลขคดีเปรียบเทียบที่ / ${
            RequestCompare[0].CompareCode
          }`;
          this.ReferenceNoList.push(RequestCompareMapName);
          this.RewardFormGroup.get('RequestRewardCode').patchValue(
            'Auto Generate'
          );
          const mapData = RequestCompare[0].RequestPaymentFine.map(m => ({
            ...m,
            // tslint:disable-next-line:max-line-length
            LawbreakerName: `${m.LawbreakerTitleName ||
              ' '}${m.LawbreakerFirstName || ' '}${m.LawbreakerMiddleName ||
              ' '}${m.LawbreakerLastName || ' '}${m.LawbreakerOtherName ||
              ' '}`,
            PaymentDueDate: `${m.PaymentActualDate}`,
            BribeMoney: `${m.PaymentFine * 0.2 || 0}`,
            RewardMoney: `${m.PaymentFine * 0.2 || 0}`
          }));
          this.listData = mapData;
          this.checkList = mapData.map(m => true);
          this.aggregate.BribeMoney.sum = Number(
            mapData.map(m => m.BribeMoney).reduce((a, b) => (a += b))
          );
          this.aggregate.PaymentFine.sum = Number(
            mapData.map(m => m.PaymentFine).reduce((a, b) => (a += b))
          );
          this.aggregate.RewardMoney.sum = Number(
            mapData.map(m => m.RewardMoney).reduce((a, b) => (a += b))
          );
          mapData.forEach(f => {
            const data = {
              RequestRewardDetailID: '',
              RequestRewardID: '',
              PaymentFineID: `${f.PaymentFineID || ''}`,
              IsActive: '1'
            };
            this.RequestRewardDetail.push(this.fb.group(data));
          });
          // this.checkAll = this.checkChecked(this.checkList);
          this.checkboxCal();
        }

        // this.ILG60_08_04_00_00_E08_DATA$.next({
        //   methodName: 'RequestComparegetByIndictmentID',
        //   data: RequestCompare
        // });
        // 1.1.6
        // 1.1.4

        const LawsuitJudgement: IRequestLawsuitJudgement[] = await this.requstLawsuitJudgementService
          .RequstLawsuitJudgementgetByIndictmentID({
            IndictmentID: Number(this.IndictmentID$.getValue())
          })
          .toPromise();
        this.requstLawsuitJudgement$.next(LawsuitJudgement);
        this.ILG60_08_04_00_00_E08_DATA$.next({
          methodName: 'RequstLawsuitJudgementgetByIndictmentID',
          data: LawsuitJudgement
        });
        // 1.1.5

        // 1.1.7
        const nonRequestRewardStaff: INonRequestRewardStaff[] = await this.nonRequestRewardStaffService
          .NonRequestRewardStaffgetByIndictmentID({
            IndictmentID: this.IndictmentID$.getValue()
          })
          .toPromise();

        const datatable_nonRequestRewardStaff = nonRequestRewardStaff.map(
          m => ({
            ...m,
            sort: 3,
            check: true,
            FullName: `${m.TitleName}${m.FirstName}${m.LastName}`,
            PositionName: `${m.PositionName || ''}`,
            PosLevelName: `${m.PosLevelName || ''}`,
            ContributorName: this.ConvertContributorName(m.ContributorID),
            FirstPart:
              m.ContributorID === '6' || m.ContributorID === '7' ? 1 : null,
            SecondPart: null,

            FirstMoney: 0,

            SecondMoney: 0,
            MoneySort1: 0,
            ToTalMoney: 0
          })
        );

        // const control_nonRequestRewardStaff: FormArray = <FormArray>(
        //   this.nonRequestRewardStaffForm
        // );

        datatable_nonRequestRewardStaff.forEach(x => {
          const objForm = {};
          Object.keys(x).forEach(f => {
            objForm[f] = [x[f]];
          });
          const newGroup: FormGroup = this.fb.group(objForm);
          this.RequestRewardStaff.push(newGroup);
        });

        // this.Input_nonRequestRewardStaff$.next(nonRequestRewardStaff);
        // this.ILG60_08_04_00_00_E12_DATA$.next({
        //   methodName: 'nonRequestRewardStaff',
        //   data: nonRequestRewardStaff
        // });

        // this.ILG60_08_04_00_00_E12_DATA$.next(nonRequestRewardStaff); // 1.1.8

        // 1.1.9
        const RequestBribeReward = await this.requestBribeReward
          .RequestBribeRewardgetByIndictmentID({
            IndictmentID: this.IndictmentID$.getValue()
          })
          .toPromise();

        const datatable_RequestBribeReward = RequestBribeReward;

        // const control_RequestBribeRewardForm: FormArray = <FormArray>(
        //   this.RequestBribeRewardForm
        // );
        datatable_RequestBribeReward
          .filter(f => f.HaveNotice === 1)
          .forEach(x => {
            const newGroup: FormGroup = this.fb.group({
              check: [true],
              sort: [1],
              TitleName: [''],
              FullName: ['สายลับ (ขอปิดนาม)'],
              FirstName: ['สายลับ (ขอปิดนาม)'],
              PositionName: [''],
              PosLevelName: [''],
              ContributorName: ['ผู้แจ้งความนำจับ'],
              ContributorID: [''],
              FirstPart: [null],
              FirstMoney: [null],
              SecondPart: [null],
              SecondMoney: [null],
              MoneySort1: [this.aggregate.BribeMoney.sum],
              ToTalMoney: [this.aggregate.BribeMoney.sum]
            });
            this.RequestRewardStaff.push(newGroup);
          });
        // this.ILG60_08_04_00_00_E08_DATA$.next({
        //   methodName: 'RequestBribeRewardgetByIndictmentID',
        //   data: RequestBribeReward
        // }); // 1.1.10

        // this.Input_RequestBribeRewardgetByIndictmentID$.next(
        //   RequestBribeReward
        // );
        // this.ILG60_08_04_00_00_E12_DATA$.next({
        //   methodName: 'RequestBribeRewardgetByIndictmentID',
        //   data: RequestBribeReward
        // });

        // this.ILG60_08_04_00_00_E12_DATA$.next(RequestBribeReward); // 1.1.10

        // 1.1.11 'WAIT'

        // 1.1.12
        this.navService.setSaveButton(true); // 1.1.12(1)
        this.navService.setCancelButton(true); // 1.1.12(2)
        this.navService.setPrintButton(false);
        this.navService.setEditButton(false);
        this.navService.setDeleteButton(false);
        this.navService.setPrevPageButton(false);
        this.navService.setSearchBar(false);
        this.navService.setNewButton(false);
        this.navService.setEditField(false);
        this.navService.setNextPageButton(false);
        this.navService.setPrevPageButton(false);
        break;
      case 'R':
        // 1.2

        // 1.2.1
        const RequestReward: IRequestReward[] = await this.requestRewardService
          .RequestRewardgetByCon({
            RequestRewardID: this.RequestRewardID$.getValue()
          })
          .toPromise();
        if (RequestReward.length > 0) {
          let newMapName;
          const dataRequestReward: IRequestReward = RequestReward[0];

          switch (dataRequestReward.FineType) {
            case 0:
              newMapName = `${dataRequestReward.ReferenceNo}`;
              break;
            case 1:
              newMapName = `${dataRequestReward.ReferenceNo}`;
              break;
          }
          this.ReferenceNoList.push(newMapName);
          const mapData = dataRequestReward.RequestRewardDetail.map(m => ({
            ...m,
            // tslint:disable-next-line:max-line-length
            LawbreakerName: `${m.LawbreakerTitleName ||
              ' '}${m.LawbreakerFirstName || ' '}${m.LawbreakerMiddleName ||
              ' '}${m.LawbreakerLastName || ' '}${m.LawbreakerOtherName ||
              ' '}`,
            PaymentDueDate: `${m.PaymentActualDate}`,
            BribeMoney: `${m.PaymentFine * 0.2 || 0}`,
            RewardMoney: `${m.PaymentFine * 0.2 || 0}`
          }));
          this.listData = mapData;
          this.checkList = mapData.map(m => true);
          this.aggregate.BribeMoney.sum = Number(
            mapData.map(m => m.BribeMoney).reduce((a, b) => (a += b))
          );
          this.aggregate.PaymentFine.sum = Number(
            mapData.map(m => m.PaymentFine).reduce((a, b) => (a += b))
          );
          this.aggregate.RewardMoney.sum = Number(
            mapData.map(m => m.RewardMoney).reduce((a, b) => (a += b))
          );
          const datatable_RequestReward = dataRequestReward.RequestRewardStaff.map(
            m => ({
              ...m,
              check: true,
              sort: 2,
              FullName: `${m.TitleName || ''}${m.FirstName || ''}${m.LastName ||
                ''}`,
              ContributorName: m.ContributorName
            })
          );
          const objRewardForm = this.RewardFormGroup.value;
          for (const key in objRewardForm) {
            if (objRewardForm.hasOwnProperty(key)) {
              const element = objRewardForm[key];
              if (
                key !== 'RequestRewardDetail' &&
                key !== 'RequestRewardStaff' &&
                key !== 'Document'
              ) {
                this.RewardFormGroup.get(key).patchValue(
                  dataRequestReward[key] || ''
                );
              }
            }
          }

          // const control_RequestReward: FormArray = <FormArray>(
          //   this.RequestRewardForm
          // );
          datatable_RequestReward.forEach(x => {
            const objForm = {};
            Object.keys(x).forEach(f => {
              objForm[f] = [x[f]];
            });
            objForm['MoneySort1'] = [0];
            const newGroup: FormGroup = this.fb.group(objForm);
            this.RequestRewardStaff.push(newGroup);
          });
        }
        // this.ILG60_08_04_00_00_E08_DATA$.next({
        //   methodName: 'RequestRewardgetByCon',
        //   data: RequestReward
        // });
        // console.log('RequestReward', RequestReward);

        // this.Input_RequestRewardgetByCon$.next(RequestReward);
        // this.ILG60_08_04_00_00_E12_DATA$.next({
        //   methodName: 'RequestRewardgetByCon',
        //   data: RequestReward
        // });

        // 1.2.2
        const masDocumentMain: MasDocumentModel[] = await this.masDocumentMainService
          .MasDocumentMaingetAll({
            DocumentType: 9,
            ReferenceCode: this.RequestRewardID$.getValue()
          })
          .toPromise();
        masDocumentMain.forEach(f => {
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

        this.navService.setSaveButton(false);
        this.navService.setCancelButton(false);
        this.navService.setPrintButton(true);
        this.navService.setEditButton(true);
        this.navService.setDeleteButton(true);
        this.navService.setSearchBar(false);
        this.navService.setNewButton(false);
        this.navService.setEditField(false);
        this.navService.setNextPageButton(true);
        this.navService.setPrevPageButton(false);
        break;
    }
    // 2 END
  }

  public async buttonSave() {
    // 1.3.2.	รหัสเหตุการณ์ : ILG60-08-04-00-00-E02 (ปุ่ม “บันทึก”)

    // 1 START
    // 1.1 'WAIT'
    // 1.2 'WAIT'
    // 1.3 'WAIT'
    // 1.4 'WAIT'
    // 1.5 'WAIT'

    if (this.RewardFormGroup.valid) {
      // 2
      try {
        switch (this.mode) {
          case 'C':
            // 2.1

            const TransactionRunning: ITransactionRunning[] = await this.transactionRunningService
              .TransactionRunninggetByCon({
                RunningTable: 'ops_requestreward',
                RunningOfficeCode: this.OfficeCode
              })
              .toPromise();
            // 2.1.2
            if (TransactionRunning.length > 0) {
              const tRunning: ITransactionRunning = TransactionRunning[0];
              // 2.1.2(1)
              // 2.1.2(1.1)
              await this.transactionRunningService
                .TransactionRunningupdByCon({
                  RunningID: tRunning.RunningID
                })
                .toPromise()
                .then();

              // 2.1.2(1.2)
              const RunningPrefix = `${this.leftPad(
                tRunning.RunningPrefix,
                2
              )}`; // 2.1.2(1.2(1))
              const RunningOfficeCode = `${this.leftPad(
                tRunning.RunningOfficeCode,
                6
              )}`; // 2.1.2(1.2(2))
              const RunningYear = `${this.leftPad(tRunning.RunningYear, 2)}`; // 2.1.2(1.2(3))
              const RunningNo = `${this.leftPad(
                (Number(tRunning.RunningNo) + 1).toString(),
                5
              )}`; // 2.1.2(1.2(4))
              this.RequestBribeCode =
                RunningPrefix + RunningOfficeCode + RunningYear + RunningNo;
            } else {
              // 2.1.2(2)

              // 2.1.2(2.1)
              await this.transactionRunningService
                .TransactionRunninginsAll({
                  RunningOfficeCode: this.OfficeCode,
                  RunningTable: 'ops_requestreward',
                  RunningPrefix: 'RW'
                })
                .toPromise()
                .then();

              // 2.1.2(2.2)
              this.RequestRewardCode = `RW${this.leftPad(
                this.OfficeCode,
                0
              )}${this.leftPad(this.yy_thaibuddha, 2)}00001`;
            }

            // 2.1.3
            const FormDataReward = this.RewardFormGroup.value;
            const m08 = RequestRewardinsAllModel;
            Object.keys(m08).forEach(x => {
              m08[x] = FormDataReward[x] || '';
            });
            const MapDataRewardStaff: any[] = this.RequestRewardStaff.value;
            const newMapDataRewardStaff: any[] = [];
            MapDataRewardStaff.filter(f => f.check === true).forEach(
              element => {
                const m12 = RequestRewardStaffModel;
                Object.keys(m12).forEach(x => {
                  m12[x] = element[x] || '';
                });
                newMapDataRewardStaff.push(this.ConvObjectValue(m12));
              }
            );

            // console.log('mergeArrayFormData', newMapData);
            m08[
              'RequestBribeRewardID'
            ] = `${this.RequestBribeRewardID$.getValue()}`;
            m08['RequestRewardCode'] = this.RequestRewardCode;
            m08['RequestRewardDetail'] = this.RequestRewardDetail.value;
            m08['FirstMoneyPerPart'] =
              this.SumFirstMoneyPerPart() > 0 &&
              this.SumFirstMoneyPerPart() !== Infinity
                ? `${this.SumFirstMoneyPerPart() || 0}`
                : '0';
            m08['FirstMoneyTotal'] = `${this.aggregate.FirstMoney.sum || 0}`;
            m08['FirstPartTotal'] = `${this.aggregate.FirstPart.sum || 0}`;
            m08['FirstRemainder'] = `${this.FirstRemainder() || 0}`;
            m08['SecondMoneyPerPart'] =
              this.SumSecondMoneyPerPart() > 0 &&
              this.SumSecondMoneyPerPart() !== Infinity
                ? `${this.SumSecondMoneyPerPart() || 0}`
                : '0';
            m08['SecondMoneyTotal'] = `${this.aggregate.SecondMoney.sum || 0}`;
            m08['SecondPartTotal'] = `${this.aggregate.SecondPart.sum || 0}`;
            m08['SecondRemainder'] = `${this.SecondRemainder() || 0}`;
            m08['RequestRewardStaff'] = newMapDataRewardStaff;
            m08['RequestDate'] = this.ConvDateTimeToDate(
              convertDateForSave(getDateMyDatepicker(m08['RequestDate']))
            );
            const dataForSave = m08;
            const RequestRewardinsAllRespone: IRequestRewardinsAllRespone = await this.requestRewardService
              .RequestRewardinsAll(dataForSave)
              .toPromise();

            if (RequestRewardinsAllRespone.RequestRewardID) {
              this.RequestRewardID$.next(
                RequestRewardinsAllRespone.RequestRewardID
              );
              // 2.1.5
              // 2.1.5(1)
              if (this.Document.value && this.Document.value.length > 0) {
                this.Document.value.forEach(async element => {
                  this.masDocumentMainService
                    .MasDocumentMaininsAll({
                      DocumentType: `9`,
                      ReferenceCode: `${
                        RequestRewardinsAllRespone.RequestRewardID
                      }`,
                      DocumentID: '',
                      DataSource: `${element.DataSource}`,
                      FilePath: `${element.FilePath}`,
                      DocumentName: '',
                      IsActive: `1`
                    })
                    .subscribe(resMasDocumentMain => {
                      if (resMasDocumentMain['DocumentID']) {
                        // 2.1.5(2) 'WAIT'
                      }
                    });
                });
              }
            }

            // 2.1.4
            this.RequestPaymentFineupdByCon.forEach(async PaymentFineID => {
              await this.requestPaymentFineService
                .RequestPaymentFineupdByCon({
                  PaymentFineID: PaymentFineID
                })
                .toPromise();
            });

            // 2.1.6 => 3

            break;
          case 'R':
            // 2.2

            // 2.2.1
            const FormDataRewardUpd = this.RewardFormGroup.value;
            const UpdModel = RequestRewardupdByConModel;
            Object.keys(UpdModel).forEach(x => {
              UpdModel[x] = FormDataRewardUpd[x] || '';
            });
            const MapDataRewardStaffUpd: any[] = this.RequestRewardStaff.value;
            const newMapDataRewardStaffUpd: any[] = [];
            MapDataRewardStaffUpd.filter(f => f.check === true).forEach(
              element => {
                const m12 = RequestRewardStaffModel;
                Object.keys(m12).forEach(x => {
                  m12[x] = element[x] || '';
                });
                newMapDataRewardStaffUpd.push(this.ConvObjectValue(m12));
              }
            );

            // console.log('mergeArrayFormData', newMapData);
            UpdModel['RequestRewardDetail'] = this.RequestRewardDetail.value;
            UpdModel['FirstMoneyPerPart'] =
              this.SumFirstMoneyPerPart() > 0 &&
              this.SumFirstMoneyPerPart() !== Infinity
                ? `${this.SumFirstMoneyPerPart() || 0}`
                : '0';
            UpdModel['FirstMoneyTotal'] = `${this.aggregate.FirstMoney.sum ||
              0}`;
            UpdModel['FirstPartTotal'] = `${this.aggregate.FirstPart.sum || 0}`;
            UpdModel['FirstRemainder'] = `${this.FirstRemainder() || 0}`;
            UpdModel['SecondMoneyPerPart'] =
              this.SumSecondMoneyPerPart() > 0 &&
              this.SumSecondMoneyPerPart() !== Infinity
                ? `${this.SumSecondMoneyPerPart() || 0}`
                : '0';
            UpdModel['SecondMoneyTotal'] = `${this.aggregate.SecondMoney.sum ||
              0}`;
            UpdModel['SecondPartTotal'] = `${this.aggregate.SecondPart.sum ||
              0}`;
            UpdModel['SecondRemainder'] = `${this.SecondRemainder() || 0}`;
            UpdModel['RequestRewardStaff'] = newMapDataRewardStaffUpd;
            // UpdModel['RequestDate'] = this.ConvDateTimeToDate(
            //   convertDateForSave(getDateMyDatepicker(UpdModel['RequestDate']))
            // );
            const dataForSaveUpd = UpdModel;
            await this.requestRewardService
              .RequestRewardupdByCon(dataForSaveUpd)
              .toPromise();

            // 2.2.2
            this.RequestRewardDetail.value
              .filter(f => f.check === false && f.StaffID)
              .forEach(async RequestRewardDetailID => {
                await this.requestRewardDetailService
                  .RequestRewardDetailupdDelete({
                    RequestRewardDetailID: RequestRewardDetailID.RewardDetailID
                  })
                  .toPromise();
              });

            // 2.2.3
            this.RequestRewardStaff.value
              .filter(f => f.check === false && f.StaffID)
              .forEach(async StaffID => {
                await this.requestRewardStaffService
                  .RequestRewardStaffupdDelete({
                    StaffID: StaffID.StaffID
                  })
                  .toPromise();
              });

            // 2.2.4
            this.RequestRewardStaff.value
              .filter(f => f.check === true && f.StaffID)
              .forEach(async RequestRewardStaff => {
                await this.requestRewardStaffService
                  .RequestRewardStaffupdByCon(RequestRewardStaff)
                  .toPromise();
              });

            // 2.2.5
            const newInsStaff: any[] = this.RequestRewardStaff.value;
            newInsStaff
              .filter(f => !f.StaffID && f.check === true)
              .forEach(async x => {
                const newMap = RequestRewardStaffModel;
                Object.keys(newMap).forEach(m => {
                  newMap[m] = x[m] || '';
                });
                const convNewData = this.ConvObjectValue(newMap);
                await this.requestRewardStaffService
                  .RequestRewardStaffinsAll(convNewData)
                  .toPromise();
              });

            this.Document.value
              .filter(f => !f.DocumentID)
              .forEach(Doc => {
                const mapDoc = MasDocumentMaininsAllModel;
                Object.keys(mapDoc).forEach(x => {
                  mapDoc[x] = Doc[x] || '';
                });
                mapDoc['DocumentType'] = '9';
                mapDoc['ReferenceCode'] = `${this.RequestRewardID$.getValue()}`;
                this.masDocumentMainService
                  .MasDocumentMaininsAll(mapDoc)
                  .subscribe();
              });
            // 2.2.6 'WAIT'
            // 2.2.7 'WAIT'
            // 2.2.8 'WAIT'
            break;
        }
        swal('บันทึกสำเร็จ', 'success');
        // location.reload();
        // this.pageLoad();
        this.isEdit = false;
        this.router.navigate([
          '/reward/reward/R',
          this.RequestRewardID$.getValue()
        ]);
      } catch (error) {
        swal('บันทึกไม่สำเร็จ', 'error');
      }
    } else {
      swal('กรุณากรอกให้ครบถ้วน', 'warning');
    }
  }
  public async buttonPrint() {
    // ILG60-08-02-00-00-E05
    // 1 START

    // 1.3.1
    let RequestReward: IRequestReward[];
    await this.requestRewardService
      .RequestRewardgetByCon({
        RequestRewardID: this.RequestRewardID$.getValue()
      })
      .toPromise()
      .then((res: IRequestReward[]) => {
        RequestReward = res;
      });

    // 1.3.2
    let MasDocument: MasDocumentModel[];
    MasDocument = await this.masDocumentMainService
      .MasDocumentMaingetAll({
        ReferenceCode: this.RequestRewardID$.getValue(),
        DocumentType: 9
      })
      .toPromise();

    const printDoc: any[] = RequestReward.map(m => ({
      DocName: `${m.RequestRewardCode}: คำร้องขอรับเงินรางวัล`,
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
    dialogRef.result.then(r => {});
    // 2 END
  }

  private buttonCancel() {
    // 1 START
    // if (confirm('ยืนยันการทำรายการหรือไม่')) {
    // 1.1
    switch (this.mode) {
      case 'C':
        this._location.back();
        break;
      case 'R':
        this.pageLoad();
        break;
    }
    // }
    // 2 END
  }
  private async buttonDelete() {
    // if (confirm('ยืนยันการทำรายการหรือไม่')) {
    const delResp: IResponseCommon = await this.requestRewardService
      .RequestRewardupdDelete({
        RequestRewardID: this.RequestRewardID$.getValue()
      })
      .toPromise();

    if (delResp.IsSuccess) {
      swal('ลบข้อมูลสำเร็จ', 'success');
    } else {
      swal('ลบข้อมูลไม่สำเร็จ', 'error');
    }
    // }
  }
  private async buttonEdit() {
    this.TitleList = await this.masTitleService
      .MasTitleMaingetAll()
      .toPromise();
    this.staffAll = await this.masStaffService.MasStaffMaingetAll().toPromise();
    this.Staff_StaffCode_List = this.staffAll.map(m => ({
      text: `${m.TitleName}${m.FirstName} ${m.LastName}`,
      value: m.StaffCode
    }));
    this.StaffList = this.staffAll.map(
      m => `${m.TitleName}${m.FirstName} ${m.LastName}`
    );
    this.MasOfficeMainList = await this.masOfficeService
      .MasOfficeMaingetAll()
      .toPromise();
    this.isEdit = true;
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  public changeForm(form: IFormChange) {
    const { FormName, FormData } = form;

    switch (FormName) {
      case 'ILG60-08-04-00-00-E08':
        this.ILG60_08_04_00_00_E08_FORM_VALID = FormData.valid;
        const FormData08 = FormData.value;
        const m08 = RequestRewardinsAllModel;
        Object.keys(m08).forEach(x => {
          m08[x] = FormData08[x] || '';
        });
        this.ILG60_08_04_00_00_E08_FORM_DATA = this.ConvObjectValue(m08);

        break;
      case 'ILG60-08-04-00-00-E12':
        this.ILG60_08_04_00_00_E12_FORM_VALID = FormData.valid;

        const mergeArrayFormData: any = [
          // ...(FormData.controls['RequestBribeRewardForm'].value || []),
          // ...(FormData.controls['RequestRewardForm'].value || []),
          // ...(FormData.controls['nonRequestRewardStaffForm'].value || []),
          ...(FormData.controls['sharedBribeRewardForm'].value || [])
        ];
        const newMapData: any[] = [];
        mergeArrayFormData.forEach(element => {
          const m12 = RequestRewardStaffModel;
          Object.keys(m12).forEach(x => {
            m12[x] = element[x] || '';
          });
          newMapData.push(this.ConvObjectValue(m12));
        });

        // console.log('mergeArrayFormData', newMapData);

        this.ILG60_08_04_00_00_E12_FORM_DATA = newMapData;
        break;
      case 'ILG60-08-04-00-00-E19':
        this.ILG60_08_04_00_00_E19_FORM_VALID = FormData.valid;
        const Documents = FormData.value.Documents;
        this.ILG60_08_04_00_00_E19_FORM_DATA = Documents;
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
        DocumentType: [9],
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
    //
    this.Document.at(i)
      .get('isDelete')
      .patchValue(true);
  }
  public emitAggregate(aggregate) {
    this.aggregate = aggregate;
  }
}
