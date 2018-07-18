import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypeheadProductComponent } from './typehead-product.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
  ],
  declarations: [TypeheadProductComponent]
})
export class TypeheadProductModule { }
