import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  uri = 'https://wager-tpt.herokuapp.com/api/';

  constructor(private http: HttpClient) {}

  getUserLoggedIn(): Observable<User> {
    return this.http.get<User>(this.uri + 'users/' + 1).pipe(
      map((userData) => {
        console.log(userData);
        return userData;
      })
    );
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(this.uri + 'users', {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
    });
  }
}
