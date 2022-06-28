import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dukes-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent implements OnInit {
  public indicators = [
    'Lista de Usuarios',
    'Crear Usuario',
    'Lista de Programas',
  ];
  public selected: string | undefined;

  constructor() {}

  ngOnInit(): void {
    this.selected = this.indicators[1];
  }

  //Método para cargar la pestaña seleccionada.
  public onTabChange(indicator: string): void {
    this.selected = indicator;
  }
}
