import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

/**
 * Servicio para obtener los datos del usuario autenticado.
 */
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { User as UserF } from '@firebase/auth';
import { User } from 'src/app/core/models/User';

/**
 * Servicios para obtener los datos de los programas.
 */
import { ProgramService } from 'src/app/core/services/program.service';
import { Program } from 'src/app/core/models/Program';
import { CourseService } from 'src/app/core/services/course.service';
import { Course } from 'src/app/core/models/Course';

@Component({
  selector: 'dukes-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  public indicators = ['Asignar Notas', 'Crear Programa', 'Progreso Programa'];
  public selected: string | undefined;
  public loading: boolean = true;
  public programInfo: Program | undefined;
  public courseInfo: Course[] | undefined;

  constructor(
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private programService: ProgramService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.selected = this.indicators[1];
    this.recoverProgramDate();
  }

  /**
   * Método para cargar la pestaña seleccionada.
   * @param indicator
   */
  public onTabChange(indicator: string): void {
    this.selected = indicator;
  }

  /**
   * Metodo para cambiar la pestaña de crear programa por la de editar programa.
   **/
  public onIndicatorChangeEdit(): void {
    this.recoverProgramDate();

    this.toastr.success(
      'El programa se ha creado correctamente.',
      'Programa creado.',
      {
        progressBar: true,
        positionClass: 'toast-top-right',
        timeOut: 3000,
        enableHtml: true,
      }
    );
  }

  /**
   * Metodo para recuperar los datos del programa con sus correspondientes cursos y modulos.
   **/
  private recoverProgramDate(): void {
    this.authenticationService.getInfoUser().then((user: UserF) => {
      this.programService.getProgram(user.uid).subscribe((program: Program) => {
        if (program) {
          this.courseService
            .getCourse(program.id_program)
            .subscribe((courses: Course[]) => {
              this.programInfo = program;
              this.courseInfo = courses;
              this.indicators[1] = 'Editar Programa';
              this.selected = this.indicators[1];
              this.loading = false;
            });
        }
      });
    });
  }
}
