import { InvestigateDetail } from './investigate-detail';
import { InvestigateTeam } from './investigate-team';

export class Investigate {
    public InvestigateCode: string;
    public InvestigateNo: string;
    public DateStart: string;
    public DateEnd: string;
    public Subject: string;
    public IsActive: number;
    public InvestigationDetail: InvestigateDetail[];
    public InvestigationTeam: InvestigateTeam[];
}
