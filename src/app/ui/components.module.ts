import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './components/signin/signin.component';

@NgModule({
    declarations: [SigninComponent],
    imports: [
        BrowserModule,
        CommonModule,
        RouterModule
    ]
})
export class ComponentsModul {};