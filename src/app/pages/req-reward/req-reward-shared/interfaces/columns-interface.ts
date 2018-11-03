import { DropdownInterface } from './dropdown-interface';

export interface ColumnsInterface {
  // ===== default =====
  title?: string;
  field?: string;
  width?: any;
  default?: any;
  primaryKey?: boolean;
  class?: string;
  inputType?:
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'month'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';
  validMassage?: string;
  case?: string;
  matchValue?: any;
  textField?: string;
  textAlign?: string;
  index?: any;
  // ===== default =====

  // ===== input format =====
  minLenght?: any;
  masked?: string;
  minDate?: Date;
  maxDate?: Date;
  format?: string;
  pipeName?: string;
  // ===== input format =====

  // ===== condition =====
  criteria?: string;
  useModal?: boolean;
  setHeaderColumn?: boolean;

  doNotEditor?: boolean;
  showText?: any;
  showInput?: boolean;

  notShow?: boolean;
  notSave?: boolean;

  noEdit?: boolean;
  noAdd?: boolean;
  noInput?: boolean;

  showOnly?: boolean;
  needCheckAll?: boolean;

  useIcon?: boolean;

  isEmail?: boolean;
  isNumber?: boolean;
  isRequired?: boolean;
  isCustomColumns?: boolean;
  isHidden?: boolean;
  isDisabled?: boolean;
  isFilter?: boolean;
  // ===== condition =====
  // ===== column in column in column =====
  children?: Array<ColumnsInterface>;

  // ===== for dropdown or multiselect input =====
  data?: Array<DropdownInterface>;
  // ===== for dropdown or multiselect input =====
}
