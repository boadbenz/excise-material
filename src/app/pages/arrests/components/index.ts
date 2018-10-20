import { ManageComponent } from "./manage/manage.component";
import { ListComponent } from "./list/list.component";
import { AllegationComponent } from "./allegation/allegation.component";
import { AllegationDetailModalComponent } from "./allegation-detail-modal/allegation-detail-modal.component";
import { AllegationModalComponent } from "./allegation-modal/allegation-modal.component";
import { LawbreakerComponent } from "./lawbreaker/lawbreaker.component";
import { ModalNoticeComponent } from "./modal-notice/modal-notice.component";
import { OffenseModalComponent } from "./offense-modal/offense-modal.component";
import { PrintDocModalComponent } from "./print-doc-modal/print-doc-modal.component";
import { LawbreakerModelComponent } from "./lawbreaker-model/lawbreaker-model.component";


export const components: any[] = [
    ListComponent,
    ManageComponent,
    AllegationComponent,
    AllegationModalComponent,
    AllegationDetailModalComponent,
    LawbreakerComponent,
    ModalNoticeComponent,
    OffenseModalComponent,
    PrintDocModalComponent,
    LawbreakerModelComponent
]

export * from "./manage/manage.component";
export * from "./list/list.component";
export * from "./allegation/allegation.component";
export * from "./allegation-detail-modal/allegation-detail-modal.component";
export * from "./allegation-modal/allegation-modal.component";
export * from "./lawbreaker/lawbreaker.component";
export * from "./modal-notice/modal-notice.component";
export * from "./offense-modal/offense-modal.component";
export * from "app/pages/investigation/printdoc-modal/printdoc-modal.component";
export * from './lawbreaker-model/lawbreaker-model.component';