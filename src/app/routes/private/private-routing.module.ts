import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Guards.
import { DashboardGuard } from '../../core/guards/dashboard.guard';
import { VerificationGuard } from '../../core/guards/verification.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./home/home-routing.module').then(
        (routesHome) => routesHome.HomeRoutingModule
      ),
    canActivate: [DashboardGuard],
  },
  {
    path: 'root',
    loadChildren: () =>
      import('./root/root-routing.module').then(
        (routesRoot) => routesRoot.RootRoutingModule
      ),
    canActivate: [DashboardGuard],
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./user/user-routing.module').then(
        (routesUser) => routesUser.UserRoutingModule
      ),
    canActivate: [DashboardGuard],
  },
  {
    path: 'verification',
    loadChildren: () =>
      import('./verification/verification-routing.module').then(
        (routesVerification) => routesVerification.VerificationRoutingModule
      ),
    canActivate: [VerificationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
