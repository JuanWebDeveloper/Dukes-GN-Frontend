import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Import of the components used in the application.
import { SigninComponent } from './components/signin/signin.component';

@NgModule({
  declarations: [SigninComponent],
  imports: [BrowserModule, CommonModule, RouterModule, FormsModule],
})
export class ComponentsModule {}
