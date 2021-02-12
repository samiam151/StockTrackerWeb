import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, tap} from 'rxjs/operators';

export interface IUser {
  email: string;
  id: number;
}

export interface LoginResult {
  accessToken: string;
  refreshToken: string;
  email: string;
  id: number;
  role: string;
  username: string;
  watchlist: any[];
}

export class User implements IUser {
  constructor(id: number, email: string) {
    this.id = id;
    this.email = email;
  }
  email: string;
  id: number;
}

const ACCESS_TOKEN_NAME: string = "access_token";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _currentUser: User = null;

  constructor(private http: HttpClient) { }

  get currentUser() {
    return this._currentUser;
  }

  set currentUser(user: User)
  {
    this._currentUser = user;
  }

  createUser(email: string, password: string) {
    return this.http.post("http://localhost:57157/api/account/signup", {
      username: email,
      password: password
    });
  }

  get isAuthenticated() {
    return this._currentUser !== null;
  }

  logout() {
    this.removeToken();
    this.currentUser = null;
  }

  get token()
  {
    return sessionStorage.getItem(ACCESS_TOKEN_NAME)
  }

  authenticateUser(email: string, password: string)
  {
    return this.requestAuth(email, password).pipe(
      tap(result => {
        this.currentUser = new User(result.id, result.email);
        this.setToken(result.accessToken);
      })
    );
  }

  private requestAuth(email: string, password: string) {
    return this.http.post<LoginResult>("http://localhost:57157/api/account/login", {
      username: email,
      password: password
    });
  }

  private setToken(token: string) {
    sessionStorage.setItem(ACCESS_TOKEN_NAME, token);
  }

  private removeToken() {
    sessionStorage.removeItem(ACCESS_TOKEN_NAME);
  }
}
