import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

/**
 * Servicio para obtener los usuarios disponibles.
 */
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/User';

/**
 * Servicios para actualizar los datos de los programas.
 **/
import { Program } from 'src/app/core/models/Program';
import { Course } from 'src/app/core/models/Course';
import { Module } from 'src/app/core/models/Module';

@Component({
  selector: 'dukes-edit-program',
  templateUrl: './edit-program.component.html',
  styleUrls: ['./edit-program.component.scss'],
})
export class EditProgramComponent implements OnInit {
  @Input() program: Program | any;
  @Input() courses: Course[] | any;
  @Input() modules: Module[] | any;
  public usersAvailability: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.usersAvailability = users.filter(
        (user: User) =>
          user.rol === 'user' && user.verification && user.availability
      );
    });
  }

  /**
   * Método para agregar un usuario a un programa.
   * @param user
   **/
  public addUser(form: NgForm): void {
    this.userService
      .createProgramData(this.program, form.value.userSelected)
      .then(() => {
        window.location.reload();
      });
  }
}
