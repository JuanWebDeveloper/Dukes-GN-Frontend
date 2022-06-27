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
export class DashboardGuard implements CanActivate {
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
      console.log(this.authenticationService.verifyEmail);
      this.authenticationService.verifyEmail
        ? this.approvedVisit(observer)
        : this.notApprovedVisit(observer); // If the email is not verified, the user cannot access the blog.
    });
  }

  private approvedVisit(observer: Observer<boolean>): void {
    observer.next(true);
    observer.complete();
  }

  private notApprovedVisit(observer: Observer<boolean>): void {
    this.router.navigate(['/dashboard/verification']);
    observer.next(false);
    observer.complete();
  }
}
