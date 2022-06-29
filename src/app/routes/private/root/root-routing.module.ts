import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '../../../ui/layout/layout.component';
import { NavbarComponent } from '../../../ui/shared/navbar/navbar.component';
import { RootComponent } from '../../../ui/components/root/root.component';
import { FooterComponent } from '../../../ui/shared/footer/footer.component';
import { RootGuard } from 'src/app/core/guards/root.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: NavbarComponent, outlet: 'navbar' },
      { path: '', component: RootComponent },
      { path: '', component: FooterComponent, outlet: 'footer' },
    ],
    canActivate: [RootGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RootRoutingModule {}
