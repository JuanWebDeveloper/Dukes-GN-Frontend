import { Component, Input, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import firebase from 'firebase/compat';
import User = firebase.User;
import { AuthenticationService } from '../../../core/services/authentication.service';
import { UserService } from 'src/app/core/services/user.service';
import { Program } from 'src/app/core/models/Program';
import { Course } from 'src/app/core/models/Course';
import { Module } from 'src/app/core/models/Module';

@Component({
  selector: 'dukes-graph-progress',
  templateUrl: './graph-progress.component.html',
  styleUrls: ['./graph-progress.component.scss'],
})
export class GraphProgressComponent implements OnInit {
  @Input() program: Program | any;
  @Input() courses: Course[] | any;
  @Input() modules: Module[] | any;
  public chart: any;
  public userName: any;
  public id_user: string | undefined;
  private moduleInfoNote: any[] | undefined;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.chart = document.getElementById('line_chart');
    Chart.register(...registerables);
    this.loadChart();

    this.authenticationService.getInfoUser().then((user: User) => {
      this.userName = user.displayName;
    });

    this.modules.map((module: Module) => {
      this.getNotes(
        this.id_user!,
        module.id_course,
        module.name,
        module.id_module!
      ).then((notes: any) => {
        this.moduleInfoNote?.push(notes);
        console.log(notes);
      });
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
            data: this.moduleInfoNote!.map((note) => note.values()[0]), //Notas por módulo
            label: this.userName, //Nombre del estudiante
            backgroundColor: ['rgba(200, 102, 255, 1)'],
            borderColor: [
              'rgba(200, 102, 255, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1.5,
          },
        ],
        /**
         * Aquí son los nombres de cada uno de los módulos calificados
         */
        labels: this.moduleInfoNote!.map((note) => note.values()[1]),
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  getNotes(
    userId: string,
    courseId: string,
    moduleName: string,
    moduleId: string
  ): any {
    this.userService.getModuleNoteData(userId, courseId, moduleName, moduleId)
    .subscribe((response) => console.log(response));
  }
}
