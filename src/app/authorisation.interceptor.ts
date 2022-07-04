import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorisationInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTI5YmEwZmU4ZGM1NWJiMDJlMDcwM2Q1ZmIyYjRkOS' +
          'IsInN1YiI6IjYyMDAwNmFjZDM0ZWIzMDAxYzNmYWQ3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ' +
          '.qgFjFzXMD9a0gcfNFmdJUxbSHW6stbz2gpDOQO1cKmc'}
    })

    return next.handle(request);
  }
}
