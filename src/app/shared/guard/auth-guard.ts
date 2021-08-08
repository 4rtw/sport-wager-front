import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { JwtService } from '../services/Auth/jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private jwtService: JwtService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    /*if (this.jwtService.getPayload()) {
      if (this.jwtService.isTokenExpired()) {
        return this.jwtService.refreshToken();
      } else {
        return true;
      }
      console.log(this.jwtService.getPayload());
    } else {
      return this.router.navigate(['/register']);
    }*/
    if (this.jwtService.getUser().user.id !== 0) {
      console.log(this.jwtService.getUser().user.id);
      return true;
    } else {
      this.router.navigate(['/register']);
    }
  }
}
