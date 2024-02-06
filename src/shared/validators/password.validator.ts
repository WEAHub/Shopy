import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

const passwordRegEx: RegExp =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[\W|_])[\WA-Za-z\d_]{8,}$/;

export default class PasswordValidation {
  static match(
    controlName: string,
    checkControlName: string
  ): ValidatorFn {
    return (controls: AbstractControl): ValidationErrors | null => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }

  static cantMatch(
    controlName: string,
    checkControlName: string
  ): ValidatorFn {
    return (controls: AbstractControl): ValidationErrors | null => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['cantMatch']) {
        return null;
      }

      if (control?.value === checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ cantMatch: true });
        return { cantMatch: true };
      } else {
        return null;
      }
    };
  }

  static verify(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value;

      if (!password) {
        return null;
      }

      const regexPass = passwordRegEx.test(password);

      return !regexPass ? { passwordStrength: true } : null;
    };
  }
}
