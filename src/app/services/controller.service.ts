import { Injectable } from '@angular/core';
import {
  AlertController,
  AlertOptions,
  LoadingController,
  LoadingOptions,
  NavController,
  ToastController,
} from '@ionic/angular';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class ControllService {
  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private lodCtrl: LoadingController,
    private messageService: MessageService
  ) {}

  navigate(nav: string = '') {
    this.navCtrl.navigateRoot(nav);
  }

  navigateLogin() {
    this.navCtrl.navigateRoot(['/login']);
  }

  navigateHome() {
    this.navCtrl.navigateRoot(['/main/home']);
  }

  async toastControllerPrime(sMsg: string, type: string, title: string) {
    this.messageService.add({ severity: type, summary: title, detail: sMsg });
  }

  async toastControllerTop(sMsg: string) {
    const toast = await this.toastCtrl.create({
      message: sMsg,
      duration: 1500,
      position: 'top',
    });
    toast.present();
  }

  async toastControllerBottom(sMsg: string) {
    const toast = await this.toastCtrl.create({
      message: sMsg,
      duration: 1500,
      position: 'bottom',
    });
    toast.present();
  }

  async alert(alertOpts: AlertOptions) {
    const alert = await this.alertCtrl.create(alertOpts);
    return await alert.present();
  }

  async loadingController(opts: LoadingOptions) {
    const loading = await this.lodCtrl.create(opts);
    await loading.present();
    return loading;
  }

  async loadingFullController(mensagem?: string) {
    const loading = await this.lodCtrl.create({
      cssClass: 'loadingFull',
      message: mensagem,
    });
    await loading.present();

    return loading;
  }

  focusButton(id: string) {
    const btn = document.getElementById(id);
    setTimeout(() => {
      btn.focus();
    }, 100);
  }
}
