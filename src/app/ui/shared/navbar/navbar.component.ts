import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dukes-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  // Method to toggle the navbar.
  public showAndHide(): void {
    const navigation: any = document.getElementById('navigation');
    const bars: any = document.getElementById('bars');

    navigation.classList.toggle('active');
    bars.classList.toggle('active');
  }

  // Method to toggle the options navbar.
  public showAndHideOptions($event: any): void {
    const options: any = document.getElementById('options');

    if (options.classList.contains('show')) {
      $event.target.classList.remove('show');

      options.classList.remove('show');
      options.classList.add('hide');
    } else {
      $event.target.classList.add('show');

      options.classList.remove('hide');
      options.classList.add('show');
    }
  }
}