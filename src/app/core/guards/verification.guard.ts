import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, Observer } from 'rxjs';

/**
 * Servicio para verificar que el correo del usuario está verificado.
 */
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class VerificationGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Observable((observer: Observer<boolean>) => {
      this.authenticationService.verifyEmail
        ? this.notApprovedVisit(observer)
        : this.approvedVisit(observer); //Si el correo está verificado, el usuario puede acceder al blog.
    });
  }

  private approvedVisit(observer: Observer<boolean>): void {
    observer.next(true);
    observer.complete();
  }

  private notApprovedVisit(observer: Observer<boolean>): void {
    this.router.navigate(['/dashboard']);
    observer.next(false);
    observer.complete();
  }
}
