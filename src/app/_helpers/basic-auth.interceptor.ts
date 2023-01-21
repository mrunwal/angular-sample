import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';


@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add header with basic auth credentials if user is logged in and request is to the api url

      request = request.clone({
        // withCredentials: true,
        setHeaders: {
          Authorization: `Basic ${environment.basicKey}`,
          // 'X-CSRF-Token':  `${user.csrf_token}`,
          'Content-Type': 'application/json',
        },
      });

    return next.handle(request);
  }
}
