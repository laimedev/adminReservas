



import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/entities/security/user-login';
import { LoginService } from 'src/app/services/security/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  login = new UserLogin()
  invalidUser = false
  disableButton = false;
  returnUrl: any

  constructor(protected loginService: LoginService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }


  submit() {
    this.loginService.forgotPassword(this.login).subscribe( (resp: any) => {
      console.log(resp);
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

    })
  }
  

}
