import { Component, OnInit } from '@angular/core';
import { ToggleMenuService } from '../services/menu/toggle-menu.service';
import { LoginService } from '../services/security/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user?: string
  typeUser?: string

  public informacion = JSON.parse(localStorage.getItem('informacion')!)


  constructor(private toggleMenuService:ToggleMenuService, protected loginService: LoginService) {
   }

  ngOnInit(): void {

    this.user = this.loginService.getLogin()?.nombre
    this.typeUser = this.loginService.getLogin()?.role
    this.toggleMenu();

  }

  toggleMenu() {
    this.toggleMenuService.toggleMenu()
  }

  logOut() {
    this.loginService.logout()
  }
}
