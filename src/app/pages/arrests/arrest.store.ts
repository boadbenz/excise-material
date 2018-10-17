import { ArrestStaff } from "./models/arrest-staff";
import { ArrestNotice } from "./models/arrest-notice";
import { ArrestLocale } from "./models/arrest-locale";
import { ArrestIndictment } from "./models/arrest-indictment";
import { ArrestLawbreaker } from "./models/arrest-lawbreaker";
import { ArrestProduct } from "./models/arrest-product";
import { ArrestDocument } from "./models/arrest-document";
import { MasStaffModel } from "app/models";

export interface ArrestStore {
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
    ArrestStaff: Array<ArrestStaff>;
    ArrestLocale: Array<ArrestLocale>;
    // ArrestIndictment: Array<ArrestIndictment>;
    // ArrestLawbreaker: Array<ArrestLawbreaker>;
    // ArrestProduct: Array<ArrestProduct>;
    // ArrestDocument: Array<ArrestDocument>;

    // MasStaff: Array<MasStaffModel>;
}