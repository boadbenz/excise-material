import { AbstractControl, FormControl } from '@angular/forms';

export class Config {
  public static markAllDirty(control: AbstractControl) {
    if (control.hasOwnProperty('controls')) {
      control.markAsDirty(); // mark group
      const ctrl = <any>control;
      // tslint:disable-next-line:forin
      for (const inner in ctrl.controls) {
        this.markAllDirty(ctrl.controls[inner] as AbstractControl);
      }
    } else {
      (<FormControl>control).markAsDirty();
    }
  }
}
