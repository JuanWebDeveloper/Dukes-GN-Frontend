import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, Observer } from 'rxjs';

/**
 * Servicio para obtener el rol del usuario
 */
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private userService: UserService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Observable((observer: Observer<boolean>) => {
      this.userService.retrieveRol === 'admin'
        ? this.approvedVisit(observer)
        : this.notApprovedVisit(observer);
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
