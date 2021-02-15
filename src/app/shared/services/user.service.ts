import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, reduce, tap} from 'rxjs/operators';
import { environment } from '../../../environments/environment';

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
  constructor(id: number, email: string, watchlist: any[] = []) {
    this.id = id;
    this.email = email;
    this.watchlist = watchlist;
  }
  email: string;
  id: number;
  watchlist: any[]
}

const ACCESS_TOKEN_NAME: string = "access_token_stocktracker";
const STORAGE_TYPE: Storage = localStorage;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _currentUser: User = null;

  constructor(private http: HttpClient) { }

  get currentUser() {
    return this._currentUser;
  }

  getUserInfo(id: number)
  {
    return this.http.get<any>(environment.apiUrl + "/users/" + id);
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
    return STORAGE_TYPE.getItem(ACCESS_TOKEN_NAME)
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

  public userExists(name: string) {
    return this.http.get<User[]>(environment.apiUrl + "/users/search?email=" + name);
  }

  private requestAuth(email: string, password: string) {
    return this.http.post<LoginResult>("http://localhost:57157/api/account/login", {
      username: email,
      password: password
    });
  }

  private setToken(token: string) {
    STORAGE_TYPE.setItem(ACCESS_TOKEN_NAME, token);
  }

  private removeToken() {
    STORAGE_TYPE.removeItem(ACCESS_TOKEN_NAME);
  }
}
