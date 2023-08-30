import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ScrollbarThemeModule } from 'src/app/Directive/ScrollbarTheme.directive';

import { PlayerModule } from './Components/player/player.module';
import { RecorderModule } from './Components/recorder/recorder.module';
import { PlayerRecorderComponent } from './playerRecorder.component';

@NgModule({
  declarations: [PlayerRecorderComponent],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollbarThemeModule,
    PlayerModule,
    RecorderModule,
  ],
  exports: [PlayerRecorderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PlayerRecorderModule {}
