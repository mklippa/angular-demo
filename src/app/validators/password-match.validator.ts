import { FormGroup, ValidationErrors } from '@angular/forms';

export function passwordMatchValidator(
  form: FormGroup
): ValidationErrors | null {
  const { password, confirm } = form.controls;
  if (!password || !confirm) return null;
  if (password.errors && !password.errors.passwordMatch) return null;
  return password.value !== confirm.value ? { passwordMatch: true } : null;
}
