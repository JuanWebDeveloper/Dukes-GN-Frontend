import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

/**
 * Rutas.
 */
import { AppRoutingModule } from './app-routing.module';

/**
 * Variables de Entorno.
 */
import { environment } from '../environments/environment';

/**
 * Servicios.
 */
import { AuthenticationService } from './core/services/authentication.service';
import { UserService } from './core/services/user.service';
import { ProgramService } from './core/services/program.service';

/**
 * Componentes.
 */
import { AppComponent } from './app.component';
import { ComponentsModule } from './ui/components.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    ComponentsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
    AuthenticationService,
    UserService,
    ProgramService,
    HttpClientModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
