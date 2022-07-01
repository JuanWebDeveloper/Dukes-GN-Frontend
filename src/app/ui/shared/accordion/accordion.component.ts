import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dukes-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

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
}
