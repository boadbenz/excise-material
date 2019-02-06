import { Injectable } from "@angular/core";
import { appConfig } from "../../app.config";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Lawsuit } from "./models/lawsuit";
import { Arrest } from "../model/arrest";
import { LoaderService } from "app/core/loader/loader.service";
import { Notice } from "../notices/notice";
import { StringifyOptions } from "querystring";

@Injectable()
export class LawsuitService {

  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(
    private http: HttpClient,
    private loaderService: LoaderService
    ) { }

  private async responsePromiseGetWithStatus(params: string, url: string) {
    const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
    if (!res.IsSuccess || !(res.ResponseData || []).length) { return []; }
    return res.ResponseData
  }

  private async responsePromiseGetWithoutStatus(params: string, url: string) {
    return await this.http.post<any>(url, params, this.httpOptions).toPromise() || [];
  }

  private async responseGetMethod(params: string, url: string) {
    const getUrl = url

    return await this.http.get<any>(getUrl).toPromise() || [];
  }

  async getByKeywordOnInt(): Promise<Lawsuit[]> {
    const params = { 'Textsearch': '' };
    const url = `${appConfig.apiUrl}/LawsuitgetByKeyword`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
    // const params = {
    //   'ArrestCode': ''
    //   , 'LawsuitNo': ''
    //   , 'LawsuitDateFrom': ''
    //   , 'LawsuitDateTo': ''
    //   , 'StaffName': ''
    //   , 'OfficeName': '' };
    // const url = `${appConfig.apiUrl}/LawsuitgetByConAdv`;
    // return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url)
  }

