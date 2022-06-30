import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { MessagesUtil } from 'src/app/core/utils/messages.util';

@Component({
  selector: 'dukes-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  private messagesUtil = new MessagesUtil();
  private notificationSettings = {
    progressBar: true,
    positionClass: 'toast-top-right',
    timeOut: 2000,
    enableHtml: true,
  };

  constructor(
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  /**
   * Inicio de sesión del usuario.
   * @param form
   */
  public async onSubmit(form: NgForm) {
    const { email, password } = form.value;

    await this.authenticationService
      .login(email, password)
      .then((response: any) => {
        if (response.user) {
          this.toastr.success(
            `Bienvenido <span class="capitalize">${response.user.displayName}</span> <br /> Redireccionando...`,
            'Inicio de sesión exitoso',
            this.notificationSettings
          );

          setTimeout(() => {
            this.router.navigate(['dashboard/verification']);
            this.toastr.clear();
            form.reset();
          }, 2000);
        } else {
          this.toastr.error(
            this.messagesUtil.getMessage(response.code),
            'Error',
            this.notificationSettings
          );
        }
      });
  }
}
