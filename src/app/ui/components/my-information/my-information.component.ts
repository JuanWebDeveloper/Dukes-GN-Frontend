import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { User as UserF } from '@firebase/auth';

/**
 * Servicios para obtener y actualizar la informacion de usuarios.
 */
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/User';

@Component({
  selector: 'dukes-my-information',
  templateUrl: './my-information.component.html',
  styleUrls: ['./my-information.component.scss'],
})
export class MyInformationComponent implements OnInit {
  private notificationSettings = {
    progressBar: true,
    positionClass: 'toast-top-right',
    timeOut: 2000,
    enableHtml: true,
  };
  public disableForm: boolean = true;
  public loading: boolean = false;
  public files: any[] = [];
  private previsualization: string = '';
  private previsualization$: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  public userInfo: User = {
    userId: '',
    name: '',
    email: '',
    rol: '',
    description: '',
    verification: false,
    availability: false,
    imageBase64: '',
  };

  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private authenticationService: AuthenticationService
  ) {
    this.previsualization$.subscribe((value) => {
      this.previsualization = value;
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.authenticationService.getInfoUser().then((currentUser: UserF) => {
      if (currentUser) {
        this.userService.getUser(currentUser.uid).subscribe((user: User) => {
          this.userInfo = {
            userId: user.userId,
            name: user.name,
            email: user.email,
            rol: user.rol,
            description: user.description,
            verification: user.verification,
            availability: user.availability,
            imageBase64:
              user.imageBase64 === undefined
                ? './assets/Default-Profile.png'
                : user.imageBase64,
          };

          this.loading = false;
        });
      }
    });
  }

  /**
   * Actualiza los datos del usuario.
   * @param form
   */
  public updateInformation(form: NgForm) {
    this.toastr.success(
      'Información Actualizada',
      '',
      this.notificationSettings
    );

    setTimeout(() => {
      const { name, description } = form.value;

      this.userInfo.name = name;
      this.userInfo.description = description;
      this.userService.updateUser(this.userInfo).then((response) => {
        this.authenticationService.getInfoUser().then((user) => {
          user.updateProfile({
            displayName: name,
          });
        });
      });

      this.disableForm = true;
    }, 3000);
  }

  /**
   * Habilita el formulario para editar los datos del usuario.
   */
  public enableInformation() {
    this.disableForm = false;
  }

  /**
   * Desabilita el formulario para editar los datos del usuario.
   */
  public cancelInformation() {
    this.disableForm = true;
  }

  /**
   * Carga una imagen en base64 para previsualizarla y la almacenarla en firebase.
   * @param $event
   **/
  public captureFile(event: any) {
    const picture = event.target.files[0];
    this.files.push(picture);
    this.blobFile(picture).then((imagen: any) => {
      this.previsualization = imagen.base;
      this.previsualization$.next(this.previsualization);
      this.userInfo.imageBase64 = imagen.base;
      this.userService.updateUser(this.userInfo);
    });
  }

  /**
   * Convierte un archivo en base64.
   * @param file
   **/
  private blobFile = async ($event: any) =>
    new Promise((resolve, reject) => {
      try {
        const unsafeImg = window.URL.createObjectURL($event);
        const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
        const reader = new FileReader();
        reader.readAsDataURL($event);
        reader.onload = () => {
          resolve({
            blob: $event,
            image,
            base: reader.result,
          });
        };
        reader.onerror = (error) => {
          resolve({
            blob: $event,
            image,
            base: null,
          });
        };
        return resolve;
      } catch (e) {
        return null;
      }
    });
}
