import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../core/services/authentication.service";
import firebase from "firebase/compat";
import User = firebase.User;


@Component({
  selector: 'dukes-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public indicators = [
    'Gráfica',
    'Tabla',
  ];

  public selected: string | undefined;

  public userName: any;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    //this.selected = this.indicators[0];
    this.authenticationService.getInfoUser().then((user: User) => {
      this.userName = user.displayName;
    });
  }

  ngOnDestroy() {
    this.userName = undefined;
  }

  //Método para cargar la pestaña seleccionada.
  public onTabChange(indicator: string): void {
    this.selected = indicator;
  }

}

