import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from 'src/app/ui/components/forgot-password/forgot-password.component';
import { SigninComponent } from 'src/app/ui/components/signin/signin.component';
import { FooterComponent } from 'src/app/ui/shared/footer/footer.component';
import { NavbarComponent } from 'src/app/ui/shared/navbar/navbar.component';

const routes: Routes = [
  {
    path: '',
    component: SigninComponent,
  },

  //Configuración de la ruta para la página de recuperación de la contraseña.
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    children: [
      { path: '', component: NavbarComponent, outlet: 'navbar' },
      { path: '', component: ForgotPasswordComponent },
      { path: '', component: FooterComponent, outlet: 'footer' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SigninRoutingModule { }
