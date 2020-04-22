import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenInfo = this.authService.tokenInfo;
    if (tokenInfo && tokenInfo.accessToken) {
      request = request.clone({
        setHeaders: {
         'Content-Type':  'application/json',
          Authorization: `${tokenInfo.tokenType} ${tokenInfo.accessToken}`
        }
      });
    }

    return next.handle(request);
  }
}
