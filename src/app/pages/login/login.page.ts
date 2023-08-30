import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { IonicModule, IonInput } from '@ionic/angular';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import {
  HttpErrorResponse,
  IDictionary,
} from 'src/app/Interfaces/global.interface';
import {
  IFormLogin,
  IResultLogin,
} from 'src/app/Pages/login/interface/login.interface';
import { ControllService } from 'src/app/Services/controller.service';
import { StorageService } from 'src/app/Services/storageService.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
  ],
})
export class LoginPage {
  @ViewChild('inputUsername') inputUsername: IonInput;
  @ViewChild('inputPassword') inputPassword: IonInput;

  form: FormGroup;
  version = environment.version;
  visiblePass = true;

  dictionary: IDictionary = new IDictionary();

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private service: StorageService,
    private controller: ControllService,
    fb: FormBuilder
  ) {
    this.form = fb.group(new IFormLogin());
  }

  //FUNCTIONS
  async login() {
    if (this.form.valid) {
      const loading = await this.controller.loadingController({
        message: this.dictionary.loadingWait,
      });

      const url = `${await this.service.getAPI()}/Login?username=${
        this.form.value.username
      }&pwd=${encodeURIComponent(this.form.value.password)}`;
      await this.http
        .get(url)
        .toPromise()
        .then(async (result: IResultLogin) => {
          if (result.authenticated) {
            await this.service.setUser(result);
            this.controller.navigateHome();
          } else {
            this.form.reset();
            this.controller.toastControllerBottom(
              this.dictionary.toastLoginInvalid
            );
            this.inputUsername.setFocus();
          }
        })
        .catch((error: HttpErrorResponse) => {
          this.service.setErrorLogToken('GET', error);
          this.form.reset();
        });

      loading.dismiss();
    }
  }

  //CONTROLS
  ionViewDidEnter() {
    this.inputUsername.setFocus();
  }

  eventEnter(keyCode: any) {
    if (keyCode === 13) {
      if (this.form.valid) {
        this.login();
      } else {
        if (this.form.controls.username.invalid) {
          this.controller.toastControllerPrime(
            this.dictionary.toastUsernameInvalid,
            'error',
            ''
          );
          this.inputUsername.setFocus();
        } else if (this.form.controls.password.invalid) {
          this.controller.toastControllerPrime(
            this.dictionary.toastUsernameInvalid,
            'error',
            ''
          );
          this.inputPassword.setFocus();
        }
      }
    }
  }
}
