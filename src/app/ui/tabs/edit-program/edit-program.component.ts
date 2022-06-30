import { Component, Input, OnInit } from '@angular/core';

/**
 * Servicios para actualizar los datos de los programas.
 **/
import { Program } from 'src/app/core/models/Program';
import { Course } from 'src/app/core/models/Course';
import { Module } from 'src/app/core/models/Module';

@Component({
  selector: 'dukes-edit-program',
  templateUrl: './edit-program.component.html',
  styleUrls: ['./edit-program.component.scss'],
})
export class EditProgramComponent implements OnInit {
  @Input() program: Program | any;
  @Input() courses: Course[] | any;
  @Input() modules: Module[] | any;

  constructor() {}

  ngOnInit(): void {}
}
