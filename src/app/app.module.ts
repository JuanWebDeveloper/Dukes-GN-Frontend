import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';

// Routings.
import { AppRoutingModule } from './app-routing.module';

// Environment variables
import { environment } from '../environments/environment';

// Components.
import { AppComponent } from './app.component';
import { ComponentsModule } from './ui/components.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    ComponentsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
