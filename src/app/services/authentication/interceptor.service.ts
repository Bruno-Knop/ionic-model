import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

const TOKEN = 'token';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the access token from your authentication service

    // Clone the request and add the bearer token to the Authorization header
    const authReq = req.clone({
      headers: req.headers.set(
        'Authorization',
        `Bearer ${localStorage.getItem(TOKEN)}`
      ),
      // headers: req.headers.set('Access-Control-Allow-Origin', '*'),
    });

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(authReq);
  }
}
