import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class FirestoreToUserMapper {
  // Mapea un objeto de Firestore a un objeto de tipo User.
  public mapUser(user: any): User {
    const userMapped: User = {
      userId: user.userId,
      name: user.name,
      email: user.email,
      description: user.description,
      verification: user.verification,
      availability: user.availability,
      rol: user.rol,
    };

    return userMapped;
  }

  // Mapea un array de objetos de Firestore a un array de objetos de tipo User.
  public mapUsers(users: any[]): User[] {
    return users.map((user: any) => this.mapUser(user));
  }
}
