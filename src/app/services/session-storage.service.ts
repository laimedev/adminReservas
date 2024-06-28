import { Injectable } from '@angular/core';

import {ResponseLogin, GrantedAuthority} from 'src/app/entities/security/response-login'

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  readonly ITEM_NAME = 'session'

  constructor() { }

  setSession(login: ResponseLogin) {

    localStorage.setItem(this.ITEM_NAME, JSON.stringify(login))

  }

  getSession(): ResponseLogin {
    return JSON.parse(localStorage.getItem(this.ITEM_NAME)!)
  }

  isLogin() {
    return this.getSession() !== null
  }

  getAuthorities(): string[] {
    let login = this.getSession()
    let authorities: GrantedAuthority[] =  login?.authorities??[]  
    return authorities.map(a => a.authority)
  }

  clearSession() {
    localStorage.removeItem(this.ITEM_NAME)
  }

}
