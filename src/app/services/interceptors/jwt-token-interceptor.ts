import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { SessionStorageService } from '../session-storage.service';
import { ResponseLogin } from 'src/app/entities/security/response-login';
import { catchError } from 'rxjs/operators';
import { LoginService } from '../security/login.service';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenInterceptor implements HttpInterceptor {

  constructor(protected loginService: LoginService) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //const token: string = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VyTmFtZSI6InN1cGVydXNlciIsInN1YiI6IlVzdWFyaW8gU29wb3J0ZSIsImV4cCI6MTU5NTQ3ODE3N30.s8qvU2m6BNWGKvV20vJAhM-ji-9_VDvIe12-volVRUc'

    let session: ResponseLogin = this.loginService.getLogin()

    if (session) {
      request = request.clone({
        setHeaders: {
          Authorization: `${ session.token }`
        }
      });
    } 
    return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
      console.log(JSON.stringify(error));
      
      /**
       * Not authorized
       * Toked expired
       */
      if (error.status == 403 || error.status == 401) {
        this.loginService.logout()
      }

      return throwError(error.message)
    }))

  }
  
}
