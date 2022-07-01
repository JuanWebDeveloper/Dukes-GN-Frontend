import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '../../../core/services/user.service';
import { Program } from '../../../core/models/Program';
import { Course } from 'src/app/core/models/Course';
import { Module } from 'src/app/core/models/Module';
import { User } from '../../../core/models/User';

@Component({
  selector: 'dukes-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit {
  @Input() program: Program | undefined;
  @Input() courses: Course[] | undefined;
  @Input() modules: Module[] | undefined;
  @Input() userId: string | undefined;
  public programUsers: User[] | any;
  public loading: boolean = true;

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.programUsers = users.filter(
        (user: User) => user.programId === this.program!.id_program
      );
      this.loading = false;
    });
  }

  /**
   * Método para mostrar el contenido de una pestaña.
   **/
  public toggleAccordion(event: any): void {
    const target = event.target;
    const parent = target.parentElement;
    const contents = document.querySelectorAll('.accordion-item_content');
    const labels = document.querySelectorAll('.accordion-item_label');
    const content = parent.querySelector('.accordion-item_content');

    for (let i = 0; i < contents.length; i++) {
      if (contents[i] == content) {
        content.classList.toggle('active');
        target.classList.toggle('active');
      } else {
        contents[i].classList.remove('active');
        labels[i].classList.remove('active');
      }
    }
  }

  /**
   * Método para mostrar el contenido de una pestaña.
   **/
  public toggleAccordionC(event: any): void {
    const target = event.target;
    const parent = target.parentElement;
    const contents = document.querySelectorAll('.accordion-c-itemC_contentC');
    const labels = document.querySelectorAll('.accordion-c-itemC_label');
    const content = parent.querySelector('.accordion-c-itemC_contentC');

    for (let i = 0; i < contents.length; i++) {
      if (contents[i] == content) {
        content.classList.toggle('active');
        target.classList.toggle('active');
      } else {
        contents[i].classList.remove('active');
        labels[i].classList.remove('active');
      }
    }
  }

  /**
   * Método para asignar una nota a un usuario.
   * @param form
   **/
  public onSubmit(form: NgForm): void {
    const { courseId, moduleName, moduleId, moduleNote, userId } = form.value;

    this.userService
      .assignNotes(courseId, moduleName, moduleId, moduleNote, userId)
      .then(() => {
        this.toastr.success('', 'Nota asignada correctamente', {
          progressBar: true,
          positionClass: 'toast-top-right',
          timeOut: 3000,
          enableHtml: true,
        });

        form.resetForm();
      });
  }
}
