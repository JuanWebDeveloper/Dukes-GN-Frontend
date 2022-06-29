import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@firebase/auth';

/**
 * Servicio para obtener la informacion de usuario
 */
import { AuthenticationService } from 'src/app/core/services/authentication.service';

/**
 * Servicio para recuperar el rol del usuario
 */
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'dukes-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public userInfo: any | undefined;
  public userPhoto: string | undefined;
  public rol: string | undefined;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.authenticationService.getInfoUser().then((user: User) => {
      this.userInfo = user.displayName;
      this.userPhoto = user.photoURL ? user.photoURL : './assets/ifuwp.jpg';
      this.rol = this.userService.retrieveRol;
    });
  }

  ngOnDestroy(): void {
    this.userPhoto = undefined;
    this.userInfo = undefined;
  }

  // Método para mostrar/esconder el navbar.
  public showAndHide(): void {
    const navigation: any = document.getElementById('navigation');
    const bars: any = document.getElementById('bars');

    navigation.classList.toggle('active');
    bars.classList.toggle('active');
  }

  // Método para mostrar/esconder las opciones del navbar.
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

  // Método para cerrar sesión de un usuario.
  public logout(): void {
    this.authenticationService.logout().then(() => {
      this.router.navigate(['/']);
    });
  }
}
