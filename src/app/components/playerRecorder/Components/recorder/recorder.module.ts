import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ScrollbarThemeModule } from 'src/app/Directive/ScrollbarTheme.directive';

import { RecorderComponent } from './recorder.component';

@NgModule({
  declarations: [RecorderComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollbarThemeModule,
  ],
  exports: [RecorderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RecorderModule {}
