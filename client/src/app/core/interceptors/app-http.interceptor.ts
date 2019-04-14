import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

const apiUrl = environment.apiURL;

export class AppHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req.clone({
      url: `${apiUrl}/${req.url}`
    })).pipe(catchError(val => of(val)));
  }
}
