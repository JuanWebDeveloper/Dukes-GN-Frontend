import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'dukes-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  constructor(
    private authenticationService: AuthenticationService,
    public router: Router
  ) {}

  // Login the user.
  public async onSubmit(form: NgForm) {
    const { email, password } = form.value;

    await this.authenticationService
      .login(email, password)
      .then((response: any) => {
        if (response.user) {
          this.router.navigate(['dashboard/verification']);
          form.reset();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
