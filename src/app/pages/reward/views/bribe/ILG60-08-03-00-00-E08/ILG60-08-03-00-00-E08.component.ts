import { Component, OnInit } from '@angular/core';
import { CONFIG } from './CONFIG';
import { FormBuilder } from '@angular/forms';
import { RequestArrestLawsuitService } from 'app/pages/reward/services/RequestArrestLawsuit.service';
import {
  IRequestArrestLawsuitGetByIndictmentId,
  IRequestArrestLawsuit
} from 'app/pages/reward/interfaces/RequestArrestLawsuit.interface';
import { BribeService } from '../bribe.service';
import { DropdownInterface } from 'app/pages/reward/shared/interfaces/dropdown-interface';
import { IRequestCommand } from 'app/pages/reward/interfaces/RequestCommand';
import { IRequestBribe } from 'app/pages/reward/interfaces/RequestBribe.interface';
import { IRequestBribeDetail } from 'app/pages/reward/interfaces/RequestBribeDetail.interface';

interface IRequestBribeDetailCustom extends IRequestBribeDetail {
  LawbreakerName: string;
  FineTypeName: string;
  PaymentDate: string;
  Receipt: string;
  BribeMoney: number;
  NetBribeMoney: number;
}
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ILG60-08-03-00-00-E08',
  templateUrl: './ILG60-08-03-00-00-E08.component.html',
  styleUrls: ['./ILG60-08-03-00-00-E08.component.scss']
})
export class ILG6008030000E08Component extends CONFIG implements OnInit {
  public RequestCommand_NoticeCode_list: DropdownInterface[] = [];
  public tableDetail: IRequestBribeDetailCustom[] = [];
  constructor(
    private fb: FormBuilder,
    private requestArrestLawsuitService: RequestArrestLawsuitService,
    private bribeService: BribeService
  ) {
    super();
    this.RequestCommand$.subscribe((resCom: IRequestCommand[]) => {
      if (resCom) {
        const RequestCommand: IRequestCommand =
          resCom.length > 0 ? resCom[0] : {};

        this.RequestCommand_NoticeCode_list = RequestCommand.RequestCommandDetail.map(
          m => ({
            text: `${m.NoticeCode || ''}/${m.TitleName || ''} ${m.FirstName ||
              ''} ${m.LastName || ''}`,
            value: m.NoticeCode
          })
        );

        this.formGroup.controls['RequestBribeCode'].setValue('Auto Generate');
      }
    });
    this.RequestBribe$.subscribe((resBri: IRequestBribe[]) => {
      if (resBri) {
        const RequestBribe: IRequestBribe = resBri.length > 0 ? resBri[0] : {};
        this.tableDetail = RequestBribe.RequestBribeDetail.map(m => ({
          ...m,
          LawbreakerName: `${m.LawbreakerTitleName ||
            ''}${m.LawbreakerFirstName || ''} ${m.LawbreakerMiddleName || ''}
         ${m.LawbreakerLastName || ''}${m.LawbreakerOtherName || ''} `,
          FineTypeName: m.FineType === 0 ? 'เปรียบเทียบคดี' : 'ส่งฟ้องศาล',
          PaymentDate:
            m.FineType === 0 ? m.PaymentActualDate : m.PaymentDueDate,
          Receipt: m.FineType === 0 ? m.ReceiptNo : m.JudgementNo,
          BribeMoney: Number(m.PaymentFine * 0.2),
          NetBribeMoney:
            Number(
              Number(m.PaymentFine * 0.2) / Number(RequestBribe.TotalPart)
            ) * Number(RequestBribe.PartMoney)
        }));
      }
    });
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      NoticeCodeAndName: [''],
      RequestBribeCode: [''],
      Station: [''],
      RequestDate: [''],
      RequestTime: [''],
      Informeracknowledge: ['']
    });
  }
  public RequestArrestLawsuitgetByIndictmentID(
    param: IRequestArrestLawsuitGetByIndictmentId
  ) {
    this.requestArrestLawsuitService
      .RequestArrestLawsuitgetByIndictmentID(param)
      .subscribe((res: IRequestArrestLawsuit[]) => {
        this.RequestArrestLawsuit$.next(res);
      });
  }
  public total() {
    return {
      PaymentFine:
        this.tableDetail.length > 0
          ? this.tableDetail.map(m => m.PaymentFine).reduce((a, b) => (a += b))
          : 0,
      BribeMoney:
        this.tableDetail.length > 0
          ? this.tableDetail.map(m => m.BribeMoney).reduce((a, b) => (a += b))
          : 0,
      NetBribeMoney:
        this.tableDetail.length > 0
          ? this.tableDetail
              .map(m => m.NetBribeMoney)
              .reduce((a, b) => (a += b))
          : 0
    };
  }
}
