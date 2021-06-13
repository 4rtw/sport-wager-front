import {Injectable} from '@angular/core';
import {User} from '../model/user.model';
import {JwtService} from './jwt.service';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  uri = 'https://wager-tpt.herokuapp.com/api/users/';

  constructor(
      private http: HttpClient,
      private jwtService: JwtService,
  ) {}

  // GET
  getUserLoggedIn(): Observable<any>{
      let id = 0;
      if (this.jwtService.decoded !== undefined){
          id = parseInt(this.jwtService.decoded.id, 10);
      }
      if (id === 0){
          return new Observable<any>().pipe(
              map( x => {
                  return new User();
              })
          );
      }
      else{
          return this.http.get(this.uri + id).pipe(
              map((x) => {
                  // @ts-ignore
                  if (x.errors.length === 0){
                      return this.mapUser(x);
                  }
                  else {
                      return new User();
                  }
              }),
              tap(
                  x => {
                      localStorage.setItem('loggedUser', JSON.stringify(x));
                  }
              ),
              catchError(this.handleError<any>())
          );
      }

  }

  private handleError<T>(): any {
      return (e: any): Observable<T> => {
          const result = e.error as T;
          /*if (result){
              console.error(result);
          }*/
          return of(result);
      };
    }

  private mapUser(x: any): User{
      const user = new User();
      user.betcredit = x.data[0].betcredit;
      user.email = x.data[0].email;
      user.firstname = x.data[0].firstname;
      user.id = x.data[0].id;
      user.lastname = x.data[0].lastname;
      user.phone = x.data[0].phone;
      return user;
  }
}
