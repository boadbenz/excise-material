import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageConfig } from './manage.config';
import { NavigationService } from 'app/shared/header-navigation/navigation.service';
import { RequestRewardService } from '../../services/RequestReward.service';
import { RequestArrestLawsuitService } from '../../services/RequestArrestLawsuit.service';
import {
  IRequestArrestLawsuitGetByIndictmentId,
  IRequestArrestLawsuit
} from '../../interfaces/RequestArrestLawsuit.interface';
import {
  IRequestRewardgetByRequestBribeRewardID,
  IRequestReward
} from '../../interfaces/RequestReward';
import {
  IRequestBribeRewardgetByIndictmentID,
  IRequestBribeReward,
  IRequestBribeRewardinsAll,
  IRequestBribeRewardinsAllResponse
} from '../../interfaces/RequestBribeReward.interface';
import { RequestBribeRewardService } from '../../services/RequestBribeReward.service';
import {
  IRequestNoticegetByArrestCode,
  IRequestNotice
} from '../../interfaces/RequestNotice';
import { RequestNoticeService } from '../../services/RequestNotice.service';
import { RequestCommandService } from '../../services/RequestCommand.service';
import {
  IRequestCommandinsAll,
  IRequestCommandgetByArrestCode,
  IRequestCommand
} from '../../interfaces/RequestCommand';
import { RequestBribeService } from '../../services/RequestBribe.service';
import {
  IRequestBribegetByRequestBribeRewardID,
  IRequestBribe
} from '../../interfaces/RequestBribe.interface';
import { MatDialog } from '@angular/material/dialog';
import { PrintDialogComponent } from '../../shared/print-dialog/print-dialog.component';
import { IResponseCommon } from '../../interfaces/ResponseCommon.interface';
import { SidebarService } from 'app/shared/sidebar/sidebar.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';
import { FormGroup, FormBuilder, FormControl, FormArray, FormGroupName } from '@angular/forms';
@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent extends ManageConfig implements OnInit, OnDestroy {
  ReqBribeDTL: any
  constructor(
    private navService: NavigationService,
    private activatedRoute: ActivatedRoute,
    private requestRewardService: RequestRewardService,
    private requestArrestLawsuitService: RequestArrestLawsuitService,
    private requestBribeRewardService: RequestBribeRewardService,
    private requestNoticeService: RequestNoticeService,
    private requestCommandService: RequestCommandService,
    private requestBribeService: RequestBribeService,
    private sidebarService: SidebarService,
    private router: Router,
    public dialog: NgbModal
  ) {
    super();
    this.activatedRoute.params.subscribe(param => {
      this.IndictmentID$.next(param['IndictmentID']);
      this.ArrestCode$.next(param['ArrestCode']);
      localStorage.setItem('IndictmentID', param['IndictmentID']);
      localStorage.setItem('ArrestCode', param['ArrestCode']);
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
  }

  ngOnInit() {
    this.sidebarService.setVersion('0.0.1.11');
    localStorage.setItem('programcode','ILG60-08-02');
    this.pageLoad();
  }

  private initIsEditDefault() {
    this.ILG60_08_02_00_00E09_EDIT = false;
  }
  private async pageLoad() {
    // ILG60-08-02-00-00-E01
    this.initIsEditDefault();
    // 1 START
    const RequestArrestLawsuit: IRequestArrestLawsuit[] = await this.requestArrestLawsuitService
      .RequestArrestLawsuitgetByIndictmentID({
        IndictmentID: this.IndictmentID$.getValue()
      })
      .toPromise();

    // 2
    this.ILG60_08_02_00_00E08_DATA$.next(RequestArrestLawsuit);

    // 3

    // 4
    const RequestBribeRewards: IRequestBribeReward[] = await this.requestBribeRewardService
      .RequestBribeRewardgetByIndictmentID({
        IndictmentID: this.IndictmentID$.getValue()
      })
      .toPromise();
    // console.log('IRequestBribeReward', res);
    // 4.1
    if (RequestBribeRewards.length > 0) {
      const RequestBribeReward: IRequestBribeReward = RequestBribeRewards[0];

      this.PageLoadHaveNotice$.next(RequestBribeReward.HaveNotice); // นำไปใช้ใน รหัสเหตุการณ์  ILG60-03-02-00-00-E04

      // ILG60-08-02-00-00
      this.RequestBribeRewardID$.next(RequestBribeReward.RequestBribeRewardID);

      let RequestReward: IRequestReward[];
      // 4.1.1
      switch (RequestBribeReward.HaveNotice) {
        // 4.1.1(1)
        case 0:
          // 4.1.1(1.1)
          RequestReward = await this.requestRewardService
            .RequestRewardgetByRequestBribeRewardID({
              RequestBribeRewardID: this.RequestBribeRewardID$.getValue()
            })
            .toPromise();
          // 4.1.1(1.2)
          // 4.1.1(1.2.1)
          if (RequestReward.length > 0) {
            // 4.1.1(1.2.1(1))
            this.ILG60_08_02_00_00E14_DATA$.next(RequestReward);

            // 4.1.1(1.2.1(2))
          } else {
            // 4.1.1(1.2.2)
            // 4.1.1(1.2.2(1)) => 4.1.1(1.3)
          }

          // 4.1.1(1.3)
          this.ILG60_08_02_00_00E08_EXPANDED = true;
          // 4.1.1(1.3.1)
          this.ILG60_08_02_00_00E09_DISABLED = true
          // 4.1.1(1.3.2)
          this.ILG60_08_02_00_00E11_EXPANDED = false;
          this.ILG60_08_02_00_00E14_EXPANDED = true;

          // 4.1.1(1.4)
          // 4.1.1(1.4.1)
          this.ILG60_08_02_00_00E08_DISABLED = false;
          this.ILG60_08_02_00_00E09_DISABLED = true;
          this.ILG60_08_02_00_00E11_DISABLED = true;
          // 4.1.1(1.4.1)
          this.ILG60_08_02_00_00E14_DISABLED = false;

          this.navService.setSearchBar(false);
          this.navService.setPrintButton(true);
          this.navService.setDeleteButton(true);
          this.navService.setCancelButton(false);
          this.navService.setEditButton(true);
          this.navService.setSaveButton(false);
          this.navService.setNewButton(false);
          this.navService.setEditField(false);
          this.navService.setNextPageButton(false);
          this.navService.setPrevPageButton(false);

          break;

        // 4.1.1(2)
        case 1:
          // 4.1.1(2.1)
          // 4.1.1(2.2)
          const RequestBribe: IRequestBribe[] = await this.requestBribeService
            .RequestBribegetByRequestBribeRewardID({
              RequestBribeRewardID: this.RequestBribeRewardID$.getValue()
            })
            .toPromise();
            this.ReqBribeDTL = RequestBribe[0].RequestBribeID;
            localStorage.setItem("ReqDTL",this.ReqBribeDTL)
          // 4.1.1(2.2.1)
          if (RequestBribe.length > 0) {
            // 4.1.1(2.2.1(1))
            this.ILG60_08_02_00_00E11_DATA$.next(RequestBribe);

            // 4.1.1(2.2.1(2))
          } else {
            // 4.1.1(2.2.2))
            // 4.1.1(2.2.2(1))) => 4.1.1(2.5)
          }

          // 4.1.1(2.3)
          RequestReward = await this.requestRewardService
            .RequestRewardgetByRequestBribeRewardID({
              RequestBribeRewardID: this.RequestBribeRewardID$.getValue()
            })
            .toPromise();
          // 4.1.1(2.4)
          // 4.1.1(2.4.1)
          if (RequestReward.length > 0) {
            // 4.1.1(2.4.1(1))
            this.ILG60_08_02_00_00E14_DATA$.next(RequestReward);
            // 4.1.1(2.4.1(2)) ==> 4.1.1(2.5)
          } else {
            // 4.1.1(2.4.2)
            // 4.1.1(2.4.2(1)) ==> 4.1.1(2.5)
          }

          // 4.1.1(2.5)

          const RequestCommand: IRequestCommand[] = await this.requestCommandService
            .RequestCommandgetByArrestCode({
              ArrestCode: this.ArrestCode$.getValue()
            })
            .toPromise();

          if (RequestCommand.length > 0) {
            // 4.1.1(2.6)
            this.ILG60_08_02_00_00E09_DATA$.next(RequestCommand);
            // 4.1.1(2.6.1)
            if (
              RequestCommand[0] &&
              RequestCommand[0].RequestCommandDetail.length === 1
            ) {
              // 4.1.1(2.6.1(1))
              this.ILG60_08_02_00_00E08_EXPANDED = true;
              // 4.1.1(2.6.1(1.1))
              this.ILG60_08_02_00_00E09_EXPANDED = false;
              this.ILG60_08_02_00_00E11_EXPANDED = true;
              this.ILG60_08_02_00_00E14_EXPANDED = true;

              // 4.1.1(2.6.1(2))
              // 4.1.1(2.6.1(2.1))
              this.ILG60_08_02_00_00E08_DISABLED = false;
              this.ILG60_08_02_00_00E09_DISABLED = true;
              // 4.1.1(2.6.1(2.2)) || 4.1.1(2.6.1(2.4))
              this.ILG60_08_02_00_00E11_DISABLED = false;
              // 4.1.1(2.6.1(2.3)) || 4.1.1(2.6.1(2.5))
              this.ILG60_08_02_00_00E14_DISABLED = false;

              // 4.1.1(2.6.1(3))
              this.navService.setSearchBar(false);
              // 4.1.1(2.6.1(3.1))
              this.navService.setPrintButton(true);
              // 4.1.1(2.6.1(3.2))
              this.navService.setEditButton(true);
              // 4.1.1(2.6.1(3.3))
              this.navService.setDeleteButton(true);
              this.navService.setCancelButton(false);
              this.navService.setSaveButton(false);
              this.navService.setNewButton(false);
              this.navService.setEditField(false);
              this.navService.setNextPageButton(false);
              this.navService.setPrevPageButton(false);
            } else if (
              RequestCommand[0] &&
              RequestCommand[0].RequestCommandDetail.length > 1
            ) {
              // 4.1.1(2.6.2)
              // 4.1.1(2.6.2(1))
              this.ILG60_08_02_00_00E09_DATA$.next(RequestCommand);

              // 4.1.1(2.6.2(2))
              this.ILG60_08_02_00_00E08_EXPANDED = true;
              this.ILG60_08_02_00_00E09_EXPANDED = true;
              this.ILG60_08_02_00_00E11_EXPANDED = true;
              this.ILG60_08_02_00_00E14_EXPANDED = true;

              // 4.1.1(2.6.2(3))
              // 4.1.1(2.6.2(3.1))
              this.ILG60_08_02_00_00E08_DISABLED = false;
              // 4.1.1(2.6.2(3.2))
              this.ILG60_08_02_00_00E09_DISABLED = false;
              // 4.1.1(2.6.2(3.3)) || 4.1.1(2.6.2(3.5))
              this.ILG60_08_02_00_00E11_DISABLED = false;
              // 4.1.1(2.6.2(3.4)) || 4.1.1(2.6.2(3.6))
              this.ILG60_08_02_00_00E14_DISABLED = false;

              // 4.1.1(2.6.2(4))
              // 4.1.1(2.6.2(4.1))
              this.navService.setPrintButton(true);
              // 4.1.1(2.6.2(4.2))
              this.navService.setEditButton(true);
              // 4.1.1(2.6.2(4.3))
              this.navService.setDeleteButton(true);
              this.navService.setCancelButton(false);
              this.navService.setSearchBar(false);
              this.navService.setSaveButton(false);

              this.navService.setNewButton(false);
              this.navService.setEditField(false);
              this.navService.setNextPageButton(false);
              this.navService.setPrevPageButton(false);
            }
          }

          break;
      }
    } else {
      // 4.2
      // 4.2.1
      const RequestNotice: IRequestNotice[] = await this.requestNoticeService
        .RequestNoticegetByArrestCode({
          ArrestCode: this.ArrestCode$.getValue()
        })
        .toPromise();
      // 4.2.2
      // 4.2.2(1)
      if (RequestNotice.length > 0) {
        // 4.2.2(1.1)
        const RequestCommandinsAll: IRequestCommandinsAll = await this.requestCommandService
          .RequestCommandinsAll({
            // 4.2.2(1.1.1)
            TotalPart: RequestNotice.length || 0,
            // 4.2.2(1.1.2)
            ArrestCode: this.ArrestCode$.getValue(),
            // 4.2.2(1.1.3)
            RequestCommandDetail: RequestNotice.map(m => ({
              ...m,
              // 4.2.2(1.1.4)
              PartMoney: 1
            })),
            CommandDate: this.ILG60_08_02_00_00E09_SAVE.CommandDate,
            CommandID: this.ILG60_08_02_00_00E09_SAVE.CommandID,
            CommandNo: this.ILG60_08_02_00_00E09_SAVE.CommandNo,
            CommandTime: this.ILG60_08_02_00_00E09_SAVE.CommandTime,
            IsActive: this.ILG60_08_02_00_00E09_SAVE.IsActive
          })
          .toPromise();
        this.RequestCommandinsAll$.next(RequestCommandinsAll);
        // 4.2.2(1.2)
        const RequestBribeRewardinsAll: IRequestBribeRewardinsAllResponse = await this.requestBribeRewardService
          .RequestBribeRewardinsAll({
            // 4.2.2(1.2.1)
            IndictmentID: this.IndictmentID$.getValue(),
            // 4.2.2(1.2.2)
            HaveNotice: 1,
            IsActive: 1,
            RequestBribeRewardID: this.RequestBribeRewardID$.getValue()
          })
          .toPromise();
        this.RequestBribeRewardinsAll$.next(RequestBribeRewardinsAll);

        // 4.2.2(1.3)
        const RequestCommand: IRequestCommand[] = await this.requestCommandService
          .RequestCommandgetByArrestCode({
            ArrestCode: this.ArrestCode$.getValue()
          })
          .toPromise();
        // 4.2.2(1.4)
        // 4.2.2(1.4.1)
        if (
          RequestCommand &&
          RequestCommand[0] &&
          RequestCommand[0].RequestCommandDetail.length === 1
        ) {
          // 4.2.2(1.4.1(1))
          this.ILG60_08_02_00_00E08_EXPANDED = true;
          // 4.2.2(1.4.1(1.1))
          this.ILG60_08_02_00_00E09_DISABLED = true;
          this.ILG60_08_02_00_00E11_EXPANDED = true;
          this.ILG60_08_02_00_00E14_EXPANDED = true;

          // 4.2.2(1.4.1(2))
          // 4.2.2(1.4.1(2.1)) 'WAIT'
          // 4.2.2(1.4.1(2.2)) 'WAIT'
          // 4.2.2(1.4.1(2.3)) 'WAIT'

          // 4.2.2(1.4.1(3))
          // 4.2.2(1.4.1(3.1))
          this.navService.setSaveButton(true);
          // 4.2.2(1.4.1(3.2))
          this.navService.setCancelButton(true);
          this.navService.setPrintButton(false);
          this.navService.setEditButton(false);
          this.navService.setDeleteButton(false);
          this.navService.setSearchBar(false);

          this.navService.setNewButton(false);
          this.navService.setEditField(false);
          this.navService.setNextPageButton(false);
          this.navService.setPrevPageButton(false);
        } else if (
          RequestCommand &&
          RequestCommand[0] &&
          RequestCommand[0].RequestCommandDetail.length > 1
        ) {
          // 4.2.2(1.4.2)
          // 4.2.2(1.4.2(1))
          this.ILG60_08_02_00_00E09_DATA$.next(RequestCommand);

          // 4.2.2(1.4.2(2))
          this.ILG60_08_02_00_00E08_EXPANDED = true;
          this.ILG60_08_02_00_00E09_EXPANDED = true;
          this.ILG60_08_02_00_00E11_EXPANDED = true;
          this.ILG60_08_02_00_00E14_EXPANDED = true;

          // 4.2.2(1.4.2(3))
          // 4.2.2(1.4.2(3.1)) 'WAIT'
          // 4.2.2(1.4.2(3.2)) 'WAIT'
          // 4.2.2(1.4.2(3.3)) 'WAIT'

          // 4.2.2(1.4.2(4))
          // 4.2.2(1.4.2(4.1))
          this.navService.setSaveButton(true);
          // 4.2.2(1.4.2(4.2))
          this.navService.setCancelButton(true);
          this.navService.setPrintButton(false);
          this.navService.setEditButton(false);
          this.navService.setDeleteButton(false);
          this.navService.setSearchBar(false);

          this.navService.setNewButton(false);
          this.navService.setEditField(false);
          this.navService.setNextPageButton(false);
          this.navService.setPrevPageButton(false);
        } else {
          // 4.2.2(2)
          // 4.2.2(2.1)
          const RequestBribeRewardReponse: IRequestBribeRewardinsAllResponse = await this.requestBribeRewardService
            .RequestBribeRewardinsAll({
              // 4.2.2(2.1.1)
              IndictmentID: this.IndictmentID$.getValue(),
              // 4.2.2(2.1.2)
              HaveNotice: 0,
              IsActive: 1,
              RequestBribeRewardID: ''
            })
            .toPromise();
          this.RequestBribeRewardID$.next(
            RequestBribeRewardReponse.RequestBribeRewardID
          );
          // 4.2.2(2.2)
          this.ILG60_08_02_00_00E08_EXPANDED = true;
          // 4.2.2(2.2.1)
          this.ILG60_08_02_00_00E09_EXPANDED = false;
          // 4.2.2(2.2.2)
          this.ILG60_08_02_00_00E11_EXPANDED = false;
          this.ILG60_08_02_00_00E14_EXPANDED = true;

          // 4.2.2(2.3)
          // 4.2.2(2.3.1) 'WAIT'
          // 4.2.2(2.3.2) 'WAIT'

          // 4.2.2(2.4)
          // 4.2.2(2.4.1)
          this.navService.setSaveButton(true);
          // 4.2.2(2.4.2)
          this.navService.setCancelButton(true);
          this.navService.setPrintButton(false);
          this.navService.setEditButton(false);
          this.navService.setDeleteButton(false);
          this.navService.setSearchBar(false);

          this.navService.setNewButton(false);
          this.navService.setEditField(false);
          this.navService.setNextPageButton(false);
          this.navService.setPrevPageButton(false);
        }
      } else {
        const RequestBribeReward: IRequestBribeRewardinsAllResponse = await this.requestBribeRewardService
          .RequestBribeRewardinsAll({
            IndictmentID: this.IndictmentID$.getValue(),
            HaveNotice: 0,
            IsActive: 1,
            RequestBribeRewardID: ''
          })
          .toPromise();
        this.RequestBribeRewardID$.next(
          RequestBribeReward.RequestBribeRewardID
        );
      }
      this.RequestNoticegetByArrestCode$.next(RequestNotice);
    }
    this.RequestBribeRewardgetByIndictmentID$.next(RequestBribeRewards);

    // 5 END
  }

  public async buttonSave() {
    // ILG60-08-02-00-00-E03
    // 1 START
    this.ILG60_08_02_00_00E09_SAVE.ArrestCode = this.ArrestCode$.getValue();
    this.ILG60_08_02_00_00E09_SAVE.IsActive = 1;
    // console.log('ILG60_08_02_00_00E09_SAVE', this.ILG60_08_02_00_00E09_SAVE);

    const requestBribe: IRequestBribe[] =
      this.ILG60_08_02_00_00E11_DATA$.getValue() || [];
    const requestReward: IRequestReward[] =
      this.ILG60_08_02_00_00E14_DATA$.getValue() || [];
    let ValidateVerify = false;
    if (requestBribe.length === 0 || requestReward.length > 0) {
      // 1.1
      ValidateVerify = true;
    } else if (requestReward.length === 0 || requestBribe.length > 0) {
      // 1.2
      ValidateVerify = true;
    }

    if (ValidateVerify === true) {
      // 2
      // 2.1
      const ResponseCommon: IResponseCommon = await this.requestCommandService
        .RequestCommandupdByCon(this.ILG60_08_02_00_00E09_SAVE)
        .toPromise();
      // 3
      const responseSave = ResponseCommon.IsSuccess;
      // 3.1
      if (!responseSave) {
        // 3.1.1
        swal('บันทึกไม่สำเร็จ', 'error');
      } else {
        // 3.2
        // 3.2.1
        swal('บันทึกสำเร็จ', 'success');

        // 3.2.2
        this.pageLoad();
      }
    } else {
      swal('ตรวจสอบข้อมูล Input ที่นำเข้า (Validate/Verify)', 'warning');
    }
    // 4 END
  }
  public buttonEdit() {
    // ILG60-08-02-00-00
    // 1
    this.ILG60_08_02_00_00E09_EDIT = true;
    // 1.1

    if (this.ILG60_08_02_00_00E09_EXPANDED === true) {
      // 1.2 'WAIT'
    }

    // 2
    this.navService.setSearchBar(false);
    this.navService.setPrintButton(false);
    this.navService.setDeleteButton(false);
    this.navService.setCancelButton(true);
    this.navService.setEditButton(false);
    this.navService.setSaveButton(true);
    this.navService.setNewButton(false);
    this.navService.setEditField(false);
    this.navService.setNextPageButton(false);
    this.navService.setPrevPageButton(false);
    // 3 END
  }
  public async buttonDelete() {
    // ILG60-08-02-00-00-E07

    let RequestBribeRewardupdDeleteStatus = false;
    let RequestCommandupdDelete = false;

    // 1
    // if (confirm('ยืนยันการทำรายการหรือไม่')) {
    // 1.1
    let ResponseCommonRequestBribeRewardupdDeleteStatus: IResponseCommon;
    // 1.1.1
    switch (this.PageLoadHaveNotice$.getValue()) {
      // 1.1.1(1)
      case 0:
        // 1.1.1(1.1)
        ResponseCommonRequestBribeRewardupdDeleteStatus = await this.requestBribeRewardService
          .RequestBribeRewardupdDelete({
            RequestBribeRewardID: this.RequestBribeRewardID$.getValue()
          })
          .toPromise();
        RequestBribeRewardupdDeleteStatus =
          ResponseCommonRequestBribeRewardupdDeleteStatus.IsSuccess;
        RequestCommandupdDelete = true;
        break;

      // 1.1.1(2)
      case 1:
        // 1.1.1(2.1)
        const RequestBribe: IRequestBribe[] = await this.requestBribeService
          .RequestBribegetByCommandID({
            CommandID: this.CommandID$.getValue()
          })
          .toPromise();

        // 1.1.1(2.2)

        if (RequestBribe.length > 0) {
          // 1.1.1(2.2.2)

          // 1.1.1(2.2.2(1))
          ResponseCommonRequestBribeRewardupdDeleteStatus = await this.requestBribeRewardService
            .RequestBribeRewardupdDelete({
              RequestBribeRewardID: this.RequestBribeRewardID$.getValue()
            })
            .toPromise();
          RequestBribeRewardupdDeleteStatus = await ResponseCommonRequestBribeRewardupdDeleteStatus.IsSuccess;

          // 1.1.1(2.2.2(2))
          const ResponseCommon: IResponseCommon = await this.requestCommandService
            .RequestCommandupdDelete({
              CommandID: this.CommandID$.getValue()
            })
            .toPromise();
          RequestCommandupdDelete = ResponseCommon.IsSuccess;
        }
        break;
    }

    // 1.1.2
    if (
      !(
        RequestBribeRewardupdDeleteStatus === false ||
        RequestCommandupdDelete === false
      )
    ) {
      // 1.1.2(1)
      swal('ลบข้อมูลสำเร็จ', 'success'); // 1.1.2(1.1)
      this.router.navigate(['/reward/list']); // 1.1.2(1.1)
    } else {
      // 1.1.2(2)
      swal('ลบข้อมูลไม่สำเร็จ', 'error'); // 1.1.2(2.1)
    }
    // } else {
    // 1.2
    // 1.2.1 Close
    // }
    // 2 END
  }
  public buttonCancel() {
    // ILG60-03-02-00-00-E04
    // 1 START
    // if (confirm('ยืนยันการทำรายการหรือไม่')) {
    // 1.1
    if (this.ILG60_08_02_00_00E11_EXPANDED === true) {
      // 1.1.1
      // 1.1.1(1)
      const requestBribe: IRequestBribe[] =
        this.ILG60_08_02_00_00E11_DATA$.getValue() || [];
      if (requestBribe.length === 0) {
        // 1.1.1(1.1)
        // 1.1.1(1.1.1) => // 1.1.1(1.2)
      }
      // 1.1.1(1.2)
      // 1.1.1(1.2.1)
      this.pageLoad();
    }

    if (this.ILG60_08_02_00_00E14_EXPANDED === true) {
      // 1.1.2
      // 1.1.2(1)
      const requestReward: IRequestReward[] = this.ILG60_08_02_00_00E14_DATA$.getValue();
      if (requestReward && requestReward.length === 0) {
        // 1.1.2(1.1)
        // 1.1.2(1.1.2)
        switch (this.PageLoadHaveNotice$.getValue()) {
          // 1.1.2(1.1.2(1))
          case 0:
            // 1.1.2(1.1.2(1.1))
            this.requestBribeRewardService.RequestBribeRewardupdDelete({
              RequestBribeRewardID: this.RequestBribeRewardID$.getValue()
            });
            // 1.1.2(1.1.2(1.2))
            this.router.navigate(['/reward/list']);
            break;

          // 1.1.2(1.1.2(2))
          case 1:
            // 1.1.2(1.1.2(2.1))
            this.requestBribeService
              .RequestBribegetByCommandID({
                CommandID: this.CommandID$.getValue()
              })
              .subscribe((res: IRequestBribe[]) => {
                // 1.1.2(1.1.2(2.2))
                if (res.length > 0) {
                  // 1.1.2(1.1.2(2.2.1))
                  // 1.1.2(1.1.2(2.2.1.1))
                  this.requestBribeRewardService
                    .RequestBribeRewardupdDelete({
                      RequestBribeRewardID: this.RequestBribeRewardID$.getValue()
                    })
                    .subscribe();
                } else {
                  // 1.1.2(1.1.2(2.2.2))
                  // 1.1.2(1.1.2(2.2.2.1))
                  this.requestBribeRewardService
                    .RequestBribeRewardupdDelete({
                      RequestBribeRewardID: this.RequestBribeRewardID$.getValue()
                    })
                    .subscribe();

                  // 1.1.2(1.1.2(2.2.2.2))
                  this.requestCommandService
                    .RequestCommandupdDelete({
                      CommandID: this.CommandID$.getValue()
                    })
                    .subscribe();
                }
              });

            // 1.1.2(1.1.2(2.3))
            this.router.navigate(['/reward/list']);
            break;
        }
      } else {
        // 1.1.2(1.2)
        // 1.1.2(1.2.1)
        this.pageLoad();
      }
    }
    // } else {
    //   // 1.2
    //   // 1.2.1 'WAIT'
    // }
    // 2 END
  }
  public async buttonPrint() {
    // ILG60-08-02-00-00-E05
    // 1 START

    // 1.1
    const RequestBribe: IRequestBribe[] = await this.requestBribeService
      .RequestBribegetByRequestBribeRewardID({
        RequestBribeRewardID: this.RequestBribeRewardID$.getValue()
      })
      .toPromise();
      console.log("++++RequestBribe : ",RequestBribe)

    // 1.2
    const RequestReward: IRequestReward[] = await this.requestRewardService
      .RequestRewardgetByRequestBribeRewardID({
        RequestBribeRewardID: this.RequestBribeRewardID$.getValue()
      })
      .toPromise();
      console.log("++++RequestReward  : ",RequestReward)

    const printDocRequestBribe: any[] = RequestBribe.map(m => ({
      DocName: `${m.RequestBribeCode || ''}: คำร้องขอรับเงินสินบน`,
      DocType: 'แบบฟอร์ม', RequestBribeID:`${m.RequestBribeID}`, checked: false, TypeName: "RB"
    }));

    const printDocRequestReward: any[] = RequestReward.map(m => ({
      DocName: `${m.RequestRewardCode || ''}: คำร้องขอรับเงินรางวัล`,
      DocType: 'แบบฟอร์ม', RequestRewardID:`${m.RequestRewardID}`, checked: false, TypeName: "RR"
    }));
    const printDoc = [...printDocRequestBribe, ...printDocRequestReward];

    const dialogRef = this.dialog.open(PrintDialogComponent, {
      backdrop: 'static', size: 'lg'
    });
    dialogRef.componentInstance.data = printDoc;
    dialogRef.result.then(res => {});
    // 2 END
  }
  private RequestBribeRewardgetByIndictmentID(
    param: IRequestBribeRewardgetByIndictmentID
  ) {}
  private RequestCommandinsAll(param: IRequestCommandinsAll) {}
  private RequestCommandgetByArrestCode(
    param: IRequestCommandgetByArrestCode,
    event: string
  ) {
    this.requestCommandService
      .RequestCommandgetByArrestCode(param)
      .subscribe(async (res: IRequestCommand[]) => {
        switch (event) {
          case '4.1.1(2.5)':
            break;

          case '4.2.2':
            // 4.2.2(1)
            if (res.length > 0) {
              // 4.2.2(1.1)
              this.RequestCommandinsAll({
                // 4.2.2(1.1.1)
                TotalPart: res.length || 0,
                // 4.2.2(1.1.2)
                ArrestCode: this.ArrestCode$.getValue(),
                // 4.2.2(1.1.3)
                RequestCommandDetail: this.RequestNoticegetByArrestCode$.getValue().map(
                  m => ({
                    ...m,
                    // 4.2.2(1.1.4)
                    PartMoney: 1
                  })
                ),
                CommandDate: this.ILG60_08_02_00_00E09_SAVE.CommandDate,
                CommandID: this.ILG60_08_02_00_00E09_SAVE.CommandID,
                CommandNo: this.ILG60_08_02_00_00E09_SAVE.CommandNo,
                CommandTime: this.ILG60_08_02_00_00E09_SAVE.CommandTime,
                IsActive: this.ILG60_08_02_00_00E09_SAVE.IsActive
              });

              // 4.2.2(1.2)
              const RequestBribeReward: IRequestBribeRewardinsAllResponse = await this.requestBribeRewardService
                .RequestBribeRewardinsAll({
                  IndictmentID: this.IndictmentID$.getValue(),
                  HaveNotice: 1,
                  IsActive: 1,
                  RequestBribeRewardID: ''
                })
                .toPromise();
              this.RequestBribeRewardID$.next(
                RequestBribeReward.RequestBribeRewardID
              );
              // 4.2.2(1.3)
              this.RequestCommandgetByArrestCode(
                {
                  ArrestCode: this.ArrestCode$.getValue()
                },
                '4.2.2(1.3)'
              );
            }
            break;
          case '4.2.2(1.3)':
            break;
        }
      });
  }

  private RequestBribegetByRequestBribeRewardID(
    param: IRequestBribegetByRequestBribeRewardID
  ) {}
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  public ILG60_08_02_00_00E09_RETURN($event: IRequestCommand) {
    // console.log('IRequestCommand', $event);
    this.ILG60_08_02_00_00E09_SAVE = $event;
  }
}
