import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'dukes-create-program',
  templateUrl: './create-program.component.html',
  styleUrls: ['./create-program.component.scss'],
})
export class CreateProgramComponent implements OnInit {
  public courses: any[] = [
    {
      courseName: 'course' + 1,
    },
    {
      courseName: 'course' + 3,
    },
    {
      courseName: 'course' + 4,
    },
  ];
  public modules: any[] = [
    {
      moduleName: 'module' + 1,
    },
    {
      moduleName: 'module' + 2,
    },
    {
      moduleName: 'module' + 3,
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  public addCourse(): void {
    this.courses.push({
      courseName: 'course' + this.courses.length,
    });
  }

  public addModule(): void {
    this.modules.push({
      moduleName: 'module' + this.modules.length,
    });
  }

  // Crear programas.
  public async onSubmit(form: NgForm) {
    console.log(form.value);
  }
}
