import { NgModule } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// Routings.
import { AppRoutingModule } from './app-routing.module';

// Environment variables
import { environment } from '../environments/environment';

// Services.
import { AuthenticationService } from './core/services/authentication.service';
import { UserService } from './core/services/user.service';

// Components.
import { AppComponent } from './app.component';
import { ComponentsModule } from './ui/components.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    ComponentsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [AuthenticationService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
