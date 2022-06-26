import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Import of the components used in the application.
import { SigninComponent } from './components/signin/signin.component';
import { LayoutComponent } from './layout/layout.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RootComponent } from './components/root/root.component';

@NgModule({
  declarations: [
    SigninComponent,
    LayoutComponent,
    NavbarComponent,
    FooterComponent,
    RootComponent,
  ],
  imports: [BrowserModule, CommonModule, RouterModule, FormsModule],
})
export class ComponentsModule {}
