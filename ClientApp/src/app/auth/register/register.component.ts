import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';

import { AppState } from '../../app.state';
import { Register } from '../../shared/state/auth.actions';
import { RegisterData } from '../models/registerData.model';
import * as fromReducer from '../../shared/state/auth.reducer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  // model: RegisterData = {
  //   password: 'Fdsa$321',
  //   userName: 'malekan',
  //   email: 'malekan@mail.com',
  //   gender: true,
  //   name: 'Mahdi Malekan',
  //   passwordConfirmation: 'Fdsa$321'
  // };
  model: RegisterData;
  drawerContent: any;
  subscriptions: Array<Subscription> = [];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private store: Store<AppState>) { }

  registerForm = this.fb.group({
    name: this.fb.control(''),
    userName: this.fb.control(''),
    email: this.fb.control(''),
    gender: this.fb.control(null),
    password: this.fb.control(''),
    passwordConfirmation: this.fb.control('')
  });

  register() {
    console.log(this.registerForm.value);
    //this.store.dispatch(new Register(this.model));
    // this.authService.register(this.model).subscribe(
    //   res => console.log(res),
    //   error => console.log(error)
    // );
  }

  ngOnInit(): void {
    this.drawerContent = document.getElementsByTagName('mat-drawer-container').item(0);
    this.drawerContent.style.backgroundImage = 'url(\'../../../assets/images/login-bg.jpg\')';
    this.drawerContent.style.backgroundRepeat = 'no-repeat';
    this.drawerContent.style.backgroundSize = 'cover';
    
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

  }

  ngOnDestroy(): void {
    this.drawerContent.style.background = '';
    for (const i in this.subscriptions) {
      this.subscriptions[i].unsubscribe();
    }
  }
}
