import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Routes for the public part of the application.
  {
    path: '',
    loadChildren: () =>
      import('./routes/public/public-routing.module').then(
        (routesPublic) => routesPublic.PublicRoutingModule
      ),
  },
  // Routes for the private part of the application.
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./routes/private/private-routing.module').then(
        (routesPrivate) => routesPrivate.PrivateRoutingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
