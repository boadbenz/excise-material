import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { Router } from '@angular/router';
import { PreloaderService } from 'app/shared/preloader/preloader.component';

@Injectable()
export class CoreInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private preloaderService: PreloaderService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.preloaderService.setShowPreloader(true);
    const token = JSON.parse(localStorage.getItem('user'));
    //   // ===== check token not null =====
    // if (!token) {
    //   return next.handle(request).do(
    //     (event: HttpEvent<any>) => {
    //       if (event instanceof HttpResponse) {
    //         // do stuff with response if you want
    //         //   console.log('HttpResponse', HttpResponse);
    //       }
    //     },
    //     (err: any) => {
    //       // return to error page
    //       if (err instanceof HttpErrorResponse) {
    //         if (err.status === 404) {
    //           this.router.navigate(['/404']);
    //         }
    //         if (err.status === 500) {
    //           this.router.navigate(['/500']);
    //         }
    //       }
    //       // return to error page
    //     }
    //   );
    // }
    //   // ===== check token not null =====

    // set header
    request = request.clone({
      headers: request.headers
        // .set('Authorization', `Bearer ${token}`)
        .append('Content-Type', 'application/json')
    });
    // set header
    console.log('request', request);

    return next.handle(request).do(
      (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // do stuff with response if you want
          //   console.log('HttpResponse', HttpResponse);
          this.preloaderService.setShowPreloader(false);
        }
      },
      (err: any) => {
        // return to error page
        if (err instanceof HttpErrorResponse) {
          // if (err.status === 200) { this.router.navigate(['/500']); }
          this.preloaderService.setShowPreloader(false);
        }
        // return to error page
      }
    );
  }
}
