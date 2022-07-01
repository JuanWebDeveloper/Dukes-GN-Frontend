import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authentication.service';
import firebase from 'firebase/compat';
import User = firebase.User;
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'dukes-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  public texts: string[] = [
    'Bienvenid@ a Dukes-GN',
    'No estas asignado a ningun programa',
  ];

  public indicators = ['Gráfica', 'Tabla'];

  public selected: string | undefined;

  public userName: any;

  public assigned: boolean = true;

  constructor(private authenticationService: AuthenticationService,
    private userService: UserService) {}

  ngOnInit(): void {
    this.selected = this.indicators[0];
    this.authenticationService.getInfoUser().then((currentUser: User) => {
      this.userName = currentUser.displayName;
      this.userService.getUser(currentUser.uid).subscribe((user: any) => {
        if(user.availability){
          this.assigned = false;
        }
        

      });
    });

  }

  ngOnDestroy() {
    this.userName = undefined;
  }

  /**
   * Método para cargar la pestaña seleccionada.
   * @param indicator
   */
  public onTabChange(indicator: string): void {
    this.selected = indicator;
  }
}
