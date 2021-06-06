import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import {LocalStorageService} from './local-storage.service';
import {User} from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  isLoggedIn = false;
  jwtToken: string;
  userID = 0;
  decoded: { [key: string]: string };

  constructor(private localStorageService: LocalStorageService) {
    const payload = this.localStorageService.get('payload');
    if (payload) {
      this.jwtToken = payload.access_token;
      this.isLoggedIn = true;
      this.decodeToken();
    }
  }

  setToken(token: string): void{
    if (token) {
      this.jwtToken = token;
      this.isLoggedIn = true;
    }
  }

  decodeToken(): void{
    const payload = this.localStorageService.get('payload');
    if (this.jwtToken) {
      this.decoded = jwt_decode<any>(this.jwtToken);
    }
  }

  getPayload(): { [key: string]: string }{
    this.decodeToken();
    return this.decoded ? this.decoded : null;
  }

  isTokenExpired(): boolean{
    const exp: number = this.decoded ? parseInt(this.decoded.exp, 10) : null;

    if (exp) {
      return ((exp * 1000) - Date.now() < 5000);
    }
    return true;
  }

  reset(): void{
    this.decoded = null;
    this.jwtToken = null;
    this.isLoggedIn = false;
  }

  getDecodedUser(): User{
    const logedUser = new User();
    if (this.decoded){
      logedUser.email = this.decoded.email;
      logedUser.id = parseInt(this.decoded.id, 10);
      logedUser.firstname = this.decoded.firstname;
      logedUser.lastname = this.decoded.lastname;
      logedUser.phone = this.decoded.phone;
      logedUser.image = '';
    }
    return logedUser;
  }
}
