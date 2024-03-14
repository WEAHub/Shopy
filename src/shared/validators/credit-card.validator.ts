import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';

const lookup = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];

export default class CreditCardValidator {
  static luhnVerify(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const cardNumber = control.value;

      if (!cardNumber) {
        return null;
      }

      let index = cardNumber.length;
      let x2 = true;
      let sum = 0;

      while (index) {
        const value = cardNumber.charCodeAt(--index) - 48;
        if (value < 0 || value > 9) return { luhn: true };

        x2 = !x2;
        sum += x2 ? lookup[value] : value;
      }

      return sum % 10 === 0 ? { luhn: true } : null;
    };
  }

  static expirationVerify(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const expiration = control.value;

      if (!expiration) {
        return null;
      }

      const [month, year] = expiration.split('/');

      if (!Number(month) || !Number(year)) {
        return { cardExpiration: true };
      }

      const dateNow = new Date();

      const monthNow = dateNow.getMonth() + 1;
      const yearNow = dateNow.getFullYear() % 100;

      const cardMonth = Number(month);
      const cardYear = Number(year);

      if (monthNow <= cardMonth && yearNow <= cardYear) {
        return null;
      }

      return { cardExpiration: true };
    };
  }
}
