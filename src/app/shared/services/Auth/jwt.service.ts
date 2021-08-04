import {Injectable} from '@angular/core';
import {LocalStorageService} from '../Utils/local-storage.service';
import {User} from '../../model/Users/user.model';
import {catchError, map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {CookieService} from 'ngx-cookie';
import * as CryptoJS from 'crypto-js';
import {config} from 'src/app/shared/config/variables';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor(
    private localeStorage: LocalStorageService,
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  // should not be stored locally, security things
  private helper = new JwtHelperService();

  // not including user details, used for token bearer
  token: string = this.localeStorage.get('token') || null;
  private decodedToken: {
    id: number;
    email: string;
    iat: number;
    exp: number;
  } = this.helper.decodeToken(this.token) || null; // idem

  static mapUser(decoded: {
    id: number;
    firstname?: string;
    lastname?: string;
    image?: string;
    email: string;
    phone?: string;
    betcredit?: number;
    exp: number;
    iat: number;
  }): { user: User; iat: number; exp: number } {
    const user = new User();
    user.id = decoded.id;
    user.firstname = decoded.firstname || '';
    user.lastname = decoded.lastname || '';
    user.phone = decoded.phone || '';
    user.email = decoded.email;
    user.image = decoded.image || '';
    user.betcredit = decoded.betcredit || 0;
    return { user, iat: decoded.iat, exp: decoded.exp };
  }

  /*
   * Use this for setting token for the first loggin
   * */
  setToken(token: { access_token: string; refresh_token: string }): void {
    this.localeStorage.set('token', token.access_token);
    const encryptedString = CryptoJS.AES.encrypt(
      token.refresh_token,
      '$^$&@@f$^$&érazdf$ut$&érazdf'
    ).toString();
    this.cookieService.put('refresh_orb', encryptedString, {});
  }

  /*
   * Use this for refreshing token
   * */
  private updateToken(token: string): void {
    this.localeStorage.set('token', token);
  }

  /*
   * Remove stored items related to auth
   * */
  removeToken(): void {
    this.localeStorage.remove('token');
    this.cookieService.removeAll();
  }

  /*
   * Get logged user
   * */
  getUser(): { user: User; iat: number; exp: number } {
    const user = new User();
    return this.decodedToken
        ? JwtService.mapUser(this.decodedToken)
        : {user, iat: 0, exp: 0};
  }

  /*
   * Check if token is expired
   * */
  isTokenExpired(): boolean {
    if (this.decodedToken?.exp) {
      return this.decodedToken.exp * 1000 - Date.now() < 5000 || true;
    }
  }

  /*
   * refresh token if there is a logged user
   * */
  refreshToken(): Observable<any> {
    if (this.getUser().user.id !== 0) {
      // define variables
      const uri = config.herokuurl + 'token/refresh';

      return this.http
        .post<{
          data: { access_token: string }[];
          errors: string[];
        }>(uri, {
          email: this.getUser().user.email,
          refresh_token: CryptoJS.AES.decrypt(
            this.cookieService.get('refresh_orb'),
            '$^$&@@f$^$&érazdf$ut$&érazdf'
          ).toString(CryptoJS.enc.Utf8),
        })
        .pipe(
          map((response) => {
            return response;
          }),
          tap(
            (response: {
              data: { access_token: string }[];
              errors: string[];
            }) => {
              this.updateToken(response.data[0].access_token);
            }
          ),
          catchError(this.handleError<any>())
        );
    }
  }

  private handleError<T>(): any {
    return (e: any): Observable<T> => {
      this.removeToken();
      const result = e.error as T;
      location.reload();
      return of(result);
    };
  }
}
