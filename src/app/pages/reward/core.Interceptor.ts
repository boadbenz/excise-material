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
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators/map';
import { catchError } from 'rxjs/operators/catchError';
import { finalize } from 'rxjs/operators/finalize';
import { ReplaySubject } from 'rxjs/ReplaySubject';
@Injectable()
export class CoreInterceptor implements HttpInterceptor {
  private _pendingRequests = 0;
  private _pendingRequestsStatus: ReplaySubject<boolean> = new ReplaySubject<
    boolean
  >(1);
  private _filteredUrlPatterns: RegExp[] = [];
  private _filteredMethods: string[] = [];
  private _filteredHeaders: string[] = [];
  private _forceByPass: boolean;

  get pendingRequestsStatus$(): Observable<boolean> {
    return this._pendingRequestsStatus.asObservable();
  }

  get pendingRequests(): number {
    return this._pendingRequests;
  }

  get filteredUrlPatterns(): RegExp[] {
    return this._filteredUrlPatterns;
  }

  set filteredMethods(httpMethods: string[]) {
    this._filteredMethods = httpMethods;
  }

  set filteredHeaders(value: string[]) {
    this._filteredHeaders = value;
  }

  set forceByPass(value: boolean) {
    this._forceByPass = value;
  }

  private shouldBypassUrl(url: string): boolean {
    return this._filteredUrlPatterns.some(e => {
      return e.test(url);
    });
  }

  private shouldBypassMethod(req: HttpRequest<any>): boolean {
    return this._filteredMethods.some(e => {
      return e.toUpperCase() === req.method.toUpperCase();
    });
  }

  private shouldBypassHeader(req: HttpRequest<any>): boolean {
    return this._filteredHeaders.some(e => {
      return req.headers.has(e);
    });
  }

  private shouldBypass(req: HttpRequest<any>): boolean {
    return (
      this.shouldBypassUrl(req.urlWithParams) ||
      this.shouldBypassMethod(req) ||
      this.shouldBypassHeader(req) ||
      this._forceByPass
    );
  }
  constructor(
    private router: Router,
    private preloaderService: PreloaderService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const shouldBypass = this.shouldBypass(request);

    if (!shouldBypass) {
      this._pendingRequests++;

      if (1 === this._pendingRequests) {
        this._pendingRequestsStatus.next(true);
        // this.preloaderService.setShowPreloader(true);
      }
    }

    // const token = JSON.parse(localStorage.getItem('user'));
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

    return next.handle(request).pipe(
      map(event => {
        return event;
      }),
      catchError(error => {
        return Observable.throw(error);
      }),
      finalize(() => {
        if (!shouldBypass) {
          this._pendingRequests--;

          if (0 === this._pendingRequests) {
            this._pendingRequestsStatus.next(false);
            this.preloaderService.setShowPreloader(false);
          }
        }
      })
    );
  }
}
