import { Action } from '@ngrx/store';
import { LoginData } from '../../auth/models/loginData.model';
import { RegisterData } from '../../auth/models/registerData.model';
import { User } from '../models/user.model';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  Register = '[Auth] Register',
  RegisterSuccess = '[Auth] Register Success',
  RegisterFailure = '[Auth] Register Failure',
  Logout = '[Auth] Loggout'
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;
  constructor(public payload: LoginData) { }
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;
  constructor(public payload: User) { }
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;
  constructor(public payload: string) { }
}

export class Register implements Action {
  readonly type = AuthActionTypes.Register;
  constructor(public payload: RegisterData) { }
}

export class RegisterSuccess implements Action {
  readonly type = AuthActionTypes.RegisterSuccess;
  constructor(public payload: User) { }
}

export class RegisterFailure implements Action {
  readonly type = AuthActionTypes.RegisterFailure;
  constructor(public payload: string) { }
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export type AuthActions = Login
  | LoginSuccess
  | LoginFailure
  | Logout;