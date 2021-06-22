import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { JwtService } from './jwt.service';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../Utils/local-storage.service';
import { User } from '../../model/Users/user.model';
import { config } from '../../config/variables';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  uri = config.herokuurl + 'authentications/';

  constructor(
    private http: HttpClient,
    private persistenceManager: LocalStorageService,
    private jwtService: JwtService
  ) {}

  login(
    email: string,
    password: string
  ): Observable<{ access_token: string; refresh_token: string }> {
    let statusMessage: { access_token: string; refresh_token: string };
    return this.http
      .post<{
        data: { access_token: string; refresh_token: string }[];
        errors: { content: string }[];
      }>(this.uri + 'login', {
        email,
        password,
      })
      .pipe(
        map((x) => {
          statusMessage = {
            access_token: x.data[0].access_token,
            refresh_token: x.data[0].refresh_token,
          };
          return statusMessage;
        }),
        tap((x) => {
          this.jwtService.setToken({
            access_token: x.access_token,
            refresh_token: x.refresh_token,
          });
        }),
        catchError(this.handleError<any>())
      );
  }

  logout(): Observable<any> {
    return this.http
      .post<any>(this.uri + 'logout', { email: 'ando.l.andria@gmail.com' })
      .pipe(
        tap((_) => {
          const succed = this.persistenceManager.remove('payload');
          if (succed) {
            this.jwtService.removeToken();
          }
        }),
        catchError(this.handleError<any>())
      );
  }

  private generateID = (): number =>
    parseInt(Date.now() + (Math.random() * 100000).toFixed(), 10);

  register(user: User): Observable<any> {
    user.id = this.generateID();
    return this.http
      .post(this.uri + 'register', {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        password: user.password,
      })
      .pipe(
        tap((_) => {
          console.log('User registered');
        }),
        catchError(this.handleError<any>())
      );
  }

  confirmAccount(confirmContent: {
    email: string;
    activationCode: string;
  }): Observable<any> {
    return this.http
      .post(this.uri + 'activate', {
        email: confirmContent.email,
        activation_code: confirmContent.activationCode,
      })
      .pipe(catchError(this.handleError<any>()));
  }

  resetPassword(email: string): Observable<any> {
    return this.http
      .get(this.uri + 'forget-password/' + email)
      .pipe(catchError(this.handleError<any>()));
  }

  verifyResetCode(verifyContent: {
    email: string;
    code: string;
  }): Observable<any> {
    return this.http
      .post(this.uri + 'verify-reset-code', {
        email: verifyContent.email,
        reset_code: verifyContent.code,
      })
      .pipe(catchError(this.handleError<any>()));
  }

  setResetedPassword(setPassword: {
    email: string;
    password: string;
  }): Observable<any> {
    return this.http
      .post(this.uri + 'change-password', {
        email: setPassword.email,
        new_password: setPassword.password,
      })
      .pipe(catchError(this.handleError<any>()));
  }

  private handleError<T>(): any {
    return (e: any): Observable<T> => {
      const result = e.error as T;
      // console.log('ERREURS: ' + (result['errors'] as Array<string>).join(', '));
      return of(result);
    };
  }
}
