import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';

import { AuthService } from '../auth.service';
import * as fromActions from './auth.actions';

@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router
  ) { }

  @Effect()
  Login: Observable<any> = this.actions.pipe(
    ofType(fromActions.AuthActionTypes.Login),
    mergeMap((loginActionData: fromActions.Login) => this.authService.login(loginActionData.payload)
      .pipe(
        map(user => (new fromActions.LoginSuccess(user))),
        catchError(error => of(new fromActions.LoginFailure(error.statusText)))
      )
    )
  )

  @Effect()
  Register: Observable<any> = this.actions.pipe(
    ofType(fromActions.AuthActionTypes.Register),
    mergeMap((registerActionData: fromActions.Register) => this.authService.register(registerActionData.payload)
      .pipe(
        map(user => (new fromActions.RegisterSuccess(user))),
        catchError(error => of(new fromActions.RegisterFailure(error.statusText)))
      )
    )
  )

  @Effect({ dispatch: false })
  Logout: Observable<any> = this.actions.pipe(
    ofType(fromActions.AuthActionTypes.Logout),
    tap((action: fromActions.Logout) => {
      this.authService.logout();
      localStorage.removeItem('token');
      this.router.navigateByUrl('/');
    })
  );

  @Effect({ dispatch: false })
  LoginSuccess: Observable<any> = this.actions.pipe(
    ofType(fromActions.AuthActionTypes.LoginSuccess),
    tap((action: fromActions.LoginSuccess) => {
      localStorage.setItem('token', action.payload.token);
      this.router.navigateByUrl('/'); // TODO: check return url
    })
  );

  @Effect({ dispatch: false })
  RegisterSuccess: Observable<any> = this.actions.pipe(
    ofType(fromActions.AuthActionTypes.RegisterSuccess),
    tap((action: fromActions.RegisterSuccess) => {
      localStorage.setItem('token', action.payload.token);
      this.router.navigateByUrl('/'); // TODO: check return url
    })
  );
}
