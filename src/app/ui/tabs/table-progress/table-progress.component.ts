import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'dukes-table-progress',
  templateUrl: './table-progress.component.html',
  styleUrls: ['./table-progress.component.scss']
})
export class TableProgressComponent implements OnInit {

  data = [65, 59, 80, 81, 56, 55, 40, 100, 98, 100];
  labels = [
    'Fundamentos de Diseño',
    'DDD',
    'Spring Boot 2.0',
    'Fundamentos de Angular',
    'Diseño Web 2.0',
    'RxJs',
    'Reactor Core 3.0',
    'Spring Boot Destilado',
    'Aplicaciones Empresariales',
    'Arquitecturas Limpias'
  ];

  constructor() { }

  ngOnInit(): void {
    //Chart.register(...registerables);
  }

}
