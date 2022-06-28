import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dukes-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public indicators = [
    'Asignar Notas',
    'Crear Programa',
    'Progreso Programa',
  ];
  public selected: string | undefined;

  constructor() { }

  ngOnInit(): void {
    this.selected = this.indicators[1];
  }

  //Método para cargar la pestaña seleccionada.
  public onTabChange(indicator: string): void {
    this.selected = indicator;
  }

}
