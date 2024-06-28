import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/entities/security/user-login';
import { LoginService } from 'src/app/services/security/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  login = new UserLogin()
  invalidUser = false
  disableButton = false;
  returnUrl: any
  hide: boolean = true;
  isLoading:boolean|undefined;

  constructor(protected loginService: LoginService,
              public router: Router
  ) { }

  ngOnInit(): void {
  }

  togglePasswordVisibility() { this.hide = !this.hide; }

  resetPassword(): void {
    this.isLoading = true;
    const token = window.location.href.split('?token=')[1];
    // const resetUrl = `${this.apiUrlEnviroment}api/forgot-password/reset-password`;
    // const body = { token, password: this.password };

    this.loginService.resetPassword(token, this.login.password).subscribe(resp => {
      this.isLoading = false;
      Swal.fire({
        icon: 'success',
        title: `${resp.message}`,
        confirmButtonText: 'Ok, muchas gracias!!',
      }).then(()=>{

        this.router.navigate(['/login']);
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);

      })
    },
    (error) => {
      this.isLoading = false;
      Swal.fire({
        icon: 'warning',
        text:  `${error.error.error}`,
        confirmButtonText: 'Ok, muchas gracias!!',
      })
      // this.message = error.error.error;
      // console.error(error);
    })
    
  }
  

}
