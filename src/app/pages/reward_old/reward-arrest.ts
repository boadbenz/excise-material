export class RewardArrest {
    IsActive: number;
    ArrestCode: string;
    ArrestDate: string;
    ArrestTime: string;
    OccurrenceDate: string;
    OccurrenceTime: string;
    ArrestStationCode: string;
    ArrestStation: string;
    HaveCulprit: number;
    Behaviour: string;
    Testimony: string;
    Prompt: string;
    IsMatchNotice: string;
    ArrestDesc: string;
    NoticeCode: string;
    InvestigationSurveyDocument: string;
    InvestigationCode: string;
    IsLawsuitComplete: number;
    ArrestIndicment: ArrestIndicment[];
}

export class ArrestIndicment {
    IsActive: number;
    IndictmentID: string;
    ArrestCode: string;
    GuiltBaseID: string;
    IsProve: number;
    IsLawsuitComplete: number;
    Lawsuit: any;
}
