import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormGroupConfig } from './form-group.config';

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
    this.formGroup = this.fb.group(this.createForm(this.columns));
  }
  submitHandle(value) {
    this.outputSubmit.emit(value);
  }
}
