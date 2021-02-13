import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from "rxjs";

import { environment } from "../../../environments/environment";

@Injectable()
export class UnauthorizedRequestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // if (req.url.includes(environment.apiUrl) && )

    return next.handle(req);
  }
}
