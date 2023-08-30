import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { IDictionary } from 'src/app/Interfaces/global.interface';
import { StorageService } from 'src/app/Services/storageService.service';

import { IMenu } from '../login/interface/login.interface';

@Component({
  selector: 'app-main',
  templateUrl: 'main.page.html',
  styleUrls: ['main.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
  ],
})
export class MainPage implements OnInit {
  dictionary: IDictionary = new IDictionary();
  menus: IMenu[] = [];

  //Menu Hover
  isOpenMenu = false;

  //SubMenu Hover
  isOpenSubMenu = false;
  subMenu: IMenu[] = [];

  constructor(private service: StorageService) {}

  async ngOnInit() {
    this.menus = (await this.service.getUser()).menu;
  }

  openMenu(isOpen: boolean) {
    if (!this.isOpenSubMenu) {
      this.isOpenMenu = isOpen;
    }
  }

  dropList(isOpen: boolean, index: number = -1, menu?: IMenu[]) {
    if (this.isOpenMenu) {
      this.isOpenSubMenu = isOpen;
      if (isOpen) {
        this.subMenu = menu;
        const subMenuID = document
          .getElementById('subMenu')
          .getElementsByTagName('ion-card')[0];
        subMenuID.style.top = `${63 + 48 * index}px`;
      }
    }
  }

  logout() {
    this.service.logout();
  }
}
