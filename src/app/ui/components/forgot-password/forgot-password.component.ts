import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { MessagesUtil } from 'src/app/core/utils/messages.util';

@Component({
  selector: 'dukes-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../signin/signin.component.scss'],
})
export class ForgotPasswordComponent {
  private messagesUtil = new MessagesUtil();
  private notificationSettings = {
    progressBar: true,
    positionClass: 'toast-top-right',
    timeOut: 3000,
    enableHtml: true,
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) {}

  //Método para enviar correo al usuario con el enlace para restablecer contraseña.
  public async onSubmit(forgotPasswordForm: NgForm) {
    await this.authenticationService
      .resetPassword(forgotPasswordForm.value.email)
      .then((response) => {
        if (response) {
          this.toastr.error(
            this.messagesUtil.getMessage(response.code),
            'Error',
            this.notificationSettings
          );
        } else {
          this.toastr.success(
            'Se ha enviado un correo a su cuenta de correo electrónico con un enlace para restablecer la contraseña. <br /> Redireccionando...',
            'Correo enviado',
            this.notificationSettings
          );

          setTimeout(() => {
            this.router.navigate(['/']);
            this.toastr.clear();
          }, 3000);
        }
      });
  }
}
