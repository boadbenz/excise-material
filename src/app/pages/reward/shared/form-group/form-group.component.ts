import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormGroupConfig } from './form-group.config';
import { ColumnsInterface } from '../interfaces/columns-interface';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss']
})
export class FormGroupComponent extends FormGroupConfig implements OnInit {
  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    // set data default
    this.columns$.subscribe(c => {
      if (c) {
        const column: ColumnsInterface[] = c;
        // console.log('columns', column);

        this.formGroup = this.fb.group(this.createForm(column));
        column.forEach((key, index) => {
          if (key.inputType === 'date' || key.inputType2 === 'date') {
            if (key.default) {
              this.formGroup.controls[key.field].setValue(
                new Date(key.default),
                true
              );
            }
            if (key.default2) {
              this.formGroup.controls[key.field2].setValue(
                new Date(key.default2),
                true
              );
            }
          } else if (
            key.inputType === 'number' ||
            key.inputType2 === 'number'
          ) {
            if (key.default) {
              this.formGroup.controls[key.field].setValue(
                Number(key.default),
                true
              );
            }
            if (key.default2) {
              this.formGroup.controls[key.field2].setValue(
                Number(key.default2),
                true
              );
            }
          } else {
            if (key.default) {
              this.formGroup.controls[key.field].setValue(key.default, true);
            }
            if (key.default2) {
              this.formGroup.controls[key.field2].setValue(key.default2, true);
            }
          }
        });
      }
    });
  }
  submitHandle(value) {
    this.outputSubmit.emit(value);
  }
}
