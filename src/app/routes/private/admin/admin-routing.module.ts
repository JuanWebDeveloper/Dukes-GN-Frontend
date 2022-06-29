import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '../../../ui/layout/layout.component';
import { NavbarComponent } from '../../../ui/shared/navbar/navbar.component';
import { FooterComponent } from '../../../ui/shared/footer/footer.component';
import {AdminComponent} from "../../../ui/components/admin/admin.component";
import { AdminGuard } from 'src/app/core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: NavbarComponent, outlet: 'navbar' },
      { path: '', component: AdminComponent },
      { path: '', component: FooterComponent, outlet: 'footer' },
    ],
    canActivate:[AdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
