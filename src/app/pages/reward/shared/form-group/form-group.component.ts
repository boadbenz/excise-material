import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
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
    this.columns$.subscribe(c => {
      if (c) {
        const column: ColumnsInterface[] = c;
        // console.log('columns', column);

        this.formGroup = this.fb.group(this.createForm(column));
        column.forEach((key, index) => {
          if (key.default &&  key.field) {
            this.formGroup.controls[key.field].setValue(
              key.default || null,
              true
            );
          }
          if (key.default2 && key.field2) {
            this.formGroup.controls[key.field2].setValue(
              key.default2 || '',
              true
            );
          }
          // console.log('key', key);
        });
      }
    });
  }

  ngOnInit() {
    // set data default
  }
  submitHandle(value) {
    this.outputSubmit.emit(value);
  }
  changeHandle(value) {
    this.outputChange.emit(value);
  }
}
