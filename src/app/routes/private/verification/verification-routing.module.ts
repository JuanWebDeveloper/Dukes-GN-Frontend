import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VerificationComponent } from '../../../ui/components/verification/verification.component';

const routes: Routes = [
  {
    path: '',
    component: VerificationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificationRoutingModule {}
