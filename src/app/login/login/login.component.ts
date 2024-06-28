import { Component, OnInit } from '@angular/core';

import { LoginService } from 'src/app/services/security/login.service'
import { UserLogin } from 'src/app/entities/security/user-login'
import { SessionStorageService } from 'src/app/services/session-storage.service'
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login = new UserLogin()
  invalidUser = false
  disableButton = false;
  returnUrl: any

  typeLogin =  "Administrador"
  hide: boolean = true;


  public informacion = JSON.parse(localStorage.getItem('informacion')!)

  constructor(protected loginService: LoginService, 
    protected sessionStorage: SessionStorageService, 
    private route: ActivatedRoute,
    private router: Router,
    private docTitleService: Title) { }


  ngOnInit(): void {

    


    this.docTitleService.setTitle('Iniciar Sesión - ' + environment.appTitle)
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.login.email = '';
    this.login.password = '';
  }


  togglePasswordVisibility() { this.hide = !this.hide; }



  submit() {
    this.disableButton = true

    if(this.typeLogin === 'Administrador') {
      // console.log('admin')
      this.loginService.login(this.login).subscribe((e: any) => {
      console.log(e)
        localStorage.setItem('token', e.token)
        this.sessionStorage.setSession(e)
        this.router.navigate([this.returnUrl]);
        this.disableButton = false
      }, (e: HttpErrorResponse) => {
        this.invalidUser = true
        this.disableButton = false
      })
    } else {
      // console.log('personal')
      this.loginService.loginPersonal(this.login).subscribe(e => {
        console.log(e)
          this.sessionStorage.setSession(e)
          this.router.navigate([this.returnUrl]);
          this.disableButton = false
        }, (e: HttpErrorResponse) => {
          this.invalidUser = true
          this.disableButton = false
        })
    }

    





  }


  onChange($event: any){
    console.log($event.target.value)
    this.typeLogin = $event.target.value;
  }

}
