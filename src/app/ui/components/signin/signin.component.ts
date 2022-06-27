import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'dukes-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  constructor(private authenticationService: AuthenticationService) {}

  // Login the user.
  public async onSubmit(form: NgForm) {
    const { email, password } = form.value;

    await this.authenticationService
      .login(email, password)
      .then((response: any) => {
        if (response.user) {
          form.reset();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
