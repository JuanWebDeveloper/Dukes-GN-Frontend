import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import firebase from "firebase/compat";
import User = firebase.User;
import {AuthenticationService} from "../../../core/services/authentication.service";

@Component({
  selector: 'dukes-graph-progress',
  templateUrl: './graph-progress.component.html',
  styleUrls: ['./graph-progress.component.scss']
})
export class GraphProgressComponent implements OnInit {

  chart: any;
  public userName: any;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.chart = document.getElementById('line_chart');
    Chart.register(...registerables);
    this.loadChart();
    this.authenticationService.getInfoUser().then((user: User) => {
      this.userName = user.displayName;
    });
  }

  loadChart(): void {
    new Chart(this.chart, {
      type: 'line',
      data: {
        /**
         * Estas son las notas por estudiante en los módulos calificados
         */
        datasets: [
          {
            data: [65, 59, 80, 81, 56, 55, 40, 100, 98, 100], //Notas por módulo
            label: 'juan', //Nombre del estudiante
            backgroundColor: [

              'rgba(200, 102, 255, 1)',

            ],
            borderColor: [
              'rgba(200, 102, 255, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1.5
          },
        ],
        /**
         * Aquí son los nombres de cada uno de los módulos calificados
         */
        labels: [
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
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          }
        }
      }
    });
  }

}
