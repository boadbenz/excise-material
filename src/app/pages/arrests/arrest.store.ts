import { ArrestStaff } from "./models/arrest-staff";
import { ArrestNotice } from "./models/arrest-notice";

export interface ArrestStore {
    arrestNotice: ArrestNotice[];
    arrestStaff: ArrestStaff[];
}