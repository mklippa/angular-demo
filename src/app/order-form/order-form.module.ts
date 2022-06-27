import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderFormComponent } from './order-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [OrderFormComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [OrderFormComponent],
})
export class OrderFormModule {}
