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
  public loading: boolean = true;
  public texts: string[] = [
    '¿Como estás?',
    'Sabemos que estás muy bien',
    'Bienvenid@ a Dukes-GN',
    'Tu gestor de notas es tu amigo',
  ];

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {}

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
        this.loading = false;
        this.texts.unshift(`Hola ${user.name}`);
      });
    });
  }

  ngOnDestroy() {
    this.userUpated = undefined;
  }
}
