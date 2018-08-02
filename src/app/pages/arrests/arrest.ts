import { ArrestStaff } from './arrest-staff';
import { ArrestIndictment } from './arrest-indictment';
import { ArrestLocale, } from './arrest-locale';
import { ArrestLawbreaker } from './arrest-lawbreaker';
import { ArrestProduct } from './arrest-product';
import { ArrestDocument } from './arrest-document';

export class Arrest {
    RowsId: number;
    ArrestCode: string;
    ArrestDate: string;
    ArrestTime: string;
    OccurrenceDate: string;
    OccurrenceTime: string;
    ArrestStationCode: string;
    ArrestStation: string;
    HaveCulprit: string;
    Behaviour: string;
    Testimony: string;
    Prompt: string;
    IsMatchNotice: string;
    ArrestDesc: string;
    NoticeCode: string;
    InvestigationSurveyDocument: string;
    InvestigationCode: string;
    IsActive: number;
    ArrestStaff: Array<ArrestStaff>;
    ArrestLocale: Array<ArrestLocale>;
    ArrestIndictment: Array<ArrestIndictment>;
    ArrestLawbreaker: Array<ArrestLawbreaker>;
    ArrestProduct: Array<ArrestProduct>;
    ArrestDocument: Array<ArrestDocument>;
}
