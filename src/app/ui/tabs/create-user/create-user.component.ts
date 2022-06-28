import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { MessagesUtil } from 'src/app/core/utils/messages.util';

@Component({
  selector: 'dukes-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent {
  private messagesUtil = new MessagesUtil();
  private notificationSettings = {
    progressBar: true,
    positionClass: 'toast-top-right',
    timeOut: 3000,
    enableHtml: true,
  };

  constructor(
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) {}

  // Register the user.
  public async onSubmit(form: NgForm) {
    const { name, email, password } = form.value;

    await this.authenticationService
      .register(email, password)
      .then((response: any) => {
        if (response.user) {
          response.user.updateProfile({
            displayName: name,
          });

          form.reset();

          this.toastr.success(
            `El usuario se ha creado con éxito.`,
            'Operación exitosa',
            this.notificationSettings
          );

          this.authenticationService.logout().then(() => {
            this.authenticationService.login(
              'juandeveloper19@gmail.com',
              '123456'
            );
          });
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
