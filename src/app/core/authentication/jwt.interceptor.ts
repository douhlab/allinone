import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {AuthService} from "../../shared/util/authentication/auth.service";
import {ToastService} from "../../services/toast/toast.service";

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
        if (error.status === 401) {
          this.authService.logout();
          this.toastService.show('Session expired. Please login again.', 'error');
          this.router.navigate(['/auth/login'], {
            state: {sessionTimeout: true}
          });
        } else if (error.status === 403 && this.router.url !== '/forbidden') {
          this.toastService.show('Access denied.', 'error');
          this.router.navigate(['/forbidden'], {
            state: {attemptedUrl: this.router.url}
          });
        } else if (error.status === 0) {
          this.toastService.show('Network error. Check your connection.', 'error');
        } else {
          const msg = error.error?.message || 'Something went wrong';
          this.toastService.show(msg, 'error');
        }
        return throwError(() => error);
      })
    );
  }
}
