import { ArrestStaff } from './arrest-staff';
import { ArrestIndictment } from './arrest-indictment';
import { ArrestLocale, } from './arrest-locale';
import { ArrestLawbreaker } from './arrest-lawbreaker';
import { ArrestProduct } from './arrest-product';
import { ArrestDocument } from './arrest-document';
import { ArrestNotice } from './arrest-notice';

export class Arrest {
    RowsId: number;
    ArrestCode: string;
    ArrestDate: any;
    ArrestTime: string;
    OccurrenceDate: any;
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
    IsLawsuitComplete: number;
    ArrestNotice: Array<ArrestNotice>;
    ArrestStaff: Array<ArrestStaff>;
    ArrestLocale: Array<ArrestLocale>;
    ArrestIndictment: Array<ArrestIndictment>;
    ArrestLawbreaker: Array<ArrestLawbreaker>;
    ArrestProduct: Array<ArrestProduct>;
    ArrestDocument: Array<ArrestDocument>;
}
