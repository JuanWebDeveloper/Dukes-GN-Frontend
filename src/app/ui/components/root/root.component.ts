import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dukes-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent implements OnInit {
  public indicators = [
    'Lista De Usuarios',
    'Crear Usuario',
    'Lista De Programas',
  ];
  public selected: string | undefined;

  constructor() {}

  ngOnInit(): void {
    this.selected = this.indicators[0];
  }

  /**
   * Método para cargar la pestaña seleccionada.
   * @param indicator
   */
  public onTabChange(indicator: string): void {
    this.selected = indicator;
  }
}
