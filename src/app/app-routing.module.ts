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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
