import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'dukes-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  public indicators = ['Asignar Notas', 'Crear Programa', 'Progreso Programa'];
  public selected: string | undefined;

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    this.selected = this.indicators[1];
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
    this.indicators[1] = 'Editar Programa';
    this.selected = this.indicators[1];
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
