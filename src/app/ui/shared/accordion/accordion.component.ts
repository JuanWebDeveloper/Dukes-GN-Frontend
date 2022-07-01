import { Component, Input, OnInit } from '@angular/core';

import { Program } from '../../../core/models/Program';
import { Course } from 'src/app/core/models/Course';
import { Module } from 'src/app/core/models/Module';

@Component({
  selector: 'dukes-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit {
  @Input() program: Program | undefined;
  @Input() courses: Course[] | any;
  @Input() modules: Module[] | any;
  @Input() userId: string | undefined;
  constructor() {}

  ngOnInit(): void {}

  /**
   * Método para mostrar el contenido de una pestaña.
   **/
  public toggleAccordion(event: any): void {
    const target = event.target;
    const parent = target.parentElement;
    const contents = document.querySelectorAll('.accordion-item_content');
    const content = parent.querySelector('.accordion-item_content');

    for (let i = 0; i < contents.length; i++) {
      contents[i] == content
        ? content.classList.toggle('active')
        : contents[i].classList.remove('active');
    }

    target.classList.toggle('active');
  }

  /**
   * Método para mostrar el contenido de una pestaña.
   **/
  public toggleAccordionC(event: any): void {
    const target = event.target;
    const parent = target.parentElement;
    const contents = document.querySelectorAll('.accordion-c-itemC_contentC');
    const content = parent.querySelector('.accordion-c-itemC_contentC');

    for (let i = 0; i < contents.length; i++) {
      contents[i] == content
        ? content.classList.toggle('active')
        : contents[i].classList.remove('active');
    }

    target.classList.toggle('active');
  }
}
