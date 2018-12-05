import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { LawbreakerTypes, EntityTypes } from 'app/models/drop-downs.model';
import * as fromModels from '../../models';
import * as fromServices from '../../services';
import { Subject } from 'rxjs/Subject';
import { Acceptability } from 'app/pages/arrests/models';
import { pagination } from 'app/config/pagination';
import { Message } from 'app/config/message';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { LoaderService } from 'app/core/loader/loader.service';
import swal from 'sweetalert2'

const SEARCHWITH = {
    ADVANCE: 'adv',
    KEYWORD: 'key'
}

@Component({
    selector: 'app-suspect-modal',
    templateUrl: './suspect-modal.component.html',
    styleUrls: ['./suspect-modal.component.scss']
})
export class SuspectModalComponent implements OnInit {

    private destroy$: Subject<boolean> = new Subject<boolean>();
    navigationSubscription;
    ACCEPTABILITY = Acceptability;

    paginage = pagination;
    lawbreakerType = LawbreakerTypes;
    entityType = EntityTypes;

    advSearch: boolean;
    suspect = new Array<fromModels.InvestigateMasSuspectModel>();

    card1 = true;

    @Output() d = new EventEmitter();
    @Output() c = new EventEmitter();
    @Output() OutputSuspect = new EventEmitter<fromModels.InvestigateDetailSuspect>();

    FG: FormGroup;

    get Suspect(): FormArray {
        return this.FG.get('Suspect') as FormArray
    }

    constructor(
        private s_masSuspect: fromServices.InvestgateMasSuspectService,
        private s_masLawbreaker: fromServices.InvestgateMasLawbreakerService,
        private loaderService: LoaderService,
        private s_invest: fromServices.InvestgateService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.FG = this.fb.group({
            Suspect: this.fb.array([])
        });
    }

    ngOnDestroy(): void {
        this.paginage.TotalItems = 0;
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }

    dismiss(e: any) {
        this.d.emit(e);
    }

    // onSearchAdv(f: any) {
    //   this.s_masSuspect.InvestigateMasSuspectgetByConAdv(f)
    //     .takeUntil(this.destroy$)
    //     .subscribe(x => this.onSearchComplete(x));
    // }

    // onSearchByKey(f: any) {
    //   this.loaderService.show();
    //   this.s_masLawbreaker.InvestigateMasLawbreakergetByKeyword(f)
    //     .then((x: fromModels.InvestigateMasLawbreakerModel[]) => {
    //       if (this.checkResponse(x)) {

    //         x.map(async l => {
    //           await this.s_invest.InvestigateLawsuitResultCountgetByLawbreakerID(l.LawbreakerID.toString())
    //             .then(law => {
    //               if (!this.checkResponse(law)) return;
    //               l.ResultCount = law.ResultCount;
    //               return l;
    //             });
    //         })

    //       };

    //       this.s_masSuspect.InvestigateMasSuspectgetByKeyword(f)
    //         .then(sus => {

    //         })
    //     })
    //   // this.s_masSuspect.InvestigateMasSuspectgetByKeyword(f)
    //   //   .takeUntil(this.destroy$)
    //   //   .subscribe(x => this.onSearchComplete(x));
    //   this.loaderService.hide();
    // }

    private async onSearchComplete(list: fromModels.InvestigateDetailSuspect[]) {
        if (!list.length) {
            swal('', Message.noRecord, 'warning');
            return;
        }

        let law = [];
        await list.filter(item => item.IsActive == 1)
            .map(async (item: fromModels.InvestigateDetailSuspect, i) => {
                item.IsActive = 1;
                item.RowId = i + 1;
                item.IsChecked = Acceptability.INACCEPTABLE;
                law.push(setViewSuspect(item));
            })

        this.suspect = law;
        // set total record
        this.paginage.TotalItems = law.length;
    }

    async onSearchByKey(form: any) {
        this.loaderService.show();
        const one = new Promise<any[]>((resolve, reject) => {
            resolve(this.response(SEARCHWITH.KEYWORD, form));
        });
        await one.then(x => this.onSearchComplete(x));
        this.loaderService.hide();
    }

    async  onSearchAdv(form: any) {
        this.loaderService.show();
        const one = new Promise<any[]>((resolve, reject) => {
            resolve(this.response(SEARCHWITH.ADVANCE, form));
        });
        await one.then(x => this.onSearchComplete(x));
        this.loaderService.hide();
    }

