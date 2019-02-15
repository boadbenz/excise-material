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
    const url = `${appConfig.api8777}/LawsuitgetByKeyword`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
    // const params = {
    //   'ArrestCode': ''
    //   , 'LawsuitNo': ''
    //   , 'LawsuitDateFrom': ''
    //   , 'LawsuitDateTo': ''
    //   , 'StaffName': ''
    //   , 'OfficeName': '' };
    // const url = `${appConfig.api8777}/LawsuitgetByConAdv`;
    // return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url)
  }

  getByKeyword(Textsearch: any): Promise<Lawsuit[]> {
    const params = Textsearch === '' ? { 'Textsearch': '' } : Textsearch;
    const url = `${appConfig.api8777}/LawsuitgetByKeyword`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url)
  }
  async LawsuitArrestGetByKeyword(Textsearch: any): Promise<Lawsuit[]> {
    const params = Textsearch === '' ? { 'Textsearch': '' } : Textsearch;
    const url = `${appConfig.api8777}/LawsuitArrestgetByKeyword`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url)
  }

  async LawsuitgetByConAdv(form: any): Promise<Lawsuit[]> {
    const url = `${appConfig.api8777}/LawsuitgetByConAdv`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(form), url)
  }

  async LawsuitArrestGetByConAdv(form: any): Promise<Lawsuit[]> {
    const url = `${appConfig.api8777}/LawsuitArrestgetByConAdv`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(form), url)
  }

  async ArrestgetByCon(ArrestCode) {
    const params = { ArrestCode: ArrestCode };
    const url = `${appConfig.api8777}/ArrestgetByCon`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }

  async LawsuitArrestupdDeleteLawsuit(ArrestCode: any, IndictmentID: Number) {
    const params = {
      ArrestCode: ArrestCode,
      IndictmentID: IndictmentID
    };
    const url = `${appConfig.api8777}/LawsuitArrestupdDeleteLawsuit`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }

  async LawsuitArrestIndicmentDetailgetByCon(indictmentDetailID: string) {
    const params = { IndictmentDetailID: indictmentDetailID };
    const url = `${appConfig.api8777}/LawsuitArrestIndicmentDetailgetByCon`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }

  async LawsuitgetByCon(LawsuitID) {
    const params = { LawsuitID: LawsuitID };
    const url = `${appConfig.api8777}/LawsuitgetByCon`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }

  async LawsuitArrestGetByCon(IndictmentID) {
    const params = { IndictmentID: IndictmentID };
    const url = `${appConfig.api8777}/LawsuitArrestgetByCon`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }

  async LawsuitArrestIndictmentProductgetByIndictmentID(IndictmentID) {
    const params = { IndictmentID: IndictmentID };
    const url = `${appConfig.api8777}/LawsuitArrestIndictmentProductgetByIndictmentID`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }

  async CompareMasLawgetByCon(GuiltBaseID) {
    const params = { GuiltBaseID: GuiltBaseID };
    const url = `${appConfig.api8777}/CompareMasLawgetByCon`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }

  async LawsuitArrestgetByCon(IndictmentID) {
    const params = { IndictmentID: IndictmentID };
    const url = `${appConfig.api8777}/LawsuitArrestgetByCon`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }

  async MasDocumentMaingetAll(DocumentType: any, ReferenceCode: any) {
    const params = { DocumentType, ReferenceCode };
    const url = `${appConfig.api8777}/MasDocumentMaingetAll`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }

  async MasDocumentMaingetinsAll(document: any) {
    const params = document;
    const url = `${appConfig.api8777}/MasDocumentMaininsAll`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }


  async MasDocumentMaingetAllString(documentType: DocumentType, ReferenceCode: string) {
    const params = { DocumentType: documentType, ReferenceCode: ReferenceCode };
    const url = `${appConfig.api8777}/MasDocumentMaingetAll`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }

  async LawsuitVerifyLawsuitNo(LawsuitNo: string, OfficeCode: string, IsOutside: number) {
    const params = { LawsuitNo: LawsuitNo, OfficeCode: OfficeCode, IsOutside: IsOutside };
    const url = `${appConfig.api8777}/LawsuitVerifyLawsuitNo`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }

  async LawsuitinsAll(lawsuitForm) {
    console.log('lawsuitForm==>', lawsuitForm)
    const url = `${appConfig.api8777}/LawsuitinsAll `;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(lawsuitForm), url);
  }

  async MasStaffMaingetAll() {
    const params = {};
    const url = `${appConfig.api8777}/MasStaffMaingetAll`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }

  async MasOfficeMaingetAll() {
    const params = {};
    const url = `${appConfig.api8777}/MasOfficeMaingetAll`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }

  async LawsuitPaymentFinegetByJudgementID(JudgementID) {
    const params = { JudgementID: JudgementID };
    const url = `${appConfig.api8777}/LawsuitPaymentFinegetByJudgementID`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }

  async LawsuitJudgementupdDelete(JudgementID) {
    const params = { JudgementID: JudgementID };
    const url = `${appConfig.api8777}/LawsuitJudgementupdDelete`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }

  async LawsuitJudgementupdByCon(Judgement) {
    const url = `${appConfig.api8777}/LawsuitJudgementupdByCon`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(Judgement), url);
  }

  async LawsuitPaymentFineDetailupdDelete(PaymentFineID) {
    const params = { PaymentFineID: PaymentFineID };
    const url = `${appConfig.apiUrl}/LawsuitPayfineDetailupdDelete`;
    // const url = `${appConfig.apiUrl}/LawsuitPaymentFineDetailupdDelete`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }

  async LawsuitPaymentFineDetailinsAll(Payment) {
    const url = `${appConfig.api8777}/LawsuitPaymentFineDetailinsAll`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(Payment), url);
  }

  async LawsuitJudgementinsAll(lawsuitForm) {
    const url = `${appConfig.api8777}/LawsuitJudgementinsAll`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(lawsuitForm), url);
  }
  async LawsuitArrestIndicmentupdByCon(IndictmentID) {
    const params = { IndictmentID: IndictmentID };
    const url = `${appConfig.api8777}/LawsuitArrestIndictmentupdByCon`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }

  async LawsuitformupdByCon(lawsuitForm) {
    const url = `${appConfig.api8777}/LawsuitupdByCon`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(lawsuitForm), url);
  }

  async MasDocumentMaininsAll(DocumentType, ReferenceCode) {
    const params = {
      DocumentType: DocumentType,
      ReferenceCode: ReferenceCode
    };
    const url = `${appConfig.api8777}/LawsuitupdByCon`;
    return this.responsePromiseGetWithoutStatus(JSON.stringify(params), url);
  }
  // async MasStaffMaingetAll() {
  //   const params = {};
  //   const url = `${appConfig.api8777}/MasStaffMaingetAll`;
  //   return await this.http.post<any>(url, this.httpOptions).toPromise();
  // }
  // async MasOfficeMaingetAll() {
  //   const params = {};
  //   const url = `${appConfig.api8777}/MasOfficeMaingetAll`;
  //   return await this.http.get<any>(url, this.httpOptions).toPromise();
  // }


  async getByArrestCon(ArrestCode: string): Promise<Arrest> {
    const params = { ArrestCode };
    const url = `${appConfig.api8777}/ArrestgetByCon`;

    try {
      const res = await this.http.post<any>(url, params, this.httpOptions).toPromise();
      return res.ResponseData as Arrest;
    } catch (error) {
      await alert(error);
    }
  }

  async ArrestLawbreakergetByCon(LawbreakerID) {
    const params = { LawbreakerID: LawbreakerID };
    const url = `${appConfig.api8777}/ArrestLawbreakergetByCon`;
    return await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
  }

  async LawsuitupdByCon(LawsuitID, LawsuitNo) {
    const params = { LawsuitID: LawsuitID, LawsuitNo: LawsuitNo };
    const url = `${appConfig.api8777}/LawsuitupdByCon`;
    return await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
  }

  async LawsuitupdDelete(LawsuitID) {
    const params = { LawsuitID: LawsuitID };
    const url = `${appConfig.api8777}/LawsuitupdDelete`;
    return await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
  }

  async LawsuitCompareDocumentgetByCon(LawsuitID) {
    const params = { LawsuitID: LawsuitID };
    const url = `${appConfig.api8777}/LawsuitCompareDocumentgetByCon`;
    return await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
  }

  async LawsuitComparegetByLawsuitID(LawsuitID) {
    const params = { LawsuitID: LawsuitID };
    const url = `${appConfig.api8777}/LawsuitComparegetByLawsuitID`;
    return await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
  }

  async LawsuitProvegetByLawsuitID(LawsuitID) {
    const params = { LawsuitID: LawsuitID };
    const url = `${appConfig.api8777}/LawsuitProvegetByLawsuitID`;
    return await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
  }

  async LawsuitArrestCheckNotComplete(ArrestCode) {
    const params = { ArrestCode: ArrestCode };
    const url = `${appConfig.api8777}/LawsuitArrestCheckNotComplete`;
    return await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
  }

  async LawsuitArrestIndicmentDetailupdByCon(IndictmentDetailID, LawsuitType, LawsuitEnd) {
    const params = {
      IndictmentDetailID: IndictmentDetailID,
      LawsuitType: LawsuitType,
      LawsuitEnd: LawsuitEnd
    };
    const url = `${appConfig.api8777}/LawsuitArrestIndicmentDetailupdByCon`;
    return await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
  }
  async LawsuitArrestupdByCon(ArrestCode) {
    const params = {
      ArrestCode: ArrestCode,
    };
    const url = `${appConfig.api8777}/LawsuitArrestupdByCon`;
    return await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
  }
  async MasCourtMaingetAll() {
    const params = {};
    const url = `${appConfig.api8777}/MasCourtMaingetAll`;
    return await this.http.post<any>(url, JSON.stringify(params), this.httpOptions).toPromise();
  }

  LawsuitReportArrestgetByCon(IndictmentID) {
    const params = { IndictmentID };
    const url = `${appConfig.apiReport}/ILG60_00_04_001.aspx`;
    return this.http.post(url, params, { ...this.httpOptions, responseType: 'blob' })
      .map(x => x)

  }
  LawsuitReport2(ArrestCode) {
    const params = { ArrestCode };
    const url = `${appConfig.apiReport}/ILG60_00_04_002.aspx`;
    return this.http.post(url, params, { ...this.httpOptions, responseType: 'blob' })
      .map(x => x)

  }
  LawsuitReport3(LawsuitID) {
    const params = { LawsuitID };
    const url = `${appConfig.apiReport}/ILG60_00_06_004.aspx`;
    return this.http.post(url, params, { ...this.httpOptions, responseType: 'blob' })
      .map(x => x)

  }
  // async getByKeyword(filterValue) {
  //   const params = JSON.stringify(filterValue);
  //   const url = `${appConfig.api8777}/LawsuitgetByKeyword`;
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
  //   const url = `${appConfig.api8777}/LawSuitgetByConAdv`;
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
  //   const url = `${appConfig.api8777}/LawsuitArrestgetByCon`;
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
  //   const url = `${appConfig.api8777}/LawsuitgetByCon`;
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
  //   const url = `${appConfig.api8777}/ArrestgetByCon`;
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
  //   const url = `${appConfig.api8777}/CompareMasLawgetByCon`;
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
