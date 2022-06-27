export class MessagesUtil {
    constructor() { }
    public getMessage(code: string): string {
        switch (code) {
            //El correo ya existe
            case 'auth/email-already-in-use':
                return "El correo ya se encuentra registrado.";
            // Contraseña debil
            case 'auth/weak-password':
                return "La contraseña no cumple con los requisitos mínimos de seguridad.";
            // Correo inválido
            case 'auth/invalid-email':
                return "Correo inválido. Verifique el correo.";
            // Contraseña incorrecta
            case 'auth/wrong-password':
                return "Contraseña incorrecta. Intente nuevamente."
            // El usuario no existe
            case 'auth/user-not-found':
                return "El correo no existe. Por favor registrese."
            // Muchas peticiones de acceso denegados
            case 'auth/too-many-requests':
                return "Acceso Denegado. Superaste la cantidad máxima de ingresos. Solicita recuperación de contraseña."
            default:
                return "Error desconocido";
        }
    }
}
