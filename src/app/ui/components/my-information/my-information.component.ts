import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/core/models/User';
import { UserService } from 'src/app/core/services/user.service';


@Component({
  selector: 'dukes-my-information',
  templateUrl: './my-information.component.html',
  styleUrls: ['./my-information.component.scss']
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
  public previsualization: string = "";
  public previsualization$: BehaviorSubject<string> = new BehaviorSubject<string>("");

  public user: User = {
    userId: "",
    name: "",
    email: "",
    rol: "",
    description: "",
    verification: false,
    availability: false,
    imageBase64: ""
  };
  public values: any[] = Object.values(this.user);

  public values$: BehaviorSubject<any> = new BehaviorSubject<any[]>(this.values);

  constructor(
    private toastr: ToastrService,
    router: Router,
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private sanitizer: DomSanitizer) {

    this.previsualization$.subscribe(value => {
      this.previsualization = value;
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.afAuth.currentUser.then((user) => {
      if (user) {
        this.userService.getUser(user?.uid).subscribe((data) => {
          this.user.userId = data.userId;
          this.user.name = data.name;
          this.user.email = data.email;
          this.user.rol = data.rol;
          this.user.description = data.description === undefined ? '-' : data.description;
          this.user.verification = data.verification;
          this.user.availability = data.availability;
          this.user.imageBase64 = data.imageBase64 === undefined ? './assets/Default-Profile.png' : data.imageBase64;
          this.values = Object.values(this.user);
          this.loading = false
        });
      }
    });
  }

  updateInformation(form: NgForm) {
    this.toastr.success("Información Actualizada", "", this.notificationSettings);

    setTimeout(() => {
      const { name, description } = form.value;

      this.user.name = name;
      this.user.description = description;
      this.userService.updateUser(this.user);
      this.values = Object.values(this.user);
      this.disableForm = true;
    }, 3000);
  }

  enableInformation() {
    this.disableForm = false;
  }

  cancelInformation() {
    this.disableForm = true;
  }

  captureFile(event: any) {
    const picture = event.target.files[0];
    this.files.push(picture);
    this.blobFile(picture).then((imagen: any) => {
      this.previsualization = imagen.base;
      this.previsualization$.next(this.previsualization);
      this.user.imageBase64 = imagen.base;
      this.userService.updateUser(this.user);
    })
  }

  blobFile = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          blob: $event,
          image,
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          blob: $event,
          image,
          base: null
        });
      };
      return resolve;
    } catch (e) {
      return null;
    }
  })
}
