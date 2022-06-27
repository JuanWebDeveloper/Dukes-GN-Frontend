import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { MessagesUtil } from 'src/app/core/utils/messages.util';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'sofkianos-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../signin/signin.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void { }

  // Method to send email to user with a link to reset password.
  public sendEmail(forgotPasswordForm: NgForm): void {

    this.authenticationService
      .resetPassword(forgotPasswordForm.value.email)
      .then((response) => {
        if (response) {
          this.toastr.error(new MessagesUtil().getMessage(response.code), 'Error', {
            progressBar: true,
            positionClass: 'toast-top-right',
            timeOut: 2000,
          });

        } else {
          this.toastr.success('El correo se ha sido enviado con éxito, Redireccionando...', '', {
            progressBar: true,
            positionClass: 'toast-top-right',
            timeOut: 2000,
          });

          setTimeout(() => {
            this.router.navigate(['']);
          }, 3000);
        }
      });
  }

  redirect(url: string): void {
    this.router.navigate([url]);
  }
}
