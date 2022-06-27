import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { FormsModule } from '@angular/forms';
import { PasswordMatchDirective } from '../directives/password-match.directive';

@NgModule({
  declarations: [SignupComponent, PasswordMatchDirective],
  imports: [CommonModule, FormsModule],
  exports: [SignupComponent],
})
export class SignupModule {}
