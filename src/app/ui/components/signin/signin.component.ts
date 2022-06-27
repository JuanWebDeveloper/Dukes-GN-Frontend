import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { FirebaseCodeErrorService } from 'src/app/core/services/firebase-code-error.service'


@Component({
  selector: 'dukes-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  constructor(private authenticationService: AuthenticationService, private toastr: ToastrService, private firebaseCodeErrorService: FirebaseCodeErrorService, private router: Router) { }

  // Login the user.
  public async onSubmit(form: NgForm) {
    const { email, password } = form.value;

    await this.authenticationService
      .login(email, password)
      .then((response: any) => {
        if (response.user) {
          this.router.navigate(['dashboard/verification']);
          form.reset();
        } else {
          console.log(response)
          this.toastr.error(this.firebaseCodeErrorService.codeError(response.code), "Error");
        }
      })

  }
}
