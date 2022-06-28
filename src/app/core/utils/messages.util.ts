export class MessagesUtil {
  public getMessage(code: string): string {
    switch (code) {
      case 'auth/email-already-in-use':
        return 'El correo ya se encuentra registrado.';
      case 'auth/weak-password':
        return 'La contraseña no cumple con los requisitos mínimos de seguridad.';
      case 'auth/invalid-email':
        return 'Correo inválido. Verifique el correo.';
      case 'auth/wrong-password':
        return 'Contraseña incorrecta. Intente nuevamente.';
      case 'auth/user-not-found':
        return 'El correo no existe. Por favor registrese.';
      case 'auth/too-many-requests':
        return 'Acceso Denegado. Superaste la cantidad máxima de ingresos. Solicita recuperación de contraseña.';
      default:
        return 'Error desconocido';
    }
  }
}
