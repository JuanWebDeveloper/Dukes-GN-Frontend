import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModul } from './ui/components.module';


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    ComponentsModul,
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
