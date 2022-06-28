import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private angularFirestore: AngularFirestore) {}

  // Servicio para guardar la información de los usuario.
  async saveUser(user: User) {
    const userRef = this.angularFirestore.collection('users');

    return userRef.doc(user.userId).set(user);
  }
}
