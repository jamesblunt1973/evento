import { Action } from '@ngrx/store';
import { LoginData } from '../../auth/models/loginData.model';
import { RegisterData } from '../../auth/models/registerData.model';
import { IUser } from '../models/user.model';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  Register = '[Auth] Register',
  RegisterSuccess = '[Auth] Register Success',
  RegisterFailure = '[Auth] Register Failure',
  Logout = '[Auth] Loggout',
  CheckUserName = '[Auth] Check UserName',
  CheckEmail = '[Auth] Check Email'
}

export class Login implements Action {
  readonly type = AuthActionTypes.Login;
  constructor(public payload: LoginData) { }
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;
  constructor(public payload: IUser) { }
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
  constructor(public payload: IUser) { }
}

export class RegisterFailure implements Action {
  readonly type = AuthActionTypes.RegisterFailure;
  constructor(public payload: string) { }
}

export class Logout implements Action {
  readonly type = AuthActionTypes.Logout;
}

export class CheckUserName implements Action {
  readonly type = AuthActionTypes.CheckUserName;
}

export class CheckEmail implements Action {
  readonly type = AuthActionTypes.CheckEmail;
}

export type AuthActions = Login
  | LoginSuccess
  | LoginFailure
  | RegisterSuccess
  | RegisterFailure
  | Logout
  | CheckUserName
  | CheckEmail;