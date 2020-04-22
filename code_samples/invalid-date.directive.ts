import {AbstractControl, ValidatorFn} from '@angular/forms';

export function dateValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (!isValidDate(control.value)) {
      return {invalidDate: true};
    }

    return null;
  };
}

export function isValidDate(date) {
  if (typeof date === 'string') {
    const test = date.split('/');
    if (test.length !== 3) {
      return false;
    }
    const year = Number(test[0]);
    const month = Number(test[1]);
    const day = Number(test[2]);
    if (year && month && day) {
      const now = new Date();
      if (year > now.getFullYear() || year < 1900) {
        return false;
      }
      switch (month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          return day >= 1 && day <= 31;
        case 4:
        case 6:
        case 9:
        case 11:
          return day >= 1 && day <= 30;
        case 2:
          return day >= 1 && day <= ((year % 4) === 0 ? 29 : 28);
        default:
          return false;

      }

    }
  }
  return false;
}
