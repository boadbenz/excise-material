import { IRequestCommandDetail } from './RequestCommandDetail';

export interface IRequestCommand {
  CommandID: number;
  CommandDate: Date;
  CommandTime: string;
  CommandNo: string;
  IsActive: number;
  TotalPart: number;
  ArrestCode: string;

  RequestCommandDetail: Array<IRequestCommandDetail>;
}

export interface IRequestCommandgetByArrestCode {
  ArrestCode: string;
}
