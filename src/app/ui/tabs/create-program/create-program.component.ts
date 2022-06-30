import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

/**
 * Servicios.
 **/
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ProgramService } from 'src/app/core/services/program.service';
import { CourseService } from 'src/app/core/services/course.service';
import { ModuleService } from 'src/app/core/services/module.service';

/**
 * Interfaces.
 **/
import { User } from '@firebase/auth';
import { Program } from '../../../core/models/Program';
import { Course } from '../../../core/models/Course';
import { Module } from '../../../core/models/Module';

@Component({
  selector: 'dukes-create-program',
  templateUrl: './create-program.component.html',
  styleUrls: ['./create-program.component.scss'],
})
export class CreateProgramComponent implements OnInit {
  public courses: any[] = [
    {
      courseName: 'course1',
      modules: [
        { moduleName: 'module1' },
        { moduleName: 'module2' },
        { moduleName: 'module3' },
      ],
    },
    {
      courseName: 'course2',
      modules: [
        { moduleName: 'module1' },
        { moduleName: 'module2' },
        { moduleName: 'module3' },
      ],
    },
    {
      courseName: 'course3',
      modules: [
        { moduleName: 'module1' },
        { moduleName: 'module2' },
        { moduleName: 'module3' },
      ],
    },
  ];

  public duratioDays: any[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  private userInfo: User | any;
  private programInfo: Program | any;
  private courseInfo: Course | any;
  private moduleInfo: Module | any;
  public loading: boolean = false;
  @Output() programCreated: EventEmitter<any> = new EventEmitter();

  constructor(
    private authenticationService: AuthenticationService,
    private programService: ProgramService,
    private courseService: CourseService,
    private moduleService: ModuleService
  ) {}

  ngOnInit(): void {
    this.authenticationService.getInfoUser().then((user: User) => {
      this.userInfo = user;
    });
  }

  /**
   * Agregar un curso a un programa.
   */
  public addCourse(): void {
    this.courses.push({
      courseName: 'course' + this.courses.length,
      modules: [
        { moduleName: 'module1' },
        { moduleName: 'module2' },
        { moduleName: 'module3' },
      ],
    });
  }

  /**
   * Agregar un modulo a un curso.
   **/
  public addModule(ic: number): void {
    this.courses[ic].modules.push({
      moduleName: `module${this.courses[ic].modules.length}`,
    });
  }

  /**
   * Crear un programa.
   */
  public onSubmit(form: NgForm) {
    this.loading = true;

    this.programInfo = {
      name: form.value.name,
      id_coach: this.userInfo.uid,
      name_coach: this.userInfo.displayName,
      duration_day: this.totalDays(form),
      course_amount: this.courses.length,
    };

    localStorage.setItem('programInfo', JSON.stringify(form.value));

    this.programService
      .createProgram(this.programInfo)
      .subscribe(({ id_program, course_percentage }: Program) => {
        for (let i = 0; i < this.courses.length; i++) {
          this.courseInfo = {
            id_program: id_program,
            name: form.value[`course${i + 1}`],
            percentage: course_percentage,
          };

          this.courseService
            .createCourse(this.courseInfo)
            .subscribe((course: Course) => {
              for (let j = 0; j < this.courses[i].modules.length; j++) {
                let formInfo = JSON.parse(localStorage.getItem('programInfo')!);

                this.moduleInfo = {
                  id_course: course.id_course,
                  name: formInfo[`module${j + 1}-${i + 1}`],
                  duration: formInfo[`module${j + 1}-${i + 1}-duration`],
                  percentage: 100 / this.courses[i].modules.length,
                };

                this.moduleService
                  .createModule(this.moduleInfo)
                  .subscribe((module: Module) => {});
              }
            });
        }
      })
      .add(() => {
        this.loading = false;
        this.programCreated.emit();
      });
  }

  /**
   * Calcular el total de dias de un programa.
   * @param form
   */
  private totalDays({ value }: NgForm): number {
    let totalDays = 0;
    for (let i = 0; i < this.courses.length; i++) {
      for (let j = 0; j < this.courses[i].modules.length; j++) {
        totalDays += parseInt(value[`module${j + 1}-${i + 1}-duration`]);
      }
    }

    return totalDays;
  }
}
