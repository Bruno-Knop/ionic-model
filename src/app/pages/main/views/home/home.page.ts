import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { IDictionary } from 'src/app/Interfaces/global.interface';
import { StorageService } from 'src/app/Services/storageService.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ButtonModule,
    TooltipModule,
  ],
})
export class HomePage {
  title = '';
  dictionary = new IDictionary();

  constructor(private router: Router, private service: StorageService) {}

  async ngOnInit() {
    await this.service.getUser().then((user) => {
      const path = this.router.url.replace('/main/', '');
      this.title = user.menu.find((x) => x.type === path).caption;
      Object.keys(this.dictionary).forEach((value) => {
        const controls = user.dictionary.map((x) => x.control);
        if (controls.includes(value)) {
          this.dictionary[value] = user.dictionary.find(
            (x) => x.control.trim() === value
          ).text;
        }
      });
    });
  }
}
