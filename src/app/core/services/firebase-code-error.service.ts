import { Injectable } from '@angular/core';
import { FirebaseCodeErrorEnum } from '../utils/firebaseCodeError';

@Injectable({
    providedIn: 'root'
})
export class FirebaseCodeErrorService {

    constructor() { }

    codeError(code: String) {


        switch (code) {
            //El correo ya existe
            case FirebaseCodeErrorEnum.EmailAlreadyInUse:
                return "El correo ya existe";
            // Contraseña debil
            case FirebaseCodeErrorEnum.WeakPassword:
                return "La contraseña es muy debil";
            // Correo inválido
            case FirebaseCodeErrorEnum.InvalidEmail:
                return "Correo inválido";
            // Contraseña incorrecta
            case FirebaseCodeErrorEnum.WrongPassword:
                return "Contraseña incorrecta"
            // El usuario no existe
            case FirebaseCodeErrorEnum.UserNotFound:
                return "El correo no existe"
            // Muchas peticiones de acceso denegados
            case FirebaseCodeErrorEnum.TooManyRequests:
                return "Correo desabilitado por varios intentos de ingreso"
            default:
                return "Error desconocido";
        }
    }
}
