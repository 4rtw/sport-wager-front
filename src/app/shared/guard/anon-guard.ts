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
export class AnonGuard implements CanActivate {
  constructor(private router: Router, private jwtService: JwtService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log(this.jwtService.getUser().user);
    if (this.jwtService.getUser().user.id === 0) {
      return true;
    } else {
      return this.router.navigate(['/profile']);
    }
  }
}
