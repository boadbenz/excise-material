import { Component, OnInit, Output, EventEmitter, Injectable, OnDestroy, ViewEncapsulation } from '@angular/core';
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
        const lawbreakerUrl = `${appConfig.api8082}/NoticeMasLawbreakergetByKeyword`;
        const suspectUrl = `${appConfig.api8082}/NoticeMasSuspectgetByKeyword`;
        const url = { lawbreakerUrl, suspectUrl };

        return this.response(params, url);
    }

    searchAdv(form: any): Promise<NoticeMasSuspect[]> {
        const params = JSON.stringify(form);
        const lawbreakerUrl = `${appConfig.api8082}/NoticeMasLawbreakergetByConAdv`;
        const suspectUrl = `${appConfig.api8082}/NoticeMasSuspectgetByConAdv`;
        const url = { lawbreakerUrl, suspectUrl };

        return this.response(params, url);
    }

    private async response(params: string, url: any) {
      const suspect = await this.http.post<any>(url.suspectUrl, params, this.httpOptions).toPromise();

      if (suspect.length) {
          return suspect;
      } else {
          alert(Message.noRecord);
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
      if (!res.length) {
          alert(Message.noRecord)
          return false;
      }

      const list = await res.map((item, i) => {
          item.RowId = i + 1;
          item.IsChecked = false;
          item.SuspectID = item.SuspectID;
          item.EntityTypeName = this.entityType.find(el => parseInt(el.value) == item.EntityType).text;
          item.SuspectTypeName = this.suspectTypes.find(el => parseInt(el.value) == item.SuspectType).text;
          item.CompanyFullName = `${item.CompanyTitle} ${item.CompanyName}`;
          item.SuspectFullName = `${item.SuspectTitleName} ${item.SuspectFirstName} ${item.SuspectLastName}`;
          item.MistreatNo = "";
          return item;
      });

      this.suspect = list;
      // set total record
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

  view(id:any):void{
    this.close('View click');
      this._router.navigate([`/notice/suspect/R/${id}`]);
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

}
