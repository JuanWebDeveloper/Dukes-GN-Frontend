import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'dukes-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent {
  constructor(private authenticationService: AuthenticationService) {}

  // Register the user.
  async onSubmit(form: NgForm) {
    const { name, email, password } = form.value;

    await this.authenticationService
      .register(email, password)
      .then((response: any) => {
        if (response.user) {
          response.user.updateProfile({
            displayName: name,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
