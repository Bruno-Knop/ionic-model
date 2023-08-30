import { HttpEventType } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

import { HttpErrorResponse } from '../Interfaces/global.interface';
import { ControllService } from './controller.service';
import { IResultLogin } from '../Pages/login/interface/login.interface';
import { Network } from '@awesome-cordova-plugins/network/ngx';

//StorageService
const API = 'api';

//Ionic Storage
const LOGIN = 'session';
const TOKEN = 'token';
const EXTOKEN = 'expireToken';
const ERROR_LOG = 'error_log';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(
    private controller: ControllService,
    private storage: Storage,
    private network: Network
  ) {
    this.storage.create();
    this.setAPI();
  }

  checkConnection() {
    const conections = ['ethernet', 'wifi', '2g', '3g', '4g', 'cellular'];
    if (conections.includes(this.network.type)) {
      return true;
    } else {
      return false;
    }
  }

  clear() {
    this.storage.clear();
  }

  async setAPI(endpoint?: string) {
    if ((await this.getAPI()) === null) {
      await this.storage.set(API, environment.api);
    } else if (endpoint !== undefined) {
      await this.storage.set(API, endpoint);
    }
  }

  async getAPI(): Promise<string> {
    return await this.storage.get(API);
  }

  async setUser(login: IResultLogin) {
    localStorage.setItem(EXTOKEN, 'true');
    localStorage.setItem(TOKEN, login.token);
    await this.storage.set(LOGIN, login);
  }

  async getUser(): Promise<IResultLogin> {
    const user = await this.storage.get(LOGIN);
    if (user === null) {
      return {
        authenticated: false,
        username: '',
        name: '',
        token: '',
        country: '',
        language: '',
        profile: '',
        dictionary: [],
        menu: [],
        message: '',
      };
    }

    return user;
  }

  async setErrorLogToken(method: string, value: HttpErrorResponse) {
    const url = await this.getAPI().then((x) => value.url.replace(`${x}/`, ''));
    await this.getErrorLogToken().then(async (res) => {
      res.push({
        method,
        url,
        message: value.message,
        name: value.name,
        ok: value.ok,
        status: value.status,
        statusText: value.statusText,
        type: HttpEventType.ResponseHeader,
      });

      await this.storage.set(ERROR_LOG, res);
    });
  }

  async getErrorLogToken(): Promise<HttpErrorResponse[]> {
    if ((await this.storage.get(ERROR_LOG)) === null) {
      await this.storage.set(ERROR_LOG, []);
      return [];
    }

    return await this.storage.get(ERROR_LOG);
  }

  removeErrorLog() {
    this.storage.remove(ERROR_LOG);
  }

  async logout() {
    localStorage.clear();
    this.removeErrorLog();
    this.controller.navigateLogin();
  }
}
