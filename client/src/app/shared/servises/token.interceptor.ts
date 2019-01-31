import {Injectable} from "@angular/core";
import {AuthService} from "../../auth/servises/auth.service";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs/internal/observable/throwError";
import {Router} from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  // Имплиментируемся от спец. интерфейса HttpInterceptor
  // позволяет добавить метод intercept()
  // intercept() 1м параметром принимает req: HttpRequest,
  // он будет перехватывать все запросы, который бедет уходить на сервер;
  // 2м параметром - next: HttpHandler

  // TokenInterceptor регистрируем в providers в app.module.

  constructor(
      private authService: AuthService,
      private router: Router,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // handle() передаем запрос, в этом методе можно делать все что угодно. Будем добавлять токен.
    // проверяем на наличие токена
    if (this.authService.isAuth()) {
      // переопределяем реквест
      req = req.clone({
        // setHeaders - устанавливает headers
        setHeaders: {
          // в header Authorization добавляем имеющийся токен
          Authorization: this.authService.getTocen(),
        }
      });
    } // далее перейдем в app.ts, и реализуем сохранение рабочего токена, что бы пользователя не выкидывало каждый
    // раз после обновления страницы

    // return next.handle(req);

    // token имеет определенное время жизни, по истечению которого будет прислана с сервера ошибка 401

    return next.handle(req)
        .pipe(
            // catchError
            catchError(
                (error: HttpErrorResponse) => this.handleAuthError(error),
            )
        );
  }

  // метод, обрабатывающий ошибки
  private handleAuthError(error: HttpErrorResponse): Observable<any> {
    // проверяем код ошибки, переданной с сервера
    if (error.status === 401) {
      // если ошибка пришла, то редиректим на страницу логина
      this.router.navigate(['/login'], {
        queryParams: { // в объект params кладем переменную
          sessionFailed: true,
        }
      });
    }
    // метод throwError позволяет создать обсерв ошибку из ошибки error
    return throwError(error);

  }

}