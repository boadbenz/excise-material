import { InvestigateDetailLocal } from "./investigate-detail-local";
import { InvestigateDetailProduct } from "./investigate-detail-product";
import { InvestigateDetailStaff } from "./investigate-detail-staff";
import { InvestigateDetailSuspect } from "./investigate-detail-suspect";

export class InvestigateDetail {
        public ConfidenceOfNews: string;
        public InvestigateCode: string;
        public InvestigateDateEnd: Date;
        public InvestigateDateStart: Date;
        public InvestigateDetail: string;
        public InvestigateDetailID: number;
        public InvestigateSeq: string;
        public IsActive: number;
        public StationCode: string;
        public StationName: string
        public ValueOfNews: string
        public InvestigateDetailLocal: InvestigateDetailLocal[];
        public InvestigateDetailProduct: InvestigateDetailProduct[];
        public InvestigateDetailStaff: InvestigateDetailStaff[];
        public InvestigateDetailSuspect: InvestigateDetailSuspect[];
}

