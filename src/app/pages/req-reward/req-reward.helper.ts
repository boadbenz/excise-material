import { FormGroup, Validators } from '@angular/forms';
import { ColumnsInterface } from './req-reward-shared/interfaces/columns-interface';

export class ReqRewardHelper {
  public formGroup: FormGroup;

  constructor() {}

  // ===== create form =====
  validateSetting(valid) {
    const arr = [];
    let validSet = null;
    const d_val = valid.default;
    const required = valid.isRequired ? arr.push(Validators.required) : null;
    const email = valid.isEmail ? arr.push(Validators.email) : null;
    const min = valid.minLenght
      ? arr.push(Validators.minLength(valid.min_length))
      : null;
    const max = valid.maxLenght
      ? arr.push(Validators.maxLength(valid.max_length))
      : null;
    const pattern = valid.pattern
      ? arr.push(Validators.pattern(valid.pattern))
      : null;
    if (arr.length > 0) {
      validSet = [d_val, arr];
    } else {
      validSet = [d_val];
    }
    //  console.log('valid',  valid);

    return validSet;
  }

  createForm(columns: Array<ColumnsInterface>) {
    const obj = {};
    columns.forEach(val => {
      if (val.children) {
        val.children.forEach(val2 => {
          if (!val2.primaryKey && !val2.doNotEditor) {
            obj[val2.field] = this.validateSetting(val);
          }
        });
      } else {
        if (!val.primaryKey && !val.doNotEditor) {
          obj[val.field] = this.validateSetting(val);
        }
      }
    });
    return obj;
  }
  // ===== create form =====

  // ===== setDefault Columns ======
  public setDefaultDataColumns(
    columns: Array<ColumnsInterface>,
    defaultData: any
  ): Array<ColumnsInterface> {
    // console.log('columns', columns);

    columns.forEach((x, index) => {
      if (columns[index].inputType === 'date') {
        columns[index].default = new Date(
          defaultData[x.field] && typeof defaultData[x.field] === 'string'
            ? defaultData[x.field]
            : Date.now
        );
      } else {
        columns[index].default = defaultData[x.field]
          ? defaultData[x.field]
          : null;
      }
    });
    return columns;
  }
  // ===== setDefault Columns ======
}
