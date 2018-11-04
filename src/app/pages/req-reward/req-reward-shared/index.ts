import { FormGroupComponent } from './form-group/form-group.component';
import { TableDataComponent } from './table-data/table-data.component';
import { PagerService } from './services/Pager.service';

export const REQ_REWARD_SHARED_COMPONENTS = [
  FormGroupComponent,
  TableDataComponent
];
export const REQ_REWARD_SHARED_SERVICES = [PagerService];
