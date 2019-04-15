import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

const apiUrl = environment.apiURL;

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url.endsWith('upload/images')) {
      return next.handle(req);
    }

    return next.handle(req.clone({
      url: `${apiUrl}/${req.url}`
    })).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status !== 200) {
        this.router.navigate([ '/' ]);
      }

      return throwError(err);
    }));
  }
}
