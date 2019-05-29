import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';

import { AppState } from '../../app.state';
import { Register } from '../../shared/state/auth.actions';
import * as fromReducer from '../../shared/state/auth.reducer';
import { UniqueUserNameValidator, ConfirmPasswordValidator, UniqueEmailValidator } from '../auth.validations';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  drawerContent: any;
  subscriptions: Array<Subscription> = [];
  emailAsyncLoader = false;
  userNameAsyncLoader = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private store: Store<AppState>,
    private uniqueUserNameValidator: UniqueUserNameValidator,
    private uniqueEmailValidator: UniqueEmailValidator) { }

  registerForm = this.fb.group({
    name: this.fb.control('', Validators.required),
    userName: this.fb.control('', {
      validators: Validators.required,
      asyncValidators: this.uniqueUserNameValidator.validate.bind(this.uniqueUserNameValidator),
      updateOn: 'blur'
    }),
    email: this.fb.control('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: this.uniqueEmailValidator.validate.bind(this.uniqueEmailValidator),
      updateOn: 'blur'
    }),
    gender: this.fb.control('null'),
    password: this.fb.control('', [Validators.required, Validators.minLength(6)]),
    passwordConfirmation: this.fb.control('', Validators.required)
  }, {
      validators: ConfirmPasswordValidator
  });

  get userName() { return this.registerForm.get('userName') }
  get email() { return this.registerForm.get('email') }
  get password() { return this.registerForm.get('password') }
  get passwordConfirmation() { return this.registerForm.get('passwordConfirmation') }

  register() {
    this.store.dispatch(new Register(this.registerForm.value));
  }

  ngOnInit(): void {
    this.drawerContent = document.getElementsByTagName('mat-drawer-container').item(0);
    this.drawerContent.style.backgroundImage = 'url(\'../../../assets/images/login-bg.jpg\')';

    let sub = this.store.pipe(select(fromReducer.getAuthErrorMessage)).subscribe(msg => {
      if (msg != '') {
        this.snackBar.open(msg, 'close', {
          duration: 2000,
        });
      }
    });
    this.subscriptions.push(sub);

    sub = this.store.pipe(select(fromReducer.getAuthUser)).subscribe(user => {
      if (user != null) {
        this.snackBar.open(user.name, 'close', {
          duration: 2000,
        });
      }
    });
    this.subscriptions.push(sub);

    sub = this.store.pipe(select(fromReducer.getCheckUserName)).subscribe(stat => {
      this.userNameAsyncLoader = stat;
    });
    this.subscriptions.push(sub);

    sub = this.store.pipe(select(fromReducer.getCheckEmail)).subscribe(stat => {
      this.emailAsyncLoader = stat;
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.drawerContent.style.background = '';
    for (const i in this.subscriptions) {
      this.subscriptions[i].unsubscribe();
    }
  }
}
