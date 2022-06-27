import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';

// Function to redirect the users with the active session to the private routes.
const redirectLoggedUser = () => redirectLoggedInTo(['dashboard/verification']);

// Function to redirect users who are not logged in to the sign in route.
const redirectNotLoggedUser = () => redirectUnauthorizedTo(['/']);

const routes: Routes = [
  // Routes for the public part of the application.
  {
    path: '',
    loadChildren: () =>
      import('./routes/public/public-routing.module').then(
        (routesPublic) => routesPublic.PublicRoutingModule
      ),
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectLoggedUser,
    },
  },
  // Routes for the private part of the application.
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./routes/private/private-routing.module').then(
        (routesPrivate) => routesPrivate.PrivateRoutingModule
      ),
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: redirectNotLoggedUser,
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      relativeLinkResolution: 'corrected',
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
