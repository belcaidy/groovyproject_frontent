import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AnnouncementInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.getData() !== null) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.getData()}`
        }
      });
    }
    return next.handle(request);
  }

  getData(): any {
    const asd = JSON.parse(localStorage.getItem('auth'));
    // @ts-ignore
    if (asd === null) {
      return null;
    }
    return asd.access_token;
  }
}
