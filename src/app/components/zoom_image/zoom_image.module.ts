import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ZoomImageComponent } from './zoom_image.component';

@NgModule({
  declarations: [ZoomImageComponent],
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  exports: [ZoomImageComponent],
})
export class ZoomImageModule {}
