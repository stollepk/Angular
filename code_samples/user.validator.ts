import {FormGroup, Validators} from '@angular/forms';
import {Injectable} from '@angular/core';
import {dateValidator} from './invalid-date.directive';

@Injectable({
  providedIn: 'root'
})
export class UserValidator {

  get nameValidators() {
    return [Validators.required, Validators.minLength(1), Validators.maxLength(50)];
  }

  get fullNameValidators() {
    return this.nameValidators;
  }

  get emailValidators() {
    return [Validators.required, Validators.email, Validators.maxLength(254)];
  }

  get phoneValidators() {
    return [Validators.required, Validators.minLength(9), Validators.maxLength(20)];
  }

  get dateOfBirthValidators() {
    return [Validators.required, dateValidator()];
  }

  get codeValidators() {
    return [Validators.required, Validators.minLength(4), Validators.maxLength(4)];
  }

  get digitValidators() {
    return [Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern(/\d/)];
  }

  get passwordValidators() {
    return [Validators.required, Validators.minLength(6), Validators.maxLength(200)];
  }

  mustMatchValidator(ctrlName: string, matchCtrlName: string) {
    return mustMatch(ctrlName, matchCtrlName);
  }

}

export function mustMatch(ctrlName: string, matchCtrlName: string) {
  return (formGroup: FormGroup) => {
    const ctrl = formGroup.controls[ctrlName];
    const matchCtrl = formGroup.controls[matchCtrlName];

    if (matchCtrl.errors && !matchCtrl.errors.mustMatch) {
      return;
    }

    // validation fails, then set error
    if (ctrl.value !== matchCtrl.value) {
      matchCtrl.setErrors({ mustMatch: true });
    } else {
      matchCtrl.setErrors(null);
    }
  };
}
