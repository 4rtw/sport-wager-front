import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {JwtService} from './jwt.service';
import {HttpClient} from "@angular/common/http";
import {LocalStorageService} from "./local-storage.service";
import {User} from "../model/user.model";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  uri = 'https://wager-tpt.herokuapp.com/api/authentications/';
  tokenUri = 'https://wager-tpt.herokuapp.com/api/token';

  constructor(
      private http: HttpClient,
      private persistenceManager: LocalStorageService,
      private jwtService: JwtService,
      private router: Router
  ) { }

  login(email: string, password: string): Observable<any>{
    const statusMessage = [];
    return this.http.post(this.uri+'login', {email: email, password: password})
        .pipe(
            map(x=>{
              // @ts-ignore
              statusMessage.push(x.status);
              // @ts-ignore
              statusMessage.push(x.message);
              // @ts-ignore
              return {message: statusMessage, data: x.data[0]};
            }),
            tap(x=>{
              const succed = this.persistenceManager.set('payload', x.data);
              if (succed) {
                this.jwtService.setToken(x.data.access_token);
              }
            }),
            catchError(this.handleError<any>())
        );
  }

  logout() : Observable<any>{
    const decoded = this.jwtService.decoded;
    const statusMessage = [];

    if (decoded){
      return this.http.post<any>(this.uri+'logout',{email: decoded.email}).pipe(
          map(x=>{
            statusMessage.push(x.status);
            statusMessage.push(x.message);
            return {message: statusMessage};
          }),
          tap(_=>{
            const succed = this.persistenceManager.remove('payload');
            if (succed) {
              this.jwtService.reset();
            }
          }),
          catchError(this.handleError<any>())
      );
    }
  }

  generateID(): number{
      return parseInt(Date.now() + ( (Math.random()*100000).toFixed()));
  }

  //TODO register user
  register(user:User): Observable<any>{
      user.id = this.generateID()
      const statusMessage = [];
      return this.http.post(this.uri+'register', {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          phone: user.phone,
          password: user.password
      }).pipe(
          map(x=>{

          }),
          tap(_=>{
              console.log("User registered");
          }),
          catchError(this.handleError<any>())
      );
  }

  confirmAccount(email: string, code: string): Observable<any>{
      return this.http.post(this.uri+'activate',{
          email: email,
          activation_code: code
      }).pipe(
          map(x=>{

          }),
          tap(_=>{
              console.log("User confirmed");
          }),
          catchError(this.handleError<any>())
      );
  }

  //GET
  resetPassword(email: string): Observable<any>{
      return this.http.get(this.uri+'forget-password/'+email).pipe(
          map(x=>{
                //TODO handle if no account
          }),
          tap(_=>{
              console.log("User confirmed");
          }),
          catchError(this.handleError<any>())
      )
  }

  verifyResetCode(email: string, code:string):Observable<any>{
      return this.http.post(this.uri+'verify-reset-code',{
          email:email,
          reset_code:code
      }).pipe(
          map(x=>{
              //TODO handle if invalid code
          }),
          tap(_=>{
              console.log("Code reçu");
          }),
          catchError(this.handleError<any>())
      );
  }

  setResetedPassword(email:string, password:string):Observable<any>{
      return this.http.post(this.uri+'change-password',{
          email:email,
          new_password:password
      }).pipe(
          map(x=>{
              //TODO handle if invalid code
          }),
          tap(_=>{
              console.log("Mot de passe reçu");
          }),
          catchError(this.handleError<any>())
      );
  }

  refreshToken(): Observable<any> {
    if (this.jwtService.isTokenExpired && this.jwtService.jwtToken) {
      const payload = this.persistenceManager.get('payload');
      if (payload) {
        const email: string = this.jwtService.decoded.email;
        const refresh_orb: string = payload.refresh_token;
        return this.http.post<any>(this.tokenUri + 'refresh', {email, refresh_token: refresh_orb})
            .pipe(
                map(x => {
                  return {message: x.message, data: x.data[0]};
                }),
                tap(x => {
                  payload.access_token = x.data.access_token;
                  const succed = this.persistenceManager.set('payload', payload);
                  if (succed) {
                    this.jwtService.setToken(x.data.access_token);
                  }
                }),
                map(_ => true),
                catchError((_) => of(this.router.navigate(['/login'])))
            );
      }
    }
    return throwError(false);
  }

  private handleError<T>() {
    return (e: any): Observable<T> => {
      let result = e.error as T;
      console.log('ERREURS: ' + (result['errors'] as Array<string>).join(', '));
      return of(result);
    };
  }
}
