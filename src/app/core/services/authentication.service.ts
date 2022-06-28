import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { SHA512 } from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private auth: AngularFireAuth) {
    this.auth.authState.subscribe((user) =>
      user
        ? localStorage.setItem(
            'isVerificated',
            JSON.stringify(user.emailVerified)
          )
        : localStorage.setItem('isVerificated', 'null')
    );
  }

  // Servicio para el registro de usuarios.
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

  //Servicio para enviar el correo de autenticación al correo registrado.
  async SendVerificationMail() {
    return await this.auth.currentUser.then(
      (user) => user && user.sendEmailVerification()
    );
  }

  // Servicio para el inicio de sesión del usuario.
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

  // Servicio para el cierre de sesión del usuario.
  async logout() {
    return await this.auth.signOut();
  }

  // Servicio para restablecer la contraseña.
  async resetPassword(email: string) {
    return await this.auth
      .sendPasswordResetEmail(email)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error;
      });
  }

  // Servicio para obtener la información de un usuario registrado.
  async getInfoUser(): Promise<any> {
    return await this.auth.currentUser.then((user: any) => user);
  }

  //Servicio para verificar que el correo del usuario está verificado.
  get verifyEmail(): boolean {
    return JSON.parse(localStorage.getItem('isVerificated')!);
  }
}
