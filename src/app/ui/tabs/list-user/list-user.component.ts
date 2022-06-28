import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/User';

@Component({
  selector: 'dukes-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit {
  public users: User[] | undefined;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  public showIcon(state: boolean) {
    return state ? 'fas fa-check-circle check' : 'fas fa-times-circle times';
  }
}
