import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ScrollbarThemeModule } from 'src/app/Directive/ScrollbarTheme.directive';

import { PlayerComponent } from './player.component';

@NgModule({
  declarations: [PlayerComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollbarThemeModule,
  ],
  exports: [PlayerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PlayerModule {}
