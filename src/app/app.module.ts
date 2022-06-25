import { NgModule } from '@angular/core';

// Routings.
import { AppRoutingModule } from './app-routing.module';

// Components.
import { AppComponent } from './app.component';
import { ComponentsModule } from './ui/components.module';

@NgModule({
  declarations: [AppComponent],
  imports: [ComponentsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
