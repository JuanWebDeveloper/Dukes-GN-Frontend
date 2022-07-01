import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

import { FirestoreToUserMapper } from '../mappers/firestore-to-users.mapper';
import { User } from '../models/User';
import { Course } from '../models/Course';
import { Module } from '../models/Module';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private angularFirestore: AngularFirestore,
    private firestoreToUserMapper: FirestoreToUserMapper
  ) {}

  /**
   * Servicio para guardar la información de los usuario.
   * @param user
   * @returns
   */
  async saveUser(user: User) {
    const userRef = this.angularFirestore.collection('users');

    return await userRef.doc(user.userId).set(user);
  }

  /**
   * Servicio para obtener la información de los usuario.
   * @param userId
   * @returns
   */
  getUser(userId: string): Observable<User> {
    const userRef = this.angularFirestore.collection('users');

    return userRef.doc(userId).valueChanges() as Observable<User>;
  }

  /**
   * Servicio para obtener la información de todos los usuario.
   * @returns
   */
  getAllUsers(): Observable<User[]> {
    const userRef = this.angularFirestore.collection('users');

    return userRef
      .valueChanges()
      .pipe(
        map((response: any) => this.firestoreToUserMapper.mapUsers(response))
      );
  }

  /**
   * Servicio para actualizar la información de los usuario.
   * @param user
   * @returns
   */
  async updateUser(user: User) {
    const userRef = this.angularFirestore.collection('users');

    return await userRef.doc(user.userId).update(user);
  }

  /**
   * Servicio para obtener el rol del usuario.
   **/
  get retrieveRol(): string {
    return JSON.parse(localStorage.getItem('rol')!);
  }

  /**
   * Servicio para crear un documento con la información del programa.
   * @param program
   * @param userId
   **/
  async createProgramData(
    programId: string,
    programName: string,
    courses: Course[],
    modules: Module[],
    userId: string
  ) {
    const userRef = this.angularFirestore.collection('users');

    await this.getUser(userId).subscribe((user: User) => {
      userRef.doc(userId).update({
        ...user,
        availability: false,
        programId: programId,
        programName: programName,
      });
    });

    courses.map(async (course: Course) => {
      const courseModules = modules.filter(
        (module: Module) => module.id_course === course.id_course
      );

      const moduleNoteReferences = courseModules.map((module: Module) => {
        return {
          [module.name]: module.name,
          [`${module.name}Note`]: 0,
        };
      });

      const courseDate = {
        courseNote: 0,
        ...moduleNoteReferences,
      };

      await userRef
        .doc(userId)
        .collection('courses')
        .doc(course.id_course)
        .set(courseDate);
    });
  }
}
