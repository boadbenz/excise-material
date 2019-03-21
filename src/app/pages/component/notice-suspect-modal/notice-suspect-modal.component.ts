import { Suspect } from './../../notices/suspect/suspect.interface';
import { Component, OnInit, Output, EventEmitter, Injectable, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { pagination } from '../../../config/pagination';
import { appConfig } from '../../../app.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Message } from '../../../config/message';
import { PreloaderService } from '../../../shared/preloader/preloader.component';
import { NoticeMasSuspect } from './notice-mas-suspect';
import { LawbreakerTypes, EntityTypes } from 'app/models';
import { NoticeSuspect } from '../../notices/notice-suspect';
import { Router } from '@angular/router';
import { SwalComponent } from '@toverux/ngx-sweetalert2';

@Injectable()
export class NoticeSuspectService {

    constructor(private http: HttpClient) { }

    // tslint:disable-next-line:member-ordering
    private httpOptions = {
        headers: new HttpHeaders(
            {
                'Content-Type': 'application/json'
            })
    };

    async searchByKeyword(Textsearch: string): Promise<NoticeMasSuspect[]> {
        const params = JSON.stringify(Textsearch);
        const lawbreakerUrl = `${appConfig.api7788}/NoticeMasLawbreakergetByKeyword`;
        const suspectUrl = `${appConfig.api7788}/NoticeMasSuspectgetByKeyword`;
        const url = { lawbreakerUrl, suspectUrl };

        return this.response(params, url);
    }

    searchAdv(form: any): Promise<NoticeMasSuspect[]> {
        const params = JSON.stringify(form);
        const lawbreakerUrl = `${appConfig.api7788}/NoticeMasLawbreakergetByConAdv`;
        const suspectUrl = `${appConfig.api7788}/NoticeMasSuspectgetByConAdv`;
        const url = { lawbreakerUrl, suspectUrl };

        return this.response(params, url);
    }

    async countByLawbreakerId(lawbreakerId: any){
        const params = JSON.stringify({LawbreakerID:lawbreakerId});
        const suspectUrl = `${appConfig.api7788}/NoticeLawsuitResultCountgetByLawbreakerID`;
        const url = suspectUrl;

        let res = await this.http.post<any>(url, params, this.httpOptions).toPromise();

        return res[0].NoticeLawsuitResultCount;
    }

    private async response(params: string, url: any) {
      let lawbreakers = await this.http.post<any>(url.lawbreakerUrl, params, this.httpOptions).toPromise();

      if (lawbreakers.length>0) {
        let newDatas = [];
        const suspects = await this.http.post<any>(url.suspectUrl, params, this.httpOptions).toPromise();
        for(let l of lawbreakers){
            l.MistreatNo = await this.countByLawbreakerId(l.LawbreakerID);
            let entityType = l.EntityType;
            let suspectType = l.LawbreakerType;
            let idCard = l.IdCard;
            let companyRegistrationNo = l.CompanyRegistrationNo;
            let passportNo = l.PassportNo;
            let insertNew = true;
            let i = 0;
            for(let j of suspects){
                let _suspectType = j.SuspectType;
                let _idCard = j.IdCard;
                let _companyRegistrationNo = j.CompanyRegistrationNo;
                let _passportNo = j.PassportNo;
                if(entityType==1){
                    if(suspectType==1 && suspectType==_suspectType){
                        if(idCard==_idCard){
                            l.SuspectID = j.SuspectID;
                            insertNew = false;
                            suspects.splice(i, 1);
                            break;
                        }
                    }else if(suspectType==0 && suspectType==_suspectType){
                        if(passportNo==_passportNo){
                            l.SuspectID = j.SuspectID;
                            insertNew = false;
                            suspects.splice(i, 1);
                            break;
                        }
                    }
                }else if(entityType==2){
                    if(companyRegistrationNo==_companyRegistrationNo){
                        l.SuspectID = j.SuspectID;
                        insertNew = false;
                        suspects.splice(i, 1);
                        break;
                    }
                }
                i++;
            }
            newDatas.push(l); 
        }

        for(let l of suspects){
            newDatas.push(l); 
        }
        
        return newDatas;
      } else {
          const suspects = await this.http.post<any>(url.suspectUrl, params, this.httpOptions).toPromise();
          if(suspects.length>0){
            return suspects;
          }
          return new Array<NoticeMasSuspect>();
      }
    }

    private renameProp = (oldProp, newProp, { [oldProp]: old, ...others }) => {
        return { [newProp]: old, ...others };
    };
}

@Component({
  selector: 'app-notice-suspect-modal',
  templateUrl: './notice-suspect-modal.component.html',
  styleUrls: ['./notice-suspect-modal.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class NoticeSuspectModalComponent implements OnInit, OnDestroy {

    @ViewChild('alertSwal') private alertSwal: SwalComponent;

  private sub: any;
  isOpen = false;
  isCheckAll = false;
  advSearch = false;
  suspect = new Array<NoticeMasSuspect>();

  suspectTypes = LawbreakerTypes;
  entityType = EntityTypes;

  paginage: any;

  suspectFormGroup: FormGroup;

  @Output() d = new EventEmitter();
  @Output() c = new EventEmitter();
  @Output() exportSuspectData = new EventEmitter<NoticeSuspect[]>()

  get Suspect(): FormArray {
      return this.suspectFormGroup.get('Suspect') as FormArray;
  }

  constructor(
        private _router: Router,
      private suspectService: NoticeSuspectService,
      private fb: FormBuilder,
      private preloader: PreloaderService
  ) { }

  ngOnInit() {
      this.paginage = pagination;
      this.paginage.TotalItems = 0;
      this.paginage.CurrentPage = 1;
      this.paginage.PageSize = 5;
      this.suspectFormGroup = this.fb.group({
          Suspect: this.fb.array([])
      });
  }

  private setItemFormArray(array: any[], formControl: string) {
      if (array !== undefined && array.length) {
          const itemFGs = array.map(item => this.fb.group(item));
          const itemFormArray = this.fb.array(itemFGs);
          this.suspectFormGroup.setControl(formControl, itemFormArray);
      }
  }

  async onSearchByKeyword(f: any) {
      this.preloader.setShowPreloader(true)

      await this.suspectService.searchByKeyword(f).then(res => this.onComplete(res));

      this.preloader.setShowPreloader(false)
  }

  async onSearchAdv(f: any) {
      this.preloader.setShowPreloader(true)

      await this.suspectService.searchAdv(f).then(res => this.onComplete(res));

      this.preloader.setShowPreloader(false)
  }

  async onComplete(res: NoticeMasSuspect[]) {
      let datas = [];
      if (!res || res.length==0) {
          this.alertSwal.text = Message.noRecord;
          this.alertSwal.show();
      }else{
        datas = await res.map((item, i) => {
            item.RowId = i + 1;
            item.IsChecked = false;
            item.SuspectID = item.SuspectID;
  
            let suspectType = item.LawbreakerType;
            if(item.SuspectType>=0){
              suspectType = item.SuspectType;
            }
  
            item.EntityTypeName = item.EntityType?this.entityType.find(el => parseInt(el.value) == item.EntityType).text:"";
            item.SuspectTypeName = this.suspectTypes.find(el => parseInt(el.value) == suspectType).text;
            item.CompanyFullName = `${item.CompanyTitle} ${item.CompanyName}`;
            let fullname = "";
            // if(item.SuspectID){
              fullname = `${item.SuspectTitleName||item.LawbreakerTitleName||''} 
                        ${item.SuspectFirstName||item.LawbreakerFirstName||''} 
                        ${item.SuspectMiddleName||item.LawbreakerMiddleName||''} 
                        ${item.SuspectLastName||item.LawbreakerLastName||''}`;
            // }else{
            //   fullname = `${item.LawbreakerTitleName} ${item.LawbreakerFirstName} ${item.LawbreakerMiddleName} ${item.LawbreakerLastName}`;
            // }
            item.SuspectFullName = fullname;
            item.MistreatNo = item.MistreatNo?item.MistreatNo:"0";
            return item;
        });
      }

      this.suspect = datas;
      if(datas.length==0){
        this.suspectFormGroup.setControl("Suspect", this.fb.array([]));
      }
      this.paginage.TotalItems = this.suspect.length;
  }

  checkAll() {
      this.isCheckAll = !this.isCheckAll;
      this.Suspect.value.map(item => item.IsChecked = this.isCheckAll);
  }

  toggle() {
      this.advSearch = !this.advSearch;
  }

  dismiss(e: any) {
      this.d.emit(e);
  }

  close(e: any) {
      this.c.emit(e);
  }

  view(item:any):void{
    this.close('View click');
    console.log(item);
    let id = item.SuspectID;
    if(item.LawbreakerID){
        id = item.LawbreakerID;
    }
    window.open(`#/notice/suspect/R/${id}`, "_blank");
  }

  async exportData() {
      let form = this.suspectFormGroup.value.Suspect;
      form = await form.filter(item => item.IsChecked === true);
      this.exportSuspectData.emit(form);
      this.close('Save click');
  }

  async pageChanges(event: any) {
      const list = await this.suspect.slice(event.startIndex - 1, event.endIndex);
      this.setItemFormArray(list, 'Suspect')
  }

  ngOnDestroy() {
  }

  getRefer(item:any){
      item = item.value;
      if(item.EntityType==1&&(item.SuspectType==1||item.LawbreakerType==1)){
        return item.IDCard;
      }else if(item.EntityType==1&&(item.SuspectType==0||item.LawbreakerType==0)){
        return item.PassportNo;
      }else if(item.EntityType==0){
        return item.CompanyRegistrationNo;
      }else{
        return "";
      }
  }

}
