import { Directive } from '@angular/core';
import {
  FormGroup,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { passwordMatchValidator } from '../validators/password-match.validator';

@Directive({
  selector: '[appPasswordMatch]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordMatchDirective,
      multi: true,
    },
  ],
})
export class PasswordMatchDirective implements Validator {
  constructor() {}

  validate(formGroup: FormGroup): ValidationErrors | null {
    return passwordMatchValidator(formGroup);
  }
}
