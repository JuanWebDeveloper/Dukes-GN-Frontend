import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable, Observer } from 'rxjs';

// Service to verify that the user email is already verified.
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
        : this.approvedVisit(observer); // If the email is verified, the user can access the blog.
    });
  }

  private approvedVisit(observer: Observer<boolean>): void {
    observer.next(true);
    observer.complete();
  }

  private notApprovedVisit(observer: Observer<boolean>): void {
    this.router.navigate(['/dashboard/root']);
    observer.next(false);
    observer.complete();
  }
}
