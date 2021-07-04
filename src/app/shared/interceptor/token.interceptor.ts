import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from '../services/Auth/jwt.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(private jwtService: JwtService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.jwtService.token;
    //const user = this.jwtService.getUser().user;
    //console.log(request.url);
    if (
      request.url ===
      'https://api.cloudinary.com/v1_1/dy528ddbe/delete_by_token'
    ) {
      console.log('-------------');
      return next.handle(request);
    } else {
      const cloned = request.clone({
        url: request.url,
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(cloned);
    }
  }
}
