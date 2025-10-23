import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

export function passwordMatchValidator(passwordControlName: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!(control.parent instanceof FormGroup)) return null;

    const passwordControl = control.parent.get(passwordControlName);
    if (!passwordControl) return { mismatch: true };

    return control.value === passwordControl.value ? null : { mismatch: true };
  };
}
