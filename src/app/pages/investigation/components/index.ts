import { ListComponent } from "./list/list.component";
import { ManageComponent } from "./manage/manage.component";
import { DetailManageComponent } from "./detail-manage/detail-manage.component";
import { LawbreakerComponent } from "./lawbreaker/lawbreaker.component";
import { SuspectComponent } from "./suspect/suspect.component";
import { SuspectModalComponent } from "./suspect-modal/suspect-modal.component";
import { PrintdocModalComponent } from "./printdoc-modal/printdoc-modal.component";

export const components: any[] =[
    ListComponent,
    ManageComponent,
    DetailManageComponent,
    LawbreakerComponent,
    SuspectComponent,
    SuspectModalComponent,
    PrintdocModalComponent
]

export * from "./list/list.component";
export * from "./manage/manage.component";
export * from "./detail-manage/detail-manage.component";
export * from "./lawbreaker/lawbreaker.component";
export * from "./suspect/suspect.component";
export * from "./suspect-modal/suspect-modal.component";
export * from "./printdoc-modal/printdoc-modal.component";
