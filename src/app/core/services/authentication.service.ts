import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SHA512 } from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private auth: AngularFireAuth) {}

  // Service for the register of the users.
  async register(name: string, email: string, password: string) {
    const hash = SHA512(password).toString();

    return await this.auth
      .createUserWithEmailAndPassword(email, hash)
      .then((response: any) => {
        if (response.user) {
          response.user?.updateProfile({
            displayName: name,
          });

          return response.user;
        }
      })
      .catch((error) => {
        return error;
      });
  }
}
