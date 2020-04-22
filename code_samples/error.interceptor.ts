import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';


import { AuthenticationService } from '../services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      console.error(err);
      if ([401, 403].indexOf(err.status) !== -1) {
        // auto logout if 401 response returned from api
        this.authenticationService.logout();
        location.reload();
      }

      return throwError(err.error.message || err.statusText);
    }));
  }
}
