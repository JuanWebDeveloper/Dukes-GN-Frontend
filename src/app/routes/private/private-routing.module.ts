import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'root',
    loadChildren: () =>
      import('./root/root-routing.module').then(
        (routesRoot) => routesRoot.RootRoutingModule
      ),
  },
  {
    path: 'verification',
    loadChildren: () =>
      import('./verification/verification-routing.module').then(
        (routesVerification) => routesVerification.VerificationRoutingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
