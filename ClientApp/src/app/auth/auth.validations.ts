import { Injectable, Directive, forwardRef } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS, Validator } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { AuthService } from '../shared/auth.service';
import { AppState } from '../app.state';
import { CheckUserName, CheckEmail } from '../shared/state/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class UniqueUserNameValidator implements AsyncValidator {

  constructor(private authService: AuthService, private store: Store<AppState>) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    this.store.dispatch(new CheckUserName());
    return this.authService.checkUserName(control.value).pipe(
      map(res => (res ? null : { uniqueUserName: true })),
      catchError(() => null), // TODO: proper validation for other type of errors
      finalize(() => {
        this.store.dispatch(new CheckUserName());
      })
    );
  }
}

// for use in template driven forms
@Directive({
  selector: '[appUniqueUserName]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueUserNameValidator),
      multi: true
    }
  ]
})
export class UniqueUserNameValidatorDirective {
  constructor(private validator: UniqueUserNameValidator) { }

  validate(control: AbstractControl) {
    this.validator.validate(control);
  }
}

@Injectable({
  providedIn: 'root'
})
export class UniqueEmailValidator implements AsyncValidator {

  constructor(private authService: AuthService, private store: Store<AppState>) { }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    this.store.dispatch(new CheckEmail());
    return this.authService.checkEmail(control.value).pipe(
      map(res => (res ? null : { uniqueEmail: true })),
      catchError(() => null), // TODO: proper validation for other type of errors
      finalize(() => {
        this.store.dispatch(new CheckEmail())
      })
    );
  }
}

// for use in template driven forms
@Directive({
  selector: '[appUniqueEmail]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueEmailValidator),
      multi: true
    }
  ]
})
export class UniqueEmailValidatorDirective {
  constructor(private validator: UniqueUserNameValidator) { }

  validate(control: AbstractControl) {
    this.validator.validate(control);
  }
}

export function ConfirmPasswordValidator(control: AbstractControl): ValidationErrors {
  let password = control.get('password');
  let confirmPassword = control.get('passwordConfirmation');
  if (password.pristine || confirmPassword.pristine) {
    return null;
  }
  if (password && confirmPassword && password.value !== confirmPassword.value) {
    var validationError = {
      confirmPassword: true
    };
    confirmPassword.setErrors(validationError)
    return validationError;
  }
  else
    return null;
}