    private async response(searchWith: string, form: any) {

        let lawbreaker: fromModels.InvestigateMasLawbreakerModel[];
        let suspect: fromModels.InvestigateMasSuspectModel[];

        switch (searchWith) {
            case SEARCHWITH.KEYWORD:
                lawbreaker = await this.s_masLawbreaker.InvestigateMasLawbreakergetByKeyword(form)
                    .then(x => {
                        if (!this.checkResponse(x)) return [];
                        return x;
                    });
                suspect = await this.s_masSuspect.InvestigateMasSuspectgetByKeyword(form)
                    .then(x => {
                        if (!this.checkResponse(x)) return [];
                        return x;
                    });
                break;

            case SEARCHWITH.ADVANCE:
                lawbreaker = await this.s_masLawbreaker.InvestigateMasLawbreakergetByConAdv(form)
                    .then(x => {
                        if (!this.checkResponse(x)) return [];
                        return x;
                    });
                suspect = await this.s_masSuspect.InvestigateMasSuspectgetByConAdv(form)
                    .then(x => {
                        if (!this.checkResponse(x)) return [];
                        return x;
                    });
                break;
        }

        let response = [];
        if (lawbreaker.length) {
            response = await lawbreaker.map(async item => {
                await this.s_invest
                    .InvestigateLawsuitResultCountgetByLawbreakerID(item.LawbreakerID.toString())
                    .then(x => {
                        if (!this.checkResponse(x)) return;
                        item.ResultCount = x.ResultCount;
                    });
                let obj: any = item;
                obj = this.renameProp('LawbreakerID', 'SuspectID', obj);
                obj = this.renameProp('LawbreakerType', 'SuspectType', obj);
                obj = this.renameProp('LawbreakerTitleCode', 'SuspectTitleCode', obj);
                obj = this.renameProp('LawbreakerTitleName', 'SuspectTitleName', obj);
                obj = this.renameProp('LawbreakerFirstName', 'SuspectFirstName', obj);
                obj = this.renameProp('LawbreakerMiddleName', 'SuspectMiddleName', obj);
                obj = this.renameProp('LawbreakerLastName', 'SuspectLastName', obj);
                obj = this.renameProp('LawbreakerOtherName', 'SuspectOtherName', obj);
                obj = this.renameProp('LawbreakerDesc', 'SuspectDesc', obj);
                obj = setViewSuspect(obj)
                return obj;
            })
        }

        if (suspect.length) {
            await suspect.map(item => {
                item.ResultCount = null;
                let obj: any = item;
                switch (item.EntityType) {
                    case 1: // บุคคลธรรมดา
                        switch (item.SuspectType) {
                            case 0: // ต่างชาติ
                                const type0 = response.filter(x => x.PassportNo == obj.PassportNo);
                                if (!type0.length) {
                                    obj = setViewSuspect(obj);
                                    response.push(obj)
                                };
                                break;
                            case 1: // ชาวไทย
                                const type1 = response.filter(x => x.IDCard == obj.IDCard);
                                if (!type1.length) {
                                    obj = setViewSuspect(obj);
                                    response.push(obj)
                                };
                                break;
                        }

                    case 2: // นิติบุคคล
                        const entity2 = response.filter(x => x.CompanyRegistrationNo == obj.CompanyRegistrationNo);
                        if (!entity2.length) {
                            obj = setViewSuspect(obj);
                            response.push(obj)
                        };
                        break;
                }
            })
        }

        return Promise.all(response);

    }

    private renameProp = (oldProp, newProp, { [oldProp]: old, ...others }) => {
        return { [newProp]: old, ...others };
    };

    checkResponse(res: any) {
        switch (res.IsSuccess) {
            case 'False':
            case false:
                return false;
            default:
                return true;
        }
    }

    setIsChecked(i: number) {
        let law = this.Suspect;
        law.value.map((item, index) => {
            item.IsChecked = (i == index) ? Acceptability.ACCEPTABLE : Acceptability.INACCEPTABLE;
        })
    }

    private setItemFormArray(array: any[], formControl: string) {
        if (array !== undefined && array.length) {
            const itemFGs = array.map(item => this.fb.group(item));
            const itemFormArray = this.fb.array(itemFGs);
            this.FG.setControl(formControl, itemFormArray);
        }
    }

    async pageChanges(event: any) {
        const list = await this.suspect.slice(event.startIndex - 1, event.endIndex);
        this.setItemFormArray(list, 'Suspect');
    }

    closeLawbreakerDetail() {
        let law = this.Suspect;
        law.value.map(item => item.IsChecked = Acceptability.INACCEPTABLE);
        law.patchValue(law.value);
    }

    close(e: any) {
        let law = this.Suspect.value
            .filter(x => x.IsChecked == Acceptability.ACCEPTABLE)

        if (!law) return;

        this.OutputSuspect.emit(...law);

        this.c.emit(e);
    }
}

export function setViewSuspect(item: fromModels.InvestigateDetailSuspect) {
    item.SuspectTypeName = LawbreakerTypes.find(key => parseInt(key.value) == item.SuspectType).text;
    item.EntityType = item.EntityType;
    item.EntityTypeName = EntityTypes.find(key => parseInt(key.value) == item.EntityType).text;
    item.SuspectReferenceID = item.SuspectID;
    item.FullName = `${item.SuspectTitleName || ''}`;
    item.FullName += ` ${item.SuspectFirstName || ''}`;
    item.FullName += ` ${item.SuspectLastName || ''}`;
    switch (item.EntityType) {
        case 1: // บุคคลธรรมดา
            switch (item.SuspectType) {
                case 0: // ต่างชาติ
                    item.ReferenceID = item.PassportNo;
                    break;
                case 1: // ชาวไทย
                    item.ReferenceID = item.IDCard;
                    break;
            }
            break;
        case 2: // นิติบุคคล
            item.ReferenceID = item.CompanyRegistrationNo;
            break;
    }
    return item;
}
