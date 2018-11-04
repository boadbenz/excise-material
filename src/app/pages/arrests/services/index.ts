import { ArrestService } from "./arrest.service";
import { ArrestStaffService } from "./arrest-staff.service";
import { ArrestProductService } from "./arrest-product.service";
import { ArrestProductDetailService } from "./arrest-product-detail.service";
import { ArrestNoticeService } from "./arrest-notice.service";
import { ArrestMasLawbreakerService } from "./arrest-mas-lawbreaker.service";
import { ArrestLawService } from "./arrest-law.service";
import { ArrestLawbreakerService } from "./arrest-lawbreaker.service";
import { ArrestLawSuitService } from "./arrest-law-suit.service";
import { ArrestLawGuiltbaseService } from "./arrest-law-guiltbase.service";
import { ArrestIndictmentService } from "./arrest-indictment.service";
import { ArrestIndictmentDetailService } from "./arrest-indictment-detail.service";

export const services: any[] = [
    ArrestService,
    ArrestStaffService,
    ArrestProductService,
    ArrestProductDetailService,
    ArrestNoticeService,
    ArrestMasLawbreakerService,
    ArrestLawbreakerService,
    ArrestLawService,
    ArrestLawSuitService,
    ArrestLawGuiltbaseService,
    ArrestIndictmentService,
    ArrestIndictmentDetailService
]

export * from "./arrest.service";
export * from "./arrest-staff.service";
export * from "./arrest-product.service";
export * from "./arrest-product-detail.service";
export * from "./arrest-notice.service";
export * from "./arrest-mas-lawbreaker.service";
export * from "./arrest-law.service";
export * from "./arrest-lawbreaker.service";
export * from "./arrest-law-suit.service";
export * from "./arrest-law-guiltbase.service";
export * from "./arrest-indictment.service";
export * from "./arrest-indictment-detail.service";