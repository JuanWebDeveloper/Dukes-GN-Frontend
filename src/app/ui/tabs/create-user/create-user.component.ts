import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/User';
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
  private userInfo: User | undefined;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  // Register the user.
  public async onSubmit(form: NgForm) {
    const { name, email, password, rol } = form.value;

    await this.authenticationService
      .register(email, password)
      .then((response: any) => {
        if (response.user) {
          response.user.updateProfile({
            displayName: name,
          });

          this.userInfo = {
            userId: response.user.uid,
            name: name,
            email: response.user.email,
            verification: response.user.emailVerified,
            availability: false,
            rol: rol,
          };

          this.userService
            .saveUser(this.userInfo)
            .then(() => {
              this.authenticationService.logout().then(() => {
                this.authenticationService.login(
                  'juandeveloper19@gmail.com',
                  '123456'
                );
              });
            })
            .catch((error) => {
              this.toastr.error(
                error.message,
                'Error',
                this.notificationSettings
              );
            });

          this.toastr.success(
            `El usuario se ha creado con éxito.`,
            'Operación exitosa',
            this.notificationSettings
          );

          form.reset();
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
