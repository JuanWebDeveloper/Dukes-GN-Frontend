import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UserService } from 'src/app/core/services/user.service';
import { ProgramService } from 'src/app/core/services/program.service';
import { CourseService } from 'src/app/core/services/course.service';
import { ModuleService } from 'src/app/core/services/module.service';

import { Program } from 'src/app/core/models/Program';
import { Course } from 'src/app/core/models/Course';
import { Module } from 'src/app/core/models/Module';
import { User } from 'src/app/core/models/User';


@Component({
  selector: 'dukes-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  public texts: string[] = [
    'Bienvenid@ a Dukes-GN',
    'No estas asignado a ningun programa',
  ];

  public indicators = ['Gráfica', 'Tabla'];

  public selected: string | undefined;
  public userName: any;
  public assigned: boolean = true;
  public loading: boolean = true;
  public programInfo: Program | undefined;
  public courseInfo: Course[] | undefined;
  public moduleInfo: Module[] = [];
  public userId: string | undefined;


  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private programService: ProgramService,
    private courseService: CourseService,
    private moduleService: ModuleService) {}

  ngOnInit(): void {
    this.selected = this.indicators[0];

    this.recoverProgramDate();

  }

  ngOnDestroy() {
    this.userName = undefined;
  }

  /**
   * Método para cargar la pestaña seleccionada.
   * @param indicator
   */
  public onTabChange(indicator: string): void {
    this.selected = indicator;
  }

  private recoverProgramDate(): void {
    this.authenticationService.getInfoUser().then((user: User) => {
      this.userId = user.userId;
      if (user.availability) this.assigned = false;
      this.userName = user.name;

      this.programService
        .getProgram(user.userId)
        .subscribe((program: Program) => {
          if (program) {
            this.programInfo = program;

            this.courseService
              .getCourse(program.id_program)
              .subscribe((courses: Course[]) => {
                if (courses) {
                  this.courseInfo = courses;

                  courses.forEach((course: Course | any) => {
                    this.moduleService
                      .getModule(course.id_course)
                      .subscribe((modules: Module[]) => {
                        if (modules) {
                          this.moduleInfo.push(...modules);
                        }
                      });
                  });
                }
              });
          }
        })
        .add(() => {
          if (this.programInfo) {
            this.indicators[1] = 'Editar Programa';
            this.selected = this.indicators[0];
          }

          this.loading = false;
        });
    });
  }
}
