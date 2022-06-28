import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AngularFireAuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard';

//Función para redireccionar a los usuarios con la sesión activa a las rutas privadas.
const redirectLoggedUser = () => redirectLoggedInTo(['dashboard/verification']);

//Función para redireccionar a los usuarios que no estén logueados a la ruta de inicio de sesión.
const redirectNotLoggedUser = () => redirectUnauthorizedTo(['/']);

const routes: Routes = [
  // Rutas de la sección pública de la aplicación.
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
  // Rutas de la sección privada de la aplicación.
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
