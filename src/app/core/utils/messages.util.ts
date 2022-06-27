export class MessagesUtil {
    constructor() { }
    public getMessage(code: string): string {
        switch (code) {
            //El correo ya existe
            case 'auth/email-already-in-use':
                return "El correo ya existe";
            // Contraseña debil
            case 'auth/weak-password':
                return "La contraseña es muy debil";
            // Correo inválido
            case 'auth/invalid-email':
                return "Correo inválido";
            // Contraseña incorrecta
            case 'auth/wrong-password':
                return "Contraseña incorrecta"
            // El usuario no existe
            case 'auth/user-not-found':
                return "El correo no existe"
            // Muchas peticiones de acceso denegados
            case 'auth/too-many-requests':
                return "Correo desabilitado por varios intentos de ingreso"
            default:
                return "Error desconocido";
        }
    }
}