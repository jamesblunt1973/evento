import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from './models/user.model';
import { LoginData } from '../auth/models/loginData.model';
import { RegisterData } from '../auth/models/registerData.model';
import { AppState } from '../app.state';
import { LoginSuccess } from './state/auth.actions';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private BASE_URL = environment.apiUrl + 'auth';

  constructor(private http: HttpClient, private store: Store<AppState>) { }

  checkUser() {
    var jwt = localStorage.getItem('token');
    if (jwt != null) {
      let jwtData = jwt.split('.')[1];
      let decodedJwtJsonData = atob(jwtData);
      let decodedJwtData = JSON.parse(decodedJwtJsonData);
      let user: User = {
        email: decodedJwtData.email,
        gender: decodedJwtData.gender ? eval(decodedJwtData.gender) : null,
        id: decodedJwtData.nameid,
        name: decodedJwtData.unique_name,
        token: jwt
      };

      this.store.dispatch(new LoginSuccess(user));
    }
  }

  login(loginData: LoginData): Observable<User> {
    const url = `${this.BASE_URL}/login`;
    return this.http.post<User>(url, loginData);
  }

  register(registerData: RegisterData): Observable<User> {
    const url = `${this.BASE_URL}/register`;
    return this.http.post<User>(url, registerData);
  }

  logout(): Observable<object> {
    const url = `${this.BASE_URL}/logout`;
    return this.http.get(url);
  }

  checkUserName(userName: string): Observable<boolean> {
    const url = `${this.BASE_URL}/checkUserName`;
    let data = {
      str: userName
    }
    return this.http.post<boolean>(url, data);
  }

  checkEmail(email: string): Observable<boolean> {
    const url = `${this.BASE_URL}/checkEmail`;
    let data = {
      str: email
    }
    return this.http.post<boolean>(url, data);
  }
}
