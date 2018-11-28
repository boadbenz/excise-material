import { Injectable, HostListener } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { appConfig } from '../../app.config';
//model
import { AdjustList, AdjustArrest, AdjustDetail, AdjustReceipt, AdjustFine, AdjustStaff} from './model';
@Injectable()
export class ReductionService {

constructor(private http: HttpClient) { }
    private httpOptions = {
        headers: new HttpHeaders(
            {
                'Content-Type': 'application/json'
            })
    };
///////////////////
    AdjustListgetByKeyword(Textsearch: string) {
        const params = Textsearch;
        const url = `${appConfig.api8882}/AdjustListgetByKeyword`;
        return this.http.post<AdjustList[]>(url, params, this.httpOptions);
    }

    async AdjustListgetByConAdv(form: any): Promise<any> {
        debugger
        const params = JSON.stringify(form);
        const url = `${appConfig.api8882}/AdjustListgetByConAdv`;
    
        try {
          const res = await this.http.post<AdjustList[]>(url, params, this.httpOptions).toPromise();
          return res as any;
        } catch (error) {
          // await alert(error);
          return [];
        }
    }
/////////////////// 
    async AdjustArrestgetByCon(form: any): Promise<any> {
        debugger
        const params = JSON.stringify(form);
        const url = `${appConfig.api8882}/AdjustArrestgetByCon`;
    
        try {
          const res = await this.http.post<AdjustArrest[]>(url, params, this.httpOptions).toPromise();
          return res as any;
        } catch (error) {
          // await alert(error);
          return [];
        }
    }

    async AdjustDetailgetByCon(form: any): Promise<any> {
        debugger
        const params = JSON.stringify(form);
        const url = `${appConfig.api8882}/AdjustDetailgetByCon`;
    
        try {
          const res = await this.http.post<AdjustDetail[]>(url, params, this.httpOptions).toPromise();
          return res as any;
        } catch (error) {
          // await alert(error);
          return [];
        }
    }

    async AdjustDetailgetByCompareDetailId(form: any): Promise<any> {
        debugger
        const params = JSON.stringify(form);
        const url = `${appConfig.api8882}/AdjustDetailgetByCompareDetailId`;
    
        try {
          const res = await this.http.post<AdjustDetail[]>(url, params, this.httpOptions).toPromise();
          return res as any;
        } catch (error) {
          // await alert(error);
          return [];
        }
    }

    async AdjustDetailupdByCon(form: any): Promise<any> {
        debugger
        const params = JSON.stringify(form);
        const url = `${appConfig.api8882}/AdjustDetailupdByCon`;
    
        try {
          const res = await this.http.post(url, params, this.httpOptions).toPromise();
          return res as any;
        } catch (error) {
          // await alert(error);
          return [];
        }
    }
/////////////////////////////
    async AdjustReceiptgetByCon(form: any): Promise<any> {
        debugger
        const params = JSON.stringify(form);
        const url = `${appConfig.api8882}/AdjustReceiptgetByCon`;

        try {
        const res = await this.http.post<AdjustReceipt>(url, params, this.httpOptions).toPromise();
        return res as any;
        } catch (error) {
        // await alert(error);
        return [];
        }
    }

    async AdjustReceiptgetByCompareDetail(form: any): Promise<any> {
        debugger
        const params = JSON.stringify(form);
        const url = `${appConfig.api8882}/AdjustReceiptgetByCompareDetail`;

        try {
        const res = await this.http.post<AdjustReceipt>(url, params, this.httpOptions).toPromise();
        return res as any;
        } catch (error) {
        // await alert(error);
        return [];
        }
    }

    async AdjustReceiptupdDelete(form: any): Promise<any> {
        debugger
        const params = JSON.stringify(form);
        const url = `${appConfig.api8882}/AdjustReceiptupdDelete`;

        try {
        const res = await this.http.post(url, params, this.httpOptions).toPromise();
        return res as any;
        } catch (error) {
        // await alert(error);
        return [];
        }
    }

    async AdjustReceiptinsAll(form: any): Promise<any> {
        debugger
        const params = JSON.stringify(form);
        const url = `${appConfig.api8882}/AdjustReceiptinsAll`;

        try {
        const res = await this.http.post(url, params, this.httpOptions).toPromise();
        return res as any;
        } catch (error) {
        // await alert(error);
        return [];
        }
    }
/////////////////
    async AdjustFinegetByCon(form: any): Promise<any> {
        debugger
        const params = JSON.stringify(form);
        const url = `${appConfig.api8882}/AdjustFinegetByCon`;

        try {
        const res = await this.http.post<AdjustFine>(url, params, this.httpOptions).toPromise();
        return res as any;
        } catch (error) {
        // await alert(error);
        return [];
        }
    }

    async AdjustFineinsAll(form: any): Promise<any> {
        debugger
        const params = JSON.stringify(form);
        const url = `${appConfig.api8882}/AdjustFineinsAll`;

        try {
        const res = await this.http.post(url, params, this.httpOptions).toPromise();
        return res as any;
        } catch (error) {
        // await alert(error);
        return [];
        }
    }

    async AdjustFineupdByCon(form: any): Promise<any> {
        debugger
        const params = JSON.stringify(form);
        const url = `${appConfig.api8882}/AdjustFineupdByCon`;

        try {
        const res = await this.http.post(url, params, this.httpOptions).toPromise();
        return res as any;
        } catch (error) {
        // await alert(error);
        return [];
        }
    }

    async AdjustFinecheckComplete(form: any): Promise<any> {
        debugger
        const params = JSON.stringify(form);
        const url = `${appConfig.api8882}/AdjustFinecheckComplete`;

        try {
        const res = await this.http.post(url, params, this.httpOptions).toPromise();
        return res as any;
        } catch (error) {
        // await alert(error);
        return [];
        }
    }

    async AdjustFineupdDelete(form: any): Promise<any> {
        debugger
        const params = JSON.stringify(form);
        const url = `${appConfig.api8882}/AdjustFineupdDelete`;

        try {
        const res = await this.http.post(url, params, this.httpOptions).toPromise();
        return res as any;
        } catch (error) {
        // await alert(error);
        return [];
        }
    }
//////////////////////////////////////
    async AdjustinsAll(form: any): Promise<any> {
        debugger
        const params = JSON.stringify(form);
        const url = `${appConfig.api8882}/AdjustinsAll`;

        try {
        const res = await this.http.post(url, params, this.httpOptions).toPromise();
        return res as any;
        } catch (error) {
        // await alert(error);
        return [];
        }
    }

    async AdjustStaffupdDelete(form: any): Promise<any> {
        debugger
        const params = JSON.stringify(form);
        const url = `${appConfig.api8882}/AdjustStaffupdDelete`;

        try {
        const res = await this.http.post(url, params, this.httpOptions).toPromise();
        return res as any;
        } catch (error) {
        // await alert(error);
        return [];
        }
    }

    async AdjustStaffgetByCon(form: any): Promise<any> {
        debugger
        const params = JSON.stringify(form);
        const url = `${appConfig.api8882}/AdjustStaffgetByCon`;

        try {
        const res = await this.http.post<AdjustStaff>(url, params, this.httpOptions).toPromise();
        return res as any;
        } catch (error) {
        // await alert(error);
        return [];
        }
    }
}
