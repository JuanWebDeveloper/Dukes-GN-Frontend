import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Importación de los componentes usados en la aplicación.
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
  ],
  imports: [BrowserModule, CommonModule, RouterModule, FormsModule],
})
export class ComponentsModule {}
