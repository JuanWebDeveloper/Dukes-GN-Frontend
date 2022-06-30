import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UserService } from '../../../core/services/user.service';
import { User } from 'src/app/core/models/User';

@Component({
  selector: 'dukes-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private userUpated: User | undefined;
  public username: any;
  public loading: boolean = true;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.authenticationService.getInfoUser().then((currentUser: any) => {
      this.userService.getUser(currentUser.uid).subscribe((user: User) => {
        if (!user.verification) {
          this.userUpated = {
            ...user,
            verification: currentUser.emailVerified,
            availability: true,
          };
          this.userService.updateUser(this.userUpated);
        }
        this.username = user.name;
        this.loading = false;
      });
    });

  }

  ngOnDestroy() {
    this.username = undefined;
    this.userUpated = undefined;
  }
}
