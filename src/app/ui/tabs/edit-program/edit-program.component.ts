import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

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
  public users: User[] | any;
  public loading = true;

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.users = users.filter(
        (user: User) => user.rol === 'user' && user.availability
      );
      this.loading = false;
    });
  }

  /**
   * Método para agregar un usuario a un programa.
   * @param user
   **/
  public addUser(userId: string, username: string): void {
    this.userService
      .createProgramData(this.program.id_program, this.program.name, userId)
      .then(() => {
        this.toastr.success(
          `El usuario ${username} ha sido agregado al programa ${this.program.name}`,
          'Usuario agregado',
          {
            progressBar: true,
            positionClass: 'toast-top-right',
            timeOut: 3000,
            enableHtml: true,
          }
        );
      });
  }
}
