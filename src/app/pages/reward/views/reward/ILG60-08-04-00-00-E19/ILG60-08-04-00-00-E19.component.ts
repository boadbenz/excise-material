import { Component, OnInit } from '@angular/core';
import { CONFIG } from './CONFIG';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { replaceFakePath } from 'app/config/dataString';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'ILG60-08-04-00-00-E19',
  templateUrl: './ILG60-08-04-00-00-E19.component.html',
  styleUrls: ['./ILG60-08-04-00-00-E19.component.scss']
})
export class ILG6008040000E19Component extends CONFIG implements OnInit {
  get Document(): FormArray {
    return this.formGroup.get('Document') as FormArray;
  }
  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      Document: this.fb.array([])
    });
  }
  public addDocument() {
    this.Document.push(
      this.fb.group({
        DocumentID: [null],
        DataSource: ['', Validators.required],
        FilePath: ['', Validators.required],
        DocumentName: [''],
        DocumentType: [9],
        IsActive: [1],
        ReferenceCode: ['']
      })
    );
  }
  public changeDocument(e: any, index: number) {
    // let file = e.target.files[0];
    this.Document.at(index).patchValue({
      FilePath: replaceFakePath(e.target.value),
      IsActive: 1
    });
  }
  public deleteDocument(i: number) {
    this.Document.removeAt(i);
  }

  public formChange(formData: FormGroup) {
    console.log('formData', formData);
    this.emitChange.emit({
      FormName: 'ILG60-08-03-00-00-E19',
      FormData: formData
    });
  }
}
