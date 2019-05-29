import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';

import { AppState } from '../../app.state';
import { Login } from '../../shared/state/auth.actions';
import { LoginData } from '../models/loginData.model';
import * as fromReducer from '../../shared/state/auth.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  model: LoginData = {
    password: '', userName: ''
  };
  drawerContent: any;
  subscriptions: Array<Subscription> = [];

  constructor(
    private snackBar: MatSnackBar,
    private store: Store<AppState>) { }

  login() {
    this.store.dispatch(new Login(this.model));
    //   password: 'Fdsa$321',
    //   userName: 'malekan'
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

  }

  ngOnDestroy(): void {
    this.drawerContent.style.background = '';
    for (const i in this.subscriptions) {
      this.subscriptions[i].unsubscribe();
    }
  }
}
