import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SHA512 } from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private auth: AngularFireAuth) {}

  // Service for the register of the users.
  async register(email: string, password: string) {
    const hash = SHA512(password).toString();

    return await this.auth
      .createUserWithEmailAndPassword(email, hash)
      .then((response: any) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  // Service to send an mail to authenticate the email.
  async SendVerificationMail() {
    return await this.auth.currentUser.then(
      (user) => user && user.sendEmailVerification()
    );
  }

  // Service for the login of the users.
  async login(email: string, password: string) {
    const hash = SHA512(password).toString();

    return await this.auth
      .signInWithEmailAndPassword(email, hash)
      .then((response: any) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  // Service for the logout of the users.
  async logout() {
    return await this.auth.signOut();
  }
}
