import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'dukes-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
})
export class VerificationComponent implements OnInit, OnDestroy {
  public userInfo: any;

  constructor(
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.authenticationService.getInfoUser().then((user: any) => {
      this.userInfo = user.displayName;
    });
  }

  ngOnDestroy() {
    this.userInfo = undefined;
  }

  /**
   * Métodos: Enviar email, Verificar, Cerrar Sesión.
   */
  public sendMail(): void {
    this.authenticationService.SendVerificationMail();
    this.toastr.success(
      'Se ha enviado un correo para verificar su cuenta.',
      'Correo enviado.',
      {
        progressBar: true,
        positionClass: 'toast-top-right',
        timeOut: 3000,
        enableHtml: true,
      }
    );
  }

  public verify(): void {
    window.location.href = 'dashboard';
  }

  public logout(): void {
    this.authenticationService.logout();
    window.location.href = '/';
  }
}
