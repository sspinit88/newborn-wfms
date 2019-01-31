import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {tap} from "rxjs/operators";
import {UserModel} from "../models/user.model";

@Injectable()
export class AuthService {

  private token: string = null;

  constructor(
      private http: HttpClient,
  ) {
  }

  login(user: UserModel): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('/api/auth/login', user)
        .pipe(
            tap(// tap - позволяет занести значение получаемого токена в переменную token
                ({token}) => {// получаем объект с полем token
                  // console.log('token:', {token});

                  localStorage.setItem('auth-token', token);
                  this.setToken(token);
                })
        );
  }

  registration(user: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>('/api/auth/register', user)
  }

  setToken(token: string) {
    this.token = token;
  }

  getTocen() {
    return this.token;
  }

  isAuth(): boolean {
    return !!this.token;
  }

  logout() {
    this.setToken(null);
    localStorage.clear();
  }


}
