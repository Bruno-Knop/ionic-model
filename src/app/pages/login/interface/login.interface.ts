import { Validators } from '@angular/forms';
import { IControlsList } from 'src/app/Interfaces/global.interface';

export interface ILogin {
  username: string;
  password: string;
}

export interface IResultLogin {
  authenticated: boolean;
  username: string;
  name: string;
  token: string;
  country: string;
  language: string;
  profile: string;
  dictionary: IControlsList[];
  menu: IMenu[];
  message: string;
}

export interface IMenu {
  caption: string;
  type: string;
  icon: string;
  tabIndex: number;
  subMenu: IMenu[];
}

export class IFormLogin {
  public username = ['', [Validators.required]];
  public password = ['', [Validators.required]];
}
