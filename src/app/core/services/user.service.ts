import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: Firestore) {}

  // Servicio para guardar la información de los usuario.
  async saveUser(user: User) {
    const userRef = collection(this.firestore, 'users');
    return await addDoc(userRef, user);
  }
}
