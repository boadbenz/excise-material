import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { appConfig } from "../../app.config";

@Injectable()
export class NavigationService {

    // modeSource = new BehaviorSubject<string>('');
    showAdvSearch = new BehaviorSubject<Boolean>(false);
    showNewButton = new BehaviorSubject<Boolean>(false);
    showPrevPageButton = new BehaviorSubject<Boolean>(false);
    showNextPageButton = new BehaviorSubject<Boolean>(false);
    showPrintButton = new BehaviorSubject<Boolean>(false);
    showEditButton = new BehaviorSubject<Boolean>(false);
    showSaveButton = new BehaviorSubject<Boolean>(false);
    showCancelButton = new BehaviorSubject<Boolean>(false);
    showDeleteButton = new BehaviorSubject<Boolean>(false);
    showProofButton = new BehaviorSubject<Boolean>(false);
    showSearchBar = new BehaviorSubject<Boolean>(false);
    showFieldEdit = new BehaviorSubject<Boolean>(true);
    showSendIncomeButton = new BehaviorSubject<Boolean>(false);

    onEdit = new BehaviorSubject<Boolean>(false);
    onSave = new BehaviorSubject<Boolean>(false);
    onDelete = new BehaviorSubject<Boolean>(false);
    onCancel = new BehaviorSubject<Boolean>(false);
    onSearch = new BehaviorSubject<Boolean>(false);
    onPrint = new BehaviorSubject<Boolean>(false);
    onNextPage = new BehaviorSubject<Boolean>(false);
    onPrevPage = new BehaviorSubject<Boolean>(false);
    onSendIncome = new BehaviorSubject<Boolean>(false);

    innerTextNextPageButton = new BehaviorSubject<string>(null);
    innerTextPrevPageButton = new BehaviorSubject<string>(null);
    searchByKeyword = new BehaviorSubject<any>(null);

    constructor(private httpClient: HttpClient,) { }

    private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    
     PermissionCheck(params: any): Promise<any> {
        const paramss = JSON.stringify(params);
        const url = `${appConfig.api8778}/UserAccountPermissionCheckPermission`;
        try {
          const res =  this.httpClient.post<any>(url, paramss, this.httpOptions).toPromise();
          return res;
        } catch (error) {
        //   return [];
        }
      }

    setInnerTextNextPageButton(text: string) {
        this.innerTextNextPageButton.next(text);
    }

    setInnerTextPrevPageButton(text: string) {
        this.innerTextPrevPageButton.next(text);
    }

    // -- Set Element --
    setAdvSearch() {
        if (this.showAdvSearch.getValue()) {
            this.showAdvSearch.next(false);
        } else {
            this.showAdvSearch.next(true);
        }
    }

    setEditField(status: boolean) {
        this.showFieldEdit.next(status);
    }

    setSearchBar(status: boolean) {
        this.showSearchBar.next(status);
    }

    setPrintButton(status: boolean) {
        this.showPrintButton.next(status);
    }

    setEditButton(status: boolean) {
        this.showEditButton.next(status);
    }

    setDeleteButton(status: boolean) {
        this.showDeleteButton.next(status);
    }

    setSaveButton(status: boolean) {
        this.showSaveButton.next(status);
    }

    setCancelButton(status: boolean) {
        this.showCancelButton.next(status);
    }

    setNewButton(status: boolean) {
        this.showNewButton.next(status);
    }

    setNextPageButton(status: boolean) {
        this.showNextPageButton.next(status);
    }

    setPrevPageButton(status: boolean) {
        this.showPrevPageButton.next(status);
    }

    setSendIncomeButton(status: boolean) {
        this.showSendIncomeButton.next(status);
    }

    // -- End Set Element --

    // -- Set Event --
    setOnEdit(status: boolean) {
        this.onEdit.next(status);
    }

    setOnSave(status: boolean) {
        this.onSave.next(status);
    }

    setOnDelete(status: boolean) {
        this.onDelete.next(status);
    }

    setOnCancel(status: boolean) {
        this.onCancel.next(status);
    }

    setOnSearch(textSearch: any) {
        this.searchByKeyword.next(textSearch);
    }

    setOnAdvSearch(object: any) {

    }

    setOnPrint(status: boolean) {
        this.onPrint.next(status);
    }

    setOnNextPage(status: boolean) {
        this.onNextPage.next(status);
    }

    setOnPrevPage(status: boolean) {
        this.onPrevPage.next(status);
    }

    setOnSendIncome(status: boolean): void {
        this.onSendIncome.next(status);
    }

    // -- End Set Event

}
