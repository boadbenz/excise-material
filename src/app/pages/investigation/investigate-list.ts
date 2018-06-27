import { InvestigateDetail } from './investigate-detail';

export class InvestigationList {
    public InvestigateCode: string;
    public InvestigateNo: string;
    public DateStart: Date;
    public DateEnd: Date;
    public Subject: string;
    public IsActive: number;
    public InvestigationDetail: Array<InvestigateDetail>;
}
