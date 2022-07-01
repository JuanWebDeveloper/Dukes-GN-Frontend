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

  /**
   * Servicio para el registro de usuarios.
   * @param email
   * @param password
   * @returns
   */
  public async register(email: string, password: string) {
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

  /**
   * Servicio para enviar el correo de autenticación al correo registrado.
   * @returns
   */
  public async SendVerificationMail() {
    return await this.auth.currentUser.then(
      (user) => user && user.sendEmailVerification()
    );
  }

  /**
   * Servicio para el inicio de sesión del usuario.
   * @param email
   * @param password
   * @returns
   */
  public async login(email: string, password: string) {
    return await this.auth
      .signInWithEmailAndPassword(email, password)
      .then((response: any) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  /**
   * Servicio para el cierre de sesión del usuario.
   * @returns
   */
  public async logout() {
    return await this.auth.signOut();
  }

  /**
   * Servicio para restablecer la contraseña.
   * @param email
   * @returns
   */
  public async resetPassword(email: string) {
    return await this.auth
      .sendPasswordResetEmail(email)
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error;
      });
  }

  /**
   * Servicio para obtener la información de un usuario registrado.
   * @returns
   */
  public async getInfoUser(): Promise<any> {
    return await this.auth.currentUser.then((user: any) => user);
  }

  /**
   * Servicio para verificar que el correo del usuario está verificado.
   */
  public get verifyEmail(): boolean {
    return JSON.parse(localStorage.getItem('isVerificated')!);
  }
}
