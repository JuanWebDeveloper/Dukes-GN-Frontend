import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'dukes-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
})
export class VerificationComponent implements OnInit, OnDestroy {
  public userInfo: any;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.authenticationService.getInfoUser().then((user: any) => {
      this.userInfo = user;
    });
  }

  ngOnDestroy() {
    this.userInfo = undefined;
  }

  // Methods.
  public sendMail(): void {
    this.authenticationService.SendVerificationMail();
  }

  public verify(): void {
    window.location.href = 'authenticated/blog';
  }

  public logout(): void {
    this.authenticationService.logout();
  }
}
