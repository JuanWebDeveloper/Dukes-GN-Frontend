import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '../../../ui/layout/layout.component';
import { NavbarComponent } from '../../../ui/shared/navbar/navbar.component';
import { UserComponent } from '../../../ui/components/user/user.component';
import { FooterComponent } from '../../../ui/shared/footer/footer.component';
import { UserGuard } from 'src/app/core/guards/user.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: NavbarComponent, outlet: 'navbar' },
      { path: '', component: UserComponent },
      { path: '', component: FooterComponent, outlet: 'footer' },
    ],
    canActivate:[UserGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
