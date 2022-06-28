import { NgModule } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// Rutas.
import { AppRoutingModule } from './app-routing.module';

// Variables de Entorno
import { environment } from '../environments/environment';

// Servicios.
import { AuthenticationService } from './core/services/authentication.service';
import { UserService } from './core/services/user.service';

// Componentes.
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
