import { Injectable } from '@angular/core';
import { User } from '../../model/Users/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { JwtService } from '../Auth/jwt.service';
import { config } from 'src/app/shared/config/variables';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  uri = config.herokuurl;

  constructor(private http: HttpClient, private jwtService: JwtService) {}

  getUserLoggedIn(): Observable<User> {
    const id = this.jwtService.getUser().user.id;
    if (id !== 0) {
      return this.http
        .get<{ data: User[]; errors: string[] }>(this.uri + 'users/' + id)
        .pipe(
          map((userData) => {
            if (userData.errors.length > 0) {
              return new User();
            } else {
              return userData.data[0];
            }
          })
        );
    } else
      return new Observable<User>().pipe(
        map((_) => {
          return new User();
        })
      );
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(this.uri + 'users', {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      phone: user.phone,
    });
  }

  updateImage(user: User): Observable<any> {
    return this.http.put(this.uri + 'users', {
      id: user.id,
      image: user.image,
    });
  }

  deleteUserImage(body): Observable<any> {
    const url = `https://api.cloudinary.com/v1_1/dy528ddbe/delete_by_token`;
    return this.http.post(url, body);
  }

  // TODO delete user
}
