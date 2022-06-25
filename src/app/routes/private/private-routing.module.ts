import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '../../ui/layout/layout.component';
import { NavbarComponent } from 'src/app/ui/shared/navbar/navbar.component';
import { FooterComponent } from 'src/app/ui/shared/footer/footer.component';
import { SigninComponent } from 'src/app/ui/components/signin/signin.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: NavbarComponent, outlet: 'navbar' },
      { path: '', component: SigninComponent },
      { path: '', component: FooterComponent, outlet: 'footer' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
