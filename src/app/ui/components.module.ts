import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxTypedJsModule } from 'ngx-typed-js';

/**
 * Importación de los componentes usados en la aplicación.
 */
import { SigninComponent } from './components/signin/signin.component';
import { LayoutComponent } from './layout/layout.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RootComponent } from './components/root/root.component';
import { ListUserComponent } from './tabs/list-user/list-user.component';
import { CreateUserComponent } from './tabs/create-user/create-user.component';
import { ListProgramComponent } from './tabs/list-program/list-program.component';
import { VerificationComponent } from './components/verification/verification.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { GraphProgressComponent } from './tabs/graph-progress/graph-progress.component';
import { TableProgressComponent } from './tabs/table-progress/table-progress.component';
import { AdminComponent } from './components/admin/admin.component';
import { ScoreUserComponent } from './tabs/score-user/score-user.component';
import { CreateProgramComponent } from './tabs/create-program/create-program.component';
import { ProgramProgressComponent } from './tabs/program-progress/program-progress.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { EditProgramComponent } from './tabs/edit-program/edit-program.component';
import { MyInformationComponent } from './components/my-information/my-information.component';
import { AccordionComponent } from './shared/accordion/accordion.component';

@NgModule({
  declarations: [
    SigninComponent,
    LayoutComponent,
    NavbarComponent,
    FooterComponent,
    RootComponent,
    ListUserComponent,
    CreateUserComponent,
    ListProgramComponent,
    VerificationComponent,
    ForgotPasswordComponent,
    HomeComponent,
    UserComponent,
    GraphProgressComponent,
    TableProgressComponent,
    AdminComponent,
    ScoreUserComponent,
    CreateProgramComponent,
    ProgramProgressComponent,
    LoadingComponent,
    EditProgramComponent,
    MyInformationComponent,
    AccordionComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    FormsModule,
    NgxTypedJsModule,
  ],
})
export class ComponentsModule {}
