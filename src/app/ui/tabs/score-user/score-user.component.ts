import { Component, Input, OnInit } from '@angular/core';

import { Program } from '../../../core/models/Program';
import { Course } from 'src/app/core/models/Course';
import { Module } from '../../../core/models/Module';

@Component({
  selector: 'dukes-score-user',
  templateUrl: './score-user.component.html',
  styleUrls: ['./score-user.component.scss'],
})
export class ScoreUserComponent implements OnInit {
  @Input() program: Program | undefined;
  @Input() courses: Course[] | undefined;
  @Input() modules: Module[] | undefined;
  @Input() userId: string | undefined;

  constructor() {}

  ngOnInit(): void {}
}
