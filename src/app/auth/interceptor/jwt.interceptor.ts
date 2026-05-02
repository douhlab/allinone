import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {ToastService} from "../../core/services/toast/toast.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,
              private toastService: ToastService,
              private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    let authReq = req;

    const isMyBackend =
      req.url.startsWith('https://simple-spa-app')
      || req.url.startsWith('http://localhost:8080');

    if (token && isMyBackend) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 401:
            if (this.router.url !== '/401') {
              this.authService.logout();
              this.toastService.show('Session expired. Please login again.', 'error');
              this.router.navigate(['/auth/login'], {
                state: {sessionTimeout: true}
              });
            }
            break;
          case 403:
            if (this.router.url !== '/403') {
              this.toastService.show('Access denied.', 'error');
              this.router.navigate(['/403']);
            }
            break;
          default:
            if (error.status >= 500 && this.router.url !== '/500') {
              this.toastService.show('Server error. Check your providers.', 'error');
              this.router.navigate(['/500']);
            }
        }
        return throwError(() => error);
      })
    )
  }
}
