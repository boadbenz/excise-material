import { ManageComponent } from "./manage/manage.component";
import { ListComponent } from "./list/list.component";
import { AllegationComponent } from "./allegation/allegation.component";
import { LawbreakerModalComponent } from "./lawbreaker-modal/lawbreaker-modal.component";
import { AllegationModalComponent } from "./allegation-modal/allegation-modal.component";
import { LawbreakerComponent } from "./lawbreaker/lawbreaker.component";
import { ModalNoticeComponent } from "./modal-notice/modal-notice.component";
import { OffenseModalComponent } from "./offense-modal/offense-modal.component";
import { PrintDocModalComponent } from "./print-doc-modal/print-doc-modal.component";

export const components: any[] = [
    ListComponent,
    ManageComponent,
    AllegationComponent,
    AllegationModalComponent,
    LawbreakerModalComponent,
    LawbreakerComponent,
    ModalNoticeComponent,
    OffenseModalComponent,
    PrintDocModalComponent
]

export * from "./manage/manage.component";
export * from "./list/list.component";
export * from "./allegation/allegation.component";
export * from "./lawbreaker-modal/lawbreaker-modal.component";
export * from "./allegation-modal/allegation-modal.component";
export * from "./lawbreaker/lawbreaker.component";
export * from "./modal-notice/modal-notice.component";
export * from "./offense-modal/offense-modal.component";
export * from "./print-doc-modal/print-doc-modal.component";