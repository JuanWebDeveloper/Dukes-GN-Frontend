import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from '../../../ui/layout/layout.component';
import { NavbarComponent } from '../../../ui/shared/navbar/navbar.component';
import { MyInformationComponent } from '../../../ui/components/my-information/my-information.component';
import { FooterComponent } from '../../../ui/shared/footer/footer.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', component: NavbarComponent, outlet: 'navbar' },
            { path: '', component: MyInformationComponent },
            { path: '', component: FooterComponent, outlet: 'footer' },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MyInformationRoutingModule { }
