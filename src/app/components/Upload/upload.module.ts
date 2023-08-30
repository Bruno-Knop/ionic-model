import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FileUploadModule } from 'ng2-file-upload';

import { ZoomImageModule } from './../zoom_image/zoom_image.module';
import { UploadComponent } from './upload.component';

@NgModule({
  declarations: [UploadComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    FileUploadModule,
    ZoomImageModule,
  ],
  exports: [UploadComponent],
})
export class UploadModule {}
