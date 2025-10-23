import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!(control.parent instanceof FormGroup)) return null;

    const emailRegexp = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    return emailRegexp.test(control.value) ? null : { invalid: true };
  };
}
