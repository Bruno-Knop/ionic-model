import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import {
  AlertController,
  IonicModule,
  NavController,
  Platform,
} from '@ionic/angular';

import { IDictionary } from './Interfaces/global.interface';
import { ControllService } from './Services/controller.service';
import { StorageService } from './Services/storageService.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class AppComponent implements OnInit {
  dictionary = new IDictionary();

  constructor(private platform: Platform) {}

  async ngOnInit() {}
}