  getByKeyword(Textsearch: any): Promise<Lawsuit[]> {
    const params = Textsearch === '' ? { 'Textsearch': '' } : Textsearch;
    const url = `${appConfig.apiUrl}/LawsuitgetByKeyword`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url)
  }
  async LawsuitArrestGetByKeyword(Textsearch: any): Promise<Lawsuit[]> {
    const params = Textsearch === '' ? { 'Textsearch': '' } : Textsearch;
    const url = `${appConfig.apiUrl}/LawsuitArrestgetByKeyword`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url)
  }

  async LawsuitgetByConAdv(form: any): Promise<Lawsuit[]> {
    const url = `${appConfig.apiUrl}/LawsuitgetByConAdv`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(form), url)
  }

  async LawsuitArrestGetByConAdv(form: any): Promise<Lawsuit[]> {
    const url = `${appConfig.apiUrl}/LawsuitArrestgetByConAdv`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(form), url)
  }

  async ArrestgetByCon(ArrestCode) {
    const params = { ArrestCode: ArrestCode };
    const url = `${appConfig.apiUrl}/ArrestgetByCon`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }

  async LawsuitArrestupdDeleteLawsuit(ArrestCode: any, IndictmentID: Number) {
    const params = {
      ArrestCode: ArrestCode,
      IndictmentID: IndictmentID
    };
    const url = `${appConfig.apiUrl}/LawsuitArrestupdDeleteLawsuit`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }

  async LawsuitArrestIndicmentDetailgetByCon(indictmentDetailID: string) {
    const params = { IndictmentDetailID: indictmentDetailID };
    const url = `${appConfig.apiUrl}/LawsuitArrestIndicmentDetailgetByCon`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }

  async LawsuitgetByCon(LawsuitID) {
    const params = { LawsuitID: LawsuitID };
    const url = `${appConfig.apiUrl}/LawsuitgetByCon`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }

  async LawsuitArrestGetByCon(IndictmentID) {
    const params = { IndictmentID: IndictmentID };
    const url = `${appConfig.apiUrl}/LawsuitArrestgetByCon`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }

  async LawsuitArrestIndictmentProductgetByIndictmentID(IndictmentID) {
    const params = { IndictmentID: IndictmentID };
    const url = `${appConfig.apiUrl}/LawsuitArrestIndictmentProductgetByIndictmentID`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }

  async CompareMasLawgetByCon(GuiltBaseID) {
    const params = { GuiltBaseID: GuiltBaseID };
    const url = `${appConfig.apiUrl}/CompareMasLawgetByCon`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }

  async LawsuitArrestgetByCon(IndictmentID) {
    const params = { IndictmentID: IndictmentID };
    const url = `${appConfig.apiUrl}/LawsuitArrestgetByCon`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }

  async MasDocumentMaingetAll(DocumentType: any, ReferenceCode: any) {
    const params = { DocumentType, ReferenceCode };
    const url = `${appConfig.apiUrl}/MasDocumentMaingetAll`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }

  async MasDocumentMaingetinsAll(document: any) {
    const params = document;
    const url = `${appConfig.apiUrl}/MasDocumentMaininsAll`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }


  async MasDocumentMaingetAllString(documentType: DocumentType, ReferenceCode: string) {
    const params = { DocumentType: documentType, ReferenceCode: ReferenceCode };
    const url = `${appConfig.apiUrl}/MasDocumentMaingetAll`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }

  async LawsuitVerifyLawsuitNo(LawsuitNo: string, OfficeCode: string, IsOutside: number) {
    const params = { LawsuitNo: LawsuitNo, OfficeCode: OfficeCode, IsOutside: IsOutside };
    const url = `${appConfig.apiUrl}/LawsuitVerifyLawsuitNo`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }

  async LawsuitinsAll(lawsuitForm) {
    console.log('lawsuitForm==>', lawsuitForm)
    const url = `${appConfig.apiUrl}/LawsuitinsAll `;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(lawsuitForm), url);
  }

  async MasStaffMaingetAll() {
    const params = {};
    const url = `${appConfig.apiUrl}/MasStaffMaingetAll`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }

  async MasOfficeMaingetAll() {
    const params = {};
    const url = `${appConfig.apiUrl}/MasOfficeMaingetAll`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }

  async LawsuitPaymentFinegetByJudgementID(JudgementID) {
    const params = { JudgementID: JudgementID };
    const url = `${appConfig.apiUrl}/LawsuitPaymentFinegetByJudgementID`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }

  async LawsuitJudgementupdDelete(JudgementID) {
    const params = { JudgementID: JudgementID };
    const url = `${appConfig.apiUrl}/LawsuitJudgementupdDelete`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }

  async LawsuitJudgementupdByCon(Judgement) {
    const url = `${appConfig.apiUrl}/LawsuitJudgementupdByCon`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(Judgement), url);
  }

  async LawsuitPaymentFineDetailupdDelete(PaymentFineID) {
    const params = { PaymentFineID: PaymentFineID };
    const url = `${appConfig.apiUrl}/LawsuitPaymentFineDetailupdDelete`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }

  async LawsuitPaymentFineDetailinsAll(Payment) {
    const url = `${appConfig.apiUrl}/LawsuitPaymentFineDetailinsAll`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(Payment), url);
  }

  async LawsuitJudgementinsAll(lawsuitForm) {
    const url = `${appConfig.apiUrl}/LawsuitJudgementinsAll`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(lawsuitForm), url);
  }
  async LawsuitArrestIndicmentupdByCon(IndictmentID) {
    const params = { IndictmentID: IndictmentID };
    const url = `${appConfig.apiUrl}/LawsuitArrestIndictmentupdByCon`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }

  async LawsuitformupdByCon(lawsuitForm) {
    const url = `${appConfig.apiUrl}/LawsuitupdByCon`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(lawsuitForm), url);
  }

  async MasDocumentMaininsAll(DocumentType, ReferenceCode) {
    const params = {
      DocumentType: DocumentType,
      ReferenceCode: ReferenceCode
    };
    const url = `${appConfig.apiUrl}/LawsuitupdByCon`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }
  // async MasStaffMaingetAll() {
  //   const params = {};
  //   const url = `${appConfig.apiUrl}/MasStaffMaingetAll`;
  //   return await this.http.post<any>(url, this.httpOptions).toPromise();
  // }
  // async MasOfficeMaingetAll() {
  //   const params = {};
  //   const url = `${appConfig.apiUrl}/MasOfficeMaingetAll`;
  //   return await this.http.get<any>(url, this.httpOptions).toPromise();
  // }


  async getByArrestCon(ArrestCode: string): Promise<Arrest> {
    const params = { ArrestCode };
    const url = `${appConfig.apiUrl}/ArrestgetByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res.ResponseData as Arrest;
    } catch (error) {
      await alert(error);
    }
  }

  async ArrestLawbreakergetByCon(LawbreakerID) {
    const params = { LawbreakerID: LawbreakerID };
    const url = `${appConfig.apiUrl}/ArrestLawbreakergetByCon`;
    return await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
  }

  async LawsuitupdByCon(LawsuitID, LawsuitNo) {
    const params = { LawsuitID: LawsuitID, LawsuitNo: LawsuitNo };
    const url = `${appConfig.apiUrl}/LawsuitupdByCon`;
    return await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
  }

  async LawsuitupdDelete(LawsuitID) {
    const params = { LawsuitID: LawsuitID };
    const url = `${appConfig.apiUrl}/LawsuitupdDelete`;
    return await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
  }

  async LawsuitCompareDocumentgetByCon(LawsuitID) {
    const params = { LawsuitID: LawsuitID };
    const url = `${appConfig.apiUrl}/LawsuitCompareDocumentgetByCon`;
    return await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
  }

  async LawsuitComparegetByLawsuitID(LawsuitID) {
    const params = { LawsuitID: LawsuitID };
    const url = `${appConfig.apiUrl}/LawsuitComparegetByLawsuitID`;
    return await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
  }

  async LawsuitProvegetByLawsuitID(LawsuitID) {
    const params = { LawsuitID: LawsuitID };
    const url = `${appConfig.apiUrl}/LawsuitProvegetByLawsuitID`;
    return await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
  }

  async LawsuitArrestCheckNotComplete(ArrestCode) {
    const params = { ArrestCode: ArrestCode };
    const url = `${appConfig.apiUrl}/LawsuitArrestCheckNotComplete`;
    return await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
  }

  async LawsuitArrestIndicmentDetailupdByCon(IndictmentDetailID, LawsuitType, LawsuitEnd) {
    const params = {
      IndictmentDetailID: IndictmentDetailID,
      LawsuitType: LawsuitType,
      LawsuitEnd: LawsuitEnd
    };
    const url = `${appConfig.apiUrl}/LawsuitArrestIndicmentDetailupdByCon`;
    return await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
  }
  async LawsuitArrestupdByCon(ArrestCode) {
    const params = {
      ArrestCode: ArrestCode,
    };
    const url = `${appConfig.apiUrl}/LawsuitArrestupdByCon`;
    return await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
  }
  async MasCourtMaingetAll() {
    const params = {};
    const url = `${appConfig.apiUrl}/MasCourtMaingetAll`;
    return await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
  }

  LawsuitReportArrestgetByCon(IndictmentID) {
    const params = { IndictmentID };
    const url = `${appConfig.apiReport}/ILG60_00_04_001.aspx`;
    return this.http.post(url, params, { ...this.httpOptions, responseType: 'blob' })
      .map(x => x)

  }
  // async getByKeyword(filterValue) {
  //   const params = JSON.stringify(filterValue);
  //   const url = `${appConfig.apiUrl}/LawsuitgetByKeyword`;
  //   const res = await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
  //   try {
  //     const res = await this.http
  //       .post(url, params, this.httpOptions)
  //       .toPromise();
  //     return res.json();
  //   } catch (error) {
  //     await alert(error);
  //   }
  // }
  //
  // async LawSuitgetByConAdv(advForm) {
  //   const params = JSON.stringify({ advForm });
  //   const url = `${appConfig.apiUrl}/LawSuitgetByConAdv`;
  //   try {
  //     const res = await this.http
  //       .post(url, params, this.httpOptions)
  //       .toPromise();
  //     return res.json();
  //   } catch (error) {
  //     await alert(error);
  //   }
  // }
  //
  // async LawsuitArrestgetByCon(ArrestCode) {
  //   const params = JSON.stringify({ ArrestCode: ArrestCode });
  //   const url = `${appConfig.apiUrl}/LawsuitArrestgetByCon`;
  //   try {
  //     const res = await this.http
  //       .post(url, params, this.httpOptions)
  //       .toPromise();
  //     return res.json();
  //   } catch (error) {
  //     await alert(error);
  //   }
  // }
  //
  // async LawsuitgetByCon(LawsuitID) {
  //   const params = JSON.stringify({ LawsuitID: LawsuitID });
  //   const url = `${appConfig.apiUrl}/LawsuitgetByCon`;
  //   try {
  //     const res = await this.http
  //       .post(url, params, this.httpOptions)
  //       .toPromise();
  //     return res.json();
  //   } catch (error) {
  //     await alert(error);
  //   }
  // }
  //
  // async ArrestgetByCon(ArrestCode) {
  //   const params = JSON.stringify({ ArrestCode: ArrestCode });
  //   const url = `${appConfig.apiUrl}/ArrestgetByCon`;
  //   try {
  //     const res = await this.http
  //       .post(url, params, this.httpOptions)
  //       .toPromise();
  //     return res.json();
  //   } catch (error) {
  //     await alert(error);
  //   }
  // }
  //
  // async CompareMasLawgetByCon(GuiltBaseID) {
  //   const params = JSON.stringify({ GuiltBaseID: GuiltBaseID });
  //   const url = `${appConfig.apiUrl}/CompareMasLawgetByCon`;
  //   try {
  //     const res = await this.http
  //       .post(url, params, this.httpOptions)
  //       .toPromise();
  //     return res.json();
  //   } catch (error) {
  //     await alert(error);
  //   }
  // }


}
