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

  constructor(
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private programService: ProgramService
  ) {}

  ngOnInit(): void {
    this.selected = this.indicators[1];
    this.authenticationService.getInfoUser().then((user: UserF) => {
      this.programService.getProgram(user.uid).subscribe((program: Program) => {
        if (program) {
          this.programInfo = program;
          this.indicators[1] = 'Editar Programa';
          this.selected = this.indicators[1];
          this.loading = false;
        }
      });
    });
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
    this.authenticationService.getInfoUser().then((user: UserF) => {
      this.programService.getProgram(user.uid).subscribe((program: Program) => {
        if (program) {
          this.programInfo = program;
          this.indicators[1] = 'Editar Programa';
          this.selected = this.indicators[1];
          this.loading = false;
        }
      });
    });

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
}
