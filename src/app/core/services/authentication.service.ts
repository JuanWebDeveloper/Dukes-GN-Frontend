import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

/**
 * Servicio que nos permite obtener el rol del usuario
 */
import { UserService } from './user.service';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private auth: AngularFireAuth, private userService: UserService) {
    this.auth.authState.subscribe((currentUser) => {
      if (currentUser) {
        this.userService.getUser(currentUser.uid).subscribe((user: User) => {
          localStorage.setItem('rol', JSON.stringify(user.rol));
          localStorage.setItem(
            'isVerificated',
            JSON.stringify(currentUser.emailVerified)
          );
        });
      } else {
        localStorage.setItem('isVerificated', 'null');
        localStorage.setItem('rol', 'null');
      }
    });
  }

  // Servicio para el registro de usuarios.
  async register(email: string, password: string) {
    return await this.auth
      .createUserWithEmailAndPassword(email, password)
      .then((response: any) => {
        this.SendVerificationMail();
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
    return await this.auth
      .signInWithEmailAndPassword(email, password)
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
