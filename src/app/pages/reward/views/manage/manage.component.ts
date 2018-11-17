import { Component, OnInit } from '@angular/core';
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
  IRequestBribeRewardinsAll
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
import { async } from 'q';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent extends ManageConfig implements OnInit {
  constructor(
    private navService: NavigationService,
    private activatedRoute: ActivatedRoute,
    private requestRewardService: RequestRewardService,
    private requestArrestLawsuitService: RequestArrestLawsuitService,
    private requestBribeRewardService: RequestBribeRewardService,
    private requestNoticeService: RequestNoticeService,
    private requestCommandService: RequestCommandService,
    private requestBribeService: RequestBribeService,
    private router: Router,
    public dialog: MatDialog
  ) {
    super();
    this.activatedRoute.params.subscribe(param => {
      this.IndictmentID$.next(param['IndictmentID']);
      this.ArrestCode$.next(param['ArrestCode']);
    });
    this.navService.onCancel.subscribe(command => {
      if (command === true) {
        this.cancelButton();
      }
    });
    this.navService.onSave.subscribe(command => {
      if (command === true) {
        this.saveButton();
      }
    });
    this.navService.onEdit.subscribe(command => {
      if (command === true) {
        this.editButton();
      }
    });

    this.navService.onDelete.subscribe(command => {
      if (command === true) {
        this.deleteButton();
      }
    });
    this.navService.onPrint.subscribe(command => {
      if (command === true) {
        this.printButton();
      }
    });
  }

  ngOnInit() {
    this.setShowButton();
    this.pageLoad();
  }
  private setShowButton() {
    this.navService.setSearchBar(false);
    this.navService.setPrintButton(false);
    this.navService.setDeleteButton(false);
    this.navService.setCancelButton(false);
    this.navService.setEditButton(false);
    this.navService.setSaveButton(false);
  }
  private pageLoad() {
    // ILG60-08-02-00-00-E01

    // 1 START
    this.RequestArrestLawsuitgetByIndictmentID({
      IndictmentID: this.IndictmentID$.getValue()
    });

    // 3
    this.RequestBribeRewardgetByIndictmentID({
      IndictmentID: this.IndictmentID$.getValue()
    });

    // 5 END
  }
  private RequestArrestLawsuitgetByIndictmentID(
    param: IRequestArrestLawsuitGetByIndictmentId
  ) {
    this.requestArrestLawsuitService
      .RequestArrestLawsuitgetByIndictmentID(param)
      .subscribe((res: IRequestArrestLawsuit[]) => {
        // 2
        this.ILG60_08_02_00_00E08_DATA$.next(res);
      });
  }

  private pageRefresh(param) {
    // ILG60-08-02-00-00-E02

    // 1 START
    switch (param) {
      // 1.1
      case 'B':
        // 1.1.1
        this.requestBribeService
          .RequestBribegetByRequestBribeRewardID({
            RequestBribeRewardID: this.RequestBribeRewardID$.getValue()
          })
          .subscribe((res: IRequestBribe[]) => {
            // 1.1.2
            // 1.1.2(1)
            if (res.length > 0) {
              // 1.1.2(1.1)
              this.ILG60_08_02_00_00E11_DATA = res;
            } else {
              // 1.1.2(2)
              // 1.1.2(2.1) => 2
            }
          });

        break;
      // 1.2
      case 'R':
        // 1.2.1
        this.requestRewardService
          .RequestRewardgetByRequestBribeRewardID({
            RequestBribeRewardID: this.RequestBribeRewardID$.getValue()
          })
          .subscribe((res: IRequestReward[]) => {
            // 1.2.2
            // 1.2.2(1)
            if (res.length > 0) {
              // 1.2.2(1.1)
              this.ILG60_08_02_00_00E14_DATA$.next(res);
            } else {
              // 1.2.2(2)
              // 1.2.2(2.1) => 2
            }
          });
        break;
    }
    // 2 END
  }

  public saveButton() {
    // ILG60-08-02-00-00-E03
    // 1 START
    this.ILG60_08_02_00_00E09_SAVE.CommandID = null;
    this.ILG60_08_02_00_00E09_SAVE.ArrestCode = this.ArrestCode$.getValue();
    this.ILG60_08_02_00_00E09_SAVE.IsActive = 1;
    // console.log('ILG60_08_02_00_00E09_SAVE', this.ILG60_08_02_00_00E09_SAVE);

    const requestBribe: IRequestBribe[] = this.ILG60_08_02_00_00E11_DATA || [];
    const requestReward: IRequestReward[] =
      this.ILG60_08_02_00_00E14_DATA$.getValue() || [];
    let ValidateVerify = false;
    if (requestBribe.length === 0 && requestReward.length > 0) {
      // 1.1
      ValidateVerify = true;
    } else if (requestReward.length === 0 && requestBribe.length > 0) {
      // 1.2
      ValidateVerify = true;
    }

    if (ValidateVerify === true) {
      // 2
      // 2.1
      this.requestCommandService
        .RequestCommandupdByCon(this.ILG60_08_02_00_00E09_SAVE)
        .subscribe((saveRes: IResponseCommon) => {
          // 3
          const responseSave = saveRes.IsSuccess;
          // 3.1
          if (!responseSave) {
            // 3.1.1
            alert('บันทึกไม่สำเร็จ');
          } else {
            // 3.2
            // 3.2.1
            alert('บันทึกสำเร็จ');

            // 3.2.2
            this.pageLoad();
          }
        });
    } else {
      alert('1.	ทำการตรวจสอบข้อมูล Input ที่นำเข้า (Validate/Verify) : False');
    }
    // 4 END
  }
  public editButton() {
    // ILG60-08-02-00-00
    // 1
    this.ILG60_08_02_00_00E09_EDIT = true;
    // 1.1

    if (this.ILG60_08_02_00_00E09_EXPANDED$.getValue() === true) {
      // 1.2 'WAIT'
    }

    // 2
    this.navService.setSearchBar(false);
    this.navService.setPrintButton(false);
    this.navService.setDeleteButton(false);
    this.navService.setCancelButton(true);
    this.navService.setEditButton(true);
    this.navService.setSaveButton(true);

    // 3 END
  }
  public deleteButton() {
    // ILG60-08-02-00-00-E07

    let RequestBribeRewardupdDeleteStatus = false;
    let RequestCommandupdDelete = false;

    // 1
    if (confirm('ยืนยันการทำรายการหรือไม่')) {
      // 1.1

      // 1.1.1
      switch (this.PageLoadHaveNotice$.getValue()) {
        // 1.1.1(1)
        case 0:
          // 1.1.1(1.1)
          this.requestBribeRewardService
            .RequestBribeRewardupdDelete({
              RequestBribeRewardID: this.RequestBribeRewardID$.getValue()
            })
            .subscribe(async (res: IResponseCommon) => {
              RequestBribeRewardupdDeleteStatus = await res.IsSuccess;
              RequestCommandupdDelete = await true;
            });
          break;

        // 1.1.1(2)
        case 1:
          // 1.1.1(2.1)
          this.requestBribeService
            .RequestBribegetByCommandID({
              CommandID: this.CommandID$.getValue()
            })
            .subscribe(async (res: IRequestBribe[]) => {
              // 1.1.1(2.2)

              if (res.length > 0) {
                // 1.1.1(2.2.2)

                // 1.1.1(2.2.2(1))
                await this.requestBribeRewardService
                  .RequestBribeRewardupdDelete({
                    RequestBribeRewardID: this.RequestBribeRewardID$.getValue()
                  })
                  .subscribe(async (resBribeR: IResponseCommon) => {
                    RequestBribeRewardupdDeleteStatus = await resBribeR.IsSuccess;
                  });

                // 1.1.1(2.2.2(2))
                await this.requestCommandService
                  .RequestCommandupdDelete({
                    CommandID: this.CommandID$.getValue()
                  })
                  .subscribe(async (resCom: IResponseCommon) => {
                    RequestCommandupdDelete = await resCom.IsSuccess;
                  });
              }
            });
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
        alert('ลบข้อมูลสำเร็จ'); // 1.1.2(1.1)
        this.router.navigate(['/reward/list']); // 1.1.2(1.1)
      } else {
        // 1.1.2(2)
        alert('ลบข้อมูลไม่สำเร็จ'); // 1.1.2(2.1)
      }
    } else {
      // 1.2
      // 1.2.1 Close
    }
    // 2 END
  }
  public cancelButton() {
    // ILG60-03-02-00-00-E04
    // 1 START
    if (confirm('ยืนยันการทำรายการหรือไม่')) {
      // 1.1
      if (this.ILG60_08_02_00_00E11_EXPANDED$.getValue() === true) {
        // 1.1.1
        // 1.1.1(1)
        const requestBribe: IRequestBribe[] = this.ILG60_08_02_00_00E11_DATA;
        if (requestBribe.length === 0) {
          // 1.1.1(1.1)
          // 1.1.1(1.1.1) => // 1.1.1(1.2)
        } else {
          // 1.1.1(1.2)
          // 1.1.1(1.2.1)
          this.pageLoad();
        }
      }

      if (this.ILG60_08_02_00_00E14_EXPANDED$.getValue() === true) {
        // 1.1.2
        // 1.1.2(1)
        const requestReward: IRequestReward[] = this.ILG60_08_02_00_00E14_DATA$.getValue();
        if (requestReward.length === 0) {
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
    } else {
      // 1.2
      // 1.2.1 'WAIT'
    }
    // 2 END
  }
  public printButton() {
    // ILG60-08-02-00-00-E05
    // 1 START
    const dialogRef = this.dialog.open(PrintDialogComponent, {
      width: '1200px',
      height: 'auto',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    // 2 END
  }
  private RequestBribeRewardgetByIndictmentID(
    param: IRequestBribeRewardgetByIndictmentID
  ) {
    // 4
    this.requestBribeRewardService
      .RequestBribeRewardgetByIndictmentID(param)
      .subscribe((res: IRequestBribeReward[]) => {
        // console.log('IRequestBribeReward', res);
        // 4.1
        if (res.length > 0) {
          const RequestBribeReward: IRequestBribeReward = res[0];

          this.PageLoadHaveNotice$.next(RequestBribeReward.HaveNotice); // นำไปใช้ใน รหัสเหตุการณ์  ILG60-03-02-00-00-E04

          // ILG60-08-02-00-00
          this.RequestBribeRewardID$.next(
            RequestBribeReward.RequestBribeRewardID
          );

          // 4.1.1
          switch (RequestBribeReward.HaveNotice) {
            // 4.1.1(1)
            case 0:
              // 4.1.1(1.1)
              this.requestRewardService
                .RequestRewardgetByRequestBribeRewardID({
                  RequestBribeRewardID: this.RequestBribeRewardID$.getValue()
                })
                .subscribe(
                  (resReward: IRequestRewardgetByRequestBribeRewardID[]) => {
                    // 4.1.1(1.2)
                    // 4.1.1(1.2.1)
                    if (resReward.length > 0) {
                      // 4.1.1(1.2.1(1))
                      this.ILG60_08_02_00_00E14_DATA$.next(resReward);

                      // 4.1.1(1.2.1(2))
                    } else {
                      // 4.1.1(1.2.2)
                      // 4.1.1(1.2.2(1)) => 4.1.1(1.3)
                    }

                    // 4.1.1(1.3)
                    this.ILG60_08_02_00_00E08_EXPANDED$.next(true);
                    // 4.1.1(1.3.1)
                    this.ILG60_08_02_00_00E09_EXPANDED$.next(false);
                    // 4.1.1(1.3.2)
                    this.ILG60_08_02_00_00E11_EXPANDED$.next(false);
                    this.ILG60_08_02_00_00E14_EXPANDED$.next(true);

                    // 4.1.1(1.4)
                    // 4.1.1(1.4.1)
                    this.ILG60_08_02_00_00E08_DISABLED$.next(false);
                    this.ILG60_08_02_00_00E09_DISABLED$.next(true);
                    this.ILG60_08_02_00_00E11_DISABLED$.next(true);
                    // 4.1.1(1.4.1)
                    this.ILG60_08_02_00_00E14_DISABLED$.next(false);

                    this.navService.setSearchBar(false);
                    this.navService.setPrintButton(true);
                    this.navService.setDeleteButton(true);
                    this.navService.setCancelButton(false);
                    this.navService.setEditButton(true);
                    this.navService.setSaveButton(false);
                  }
                );
              break;

            // 4.1.1(2)
            case 1:
              // 4.1.1(2.1)
              this.RequestBribegetByRequestBribeRewardID({
                RequestBribeRewardID: this.RequestBribeRewardID$.getValue()
              });

              // 4.1.1(2.3)
              this.requestRewardService
                .RequestRewardgetByRequestBribeRewardID({
                  RequestBribeRewardID: this.RequestBribeRewardID$.getValue()
                })
                .subscribe(
                  (resReward: IRequestRewardgetByRequestBribeRewardID[]) => {
                    // 4.1.1(2.4)
                    // 4.1.1(2.4.1)
                    if (resReward.length > 0) {
                      // 4.1.1(2.4.1(1))
                      this.ILG60_08_02_00_00E14_DATA$.next(resReward);
                      // 4.1.1(2.4.1(2)) ==> 4.1.1(2.5)
                    } else {
                      // 4.1.1(2.4.2)
                      // 4.1.1(2.4.2(1)) ==> 4.1.1(2.5)
                    }
                  }
                );

              // 4.1.1(2.5)

              this.requestCommandService
                .RequestCommandgetByArrestCode({
                  ArrestCode: this.ArrestCode$.getValue()
                })
                .subscribe((resCommand: IRequestCommand[]) => {
                  const RequestCommand: IRequestCommand = resCommand[0];
                  // 4.1.1(2.6)

                  // 4.1.1(2.6.1)
                  if (
                    RequestCommand &&
                    RequestCommand['RequestCommandDetail'].length === 1
                  ) {
                    // 4.1.1(2.6.1(1))
                    this.ILG60_08_02_00_00E08_EXPANDED$.next(true);
                    // 4.1.1(2.6.1(1.1))
                    this.ILG60_08_02_00_00E09_EXPANDED$.next(false);
                    this.ILG60_08_02_00_00E11_EXPANDED$.next(true);
                    this.ILG60_08_02_00_00E14_EXPANDED$.next(true);

                    // 4.1.1(2.6.1(2))
                    // 4.1.1(2.6.1(2.1))
                    this.ILG60_08_02_00_00E08_DISABLED$.next(false);
                    this.ILG60_08_02_00_00E09_DISABLED$.next(true);
                    // 4.1.1(2.6.1(2.2)) || 4.1.1(2.6.1(2.4))
                    this.ILG60_08_02_00_00E11_DISABLED$.next(false);
                    // 4.1.1(2.6.1(2.3)) || 4.1.1(2.6.1(2.5))
                    this.ILG60_08_02_00_00E14_DISABLED$.next(false);

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
                  } else if (
                    RequestCommand &&
                    RequestCommand['RequestCommandDetail'].length > 1
                  ) {
                    // 4.1.1(2.6.2)
                    // 4.1.1(2.6.2(1))
                    this.ILG60_08_02_00_00E09_DATA = resCommand;

                    // 4.1.1(2.6.2(2))
                    this.ILG60_08_02_00_00E08_EXPANDED$.next(true);
                    this.ILG60_08_02_00_00E09_EXPANDED$.next(true);
                    this.ILG60_08_02_00_00E11_EXPANDED$.next(true);
                    this.ILG60_08_02_00_00E14_EXPANDED$.next(true);

                    // 4.1.1(2.6.2(3))
                    // 4.1.1(2.6.2(3.1))
                    this.ILG60_08_02_00_00E08_DISABLED$.next(false);
                    // 4.1.1(2.6.2(3.2))
                    this.ILG60_08_02_00_00E09_DISABLED$.next(false);
                    // 4.1.1(2.6.2(3.3)) || 4.1.1(2.6.2(3.5))
                    this.ILG60_08_02_00_00E11_DISABLED$.next(false);
                    // 4.1.1(2.6.2(3.4)) || 4.1.1(2.6.2(3.6))
                    this.ILG60_08_02_00_00E14_DISABLED$.next(false);

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
                  }
                });

              break;
          }
        } else {
          // 4.2
          // 4.2.1
          this.requestNoticeService
            .RequestNoticegetByArrestCode({
              ArrestCode: this.ArrestCode$.getValue()
            })
            .subscribe((RequestNotice: IRequestNotice[]) => {
              // 4.2.2
              // 4.2.2(1)
              if (RequestNotice.length > 0) {
                // 4.2.2(1.1)
                this.RequestCommandinsAll({
                  // 4.2.2(1.1.1)
                  TotalPart: RequestNotice.length || 0,
                  // 4.2.2(1.1.2)
                  ArrestCode: this.ArrestCode$.getValue(),
                  // 4.2.2(1.1.3)
                  RequestCommandDetail: RequestNotice.map(m => ({
                    ...m,
                    // 4.2.2(1.1.4)
                    PartMoney: 1
                  }))
                });

                // 4.2.2(1.2)
                this.RequestBribeRewardinsAll({
                  // 4.2.2(1.2.1)
                  IndictmentID: this.IndictmentID$.getValue(),
                  // 4.2.2(1.2.2)
                  HaveNotice: 1
                });

                // 4.2.2(1.3)
                this.requestCommandService
                  .RequestCommandgetByArrestCode({
                    ArrestCode: this.ArrestCode$.getValue()
                  })
                  .subscribe((resCommand: IRequestCommand[]) => {
                    const RequestCommand: IRequestCommand = resCommand[0];
                    // 4.2.2(1.4)
                    // 4.2.2(1.4.1)
                    if (
                      RequestCommand &&
                      RequestCommand['RequestCommandDetail'].length === 1
                    ) {
                      // 4.2.2(1.4.1(1))
                      this.ILG60_08_02_00_00E08_EXPANDED$.next(true);
                      // 4.2.2(1.4.1(1.1))
                      this.ILG60_08_02_00_00E09_EXPANDED$.next(false);
                      this.ILG60_08_02_00_00E11_EXPANDED$.next(true);
                      this.ILG60_08_02_00_00E14_EXPANDED$.next(true);

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
                    } else if (
                      RequestCommand &&
                      RequestCommand['RequestCommandDetail'].length > 1
                    ) {
                      // 4.2.2(1.4.2)
                      // 4.2.2(1.4.2(1))
                      this.ILG60_08_02_00_00E09_DATA = resCommand;

                      // 4.2.2(1.4.2(2))
                      this.ILG60_08_02_00_00E08_EXPANDED$.next(true);
                      this.ILG60_08_02_00_00E09_EXPANDED$.next(true);
                      this.ILG60_08_02_00_00E11_EXPANDED$.next(true);
                      this.ILG60_08_02_00_00E14_EXPANDED$.next(true);

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
                    } else {
                      // 4.2.2(2)
                      // 4.2.2(2.1)
                      this.RequestBribeRewardinsAll({
                        // 4.2.2(2.1.1)
                        IndictmentID: this.IndictmentID$.getValue(),
                        // 4.2.2(2.1.2)
                        HaveNotice: 0
                      });

                      // 4.2.2(2.2)
                      this.ILG60_08_02_00_00E08_EXPANDED$.next(true);
                      // 4.2.2(2.2.1)
                      this.ILG60_08_02_00_00E09_EXPANDED$.next(false);
                      // 4.2.2(2.2.2)
                      this.ILG60_08_02_00_00E11_EXPANDED$.next(false);
                      this.ILG60_08_02_00_00E14_EXPANDED$.next(true);

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
                    }
                  });
              } else {
                this.RequestBribeRewardinsAll({
                  IndictmentID: this.IndictmentID$.getValue(),
                  HaveNotice: 0
                });
              }
              this.RequestNoticegetByArrestCode$.next(RequestNotice);
            });
        }
        this.RequestBribeRewardgetByIndictmentID$.next(res);
      });
  }
  private RequestNoticegetByArrestCode(param: IRequestNoticegetByArrestCode) {}
  private RequestRewardgetByRequestBribeRewardID(
    param: IRequestRewardgetByRequestBribeRewardID,
    HaveNotice: number
  ) {
    this.requestRewardService
      .RequestRewardgetByRequestBribeRewardID(param)
      .subscribe((res: IRequestRewardgetByRequestBribeRewardID[]) => {
        switch (HaveNotice) {
          case 0:
            // 4.1.1(1.2)
            // 4.1.1(1.2.1)
            if (res.length > 0) {
              // 4.1.1(1.2.1(1))
              this.ILG60_08_02_00_00E14_DATA$.next(res);

              // 4.1.1(1.2.1(2))
            } else {
              // 4.1.1(1.2.2)
              // 4.1.1(1.2.2(1)) => 4.1.1(1.3)
            }

            // 4.1.1(1.3)
            this.ILG60_08_02_00_00E08_EXPANDED$.next(true);
            // 4.1.1(1.3.1)
            this.ILG60_08_02_00_00E09_EXPANDED$.next(false);
            // 4.1.1(1.3.2)
            this.ILG60_08_02_00_00E11_EXPANDED$.next(false);
            this.ILG60_08_02_00_00E14_EXPANDED$.next(true);

            // 4.1.1(1.4)
            // 4.1.1(1.4.1)
            this.ILG60_08_02_00_00E08_DISABLED$.next(false);
            this.ILG60_08_02_00_00E09_DISABLED$.next(true);
            this.ILG60_08_02_00_00E11_DISABLED$.next(true);
            // 4.1.1(1.4.1)
            this.ILG60_08_02_00_00E14_DISABLED$.next(false);

            this.navService.setSearchBar(false);
            this.navService.setPrintButton(true);
            this.navService.setDeleteButton(true);
            this.navService.setCancelButton(false);
            this.navService.setEditButton(true);
            this.navService.setSaveButton(false);
            break;

          case 1:
            // 4.1.1(2.4)
            // 4.1.1(2.4.1)
            if (res.length > 0) {
              // 4.1.1(2.4.1(1))
              this.ILG60_08_02_00_00E14_DATA$.next(res);
              // 4.1.1(2.4.1(2)) ==> 4.1.1(2.5)
            } else {
              // 4.1.1(2.4.2)
              // 4.1.1(2.4.2(1)) ==> 4.1.1(2.5)
            }
            break;
        }
      });
  }
  private RequestCommandinsAll(param: IRequestCommandinsAll) {
    this.requestCommandService.RequestCommandinsAll(param).subscribe(res => {
      this.RequestCommandinsAll$.next(res);
    });
  }

  private RequestBribeRewardinsAll(param: IRequestBribeRewardinsAll) {
    this.requestBribeRewardService
      .RequestBribeRewardinsAll(param)
      .subscribe(res => {
        this.RequestBribeRewardinsAll$.next(res);
      });
  }
  private RequestCommandgetByArrestCode(
    param: IRequestCommandgetByArrestCode,
    event: string
  ) {
    this.requestCommandService
      .RequestCommandgetByArrestCode(param)
      .subscribe((res: IRequestCommand[]) => {
        const RequestCommand: IRequestCommand = res[0];
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
                )
              });

              // 4.2.2(1.2)
              this.RequestBribeRewardinsAll({
                // 4.2.2(1.2.1)
                IndictmentID: this.IndictmentID$.getValue(),
                // 4.2.2(1.2.2)
                HaveNotice: 1
              });

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
  ) {
    // 4.1.1(2.2)
    this.requestBribeService
      .RequestBribegetByRequestBribeRewardID(param)
      .subscribe((res: IRequestBribegetByRequestBribeRewardID[]) => {
        // 4.1.1(2.2.1)
        if (res.length > 0) {
          // 4.1.1(2.2.1(1))
          this.RequestBribegetByRequestBribeRewardID$.next(res);

          // 4.1.1(2.2.1(2))
        } else {
          // 4.1.1(2.2.2))
          // 4.1.1(2.2.2(1))) => 4.1.1(2.5)
        }
      });
  }

  public ILG60_08_02_00_00E09_RETURN($event: IRequestCommand) {
    // console.log('IRequestCommand', $event);
    this.ILG60_08_02_00_00E09_SAVE = $event;
  }
}
