import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import {UserService} from 'src/app/services/security/user.service';
//import { User } from 'src/entities/security/user';
import { UserLogin } from 'src/app/entities/security/user-login';
import {ResponseLogin} from 'src/app/entities/security/response-login'
import { Router } from '@angular/router';
import { SessionStorageService } from '../session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(protected client: HttpClient, protected router: Router, protected sessionStorage: SessionStorageService) {}

  login(login: UserLogin) {
    return this.client.post<ResponseLogin>(`${environment.baseUrl}admin/login`, login)
  }

  forgotPassword(login: UserLogin) {
    return this.client.post<ResponseLogin>(`${environment.baseUrl}admin/forgot-password`, login)
  }

  resetPassword(token?: any, password?: any) {
    return this.client.post<any>(`${environment.baseUrl}admin/reset-password`, { token, password })
  }




  loginPersonal(login: UserLogin) {
    return this.client.post<ResponseLogin>(`${environment.baseUrl}personal/login`, login)
  }

  logout() {
    // remove user from local storage to log user out
    this.sessionStorage.clearSession()
    this.router.navigate(['/login']);
}

getLogin(): ResponseLogin {
  return this.sessionStorage.getSession()
}





}
