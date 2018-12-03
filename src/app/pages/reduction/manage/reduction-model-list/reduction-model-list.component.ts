import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-reduction-model-list',
  templateUrl: './reduction-model-list.component.html',
  styleUrls: ['./reduction-model-list.component.scss']
})
export class ReductionModelListComponent implements OnInit {

  /**
   * Data ID from parent page
   */
  @Input() id: any;
  @Input() listData: any[] = [];

  /**
   * Sent something to parent
   */
  @Output() result: EventEmitter<number> = new EventEmitter();
  @Output() d = new EventEmitter();

  // decrear form angular
  public checkBoxForm: FormGroup;
  public allChecked = false;
  public checkNo = 0;
  public selected: any[] = [];

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    console.log(this.id);
    console.log(this.listData);
    // Create a new array with a form control for each order
    const controls = this.listData.map(c => new FormControl(false));
    this.checkNo = 0;
    this._formBuilderGroup(controls);
  }

  public activeModel() {
    console.log('active model');
  }

  public dismiss(e: any) {
    this.d.emit(e);
  }
  public next() {
    console.log('next');
    const result = this._checked();
    console.log(result);
  }

  private _checked() {
    const selected = this.checkBoxForm.value.listData
      .map((v, i) => v ? this.listData[i].receiptNo : null)
      .filter(v => v !== null);

    return selected;
  }

  private _formBuilderGroup(controls) {
    console.log(controls);
    this.checkBoxForm = this.formBuilder.group({
      listData: new FormArray(controls)
    });
  }

  public checkAll(value: boolean) {
    if (!value) {
      this.checkNo = this.listData.length;
    } else {
      this.checkNo = 0;
    }

    // Create a new array with a form control for each order
    const controls = this.listData.map(c => new FormControl(false));

    const checkAllControls = controls.map(control => {
      control.setValue(!value);
      return control;
    });

    this._formBuilderGroup(checkAllControls);
  }

  public chicking(event) {
    const check = event.target.checked;

    if (check) {
      this.checkNo += 1;
    } else {
      this.checkNo -= 1;
    }

    if (this.checkNo === this.listData.length) {
      this.allChecked = true;
    } else {
      this.allChecked = false;
    }
  }

}
