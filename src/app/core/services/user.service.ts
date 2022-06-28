import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { User } from '../models/User';
import { map, Observable } from 'rxjs';
import { FirestoreToUserMapper } from '../mappers/firestore-to-users.mapper';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private angularFirestore: AngularFirestore,
    private firestoreToUserMapper: FirestoreToUserMapper
  ) {}

  // Servicio para guardar la información de los usuario.
  async saveUser(user: User) {
    const userRef = this.angularFirestore.collection('users');

    return await userRef.doc(user.userId).set(user);
  }

  // Servicio para obtener la información de los usuario.
  getUser(userId: string): Observable<User> {
    const userRef = this.angularFirestore.collection('users');

    return userRef
      .doc(userId)
      .valueChanges()
      .pipe(
        map((response: any) => this.firestoreToUserMapper.mapUser(response))
      );
  }

  // Servicio para obtener la información de todos los usuario.
  getAllUsers(): Observable<User[]> {
    const userRef = this.angularFirestore.collection('users');

    return userRef
      .valueChanges()
      .pipe(
        map((response: any) => this.firestoreToUserMapper.mapUsers(response))
      );
  }

  // Servicio para actualizar la información de los usuario.
  async updateUser(user: User) {
    const userRef = this.angularFirestore.collection('users');

    return await userRef.doc(user.userId).update(user);
  }
}
