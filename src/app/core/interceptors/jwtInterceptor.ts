import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserService } from '../../shared/services/user.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = sessionStorage.getItem('access_token');
    const isApiUrl = req.url.startsWith(environment.apiUrl);
    if (accessToken && isApiUrl) {
      console.log("intercepted...");
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${accessToken}` },
      });
    }
    return next.handle(req);
  }
}
