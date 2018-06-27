import { InvestigateDetail } from './investigate-detail';
import { InvestigateTeam } from './investigate-team';

export class InvestigateList {
    public InvestigateCode: string;
    public InvestigateNo: string;
    public DateStart: Date;
    public DateEnd: Date;
    public Subject: string;
    public IsActive: number;
    public InvestigationDetail: InvestigateDetail[];
    public InvestigationTeam: InvestigateTeam[];
}
