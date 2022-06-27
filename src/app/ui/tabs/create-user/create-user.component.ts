import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MessagesUtil } from 'src/app/core/utils/messages.util'


import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'dukes-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent {
  constructor(private authenticationService: AuthenticationService, private toastr: ToastrService) { }

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
        } else {
          console.log(response)
          this.toastr.error(new MessagesUtil().getMessage(response.code), "Error", {
            progressBar: true,
            positionClass: 'toast-top-right',
            timeOut: 2000,
          });
        }
      })
    // .catch((error) => {
    //   console.log(error);
    // });
  }
}
